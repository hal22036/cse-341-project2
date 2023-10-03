const validator = require('../helpers/validate');


const saveStudent = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|string',
        birthday: 'required|string',
        student_id: 'required|string',
        gpa: 'required|string'        
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

const saveTeacher = (req, res, next) => {
    const validationRule = {
        faculty_id: 'required|string',
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|string',
        subject: 'required|string',
        yearsTeaching: 'required|string'        
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

const saveMenu = (req, res, next) => {
    const validationRule = {
        food_type: 'required|string',
        name: 'required|string',
        side: 'required|string', 
        dessert: 'required|string'     
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

const saveHolidays = (req, res, next) => {
    const validationRule = {
        holiday: 'required|string',
        daysOffStart: 'required|string',
        daysOffEnd: 'required|string'    
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
    saveTeacher,
    saveMenu,
    saveHolidays
};