let storedTeddies = JSON.parse(localStorage.getItem('teddiesBasket'));
console.log(storeTeddies);

let divBasket = document.createElement('div');
const teddiesBasket = document.getElementById('teddies-basket');
divBasket.appendChild(teddiesBasket);
teddiesBasket.classList.add('basket-card');