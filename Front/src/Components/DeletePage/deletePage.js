import { clearPage } from "../../utils/render";

const pageDeleteForm = `
    <div class="container mt-5" id="box">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card" id="shadow">
                    <div class="card-header">
                        <h3 class="card-title">Formulaire de Suppression</h3>
                    </div>
                    <div class="card-body">
                        <form id ="deleteForm">
                            <div class="mb-3">
                                <label for="listeDeroulante" class="form-label">Sélectionnez une option :</label>
                                <select class="form-select" id="listeDeroulante" name="listeDeroulante">
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary" id="buttonDelete">Supprimer</button>
                        </form>
                        <div id="resultat"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;


    const DeletePage = () => {
        clearPage();
        const main = document.querySelector('main')
        main.innerHTML = pageDeleteForm;
        addProducts();


    };

    


    async function addProducts () {
        const response = await fetch("/api/produits/");
        const listeDeroulante = document.querySelector("#listeDeroulante");
        if (!response.ok){
            listeDeroulante.innerHTML = `<span class="error-message">Impossible d'obtenir la liste des produits</span>`;
        }
        const products = await response.json();
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.nom;
            option.className="text-dark";
            listeDeroulante.appendChild(option);
        });

        const deleteForm = document.querySelector("#deleteForm");
    deleteForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const id = listeDeroulante.value;
        
        const option = {
            method: 'DELETE',
        }
        const deleteResponse = await fetch(`/api/produits/${id}`, option);

        
        if (!deleteResponse.ok) {
            const divResultat = document.querySelector("#resultat");
            divResultat.innerHTML = `<span class="error-message">Impossible de supprimer le produit</span>`;
        }
        const deletedProduct = await deleteResponse.json();
        const selectedOption = document.querySelector(`#listeDeroulante option[value="${id}"]`);
        selectedOption.remove();
        listeDeroulante.value = "";
        const divResultat = document.querySelector("#resultat");
        divResultat.innerHTML = `<span class="success-message">${deletedProduct.nom} a bien été supprimé</span>`;
    });

        
    }

     


    export default DeletePage;