// import response maker for api responses
const ResponseMaker = require("./responser_maker");


exports.Insert = async (req, res, insertFn, validator = null) => {
    const item = req.body;
    // TODO: validation de données
    // TODO: use the validator here

    // log le contenu de la requête
    console.debug("requête: ", item);

    const result = await insertFn(item);
    res.json(ResponseMaker(result, result));
};

exports.Get = async (req, res, getFn) => {
    const id = req.params.id;
    const result = await getFn(id);
    res.json(ResponseMaker(result, result));
};

exports.GetAll = async (req, res, getAllFn) => {
    const result = await getAllFn();
    res.json(ResponseMaker(result, result));
};

exports.Update = async (req, res, updateFn, validator) => {
    const item = req.body;
    // TODO: validation de données
    // TODO: use the validator here

    // log le contenu de la requête
    console.debug("requête: ", item);

    const result = await updateFn(item);
    res.json(ResponseMaker(result, result));
};

exports.Delete = async (req, res, deleteFn) => {
    const id = req.params.id;
    const success = await deleteFn(id);
    res.json(ResponseMaker(success));
};

exports.NotFound = (req, res) => {
    res.status(404).json(ResponseMaker(false));
};
