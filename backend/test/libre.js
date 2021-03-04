/* eslint-env mocha */
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

const Libre = require('../models/libre')
const User = require('../models/user')

chai.config.includeStack = true

const { assert } = chai
const { expect } = chai
const should = chai.should()
chai.use(chaiHttp)

const SAMPLE_OBJECT_ID = 'aaaaaaaaaaaa'
let TOKEN = ''

describe('Libre API endpoints', function () {
  const user = {
    username: 'sampleUser',
    password: 'password'
  }
  const libreSoftware = new Libre({
    name: 'LibreSample',
    category: 'Word processor',
    repo: 'https://gitlab.com/libresample',
    website: 'https://sample.tk',
    description: 'This is a sample word processor.',
    license: 'GPL-3.0',
    _id: SAMPLE_OBJECT_ID
  })

  beforeEach(function (done) {
    libreSoftware
      .save()
    chai.request(app)
      .post('/sign-up')
      .set('content-type', 'application/json')
      .send(user)
      .end(function (err, res) {
        if (err) { done(err) }
        user.save()
        TOKEN = res.body.token
        done()
      })
  })

  afterEach(function (done) {
    Libre
      .deleteMany({ name: ['LibreSample', 'LibreMailSample'] })
    User
      .deleteMany({ username: 'sampleUser' })
      .then(function () { done() })
  })

  it('should get all software', function (done) {
    chai.request(app)
      .get('/libre')
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should get one software by id', function (done) {
    chai.request(app)
      .get(`/libre/${SAMPLE_OBJECT_ID}`)
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body.name).to.equal('LibreSample')
        expect(res.body.category).to.equal('Word processor')
        expect(res.body.repo).to.equal('https://gitlab.com/libresample')
        expect(res.body.website).to.equal('https://sample.tk')
        expect(res.body.description).to.equal('This is a sample word processor.')
        expect(res.body.license).to.equal('GPL-3.0')
        done()
      })
  })

  it('should post a new software', function (done) {
    chai.request(app)
      .post('/libre')
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('content-type', 'application/json')
      .send({
        name: 'LibreMailSample',
        category: 'Email client',
        repo: 'https://gitlab.com/libremailsample',
        website: 'https://mailsample.tk',
        description: 'This is a sample email client.',
        license: 'GPL-3.0'
      })
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('name', 'LibreMailSample')

        Libre
          .findOne({ name: 'LibreMailSample' })
          .then(function (software) {
            expect(software).to.be.an('object')
            done()
          })
      })
  })

  it('should update a software', function (done) {
    chai.request(app)
      .patch(`/libre/${SAMPLE_OBJECT_ID}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('content-type', 'application/json')
      .send({ name: 'LibreWordSample' })
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('name', 'LibreWordSample')

        Libre
          .findOne({ name: 'LibreWordSample' })
          .then(function (software) {
            expect(software).to.be.an('object')
            done()
          })
      })
  })

  it('should delete a software', function (done) {
    chai.request(app)
      .delete(`/libre/${SAMPLE_OBJECT_ID}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('content-type', 'application/json')
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res.body.message).to.equal('Successfully deleted.')
        expect(res.body._id).to.equal(SAMPLE_OBJECT_ID)

        Libre
          .findOne({ name: 'LibreSample' })
          .then(function (software) {
            expect(software).to.equal(null)
            done()
          })
      })
  })

  after(function (done) {
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
    done()
  })
})
