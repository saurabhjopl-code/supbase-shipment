import { supabase } from '../core/supabase.client.js'

export async function fetchUniwareCount() {
    const { count, error } = await supabase
        .from("uniware_stock")
        .select("*", { count: "exact", head: true })

    if (error) throw error

    return count || 0
}
