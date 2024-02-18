// crée le routeur
const router = require("express").Router();

// import queries
const { InsertCarSpec } = require("../../query/insert");
const { GetAllCarSpecs, GetCarSpec } = require("../../query/select");
const { UpdateCarSpec } = require("../../query/update");
const { DeleteCarSpec } = require("../../query/delete");

// import les controlleurs génériques
const controller = require("./router_controller");

// insère une voiture
router.post('/', async (req, res) => {
    controller.Insert(req, res, InsertCarSpec);
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
    controller.Update(req, res, UpdateCarSpec);
});

// supprimer une voiture
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteCarSpec);
});

module.exports = router;
