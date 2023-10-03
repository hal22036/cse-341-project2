const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['holidays']
  const result = await mongodb.getDatabase().db().collection('holidays').find();
  result.toArray().then((holidays, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(holidays);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['holidays']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid holiday id to find a holiday.');
  }
  const holidayId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('holidays').find({ _id: holidayId });
  result.toArray().then((holidays, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(holidays[0]);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const createHoliday = async (req, res) => {
  //#swagger.tags=['holidays']
  const holiday = {
    holiday: req.body.holiday,
    daysOffStart: req.body.daysOffStart,
    daysOffEnd: req.body.daysOffEnd
  };
  const response = await mongodb.getDatabase().db().collection('holidays').insertOne(holiday);
  try {
    response.acknowledged;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the holiday.');
  }
};

const updateHoliday = async (req, res) => {
  //#swagger.tags=['holidays']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a holiday.');
  }
  const holidayId = new ObjectId(req.params.id);
  const holiday = {
    holiday: req.body.holiday,
    daysOffStart: req.body.daysOffStart,
    daysOffEnd: req.body.daysOffEnd
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('holidays')
    .replaceOne({ _id: holidayId }, holiday);
  try {
    response.modifiedCount;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the holiday.');
  }
};

const deleteHoliday = async (req, res) => {
  //#swagger.tags=['holidays']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a holiday.');
  }
  const holidayId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('holidays')
    .deleteOne({ _id: holidayId });
  try {
    response.deleteCount > 0;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while deleting the holiday.');
  }
};

module.exports = {
  getAll,
  getSingle,
  updateHoliday,
  createHoliday,
  deleteHoliday
};
