import { laptop } from "./laptopHandler.js";
import { bank } from "./bankHandler.js";
import { work } from "./workHandler.js";

const takeLoanBtnElement = document.getElementById("take-loan-btn");
const repayLoanBtnElement = document.getElementById("repay-loan-btn");
const bankTransferBtnElement = document.getElementById("banktransfer-btn");
const workBtnElement = document.getElementById("work-btn");
const dropdownElement = document.getElementById("laptops-dropdown_alternatives");
const checkoutBtn = document.getElementById("showcase-checkout_btn");
const purchasedHistory = document.getElementById("laptop-history");
const APIEndpoint = "https://hickory-quilled-actress.glitch.me/computers";
const numRegex = new RegExp(/[0-9]/g);

let laptops = [];
let purchasedLaptops = [];
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

// Grants / denies user's requested loan
function takeLoan() {
    const loanAmount = prompt("How much would you like to loan?");
    if(bank.getLoan() > 0) return alert("Repay your current loan before taking a new one.");
    if(!numRegex.test(loanAmount)) return alert("Numeric digits only.");
    if(loanAmount > (bank.getBalance()*2) || loanAmount == 0) return alert("You cannot take this loan")

    bank.deposit(parseInt(loanAmount));
    bank.increaseLoan(parseInt(loanAmount));
}

function transferPayToBank() {
    if(work.getPay() === 0) return alert("There is nothing to transfer!");
    if(bank.getLoan() === 0) {
        bank.deposit(work.getPay());
        work.updatePay(0);
        return
    }

    let loanPayment = (work.getPay()*0.1);
    let bankTransfer = (work.getPay()*0.9);
    work.updatePay(0);

    if(loanPayment >= bank.getLoan()) {
        bankTransfer += (loanPayment - bank.getLoan());
        bank.makeLoanPayment(loanPayment);
        bank.deposit(bankTransfer);
        return;
    }
    bank.deposit(bankTransfer);
    bank.makeLoanPayment(loanPayment);
}

function repayLoan() {
    const loan = bank.getLoan();

    if(work.getPay() >= loan) {
        bank.makeLoanPayment(work.getPay());
        work.updatePay(work.getPay() - loan);
        return;
    }

    bank.makeLoanPayment(work.getPay());
    work.updatePay(0);
}

function doWork() {
    work.updatePay(work.getPay() + 100);
}

// Purchases laptop and adds to laptop history
function buyLaptop() {
    if(bank.getBalance() >= selectedLaptop.price) {
        bank.withdraw(selectedLaptop.price);
        alert(`You have purchased the ${selectedLaptop.title}!`);
        laptop.purchaseLaptop(selectedLaptop);

        purchasedLaptops.push({
            "id" : laptop.getCurrentTime(),
            "price" : parseInt(selectedLaptop.price),
        });
        return;
    }
    alert(`You need ${selectedLaptop.price - bank.getBalance()} kr more to afford this laptop!`);
}

// Refunds laptop based on click event
function refundLaptop(e) {
    const laptopId = e.target.id;
    const laptopIndex = getPurchasedLaptopIndex(laptopId);

    if(laptopIndex === -1) {
        return;
    }
    const msg = confirm("Are you sure you want to refund?");
    if(!msg) {
        return;
    }
    
    bank.deposit(purchasedLaptops[laptopIndex].price);
    purchasedLaptops.splice(laptopIndex, 1);
    purchasedHistory.removeChild(document.getElementById(laptopId));
}

function getPurchasedLaptopIndex (id) {
    for(let i = 0; i < purchasedLaptops.length; i ++) {
        if(purchasedLaptops[i].id === id) {
            return i;
        }
    }
    return -1;
}

takeLoanBtnElement.addEventListener("click", takeLoan);
repayLoanBtnElement.addEventListener("click", repayLoan);
bankTransferBtnElement.addEventListener("click", transferPayToBank);
workBtnElement.addEventListener("click", doWork);
dropdownElement.addEventListener("change", handleLaptopSelection);
checkoutBtn.addEventListener("click", buyLaptop);
purchasedHistory.addEventListener("click", refundLaptop)