// create the router
const router = require("express").Router();

// import queries
const { serviceQueries } = require("./queries");

// import les controlleurs génériques
const controller = require("./router_controller");

// import de 'zod' pour la validation
const { z } = require("zod");

// schema de validation à l'insertion
const INSERT_SCHEMA_VALIDATOR = z.object({
    service_name: z.string().min(1).max(50),
    description: z.string().max(50)
});

// schema de validation à la mise à jour
const UPDATE_SCHEMA_VALIDATOR = z.object({
    id: z.number().int(),
    service_name: z.string().min(1).max(50),
    description: z.string().max(50)
});

// insère un service
router.post('/', async (req, res) => {
    controller.Insert(req, res, serviceQueries.Insert, INSERT_SCHEMA_VALIDATOR);
});

// récupère tous les services
router.get('/', async (req, res) => {
    controller.GetAll(req, res, serviceQueries.GetAll);
});

// récupère un service
router.get('/:id', async (req, res) => {
    controller.Get(req, res, serviceQueries.Get);
});

// modifie un service
router.put('/', async (req, res) => {
    controller.Update(req, res, serviceQueries.Update, UPDATE_SCHEMA_VALIDATOR);
});

// supprime un service
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, serviceQueries.Delete);
});

module.exports = router;
