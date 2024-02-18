const { QueryHandlerExpectedResultArray } = require("./query_handler");

// requête SQL
// commentaire
const SELECT_ALL_FEEDBACKS      = "SELECT * FROM feedback";
const SELECT_FEEDBACK           = "SELECT * FROM feedback WHERE id = ?";
// utilisateur
const SELECT_ALL_USERS          = "SELECT id, username, role, firstname, lastname FROM user";
const SELECT_USER               = "SELECT id, username, role, firstname, lastname FROM user WHERE id = ?";
// service
const SELECT_ALL_SERVICES       = "SELECT * FROM services";
const SELECT_SERVICE            = "SELECT * FROM services WHERE id = ?";
// voiture
const SELECT_ALL_CARS           = "SELECT * FROM cars";
const SELECT_CAR                = "SELECT * FROM cars WHERE id = ?";
// specs
const SELECT_ALL_SPECS          = "SELECT * FROM specs";
const SELECT_SPEC               = "SELECT * FROM specs WHERE id = ?";
// infos de contact
const SELECT_ALL_CONTACT_INFO   = "SELECT * FROM contact_info";
const SELECT_CONTACT            = "SELECT * FROM contact_info WHERE id = ?";
// caracteristique voiture
const SELECT_ALL_CAR_SPECS      = "SELECT * FROM characteristics";
const SELECT_CAR_SPEC           = "SELECT * FROM characteristics WHERE id = ?";


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

// ----------------------------------- Fonctions exportées ------------------------------------------------------------

/**
 * Récupère tous les commentaires
 * @return {Promise<Array<object>|boolean>} un tableau de commentaire(s) en cas de succès, false sinon
 */
exports.GetAllFeedbacks = async function() {
    return GetAll(SELECT_ALL_FEEDBACKS);
}

/**
 * Récupère un commentaire par son id
 * @param {number} id l'id du commentaire à récupérer
 * @return {Promise<object|boolean>} un commentaire en cas de succès, false sinon
 */
exports.GetFeedback = async function(id) {
    return Get(SELECT_FEEDBACK, id);
}

// ------------------------------------------------------------------------------------------------------------------

/**
 * Récupère tous les services
 * @return {Promise<Array<object>|boolean>} un tableau d' utilisateur(s) en cas de succès, false sinon
 */
exports.GetAllUsers = async function() {
    return GetAll(SELECT_ALL_USERS);
}

/**
 * Récupère un utilisateur par son id
 * @param {number} id l'id de l'utlisateur à récupérer
 * @return {Promise<object|boolean>} un utilisateur en cas de succès, false sinon
 */
exports.GetUser = async function(id) {
    return Get(SELECT_USER, id);
}

// ------------------------------------------------------------------------------------------------------------------

/**
 * Récupère tous les services
 * @return {Promise<Array<object>|boolean>} un tableau de service(s) en cas de succès, false sinon
 */
exports.GetAllServices = async function() {
    return GetAll(SELECT_ALL_SERVICES);
}

/**
 * Récupère un service par son id
 * @param {number} id l'id du service à récupérer
 * @return {Promise<object|boolean>} un service en cas de succès, false sinon
 */
exports.GetService = async function(id) {
    return Get(SELECT_SERVICE, id);
}

// ------------------------------------------------------------------------------------------------------------------

/**
 * Récupère toutes les voitures
 * @return {Promise<object|boolean>} un tableau de voiture(s) en cas de succès, false sinon
 */
exports.GetAllCars = async function() {
    return GetAll(SELECT_ALL_CARS);
}

/**
 * Récupère une voiture par son id
 * @param {number} id l'id de la voiture à récupérer
 * @return {Promise<object|boolean>} une voiture en cas de succès, false sinon
 */
exports.GetCar = async function(id) {
    return Get(SELECT_CAR, id);
}

// ------------------------------------------------------------------------------------------------------------------

/**
 * Récupère toutes les caractéristiques
 * @return {Promise<object|boolean>} un tableau de caractéristique(s) en cas de succès, false sinon
 */
exports.GetAllSpecs = async function() {
    return GetAll(SELECT_ALL_SPECS);
}

/**
 * Récupère une caractéristique par son id
 * @param {number} id l'id de la caractéristique à récupérer
 * @return {Promise<object|boolean>} une caractéristique en cas de succès, false sinon
 */
exports.GetSpec = async function(id) {
    return Get(SELECT_SPEC, id);
}

// ------------------------------------------------------------------------------------------------------------------

/**
 * Récupère tous les infos de contact
 * @return {Promise<object|boolean>} un tableau d'infos de contact en cas de succès, false sinon
 */
exports.GetAllContactInfos = async function() {
    return GetAll(SELECT_ALL_CONTACT_INFO);
}

/**
 * Récupère un info de contact
 * @param {number} id id info de contact à récupérer
 * @return {Promise<object|boolean>} un info de contact en cas de succès, false sinon
 */
exports.GetContcatInfo = async function(id) {
    return Get(SELECT_CONTACT, id);
}

// ------------------------------------------------------------------------------------------------------------------

/**
 * Récupère tous les caractéristiques voiture
 * @return {Promise<object|boolean>} un tableau de caractéristiques voiture en cas de succès, false sinon
*/
exports.GetAllCarSpecs = async function() {
    return GetAll(SELECT_ALL_CAR_SPECS);
}

/**
 * Récupère une caratéristique voiture
 * @param {number} id id caractéristique voiture à récupérer
 * @return {Promise<object|boolean>} une caractéristique voiture en cas de succès, false sinon
*/
exports.GetCarSpec = async function(id) {
    return Get(SELECT_CAR_SPEC, id);
}
