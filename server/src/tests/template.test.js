const expect = require('expect')
const {Templates} = require('../models/template')

// Tests for template class
describe('Template', () => {

  var templates;

  // Create mock data
  beforeEach(() => {
    templates = new Templates()
    templates.templates = [
      {
        "title": "Gibberish item - 1",
        "cost": "65.00",
        "id": "1",
        "description": "Lorem ipsum dolor sit amet, dictum et quisque aliquet malesuada at, rutrum ac nullam, elit massa facilisis",
        "thumbnail": "1-m.jpg",
        "image": "1-b.jpg"
      },
      {
        "title": "Blah blah - 2",
        "cost": "55.00",
        "id": "2",
        "description": "Laoreet eu amet soluta error a nulla, sed maecenas est risus augue turpis varius, torquent fermentum diam in augue.",
        "thumbnail": "2-m.jpg",
        "image": "2-b.jpg"
      },
    ]
  })

  // Test the get all templates function
  it('should return all the templates', () => {
    templates.getTemplates((err, res) => {
      expect(res).toEqual(templates.templates)
      expect(res.length).toEqual(2)
    })
  })

})
