const router = require("express").Router();

const { DeleteService } = require("../../query/delete");
const { InsertService } = require("../../query/insert");
const { GetAllServices, GetService } = require("../../query/select");
const { UpdateService } = require("../../query/update");

// insérer un service
router.post('/service', async (req, res) => {
    const service = req.body;
    // log le contenu de la requête
    console.log(service);

    const success = await InsertService(service);
    console.log(success);
    if(success) {
        // TODO: changer les réponses avec un format json bien défini
        res.send('Donnée sauvegardée');
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.status(500).send('Donnée non sauvegardée');
    }
});

// récupérer tous les services
router.get('/service', async (req, res) => {
    const result = await GetAllServices();

    if(result) {
        // TODO: changer les réponses avec un format json bien défini
        console.log("/service", result);
        res.status(200).json(result);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.send('Impossible de récupérer les services');
    }
});

// récupérer un service
router.get('/service/:id', async (req, res) => {
    const id = req.params.id;
    const result = await GetService(id);

    if(result) {
        // TODO: changer les réponses avec un format json bien défini
        res.status(200).json(result);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.send(`Impossible de récupérer le service`);
    }
});

// modifié un service
router.put('/service', async (req, res) => {
    const service = req.body;
    // log le contenu de la requête
    console.log(service);

    const result = await UpdateService(service);

    if(result) {
        // TODO: changer les réponses avec un format json bien défini
        res.status(200).send(result);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.status(500).send('Donnée non modifiée');
    }
});

// supprimer un service
router.delete('/service/:id', async (req, res) => {
    const id = req.params.id;
    const success = await DeleteService(id);
    if(success) {
        // TODO: changer les réponses avec un format json bien défini
        res.status(200).json(`Le service avec l'ID ${id} est supprimé`);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.send("Le service n'est pas supprimé");
    }
});

module.exports = router;
