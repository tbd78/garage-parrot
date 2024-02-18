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

// CREATE TABLE IF NOT EXISTS feedback(
//     `id` INT AUTO_INCREMENT PRIMARY KEY,
//     `date` DATETIME,
//     `name` CHAR(50),
//     `comment` TEXT,
//     `rating` INT,
//     `validation` BOOLEAN
// );
// import de 'zod' pour la validation
const { z } = require("zod");

// schema de validation à l'insertion
const INSERT_SCHEMA_VALIDATOR = z.object({
    name: z.string().min(1).max(50),
    comment: z.string(),
    rating: z.number().int()
});

// schema de validation à la mise à jour
const UPDATE_SCHEMA_VALIDATOR = z.object({
    id: z.number().int(),
    name: z.string().min(1).max(50),
    comment: z.string(),
    rating: z.number().int(),
    validation: z.boolean()
});

// insère un feedback
router.post('/', async (req, res) => {
    await controller.Insert(req, res, InsertFeedback, INSERT_SCHEMA_VALIDATOR);
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
    controller.Update(req, res, UpdateFeedback, UPDATE_SCHEMA_VALIDATOR);
});

// supprime un feedback
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteFeedback);
});

module.exports = router;
