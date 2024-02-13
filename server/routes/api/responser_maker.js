const RESPONSE_STATUS_OK = "OK";
const RESPONSE_STATUS_KO = "NOK";

/**
 * Génère les réponses pour l'api
 * @param {string} status
 * @param {any} [data=null]
 * @return {object} The response
 */
function MakeResponse(status, data = null) {
    return {
        status: status,
        data: data
    };
}

/**
 * Génère une réponse avec comme status OK
 * @param {any} [data=null]
 * @return {object} The response
 */
function MakeResponseOK(data = null) {
    return MakeResponse(RESPONSE_STATUS_OK, data);
}

/**
 * Génère une réponse avec comme status KO
 * @param {any} [data=null]
 * @return {object} The response
 */
function MakeResponseKO(data = null) {
    return MakeResponse(RESPONSE_STATUS_KO, data);
}

/**
 * Génère une réponse.
 *
 * Une réponse avec 'OK' comme statut est générée si success est à true. Sinon,
 * le statut de la réponse est 'KO'
 * @param {boolean} success
 * @param {any} [data=null]
 * @return {object} The response
 */
function Make(success, data = null) {
    let response = null;
    if(success) {
        response = MakeResponseOK(data);
    } else {
        response = MakeResponseKO();
    }

    return response;
}

module.exports = Make;
