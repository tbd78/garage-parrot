const { QueryHandlerExpectedResultObject } = require("./query_handler");

// requêtes SQL
const DELETE_FEEDBACK       = "DELETE FROM feedback WHERE id = ?";
const DELETE_USER           = "DELETE FROM user WHERE id = ?";
const DELETE_SERVICE        = "DELETE FROM services WHERE id = ?";
const DELETE_CAR            = "DELETE FROM cars WHERE id = ?";
const DELETE_SPEC           = "DELETE FROM specs WHERE id = ?";
const DELETE_CONTACT_INFO   = "DELETE FROM contact_info WHERE id = ?";
const DELETE_CAR_SPEC       = "DELETE FROM characteristics WHERE id = ?";

/**
 * Supprime un élément de la base de données
 * @param {string} query requête SQL à effectuer
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
async function Delete(query, id) {
    const result = await QueryHandlerExpectedResultObject(query, [id]);

    // log
    console.debug("résultat suppression : ", result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        // log
        console.log(`élément non supprimé`);
        return false;
    }

    // log
    console.log(`élément (id = ${id}) supprimé`);

    return true;
}

// ----------------------------------- Fonctions exportées ------------------------------------------------------------

/**
 * Supprime un commentaire par son id
 * @param {number} id l'id du commentaire à supprimer
 * @return {Promise<boolean>} true en cas de succès, false sinon
 */
exports.DeleteFeedback = async function(id) {
    return Delete(DELETE_FEEDBACK, id);
}

/**
 * Supprime un utilisateur par son id
 * @param {number} id l'id de l'utilisateur
 * @return {Promise<boolean>} true en cas de succès, false sinon
 */
exports.DeleteUser = async function(id) {
    return Delete(DELETE_USER, id);
}

/**
 * Supprime un service par son id
 * @param {number} id l'id du service
 * @return {Promise<boolean>} true en cas de succès, false sinon
 */
exports.DeleteService = async function(id) {
    return Delete(DELETE_SERVICE, id);
}

/**
 * Supprime une voiture par son id
 * @param {number} id l'id de la voiture
 * @return {Promise<boolean>} true en cas de succès, false sinon
 */
exports.DeleteCar = async function(id) {
    return Delete(DELETE_CAR, id);
}

/**
 * Supprime une caractéristique par son id
 * @param {number} id l'id de la caractéristique
 * @return {Promise<boolean>} true en cas de succès, false sinon
 */
exports.DeleteSpec = async function(id) {
    return Delete(DELETE_SPEC, id);
}

/**
 * Supprime un info de contact par son id
 * @param {number} id id info de contact
 * @return {Promise<boolean>} true en cas de succès, false sinon
 */
exports.DeleteContactInfo = async function(id) {
    return Delete(DELETE_CONTACT_INFO, id);
}

/**
 * Supprime une caractéristique d'une voiture par son id
 * @param {number} id l'id de la caractéristique d'une voiture
 * @return {Promise<boolean>} true en cas de succès, false sinon
 */
exports.DeleteCarSpec = async function(id) {
    return Delete(DELETE_CAR_SPEC, id);
}
