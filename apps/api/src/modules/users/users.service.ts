import { supabaseAdmin } from '../../config/supabase.js';
import { mapUserRow } from '../../shared/utils/db-mapper.util.js';
import { NotFoundError, ConflictError } from '../../shared/errors/app-error.js';
import type { CreateUserInput, UpdateUserInput, ListUsersQuery, User } from './users.types.js';

/**
 * Users service - handles user management logic
 */
export class UsersService {
  /**
   * Create a new user (admin only)
   */
  async createUser(input: CreateUserInput): Promise<User> {
    const { email, password, fullName, role } = input;

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError || !authData.user) {
      throw new Error(authError?.message || 'Failed to create user');
    }

    // Create user profile
    const { data: userData, error: profileError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        role: role || 'viewer',
      })
      .select()
      .single();

    if (profileError || !userData) {
      // Rollback
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw new Error('Failed to create user profile');
    }

    return mapUserRow(userData);
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, role, created_at, updated_at')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundError('User not found', 'USER');
    }

    return mapUserRow(data);
  }

  /**
   * List users with pagination
   */
  async listUsers(query: ListUsersQuery): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, search, role } = query;
    const offset = (page - 1) * limit;

    let queryBuilder = supabaseAdmin
      .from('users')
      .select('id, email, full_name, role, created_at, updated_at', { count: 'exact' });

    // Apply filters
    if (search) {
      queryBuilder = queryBuilder.or(
        `email.ilike.%${search}%,full_name.ilike.%${search}%`
      );
    }

    if (role) {
      queryBuilder = queryBuilder.eq('role', role);
    }

    // Apply pagination
    const { data, error, count } = await queryBuilder
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error('Failed to fetch users');
    }

    const users: User[] = (data || []).map(mapUserRow);

    return {
      users,
      total: count || 0,
      page,
      limit,
    };
  }

  /**
   * Update user
   */
  async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    const updateData: Record<string, any> = {};

    if (input.fullName) {
      updateData.full_name = input.fullName;
    }

    if (input.role) {
      updateData.role = input.role;
    }

    if (input.email) {
      // Update email in auth
      const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(id, {
        email: input.email,
      });

      if (authError) {
        throw new Error('Failed to update email');
      }

      updateData.email = input.email;
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new Error('Failed to update user');
    }

    return mapUserRow(data);
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    // Delete from database
    const { error: dbError } = await supabaseAdmin.from('users').delete().eq('id', id);

    if (dbError) {
      throw new Error('Failed to delete user');
    }

    // Delete from auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (authError) {
      throw new Error('Failed to delete user from auth');
    }
  }
}

