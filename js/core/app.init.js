import { renderHeader } from '../ui/header.ui.js'
import { renderTabs } from '../ui/tabs.ui.js'
import { initTabBehavior } from '../ui/layout.controller.js'
import { initLoader, showLoader, hideLoader, animateCounter } from '../ui/loader.ui.js'

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

        animateCounter("saleCount", saleCount)
        animateCounter("fcCount", fcCount)
        animateCounter("uniwareCount", uniwareCount)
        animateCounter("remarkCount", remarkCount)

        hideLoader()

    } catch (error) {
        console.error("Load error:", error)
        hideLoader()
        alert("Supabase connection failed.")
    }

}
