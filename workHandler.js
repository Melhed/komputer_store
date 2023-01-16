const payElement = document.getElementById("pay");
let pay = 0;

const getPay = () => pay;

function updatePay(newPay) {
    pay = newPay;
    payElement.innerText = new Intl.NumberFormat("sv-SV", {style: "currency", currency: "SEK", maximumFractionDigits: 0}).format(pay);
}

export const work = {
    getPay,
    updatePay,
}