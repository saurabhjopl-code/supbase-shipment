import { supabase } from '../core/supabase.client.js'
import { showLoader, hideLoader } from '../ui/loader.ui.js'

export async function renderSummary() {

    showLoader()

    const summarySection = document.getElementById("summarySection")

    const { data, error } = await supabase
        .from("v_sale_agg")
        .select("*")

    if (error) {
        console.error(error)
        hideLoader()
        return
    }

    const fcMap = {}

    data.forEach(row => {

        if (!fcMap[row.warehouse_id]) {
            fcMap[row.warehouse_id] = {
                total_sale: 0,
                total_stock: 0,
                drr: 0
            }
        }

        fcMap[row.warehouse_id].total_sale += row.total_sale
        fcMap[row.warehouse_id].drr += row.drr
    })

    let html = `
        <div class="card">
            <h2>FC Summary</h2>
            <table>
                <thead>
                    <tr>
                        <th>FC</th>
                        <th>Total Sale</th>
                        <th>DRR</th>
                    </tr>
                </thead>
                <tbody>
    `

    Object.keys(fcMap).forEach(fc => {
        html += `
            <tr>
                <td>${fc}</td>
                <td>${fcMap[fc].total_sale.toLocaleString()}</td>
                <td>${fcMap[fc].drr.toFixed(2)}</td>
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
