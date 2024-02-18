const { QueryHandlerExpectedResultObject } = require("./query_handler");

// requêtes SQL
const INSERT_FEEDBACK       = "INSERT INTO feedback (date, name, comment, rating, validation) VALUES (?, ?, ?, ?, ?)";
const INSERT_USER           = "INSERT INTO user (username, password, role, firstname, lastname) VALUES (?, ?, ?, ?, ?)";
const INSERT_SERVICE        = "INSERT INTO services (service_name, description) VALUES (?, ?)";
const INSERT_CAR            = "INSERT INTO cars (brand, model, price, mileage, year, cover_image, sold) VALUES (?, ?, ?, ?, ?, ?, ?)";
const INSERT_SPEC           = "INSERT INTO specs (name, type) VALUES (?, ?)";
const INSERT_CONTCAT_INFO   = "INSERT INTO contact_info (name, address, phone, email) VALUES (?, ?, ?, ?)";
const INSERT_CAR_SPEC       = "INSERT INTO characteristic (car_id, spec_id, value) VALUES (?, ?, ?)";

/**
 * Insère un élément donnée dans la base de données
 * @param {string} query requête SQL à effectuer
 * @param {object} item élément à insérer
 * @param {any[]} paramList liste des paramètres de la requête
 * @return {Promise<boolean|object>} élément à insérer en cas de succès, false sinon
 */
async function Insert(query, item, paramList) {
    const result = await QueryHandlerExpectedResultObject(query, paramList);

    // log
    console.debug("résult insertion : ", result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        console.log(`élément non inséré`) ;
        return false;
    }

    // log
    console.log(`nouvel élément (id = ${result.insertId}) inséré`) ;

    return item;
}

// ----------------------------------- Fonctions exportées ------------------------------------------------------------

/**
 * Insère un commentaire
 * @param {object} feedback
 * @param {string} feedback.name le nom de la personne qui à émit le commentaire
 * @param {string} feedback.comment le commentaire
 * @param {number} feedback.rating la note
 * @return {Promise<boolean|object>} commentaire en cas de succès, false sinon
 */
exports.InsertFeedback = async function (feedback) {
    const date = new Date(Date.now());
    // TODO: Changer le date.getUTCMonth en rajoutant +1 ?
    const dateLiteral = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
    const paramList = [dateLiteral, feedback.name, feedback.comment, feedback.rating, 0];
    return Insert(INSERT_FEEDBACK, feedback, paramList);
}

/**
 * Insère un nouvel utilisateur
 * @param {object} user
 * @param {string} user.firstname prénom de l'utilisateur
 * @param {string} user.lastname nom de l'utilisateur
 * @param {string} user.username identifiant de l'utilisateur (e-mail)
 * @param {string} user.password le mot de passe de l'utilisatuer
 * @param {string} user.role le rôle de l'utilisateur (admin ou user)
 * @return {Promise<boolean|object>} user en cas de succès, false sinon
 */
exports.InsertUser = async function (user) {
    // TODO: faire du role une constante
    const paramList = [user.username, user.password, user.role, user.firstname, user.lastname];
    return Insert(INSERT_USER, user, paramList);
}

/**
 * Insère un nouveau service
 * @param {object} service
 * @param {string} service.service_name nom du service
 * @param {string} service.description description du service
 * @return {Promise<boolean>} service en cas de succès, false sinon
 */
exports.InsertService = async function (service) {
    const paramList = [service.service_name, service.description];
    return Insert(INSERT_SERVICE, service, paramList);
}

/**
 * Insère une voiture
 * @param {object} car
 * @param {string} car.brand la marque de la voiture
 * @param {string} car.model le model de la voiture
 * @param {number} car.price le prix de la voiture
 * @param {number} car.mileage le kilométrage de la voiture
 * @param {number} car.year l'année de fabrication la voiture
 * @param {string} car.cover_image l'image principale de la voiture
 * @param {boolean} car.sold true si la voiture est vendue false sinon
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
exports.InsertCar = async function (car) {
    const paramList = [car.brand, car.model, car.price, car.mileage, car.year, car.cover_image, 0];
    return Insert(INSERT_CAR, car, paramList);
}

/**
 * Insère une caractéristique
 * @param {object} spec
 * @param {string} spec.name la nom de la caractéristique
 * @param {string} spec.type le type de la caractéristique
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
exports.InsertSpec = async function (spec) {
    const paramList = [spec.name, spec.type];
    return Insert(INSERT_SPEC, spec, paramList);
}

/**
 * Insère un info de contact
 * @param {object} contact
 * @param {string} contact.name
 * @param {string} contact.address
 * @param {string} contact.phone
 * @param {string} contact.email
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
exports.InsertContactInfo = async function (contact) {
    const paramList = [contact.name, contact.address, contact.phone, contact.email];
    return Insert(INSERT_CONTCAT_INFO, contact, paramList);
}

/**
 * Insère une caractéristique d'une voiture
 * @param {object} car_spec
 * @param {string} car_spec.car_id
 * @param {string} car_spec.spec_id
 * @param {string} car_spec.value
 * @return {Promise<boolean>} true en cas de succès false sinon
 */
exports.InsertCarSpec = async function (car_spec) {
    const paramList = [car_spec.car_id, car_spec.spec_id, car_spec.value];
    return Insert(INSERT_CAR_SPEC, contact, paramList);
}
