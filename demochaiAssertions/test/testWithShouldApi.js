var animal = require('../animal');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

describe("Class Animal",()=>{
    it("my dog should return Nana",()=>{
        myDog = new animal("Nana",12);
        myDog.nameOfAnimal.should.be.a('string');
        myDog.nameOfAnimal.should.equal("Nana");
    });
    it("my dog age should return 12",()=>{
        myDog = new animal("Nana",12);
        myDog.ageOfAnimal.should.be.a('number');
        myDog.ageOfAnimal.should.equal(12);
    });
});

