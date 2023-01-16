const balanceElement = document.getElementById("balance");
const loanContainerElement = document.getElementById("loan-container");
const loanAmountElement = document.getElementById("loanAmount");
const repayLoanBtnElement = document.getElementById("repay-loan-btn");

let balance = 0;
let loan = 0;

const getBalance = () => balance;
const getLoan = () => loan;
const deposit = (amount) => {balance += amount; updateBalance()};
const increaseLoan = (amount) => {loan += amount; updateLoan()};

// Updates formatted balance info in the DOM
function updateBalance() {
    balanceElement.innerText = new Intl.NumberFormat("sv-SV", {style: "currency", currency: "SEK", maximumFractionDigits: 0}).format(balance)
};

function withdraw(amount){
    if(balance - amount <= 0) {
        balance = 0;
        return updateBalance();
    }
    balance -= amount; updateBalance()
};

function makeLoanPayment(amount) {
    if(loan - amount < 0) {
        loan = 0;
        updateLoan();
        return;
    }
    loan -= amount;
    updateLoan()
};

// Updates loan info in the DOM
function updateLoan() {
    if(loan !== 0) {
        loanAmountElement.innerText = new Intl.NumberFormat("sv-SV", {style: "currency", currency: "SEK", maximumFractionDigits: 0}).format(loan);
        loanContainerElement.classList = "flex justify-between mx-5 mt-5";
        repayLoanBtnElement.classList = "bg-violet-700 text-white text-lg font-semibold py-0.5 px-1 rounded-br-md w-1/2";
        return;
    }
    loanAmountElement.innerText = 0;
    loanContainerElement.classList = "hidden";
    repayLoanBtnElement.classList = "hidden";
}


export const bank = {
    deposit,
    getBalance,
    getLoan,
    increaseLoan,
    makeLoanPayment,
    withdraw,
};