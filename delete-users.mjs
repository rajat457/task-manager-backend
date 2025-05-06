// delete-users.js

import { createClient } from '@supabase/supabase-js'

// Replace with your actual values:
const SUPABASE_URL = 'https://vvfgqocdhcvpfztiuwnv.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2Zmdxb2NkaGN2cGZ6dGl1d252Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjM3ODMwNiwiZXhwIjoyMDYxOTU0MzA2fQ.-Eg8SoTlUaovX8VkRNziQH4NGWmlb665RxXBL9k5OII' // ⚠️ Keep this secret

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function deleteAllUsers() {
  const { data, error } = await supabase.auth.admin.listUsers()

  if (error) {
    console.error('Error listing users:', error.message)
    return
  }

  for (const user of data.users) {
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)
    if (deleteError) {
      console.error(`Failed to delete user ${user.email}:`, deleteError.message)
    } else {
      console.log(`✅ Deleted user: ${user.email}`)
    }
  }
}

deleteAllUsers()
