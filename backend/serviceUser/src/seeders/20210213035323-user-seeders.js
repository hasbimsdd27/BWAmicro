"use strict";
const argon2 = require("argon2");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Hasbi Musaddad",
          profession: "Fullstack Developer",
          role: "admin",
          email: "musaddadhasbi@gmail.com",
          password: await argon2.hash("password"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Ike Karunia",
          profession: "UX Writer",
          role: "student",
          email: "ikekarunia@gmail.com",
          password: await argon2.hash("password"),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
