/* eslint-env mocha */
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

const Proprietary = require('../models/proprietary')
const User = require('../models/user')

chai.config.includeStack = true

const { assert } = chai
const { expect } = chai
const should = chai.should()
chai.use(chaiHttp)

const SAMPLE_OBJECT_ID = 'aaaaaaaaaaaa'
let TOKEN = ''

describe('Proprietary API endpoints', function () {
  const user = {
    username: 'sampleUser',
    password: 'password'
  }
  const proprietarySoftware = new Proprietary({
    name: 'ProprietarySample',
    category: 'Word processor',
    _id: SAMPLE_OBJECT_ID
  })

  beforeEach(function (done) {
    proprietarySoftware
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
    Proprietary
      .deleteMany({ name: ['ProprietarySample', 'ProprietaryMailSample'] })
    User
      .deleteMany({ username: 'sampleUser' })
      .then(function () { done() })
  })

  it('should get all software', function (done) {
    chai.request(app)
      .get('/proprietary')
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should get one software by id', function (done) {
    chai.request(app)
      .get(`/proprietary/${SAMPLE_OBJECT_ID}`)
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body.name).to.equal('ProprietarySample')
        expect(res.body.category).to.equal('Word processor')
        done()
      })
  })

  it('should post a new software', function (done) {
    chai.request(app)
      .post('/proprietary')
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('content-type', 'application/json')
      .send({
        name: 'ProprietaryMailSample',
        category: 'Email client'
      })
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('name', 'ProprietaryMailSample')

        Proprietary
          .findOne({ name: 'ProprietaryMailSample' })
          .then(function (software) {
            expect(software).to.be.an('object')
            done()
          })
      })
  })

  it('should update a software', function (done) {
    chai.request(app)
      .patch(`/proprietary/${SAMPLE_OBJECT_ID}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('content-type', 'application/json')
      .send({ name: 'ProprietaryWordSample' })
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('name', 'ProprietaryWordSample')

        Proprietary
          .findOne({ name: 'ProprietaryWordSample' })
          .then(function (software) {
            expect(software).to.be.an('object')
            done()
          })
      })
  })

  it('should delete a software', function (done) {
    chai.request(app)
      .delete(`/proprietary/${SAMPLE_OBJECT_ID}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('content-type', 'application/json')
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res.body.message).to.equal('Successfully deleted.')
        expect(res.body._id).to.equal(SAMPLE_OBJECT_ID)

        Proprietary
          .findOne({ name: 'ProprietarySample' })
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
