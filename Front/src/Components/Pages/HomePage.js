import { clearPage } from "../../utils/render";
import minus from "../../assets/minus.svg";
import plus from "../../assets/plus.svg";
import edit from "../../assets/edit.svg";


// le modal et la balise enveloppante qui sera dans le main

const homePage = `
    <div class="modal fade" id="modalProduit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p id="modalContent"></p> <!-- Ajoutez un élément où vous afficherez le contenu dynamique -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid text-center" >
        <div class="row justify-content-center" id="principal">
        </div>
    </div>
`;

const HomePage = () => {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = homePage;
    displayProduit();
};

async function displayProduit(){ 
    // on récupère tout les produits dans l'api 
    const response = await fetch(`/api/produits/`);

    const principal = document.querySelector('#principal');
    if (!response.ok){
        principal.innerHTML = `Liste de produit : <span class="error-message">Impossible d'obtenir la liste des produits</span>`;
    }
    
    const produits = await response.json();
    
    // on affiche les produits dans la page
    produits.forEach(produit => {
        const infoProduit = `
            <div class="encart produit card col-md-3 col-sm-6 m-3 bg-primary text-white" id="${produit.id}">
                <div class="produitInfo card-body">
                    <h2 class="card-title">${produit.nom}</h2>
                    <p class="card-text">quantité entrée : ${produit.entree}</br>
                    quantité sortie : ${produit.sortie}</br>
                    quantité en zone :${produit.zone}</p>
                    <a type="button" class="btModalPlus" data-bs-toggle="modal" data-bs-target="#modalProduit" data-id="${produit.id}">
                        <img src="${plus}">
                    </a>
                    <a type="button" class="btModalMinus" data-bs-toggle="modal" data-bs-target="#modalProduit" data-id="${produit.id}">
                        <img src="${minus}">
                    </a> 
                    <a type="button" class="btModalEdit" data-bs-toggle="modal" data-bs-target="#modalProduit" data-id="${produit.id}">
                        <img src="${edit}">
                    </a>
                </div>
            </div>`;
        principal.innerHTML += infoProduit;
    });

    // Ajoutez un événement clic pour les boutons modal
    const modalButtonsMinus = document.querySelectorAll('.btModalMinus');
    modalButtonsMinus.forEach(button => {
        button.addEventListener('click', async () =>{
            const productId = button.getAttribute('data-id'); // Récupérez la valeur du data-id
            const produit = await getProduitById(productId);
            const modalContent = document.querySelector('#modalContent');
            const form = `
                <form id="minusForm">
                    <div class="mb-3">
                        <label for="quantiteARetirer" class="form-label">Quantité à retirer pour le produit : ${produit.nom}</label>
                        <input type="number" class="form-control" id="quantite" placeholder ="quantité en zone actuellement : ${produit.zone}">
                    </div>
                    <button type="submit" class="btn btn-primary" id="minusSubmit" data-id="${produit.id}" data-bs-dismiss="modal">Submit</button>
                </form>
                `;
            modalContent.innerHTML = form; // Affichez la valeur dans le modal
            const minusForm = document.querySelector('#minusForm');
            minusForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const id = document.querySelector("#minusSubmit").getAttribute("data-id");
                const quantite = document.querySelector('#quantite').value;

                const option = {
                    method: 'PATCH',
                    body: JSON.stringify({
                        "sortie": quantite
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                
                const responseSubmitMinus = await fetch(`/api/produits/${id}`, option);

                if(!responseSubmitMinus.ok){
                    return null;
                }

                const produitUpdated = await responseSubmitMinus.json();

                HomePage();
                return produitUpdated;
            });
        });
    });
    // Ajoutez un événement clic pour les boutons modal
    const modalButtonsPlus = document.querySelectorAll('.btModalPlus');
    modalButtonsPlus.forEach(button => {
        button.addEventListener('click',  () =>{
            const productId = button.getAttribute('data-id'); // Récupérez la valeur du data-id
            const modalContent = document.querySelector('#modalContent');
            modalContent.textContent = `ID du produit : ${productId}`; // Affichez la valeur dans le modal
        });
    });
    // Ajoutez un événement clic pour les boutons modal
    const modalButtonsEdit = document.querySelectorAll('.btModalEdit');
    modalButtonsEdit.forEach(button => {
        button.addEventListener('click',  () =>{
            const productId = button.getAttribute('data-id'); // Récupérez la valeur du data-id
            const modalContent = document.querySelector('#modalContent');
            modalContent.textContent = `ID du produit : ${productId}`; // Affichez la valeur dans le modal
        });
    });
};

async function getProduitById(id){
    const response = await fetch(`/api/produits/${id}`);
    if(!response.ok){
        return null;
    }
    const produit = response.json();
    return produit;
};

export default HomePage;
