const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);

async function getTeddies() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies/" + id);
        if (response.ok) {
            let teddy = await response.json();
            console.log(teddy);


            let divParentParent = document.createElement("div");
            const teddiesList = document.getElementById("teddies-list");
            teddiesList.appendChild(divParentParent);
            divParentParent.classList.add("product", "product_page");
            console.log(teddiesList)


            let divParent = document.createElement("div");
            divParentParent.appendChild(divParent);
            divParent.classList.add("product-article");

            //images teddies//

            let imageTeddie = document.createElement("img");
            divParent.appendChild(imageTeddie);
            imageTeddie.classList.add("product-article-img");
            imageTeddie.src = teddy.imageUrl;

            //fiche produit//

            let divCardProduct = document.createElement("div");
            divParent.appendChild(divCardProduct);

            //élément dans divCardProduct//

            let titleTeddie = document.createElement("h3");
            divCardProduct.appendChild(titleTeddie);
            titleTeddie.classList.add("title-product");
            titleTeddie.textContent = teddy.name;

            let descriptionTeddie = document.createElement("p");
            divCardProduct.appendChild(descriptionTeddie);
            descriptionTeddie.classList.add("product-description");
            descriptionTeddie.textContent = teddy.description;

            //couleurs//
            let colorsSelect = document.createElement("form");
            divCardProduct.appendChild(colorsSelect);
            colorsSelect.classList.add("colors-teddies");

            let select = document.createElement("select");
            colorsSelect.appendChild(select);
            select.classList.add("choice-colors")
            select.setAttribute('name', "Choix de couleurs de " + teddy.name);
            select.setAttribute('id', "select-choice");

            const colors = teddy.colors;

            for (let i = 0; i < colors.length; i++) {
                const selectOption = document.createElement('option');
                select.appendChild(selectOption);
                selectOption.textContent = colors[i];
                selectOption.setAttribute("value", colors[i]);
            }



            //div prix et bouton//

            let divSelectPrice = document.createElement("div");
            divCardProduct.appendChild(divSelectPrice);
            divSelectPrice.classList.add("select-price");

            let teddiePrice = document.createElement("p");
            divSelectPrice.appendChild(teddiePrice);
            teddiePrice.classList.add("teddie-price");
            teddiePrice.textContent = teddy.price + ' $';

            let buttonBuy = document.createElement("a");
            divSelectPrice.appendChild(buttonBuy);
            buttonBuy.classList.add("btn");

            let buttonBasketBuy = document.createElement("button");
            buttonBuy.appendChild(buttonBasketBuy);
            buttonBasketBuy.classList.add("product-btn");
            buttonBasketBuy.textContent = "Ajouter au panier";

            const returnOrder = document.createElement('button');
            divParentParent.appendChild(returnOrder);
            returnOrder.classList.add("return")
            returnOrder.textContent = "Retour Accueil";

            returnOrder.addEventListener("click", function(event) {
                window.location.href = "index.html";
            });


            buttonBasketBuy.addEventListener('click', function(event) {
                    event.preventDefault();

                    let teddiesChoose = {
                        name: teddy.name,
                        color: select.value,
                        price: teddy.price,
                        quantity: 1,
                        id: teddy._id,
                    };
                    console.log(teddiesChoose);

                    let storedTeddies = JSON.parse(localStorage.getItem('teddies-basket'));
                    const teddiesColor = select.value;
                    if (storedTeddies == undefined) {
                        storedTeddies = []
                    }

                    storedTeddies.push(teddiesChoose);
                    localStorage.setItem('teddies-basket', JSON.stringify(storedTeddies));
                    console.log(storedTeddies);

                    if (window.confirm(teddy.name + " " + teddiesColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) {
                        window.location.href = "panier.html";
                    } else {
                        window.location.href = "index.html";
                    }



                }

            );

        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }
}



getTeddies();