//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let assert = chai.assert;
let expect = chai.expect;

chai.use(chaiHttp);
//Our parent block


describe('Validate', () => {
  describe('#username', () => {
    it('should have minimum length is 8 characters', (done) => {
      chai.request(server)
        .get('/tdddemo?username=poonneban')
        .end((err, req, res) => {
          var q = req.body;
          expect(q).to.have.property('username').to.be.a('string').to.have.length.within(8, 100);
          done();
        });
    });
  });
});
