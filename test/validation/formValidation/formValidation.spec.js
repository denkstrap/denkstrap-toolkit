import { FormValidation } from '../../../src/validation/formValidation/formValidation';
/** @test {FormValidation} */

describe( 'FormValidation', function() {

    beforeEach(function(){
        this.result = fixture.load( '/test/fixtures/form.html' );
    });

    var optionsMinimalValid = {
        formId: 'form'
    };

    /**
     * Check constructor
     */
    it( 'should throw an error when given parameter is not of type object', function() {
        expect(function() {
            new FormValidation( 1 );
        }).toThrowError( TypeError );
    } );

    it( 'should throw an error when parameter formId is not of type string', function() {
        expect(function() {
            new FormValidation( { formId: null } );
        }).toThrowError( TypeError );
    } );

    it( 'should not throw an error with valid minimal options', function() {
        expect(function() {
            new FormValidation( optionsMinimalValid );
        }).not.toThrowError( TypeError );
    } );

    it( 'should throw an error when parameter Behaviour is not a class/prototype', function() {
        expect( function() {
            new FormValidation( {
            formId: 'form',
            Behaviour: {}
        }) }).toThrowError( TypeError );
    } );

    it( 'should not throw an error when parameter Behaviour is a class/prototype', function() {
        var Behaviour = function( formId ) {};
        Behaviour.prototype.behaviour = function() {};
        expect( function() {
            new FormValidation( {
                formId: 'form',
                Behaviour: Behaviour
            }) }).not.toThrowError( TypeError );
    } );

    it( 'should set the config via html markup', function() {
        expect( new FormValidation( optionsMinimalValid ).config ).toEqual( {
            name: {
                "required": { "message": "Required \"name\" not set" }
            }
        } );
    } );

    /**
     * Check further elements
     */


} );
