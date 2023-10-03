const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['menu']
  const result = await mongodb.getDatabase().db().collection('menu').find();
  result.toArray().then((menu, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(menu);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['menu']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid menu id to find a menu.');
  }
  const menuId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('menu').find({ _id: menuId });
  result.toArray().then((menu, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(menu[0]);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const createMenu = async (req, res) => {
  //#swagger.tags=['menu']
  const menu = {
    food_type: req.body.food_type,
    name: req.body.name,
    side: req.body.side,
    dessert: req.body.dessert
  };
  const response = await mongodb.getDatabase().db().collection('menu').insertOne(menu);
  try {
    response.acknowledged;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the menu.');
  }
};

const updateMenu = async (req, res) => {
  //#swagger.tags=['menu']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a menu.');
  }
  const menuId = new ObjectId(req.params.id);
  const menu = {
    food_type: req.body.food_type,
    name: req.body.name,
    side: req.body.side,
    dessert: req.body.dessert
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('menu')
    .replaceOne({ _id: menuId }, menu);
  try {
    response.modifiedCount;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the menu.');
  }
};

const deleteMenu = async (req, res) => {
  //#swagger.tags=['menu']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a menu.');
  }
  const menuId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('menu')
    .deleteOne({ _id: menuId });
  try {
    response.deleteCount > 0;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while deleting the menu.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createMenu,
  updateMenu,
  deleteMenu
};
