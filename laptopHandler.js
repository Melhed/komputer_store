const dropdownElement = document.getElementById("laptops-dropdown_alternatives");
const specsElement = document.getElementById("laptops-specs");
const imgElement = document.getElementById("img");
const showcaseNameElement = document.getElementById("showcase-product_name");
const showcaseDescriptionElement = document.getElementById("showcase-product_description");
const showcasePriceElement = document.getElementById("showcase-checkout_price");
const laptopHistory = document.getElementById("laptop-history");

// Sets laptop dropdown options into the DOM
export function setDropdownOptions(laptops) {
    if(laptops[0] == null || laptops[0] == undefined) {
        console.log("Error: No laptops found.")
        return;
    }

    for(let i = 0; i < laptops.length; i++) {
        const optionElement = document.createElement("option");
        optionElement.value = laptops[i].id;
        optionElement.innerText = laptops[i].title;
        dropdownElement.appendChild(optionElement);
    }

    updateLaptopShowcase(laptops[0]);
    updateLaptopSpecs(laptops[0]);
}

// Sets the currently selected laptop's specs in the DOM
function updateLaptopSpecs(laptop) {
    specsElement.innerText = "";

    for(let i = 0; i < laptop.specs.length; i++) {
        const spanElement = document.createElement("span");
        spanElement.innerText = laptop.specs[i];
        spanElement.className = "laptops-specs_span";
        specsElement.append(spanElement);
    }
}

// Sets the showcase info to the currently selected laptop in the DOM
function updateLaptopShowcase(laptop) {
    imgElement.src = `https://hickory-quilled-actress.glitch.me/${laptop.image}`;

    showcaseNameElement.innerText = laptop.title;
    showcaseDescriptionElement.innerText = laptop.description;
    showcasePriceElement.innerText = new Intl.NumberFormat("sv-SV", {style: "currency", currency: "SEK", maximumFractionDigits: 0}).format(laptop.price);
}

// Adds purchased laptop to purchase history in the DOM
function purchaseLaptop(laptop) {
    const purchasedLaptop = document.createElement("div");
    purchasedLaptop.id = `${getCurrentTime()}`;
    purchasedLaptop.innerHTML = purchasedLaptopTemplate(laptop);
    laptopHistory.appendChild(purchasedLaptop);
}

const purchasedLaptopTemplate = (laptop) => `
<div class="w-2/3 h-24 mx-auto rounded-md bg-slate-200 flex mt-2">
    <img src="https://hickory-quilled-actress.glitch.me/${laptop.image}" class="h-24 rounded-l-md">
    <div class="ml-2 my-auto">
        <h2 class="font-semibold">${laptop.title}</h2>
        <span>${laptop.description}</span>
    </div>
    <div class="ml-10 my-auto">
        <h2 class="font-semibold">Purchased at ${getCurrentTime()}</h2>
    </div>
    <div class="my-auto ml-10">
        <h2 class="font-semibold">${new Intl.NumberFormat("sv-SV", {style: "currency", currency: "SEK", maximumFractionDigits: 0}).format(laptop.price)}</h2>
    </div>

    <button id="${getCurrentTime()}" class="text-lg font-semibold rounded-md py-0.5 px-2 bg-red-600 ml-10 text-white my-auto">Refund</button>
</div>
`;

const getCurrentTime = () => {
    let date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export const laptop = {
    setDropdownOptions,
    updateLaptopSpecs,
    updateLaptopShowcase,
    purchaseLaptop,
    getCurrentTime,
}