import { clearPage } from "../../utils/render";
import minus from "../../assets/minus.svg";
import plus from "../../assets/plus.svg";
import edit from "../../assets/edit.svg";


// le modal et la balise enveloppante qui sera dans le main

const homePage = `
    <div class="modal fade" id="modalProduit" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modifier produit</h1>
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
    <div class="container-fluid text-center pt-5" >
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
            <div class="encart produit card col-md-3 col-sm-6 m-3 backgroundEncart text-white" id="${produit.id}">
                <div class="produitInfo card-body">
                    <h2 class="card-title">${produit.nom}</h2>
                    <p class="card-text">quantité entrée : ${produit.entree}</br>
                    quantité sortie : ${produit.sortie}</br>
                    quantité en zone : ${produit.zone}</p>
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

    // Ajoutez un événement clic pour les boutons modal soustraction
    const modalButtonsMinus = document.querySelectorAll('.btModalMinus');
    modalButtonsMinus.forEach(button => {
        button.addEventListener('click', async () =>{
            const productId = button.getAttribute('data-id'); // Récupérez la valeur du data-id
            const produit = await getProduitById(productId);
            
            const modalContent = document.querySelector('#modalContent');
            const form = `
                <form id="minusForm">
                    <div class="mb-3">
                        <label for="quantiteARetirer" class="form-label titreLabel">Quantité à retirer pour le produit : ${produit.nom}</label>
                        <input type="number" class="form-control" id="quantite" placeholder ="quantité en zone actuellement : ${produit.zone}">
                    </div>
                    <button type="submit" class="btn btn-primary" id="minusSubmit" data-id="${produit.id}" data-bs-dismiss="modal">Modifier</button>
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
    // Ajoutez un événement clic pour les boutons modal d'addition
    const modalButtonsPlus = document.querySelectorAll('.btModalPlus');
    modalButtonsPlus.forEach(button => {
        button.addEventListener('click',  async () =>{
            const productId = button.getAttribute('data-id'); // Récupérez la valeur du data-id
            const modalContent = document.querySelector('#modalContent');
            const produit = await getProduitById(productId);
            modalContent.textContent = `ID du produit : ${productId}`; // Affichez la valeur dans le modal
            const form = `
            <form id="plusForm">
                <div class="mb-3">
                    <label for="quantiteARetirer" class="form-label titreLabel">Quantité à ajouter pour le produit : ${produit.nom}</label>
                    <input type="number" class="form-control" id="quantite" placeholder ="quantité en zone actuellement : ${produit.zone}">
                </div>
                <button type="submit" class="btn btn-primary" id="plusSubmit" data-id="${produit.id}" data-bs-dismiss="modal">Modifier</button>
            </form>
            `;
            modalContent.innerHTML = form; // Affichez la valeur dans le modal
            const plusForm = document.querySelector('#plusForm');
            plusForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const id = document.querySelector("#plusSubmit").getAttribute("data-id");
                const quantite = document.querySelector('#quantite').value;
                const option = {
                    method: 'PATCH',
                    body: JSON.stringify({
                        "entree": quantite
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                
                const responseSubmitPlus = await fetch(`/api/produits/${id}`, option);

                if(!responseSubmitPlus.ok){
                    return null;
                }

                const produitUpdated = await responseSubmitPlus.json();

                HomePage();
                return produitUpdated;
            });

        });
    });
    // Ajoutez un événement clic pour les boutons modal
    const modalButtonsEdit = document.querySelectorAll('.btModalEdit');
    modalButtonsEdit.forEach(button => {
        button.addEventListener('click',  async () =>{
            const productId = button.getAttribute('data-id'); // Récupérez la valeur du data-id
            const modalContent = document.querySelector('#modalContent');
            const produit = await getProduitById(productId);
            modalContent.textContent = `ID du produit : ${productId}`; // Affichez la valeur dans le modal
            const form = `
            <form id="modifyForm">
                <div class="mb-3">
                    <p class="form-label titreLabel">Modifier le produit : ${produit.nom}</p>
                    <label for="Entree" class="form-label">Quantité entrée</label>
                    <input type="number" class="form-control" id="quantiteEntree" placeholder ="Indiquer la quantité entrée">
                    <label for="Entree" class="form-label">Quantité sortie</label>
                    <input type="number" class="form-control" id="quantiteSortie" placeholder ="Indiquer la quantité sortie">
                    <label for="Entree" class="form-label">Quantité en zone</label>
                    <input type="number" class="form-control" id="quantiteZone" placeholder ="Indiquer la quantité en zone">
                </div>
                <p>Rappelez vous que la quantité en zone doit être égale à la différence entre les entrées et les sorties.</p>
                <button type="submit" class="btn btn-primary" id="plusSubmit" data-id="${produit.id}" data-bs-dismiss="modal">Modifier</button>
            </form>
            `;
            modalContent.innerHTML = form; // Affichez la valeur dans le modal
            const modifyForm = document.querySelector('#modifyForm');
            modifyForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const id = document.querySelector("#modifyForm").getAttribute("data-id");
                const entree = document.querySelector('#quantiteEntree').value;
                const sortie = document.querySelector('#quantiteSortie').value;
                const zone = document.querySelector('#quantiteZone').value;
                const option = {
                    method: 'PATCH',
                    body: JSON.stringify({
                        "entree": entree,
                        "sortie": sortie,
                        "zone": zone
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                
                const responseSubmitEdit = await fetch(`/api/produits/${id}`, option);

                if(!responseSubmitEdit.ok){
                    return null;
                }

                const produitUpdated = await responseSubmitEdit.json();

                HomePage();
                return produitUpdated;
            });
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
