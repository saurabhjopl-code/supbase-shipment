import { supabase } from '../core/supabase.client.js'
import { showLoader, hideLoader } from '../ui/loader.ui.js'

export async function renderSummary() {

    showLoader()

    const summarySection = document.getElementById("summarySection")

    try {

        const { data: stockData, error: stockError } = await supabase
            .from("fc_stock")
            .select("mp, warehouse_id, quantity")

        if (stockError) throw stockError

        const { data: saleData, error: saleError } = await supabase
            .from("sale_30d")
            .select("mp, warehouse_id, quantity")

        if (saleError) throw saleError

        const map = {}

        // 🔹 Normalize helper
        const normalize = (val) =>
            val ? val.toString().trim().toUpperCase() : ""

        // Aggregate stock
        stockData.forEach(row => {

            const mp = normalize(row.mp)
            const fc = normalize(row.warehouse_id)

            const key = `${mp}_${fc}`

            if (!map[key]) {
                map[key] = {
                    mp,
                    fc,
                    total_stock: 0,
                    total_sale: 0
                }
            }

            map[key].total_stock += Number(row.quantity)
        })

        // Aggregate sale
        saleData.forEach(row => {

            const mp = normalize(row.mp)
            const fc = normalize(row.warehouse_id)

            const key = `${mp}_${fc}`

            if (!map[key]) {
                map[key] = {
                    mp,
                    fc,
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

        Object.values(map)
            .sort((a, b) => a.mp.localeCompare(b.mp) || a.fc.localeCompare(b.fc))
            .forEach(row => {

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
