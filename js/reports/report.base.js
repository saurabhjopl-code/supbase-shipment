import { supabase } from '../core/supabase.client.js'
import { showLoader, hideLoader } from '../ui/loader.ui.js'

export async function renderReport(mpName) {

    showLoader()

    const reportSection = document.getElementById("reportSection")

    const { data, error } = await supabase
        .from("v_final_shipment_v2")
        .select("*")
        .eq("mp", mpName)

    if (error) {
        console.error(error)
        hideLoader()
        return
    }

    if (!data.length) {
        reportSection.innerHTML = `
            <div class="card">
                <h2>${mpName} Report</h2>
                <p>No data found.</p>
            </div>
        `
        hideLoader()
        return
    }

    let html = `
        <div class="card">
            <h2>${mpName} Shipment Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>MP</th>
                        <th>MPSKU</th>
                        <th>Warehouse</th>
                        <th>Uniware SKU</th>
                        <th>Total Sale</th>
                        <th>DRR</th>
                        <th>FC Stock</th>
                        <th>Stock Cover</th>
                        <th>Actual Shipment</th>
                        <th>SP-Qty</th>
                        <th>Final Shipment</th>
                        <th>Recall</th>
                    </tr>
                </thead>
                <tbody>
    `

    data.forEach(row => {

        html += `
            <tr>
                <td>${row.mp}</td>
                <td>${row.mpsku}</td>
                <td>${row.warehouse_display}</td>
                <td>${row.uniware_sku}</td>
                <td>${row.total_sale.toLocaleString()}</td>
                <td>${Number(row.drr).toFixed(2)}</td>
                <td>${row.fc_stock.toLocaleString()}</td>
                <td>${Number(row.stock_cover).toFixed(1)}</td>
                <td>${Math.round(row.actual_shipment)}</td>
                <td>${Math.round(row.sp_qty)}</td>
                <td>${Math.round(row.final_shipment)}</td>
                <td>${Math.round(row.recall)}</td>
            </tr>
        `
    })

    html += `
                </tbody>
            </table>
        </div>
    `

    reportSection.innerHTML = html

    hideLoader()
}
