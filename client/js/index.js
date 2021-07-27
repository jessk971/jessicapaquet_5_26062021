console.log("test")
fetch('http://localhost:3000/api/teddies')
    .then(res => res.json())
    .then(data => console.log(data));


//liste des produit//

function createProductTeddies(teddies) {
    let divParentParent = document.createElement("div");
    const teddiesList = document.getElementById("teddies-list");
    teddiesList.appendChild(divParentParent);
    divParentParent.className.add("product");

    for (let i = 0; i < teddies.length; i++) {

        let divParent = document.createElement("div");
        divParentParent.appendChild(divParent);
        divParent.className.add("product-article");

        //images teddies//

        let imageTeddie = document.createElement("img");
        divParent.appendChild(imageTeddie);
        imageTeddie.className.add("product-article-img");
        imageTeddie.scr = teddies[i].imageUrl;

        //fiche produit//

        let divCardProduct = document.createElement("div");
        divParent.appendChild("divCardProduct");

        //élément dans divCardProduct//

        let titleTeddie = document.createElement("h3");
        divCardProduct.appendChild(titleTeddie);
        titleTeddie.className.add("title-product");
        titleTeddie.textContent = teddies[i].name;

        let descriptionTeddie = document.createElement("p");
        divCardProduct.appendChild(descriptionTeddie);
        descriptionTeddie.className.add("product-description");
        descriptionTeddie.textContent = teddies[i].description;

        //div prix et bouton//

        let divSelectPrice = document.createElement("div");
        divCardProduct.appendChild(divSelectPrice);
        divSelectPrice.className.add("select-price");

        let teddiePrice = document.createElement("p");
        divSelectPrice.appendChild(teddiePrice);
        teddiePrice.className.add("teddie-price");
        teddiePrice.textContent = teddies[i].price + ' $';

        let divProductBtn = document.createElement("a");
        divSelectPrice.appendChild(productBtn);
        getUrlProduct(teddies, i, productBtn);
        createButtonProductBtn(productBtn);


    }
}

async function getTeddies() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies");
        if (response.ok) {
            let teddies = await response.json();
            createProductTeddies(teddies);
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }
}

getTeddies()