const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Students and Teacheres Api',
        description: 'Students and Teachers Api'
    },
    host: 'cse-341-project2-tcla.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
