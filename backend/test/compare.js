require('dotenv').config();
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

const { assert } = chai;

const Libre = require('../models/libre.js');
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

const SAMPLE_LIBRE_ID = 'aaaaaaaaaaaa';
const SAMPLE_PROPRIETARY_ID = 'bbbbbbbbbbbb';

describe('Compare API endpoints', () => {
  beforeEach((done) => {
    const proprietarySoftware = new Proprietary({
      name: 'ProprietarySample',
      category: 'Word processor',
      _id: SAMPLE_PROPRIETARY_ID,
    });
    const libreSoftware = new Libre({
      name: 'LibreSample',
      category: 'Word processor',
      repo: 'https://gitlab.com/libresample',
      website: 'https://sample.tk',
      description: 'This is a sample word processor.',
      license: 'GPL-3.0',
      _id: SAMPLE_LIBRE_ID,
    });
    proprietarySoftware.save().then(() => {
      libreSoftware.save();
    }).then(
      done(),
    );
  });

  afterEach((done) => {
    Proprietary.deleteMany(
      { name: ['ProprietarySample', 'ProprietaryMailSample'] },
    ).then(() => {
      Libre.deleteMany(
        { name: ['LibreSample', 'LibreMailSample'] },
      );
    }).then(() => {
      done();
    });
  });

  it('should get software by name', (done) => {
    chai.request(
      app,
    ).post(
      '/',
    ).send(
      {
        softwareName: 'ProprietarySample',
      },
    ).end((err, res) => {
      if (err) { done(err); }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      done();
    });
  });

  // it('should get one software by category', (done) => {
  //   chai.request(
  //     app,
  //   ).get(
  //     `/${SAMPLE_OBJECT_ID}`,
  //   ).end((err, res) => {
  //     if (err) { done(err); }
  //     expect(res).to.have.status(200);
  //     expect(res.body).to.be.an('object');
  //     expect(res.body.name).to.equal('ProprietarySample');
  //     expect(res.body.category).to.equal('Word processor');
  //     done();
  //   });
  // });
});
