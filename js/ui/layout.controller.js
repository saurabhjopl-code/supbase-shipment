export function initTabBehavior() {

    const tabs = document.querySelectorAll(".tab")
    const summarySection = document.getElementById("summarySection")
    const reportSection = document.getElementById("reportSection")

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

            tabs.forEach(t => t.classList.remove("active"))
            tab.classList.add("active")

            if (tab.dataset.tab === "summary") {
                summarySection.classList.remove("hidden")
                reportSection.classList.add("hidden")
            } else {
                summarySection.classList.add("hidden")
                reportSection.classList.remove("hidden")
            }
        })
    })
}
