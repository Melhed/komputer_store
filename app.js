import { setDropdownOptions, updateLaptopSpecs, updateLaptopShowcase } from "./laptopHandler.js";
import { updateBalance, updateLoan} from "./bankHandler.js";
import { updatePay } from "./workHandler.js";

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
let balance = 0;
let loan = 0;
let pay = 0;

fetch(APIEndpoint)
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => {
        setDropdownOptions(laptops);
        selectedLaptop = laptops[0];
    });

function handleLaptopSelection(e) {
    selectedLaptop = laptops[e.target.selectedIndex];
    updateLaptopSpecs(selectedLaptop);
    updateLaptopShowcase(selectedLaptop);
}

function takeLoan() {
    const loanAmount = prompt("How much would you like to loan?");
    if(loan > 0) return alert("Repay your current loan before taking a new one.");
    if(!numRegex.test(loanAmount)) return alert("Numeric digits only.");
    if(loanAmount > (balance*2) || loanAmount == 0) return alert("You cannot take this loan")
    
    loan = parseInt(loanAmount);
    balance += parseInt(loanAmount);

    updateBalance(balance);
    updateLoan(loan);
}

function transferPayToBank() {
    if(pay === 0) return alert("There is nothing to transfer!");
    if(loan === 0) {
        updateBalance(balance += pay);
        updatePay(pay = 0);
        return;
    }

    let loanPayment = (pay*0.1);
    let bankTransfer = (pay*0.9);
    updatePay(pay = 0);

    if(loanPayment >= loan) {
        loanPayment -= loan;
        updateLoan(loan = 0);
        updateBalance(balance += (bankTransfer + loanPayment));
        return;
    }
    updateLoan(loan -= loanPayment);
}

function repayLoan() {
    if(pay >= loan) {
        updatePay(pay -= loan);
        updateLoan(loan = 0);
        return;
    }
    updateLoan(loan -= pay);
    updatePay(pay = 0);
}

function work() {
    updatePay(pay += 100);
}

function buyLaptop() {
    if(balance >= selectedLaptop.price) {
        updateBalance(balance -= selectedLaptop.price);
        alert(`You have purchased the ${selectedLaptop.title}!`);
        return;
    }
    alert(`You need ${selectedLaptop.price - balance} kr more to afford this laptop!`);
}

takeLoanBtnElement.addEventListener("click", takeLoan);
repayLoanBtnElement.addEventListener("click", repayLoan);
bankTransferBtnElement.addEventListener("click", transferPayToBank);
workBtnElement.addEventListener("click", work);
dropdownElement.addEventListener("change", handleLaptopSelection);
checkoutBtn.addEventListener("click", buyLaptop);