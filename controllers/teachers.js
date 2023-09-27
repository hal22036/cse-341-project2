const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['teachers']
  const result = await mongodb.getDatabase().db().collection('teachers').find();
  result.toArray().then((teachers, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(teachers);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['teachers']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid teacher id to find a teacher.');
  }
  const teacherId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('teachers').find({ _id: teacherId });
  result.toArray().then((teachers, err) => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(teachers[0]);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
};

const createTeacher = async (req, res) => {
  //#swagger.tags=['teachers']
  const teacher = {
    faculty_id: req.body.faculty_id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    yearsTeaching: req.body.yearsTeaching
  };
  const response = await mongodb.getDatabase().db().collection('teachers').insertOne(teacher);
  try {
    response.acknowledged;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the teacher.');
  }
};

const updateTeacher = async (req, res) => {
  //#swagger.tags=['teachers']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a teacher.');
  }
  const teacherId = new ObjectId(req.params.id);
  const teacher = {
    faculty_id: req.body.faculty_id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    yearsTeaching: req.body.yearsTeaching
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('teachers')
    .replaceOne({ _id: teacherId }, teacher);
  try {
    response.modifiedCount;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while updating the teacher.');
  }
};

const deleteTeacher = async (req, res) => {
  //#swagger.tags=['teachers']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a teacher.');
  }
  const teacherId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('teachers')
    .deleteOne({ _id: teacherId });
  try {
    response.deleteCount > 0;
    res.status(204).send();
  } catch {
    res.status(500).json(response.error || 'Some error occured while deleting the teacher.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createTeacher,
  updateTeacher,
  deleteTeacher
};
