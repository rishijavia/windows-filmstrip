const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const expect = require('expect')
const should = chai.should()

chai.use(chaiHttp)

// Tests for server
describe('Server', () => {

  // Set url for the server
  function chaiRequest(uri, callback) {
    chai.request('http://localhost:8081')
      .get(uri)
      .end(callback)
  }

  // Tests GET '/' route
  describe ('/ GET', () => {

    it ('should return 200 status', (done) => {
      chaiRequest('/', (err, res) => {
        res.should.have.status(200)
        done()
      })
    })

    it ('should not have any errors', (done) => {
      chaiRequest('/', (err, res) => {
        should.not.exist(err)
        done()
      })
    })

    it ('should have body of type array', (done) => {
      chaiRequest('/', (err, res) => {
        res.body.should.be.a('array')
        done()
      })
    })

  })

})
