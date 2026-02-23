import { supabase } from '../core/supabase.client.js'
import { showLoader, hideLoader } from '../ui/loader.ui.js'

export async function renderSummary() {

    showLoader()

    const summarySection = document.getElementById("summarySection")

    const { data, error } = await supabase
        .from("v_final_shipment_v2")
        .select("*")

    if (error) {
        console.error(error)
        hideLoader()
        return
    }

    const map = {}

    data.forEach(row => {

        const key = `${row.mp}_${row.allocated_fc}`

        if (!map[key]) {
            map[key] = {
                mp: row.mp,
                fc: row.allocated_fc,
                total_stock: 0,
                total_sale: 0,
                total_drr: 0
            }
        }

        map[key].total_stock += row.fc_stock
        map[key].total_sale += row.total_sale
        map[key].total_drr += row.drr
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

        const sc = row.total_drr === 0
            ? 0
            : row.total_stock / row.total_drr

        html += `
            <tr>
                <td>${row.mp}</td>
                <td>${row.fc}</td>
                <td>${row.total_stock.toLocaleString()}</td>
                <td>${row.total_sale.toLocaleString()}</td>
                <td>${row.total_drr.toFixed(2)}</td>
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
