const express = require('express')
const path = require('path')
const port = 5000;
const dotenv = require('dotenv')

// --------load config file------------
const configFilePath = path.join(__dirname, "./config/config.env")
dotenv.config({ path: configFilePath })

const connectDB = require('./config/connection');
connectDB()

const app = express()

app.use(express.json())
// ------------Route-----------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))


// -------------Server running-----------------
app.listen(port, () => {
    console.log("server is up and running")
})