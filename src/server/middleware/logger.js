const logger = (req, res, next) => {
  console.log(req.body);
  console.log(req.query);
  next();
};

export default logger;