// crée le routeur
const router = require("express").Router();

// import queries
const { feedbackQueries } = require("./queries");

// import les controlleurs génériques
const controller = require("./router_controller");

// import de 'zod' pour la validation
const { z } = require("zod");

// schema de validation à l'insertion
const INSERT_SCHEMA_VALIDATOR = z.object({
    name: z.string().min(1).max(50),
    comment: z.string(),
    rating: z.number().int().min(0).max(10)
});

// schema de validation à la mise à jour
const UPDATE_SCHEMA_VALIDATOR = z.object({
    id: z.number().int(),
    name: z.string().min(1).max(50),
    comment: z.string(),
    rating: z.number().int().min(0).max(10),
    validation: z.boolean()
});

// insère un feedback
router.post('/', async (req, res) => {
    await controller.Insert(req, res, feedbackQueries.Insert, INSERT_SCHEMA_VALIDATOR);
});

// récupère tous les feedbacks
router.get('/', (req, res) => {
    controller.GetAll(req, res, feedbackQueries.GetAll);
});

// récupère un feedback
router.get('/:id', (req, res) => {
    controller.Get(req, res, feedbackQueries.Get);
});

// modifie un feedback
router.put('/', (req, res) => {
    controller.Update(req, res, feedbackQueries.Update, UPDATE_SCHEMA_VALIDATOR);
});

// supprime un feedback
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, feedbackQueries.Delete);
});

module.exports = router;
