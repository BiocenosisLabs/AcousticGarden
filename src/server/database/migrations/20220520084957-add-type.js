module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("spirits", "type", {
      type: Sequelize.TEXT,
    });
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn("spirits", "type");
  },
};
