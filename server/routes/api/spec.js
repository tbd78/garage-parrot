//TODO: à voir si toutes les actions reliées au specs et car specs doivent être gérées en interne.
const router = require("express").Router();

// import queries
const { InsertSpec } = require("../../query/insert");
const { GetSpec, GetAllSpecs } = require("../../query/select");
const { UpdateSpec } = require("../../query/update");
const { DeleteSpec } = require("../../query/delete");

// import les controlleurs génériques
const controller = require("./router_controller");

// insérer une caractéristique
router.post('/', async (req, res) => {
    controller.Insert(req, res, InsertSpec);
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
    controller.Update(req, res, UpdateSpec)
});

// supprime une caractéristique
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteSpec)
});

module.exports = router;
