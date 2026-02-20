import { renderSummary } from '../summary/summary.base.js'
import { renderReport } from '../reports/report.base.js'

export function initTabBehavior() {

    const tabs = document.querySelectorAll(".tab")
    const summarySection = document.getElementById("summarySection")
    const reportSection = document.getElementById("reportSection")

    tabs.forEach(tab => {
        tab.addEventListener("click", async () => {

            tabs.forEach(t => t.classList.remove("active"))
            tab.classList.add("active")

            const tabName = tab.dataset.tab

            if (tabName === "summary") {
                summarySection.classList.remove("hidden")
                reportSection.classList.add("hidden")
                await renderSummary()
            } else {
                summarySection.classList.add("hidden")
                reportSection.classList.remove("hidden")
                await renderReport(tabName)
            }

        })
    })
}
