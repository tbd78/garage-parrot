const QueryHandler = require("./queryHandler");

/**
 * Récupère tous les commentaires
 * @return {Promise<Array<object>|boolean>} un tableau de commentaire(s) en cas de succès false sinon
 */
async function GetAllFeedbacks() {
    const query = "SELECT * FROM feedback";
    const result = await QueryHandler(query);

    // log
    console.debug(result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`tous les commentaires ont été récupérés`) ;

    return result;
}

/**
 * Récupère un commentaire par son id
 * @param {number} id l'id du commentaire à récupérer
 * @return {Promise<object|boolean>} un commentaire en cas de succès false sinon
 */
async function GetFeedback(id) {
    const query = "SELECT * FROM feedback WHERE id = ?";
    result = await QueryHandler(query, [id]);

    // log
    console.debug(result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`commentaire (id = ${id}) recupéré`);

    return result[0];
}


module.exports = { GetAllFeedbacks, GetFeedback };
