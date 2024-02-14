const router = require("express").Router();

// import queries
const { InsertCar } = require("../../query/insert");
const { GetCar, GetAllCars } = require("../../query/select");
const { UpdateCar } = require("../../query/update");
const { DeleteCar } = require("../../query/delete");
// import response maker for api responses
const ResponseMaker = require("./responser_maker");

// insérer une voiture
router.post('/', async (req, res) => {
    const car = req.body;
    // TODO: validation de données
    // log le contenu de la requête
    console.debug("requête: ", car);

    const result = await InsertCar(car);
    res.json(ResponseMaker(result, result));
});

// récupérer toutes les voitures
router.get('/', async (req, res) => {
    const result = await GetAllCars();
    res.json(ResponseMaker(result, result));
});

// récupérer une voiture
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await GetCar(id);
    res.json(ResponseMaker(result, result));
});

// modifié une voiture
router.put('/', async (req, res) => {
    const car = req.body;
    // log le contenu de la requête
    console.log(car);

    const result = await UpdateCar(car);
    res.json(ResponseMaker(result, result));
});

// supprimer une voiture
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const success = await DeleteCar(id);
    res.json(ResponseMaker(success));
});

module.exports = router;
