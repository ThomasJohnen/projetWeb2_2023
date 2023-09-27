const express = require('express');
const { getAllProduits, getProduitById, createProduit, deleteProduct, modifyEntreeProduit, modifySortieProduit, modifyAllProduit } = require('../models/produits');

const router = express.Router();

router.get("/", (req, res) => {

    const produits = getAllProduits();

    return res.json(produits);
});


router.get("/:id", (req, res) => {
    
        const id = req?.params?.id;
    
        const idInt = parseInt(id, 10);
    
        const produit = getProduitById(idInt);
    
        if(produit === null){
            return res.status(404).json({ error: "produit non trouvé" });
        }
    
        return res.json(produit);
});



router.post("/", (req, res) => {

    const nom = req?.body?.nom;
    const entree = req?.body?.entree;
    const sortie = req?.body?.sortie;
    const zone = req?.body?.zone;

    const entreeInt = parseInt(entree, 10);
    const sortieInt = parseInt(sortie, 10);
    const zoneInt = parseInt(zone, 10);

    if(nom === null){
        return res.sendStatus(400);
    }

    if((entreeInt - sortieInt) !== zoneInt){
        return res.sendStatus(400);
    }



    const produit = createProduit(nom, entreeInt, sortieInt, zoneInt);

    return res.json(produit);

});

router.delete("/:id", (req, res) =>{

    const id = req?.params?.id;

    const idInt = parseInt(id, 10);

    const produit = deleteProduct(idInt);
    if(produit === null){
        return res.sendStatus(404);
    }

    return res.json(produit);

});


router.patch("/:id", (req, res) =>{
    const id = req?.params?.id
    const idInt = parseInt(id, 10);

    const entree = req?.body?.entree
    const sortie = req?.body?.sortie
    const zone = req?.body?.zone

    if(entree != null && zone != null && sortie != null){
        const entreeInt = parseInt(entree, 10);
        const sortieInt = parseInt(sortie, 10);
        const zoneInt = parseInt(zone, 10);
        if((entreeInt - sortieInt) !== zoneInt) return res.sendStatus(400);
        if(sortieInt < 0) return res.sendStatus(400);
        const produit = modifyAllProduit(idInt, entreeInt, sortieInt, zoneInt);
        if(produit === null){
            return res.status(404).json({ error: "Ressource non trouvée à l'index" });
            }
        if(produit === "400"){
            return res.status(400).json({ error: "les entiers ne sont pas cohérent" });
            }
        return res.json(produit);
    }
    if(entree != null && sortie == null){
        const entreeInt = parseInt(entree, 10);
        const produit = modifyEntreeProduit(idInt, entreeInt);
        if(produit === null){
        return res.sendStatus(404);
        }
        return res.json(produit);
    } if(entree == null && sortie != null){
        const sortieInt = parseInt(sortie, 10);
        const produit = modifySortieProduit(idInt, sortieInt);
        if(produit === null){
        return res.sendStatus(404);
        }if(produit === "400"){
            return res.sendStatus(400);
        }
        return res.json(produit);
    } 

    return res.sendStatus(400)
        
     
});
module.exports = router;