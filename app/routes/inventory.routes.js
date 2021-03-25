module.exports = app => {
    const inventories = require("../controllers/inventory.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Inventory
    router.post("/", inventories.create);
  
    // Get all Inventories
    router.get("/", inventories.findAll);
  
    // Retrieve a single Inventory with id
    router.get("/:id", inventories.findOne);
  
    // Update a Inventory with id
    router.put("/:id", inventories.update);
  
    // Delete a Inventory with id
    router.delete("/:id", inventories.delete);
  
    // Delete all Inventories
    router.delete("/", inventories.deleteAll);
  
    app.use('/api/inventories', router);
  };
  