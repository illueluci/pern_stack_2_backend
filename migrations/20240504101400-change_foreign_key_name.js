'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.sequelize.transaction(t => {
    //   let p1 = queryInterface.addColumn(IncubatorId)
    //   return Promise.all();
    // });
    await queryInterface.renameColumn("Startups", "incubatorId", "IncubatorId");
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn("Startups", "IncubatorId", "incubatorId");
  }
};
