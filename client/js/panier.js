console.log("test")
fetch('http://localhost:3000/api/teddies')
    .then(res => res.json())
    .then(data => createBasketTeddies(data));

let storeTeddies = JSON.parse(localStorage.getItem('teddies-basket'));
console.log(storeTeddies);

function createBasketTeddies(teddies) {
    let divParentParent = document.createElement("div");
    const teddiesBasket = document.getElementById("teddies-basket");
    teddiesBasket.appendChild(divParentParent);
    divParentParent.classList.add("basket");
    console.log(teddiesBasket)

    const teddiesDivCart = document.createElement("div");
    divParentParent.appendChild(teddiesDivCart);
    teddiesDivCart.className = 'teddies_cart';

    const teddiesTittle = document.createElement("h3");
    teddiesDivCart.appendChild(teddiesTittle);
    teddiesTittle.textContent = "Teddies:";

    if (storeTeddies == null || storeTeddies.length === 0) {
        // si le panier est vide 
        const cart = document.createElement("p");
        teddiesDivCart.appendChild(cart);
        cart.classList.add = ("cart");
        cart.textContent = "Votre panier est vide !";

    } else {
        // si produits dans le panier : récupération des éléments du panier
        let i = 0;
        for (storeTeddy of storeTeddies) {
            const aTeddy = document.createElement('div');
            teddiesDivCart.appendChild(aTeddy);
            aTeddy.className = "a_teddy";

            const teddiesCart = document.createElement("p");
            aTeddy.appendChild(teddiesCart);
            teddiesCart.src = teddies[i].imageUrl;
            teddiesCart.textContent = storeTeddy.quantity + " " + storeTeddy.teddiesName + " , " + storeTeddy.teddiesColor;

            const teddiesPrice = document.createElement('div');
            aTeddy.appendChild(teddiesPrice);
            teddiesPrice.className = 'teddies_price';
            teddiesPrice.id = i++;

            const price = document.createElement('p');
            teddiesPrice.appendChild(price);
            price.textContent = storeTeddy.teddiesPrice + "$"

            // création bouton supprimer 

            const removeTeddies = document.createElement('button');
            teddiesPrice.appendChild(removeTeddies);
            removeTeddies.className = 'remove_teddies';
            removeTeddies.title = 'Supprimer cet article ?';

            const button = document.createElement('i');
            removeTeddies.appendChild(button);
            button.className = 'fas fa-trash-alt';
        };
        // recupération produit supprimé du panier

        let removeTeddies = document.getElementsByClassName('remove_teddies');
        for (let i = 0; i < removeTeddies.length; i++) {
            removeTeddies[i].addEventListener('click', function(event) {
                event.preventDefault();
                let id = this.closest('.teddies_price').id;

                //on supprime l'article du localStorage

                storeTeddies.splice(id, 1);

                // enregistrement  nouveau localStorage

                localStorage.setItem('teddies-basket', JSON.stringify(storeTeddies));
                JSON.parse(localStorage.getItem('teddies-basket'));

                alert('Cet article a bien été supprimé !');
                window.location.href = "panier.html";
            });
        };
        // total de la commande 
        let totalPrice = []
        for (storeTeddy of storeTeddies) {
            let article = storeTeddy.teddiesPrice;
            totalPrice.push(article);
        };
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const globalPrice = totalPrice.reduce(reducer, 0);
        console.log(globalPrice);

        const total = document.createElement('p');
        teddiesDivCart.appendChild(total);
        total.className = 'total';
        total.textContent = "Total commande = " + globalPrice + " $";

        //création du formulaire de commande
        const form = document.createElement('form');
        teddiesBasket.appendChild(form);
        form.classList.add = "formulaire";

        const formTitle = document.createElement('h3');
        form.appendChild(formTitle);
        formTitle.textContent = "Coordonnées de livraison ";

        const firstName = document.createElement('div');
        form.appendChild(firstName);
        firstName.className = "name";

        const labelFirstName = document.createElement('label');
        firstName.appendChild(labelFirstName);
        labelFirstName.setAttribute('for', 'prénom');
        labelFirstName.textContent = " Prénom : ";

        const inputFirstName = document.createElement('input');
        firstName.appendChild(inputFirstName);
        inputFirstName.setAttribute('type', 'text');
        inputFirstName.setAttribute('class', 'name');
        inputFirstName.name = "Prénom";

        const lastName = document.createElement('div');
        form.appendChild(lastName);
        lastName.className = 'name';

        const labelLastName = document.createElement('label');
        lastName.appendChild(labelLastName);
        labelLastName.setAttribute('for', 'nom');
        labelLastName.textContent = ' Nom : ';

        const inputLastName = document.createElement('input');
        lastName.appendChild(inputLastName);
        inputLastName.setAttribute('type', 'text');
        inputLastName.setAttribute('class', 'name');
        inputLastName.name = "Nom"

        const address = document.createElement('div');
        form.appendChild(address);
        address.className = 'name';

        const labelAdress = document.createElement('label');
        address.appendChild(labelAdress);
        labelAdress.setAttribute('for', 'adresse');
        labelAdress.textContent = 'Adresse : ';

        const inputAddress = document.createElement('input');
        address.appendChild(inputAddress);
        inputAddress.setAttribute('type', 'text');
        inputAddress.setAttribute('class', 'name');
        inputAddress.name = "Adresse"


    }

}