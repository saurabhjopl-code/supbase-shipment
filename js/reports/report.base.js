import { supabase } from '../core/supabase.client.js'
import { showLoader, hideLoader } from '../ui/loader.ui.js'

export async function renderReport(mpName) {

    showLoader()

    const reportSection = document.getElementById("reportSection")

    const { data, error } = await supabase
        .from("v_shipment_base")
        .select("*")
        .eq("mp", mpName)

    if (error) {
        console.error(error)
        hideLoader()
        return
    }

    let html = `
        <div class="card">
            <h2>${mpName.toUpperCase()} Shipment Report</h2>
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
                    </tr>
                </thead>
                <tbody>
    `

    data.forEach(row => {

        html += `
            <tr>
                <td>${row.mp}</td>
                <td>${row.mpsku}</td>
                <td>${row.warehouse_id}</td>
                <td>${row.uniware_sku}</td>
                <td>${row.total_sale}</td>
                <td>${row.drr.toFixed(2)}</td>
                <td>${row.fc_stock}</td>
                <td>${row.stock_cover.toFixed(1)}</td>
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
