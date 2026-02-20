import { supabase } from '../core/supabase.client.js'

export async function exportShipment(mpName) {

    const { data, error } = await supabase
        .from("v_final_shipment_v2")
        .select("*")
        .eq("mp", mpName)
        .gt("final_shipment", 0)

    if (error) {
        alert("Export failed")
        console.error(error)
        return
    }

    if (!data.length) {
        alert("No shipment data available.")
        return
    }

    const headers = [
        "MP",
        "Allocated FC",
        "MPSKU",
        "Uniware SKU",
        "DRR",
        "FC Stock",
        "Stock Cover",
        "Actual Shipment",
        "SP-Qty",
        "Final Shipment"
    ]

    const rows = data.map(row => [
        row.mp,
        row.allocated_fc,
        row.mpsku,
        row.uniware_sku,
        Number(row.drr).toFixed(2),
        row.fc_stock,
        Number(row.stock_cover).toFixed(1),
        Math.round(row.actual_shipment),
        Math.round(row.sp_qty),
        Math.round(row.final_shipment)
    ])

    downloadCSV(headers, rows, `${mpName}_Shipment.csv`)
}

function downloadCSV(headers, rows, filename) {

    let csvContent = headers.join(",") + "\n"

    rows.forEach(row => {
        csvContent += row.join(",") + "\n"
    })

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
}
