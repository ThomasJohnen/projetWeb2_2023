const path = require('node:path');
const { parse, serialize } = require("../utils/json");

const filePath = path.join(__dirname, "/../data/produits.json");

const PRODUITS = [];

function getAllProduits(){
    const produits = parse(filePath, PRODUITS);

    return produits;
};

function createProduit(nom, entree, sortie, zone){
    const produits = parse(filePath, PRODUITS);
    const id = produits.length + 1;
    const produit = {
        id,
        nom, 
        entree, 
        sortie,
        zone,
    }

    produits.push(produit);
    serialize(filePath, produits);

    return produit;
};

function deleteProduct(id){

    const produits = parse(filePath, PRODUITS);
    const position = produits.findIndex(produit => produit.id === id);
    if(position < 0){
        return null;
    }

    const produitsSupprimes = produits.splice(position, 1);
    const produitSupprime = produitsSupprimes[0];
    serialize(filePath, produits);
    return produitSupprime;
};

function modifyEntreeProduit(id, entree){
    const produits = parse(filePath, PRODUITS);
    const position = produits.findIndex(produit => produit.id === id);
    if(position < 0){
        return null;
    }

    const produitToUpdate = produits[position];
    produitToUpdate.entree += entree;
    produitToUpdate.zone += entree;

    produits[position] = produitToUpdate;

    serialize(filePath, produits);
    return produitToUpdate;
};

function modifySortieProduit(id, sortie){
    const produits = parse(filePath, PRODUITS);
    const position = produits.findIndex(produit => produit.id === id);
    if(position < 0){
        return null;
    }

    const produitToUpdate = produits[position];
    produitToUpdate.sortie += sortie;
    if((produitToUpdate.zone - sortie) < 0){
        return null;
    }
    produitToUpdate.zone -= sortie;

    produits[position] = produitToUpdate;

    serialize(filePath, produits);
    return produitToUpdate;
};

function modifyAllProduit(id, nom, entree, sortie, zone){

    const produits = parse(filePath, PRODUITS);
    const position = produits.findIndex(produit => produit.id === id);
    if(position < 0){
        return null;
    }
    const produitToUpdate = produits[position];
    produitToUpdate.entree = entree;
    produitToUpdate.sortie = sortie;
    produitToUpdate.zone = zone;
    if((produitToUpdate.zone - sortie) < 0){
        return "400";
    }
    produitToUpdate.nom = nom;
    produits[position] = produitToUpdate;

    serialize(filePath, produits);
    return produitToUpdate;
};

function getProduitById(id){
    const produits = parse(filePath, PRODUITS);
    const position = produits.findIndex(produit => produit.id === id);
    if(position < 0){
        return null;
    }
    const produit = produits[position];
    return produit;
};

module.exports = {
    getAllProduits,
    createProduit,
    deleteProduct,
    modifyEntreeProduit,
    modifySortieProduit,
    modifyAllProduit,
    getProduitById,
};