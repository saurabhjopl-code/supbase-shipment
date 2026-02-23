import { supabase } from '../core/supabase.client.js'
import { showLoader, hideLoader } from '../ui/loader.ui.js'

const summarySection = document.getElementById("summarySection")
const reportSection = document.getElementById("reportSection")

// Map tab name → MP value in DB
const MP_MAP = {
    AMAZON: 'AMAZON IN',
    FLIPKART: 'FLIPKART',
    MYNTRA: 'MYNTRA',
    SELLER: 'SELLER'
}

export async function loadReport(mpKey) {

    showLoader()

    summarySection.classList.add("hidden")
    reportSection.classList.remove("hidden")

    try {

        const mpValue = MP_MAP[mpKey]

        const { data, error } = await supabase
            .from("v_report_master")
            .select("*")
            .eq("mp", mpValue)
            .order("warehouse_id", { ascending: true })

        if (error) throw error

        renderReportTable(data, mpValue)

    } catch (err) {
        console.error("Report Load Error:", err)
        reportSection.innerHTML = `<div class="card">Error loading report.</div>`
    }

    hideLoader()
}

function renderReportTable(data, mpValue) {

    let html = `
        <div class="card">
            <h2>${mpValue} Report</h2>
            <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>MP</th>
                        <th>MPSKU</th>
                        <th>Warehouse</th>
                        <th>FC Stock</th>
                        <th>Total Sale</th>
                        <th>DRR</th>
                        <th>Stock Cover</th>
                        <th>Actual Shipment</th>
                        <th>SP-Qty</th>
                        <th>Final Shipment</th>
                        <th>Recall</th>
                    </tr>
                </thead>
                <tbody>
    `

    if (!data || data.length === 0) {
        html += `
            <tr>
                <td colspan="11" style="text-align:center;padding:20px;">
                    No Data Found
                </td>
            </tr>
        `
    } else {

        data.forEach(row => {

            html += `
                <tr>
                    <td>${row.mp}</td>
                    <td>${row.mpsku}</td>
                    <td>${row.warehouse_id}</td>
                    <td>${Number(row.fc_stock).toLocaleString()}</td>
                    <td>${Number(row.total_sale).toLocaleString()}</td>
                    <td>${Number(row.drr).toFixed(2)}</td>
                    <td>${Number(row.stock_cover).toFixed(1)}</td>
                    <td>${Math.round(row.actual_shipment || 0)}</td>
                    <td>${Math.round(row.sp_qty || 0)}</td>
                    <td>${Math.round(row.final_shipment || 0)}</td>
                    <td>${Math.round(row.recall_qty || 0)}</td>
                </tr>
            `
        })
    }

    html += `
                </tbody>
            </table>
            </div>
        </div>
    `

    reportSection.innerHTML = html
}
