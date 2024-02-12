const QueryHandler = require("./queryHandler");

/**
 * Supprime un commentaire par son id
 * @param {number} feedbackid l'id du commentaire à supprimer
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
async function DeleteFeedback(feedbackId) {

    const query = "DELETE FROM feedback WHERE id = ?";
    const result = await QueryHandler(query, [feedbackId]);
    console.debug(result);
    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`commentaire (id = ${feedbackId}) supprimé`);

    return true;
}

/**
 * Supprime un utilisateur par son id
 * @param {number} id l'id de l'utilisateur
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
async function DeleteUser(id) {

    const query = "DELETE FROM user WHERE id = ?";
    const result = await QueryHandler(query, [id]);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`utilisateur (id = ${id}) supprimé`);

    return true;
}

/**
 * Supprime un service par son id
 * @param {number} id l'id du service
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
async function DeleteService(id) {

    const query = "DELETE FROM services WHERE id = ?";
    const result = await QueryHandler(query, [id]);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`service (id = ${id}) supprimé`);

    return true;
}

module.exports = { DeleteFeedback, DeleteUser, DeleteService };
