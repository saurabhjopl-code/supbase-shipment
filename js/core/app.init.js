import { renderTabs } from '../ui/tabs.ui.js'
import { initTabBehavior } from '../ui/layout.controller.js'
import { fetchCounts } from '../data/data.fetch.js'

document.addEventListener("DOMContentLoaded", async () => {

    renderTabs()
    initTabBehavior()

    document.getElementById("refreshBtn")
        .addEventListener("click", fetchCounts)

    await fetchCounts()

})
