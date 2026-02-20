export function renderTabs() {

    const container = document.getElementById("mpTabs")

    container.innerHTML = `
        <button class="tab active" data-tab="summary">Summary</button>
        <button class="tab" data-tab="amazon">Amazon</button>
        <button class="tab" data-tab="flipkart">Flipkart</button>
        <button class="tab" data-tab="myntra">Myntra</button>
        <button class="tab" data-tab="seller">SELLER</button>
    `
}
