class Templates{

  // Load the data in instance.templates variable
  constructor (){
    this.templates = this.loadData((err, data) => {
      if(err){
        console.log("Data not loaded: \n " + err)
      }
      else{
        this.templates = data
      }
    })
  }

  // Function to open and parse the data file
  loadData(callback){
    var fs = require('fs')
    var file = __dirname + '/../assets/data/templates.json'
    fs.readFile(file, 'utf8', (err, data) => {
      if (err){
        return callback(err)
      }
      else{
        return callback(undefined, JSON.parse(data))
      }
    })
  }

  // returns all the templates
  getTemplates(callback){
    if (this.templates == undefined){
      return callback("Sorry, data was not found or loaded properly.")
    }
    else{
      return callback(undefined, this.templates)
    }
  }
}

module.exports = {Templates}
