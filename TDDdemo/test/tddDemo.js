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

//TDD demo
describe('User Infomation', () => {
  //POST user info testing
  describe('/POST user', () => {
    it('expect username or password have minimum length is 8 characters', (done) => {
      //Create example user infomation
      let user = {
        username: 'poonnguyen',
        password: 'poondeptrai'
      }
      //Testing with POST testing
      chai.request(server)
        .post('/tdddemo')
        .send(user)
        .type('application/json')
        .end((err, res) => {
          if (err) return done(err);
          let user = res.body;
          // expect(req.body).to.have.property('username').to.be.a('string').to.have.length.within(8, 100);
          // expect(req.body).to.have.property('password').to.be.a('string').to.have.length.within(8, 100);
          assert.isTrue(user.username.length >= 8);
          done();
        });
    });


    it('compare username to password', (done) => {
      //Create example user infomation
      let user = {
        username: 'usernamedemo',
        password: 'usernamev   DEMOkkkk'
      }
      //Testing with POST testing
      chai.request(server)
        .post('/tdddemo')
        .send(user)
        .type('application/json')
        .end((err, res) => {
          if (err) return done(err);
          let user = res.body;
          assert.notEqual(user.username,'34','these username are not equal');
          assert.Equal(user.username,'3','these username are not equal');
          done();
        });
    });
  });

  
});