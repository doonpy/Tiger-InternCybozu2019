const chai = require('chai');
const app = require('../app');
const assert = chai.assert;

describe('Test first function : check password before hashing ',()=>{

    var password = 'Sbsdd3a_daddsa';
   
    it('1 : hashPassword() should return true if minlength >= 8', ()=>{
    
        let result = app.hashPassword(password);
        assert.isTrue(password.length >= 8);

    });

    it('2 : hashPassword() should return false if maxlength < 30', ()=>{
    
        let result = app.hashPassword(password);
        assert.isFalse(password.length > 30 );

    });

    it('3 : hashPassword() should return false if do not contain uppercase at first ', ()=>{
    
        let result = app.hashPassword(password);
        var myRe = /^[A-Z]/;
        let index = password.search(myRe);
        assert.isTrue(index != -1);
    });

    it('4 : hashPassword() should return false if contain space character', ()=>{
    
        let result = app.hashPassword(password);
        var myRe = /[\s]/;
        let index = password.search(myRe);
        assert.isTrue(index == -1);
    });

    it('5 : hashPassword() should return false if do not contain at least one number character', ()=>{
    
        let result = app.hashPassword(password);
        var myRe = /[0-9]/;
        let index = password.search(myRe);
        assert.isTrue(index != -1);
    });

    it('6 : hashPassword() should return false if do not contain at least one special character', ()=>{
    
        let result = app.hashPassword(password);
        let partern = RegExp(/\W|(_)/,'g');
        assert.isTrue(partern.test(password));
    });


});