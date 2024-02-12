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



module.exports = { DeleteFeedback };
