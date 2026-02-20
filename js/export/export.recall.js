import { supabase } from '../core/supabase.client.js'

export async function exportRecall(mpName) {

    const { data, error } = await supabase
        .from("v_final_shipment_v2")
        .select("*")
        .eq("mp", mpName)
        .gt("recall", 0)

    if (error) {
        alert("Export failed")
        console.error(error)
        return
    }

    if (!data.length) {
        alert("No recall data available.")
        return
    }

    const headers = [
        "MP",
        "Allocated FC",
        "MPSKU",
        "Uniware SKU",
        "FC Stock",
        "Stock Cover",
        "Recall Qty"
    ]

    const rows = data.map(row => [
        row.mp,
        row.allocated_fc,
        row.mpsku,
        row.uniware_sku,
        row.fc_stock,
        Number(row.stock_cover).toFixed(1),
        Math.round(row.recall)
    ])

    downloadCSV(headers, rows, `${mpName}_Recall.csv`)
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
