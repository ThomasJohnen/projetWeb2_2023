import { clearPage } from "../../utils/render";
import displayProduit from "../Models/product";


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

export default HomePage;
