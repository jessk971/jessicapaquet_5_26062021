console.log("test")
fetch('http://localhost:3000/api/teddies')
    .then(res => res.json())
    .then(data => createProductTeddies(data));


//liste des produit//

function createProductTeddies(teddies) {
    let divParentParent = document.createElement("div");
    const teddiesList = document.getElementById("teddies-list");
    teddiesList.appendChild(divParentParent);
    divParentParent.classList.add("product");
    console.log(teddiesList)
    for (let i = 0; i < teddies.length; i++) {

        let divParent = document.createElement("div");
        divParentParent.appendChild(divParent);
        divParent.classList.add("product-article");

        //images teddies//

        let imageTeddie = document.createElement("img");
        divParent.appendChild(imageTeddie);
        imageTeddie.classList.add("product-article-img");
        imageTeddie.src = teddies[i].imageUrl;

        //fiche produit//

        let divCardProduct = document.createElement("div");
        divParent.appendChild(divCardProduct);

        //élément dans divCardProduct//

        let titleTeddie = document.createElement("h3");
        divCardProduct.appendChild(titleTeddie);
        titleTeddie.classList.add("title-product");
        titleTeddie.textContent = teddies[i].name;

        let descriptionTeddie = document.createElement("p");
        divCardProduct.appendChild(descriptionTeddie);
        descriptionTeddie.classList.add("product-description");
        descriptionTeddie.textContent = teddies[i].description;

        //couleurs//
        let colorsSelect = document.createElement("form");
        divCardProduct.appendChild(colorsSelect);
        colorsSelect.classList.add("colors-teddies");

        let select = document.createElement("select");
        colorsSelect.appendChild(select);
        select.classList.add("choice-colors")
        select.setAttribute('name', "Choix de couleurs de " + teddies[i].name);
        select.setAttribute('id', "select-choice");

        const colors = teddies[i].colors;

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
        teddiePrice.textContent = teddies[i].price + ' $';

        let divProductBtn = document.createElement("a");
        divParent.appendChild(divProductBtn);
        divProductBtn.classList.add("product-btn");
        divProductBtn.textContent = "Ajouter au panier";




    }

}