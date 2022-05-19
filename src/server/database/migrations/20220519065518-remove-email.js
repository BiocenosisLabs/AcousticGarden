module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn("users", "email");
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "email", {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    });
  },
};
