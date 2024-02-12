const QueryHandler = require("./queryHandler");

/**
 * Modifie un commentaire
 * @param {object} feedback
 * @param {number} feedback.id l'id du commentaire
 * @param {string} feedback.name le nom de la personne qui à émit le commentaire
 * @param {string} feedback.comment le commentaire
 * @param {number} feedback.rating la note
 * @return {Promise<object|boolean>} un commentaire en cas de succès false sinon
 */
async function UpdateFeedback(feedback) {
    const query = "UPDATE feedback SET name = ?, comment = ?, rating = ?, validation = ? WHERE id = ?";
    const paramList = [feedback.name, feedback.comment, feedback.rating, feedback.validation, feedback.id];
    const result = await QueryHandler(query, paramList);

    // log
    console.debug(result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`commentaire (id = ${feedback.id}) modifié`);

    return feedback;
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
    const query = "UPDATE user SET username = ?, password = ?, role = ?, firstname = ?, lastname = ? WHERE id = ?";
    const paramList = [user.username, user.password, user.role, user.firstname, user.lastname, user.id];
    const result = await QueryHandler(query, paramList);

    // log
    console.debug(result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`utilisateur (id = ${user.id}) modifié`);

    return user;
}

/**
 * Modifie un service
 * @param {object} service
 * @param {number} service.id id service
 * @param {string} service.service_name nom du service
 * @param {string} service.description description du service
 * @return {Promise<object|boolean>} un service en cas de succès false sinon
 */
async function UpdateService(service) {
    const query = "UPDATE services SET service_name = ?, description = ? WHERE id = ?";
    const paramList = [service.service_name, service.description, service.id];
    const result = await QueryHandler(query, paramList);

    // log
    console.debug(result);

    // en cas d'erreur on n'arrête
    if(result === null) {
        return false;
    }

    // log
    console.log(`service (id = ${service.id}) modifié`);

    return service;
}

module.exports = { UpdateFeedback, UpdateUser, UpdateService };
