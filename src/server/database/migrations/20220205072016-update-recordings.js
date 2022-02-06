"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("recordings", "userId", {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      })
      .then(() => {
        queryInterface.addColumn("recordings", "location", {
          type: Sequelize.GEOGRAPHY("POINT", 4326),
          allowNull: true,
        });
      })
      .then(() => {
        queryInterface.removeColumn("recordings", "attachableId");
      })
      .then(() => {
        queryInterface.removeColumn("recordings", "attachableType");
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn("recordings", "userId")
      .then(queryInterface.removeColumn("recordings", "location"))
      .then(
        queryInterface.addColumn("recordings", "attachableType", {
          type: Sequelize.STRING,
        })
      )
      .then(
        queryInterface.addColumn("recordings", "attachableId", {
          type: Sequelize.INTEGER,
        })
      );
  },
};
