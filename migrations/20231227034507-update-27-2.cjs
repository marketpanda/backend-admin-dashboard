module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('vue_users', 'trips', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
     
  }
};
