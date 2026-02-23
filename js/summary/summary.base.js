import { supabase } from '../core/supabase.client.js'
import { showLoader, hideLoader } from '../ui/loader.ui.js'

export async function renderSummary() {

    showLoader()

    const summarySection = document.getElementById("summarySection")

    try {

        const { data, error } = await supabase
            .from("v_fc_summary")
            .select("*")

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

        let currentMP = null
        let subtotalStock = 0
        let subtotalSale = 0

        data.forEach((row, index) => {

            if (currentMP !== row.mp && currentMP !== null) {

                const subtotalDRR = subtotalSale / 30
                const subtotalSC = subtotalDRR === 0 ? 0 : subtotalStock / subtotalDRR

                html += `
                    <tr style="font-weight:600;background:#f3f6fb">
                        <td colspan="2">${currentMP} SUBTOTAL</td>
                        <td>${subtotalStock.toLocaleString()}</td>
                        <td>${subtotalSale.toLocaleString()}</td>
                        <td>${subtotalDRR.toFixed(2)}</td>
                        <td>${subtotalSC.toFixed(1)}</td>
                    </tr>
                `

                subtotalStock = 0
                subtotalSale = 0
            }

            currentMP = row.mp

            subtotalStock += Number(row.total_stock)
            subtotalSale += Number(row.total_sale)

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

            if (index === data.length - 1) {

                const subtotalDRR = subtotalSale / 30
                const subtotalSC = subtotalDRR === 0 ? 0 : subtotalStock / subtotalDRR

                html += `
                    <tr style="font-weight:600;background:#f3f6fb">
                        <td colspan="2">${currentMP} SUBTOTAL</td>
                        <td>${subtotalStock.toLocaleString()}</td>
                        <td>${subtotalSale.toLocaleString()}</td>
                        <td>${subtotalDRR.toFixed(2)}</td>
                        <td>${subtotalSC.toFixed(1)}</td>
                    </tr>
                `
            }

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
