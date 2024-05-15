module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('vue_users', 'favorites', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
     
  }
};
