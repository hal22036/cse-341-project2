const {ObjectId} = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['students'] 
    const result = await mongodb.getDatabase().db().collection('students').find()
    result.toArray().then((students, err) => {
        
        if (err) {
            res.status(400).json({ message: err });
        } else {        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
}});
};

const getSingle = async (req, res) => {
    //#swagger.tags=['students']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to find a student.');
    }
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('students').find({_id: studentId});
    result.toArray().then((students, err) => {
        if (err) {
            res.status(400).json({ message: err });
        } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students[0]);
}});
};

const createStudent = async (req, res) => {
    //#swagger.tags=['students']
    const student = {
        student_id: req.body.student_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        gpa: req.body.gpa
    };
    const response = await mongodb.getDatabase().db().collection('students').insertOne(student);
    if (response.acknowledged) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occured while updating the student.');
    }
};

const updateStudent = async (req, res) => {
    //#swagger.tags=['students']
    console.log('update student');
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a student.');
    }
    const studentId = new ObjectId(req.params.id);
    const student = {
        student_id: req.body.student_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        gpa: req.body.gpa
    };
    const response = await mongodb.getDatabase().db().collection('students').replaceOne({ _id: studentId }, student);
    console.log(response);
    if (response.modifiedCount) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occured while updating the student.');
    }
};

const deleteStudent = async (req, res) => {
    //#swagger.tags=['students']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a student.');
    }
    const studentId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('students').deleteOne({ _id: studentId });
    console.log(response);
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occured while deleting the student.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent
};