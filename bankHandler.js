const balanceElement = document.getElementById("balance");
const loanContainerElement = document.getElementById("loan-container");
const loanAmountElement = document.getElementById("loanAmount");
const repayLoanBtnElement = document.getElementById("repay-loan-btn");

let balance = 0;
let loan = 0;

const getBalance = () => balance;
const getLoan = () => loan;

function updateBalance(updatedBalance) {
    balance = updatedBalance;
    balanceElement.innerText = updatedBalance;
}

function updateLoan(updatedLoan) {
    loan = updatedLoan;
    if(loan !== 0) {
        loanAmountElement.innerText = loan;
        loanContainerElement.style.display = "";
        repayLoanBtnElement.style.display = "";
        return;
    }
    loanAmountElement.innerText = 0;
    loanContainerElement.style.display = "none";
    repayLoanBtnElement.style.display = "none";
}


export const bank = {
    getBalance,
    updateBalance,
    getLoan,
    updateLoan,
};