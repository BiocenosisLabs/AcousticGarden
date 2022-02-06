"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("recordings", "spiritId", {
      type: Sequelize.INTEGER,
      references: {
        model: "spirits",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn("recordings", "spiritId");
  },
};
