const db = require("../connect/connection");

async function DeleteAFeedback(feedbackId) {
    let conn;
    let success = true;
    let result = null;
    try {
        // TODO: vérifier l'intégrité de l'objet feedback
        conn = await db.pool.getConnection();
        const deleteQuery = "DELETE FROM feedback WHERE id = ?";
        result = await conn.query(deleteQuery, [feedbackId]);

        // Afficher le resultat
        console.log(`feedback(id = ${success}) supprimée`);
    } catch(err){
        console.log(err);
        success = false;
    } finally {
        if (conn) await conn.release();
    }
    return success;
}

module.exports = {DeleteAFeedback};
