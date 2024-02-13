const { QueryHandlerExpectedResultObject } = require("./query_handler");

// requêtes SQL
const DELETE_FEEDBACK   = "DELETE FROM feedback WHERE id = ?";
const DELETE_USER       = "DELETE FROM user WHERE id = ?";
const DELETE_SERVICE    = "DELETE FROM services WHERE id = ?";
const DELETE_CAR        = "";

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

/**
 * Supprime un commentaire par son id
 * @param {number} id l'id du commentaire à supprimer
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
async function DeleteFeedback(id) {
    return Delete(DELETE_FEEDBACK, id);
}

/**
 * Supprime un utilisateur par son id
 * @param {number} id l'id de l'utilisateur
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
async function DeleteUser(id) {
    return Delete(DELETE_USER, id);
}

/**
 * Supprime un service par son id
 * @param {number} id l'id du service
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
async function DeleteService(id) {
    return Delete(DELETE_SERVICE, id);
}

module.exports = { DeleteFeedback, DeleteUser, DeleteService };
