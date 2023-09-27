const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Students and Teacheres Api',
        description: 'Students and Teachers Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
