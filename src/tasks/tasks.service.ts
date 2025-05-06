import { Injectable } from '@nestjs/common'
import { SupabaseService } from '../supabase/supabase.service'

@Injectable()
export class TasksService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(task: any) {
    const { data, error } = await this.supabase.supabase.from('tasks').insert(task).select()
    if (error) throw new Error(error.message)
    return data
  }

  async findAll(userId: string) {
    const { data, error } = await this.supabase.supabase
      .from('tasks')
      .select('*')
      .or(`created_by.eq.${userId},assigned_to.eq.${userId}`)
    if (error) throw new Error(error.message)
    return data
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.supabase.from('tasks').select('*').eq('id', id).single()
    if (error) throw new Error(error.message)
    return data
  }

  async update(id: string, updates: any) {
    const { data, error } = await this.supabase.supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw new Error(error.message)
    return data
  }

  async delete(id: string) {
    const { error } = await this.supabase.supabase.from('tasks').delete().eq('id', id)
    if (error) throw new Error(error.message)
    return { message: 'Deleted' }
  }
}
