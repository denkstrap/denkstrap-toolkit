import Behaviour from '../../../src/validation/formValidation/behaviour';
import {FormValidation} from '../../../src/validation/formValidation/formValidation';

/** @test {Behaviour} */

describe( 'behaviour', function() {

    beforeEach( function() {
        this.result = fixture.load( '/test/fixtures/form.html' );
    } );

    var formId = 'form';
    var formValidation
    var initForm = function() {
        formValidation = new FormValidation( { formId: formId } );
        formValidation.init();
    }


    describe( 'constructor( formId, validationAttr, condition, configFields, validation )', function() {

        it( 'should throw an error when parameter formId is not of type String', function() {
            initForm();
            expect( function() {
                    new Behaviour(
                        1,
                        formValidation.options.validationAttr,
                        formValidation.options.condition,
                        formValidation.configFields,
                        formValidation.validation
                    );
                }
            ).toThrowError( TypeError );
        } );

        it( 'should throw an error when parameter validationAttr is not of type String', function() {
            initForm();
            expect( function() {
                    new Behaviour(
                        formId,
                        1,
                        formValidation.options.condition,
                        formValidation.configFields,
                        formValidation.validation
                    );
                }
            ).toThrowError( TypeError );
        } );

        it( 'should throw an error when parameter condition is not of type Function', function() {
            initForm();
            expect( function() {
                    new Behaviour(
                        formId,
                        formValidation.options.validationAttr,
                        1,
                        formValidation.configFields,
                        formValidation.validation
                    );
                }
            ).toThrowError( TypeError );
        } );

        it( 'should throw an error when parameter configFields is not of type Object', function() {
            initForm();
            expect( function() {
                    new Behaviour(
                        formId,
                        formValidation.options.validationAttr,
                        formValidation.options.condition,
                        1,
                        formValidation.validation
                    );
                }
            ).toThrowError( TypeError );
        } );

        it( 'should throw an error when parameter validation is not of type Object', function() {
            initForm();
            expect( function() {
                    new Behaviour(
                        formId,
                        formValidation.options.validationAttr,
                        formValidation.options.condition,
                        formValidation.configFields,
                        1
                    );
                }
            ).toThrowError( TypeError );
        } );

    } );

    describe( 'behaviour()', function() {

        it( 'should do validation on focus out of field', function( done ) {
            var html = fixture.load( '/test/fixtures/form.html' );

            var field = document.getElementById( 'name' );
            field.focus();

            initForm();

            var spy = sinon.spy( formValidation.validation, 'validate' );

            var checkInterval2Set = false;
            var checkInterval = setInterval( function() {
                if ( document.activeElement === field && !checkInterval2Set ) {
                    checkInterval2Set = true;
                    field.blur();
                    var checkInterval2 = setInterval( function() {
                        if ( document.activeElement !== field ) {
                            sinon.assert.callCount( spy, 1 );
                            done();
                            clearInterval( checkInterval );
                        }
                    }, 10 )
                }
            }, 10 );

        } );

    } );

} );
