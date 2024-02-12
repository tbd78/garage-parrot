const QueryHandler = require("./queryHandler");

/**
 * Modifie un commentaire
 * @param {object} feedback
 * @param {number} feedback.id l'id du commentaire
 * @param {string} feedback.name le nom de la personne qui à émit le commentaire
 * @param {string} feedback.comment le commentaire
 * @param {number} feedback.rating la note
 * @return {Promise<object|boolean>} un commentaire en cas de succès false sinon
 */
async function UpdateFeedback(feedback) {
    const query = "UPDATE feedback SET name = ?, comment = ?, rating = ?, validation = ? WHERE id = ?";
    const paramList = [feedback.name, feedback.comment, feedback.rating, feedback.validation, feedback.id];
    const result = await QueryHandler(query, paramList);

    // log
    console.debug(result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`commentaire (id = ${feedback.id}) modifié`);

    return feedback;
}



module.exports = { UpdateFeedback };
