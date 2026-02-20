import { supabase } from '../core/supabase.client.js'
import { showLoader, hideLoader } from '../ui/loader.ui.js'

export async function renderReport(mpName) {

    showLoader()

    const reportSection = document.getElementById("reportSection")

    try {

        const { data, error } = await supabase
            .from("v_final_shipment_v2")
            .select("*")
            .eq("mp", mpName)

        if (error) throw error

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
                            <th>Actual Shipment</th>
                            <th>SP-Qty</th>
                            <th>Final Shipment</th>
                            <th>Recall</th>
                        </tr>
                    </thead>
                    <tbody>
        `

        data.forEach(row => {

            const sc = row.stock_cover || 0

            let scStyle = ""
            if (sc > 90) scStyle = "style='color:#dc2626;font-weight:600;'"       // High SC → Red
            else if (sc < 20) scStyle = "style='color:#d97706;font-weight:600;'"  // Low SC → Amber

            html += `
                <tr>
                    <td>${row.mp}</td>
                    <td>${row.mpsku}</td>
                    <td>${row.warehouse_display}</td>
                    <td>${row.uniware_sku}</td>
                    <td>${Number(row.total_sale).toLocaleString()}</td>
                    <td>${Number(row.drr).toFixed(2)}</td>
                    <td>${Number(row.fc_stock).toLocaleString()}</td>
                    <td ${scStyle}>${Number(sc).toFixed(1)}</td>
                    <td>${Math.round(row.actual_shipment)}</td>
                    <td>${Math.round(row.sp_qty)}</td>
                    <td style="font-weight:600">${Math.round(row.final_shipment)}</td>
                    <td style="color:#dc2626;font-weight:600">${Math.round(row.recall)}</td>
                </tr>
            `
        })

        html += `
                    </tbody>
                </table>
            </div>
        `

        reportSection.innerHTML = html

    } catch (err) {
        console.error("Report Load Error:", err)
        reportSection.innerHTML = `
            <div class="card">
                <h2>Error loading report</h2>
                <p style="color:red;">${err.message}</p>
            </div>
        `
    }

    hideLoader()
}
