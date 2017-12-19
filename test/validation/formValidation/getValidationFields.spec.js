import getValidationFields from '../../../src/validation/formValidation/getValidationFields';
import condition from '../../../src/validation/formValidation/condition';
/** @test {getValidationFields} */

describe( 'getValidationFields', function() {

    beforeEach( function() {
        this.result = fixture.load( '/test/fixtures/form.html' );
    } );

    var validationAttr = 'data-validation';

    /**
     * getValidationFields( formId, validationAttr, condition)
     */
    it( 'should throw an error when formId is not of type String', function() {
        expect( function() {
                getValidationFields( 1, validationAttr, condition );
            }
        ).toThrowError( TypeError );
    } );

    it( 'should throw an error when validationAttr is not of type String', function() {
        expect( function() {
                getValidationFields( 'form', 1, condition );
            }
        ).toThrowError( TypeError );
    } );

    it( 'should throw an error when condition is not of type Function', function() {
        expect( function() {
                getValidationFields( 'form', validationAttr, 1 );
            }
        ).toThrowError( TypeError );
    } );

    it( 'should throw an error when form is not given', function() {
        var form = document.getElementById( 'formWrongId' );
        expect( function() {
                getValidationFields( 'formWrongId', validationAttr, condition );
            }
        ).toThrowError( TypeError );
    } );

    it( 'should give back an array > 0', function() {
        expect(
            getValidationFields( 'form', validationAttr, condition ).length
        ).toBeGreaterThan( 0 );
    } );

    it( 'should give back an array === 0', function() {
        expect(
            getValidationFields( 'formNoValidatorAttributes', validationAttr, condition ).length
        ).toBe( 0 );
    } );

} );
