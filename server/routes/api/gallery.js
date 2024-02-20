// crée le routeur
const router = require("express").Router();

// import queries
const { galleryQueries } = require("./queries");

// import les controlleurs génériques
const controller = require("./router_controller");

// import de 'zod' pour la validation
const { z } = require("zod");

// schema de validation à l'insertion
const INSERT_SCHEMA_VALIDATOR = z.object({
    car_id: z.number().int(),
    image: z.string().max(100)
});

// schema de validation à la mise à jour
const UPDATE_SCHEMA_VALIDATOR = z.object({
    id: z.number().int(),
    car_id: z.number().int(),
    image: z.string().max(100)
});

// insère une entrée dans la gallerie
router.post('/', async (req, res) => {
    controller.Insert(req, res, galleryQueries.Insert, INSERT_SCHEMA_VALIDATOR);
});

// récupère toutes les entrées de la gallerie
router.get('/', async (req, res) => {
    controller.GetAll(req, res, galleryQueries.GetAll);
});

// récupère une entrée dans la gallerie à partir de l'id
router.get('/:id', async (req, res) => {
    controller.Get(req, res, galleryQueries.Get);
});

// modifie entrée dans la gallerie
router.put('/', async (req, res) => {
    controller.Update(req, res, galleryQueries.Update, UPDATE_SCHEMA_VALIDATOR);
});

// supprimer entrée dans la gallerie
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, galleryQueries.Delete);
});

module.exports = router;
