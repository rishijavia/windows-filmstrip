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

  // save update templates on file
  saveTemplates(callback){
    var fs = require('fs')
    var file = __dirname + '/../assets/data/templates.json'
    fs.writeFile(file, JSON.stringify(this.templates), function(err) {
      if(err) {
        return callback(err)
      }
      else{
        return callback(undefined, true)
      }
    })
  }

  // create a new template
  create(title, cost, description, thumbnail, image){
    let template = {
      "title": title,
      "cost": cost,
      //VERY BAD, USE Object.Id (mongoose)
      // "id": this.guid(),
      "id": Math.floor(1000 + Math.random() * 9000),
      "description": description,
      "thumbnail": thumbnail,
      "image": image
    }
    this.templates.push(template)
    this.saveTemplates((err, data) => {
      if (err){
        console.log(err)
        return
      }
    })
    return template
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }


  // update a template
  update(id, body){
    var temp = this.templates.filter((template, index) => {
      if (template.id == id){
        for (var key in template) {
          if (key in body) {
            if (key != "id"){
              template[key] = body[key]
            }
          }
        }
        this.saveTemplates((err, data) => {
          if (err){
            console.log(err)
          }
        })
        return template
      }
    })
    if (temp === undefined){
      return false
    }
    else{
      return temp
    }
  }

  // delete a template
  delete(id){
    var temp = this.templates.filter((template, index) => {
      if (template.id == id){
        this.templates.splice(index, 1)
        this.saveTemplates((err, data) => {
          if (err){
            console.log(err)
          }
        })
        return true
      }
    })
    if (temp === undefined){
      return false
    }
    return true
  }

}

module.exports = {Templates}
