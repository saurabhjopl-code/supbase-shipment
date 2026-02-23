import { supabase } from '../core/supabase.client.js'
import { showLoader, hideLoader } from '../ui/loader.ui.js'

export async function renderSummary() {

    showLoader()

    const summarySection = document.getElementById("summarySection")

    try {

        const { data, error } = await supabase
            .from("v_fc_summary")
            .select("*")
            .order("mp", { ascending: true })
            .order("warehouse_id", { ascending: true })

        if (error) throw error

        let html = `
            <div class="card">
                <h2>FC Summary</h2>
                <table>
                    <thead>
                        <tr>
                            <th>MP</th>
                            <th>FC</th>
                            <th>Total Stock</th>
                            <th>Total Sale</th>
                            <th>DRR</th>
                            <th>SC</th>
                        </tr>
                    </thead>
                    <tbody>
        `

        data.forEach(row => {

            html += `
                <tr>
                    <td>${row.mp}</td>
                    <td>${row.warehouse_id}</td>
                    <td>${Number(row.total_stock).toLocaleString()}</td>
                    <td>${Number(row.total_sale).toLocaleString()}</td>
                    <td>${Number(row.drr).toFixed(2)}</td>
                    <td>${Number(row.stock_cover).toFixed(1)}</td>
                </tr>
            `
        })

        html += `
                    </tbody>
                </table>
            </div>
        `

        summarySection.innerHTML = html

    } catch (err) {
        console.error("Summary Error:", err)
    }

    hideLoader()
}
