const { User } = require('../models/user.model');
const chai = require('chai');
const expect = chai.expect;
const app = require('../app');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
var cache = new Array();


describe('api/user', () => {
  //backup database before testing
  before(async () => {
    cache = await User.find({});
  });

  beforeEach(async () => {
    await User.deleteMany({});
  })

  //restore database after all test are completed
  after(async () => {
    await User.insertMany(cache);
  })

  //get method testing
  describe('GET /', () => {
    it('should return all users', async () => {
      const users = [
        { name: 'test', email: 'test@gmail.com', gender: 'male' },
        { name: 'test1', email: 'test1@gmail.com', gender: 'female' }
      ];

      await User.insertMany(users);
      console.log(users);
      const res = await chai.request(app).get('/api/users');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  //GET method testing
  describe('GET /:id', () => {
    it('should return a user if valid id is passed', async () => {
      const user = new User({
        name: 'test',
        email: 'test@gmail.com',
        gender: 'male'
      });
      await user.save();
      const res = await chai.request(app).get('/api/users/' + user._id);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', user.name);
    });

    it('should return 400 error when invalid object id is passed', async () => {
      const res = await chai.request(app).get('/api/users/1');
      expect(res.status).to.equal(400);
    });

    it('should return 404 error when valid object id is passed but does not exist', async () => {
      const res = await chai.request(app).get('/api/users/111111111111');
      expect(res.status).to.equal(404);
    });
  });

  //POST method testing
  describe('POST /', () => {
    it('should return user when the all request body is valid', async () => {
      const res = await chai.request(app)
        .post('/api/users')
        .send({
          name: 'test',
          email: 'test@gmail.com',
          gender: 'male'
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name', 'test');
    });
  })

  //PUT method testing
  describe('PUT /:id', () => {
    it('should update the existing order and return 200', async () => {
      const user = new User({
        name: 'test',
        email: 'test@gmail.com',
        gender: 'male'
      });
      await user.save();

      const res = await chai.request(app)
        .put('/api/users/' + user._id)
        .send({
          name: 'newTest',
          email: 'newemail@gmail.com',
          gender: 'male'
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', 'newTest');
    });
  });

  //DELETE method testing
  describe('DELETE /:id', () => {
    it('should delete requested id and return response 200', async () => {
      const user = new User({
        name: 'test',
        email: 'test@gmail.com',
        gender: 'male'
      });
      await user.save();

      const res = await chai.request(app).delete('/api/users/' + user._id);
      expect(res.status).to.be.equal(200);
    });

    it('should return 404 when deleted user is requested', async () => {
      const user = new User({
        name: 'test',
        email: 'test@gmail.com',
        gender: 'male'
      });
      await user.save();

      let res = await chai.request(app).delete('/api/users/' + user._id);
      expect(res.status).to.be.equal(200);
      setTimeout(async () => {
        res = await request(app).get('/api/users/' + user._id);
        expect(res.status).to.be.equal(404);
      }, 5000);

    });
  });
});