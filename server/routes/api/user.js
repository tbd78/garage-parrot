// crée le routeur
const router = require("express").Router();

// import queries
const { InsertUser } = require("../../query/insert");
const { GetAllUsers, GetUser } = require("../../query/select");
const { UpdateUser } = require("../../query/update");
const { DeleteUser } = require("../../query/delete");

// import les controlleurs génériques
const controller = require("./router_controller");

// insère un utilisateur
router.post('/', async (req, res) => {
    controller.Insert(req, res, InsertUser);
});

// récupère tous les utilisateurs
router.get('/', async (req, res) => {
    controller.GetAll(req, res, GetAllUsers);
});

// récupère un utilisateur
router.get('/:id', async (req, res) => {
    controller.Get(req, res, GetUser);
});

// modifie un utilisateur
router.put('/', async (req, res) => {
    controller.Update(req, res, UpdateUser);
});

// supprime un utilisateur
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteUser);
});

module.exports = router;
