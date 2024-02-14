const { QueryHandlerExpectedResultObject } = require("./query_handler");

// requêtes SQL
const UPDATE_FEEDBACK       = "UPDATE feedback SET name = ?, comment = ?, rating = ?, validation = ? WHERE id = ?";
const UPDATE_USER           = "UPDATE user SET username = ?, password = ?, role = ?, firstname = ?, lastname = ? WHERE id = ?";
const UPDATE_SERVICE        = "UPDATE services SET service_name = ?, description = ? WHERE id = ?";
const UPDATE_CAR            = "UPDATE cars SET brand = ?, model = ?, price = ?, mileage = ?, year = ?, cover_image = ?, sold = ? WHERE id = ?";

/**
 * Modifie un élément
 * @param {string} query requête SQL
 * @param {object} item élément à modifier
 * @param {any[]} paramList liste des paramètres de la requête SQL
 * @return {Promise<object|boolean>} un élément en cas de succès, false sinon
 */
async function Update(query, item, paramList) {
    const result = await QueryHandlerExpectedResultObject(query, paramList);

    // log
    console.debug("résultat modification : ", result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        console.log(`élément (id = ${item.id}) non modifié`);
        return false;
    }

    // log
    console.log(`élément (id = ${item.id}) modifié`);

    return item;
}

/**
 * Modifie un commentaire
 * @param {object} feedback
 * @param {number} feedback.id l'id du commentaire
 * @param {string} feedback.name le nom de la personne qui à émit le commentaire
 * @param {string} feedback.comment le commentaire
 * @param {number} feedback.rating la note
 * @return {Promise<object|boolean>} un commentaire en cas de succès, false sinon
 */
async function UpdateFeedback(feedback) {
    const paramList = [feedback.name, feedback.comment, feedback.rating, feedback.validation, feedback.id];
    return Update(UPDATE_FEEDBACK, feedback, paramList);
}

/**
 * Modifie un utilisateur
 * @param {object} user
 * @param {number} user.id id utilisateur
 * @param {string} user.firstname prénom de l'utilisateur
 * @param {string} user.lastname nom de l'utilisateur
 * @param {string} user.username identifiant de l'utilisateur (e-mail)
 * @param {string} user.password le mot de passe de l'utilisatuer
 * @param {string} user.role le rôle de l'utilisateur (admin ou user)
 * @return {Promise<object|boolean>} un utilisateur en cas de succès false sinon
 */
async function UpdateUser(user) {
    const paramList = [user.username, user.password, user.role, user.firstname, user.lastname, user.id];
    return Update(UPDATE_USER, user, paramList);
}

/**
 * Modifie un service
 * @param {object} service
 * @param {number} service.id id service
 * @param {string} service.service_name nom du service
 * @param {string} service.description description du service
 * @return {Promise<object|boolean>} un service en cas de succès, false sinon
 */
async function UpdateService(service) {
    const paramList = [service.service_name, service.description, service.id];
    return Update(UPDATE_SERVICE, service, paramList);
}

/**
 * Modifie une voiture
 * @param {object} car
 * @param {number} car.id id de la voiture
 * @param {string} car.brand la marque de la voiture
 * @param {string} car.model le model de la voiture
 * @param {number} car.price le prix de la voiture
 * @param {number} car.mileage le kilométrage de la voiture
 * @param {number} car.year l'année de fabrication la voiture
 * @param {string} car.cover_image l'image principale de la voiture
 * @param {boolean} car.sold true si la voiture est vendue false sinon
 * @return {Promise<object|boolean>} un service en cas de succès, false sinon
 */
async function UpdateCar(car) {
    const paramList = [car.brand, car.model, car.price, car.mileage, car.year, car.cover_image, car.sold, car.id];
    return Update(UPDATE_CAR, car, paramList);
}

module.exports = { UpdateFeedback, UpdateUser, UpdateService, UpdateCar };
