import { supabaseAdmin } from '../../config/supabase.js';
import { UnauthorizedError, ConflictError, NotFoundError } from '../../shared/errors/app-error.js';
import type { LoginInput, RegisterInput, AuthResponse } from './auth.types.js';

/**
 * Auth service - handles authentication logic
 */
export class AuthService {
  /**
   * Register a new user
   */
  async register(input: RegisterInput): Promise<AuthResponse> {
    const { email, password, fullName } = input;

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email (adjust based on your needs)
    });

    if (authError || !authData.user) {
      throw new ConflictError(authError?.message || 'Failed to create user', 'USER_CREATE_FAILED');
    }

    // Create user profile in database
    const { error: profileError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        role: 'viewer', // Default role
      });

    if (profileError) {
      // Rollback: delete auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw new Error('Failed to create user profile');
    }

    // Get access token by signing in
    const { data: tokenData, error: tokenError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (tokenError || !tokenData.session) {
      throw new Error('Failed to create session');
    }

    return {
      user: {
        id: authData.user.id,
        email: authData.user.email!,
        fullName,
        role: 'viewer',
      },
      accessToken: tokenData.session.access_token,
      refreshToken: tokenData.session.refresh_token,
    };
  }

  /**
   * Login user
   */
  async login(input: LoginInput): Promise<AuthResponse> {
    const { email, password } = input;

    // Sign in with Supabase
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session || !data.user) {
      throw new UnauthorizedError(error?.message || 'Invalid credentials');
    }

    // Get user profile
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, role')
      .eq('id', data.user.id)
      .single();

    if (userError || !userData) {
      throw new NotFoundError('User profile not found', 'USER');
    }

    return {
      user: {
        id: userData.id,
        email: userData.email,
        fullName: userData.full_name,
        role: userData.role,
      },
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const { data, error } = await supabaseAdmin.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || !data.session) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }

  /**
   * Logout user
   */
  async logout(accessToken: string): Promise<void> {
    const { error } = await supabaseAdmin.auth.admin.signOut(accessToken);

    if (error) {
      throw new Error('Failed to logout');
    }
  }
}

