// crée le routeur
const router = require("express").Router();

// import queries
const { InsertCar } = require("../../query/insert");
const { GetCar, GetAllCars } = require("../../query/select");
const { UpdateCar } = require("../../query/update");
const { DeleteCar } = require("../../query/delete");

// import les controlleurs génériques
const controller = require("./router_controller");

// insère une voiture
router.post('/', async (req, res) => {
    controller.Insert(req, res, InsertCar);
});

// récupère toutes les voitures
router.get('/', async (req, res) => {
    controller.GetAll(req, res, GetAllCars);
});

// récupère une voiture
router.get('/:id', async (req, res) => {
    controller.Get(req, res, GetCar);
});

// modifie une voiture
router.put('/', async (req, res) => {
    controller.Update(req, res, UpdateCar);
});

// supprimer une voiture
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteCar);
});

module.exports = router;
