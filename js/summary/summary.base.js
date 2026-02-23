import { supabase } from '../core/supabase.client.js'
import { showLoader, hideLoader } from '../ui/loader.ui.js'

export async function renderSummary() {

    showLoader()

    const summarySection = document.getElementById("summarySection")

    const { data, error } = await supabase
        .from("v_shipment_base")
        .select("*")

    if (error) {
        console.error(error)
        hideLoader()
        return
    }

    const map = {}

    data.forEach(row => {

        const key = `${row.mp}_${row.warehouse_id}`

        if (!map[key]) {
            map[key] = {
                mp: row.mp,
                fc: row.warehouse_id,
                total_stock: 0,
                total_sale: 0
            }
        }

        map[key].total_stock += Number(row.fc_stock)
        map[key].total_sale += Number(row.total_sale)
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

    hideLoader()
}
