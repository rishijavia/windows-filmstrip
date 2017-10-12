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

app.post('/template', (req, res) => {
  let body = req.body
  let template = templates.create(body.title, body.cost,
                                  body.description, body.thumbnail, body.image)
  res.json(template)
  res.status(200).end()
})

app.patch('/template/:id', (req, res) => {
  var id = req.params.id
  var body = req.body
  var template = templates.update(id, body)
  if (template){
    res.json(template)
    res.status(200).end()
  }
  else{
    res.status(400).end()
  }
})

app.delete('/template/:id', (req, res) => {
  var id = req.params.id
  if(templates.delete(id)){
    res.status(200).end()
  }
  else{
    res.status(400).end()
  }
})

app.listen(process.env.PORT || 8081)
