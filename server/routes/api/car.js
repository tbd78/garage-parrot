// crée le routeur
const router = require("express").Router();

// import queries
const { InsertCar } = require("../../query/insert");
const { GetCar, GetAllCars } = require("../../query/select");
const { UpdateCar } = require("../../query/update");
const { DeleteCar } = require("../../query/delete");

// import les controlleurs génériques
const controller = require("./router_controller");

// import de 'zod' pour la validation
const { z } = require("zod");

// schema de validation à l'insertion
const INSERT_SCHEMA_VALIDATOR = z.object({
    brand: z.string().min(2).max(50),
    model: z.string().min(1).max(50),
    price: z.number().int(),
    mileage: z.number().int(),
    year: z.number().int(),
    cover_image: z.string().min(1).max(100)
});

// schema de validation à la mise à jour
const UPDATE_SCHEMA_VALIDATOR = z.object({
    id: z.number().int(),
    brand: z.string().min(2).max(50),
    model: z.string().min(1).max(50),
    price: z.number().int(),
    mileage: z.number().int(),
    year: z.number().int(),
    cover_image: z.string().min(1).max(100),
    sold: z.boolean()
});

// insère une voiture
router.post('/', async (req, res) => {
    controller.Insert(req, res, InsertCar, INSERT_SCHEMA_VALIDATOR);
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
    controller.Update(req, res, UpdateCar, UPDATE_SCHEMA_VALIDATOR);
});

// supprimer une voiture
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteCar);
});

module.exports = router;
