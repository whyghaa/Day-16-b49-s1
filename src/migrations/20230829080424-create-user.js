'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.INTEGER,
      },
      author: {
        type: Sequelize.INTEGER,
				references: {
					model: 'sigins',
					key: 'id',
				},
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      end_date: {
        type: Sequelize.DATEONLY
      },
      description: {
        type: Sequelize.TEXT
      },
      javascript: {
        type: Sequelize.BOOLEAN,
      },
			reactjs: {
        type: Sequelize.BOOLEAN,
			},
			vuejs: {
        type: Sequelize.BOOLEAN,
			},
      nodejs: {
        type: Sequelize.BOOLEAN,
      },
			image: {
        type: Sequelize.STRING,
			},
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};