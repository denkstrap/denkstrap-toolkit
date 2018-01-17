import {FeedbackDisplay} from '../../../src/validation/formValidation/feedbackDisplay';
import {Resolver} from '../../../src/validation/formValidation/resolver';
import {FormValidation} from '../../../src/validation/formValidation/formValidation';

/** @test {Resolver} */

describe( 'Resolver', function() {

    beforeEach( function() {
        this.result = fixture.load( '/test/fixtures/form.html' );
    } );


    var formId = 'form';

    describe( 'constructor( configFields, validators, feedbackDisplay )', function() {

        it( 'should throw an error on wrong configFields type', function() {
            expect( function() {
                var formValidation = new FormValidation( { formId: formId } );
                new Resolver(
                    1,
                    formValidation.options.validators,
                    formValidation.feedbackDisplay );
            } ).toThrowError( TypeError );
        } );

        it( 'should throw an error on wrong validators type', function() {
            expect( function() {
                var formValidation = new FormValidation( { formId: formId } );
                new Resolver(
                    formValidation.configFields,
                    1,
                    formValidation.feedbackDisplay );
            } ).toThrowError( TypeError );
        } );

        it( 'should throw an error on wrong feedbackDisplay type', function() {
            expect( function() {
                var formValidation = new FormValidation( { formId: formId } );
                new Resolver(
                    formValidation.configFields,
                    formValidation.options.validators,
                    1 );
            } ).toThrowError( TypeError );
        } );

    } );


    describe( 'getValidationFeedbackData( result, fieldName )', function() {

        var validatorResultData = {
            options: {
                feedbackDisplay: {
                    fieldShowState: false
                }
            }
        };

        it( 'should throw an error on wrong result type', function() {

            var formValidation = new FormValidation( { formId: formId } );
            var getValidationFeedbackDataExpected = FeedbackDisplay.getDefaultFieldOptions();
            getValidationFeedbackDataExpected.messageLocation = [ {
                "minWidth": 0,
                "insertTargetSelector": "[for=\"nameWithFeedbackDisplay\"]"
            } ];
            getValidationFeedbackDataExpected.fieldShowState = false;

            expect( function() {
                var resolver = new Resolver(
                    formValidation.configFields,
                    formValidation.options.validators,
                    formValidation.feedbackDisplay );
                resolver.getValidationFeedbackData( 1, 'nameWithFeedbackDisplay' );
            } ).toThrowError( TypeError );

        } );

        it( 'should throw an error on wrong fieldName type', function() {

            var formValidation = new FormValidation( { formId: formId } );
            var getValidationFeedbackDataExpected = FeedbackDisplay.getDefaultFieldOptions();
            getValidationFeedbackDataExpected.messageLocation = [ {
                "minWidth": 0,
                "insertTargetSelector": "[for=\"nameWithFeedbackDisplay\"]"
            } ];
            getValidationFeedbackDataExpected.fieldShowState = false;

            expect( function() {
                var resolver = new Resolver(
                    formValidation.configFields,
                    formValidation.options.validators,
                    formValidation.feedbackDisplay );
                resolver.getValidationFeedbackData( validatorResultData, 1 );
            } ).toThrowError( TypeError );

        } );


        it( 'should give back a proper merged feedback data object', function() {

            var formValidation = new FormValidation( { formId: formId } );

            var getValidationFeedbackDataExpected = FeedbackDisplay.getDefaultFieldOptions();
            getValidationFeedbackDataExpected.messageLocation = [ {
                "minWidth": 0,
                "insertTargetSelector": "[for=\"nameWithFeedbackDisplay\"]"
            } ];
            getValidationFeedbackDataExpected.fieldShowState = false;

            expect( function() {
                var resolver = new Resolver(
                    formValidation.configFields,
                    formValidation.options.validators,
                    formValidation.feedbackDisplay );
                return resolver.getValidationFeedbackData( validatorResultData, 'nameWithFeedbackDisplay' );
            }() ).toEqual( getValidationFeedbackDataExpected );

        } );


    } );

    describe( 'displayActionSetByValidatorOnly( setByValidatorOnly )', function() {

        it( 'should set/remove status classes and aria attributes by setByValidatorOnly param', function( done ) {

            var setByValidatorOnly = {
                fieldShowStateValidSel: null,
                fieldShowStateInvalidSel: null,
                fieldRemoveStateSel: '#name'
            }

            var formValidation = new FormValidation( { formId: formId } );
            formValidation.init();

            var field = document.getElementById( 'name' );
            var eventName = 'name' + '-validated';
            field.addEventListener( eventName, function( event ) {
                formValidation.resolver.displayActionSetByValidatorOnly( setByValidatorOnly );
                expect( function() {
                    return !document.getElementById( 'name' ).classList.contains( 'validation-error' );
                }() ).toBeTruthy();

                done();

            } );

            formValidation.validateForm();

        } );


    } );


    describe( 'displayActionInvalid( result, fieldDom, validator, configFeedbackDisplay )', function() {

        it( 'should set error caused dom manipulations', function( done ) {

            var validatorResultData = {
                options: {
                    feedbackDisplay: {
                        fieldShowState: false
                    }
                }
            };

            var configServiceValidator = {
                "message": "Required \"name\" not set"
            }

            var formValidation = new FormValidation( { formId: formId } );
            formValidation.init();

            var name = 'name';
            var field = document.getElementById( name );
            var eventName = name + '-validated';
            field.addEventListener( eventName, function( event ) {
                formValidation.resolver.displayActionInvalid(
                    validatorResultData,
                    field,
                    configServiceValidator,
                    formValidation.configFields[ name ].feedbackDisplay );
                expect( function() {
                    return document.getElementById( name ).classList.contains( 'validation-error' );
                }() ).toBeTruthy();

                done();

            } );

            formValidation.validateForm();

        } );


    } );


    describe( 'displayActionValid( fieldDom, configFeedbackDisplay )', function() {

        it( 'should set valid validator result caused dom manipulations', function( done ) {

            var validatorResultData = {
                options: {
                    feedbackDisplay: {
                        fieldShowState: true
                    }
                }
            };

            var configServiceValidator = {
                "message": "Required \"name\" not set"
            }

            var formValidation = new FormValidation( { formId: formId } );
            formValidation.init();

            var name = 'name';
            var field = document.getElementById( name );
            var eventName = name + '-validated';
            field.addEventListener( eventName, function( event ) {
                formValidation.resolver.displayActionValid(
                    field,
                    formValidation.configFields[ name ].feedbackDisplay );
                expect( function() {
                    return document.getElementById( name ).classList.contains( 'validation-success' );
                }() ).toBeTruthy();

                done();

            } );

            formValidation.validateForm();

        } );


    } );


    describe( 'getAddInfoData( fieldName, configFields )', function() {

        it( 'should give additional data to validator', function( done ) {

            var addInfo = {
                groupMembers: [
                    { id: 'name', value: '' },
                    { id: 'nameHidden', value: 'testnameHidden' }
                ]
            }

            var validatorResultData = {
                options: {
                    feedbackDisplay: {
                        fieldShowState: true
                    }
                }
            };

            var configServiceValidator = {
                "message": "Required \"name\" not set"
            }

            var formValidation = new FormValidation( { formId: formId } );
            formValidation.init();

            var name = 'name';
            var field = document.getElementById( name );
            var eventName = name + '-validated';
            field.addEventListener( eventName, function( event ) {

                expect( function() {
                    return formValidation.resolver.getAddInfoData( 'nameWithFeedbackDisplay', formValidation.configFields );
                }() ).toEqual( addInfo );

                done();

            } );

            formValidation.validateForm();

        } );


    } );




} );
