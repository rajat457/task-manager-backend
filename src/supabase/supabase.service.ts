import { Injectable } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'

@Injectable()
export class SupabaseService {
  public supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
