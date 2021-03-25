const db = require("../models");
const Inventory = db.inventories;
const Op = db.Sequelize.Op;

// Create and Save a new Inventory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Inventory
  const inventory = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };

  // Save Inventory in the database
  Inventory.create(inventory)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Inventory."
      });
    });
};

// Get all Inventories from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Inventory.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving inventories."
      });
    });
};

// Find a single Inventory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Inventory.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Inventory with id=" + id
      });
    });
};

// Update a Inventory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Inventory.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Inventory was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Inventory with id=${id}. Maybe Inventory was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Inventory with id=" + id
      });
    });
};

// Delete a Inventory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Inventory.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Inventory was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Inventory with id=${id}. Maybe Inventory was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Inventory with id=" + id
      });
    });
};

// Delete all Inventories from the database.
exports.deleteAll = (req, res) => {
    Inventory.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Inventories were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all inventories."
      });
    });
};
