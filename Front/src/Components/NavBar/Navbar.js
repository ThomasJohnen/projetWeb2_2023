// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
  <nav id="navBar" class="navbar navbar-expand-lg navbar-light bg-light">
        <div id="backNav" class="container-fluid">
          <a class="navbar-brand" href="/" data-uri="/">Logiciel de Produits GSK</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link colorNav" aria-current="page" href="#" data-uri="/">Accueil</a>
              </li>
              <li class="nav-item">
                <a class="nav-link colorNav" aria-current="page" href="#" data-uri="/add">ajouter un produit</a>
              </li>
              <li class="nav-item">
                <a class="nav-link colorNav" aria-current="page" href="#" data-uri="/delete">Supprimer un produit</a>
              </li>                       
            </ul>
          </div>
        </div>
      </nav>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
