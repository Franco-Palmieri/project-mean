const express = require('express')
const conectDB = require('./config/db.js')
const cors = require('cors')
const app = express();

//conect to db

conectDB();
app.use(cors())

app.use(express.json())

//Routes
app.use('/api/products', require('./routes/product'))





app.listen(3000)