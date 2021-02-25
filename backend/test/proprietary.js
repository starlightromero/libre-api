require('dotenv').config();
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

const { assert } = chai;

const Proprietary = require('../models/proprietary.js');

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

describe('Proprietary API endpoints', () => {
  beforeEach((done) => {
    const proprietarySoftware = new Proprietary({
      name: 'ProprietarySample',
      category: 'Word processor',
      _id: SAMPLE_OBJECT_ID,
    });
    proprietarySoftware.save().then(
      done(),
    );
  });

  afterEach((done) => {
    Proprietary.deleteMany(
      { name: ['ProprietarySample', 'ProprietaryMailSample'] },
    ).then(() => {
      done();
    });
  });

  it('should get all software', (done) => {
    chai.request(
      app,
    ).get(
      '/proprietary',
    ).end((err, res) => {
      if (err) { done(err); }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      done();
    });
  });

  it('should get one software by id', (done) => {
    chai.request(
      app,
    ).get(
      `/proprietary/${SAMPLE_OBJECT_ID}`,
    ).end((err, res) => {
      if (err) { done(err); }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.equal('ProprietarySample');
      expect(res.body.category).to.equal('Word processor');
      done();
    });
  });

  it('should post a new software', (done) => {
    chai.request(
      app,
    ).post(
      '/proprietary',
    ).send(
      {
        name: 'ProprietaryMailSample',
        category: 'Email client',
      },
    ).end((err, res) => {
      if (err) { done(err); }
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', 'ProprietaryMailSample');

      Proprietary.findOne({ name: 'ProprietaryMailSample' }).then((software) => {
        expect(software).to.be.an('object');
        done();
      });
    });
  });

  it('should update a software', (done) => {
    chai.request(
      app,
    ).patch(
      `/proprietary/${SAMPLE_OBJECT_ID}`,
    ).send(
      { name: 'ProprietaryWordSample' },
    ).end((err, res) => {
      if (err) { done(err); }
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', 'ProprietaryWordSample');

      Proprietary.findOne({ name: 'ProprietaryWordSample' }).then((software) => {
        expect(software).to.be.an('object');
        done();
      });
    });
  });

  it('should delete a software', (done) => {
    chai.request(
      app,
    ).delete(
      `/proprietary/${SAMPLE_OBJECT_ID}`,
    ).end((err, res) => {
      if (err) { done(err); }
      expect(res.body.message).to.equal('Successfully deleted.');
      expect(res.body._id).to.equal(SAMPLE_OBJECT_ID);

      Proprietary.findOne({ name: 'ProprietarySample' }).then((software) => {
        expect(software).to.equal(null);
        done();
      });
    });
  });
});
