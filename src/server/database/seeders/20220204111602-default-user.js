module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("users", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        username: "test",
        password:
          "$2b$10$zVi.sTF9dZAYFajgBRs7fO08pF7zaPLa8LrbpfoYh0wm2RCQEpmw2",
        email: "test@domain.com",
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("users", [
      {
        email: ["test@domain.com"],
      },
    ]);
  },
};
