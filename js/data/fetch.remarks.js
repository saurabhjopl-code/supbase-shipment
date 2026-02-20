import { supabase } from '../core/supabase.client.js'

export async function fetchRemarksCount() {
    const { count, error } = await supabase
        .from("company_remarks")
        .select("*", { count: "exact", head: true })

    if (error) throw error

    return count || 0
}
