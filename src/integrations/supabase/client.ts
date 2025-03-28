
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ymxeganlhxzwvfvisztk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlteGVnYW5saHh6d3ZmdmlzenRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNTc4NTYsImV4cCI6MjA1ODYzMzg1Nn0.lzws1wTYKWPUf8-T2h9sR4zsR3dDADwb6Do9RHwoa3Q";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
