require('dotenv').config();

const mongoose = require('mongoose');

//process.env.DB_LOCAL

mongoose.connect(process.env.DB).then(()=>{

    console.log('Database connect successfully.');

}).catch((error)=>{

    console.log(error);

})