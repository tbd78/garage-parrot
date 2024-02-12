const db = require("../connect/connection");

/**
 * Effectue les requêtes vers la base de données
 * @param {string} query requête SQL à effectuer
 * @param {Array<any>} paramList la liste des paramètres
 * @returns {Promise<any|null>} retourne le resultat en cas de succès, sinon null
 */
async function QueryHandler(query, paramList = null) {
    let conn;
    let result = null;
    try {
        // TODO: vérifier l'intégrité de l'objet feedback
        conn = await db.pool.getConnection();
        result = await conn.query(query, paramList);

    } catch(err){
        console.error(err);
    } finally {
        if (conn) await conn.release();
    }

    // si la requête n'affecte pas la base de données alors mettre result à null
    if(((typeof result) === 'object') && (result.affectedRows === 0)){
        result = null;
    }

    return result;
}

module.exports = QueryHandler;
