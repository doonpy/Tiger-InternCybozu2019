var animal = require('../animal');
var chai = require('chai');
var expect = chai.expect;

describe("Class Animal",()=>{
    before(()=>{
        var myDog = new animal("Nana",12);
        console.log(myDog);
    });
    it("my dog should return Nana",()=>{
        myDog = new animal("Nana",12);
        expect(myDog.nameOfAnimal).to.be.a('string');
        expect(myDog.nameOfAnimal).equal("Nana");
    });
    it("my dog age should return 12",()=>{
        myDog = new animal("Nana",12);
        expect(myDog.ageOfAnimal).to.be.a('number');
        expect(myDog.ageOfAnimal).equal(12);
    });
    
})