//server.js
const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5001
const {mongoose} = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())

//middleware
app.use(cors())

//connecting to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));



const voteRoutes = require('./voteRoutes')
app.use('/api/votes', voteRoutes)


//starting the backend server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))