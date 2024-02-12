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

/**
 * Récupère tous les services
 * @return {Promise<Array<object>|boolean>} un tableau d' utilisateur(s) en cas de succès false sinon
 */
async function GetAllUsers() {
    const query = "SELECT username, role, firstname, lastname FROM user";
    const result = await QueryHandler(query);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`tous les services ont été récupérés`) ;
    console.log(result);
    return result;
}

/**
 * Récupère un utilisateur par son id
 * @param {number} id l'id de l'utlisateur à récupérer
 * @return {Promise<object|boolean>} un utilisateur en cas de succès false sinon
 */
async function GetUser(id) {
    const query = "SELECT username, role, firstname, lastname FROM user WHERE id = ?";
    result = await QueryHandler(query, [id]);

    // log
    console.debug(result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`utlisateur (id = ${id}) recupéré`);

    // Return a light version of the user's record
    return result[0];
}

/**
 * Récupère tous les services
 * @return {Promise<Array<object>|boolean>} un tableau de service(s) en cas de succès false sinon
 */
async function GetAllServices() {
    const query = "SELECT * FROM services";
    const result = await QueryHandler(query);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`tous les services ont été récupérés`) ;
    console.log(result);
    return result;
}

/**
 * Récupère un service par son id
 * @param {number} id l'id du service à récupérer
 * @return {Promise<object|boolean>} un service en cas de succès false sinon
 */
async function GetService(id) {
    const query = "SELECT * FROM services WHERE id = ?";
    result = await QueryHandler(query, [id]);

    // log
    console.debug(result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`service (id = ${id}) recupéré`);

    // Return a light version of the service's record
    return result[0];
}
module.exports = {
    GetAllFeedbacks,
    GetFeedback,
    GetAllUsers,
    GetUser,
    GetAllServices,
    GetService
};
