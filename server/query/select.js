const db = require("../connect/connection");

async function SelectAllFeedbacks() {
    let conn;
    let success = true;
    let result = null;
    try {
        // TODO: vérifier l'intégrité de l'objet feedback
        conn = await db.pool.getConnection();
        const selectAllQuery = "SELECT * FROM feedback";
        result = await conn.query(selectAllQuery);

        // Afficher le resultat
        console.log(`Tous les feedbacks sont récupérés`);
    } catch(err){
        console.log(err);
        success = false;
    } finally {
        if (conn) await conn.release();
     //   db.pool();
    }
    return {success, result};
}

async function SelectAFeedback(feedbackId) {
    let conn;
    let success = true;
    let result = null;
    try {
        // TODO: vérifier l'intégrité de l'objet feedback
        conn = await db.pool.getConnection();
        const selectQuery = "SELECT * FROM feedback WHERE id = ?";
        result = await conn.query(selectQuery, [feedbackId]);

        // Afficher le resultat
        console.log(`feedback(id = ${feedbackId}) selectionné`);
    } catch(err){
        console.log(err);
        success = false;
    } finally {
        if (conn) await conn.release();
    }
    return {success, result};
}

module.exports = {SelectAllFeedbacks, SelectAFeedback};
