const connectToMongo = require("./db");
const express = require('express')
const cors = require("cors")

connectToMongo();
const app = express()
const port = 5000
app.use(express.json())
app.use(cors())
//availible routes

app.use('/api/login', require('./router/LoginRoute'))

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})