import { laptop } from "./laptopHandler.js";
import { bank } from "./bankHandler.js";
import { work } from "./workHandler.js";

const takeLoanBtnElement = document.getElementById("take-loan-btn");
const repayLoanBtnElement = document.getElementById("repay-loan-btn");
const bankTransferBtnElement = document.getElementById("banktransfer-btn");
const workBtnElement = document.getElementById("work-btn");
const dropdownElement = document.getElementById("laptops-dropdown_alternatives");
const checkoutBtn = document.getElementById("showcase-checkout_btn");
const APIEndpoint = "https://hickory-quilled-actress.glitch.me/computers";
const numRegex = new RegExp(/[0-9]/g);

let laptops = [];
let selectedLaptop;

fetch(APIEndpoint)
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => {
        laptop.setDropdownOptions(laptops);
        selectedLaptop = laptops[0];
    });

function handleLaptopSelection(e) {
    selectedLaptop = laptops[e.target.selectedIndex];
    laptop.updateLaptopSpecs(selectedLaptop);
    laptop.updateLaptopShowcase(selectedLaptop);
}

function takeLoan() {
    const loanAmount = prompt("How much would you like to loan?");
    if(bank.getLoan() > 0) return alert("Repay your current loan before taking a new one.");
    if(!numRegex.test(loanAmount)) return alert("Numeric digits only.");
    if(loanAmount > (bank.getBalance()*2) || loanAmount == 0) return alert("You cannot take this loan")

    bank.updateBalance(bank.getBalance() + parseInt(loanAmount));
    bank.updateLoan(parseInt(loanAmount));
}

function transferPayToBank() {
    if(work.getPay() === 0) return alert("There is nothing to transfer!");
    if(bank.getLoan() === 0) {
        bank.updateBalance(bank.getBalance() + work.getPay());
        work.updatePay(0);
        return;
    }

    let loanPayment = (work.getPay()*0.1);
    let bankTransfer = (work.getPay()*0.9);
    work.updatePay(0);

    if(loanPayment >= bank.getLoan()) {
        loanPayment -= bank.getLoan();
        bank.updateLoan(0);
        bank.updateBalance(bank.getBalance() + (bankTransfer + loanPayment));
        return;
    }
    bank.updateBalance(bank.getBalance() + bankTransfer);
    bank.updateLoan(bank.getLoan() - loanPayment);
}

function repayLoan() {
    if(work.getPay() >= bank.getLoan()) {
        work.updatePay(work.getPay() - bank.getLoan());
        bank.updateLoan(0);
        return;
    }
    bank.updateLoan(bank.getLoan() - work.getPay());
    work.updatePay(0);
}

function doWork() {
    work.updatePay(work.getPay() + 100);
}

function buyLaptop() {
    if(bank.getBalance() >= selectedLaptop.price) {
        bank.updateBalance(bank.getBalance() -= selectedLaptop.price);
        alert(`You have purchased the ${selectedLaptop.title}!`);
        return;
    }
    alert(`You need ${selectedLaptop.price - bank.getBalance()} kr more to afford this laptop!`);
}

takeLoanBtnElement.addEventListener("click", takeLoan);
repayLoanBtnElement.addEventListener("click", repayLoan);
bankTransferBtnElement.addEventListener("click", transferPayToBank);
workBtnElement.addEventListener("click", doWork);
dropdownElement.addEventListener("change", handleLaptopSelection);
checkoutBtn.addEventListener("click", buyLaptop);