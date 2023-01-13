const payElement = document.getElementById("pay");

let pay = 0;

const getPay = () => pay;

function updatePay(newPay) {
    pay = newPay;
    payElement.innerText = pay;
}

export const work = {
    getPay,
    updatePay,
}