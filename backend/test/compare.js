/* eslint-env mocha */
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

const Libre = require('../models/libre')
const Proprietary = require('../models/proprietary')

chai.config.includeStack = true

const { assert } = chai
const { expect } = chai
const should = chai.should()
chai.use(chaiHttp)

const SAMPLE_LIBRE_ID = 'aaaaaaaaaaaa'
const SAMPLE_PROPRIETARY_ID = 'bbbbbbbbbbbb'

describe('Compare API endpoints', function () {
  const proprietarySoftware = new Proprietary({
    name: 'ProprietarySample',
    category: 'Word processor',
    _id: SAMPLE_PROPRIETARY_ID
  })
  const libreSoftware = new Libre({
    name: 'LibreSample',
    category: 'Word processor',
    repo: 'https://gitlab.com/libresample',
    website: 'https://sample.tk',
    description: 'This is a sample word processor.',
    license: 'GPL-3.0',
    _id: SAMPLE_LIBRE_ID
  })

  beforeEach(function (done) {
    proprietarySoftware
      .save()
    libreSoftware
      .save()
      .then(function () { done() })
  })

  afterEach(function (done) {
    Proprietary
      .deleteMany({ name: ['ProprietarySample', 'ProprietaryMailSample'] })
    Libre
      .deleteMany({ name: ['LibreSample', 'LibreMailSample'] })
      .then(function () { done() })
  })

  it('should get all libre software by category of the proprietary name', function (done) {
    chai.request(app)
      .get('/name/ProprietarySample')
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should get all libre software by category', function (done) {
    chai.request(app)
      .get('/category/Word%20processor')
      .end(function (err, res) {
        if (err) { done(err) }
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body.name).to.equal('ProprietarySample')
        expect(res.body.category).to.equal('Word processor')
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
