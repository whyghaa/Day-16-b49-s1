'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // return await queryInterface.bulkInsert(
    //   "Users",
    //   [
    //     {
    //       name : "Mobile Developer",
    //       description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quisquam molestias modi suscipit earum deleniti numquam aliquid! Laborum, maxime saepe.",
    //       image : "project-1.jpg",
    //       start_date : "2023-08-01",
    //       end_date : "2023-09-09",
    //       javascript : true,
    //       reactjs : true,
    //       vuejs : true,
    //       nodejs : true,
    //     },
    //   ],
    //   {}
    // )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
