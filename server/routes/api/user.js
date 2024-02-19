// crée le routeur
const router = require("express").Router();

// import queries
const { InsertUser } = require("../../query/insert");
const { GetAllUsers, GetUser } = require("../../query/select");
const { UpdateUser } = require("../../query/update");
const { DeleteUser } = require("../../query/delete");

// import les controlleurs génériques
const controller = require("./router_controller");

// import de 'zod' pour la validation
const { z } = require("zod");

// schema de validation à l'insertion
const INSERT_SCHEMA_VALIDATOR = z.object({
    username: z.string().max(50).email(),
    password: z.string().min(8),
    role: z.string().min(4).max(10),
    firstname: z.string().max(100),
    lastname: z.string().max(100)
});

// schema de validation à la mise à jour
const UPDATE_SCHEMA_VALIDATOR = z.object({
    id: z.number().int(),
    username: z.string().max(50).email(),
    password: z.string().min(8),
    role: z.string().min(4).max(10),
    firstname: z.string().max(100),
    lastname: z.string().max(100)
});

// insère un utilisateur
router.post('/', async (req, res) => {
    controller.Insert(req, res, InsertUser, INSERT_SCHEMA_VALIDATOR);
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
    controller.Update(req, res, UpdateUser, UPDATE_SCHEMA_VALIDATOR);
});

// supprime un utilisateur
router.delete('/:id', async (req, res) => {
    controller.Delete(req, res, DeleteUser);
});

module.exports = router;
