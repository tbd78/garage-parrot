const db = require("../connect/connection");

const QUERY_HANDLER_EXPECTED_RESULT_OBJECT = 1;
const QUERY_HANDLER_EXPECTED_RESULT_ARRAY = 2;

/**
 * Effectue les requêtes vers la base de données
 * @param {string} query requête SQL à effectuer
 * @param {number} expectedResult requête SQL à effectuer
 * @param {Array<any>} paramList la liste des paramètres
 * @returns {Promise<any|null>} retourne le resultat en cas de succès, sinon null
 */
async function QueryHandler(query, expectedResult, paramList = null) {
    let conn;
    /** @type {object} */
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

    // Based to the expected result make some validation
    if(result !== null) {
        switch(expectedResult) {
            //
            case QUERY_HANDLER_EXPECTED_RESULT_OBJECT:
                if((result.hasOwnProperty("affectedRows") === false) || (result?.affectedRows === 0)) {
                    result = null;
                    // log
                    console.log("résultat attendu : 'objet'");
                }
                break;
            //
            case QUERY_HANDLER_EXPECTED_RESULT_ARRAY: {
                result = Array.from(result);
                // log
                console.log("résult attendu : 'tableau'")
            }
            break;
            //
            default:
                result = null;
                // log
            break;
        }
    }

    return result;
}

/**
 * Effectue les requêtes vers la base de données.
 *
 * Gère les rquêtes qui attendent un tableau en valeur de retour
 * @param {string} query requête SQL à effectuer
 * @param {Array<any>} paramList la liste des paramètres
 * @returns {Promise<any|null>} retourne le resultat en cas de succès, sinon null
 */
async function QueryHandlerExpectedResultArray(query, paramList) {
    return await QueryHandler(query, QUERY_HANDLER_EXPECTED_RESULT_ARRAY, paramList);
}

/**
 * Effectue les requêtes vers la base de données.
 *
 * Gère les rquêtes qui attendent un objet en valeur de retour
 * @param {string} query requête SQL à effectuer
 * @param {Array<any>} paramList la liste des paramètres
 * @returns {Promise<any|null>} retourne le resultat en cas de succès, sinon null
 */
async function QueryHandlerExpectedResultObject(query, paramList) {
    return await QueryHandler(query, QUERY_HANDLER_EXPECTED_RESULT_OBJECT, paramList);
}

module.exports = { QueryHandlerExpectedResultArray, QueryHandlerExpectedResultObject };
