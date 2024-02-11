const db = require("../connect/connection");

async function InsertFeedback(feedback) {
    let conn;
    let success = true;
    try {
        // TODO: vérifier l'intégrité de l'objet feedback
        conn = await db.pool.getConnection();
        const insertQuery = "INSERT INTO feedback (date, name, comment, rating, validation) VALUES (?, ?, ?, ?, ?)";
        const date = new Date(Date.now());
        const dateLiteral = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
        const result = await conn.query(insertQuery, [dateLiteral, feedback.name, feedback.comment, feedback.rating, 0]);

        // Afficher le resultat
        console.log(`feedback(id = ${result.insertId}) inséré`);
    } catch(err){
        console.log(err);
        success = false;
    } finally {
        if (conn) await conn.release();
    }
    return success;
}

module.exports = {InsertFeedback};
