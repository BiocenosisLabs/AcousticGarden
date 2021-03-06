module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      username: {
        type: Sequelize.STRING(24),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("users");
  },
};
