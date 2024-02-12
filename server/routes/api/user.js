const router = require("express").Router();

const { DeleteUser } = require("../../query/delete");
const { InsertUser } = require("../../query/insert");
const { GetAllUsers, GetUser } = require("../../query/select");
const { UpdateUser } = require("../../query/update");

// insérer un utilisateur
router.post('/user', async (req, res) => {
    const user = req.body;
    // log le contenu de la requête
    console.log(user);

    const success = await InsertUser(user);
    if(success) {
        // TODO: changer les réponses avec un format json bien défini
        res.send('Donnée sauvegardée');
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.status(500).send('Donnée non sauvegardée');
    }
});

// récupérer tous les utilisateurs
router.get('/user', async (req, res) => {
    const result = await GetAllUsers();

    if(result) {
        // TODO: changer les réponses avec un format json bien défini
        console.log("/user", result);
        res.status(200).json(result);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.send('Impossible de récupérer les utilisateurs');
    }
});

// récupérer un utilisateur
router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const result = await GetUser(id);

    if(result) {
        // TODO: changer les réponses avec un format json bien défini
        res.status(200).json(result);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.send(`Impossible de récupérer l'utilisateurs`);
    }
});

// modifié un utilisateur
router.put('/user', async (req, res) => {
    const user = req.body;
    // log le contenu de la requête
    console.log(user);

    const result = await UpdateUser(user);

    if(result) {
        // TODO: changer les réponses avec un format json bien défini
        res.status(200).send(result);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.status(500).send('Donnée non modifiée');
    }
});

// supprimer un utilisateur
router.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
    const success = await DeleteUser(id);
    if(success) {
        // TODO: changer les réponses avec un format json bien défini
        res.status(200).json(`L'utilisateur avec l'ID ${id} est supprimé`);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.send("L'utilisateur n'est pas supprimé");
    }
});

module.exports = router;
