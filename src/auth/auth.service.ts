import { Injectable } from '@nestjs/common'
import { SupabaseService } from '../supabase/supabase.service'

@Injectable()
export class AuthService {
  constructor(private readonly supabase: SupabaseService) {}

  async register(email: string, password: string) {
    const { data, error } = await this.supabase.supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
}
