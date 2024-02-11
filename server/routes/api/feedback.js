const router = require("express").Router();

// import queries
const insert = require("../../query/insert");
const select = require("../../query/select");
const update = require("../../query/update");
const erase = require("../../query/delete");

// insérer un feedback
router.post('/feedback', async (req, res) => {
    const feedback = req.body;
    // log le contenu de la requête
    console.log(feedback);

    const success = await insert.InsertFeedback(feedback);
    if(success) {
        res.send('Donnée sauvegardée');
    } else {
        res.status(500).send('Donnée non sauvegardée');
    }
})

// récupérer tous les feedbacks
router.get('/feedback', async (req, res) => {
    const {success, result} = await select.SelectAllFeedbacks();
    if(success) {
        res.status(200).json(result);
    } else {
        res.send('Impossible de récupérer les feedbacks');
    }
})

// récupérer un feedback
router.get('/feedback/:id', async (req, res) => {
    const feedbackId = req.params.id;
    const {success, result} = await select.SelectAFeedback(feedbackId);
    if(success) {
        res.status(200).json(result);
    } else {
        res.send('Impossible de récupérer les feedbacks');
    }
})

// modifié un feedback
router.put('/feedback/:id', async (req, res) => {
    const feedback = req.body;
    // log le contenu de la requête
    console.log(feedback);

    const {success, result} = await update.UpdateFeedback(feedback);
    if(success) {
        res.status(200).send(result);
    } else {
        res.status(500).send('Donnée non modifiée');
    }
})

// supprimer un feedback
router.delete('/feedback/:id', async (req, res) => {
    const feedbackId = req.params.id;
    const success = await erase.DeleteAFeedback(feedbackId);
    if(success) {
        res.status(200).json(`Le feedback avec l'ID ${feedbackId} est supprimé`);
    } else {
        res.send("Le feedback n'est pas supprimé");
    }
})

module.exports = router;
