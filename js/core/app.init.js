import { renderHeader } from '../ui/header.ui.js'
import { renderTabs } from '../ui/tabs.ui.js'
import { initTabBehavior } from '../ui/layout.controller.js'
import { initLoader, showLoader, hideLoader } from '../ui/loader.ui.js'

import { fetchSalesCount } from '../data/fetch.sales.js'
import { fetchFCStockCount } from '../data/fetch.fcstock.js'
import { fetchUniwareCount } from '../data/fetch.uniware.js'
import { fetchRemarksCount } from '../data/fetch.remarks.js'

document.addEventListener("DOMContentLoaded", async () => {

    renderHeader()
    renderTabs()
    initTabBehavior()
    initLoader()

    document.getElementById("refreshBtn")
        .addEventListener("click", loadCounts)

    await loadCounts()

})

async function loadCounts() {

    try {
        showLoader()

        const saleCount = await fetchSalesCount()
        const fcCount = await fetchFCStockCount()
        const uniwareCount = await fetchUniwareCount()
        const remarkCount = await fetchRemarksCount()

        document.getElementById("saleCount").innerText = saleCount
        document.getElementById("fcCount").innerText = fcCount
        document.getElementById("uniwareCount").innerText = uniwareCount
        document.getElementById("remarkCount").innerText = remarkCount

        hideLoader()

    } catch (error) {
        console.error("Load error:", error)
        hideLoader()
        alert("Supabase connection failed.")
    }

}
