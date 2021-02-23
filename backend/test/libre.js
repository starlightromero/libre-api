require('dotenv').config();
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

const { assert } = chai;

const Libre = require('../models/libre.js');

chai.config.includeStack = true;

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

const SAMPLE_OBJECT_ID = 'aaaaaaaaaaaa';

describe('Libre API endpoints', () => {
  beforeEach((done) => {
    const libreSoftware = new Libre({
      name: 'LibreSample',
      category: 'Word processor',
      repo: 'https://gitlab.com/libresample',
      website: 'https://sample.tk',
      description: 'This is a sample word processor.',
      license: 'GPL-3.0',
      _id: SAMPLE_OBJECT_ID,
    });
    console.log(libreSoftware);
    libreSoftware.save().then(() => {
      done();
    });
  });

  afterEach((done) => {
    Libre.deleteMany(
      { name: ['LibreSample', 'LibreMailSample'] },
    ).then(() => {
      done();
    });
  });

  it('should get all software', (done) => {
    chai.request(
      app,
    ).get(
      '/libre',
    ).end((err, res) => {
      if (err) { done(err); }
      expect(res).to.have.status(200);
      expect(res.body.software).to.be.an('array');
      done();
    });
  });

  it('should get one specific software', (done) => {
    chai.request(
      app,
    ).get(
      `/libre/${SAMPLE_OBJECT_ID}`,
    ).end((err, res) => {
      if (err) { done(err); }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message.name).to.equal('LibreSample');
      expect(res.body.message.category).to.equal('Word processor');
      expect(res.body.message.repo).to.equal('https://gitlab.com/libresample');
      expect(res.body.message.website).to.equal('https://sample.tk');
      expect(res.body.message.description).to.equal('This is a sample word processor.');
      expect(res.body.message.license).to.equal('GPL-3.0');
      done();
    });
  });

  it('should post a new software', (done) => {
    chai.request(
      app,
    ).post(
      '/libre',
    ).send(
      {
        name: 'LibreMailSample',
        category: 'Email client',
        repo: 'https://gitlab.com/libremailsample',
        website: 'https://mailsample.tk',
        description: 'This is a sample email client.',
        license: 'GPL-3.0',
      },
    ).end((err, res) => {
      if (err) { done(err); }
      expect(res.body.software).to.be.an('object');
      expect(res.body.software).to.have.property('name', 'LibreMailSample');

      Libre.findOne({ name: 'LibreMailSample' }).then((software) => {
        expect(software).to.be.an('object');
        done();
      });
    });
  });

  it('should update a software', (done) => {
    chai.request(
      app,
    ).put(
      `/libre/${SAMPLE_OBJECT_ID}`,
    ).send(
      { name: 'LibreWordSample' },
    ).end((err, res) => {
      if (err) { done(err); }
      expect(res.body.software).to.be.an('object');
      expect(res.body.software).to.have.property('name', 'LibreWordSample');

      Libre.findOne({ name: 'LibreWordSample' }).then((software) => {
        expect(software).to.be.an('object');
        done();
      });
    });
  });

  it('should delete a software', (done) => {
    chai.request(
      app,
    ).delete(
      `/libre/${SAMPLE_OBJECT_ID}`,
    ).end((err, res) => {
      if (err) { done(err); }
      expect(res.body.message).to.equal('Successfully deleted.');
      expect(res.body._id).to.equal(SAMPLE_OBJECT_ID);

      Libre.findOne({ name: 'LibreSample' }).then((software) => {
        expect(software).to.equal(null);
        done();
      });
    });
  });
});
