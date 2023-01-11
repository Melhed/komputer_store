import { setDropdownOptions, updateLaptopSpecs, updateLaptopShowcase } from "./laptopHandler.js";

const balanceElement = document.getElementById("balance");
const payElement = document.getElementById("pay");
const dropdownElement = document.getElementById("laptops-dropdown_alternatives");


const APIEndpoint = "https://hickory-quilled-actress.glitch.me/computers";
let laptops = [];
let balance = 0;
let pay = 0;

fetch(APIEndpoint)
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => {console.log(laptops); setDropdownOptions(laptops)});

function handleLaptopSelection(e) {
    const selectedLaptop = laptops[e.target.selectedIndex];
    updateLaptopSpecs(selectedLaptop);
    updateLaptopShowcase(selectedLaptop);
}



dropdownElement.addEventListener("change", handleLaptopSelection);