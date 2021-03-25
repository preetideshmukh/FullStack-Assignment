module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("inventory", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      }
    });
  
    return Inventory;
  };
  