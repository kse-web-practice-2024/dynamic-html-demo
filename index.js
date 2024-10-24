const API_KEY = "live_qNGmmIapMgENtt7DfBD9VQVqohCHDu4AepQDIW3LfFQ0BhJ1wyV77I6cnM6aRfRn";


const params = new URLSearchParams();
params.set("api_key", API_KEY);

const link = `https://api.thecatapi.com/v1/breeds`;

fetch("https://official-joke-api.appspot.com/jokes/random/25").then(console.log)

const loadButton = document.body.querySelector(".load");
loadButton.addEventListener("click", fetchData);

const clearButton = document.body.querySelector(".clear");
clearButton.addEventListener("click", clear);


function clear() {
    const parent = document.body.querySelector(".cat-list");
    parent.innerHTML = "";
}

async function fetchData() {
    const parent = document.body.querySelector(".cat-list");
    const loader = createLoader();
    parent.appendChild(loader);

    try {
        const options = {
            headers: new Headers({
                "x-api-key": API_KEY
            })
        };
        const response = await fetch(link, options)

        if(response.ok) {
            const data = await response.json();
            data.forEach((breed) => {
                const { name, description, image: { url } = { url: "/some-default.jpg" } } = breed;
                const li =  createItem(name, description, url);

                parent.appendChild(li);
            });
        } else {
            throw new Error(response.statusText);
        }
    } catch(error) {
        const parent = document.body.querySelector(".cat-list");
        parent.innerHTML = "<li>Error! Please try later</li>";
    } finally {
        loader.remove();
    }
}

function createLoader() {
    const loader = document.createElement("li");
    loader.innerText = "Loading...";
    loader.classList.add("loader")
    return loader;
}

function createItem(name, description, url) {
    const li = document.createElement("li");
    li.classList.add("cat-item");

    const img = document.createElement("img");
    img.classList.add("cat-item-photo");
    img.src = url;
    img.alt = name;
    li.appendChild(img);

    const h2 = document.createElement("h2");
    h2.classList.add("cat-item-title");
    h2.innerText = name;
    li.appendChild(h2);

    const p = document.createElement("p");
    p.classList.add("cat-item-description");
    p.innerText = description;
    li.appendChild(p);
    return li;
}


function render(name, description, url) {
    return `
    <li class="cat-item">
        <img class="cat-item-photo" src="${url}" alt="${name}">
        <h2 class="cat-item-title">${name}</h2>
        <p class="cat-item-description">${description}</p>
    </li>
    `;
}


