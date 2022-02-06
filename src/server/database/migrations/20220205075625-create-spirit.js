module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("spirits", {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.GEOGRAPHY("POINT", 4326),
        allowNull: false,
      },
      level: {
        type: Sequelize.INTEGER,
      },
      seed: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("spirits");
  },
};
