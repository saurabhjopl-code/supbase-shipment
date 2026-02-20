import { supabase } from '../core/supabase.client.js'

export async function fetchFCStockCount() {
    const { count, error } = await supabase
        .from("fc_stock")
        .select("*", { count: "exact", head: true })

    if (error) throw error

    return count || 0
}
