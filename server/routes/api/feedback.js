// crée le routeur
const router = require("express").Router();

// import queries
const { InsertFeedback } = require("../../query/insert");
const { GetFeedback, GetAllFeedbacks } = require("../../query/select");
const { UpdateFeedback } = require("../../query/update");
const { DeleteFeedback } = require("../../query/delete");

// import les controlleurs génériques
const controller = require("./router_controller");

// import response maker for api responses
const ResponseMaker = require("./responser_maker");

// insère un feedback
router.post('/', async (req, res) => {
    await controller.Insert(req, res, InsertFeedback);
});

// récupère tous les feedbacks
router.get('/', (req, res) => {
    controller.GetAll(req, res, GetAllFeedbacks);
});

// récupère un feedback
router.get('/:id', (req, res) => {
    controller.Get(req, res, GetFeedback);
});

// modifie un feedback
router.put('/', (req, res) => {
    controller.Update(req, res, UpdateFeedback);
});

// supprime un feedback
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteFeedback);
});

module.exports = router;
