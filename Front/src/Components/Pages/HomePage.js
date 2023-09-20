import { clearPage } from "../../utils/render";
import minus from "../../assets/minus.svg";
import plus from "../../assets/plus.svg";
import edit from "../../assets/edit.svg";

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
                    <button type="button" class="btn btn-primary">Save changes</button>
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
    const response = await fetch(`/api/produits/`);

    const principal = document.querySelector('#principal');
    if (!response.ok){
        principal.innerHTML = `Liste de produit : <span class="error-message">Impossible d'obtenir la liste des produits</span>`;
    }
    
    const produits = await response.json();
    
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
        button.addEventListener('click',  () =>{
            const productId = button.getAttribute('data-id'); // Récupérez la valeur du data-id
            const modalContent = document.querySelector('#modalContent');
            modalContent.textContent = `ID du produit : ${productId}`; // Affichez la valeur dans le modal
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

export default HomePage;
