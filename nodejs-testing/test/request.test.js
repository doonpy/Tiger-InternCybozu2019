const { User } = require('../models/user.model');
const chai = require('chai');
const expect = chai.expect;
const app = require('../app');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('api/user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  })

  after(async () => {
    await User.deleteMany({});
  })

  //GET / method testing
  describe('GET /', () => {
    it('should return all users', async () => {
      const users = [
        { name: 'test', email: 'test@gmail.com', gender: 'male' },
        { name: 'test1', email: 'test1@gmail.com', gender: 'female' }
      ];

      await User.insertMany(users);

      await chai.request(app)
        .get('/api/users')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(2);
        })
        .catch(err => {
          expect(err).to.be.null;
        });
    });
  });

  //GET /:id method testing
  describe('GET /:id', () => {
    it('should return a user if valid id is passed', async () => {
      const user = new User({
        name: 'test',
        email: 'test@gmail.com',
        gender: 'male'
      });
      await user.save();

      await chai.request(app)
        .get('/api/users/' + user._id)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('name', user.name);
        })
        .catch(err => {
          expect(err).to.be.null;
        });
    });

    it('should return 400 error when invalid object id is passed', async () => {
      await chai.request(app)
        .get('/api/users/1')
        .then(res => {
          expect(res.status).to.equal(400);
        })
        .catch(err => {
          expect(err).to.be.null;
        });

    });

    it('should return 404 error when valid object id is passed but does not exist', async () => {
      await chai.request(app)
        .get('/api/users/111111111111')
        .then(res => {
          expect(res.status).to.equal(404);
        })
        .catch(err => {
          expect(err).to.be.null;
        });
    });
  });

  //POST method testing
  describe('POST /', () => {
    it('should return user when the all request body is valid', () => {
      const user = {
        name: 'test',
        email: 'test@gmail.com',
        gender: 'male'
      }

      chai.request(app)
        .post('/api/users')
        .send(user)
        .then(res => {
          expect(res.status)
            .to.equal(200);
          expect(res.body)
            .to.have.property('_id');
          expect(res.body)
            .to.have.property('email', user.email)
            .to.be.a('string')
            .to.have.include('@')
            .to.have.length.within(5, 255);
          expect(res.body)
            .to.have.property('gender', user.gender)
            .to.be.a('string').to.match(/^male|female/)
            .to.have.length.within(4, 6);
          expect(res.body)
            .to.have.property('name', user.name)
            .to.be.a('string')
            .to.have.length.within(3, 50);
        })
        .catch(err => {
          expect(err).to.be.null;
        });
    });

    it('should return 400 error when valid object email is passed but existed', async () => {
      const user = new User({
        name: 'test',
        email: 'test@gmail.com',
        gender: 'male'
      });
      await user.save();

      await chai.request(app)
        .post('/api/users')
        .send(user)
        .then(res => {
          expect(res.status)
            .to.be.equal(400);
        })
        .catch(err => {
          expect(err).to.be.null;
        });
    });
  });

  //PUT method testing
  describe('PUT /:id', () => {
    it('should update the existing order and return 200', async () => {
      const user = new User({
        name: 'test',
        email: 'test@gmail.com',
        gender: 'male'
      });
      await user.save();

      const newUser = {
        name: 'newTest',
        email: 'newemail@gmail.com',
        gender: 'male'
      };

      await chai.request(app)
        .put('/api/users/' + user._id)
        .send(newUser)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('name', newUser.name);
        })
        .catch(err => {
          expect(err).to.be.null;
        });
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

      await chai.request(app)
        .delete('/api/users/' + user._id)
        .then(res => {
          expect(res.status)
            .to.be.equal(200);
        })
        .catch(err => {
          expect(err).to.be.null;
        });

    });

    it('should return 404 when deleted user is requested', async () => {
      const user = new User({
        name: 'test',
        email: 'test@gmail.com',
        gender: 'male'
      });
      await user.save();

      await chai.request(app)
        .delete('/api/users/' + user._id)
        .then(res => {
          expect(res.status)
            .to.be.equal(200);
        })
        .catch(err => {
          expect(err).to.be.null;
        });

      await chai.request(app)
        .get('/api/users/' + user._id)
        .then(res => {
          expect(res.status)
            .to.be.equal(404);
        })
        .catch(err => {
          expect(err)
            .to.be.null;
        });
    });

    it('should return 400 error when valid object id is passed but does not exist', async () => {
      const user = new User({
        name: 'test',
        email: 'test@gmail.com',
        gender: 'male'
      });
      await user.save();

      await chai.request(app)
        .delete('/api/users/aa')
        .then(res => {
          expect(err)
            .to.be.null;
          expect(res.status)
            .to.be.equal(400);
        })
        .catch(err => {
          expect(err)
            .to.be.null;
        });
    });
  });
});