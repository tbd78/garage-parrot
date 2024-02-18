// crée le routeur
const router = require("express").Router();

// import queries
const { InsertContactInfo } = require("../../query/insert");
const { GetAllContactInfos, GetContcatInfo } = require("../../query/select");
const { UpdateContactInfo } = require("../../query/update");
const { DeleteContactInfo } = require("../../query/delete");

// import les controlleurs génériques
const controller = require("./router_controller");

// insère les infos de contact
router.post('/', async (req, res) => {
    controller.Insert(req, res, InsertContactInfo);
});

// récupère tous les infos de contact
router.get('/', async (req, res) => {
    controller.Get(req, res, GetAllContactInfos);
});

// récupère un info de contact
router.get('/:id', async (req, res) => {
    controller.Get(req, res, GetContcatInfo);
});

// modifie un info de contact
router.put('/', async (req, res) => {
    controller.Update(req, res, UpdateContactInfo)
});

// supprime les infos de contact
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteContactInfo);
});

module.exports = router;
