const router = require("express").Router();

// import queries
const { InsertFeedback } = require("../../query/insert");
const { GetFeedback, GetAllFeedbacks } = require("../../query/select");
const { UpdateFeedback } = require("../../query/update");
const { DeleteFeedback } = require("../../query/delete");

// insérer un feedback
router.post('/feedback', async (req, res) => {
    const feedback = req.body;
    // log le contenu de la requête
    console.log(feedback);

    const success = await InsertFeedback(feedback);
    if(success) {
        // TODO: changer les réponses avec un format json bien défini
        res.send('Donnée sauvegardée');
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.status(500).send('Donnée non sauvegardée');
    }
});

// récupérer tous les feedbacks
router.get('/feedback', async (req, res) => {
    const result = await GetAllFeedbacks();
    if(result) {
        // TODO: changer les réponses avec un format json bien défini
        res.status(200).json(result);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.send('Impossible de récupérer les feedbacks');
    }
});

// récupérer un feedback
router.get('/feedback/:id', async (req, res) => {
    const feedbackId = req.params.id;
    const result = await GetFeedback(feedbackId);
    if(result) {
        // TODO: changer les réponses avec un format json bien défini
        res.status(200).json(result);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.send('Impossible de récupérer les feedbacks');
    }
});

// modifié un feedback
router.put('/feedback', async (req, res) => {
    const feedback = req.body;
    // log le contenu de la requête
    console.log(feedback);

    const result = await UpdateFeedback(feedback);
    if(result) {
        // TODO: changer les réponses avec un format json bien défini
        res.status(200).send(result);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.status(500).send('Donnée non modifiée');
    }
});

// supprimer un feedback
router.delete('/feedback/:id', async (req, res) => {
    const feedbackId = req.params.id;
    const success = await DeleteFeedback(feedbackId);
    if(success) {
        // TODO: changer les réponses avec un format json bien défini
        res.status(200).json(`Le commentaire avec l'ID ${feedbackId} est supprimé`);
    } else {
        // TODO: changer les réponses avec un format json bien défini
        res.send(`Erreur lors de la suppression du commentaire (id = ${feedbackId})`);
    }
});

module.exports = router;
