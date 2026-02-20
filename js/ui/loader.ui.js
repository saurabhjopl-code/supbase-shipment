let loaderElement = null

export function initLoader() {
    loaderElement = document.createElement("div")
    loaderElement.id = "topLoader"
    document.body.appendChild(loaderElement)
}

export function showLoader() {
    if (!loaderElement) return
    loaderElement.classList.add("active")
}

export function hideLoader() {
    if (!loaderElement) return
    setTimeout(() => {
        loaderElement.classList.remove("active")
    }, 400)
}

/* ===== Animated Counter ===== */

export function animateCounter(elementId, targetValue, duration = 800) {

    const element = document.getElementById(elementId)
    const startValue = 0
    const startTime = performance.now()

    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1)
        const currentValue = Math.floor(progress * (targetValue - startValue) + startValue)

        element.innerText = currentValue.toLocaleString()

        if (progress < 1) {
            requestAnimationFrame(update)
        }
    }

    requestAnimationFrame(update)
}
