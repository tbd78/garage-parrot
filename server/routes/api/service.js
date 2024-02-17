// create the router
const router = require("express").Router();

// import queries
const { DeleteService } = require("../../query/delete");
const { InsertService } = require("../../query/insert");
const { GetAllServices, GetService } = require("../../query/select");
const { UpdateService } = require("../../query/update");

// import les controlleurs génériques
const controller = require("./router_controller");

// insère un service
router.post('/', async (req, res) => {
    controller.Insert(req, res, InsertService);
});

// récupère tous les services
router.get('/', async (req, res) => {
    controller.GetAll(req, res, GetAllServices);
});

// récupère un service
router.get('/:id', async (req, res) => {
    controller.Get(req, res, GetService);
});

// modifie un service
router.put('/', async (req, res) => {
    controller.Update(req, res, UpdateService);
});

// supprime un service
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteService);
});

module.exports = router;
