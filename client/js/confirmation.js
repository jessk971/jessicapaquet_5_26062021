console.log("test")
fetch('http://localhost:3000/api/teddies')
    .then(res => res.json())
    .then(data => createConfirm(data));



let orderId = localStorage.getItem('commandeOk');
console.log(orderId);

let stockage = localStorage.getItem('globalPrice');
console.log(stockage);



function createConfirm(teddies) {
    let divParentParent = document.createElement('div');
    const confirmTeddies = document.getElementById("confirm_teddies");
    confirmTeddies.appendChild(divParentParent);
    divParentParent.className = 'confirmer';
    console.log(confirmTeddies)

}

localStorage.clear();