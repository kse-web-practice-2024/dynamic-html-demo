const API_KEY = "live_qNGmmIapMgENtt7DfBD9VQVqohCHDu4AepQDIW3LfFQ0BhJ1wyV77I6cnM6aRfRn";


fetch('https://api.thecatapi.com/v1/breeds?api_key=' + API_KEY).then(res => res.json()).then((data) => {
    const elements = data.map(item => {
        const { description, name, image: { url } = {url: null}} = item;
        return render(url, name, description);
    });

    const container = document.body.querySelector('.cat-list');
    container.innerHTML = elements.join("");
})

function render(img, name, description) {
    return `
    <li class="cat-item">
        <img class="cat-item-photo" src="${img}" alt="Cat">
        <h2 class="cat-item-title">${name}</h2>
        <p class="cat-item-description">${description}</p>
    </li>
    `
}
