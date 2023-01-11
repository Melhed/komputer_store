const dropdownElement = document.getElementById("laptops-dropdown_alternatives");
const specsElement = document.getElementById("laptops-specs");
const showcaseImgElement = document.getElementById("showcase-img-container");
const showcaseNameElement = document.getElementById("showcase-product_name");
const showcaseDescriptionElement = document.getElementById("showcase-product_description");
const showcasePriceElement = document.getElementById("showcase-checkout_price");

export function setDropdownOptions(laptops) {
    if(laptops[0] == null || laptops[0] == undefined) {
        console.log("Error: No laptops found.")
        return;
    }

    for(let i = 0; i < laptops.length; i++) {
        const optionElement = document.createElement("option");
        optionElement.value = laptops[i].id;
        optionElement.innerHTML = laptops[i].title;
        dropdownElement.appendChild(optionElement);
    }

    updateLaptopShowcase(laptops[0]);
    updateLaptopSpecs(laptops[0]);
}

export function updateLaptopSpecs(laptop) {
    specsElement.innerText = "";

    for(let i = 0; i < laptop.specs.length; i++) {
        const spanElement = document.createElement("span");
        spanElement.innerText = laptop.specs[i];
        spanElement.className = "laptops-specs_span";
        specsElement.append(spanElement);
    }
}

export function updateLaptopShowcase(laptop) {
    showcaseImgElement.innerHTML = "";
    const imgElement = document.createElement("img");
    imgElement.src = `https://hickory-quilled-actress.glitch.me/${laptop.image}`;
    imgElement.id = "showcase-img";
    showcaseImgElement.appendChild(imgElement);

    showcaseNameElement.innerText = laptop.title;
    showcaseDescriptionElement.innerText = laptop.description;
    showcasePriceElement.innerText = new Intl.NumberFormat("sv-SV", {style: "currency", currency: "SEK", maximumFractionDigits: 0}).format(laptop.price);
}