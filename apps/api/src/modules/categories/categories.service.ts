import { supabaseAdmin } from '../../config/supabase.js';
import { mapCategoryRow } from '../../shared/utils/db-mapper.util.js';
import { NotFoundError, ConflictError } from '../../shared/errors/app-error.js';
import type { CreateCategoryInput, UpdateCategoryInput, Category } from './categories.types.js';

/**
 * Categories service - handles category management logic
 */
export class CategoriesService {
  /**
   * Create a new category
   */
  async createCategory(input: CreateCategoryInput): Promise<Category> {
    const { name, slug, description, color } = input;

    // Check if slug already exists
    const { data: existingCategory } = await supabaseAdmin
      .from('categories')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingCategory) {
      throw new ConflictError('Slug already exists', 'SLUG_EXISTS');
    }

    const { data, error } = await supabaseAdmin
      .from('categories')
      .insert({
        name,
        slug,
        description,
        color,
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error('Failed to create category');
    }

    return mapCategoryRow(data);
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id: string): Promise<Category> {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundError('Category not found', 'CATEGORY');
    }

    return mapCategoryRow(data);
  }

  /**
   * List all categories
   */
  async listCategories(): Promise<Category[]> {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw new Error('Failed to fetch categories');
    }

    return (data || []).map(mapCategoryRow);
  }

  /**
   * Update category
   */
  async updateCategory(id: string, input: UpdateCategoryInput): Promise<Category> {
    // Check if category exists
    const { data: existingCategory } = await supabaseAdmin
      .from('categories')
      .select('id')
      .eq('id', id)
      .single();

    if (!existingCategory) {
      throw new NotFoundError('Category not found', 'CATEGORY');
    }

    // Check slug uniqueness if updating
    if (input.slug) {
      const { data: slugCheck } = await supabaseAdmin
        .from('categories')
        .select('id')
        .eq('slug', input.slug)
        .neq('id', id)
        .single();

      if (slugCheck) {
        throw new ConflictError('Slug already exists', 'SLUG_EXISTS');
      }
    }

    const updateData: Record<string, any> = {};

    if (input.name) updateData.name = input.name;
    if (input.slug) updateData.slug = input.slug;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.color !== undefined) updateData.color = input.color;

    const { data, error } = await supabaseAdmin
      .from('categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new Error('Failed to update category');
    }

    return mapCategoryRow(data);
  }

  /**
   * Delete category
   */
  async deleteCategory(id: string): Promise<void> {
    // Check if category exists
    const { data: existingCategory } = await supabaseAdmin
      .from('categories')
      .select('id')
      .eq('id', id)
      .single();

    if (!existingCategory) {
      throw new NotFoundError('Category not found', 'CATEGORY');
    }

    // Delete will cascade to blog_categories due to ON DELETE CASCADE
    const { error } = await supabaseAdmin.from('categories').delete().eq('id', id);

    if (error) {
      throw new Error('Failed to delete category');
    }
  }
}

