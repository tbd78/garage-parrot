// crée le routeur
const router = require("express").Router();
// import queries
// import queries
const { carSpecsQueries } = require("./queries");

// import les controlleurs génériques
const controller = require("./router_controller");
// import de 'zod' pour la validation
const { z } = require("zod");

// schema de validation à l'insertion
const INSERT_SCHEMA_VALIDATOR = z.object({
    car_id: z.number().int(),
    specs_id: z.number().int(),
    value: z.string().min(1).max(50)
});

// schema de validation à la mise à jour
const UPDATE_SCHEMA_VALIDATOR = z.object({
    id: z.number().int(),
    car_id: z.number().int(),
    specs_id: z.number().int(),
    value: z.string().min(1).max(50)
});

// insère une voiture
router.post('/', async (req, res) => {
    controller.Insert(req, res, carSpecsQueries.Insert, INSERT_SCHEMA_VALIDATOR);
});

// récupère toutes les voitures
router.get('/', async (req, res) => {
    controller.GetAll(req, res, carSpecsQueries.GetAll);
});

// récupère une voiture
router.get('/:id', async (req, res) => {
    controller.Get(req, res, carSpecsQueries.Get);
});

// modifie une voiture
router.put('/', async (req, res) => {
    controller.Update(req, res, carSpecsQueries.Update, UPDATE_SCHEMA_VALIDATOR);
});

// supprimer une voiture
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, carSpecsQueries.Delete);
});

module.exports = router;
