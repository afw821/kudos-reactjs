
//Requiring our dependencies
const express = require('express');
const mongoose = require('mongoose');

//setting up our local host port on 3018 and starting server and assigning it a constant (app)

const PORT = process.env.PORT || 3001;
const app = express();

//Our express.js middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public')); // serves our public files

//
if(process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI);
}else{


mongoose.connect('mongodb://localhost/reactsiteDB', { useNewUrlParser: true}); //name of database kudositeDB
}
//require api-routes 
require('./routes/api-routes')(app);

//set up server to listen for port 3000 and console log the port it's listening to
app.listen(PORT, function(){
    console.log(`application running on port ${PORT}`);
});