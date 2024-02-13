const router = require("express").Router();

// import queries
const { InsertFeedback } = require("../../query/insert");
const { GetFeedback, GetAllFeedbacks } = require("../../query/select");
const { UpdateFeedback } = require("../../query/update");
const { DeleteFeedback } = require("../../query/delete");
// import response maker for api responses
const ResponseMaker = require("./responser_maker");

// insérer un feedback
router.post('/', async (req, res) => {
    const feedback = req.body;
    // TODO: validation de données
    // log le contenu de la requête
    console.debug("requête: ", feedback);

    const result = await InsertFeedback(feedback);
    res.json(ResponseMaker(result, result));
});

// récupérer tous les feedbacks
router.get('/', async (req, res) => {
    const result = await GetAllFeedbacks();
    res.json(ResponseMaker(result, result));
});

// récupérer un feedback
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await GetFeedback(id);
    res.json(ResponseMaker(result, result));
});

// modifié un feedback
router.put('/', async (req, res) => {
    const feedback = req.body;
    // TODO: validation de données
    // log le contenu de la requête
    console.debug("requête: ", feedback);

    const result = await UpdateFeedback(feedback);
    res.json(ResponseMaker(result, result));
});

// supprimer un feedback
router.delete('/:id', async (req, res) => {
    const feedbackId = req.params.id;
    const success = await DeleteFeedback(feedbackId);
    res.json(ResponseMaker(success));
});

module.exports = router;
