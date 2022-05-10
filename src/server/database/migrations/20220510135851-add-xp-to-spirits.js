module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("spirits", "xp", {
      type: Sequelize.INTEGER,
    });
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn("spirits", "xp");
  },
};
