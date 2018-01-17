import {FormValidation} from '../../../src/validation/formValidation/formValidation';
/** @test {FormValidation} */

describe( 'FormValidation', function() {

    beforeEach( function() {
        this.result = fixture.load( '/test/fixtures/form.html' );
    } );


    // describe( 'constructor( options )', function() {
    //
    //
    //     var optionsMinimalValid = {
    //         formId: 'form'
    //     };
    //
    //     /**
    //      * Check constructor
    //      *
    //      *
    //      *
    //      */
    //     it( 'should throw an error when given parameter is not of type object', function() {
    //         expect( function() {
    //             new FormValidation( 1 );
    //         } ).toThrowError( TypeError );
    //     } );
    //
    //     it( 'should throw an error when parameter formId is not of type string', function() {
    //         expect( function() {
    //             new FormValidation( { formId: null } );
    //         } ).toThrowError( TypeError );
    //     } );
    //
    //     it( 'should not throw an error with valid minimal options', function() {
    //         expect( function() {
    //             new FormValidation( optionsMinimalValid );
    //         } ).not.toThrowError( TypeError );
    //     } );
    //
    //     /**
    //      *
    //      * html which is used: test/fixtures/form.html
    //      * Check getValidationConfig( fields ) which is called in constructor
    //      */
    //
    //     it( 'should throw an error on invalid data-validation data in html', function() {
    //         expect( function() {
    //             var formValidation = new FormValidation( {
    //                 formId: 'formInvalidDataAttrData'
    //             } );
    //         } ).toThrowError( Error );
    //     } );
    //
    //     it( 'should throw an error on fields which have no validator declared on data-validation attr in html', function() {
    //         expect( function() {
    //             var formValidation = new FormValidation( {
    //                 formId: 'formDataAttrDataWithoutValidators'
    //             } );
    //         } ).toThrowError( Error );
    //     } );
    //
    //     it( 'should create html driven validation data object with 1 field', function() {
    //         var formValidation = new FormValidation( { formId: 'form' } );
    //         expect( Object.keys( formValidation.config ).length ).toBe( 2 );
    //     } );
    //
    //     /**
    //      *
    //      * html which is used: test/fixtures/form.html
    //      * Check getValidationFieldConfig( fields ) which is called in constructor
    //      */
    //     it( 'should throw an error on fields which have no valid mesaageLocation data', function() {
    //         expect( function() {
    //             var formValidation = new FormValidation( {
    //                 formId: 'formInvalidMessageLocationData'
    //             } );
    //         } ).toThrowError( TypeError );
    //     } );
    // } );
    //
    // describe( 'init()', function() {
    //     it( 'should throw an error when parameter Behaviour is not a class/prototype', function() {
    //         expect( function() {
    //             formValidation = new FormValidation( {
    //                 formId: 'form',
    //                 Behaviour: {}
    //             } );
    //             formValidation.init();
    //         } ).toThrowError( Error );
    //     } );
    //
    //     it( 'should not throw an error when parameter Behaviour is a class/prototype', function() {
    //         var Behaviour = function( formId ) {
    //         };
    //         Behaviour.prototype.behaviour = function() {
    //         };
    //         expect( function() {
    //             formValidation = new FormValidation( {
    //                 formId: 'form',
    //                 Behaviour: Behaviour
    //             } );
    //             formValidation.init();
    //         } ).not.toThrowError( TypeError );
    //     } );
    //
    // } );


    describe( 'validateForm()', function() {
        it( 'should validate form and set accessible html output', function( done ) {

            var formValidation = new FormValidation( {
                formId: 'form'
            } );
            formValidation.init();

            formValidation.validateForm().then( function( result ) {
                console.log( '----->validateForm success', result );
            } ).catch( function( result ) {
                console.log( '----->validateForm fail', result );

                var n = document.getElementById( 'form' );

                axe.run(n, function (err, result) {
                    expect(err).toBe(null);
                    expect(result.violations.length).toBe(0);
                    done();
                });

            } );

        } );
    } );


    /**
     * Check further elements
     *
     *
     *
     *
     */


    // it( 'should set the config via html markup', function() {
    //     expect( new FormValidation( optionsMinimalValid ).config ).toEqual( {
    //         name: {
    //             "required": { "message": "Required \"name\" not set" }
    //         }
    //     } );
    // } );


} );