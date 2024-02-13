const { QueryHandlerExpectedResultArray } = require("./query_handler");

// requête SQL
// commentaire
const SELECT_ALL_FEEDBACKS      = "SELECT * FROM feedback";
const SELECT_FEEDBACK           = "SELECT * FROM feedback WHERE id = ?";
// utilisateur
const SELECT_ALL_USERS          = "SELECT username, role, firstname, lastname FROM user";
const SELECT_USER               = "SELECT username, role, firstname, lastname FROM user WHERE id = ?";
// service
const SELECT_ALL_SERVICES       = "SELECT * FROM services";
const SELECT_SERVICE            = "SELECT * FROM services WHERE id = ?";
// voiture
const SELECT_ALL_CARS           = "SELECT * FROM car";
const SELECT_CAR                = "SELECT * FROM car WHERE id = ?";


/**
 * Récupère tous les éléments
 * @param {string} query requête sql
 * @return {Promise<Array<object>|boolean>} un tableau d'élément(s) en cas de succès, false sinon
 */
async function GetAll(query) {
    /** @type {Array<object>} */
    const result = await QueryHandlerExpectedResultArray(query);

    // log
    console.debug("résultat récupération: ", result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        // log
        console.log("récupération des éléments échouée");
        return false;
    }

    // log
    console.log(`tous les éléments ont été récupérés`) ;

    return result;
}

/**
 * Récupère un élément à partir de son id
 * @param {string} query requête sql
 * @return {Promise<object|boolean>} un élément en cas de succès, false sinon
 */
async function Get(query, id) {
    /** @type {Array<object>} */
    const result = await QueryHandlerExpectedResultArray(query, [id]);

    // log
    console.debug("résultat récupération : ", result);

    // en cas d'erreur on n'arrête
    if((result === null) || (result.length === 0)){
        // log
        console.log(`élément (id = ${id}) non recupéré`);
        return false;
    }

    // log
    console.log(`élément (id = ${id}) recupéré`);

    return result[0];
}

/**
 * Récupère tous les commentaires
 * @return {Promise<Array<object>|boolean>} un tableau de commentaire(s) en cas de succès false sinon
 */
async function GetAllFeedbacks() {
    return GetAll(SELECT_ALL_FEEDBACKS);
}

/**
 * Récupère un commentaire par son id
 * @param {number} id l'id du commentaire à récupérer
 * @return {Promise<object|boolean>} un commentaire en cas de succès false sinon
 */
async function GetFeedback(id) {
    return Get(SELECT_FEEDBACK, id);
}

/**
 * Récupère tous les services
 * @return {Promise<Array<object>|boolean>} un tableau d' utilisateur(s) en cas de succès false sinon
 */
async function GetAllUsers() {
    return GetAll(SELECT_ALL_USERS);
}

/**
 * Récupère un utilisateur par son id
 * @param {number} id l'id de l'utlisateur à récupérer
 * @return {Promise<object|boolean>} un utilisateur en cas de succès false sinon
 */
async function GetUser(id) {
    return Get(SELECT_USER, id);
}

/**
 * Récupère tous les services
 * @return {Promise<Array<object>|boolean>} un tableau de service(s) en cas de succès false sinon
 */
async function GetAllServices() {
    return GetAll(SELECT_ALL_SERVICES);
}

/**
 * Récupère un service par son id
 * @param {number} id l'id du service à récupérer
 * @return {Promise<object|boolean>} un service en cas de succès false sinon
 */
async function GetService(id) {
    return Get(SELECT_SERVICE, id);
}

module.exports = {
    // lié aux commentaires
    GetAllFeedbacks,
    GetFeedback,

    // lié aux utilisateurs
    GetAllUsers,
    GetUser,

    // lié aux services
    GetAllServices,
    GetService
};
