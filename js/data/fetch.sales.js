import { supabase } from '../core/supabase.client.js'

export async function fetchSalesCount() {
    const { count, error } = await supabase
        .from("sale_30d")
        .select("*", { count: "exact", head: true })

    if (error) throw error

    return count || 0
}
