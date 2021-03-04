/* eslint-env mocha */
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

const User = require('../models/user')

chai.config.includeStack = true

const { assert } = chai
const { expect } = chai
const should = chai.should()
chai.use(chaiHttp)

describe('Auth API Endpoints', function () {
  beforeEach(function (done) {
    const sampleUser = new User({
      username: 'myuser',
      password: 'mypassword'
    })
    sampleUser
      .save()
      .then(function () { done() })
  })

  afterEach(function (done) {
    User
      .deleteMany({ username: ['myuser', 'anotheruser', 'testone'] })
      .then(function () { done() })
  })

  it('should not be able to sign in if they have not registered', function (done) {
    chai.request(app)
      .post('/sign-in')
      .set('content-type', 'application/json')
      .send({ username: 'anotheruser', password: 'password' })
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res).to.have.status(401)
        done()
      })
  })

  it('should be able to sign up', function (done) {
    chai.request(app)
      .post('/sign-up')
      .set('content-type', 'application/json')
      .send({ username: 'anotheruser', password: 'password' })
      .end(function (err, res) {
        console.log('\n\nHERE\n\n')
        if (err) { done(err) }
        console.log('\n\nAFTER ERROR\n\n')
        expect(res).to.have.status(200)
        expect(res.body.token).to.be.a('string')
        done()
      })
  })

  it('should be able to sign in', function (done) {
    chai.request(app)
      .post('/sign-in')
      .set('content-type', 'application/json')
      .send({ username: 'myuser', password: 'mypassword' })
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res).to.have.status(200)
        expect(res.body.token).to.be.a('string')
        done()
      })
  })

  after(function (done) {
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
    done()
  })
})
