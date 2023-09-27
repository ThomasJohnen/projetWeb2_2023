import { clearPage } from "../../utils/render";

const pageAddForm = `
    <div class="container mt-5" id="box">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card" id="shadow">
                    <div class="card-header">
                        <h3 class="card-title">Formulaire de Suppression</h3>
                    </div>
                    <div class="card-body">
                        <form id="addForm">
                        <div class="mb-3">
                            <label for="nomProduit" class="form-label">Nom du produit :</label>
                            <input type="text" class="form-control" id="nomProduit" name="nomProduit" required>
                        </div>
                        <div class="mb-3">
                            <label for="entreeProduit" class="form-label">Nombre de produit entrée :</label>
                            <input type="number" class="form-control" id="entreeProduit" name="entreeProduit" required>
                        </div>
                        <div class="mb-3">
                            <label for="sortieProduit" class="form-label">Nombre de produit sortie :</label>
                            <input type="number" class="form-control" id="sortieProduit" name="sortieProduit" required>
                        </div>
                        <div class="mb-3">
                            <label for="zoneProduit" class="form-label">Nombre de produit en zone :</label>
                            <input type="number" class="form-control" id="zoneProduit" name="zoneProduit" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                        </form>
                        <div id="resultat"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;


    const AddPage = () => {
        clearPage();
        const main = document.querySelector('main')
        main.innerHTML = pageAddForm;

        const addForm = document.querySelector("#addForm");
        addForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nomProduit = document.querySelector("#nomProduit").value;
        const entreeProduit = document.querySelector("#entreeProduit").value;
        const sortieProduit = document.querySelector("#sortieProduit").value;
        const zoneProduit = document.querySelector("#zoneProduit").value;

        const option = {
            method: 'POST',
            body: JSON.stringify({
                "nom": nomProduit, 
                "entree": entreeProduit,
                "sortie": sortieProduit,
                "zone": zoneProduit
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch("/api/produits/", option);
        const resultat = document.querySelector("#resultat");
        if (!response.ok) {
            resultat.innerHTML = `<span class="error-message">Impossible d'ajouter le produit</span>`;
        } else {
            const createdProduct = await response.json();
            resultat.innerHTML = `<span class="success-message"> ${createdProduct.nom} a bien été ajouté</span>`;
        }

        });


    };

    


     


    export default AddPage;