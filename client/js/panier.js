console.log("test")
fetch('http://localhost:3000/api/teddies')
    .then(res => res.json())
    .then(data => createBasketTeddies(data));

let storedTeddies = JSON.parse(localStorage.getItem('teddies-basket'));
console.log(storedTeddies);

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
    teddiesTittle.textContent = "Teddies";

    if (storedTeddies == null || storedTeddies.length === 0) {
        // si le panier est vide 
        const cart = document.createElement("p");
        teddiesDivCart.appendChild(cart);
        cart.classList.add = ("cart");
        cart.textContent = "Votre panier est vide !";

    } else {
        // si produits dans le panier : récupération des éléments du panier
        let i = 0;
        for (storedTeddy of storedTeddies) {
            const aTeddy = document.createElement('div');
            teddiesDivCart.appendChild(aTeddy);
            aTeddy.className = "a_teddy";

            const teddiesCart = document.createElement("p");
            aTeddy.appendChild(teddiesCart);
            teddiesCart.src = teddies[i].imageUrl;
            teddiesCart.textContent = storedTeddy.quantity + " " + storedTeddy.name + " , " + storedTeddy.color;

            const teddiesPrice = document.createElement('div');
            aTeddy.appendChild(teddiesPrice);
            teddiesPrice.className = 'teddies_price';
            teddiesPrice.id = i++;

            const price = document.createElement('p');
            teddiesPrice.appendChild(price);
            price.textContent = storedTeddy.price + "$"

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

                storedTeddies.splice(id, 1);

                //nouveau localStorage

                localStorage.setItem('teddies-basket', JSON.stringify(storedTeddies));
                JSON.parse(localStorage.getItem('teddies-basket'));

                alert('Cet article a bien été supprimé !');
                window.location.href = "panier.html";
            });
        };
        // total de la commande 
        let totalPrice = []
        for (storedTeddy of storedTeddies) {
            let article = storedTeddy.price;
            totalPrice.push(article);
        };
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const globalPrice = totalPrice.reduce(reducer, 0);
        console.log(globalPrice);

        const total = document.createElement('p');
        teddiesDivCart.appendChild(total);
        total.className = 'total';
        total.textContent = "Total commande = " + globalPrice + " $";

        //validation nom prénom et ville du formulaire

        function valid(value) {
            return /^[A-Z-a-z\s]{3,40}$/.test(value);
        };

        //validation adresse code postal du formulaire 

        function validAddressZip(value) {
            return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
        };

        //validation email 
        function validEmail(value) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
        };

        // formulaire de commande
        const form = document.createElement('form');
        teddiesBasket.appendChild(form);
        form.classList.add = "formulaire";

        const formTitle = document.createElement('h3');
        form.appendChild(formTitle);
        formTitle.textContent = "Adresse de livraison ";

        const divName = document.createElement('div');
        form.appendChild(divName);
        divName.className = "div_name";

        const firstName = document.createElement('div');
        divName.appendChild(firstName);
        firstName.className = "delivery1";

        const labelFirstName = document.createElement('label');
        firstName.appendChild(labelFirstName);
        labelFirstName.setAttribute('for', 'prénom');
        labelFirstName.textContent = " Prénom : ";

        const inputFirstName = document.createElement('input');
        firstName.appendChild(inputFirstName);
        inputFirstName.setAttribute('type', 'text');
        inputFirstName.setAttribute('class', 'name1');
        inputFirstName.name = "Prénom"
        inputFirstName.required = true;

        inputFirstName.addEventListener("change", function(event) {
            if (valid(inputFirstName.value)) {} else {
                alert("Aucun chiffre ou symbole n'est accepté.")
                event.preventDefault()

            }
        });

        const lastName = document.createElement('div');
        divName.appendChild(lastName);
        lastName.className = 'delivery1';

        const labelLastName = document.createElement('label');
        lastName.appendChild(labelLastName);
        labelLastName.setAttribute('for', 'nom');
        labelLastName.textContent = ' Nom : ';

        const inputLastName = document.createElement('input');
        lastName.appendChild(inputLastName);
        inputLastName.setAttribute('type', 'text');
        inputLastName.setAttribute('class', 'name2');
        inputLastName.name = "Nom"
        inputLastName.required = true;

        inputLastName.addEventListener("change", function(event) {
            if (valid(inputLastName.value)) {} else {
                alert("Aucun chiffre ou symbole n'est accepté.")
                event.preventDefault()
            }
        });



        const divAdress = document.createElement('div');
        form.appendChild(divAdress);
        divAdress.className = "div_adress";

        const address = document.createElement('div');
        divAdress.appendChild(address);
        address.className = 'delivery2';

        const labelAdress = document.createElement('label');
        address.appendChild(labelAdress);
        labelAdress.setAttribute('for', 'adresse');
        labelAdress.textContent = 'Adresse : ';

        const inputAddress = document.createElement('input');
        address.appendChild(inputAddress);
        inputAddress.setAttribute('type', 'text');
        inputAddress.setAttribute('class', 'name3');
        inputAddress.name = "Adresse"
        inputAddress.required = true;

        inputAddress.addEventListener("change", function(event) {
            if (validAddressZip(inputAddress.value)) {


            } else {
                event.preventDefault()
                alert("Aucun symbole n'est accepté.");
            }
        });

        const city = document.createElement('div');
        divAdress.appendChild(city);
        city.className = 'delivery2';

        const labelCity = document.createElement('label');
        city.appendChild(labelCity);
        labelCity.setAttribute('for', 'ville');
        labelCity.textContent = 'Ville : ';

        const inputCity = document.createElement('input');
        city.appendChild(inputCity);
        inputCity.setAttribute('type', 'text');
        inputCity.setAttribute('class', 'name4');
        inputCity.name = "Ville"
        inputCity.required = true;

        inputCity.addEventListener("change", function(event) {
            if (valid(inputCity.value)) {


            } else {
                alert("Aucun chiffre ou symbole n'est accepté.")
                event.preventDefault()
            }
        });

        const divZip = document.createElement('div');
        form.appendChild(divZip);
        divZip.className = "div_zip";

        const zip = document.createElement('div');
        divZip.appendChild(zip);
        zip.className = 'delivery3';

        const labelZip = document.createElement('label');
        zip.appendChild(labelZip);
        labelZip.setAttribute('for', 'code postal');
        labelZip.textContent = 'Code Postal : ';

        const inputZip = document.createElement('input');
        zip.appendChild(inputZip);
        inputZip.setAttribute('type', 'text');
        inputZip.setAttribute('class', 'name5');
        inputZip.name = "Code Postal"
        inputZip.required = true;

        inputZip.addEventListener("change", function(event) {
            if (validAddressZip(inputZip.value)) {} else {
                event.preventDefault()
                alert("Aucun symbole n'est accepté.");
            }
        });

        const mail = document.createElement('div');
        divZip.appendChild(mail);
        mail.className = 'delivery3';

        const labelMail = document.createElement('label');
        mail.appendChild(labelMail);
        labelMail.setAttribute('for', 'email');
        labelMail.textContent = 'E-mail : ';

        const inputMail = document.createElement('input');
        mail.appendChild(inputMail);
        inputMail.setAttribute('type', 'email');
        inputMail.setAttribute('class', 'name6');
        inputMail.name = "Adresse mail"
        inputMail.required = true;

        inputMail.addEventListener("change", function(event) {
            if (validEmail(inputMail.value)) {} else {
                event.preventDefault()
                alert("Veuillez saisir une adresse e-mail valide (exemple : dupond@gmail.com).");
            }
        });

        const divConfirm = document.createElement('div')
        form.appendChild(divConfirm);
        divConfirm.className = 'div_confirm'


        const confirm = document.createElement('button');
        divConfirm.appendChild(confirm);
        confirm.className = 'confirm';
        confirm.textContent = 'CONFIRMER';

        confirm.addEventListener("click", function(event) {
            if (valid(inputFirstName.value) && valid(inputLastName.value) && validAddressZip(inputAddress.value) && validAddressZip(inputZip.value) && valid(inputCity.value) && validEmail(inputMail.value)) {
                event.preventDefault();

                // envoie du prix total au localStorage
                localStorage.setItem('globalPrice', globalPrice);
                const stockage = localStorage.getItem('globalPrice');
                console.log(stockage);

                //Création de l'objet "contact"
                let contact = {
                    firstName: inputFirstName.value,
                    lastName: inputLastName.value,
                    address: inputAddress.value,
                    city: inputCity.value,
                    email: inputMail.value,
                }
                console.log(contact);
                localStorage.setItem('contact', JSON.stringify(contact));

                // création du tableau products (id des oursons du panier)
                let products = [];
                for (storedTeddy of storedTeddies) {
                    let productsId = storedTeddy.id;
                    products.push((productsId));
                }
                console.log(products);

                let sendTeddies = {
                    contact,
                    products,
                }
                console.log(sendTeddies);



                // envoie des données au serveur
                const post = async function(data) {
                    try {
                        let response = await fetch('http://localhost:3000/api/teddies/order', {
                            method: 'POST',
                            body: JSON.stringify({
                                'contact': contact,
                                'products': products,
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        if (response.ok) {
                            let data = await response.json();
                            console.log(data.orderId);
                            localStorage.setItem("responseOrder", data.orderId);
                            window.location = "./confirmation.html"
                            localStorage.removeItem("teddies-basket");

                        } else {
                            event.preventDefault();
                            console.error('Retour du serveur : ', response.status);
                            alert('Erreur rencontrée : ' + response.status);

                        }
                    } catch (error) {
                        alert("Erreur : " + error);
                    }
                };

                post(sendTeddies);
            }


        });



    }
}