const express = require('express')
const path = require('path')
const port = 5000;
const dotenv = require('dotenv')
const cors = require('cors')
// --------load config file------------
const configFilePath = path.join(__dirname, "./config/config.env")
dotenv.config({ path: configFilePath })

const connectDB = require('./config/connection');
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: false }));
// ------------Route-----------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))


// -------------Server running-----------------
app.listen(port, () => {
    console.log("server is up and running")
})