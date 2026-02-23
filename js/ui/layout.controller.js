import { renderSummary } from '../summary/summary.base.js'
import { renderReport } from '../reports/report.base.js'

let currentTab = "summary"

export function initTabBehavior() {

    const tabs = document.querySelectorAll(".tab")
    const summarySection = document.getElementById("summarySection")
    const reportSection = document.getElementById("reportSection")

    tabs.forEach(tab => {

        tab.addEventListener("click", async () => {

            tabs.forEach(t => t.classList.remove("active"))
            tab.classList.add("active")

            currentTab = tab.dataset.tab

            if (currentTab === "summary") {
                summarySection.classList.remove("hidden")
                reportSection.classList.add("hidden")
                await renderSummary()
            } else {
                summarySection.classList.add("hidden")
                reportSection.classList.remove("hidden")

                const mpFormatted =
                    currentTab === "seller"
                        ? "SELLER"
                        : currentTab.charAt(0).toUpperCase() + currentTab.slice(1)

                await renderReport(mpFormatted)
            }
        })
    })

    // 🔥 AUTO LOAD SUMMARY ON START
    renderSummary()
}
