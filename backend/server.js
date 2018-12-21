const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require('mongoose');
const passport = require("passport")

const server = express()
const port = 8080
server.use(bodyParser.json())
server.use(cors())

const loadRoutes = require('./routes')(server)

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
const db = mongoose.connection;

require('./config/passport').configPassport(passport)

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    server.listen(port, () => {
        console.log("Server rodando na porta", port)
    })
});
