const QueryHandler = require("./queryHandler");

/**
 * Insérer un commentaire
 * @param {object} feedback
 * @param {string} feedback.name le nom de la personne qui à émit le commentaire
 * @param {string} feedback.comment le commentaire
 * @param {number} feedback.rating la note
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
async function InsertFeedback(feedback) {
    const query = "INSERT INTO feedback (date, name, comment, rating, validation) VALUES (?, ?, ?, ?, ?)";
    const date = new Date(Date.now());
    // TODO: Changer le date.getUTCMonth en rajoutant +1 ?
    const dateLiteral = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
    const paramList = [dateLiteral, feedback.name, feedback.comment, feedback.rating, 0];
    const result = await QueryHandler(query, paramList);

    // log
    console.debug(result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`commentaire (id = ${result.insertId}) inséré`) ;

    return true;

}


module.exports = { InsertFeedback };
