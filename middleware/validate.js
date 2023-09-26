const validator = require('../helpers/validate');

const saveStudent = (req, res, next) => {
    const validationRule = {
        student_id: 'required|number',
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|string',
        birthday: 'required|string',
        gpa: 'required|number'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err  
            });
        } else {
            next();
        }
    });

const saveTeacher = (req, res, next) => {
    const validationRule = {
        faculty_id: 'required|number',
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|string',
        subject: 'required|string',
        yearsTeaching: 'required|number'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err  
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveStudent,
    saveTeacher
}};