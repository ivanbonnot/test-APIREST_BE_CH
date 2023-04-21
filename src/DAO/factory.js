const mongoDBDAO = require("./mongoDBDAO");

let mongoDAO

const factoryDAO = () => {

  return mongoDAO = new mongoDBDAO();

};

module.exports = factoryDAO;
