const balanceElement = document.getElementById("balance");
const loanContainerElement = document.getElementById("loan-container");
const loanAmountElement = document.getElementById("loanAmount");
const repayLoanBtnElement = document.getElementById("repay-loan-btn");

// Updates the balance in the DOM
export function updateBalance(balance) {
    balanceElement.innerText = balance;
}

// Updates the loan in the DOM
export function updateLoan(loan) {
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