import { ValidationServiceDom } from '../../src/validation/validation.service.dom';
/** @test {ValidationServiceDom} */

describe( 'Validation Service Dom', function() {

    // https://www.npmjs.com/package/karma-fixture
    // not working
    // before(function(){
    //     fixture.setBase( 'test/fixtures' );
    // });

    beforeEach(function(){
        this.result = fixture.load( '/test/fixtures/form.html' );
    });

    var cacheMock = {
        getValue: function() {
            return false;
        },
        setValue: function() {}
    };

    it( 'should throw an error when given parameter is not instance of ' +
        'HTMLInputElemen, HTMLSelectElement or  HTMLTextAreaElement', function() {
        var validationResolver = { getValidator: function() {} };
        var validationService = new ValidationServiceDom( {}, validationResolver, cacheMock );
        expect(function() {
            validationService.setValueByField( 'string' )
        }).toThrowError( TypeError );
    } );

    it( 'should set the correct value to validator config', function() {
        var el = document.getElementById( 'name' );
        el.value = 'testname';
        var validationResolver = { getValidator: function() {} };
        var validationService = new ValidationServiceDom( {}, validationResolver, cacheMock );
        var config = validationService.getValues();
        validationService.setValueByField( el );
        expect( config ).toEqual( {
            name: 'testname'
        } );
    } );

    it( 'should set the correct value to validator config by using a checkbox field', function() {
        var el = document.getElementById( 'checkbox' );
        var validationResolver = { getValidator: function() {} };
        var validationService = new ValidationServiceDom( {}, validationResolver, cacheMock );
        var config = validationService.getValues();
        validationService.setValueByField( el );
        expect( config ).toEqual( {
            checkbox: true
        } );
    } );
    
    
} );
