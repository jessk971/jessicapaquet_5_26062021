console.log("test")
async function getTeddies() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies");
        if (response.ok) {
            let teddies = await response.json();
            console.log(teddies);
            createProductTeddies(teddies)

        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }
}
getTeddies();



//liste des produit//

function createProductTeddies(teddies) {
    let divParentParent = document.createElement("div");
    const teddiesList = document.getElementById("teddies-list");
    teddiesList.appendChild(divParentParent);
    divParentParent.classList.add("product");
    console.log(teddiesList)
    for (let i = 0; i < teddies.length; i++) {

        let divParent = document.createElement("a");
        divParent.href = "products.html?id=" + teddies[i]._id;
        divParentParent.appendChild(divParent);
        divParent.classList.add("product-article", "article");



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
    };




}