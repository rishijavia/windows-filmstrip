const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const app = express()
const path = require('path')
const {Templates} = require('./models/template')

// Creates a new instance of templates class
var templates = new Templates()

// Serve static files like images from the assets folder
app.use(express.static(path.join(__dirname, 'assets')))
app.use(bodyParser.json())
app.use(cors())

// Get '/' route to get all the template data
app.get('/', (req, res) => {
  templates.getTemplates((err, data) => {
    if (err){
      console.log(err)
      res.status(404).end()
    }
    else{
      res.json(data)
      res.status(200).end()
    }
  })
})

app.listen(process.env.PORT || 8081)
