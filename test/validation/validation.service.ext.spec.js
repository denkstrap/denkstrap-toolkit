import { ValidationService } from '../../src/validation/validation.service.ext';

describe( 'Validation Service Ext', function() {

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
        'TMLInputElemen, HTMLSelectElement or  HTMLTextAreaElement', function() {
        var validationResolver = { getValidator: function() {} };
        var validationService = new ValidationServiceExt( {}, validationResolver, cacheMock );
        expect(function() {
            validationService.setValueByField( 'string' )
        }).toThrowError( TypeError );
    } );

    it( 'should set the correct value to validator config', function() {
        var validationResolver = { getValidator: function() {} };
        var validationService = new ValidationServiceExt( {}, validationResolver, cacheMock );
        var el = document.getElementById( 'name' );
        validationService.setValueByField( el );
        var config = validationService.getValues();
        expect( config ).toEqual( {
            name: 'testname'
        } );

    } );

} );
