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
