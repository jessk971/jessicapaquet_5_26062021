console.log("test")
fetch('http://localhost:3000/api/teddies')
    .then(res => res.json())
    .then(data => createConfirmTeddies(data));

// confirmation de la commande //
let orderId = localStorage.getItem('responseOrder');
console.log(orderId);

let stockage = localStorage.getItem('globalPrice');
console.log(stockage);

let contact = JSON.parse(localStorage.getItem("contact"));
console.log(contact);

function createConfirmTeddies(teddies) {
    let divConfirm = document.createElement("div");
    const validationTeddies = document.getElementById("validation-teddies");
    validationTeddies.appendChild(divConfirm);
    divConfirm.classList.add('valid');

    const confirmTitle = document.createElement('h1');
    divConfirm.appendChild(confirmTitle);
    confirmTitle.textContent = "Félicitation!";

    const GifTeddy = document.createElement('img');
    validationTeddies.appendChild(GifTeddy);
    GifTeddy.src = "images/teddy.gif"


    const confirmTitleH3 = document.createElement('h3');
    validationTeddies.appendChild(confirmTitleH3);
    confirmTitleH3.textContent = "Votre commande n°" + orderId + " est validée.";

    const confirmPrice = document.createElement("h3");
    validationTeddies.appendChild(confirmPrice);
    confirmPrice.textContent = "Montant total de la commande: " + stockage + "$";

    const thanks = document.createElement("h3");
    validationTeddies.appendChild(thanks);
    thanks.textContent = "Merci de votre visite et à bientôt chez ORINOCO!";

    const returnOrder = document.createElement('button');
    validationTeddies.appendChild(returnOrder);
    returnOrder.classList.add("return")
    returnOrder.textContent = "Retour Accueil";

    returnOrder.addEventListener("click", function(event) {
        window.location.href = "index.html";
    });
}

localStorage.clear();