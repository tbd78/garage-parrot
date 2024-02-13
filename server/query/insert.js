const { QueryHandlerExpectedResultObject } = require("./query_handler");

// requêtes SQL
const INSERT_FEEDBACK   = "INSERT INTO feedback (date, name, comment, rating, validation) VALUES (?, ?, ?, ?, ?)";
const INSERT_USER       = "INSERT INTO user (username, password, role, firstname, lastname) VALUES (?, ?, ?, ?, ?)";
const INSERT_SERVICE    = "INSERT INTO services (service_name, description) VALUES (?, ?)";
const INSERT_CAR        = "INSERT INTO cars (brand, model, price, mileage, year, cover_image, sold) VALUES (?, ?, ?, ?, ?, ?, ?)";

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

/**
 * Insérer un commentaire
 * @param {object} feedback
 * @param {string} feedback.name le nom de la personne qui à émit le commentaire
 * @param {string} feedback.comment le commentaire
 * @param {number} feedback.rating la note
 * @return {Promise<boolean|object>} commentaire en cas de succès, false sinon
 */
async function InsertFeedback(feedback) {
    const date = new Date(Date.now());
    // TODO: Changer le date.getUTCMonth en rajoutant +1 ?
    const dateLiteral = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
    const paramList = [dateLiteral, feedback.name, feedback.comment, feedback.rating, 0];
    return Insert(INSERT_FEEDBACK, feedback, paramList);
}


/**
 * Insérer un nouvel utilisateur
 * @param {object} user
 * @param {string} user.firstname prénom de l'utilisateur
 * @param {string} user.lastname nom de l'utilisateur
 * @param {string} user.username identifiant de l'utilisateur (e-mail)
 * @param {string} user.password le mot de passe de l'utilisatuer
 * @param {string} user.role le rôle de l'utilisateur (admin ou user)
 * @return {Promise<boolean|object>} user en cas de succès, false sinon
 */
async function InsertUser(user) {
    // TODO: faire du role une constante
    const paramList = [user.username, user.password, user.role, user.firstname, user.lastname];
    return Insert(INSERT_USER, user, paramList);
}


/**
 * Insérer un nouveau service
 * @param {object} service
 * @param {string} service.service_name nom du service
 * @param {string} service.description description du service
 * @return {Promise<boolean>} service en cas de succès, false sinon
 */
async function InsertService(service) {
    const paramList = [service.service_name, service.description];
    return Insert(INSERT_SERVICE, service, paramList);
}

/**
 * Insérer une voiture
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
async function InsertCar(car) {
    const paramList = [car.brand, car.model, car.price, car.mileage, car.year, car.cover_image, 0];
    return Insert(INSERT_CAR, car, paramList);
}

module.exports = { InsertFeedback, InsertUser, InsertService, InsertCar };
