const db = require("../connect/connection");

async function UpdateFeedback(feedback) {
    let conn;
    let success = true;
    let result = null;
    try {
        // TODO: vérifier l'intégrité de l'objet feedback
        conn = await db.pool.getConnection();
        const updateQuery = "UPDATE feedback SET name = ?, comment = ?, rating = ?, validation = ? WHERE id = ?";
        await conn.query(updateQuery, [feedback.name, feedback.comment, feedback.rating, feedback.validation, feedback.id]);
        result = {id: feedback.id, name: feedback.name, comment: feedback.comment, rating: feedback.rating, validation: feedback.validation};

        // Afficher le resultat
        console.log(`feedback(id = ${result}) modifié`);
    } catch(err){
        console.log(err);
        success = false;
    } finally {
        if (conn) await conn.release();
    }
    return {success, result};
}

module.exports = {UpdateFeedback};
