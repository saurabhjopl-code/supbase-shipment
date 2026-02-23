import { supabase } from '../core/supabase.client.js'
import { showLoader, hideLoader } from '../ui/loader.ui.js'

export async function renderSummary() {

    showLoader()

    const summarySection = document.getElementById("summarySection")

    try {

        // 🔹 Fetch aggregated FC stock
        const { data: stockData, error: stockError } = await supabase
            .from("fc_stock")
            .select("mp, warehouse_id, quantity")

        if (stockError) throw stockError

        // 🔹 Fetch aggregated sales (30D)
        const { data: saleData, error: saleError } = await supabase
            .from("sale_30d")
            .select("mp, warehouse_id, quantity")

        if (saleError) throw saleError

        const map = {}

        // Aggregate stock
        stockData.forEach(row => {

            const key = `${row.mp}_${row.warehouse_id}`

            if (!map[key]) {
                map[key] = {
                    mp: row.mp,
                    fc: row.warehouse_id,
                    total_stock: 0,
                    total_sale: 0
                }
            }

            map[key].total_stock += Number(row.quantity)
        })

        // Aggregate sale
        saleData.forEach(row => {

            const key = `${row.mp}_${row.warehouse_id}`

            if (!map[key]) {
                map[key] = {
                    mp: row.mp,
                    fc: row.warehouse_id,
                    total_stock: 0,
                    total_sale: 0
                }
            }

            map[key].total_sale += Number(row.quantity)
        })

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

        Object.values(map).forEach(row => {

            const drr = row.total_sale / 30
            const sc = drr === 0 ? 0 : row.total_stock / drr

            html += `
                <tr>
                    <td>${row.mp}</td>
                    <td>${row.fc}</td>
                    <td>${row.total_stock.toLocaleString()}</td>
                    <td>${row.total_sale.toLocaleString()}</td>
                    <td>${drr.toFixed(2)}</td>
                    <td>${sc.toFixed(1)}</td>
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
