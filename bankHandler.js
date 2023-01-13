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
        loanContainerElement.classList = "flex justify-between mx-5 mt-5";
        repayLoanBtnElement.classList = "bg-violet-800 text-white text-lg font-semibold py-0.5 px-1 rounded-br-md w-1/2";
        return;
    }
    loanAmountElement.innerText = 0;
    loanContainerElement.classList = "hidden";
    repayLoanBtnElement.classList = "hidden";
}


export const bank = {
    getBalance,
    updateBalance,
    getLoan,
    updateLoan,
};