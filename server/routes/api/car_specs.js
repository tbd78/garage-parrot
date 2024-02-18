// crée le routeur
const router = require("express").Router();
// import queries
const { InsertCarSpec } = require("../../query/insert");
const { GetAllCarSpecs, GetCarSpec } = require("../../query/select");
const { UpdateCarSpec } = require("../../query/update");
const { DeleteCarSpec } = require("../../query/delete");
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
    controller.Insert(req, res, InsertCarSpec, INSERT_SCHEMA_VALIDATOR);
});

// récupère toutes les voitures
router.get('/', async (req, res) => {
    controller.GetAll(req, res, GetAllCarSpecs);
});

// récupère une voiture
router.get('/:id', async (req, res) => {
    controller.Get(req, res, GetCarSpec);
});

// modifie une voiture
router.put('/', async (req, res) => {
    controller.Update(req, res, UpdateCarSpec, UPDATE_SCHEMA_VALIDATOR);
});

// supprimer une voiture
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteCarSpec);
});

module.exports = router;
