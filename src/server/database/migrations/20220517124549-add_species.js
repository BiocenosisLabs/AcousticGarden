module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("feedbacks", "species", {
      type: Sequelize.JSONB,
    });
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn("feedbacks", "species");
  },
};
