// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Students',()=>{
    describe('GET',()=>{

        //Test to get all student record
        it("should get all students records",(done)=>{
            chai.request(app).get('/').end((err,res)=>{
                res.should.be.a('object');
                done();
            });
        });
        // Test to get single student record
        it("should not get a single student record", (done) => {
            const id = 5;
            chai.request(app)
                .get(`/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
            });
        });
    });
    



})