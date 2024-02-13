const router = require("express").Router();

// import queries
const { DeleteUser } = require("../../query/delete");
const { InsertUser } = require("../../query/insert");
const { GetAllUsers, GetUser } = require("../../query/select");
const { UpdateUser } = require("../../query/update");
// import response maker for api responses
const ResponseMaker = require("./responser_maker");

// insérer un utilisateur
router.post('/', async (req, res) => {
    const user = req.body;
    // TODO: validation de données
    // log le contenu de la requête
    console.debug("requête: ", user);

    const result = await InsertUser(user);
    res.json(ResponseMaker(result, result));
});

// récupérer tous les utilisateurs
router.get('/', async (req, res) => {
    const result = await GetAllUsers();
    res.json(ResponseMaker(result, result));
});

// récupérer un utilisateur
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await GetUser(id);
    res.json(ResponseMaker(result, result));
});

// modifié un utilisateur
router.put('/', async (req, res) => {
    const user = req.body;
    // TODO: validation de données
    // log le contenu de la requête
    console.debug("requête : ", user);

    const result = await UpdateUser(user);
    res.json(ResponseMaker(result, result));
});

// supprimer un utilisateur
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const success = await DeleteUser(id);
    res.json(ResponseMaker(success));
});

module.exports = router;
