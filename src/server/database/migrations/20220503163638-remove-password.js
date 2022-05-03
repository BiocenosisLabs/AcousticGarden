module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn("users", "password");
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "password", {
      type: Sequelize.STRING(60),
      allowNull: false,
    });
  },
};
