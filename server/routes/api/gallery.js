// crée le routeur
const router = require("express").Router();

// import queries
const { InsertGallery } = require("../../query/insert");
const { GetAllGalleries, GetGallery } = require("../../query/select");
const { UpdateGallery } = require("../../query/update");
const { DeleteGallery } = require("../../query/delete");

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
    controller.Insert(req, res, InsertGallery, INSERT_SCHEMA_VALIDATOR);
});

// récupère toutes les entrées de la gallerie
router.get('/', async (req, res) => {
    controller.GetAll(req, res, GetAllGalleries);
});

// récupère une entrée dans la gallerie à partir de l'id
router.get('/:id', async (req, res) => {
    controller.Get(req, res, GetGallery);
});

// modifie entrée dans la gallerie
router.put('/', async (req, res) => {
    controller.Update(req, res, UpdateGallery, UPDATE_SCHEMA_VALIDATOR);
});

// supprimer entrée dans la gallerie
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteGallery);
});

module.exports = router;
