export const validation = (schema) => {
  return (req, res, next) => {

    let inputs = {...req.body, ...req.params, ...req.query}
    let { error } = schema.validate(inputs, { abortEarly: false });
    if (error) {

      let errors = error.details.map((detail) => detail.message);
      res.json(errors);
    } else {
      next()
    }
  };
};



/**
 * req.body {name: "anouar"}
 * req.params {id: 21321231}
 * req.query  {test: "pingu"}
 */