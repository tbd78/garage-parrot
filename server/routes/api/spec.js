//TODO: à voir si toutes les actions reliées au specs et car specs doivent être gérées en interne.
const router = require("express").Router();

// import queries
const { InsertSpec } = require("../../query/insert");
const { GetSpec, GetAllSpecs } = require("../../query/select");
const { UpdateSpec } = require("../../query/update");
const { DeleteSpec } = require("../../query/delete");

// import les controlleurs génériques
const controller = require("./router_controller");

// import de 'zod' pour la validation
const { z } = require("zod");

// schema de validation à l'insertion
const INSERT_SCHEMA_VALIDATOR = z.object({
    name: z.string().min(1).max(50),
    type: z.string().min(1).max(50)
});

// schema de validation à la mise à jour
const UPDATE_SCHEMA_VALIDATOR = z.object({
    id: z.number().int(),
    name: z.string().min(1).max(50),
    type: z.string().min(1).max(50)
});

// insérer une caractéristique
router.post('/', async (req, res) => {
    controller.Insert(req, res, InsertSpec, INSERT_SCHEMA_VALIDATOR);
});

// récupère toutes les caractéristiques
router.get('/', async (req, res) => {
    controller.GetAll(req, res, GetAllSpecs);
});

// récupère une caractéristique
router.get('/:id', async (req, res) => {
    controller.Get(req, res, GetSpec);
});

// modifie une caractéristique
router.put('/', async (req, res) => {
    controller.Update(req, res, UpdateSpec, UPDATE_SCHEMA_VALIDATOR);
});

// supprime une caractéristique
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteSpec)
});

module.exports = router;
