import { loadReport } from '../report/report.base.js'
import { renderSummary } from '../summary/summary.base.js'

const summarySection = document.getElementById("summarySection")
const reportSection = document.getElementById("reportSection")

document.addEventListener("DOMContentLoaded", () => {

    // Default load summary
    renderSummary()

    document.querySelectorAll(".mp-tab").forEach(tab => {

        tab.addEventListener("click", () => {

            const mp = tab.dataset.mp

            if (mp === "SUMMARY") {
                reportSection.classList.add("hidden")
                summarySection.classList.remove("hidden")
                renderSummary()
            } else {
                loadReport(mp)
            }
        })
    })
})
