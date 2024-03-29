// crée le routeur
const router = require("express").Router();

// import queries
const { contactInfoQueries } = require("./queries");

// import les controlleurs génériques
const controller = require("./router_controller");

// import de 'zod' pour la validation
const { z } = require("zod");

// schema de validation à l'insertion
const INSERT_SCHEMA_VALIDATOR = z.object({
    name: z.string().min(1).max(50),
    address: z.string().min(1).max(250),
    phone: z.string().min(1).max(10),
    email: z.string().min(1).max(50).email()
});

// schema de validation à la mise à jour
const UPDATE_SCHEMA_VALIDATOR = z.object({
    id: z.number().int(),
    name: z.string().min(1).max(50),
    address: z.string().min(1).max(250),
    phone: z.string().min(1).max(10),
    email: z.string().min(1).max(50).email()
});

// insère les infos de contact
router.post('/', async (req, res) => {
    controller.Insert(req, res, contactInfoQueries.Insert, INSERT_SCHEMA_VALIDATOR);
});

// récupère tous les infos de contact
router.get('/', async (req, res) => {
    controller.Get(req, res, contactInfoQueries.GetAll);
});

// récupère un info de contact
router.get('/:id', async (req, res) => {
    controller.Get(req, res, contactInfoQueries.Get);
});

// modifie un info de contact
router.put('/', async (req, res) => {
    controller.Update(req, res, contactInfoQueries.Update, UPDATE_SCHEMA_VALIDATOR)
});

// supprime les infos de contact
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, contactInfoQueries.Delete);
});

module.exports = router;
