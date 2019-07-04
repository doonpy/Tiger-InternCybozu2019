var animal = require('../animal');
var chai = require('chai');
var assert = chai.assert;

describe("Class Animal",()=>{
    before(()=>{
        var myDog = new animal("Nana",12);
        console.log(myDog);
    });
    it("my dog should return Nana",()=>{
        myDog = new animal("Nana",12);
        assert.equal(myDog.nameOfAnimal,"Nana");
    });
    it("my dog age should return 12",()=>{
        myDog = new animal("Nana",12);
        assert.equal(myDog.ageOfAnimal,12);
    });
})