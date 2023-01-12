const payElement = document.getElementById("pay");

// Updates the pay in the DOM
export function updatePay(pay) {
    payElement.innerText = pay;
}