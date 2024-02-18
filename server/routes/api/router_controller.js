// import response maker for api responses
const ResponseMaker = require("./responser_maker");
// import de 'zod' pour la validation
const { z } = require("zod");

/**
 * insère des données dans la base de données après validation
 * @param {z.ZodObject} validator
 */
exports.Insert = async (req, res, insertFn, validator = null) => {
    const item = req.body;

    // log le contenu de la requête
    console.debug("requête: ", item);

    try {
        if(validator) {
            // validation de item
            validator.parse(item);
        }
        const result = await insertFn(item);
        res.json(ResponseMaker(result, result));
    } catch(err) {
        res.json(ResponseMaker(false, err));
    }
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

    // log le contenu de la requête
    console.debug("requête: ", item);

    try {
        if(validator) {
            // validation de item
            validator.parse(item);
        }
        const result = await updateFn(item);
        res.json(ResponseMaker(result, result));
    } catch(err) {
        res.json(ResponseMaker(false, err));
    }

};

exports.Delete = async (req, res, deleteFn) => {
    const id = req.params.id;
    const success = await deleteFn(id);
    res.json(ResponseMaker(success));
};

exports.NotFound = (req, res) => {
    res.status(404).json(ResponseMaker(false));
};
