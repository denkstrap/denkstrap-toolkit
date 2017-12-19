import {FeedbackDisplay} from '../../../src/validation/formValidation/feedbackDisplay';
/** @test {FeedbackDisplay} */

describe( 'FeedbackDisplay', function() {

    beforeEach( function() {
        this.result = fixture.load( '/test/fixtures/form.html' );
    } );

    describe( 'constructor', function() {

        it( 'should throw an error when option fieldErrorClass is not of type String', function() {
            expect( function() {
                    var feedbackDisplay = new FeedbackDisplay( {
                        fieldErrorClass: 1
                    } );
                }
            ).toThrowError( TypeError );
        } );

        it( 'should throw an error when option fieldSuccessClass is not of type String', function() {
            expect( function() {
                    var feedbackDisplay = new FeedbackDisplay( {
                        fieldSuccessClass: 1
                    } );
                }
            ).toThrowError( TypeError );
        } );

        it( 'should throw an error when option messageTemplate is not of type String', function() {
            expect( function() {
                    var feedbackDisplay = new FeedbackDisplay( {
                        messageTemplate: 1
                    } );
                }
            ).toThrowError( TypeError );
        } );

        it( 'should throw an error when option messageCreateFunction is not of type Null or Function', function() {
            expect( function() {
                    var feedbackDisplay = new FeedbackDisplay( {
                        messageCreateFunction: 1
                    } );
                }
            ).toThrowError( TypeError );
        } );

        it( 'should not throw an error when given options are empty or undefined', function() {
            expect( function() {
                    var feedbackDisplay = new FeedbackDisplay( {} );
                    var feedbackDisplay2 = new FeedbackDisplay();
                }
            ).not.toThrowError( TypeError );
        } );

    } );


    describe( 'setStatusInvalidAria( field, fieldIdForAriaUsage )', function() {

        it( 'should set aria attributes for invalid status', function() {
            expect( function() {
                var feedbackDisplay = new FeedbackDisplay();
                var id = 'name';
                var field = document.getElementById( id );

                feedbackDisplay.setStatusInvalidAria( field, null );
                var ariaInvalidAttr = field.getAttribute( 'aria-invalid' );
                var ariaDescribedby = field.getAttribute( 'aria-describedby' );
                var r = ariaInvalidAttr === 'true' && ariaDescribedby === 'validation-message-' + id ? true : false;
                return r;
            }() ).toBeTruthy();
        } );

        it( 'should use correct dom element for message location', function() {
            var html = fixture.load( '/test/fixtures/form.html' );
            var feedbackDisplay = new FeedbackDisplay();
            var id = 'name';
            var field = document.getElementById( id );

            sinon.spy( feedbackDisplay, 'getMessageId' );

            feedbackDisplay.setStatusInvalidAria( field, null );
            sinon.assert.calledWith( feedbackDisplay.getMessageId, field );

            var fieldUseId = 'nameWithFeedbackDisplay';
            var fieldUse = document.getElementById( 'nameWithFeedbackDisplay' );
            feedbackDisplay.setStatusInvalidAria( field, fieldUseId );
            sinon.assert.calledWith( feedbackDisplay.getMessageId, fieldUse );
        } );

    } );

    describe( 'removeStatus( field )', function() {

        it( 'should have cleaned html (no validation classes, nor validation aria attributes)', function() {
            expect( function() {
                var feedbackDisplay = new FeedbackDisplay();
                var id = 'name';
                var field = document.getElementById( id );

                feedbackDisplay.setStatusInvalidAria( field, null );
                var fieldErrorClass = feedbackDisplay.options.fieldErrorClass;
                var fieldSuccessClass = feedbackDisplay.options.fieldSuccessClass;

                feedbackDisplay.removeStatus( field );

                var ariaInvalidAttr = field.getAttribute( 'aria-invalid' );
                var ariaDescribedby = field.getAttribute( 'aria-describedby' );

                var r = !field.classList.contains( fieldErrorClass ) && !field.classList.contains( fieldSuccessClass ) &&
                ( ariaInvalidAttr === null || ariaInvalidAttr === '' ) &&
                ( ariaDescribedby === null || ariaDescribedby === '' ) ? true : false;
                return r;
            }() ).toBeTruthy();
        } );

    } );

    describe( 'setStatus( field, valid, fieldIdForAriaUsage )', function() {

        it( 'should have correct html depending on validation result', function() {
            expect( function() {
                var feedbackDisplay = new FeedbackDisplay();
                var id = 'name';
                var field = document.getElementById( id );
                var fieldErrorClass = feedbackDisplay.options.fieldErrorClass;
                var fieldSuccessClass = feedbackDisplay.options.fieldSuccessClass;

                feedbackDisplay.setStatus( field, false, null );

                var ariaInvalidAttr = field.getAttribute( 'aria-invalid' );
                var ariaDescribedby = field.getAttribute( 'aria-describedby' );

                var r = field.classList.contains( fieldErrorClass ) &&
                ariaInvalidAttr === 'true' &&
                ariaDescribedby === 'validation-message-' + id ? true : false;

                feedbackDisplay.setStatus( field, true, null );

                ariaInvalidAttr = field.getAttribute( 'aria-invalid' );
                ariaDescribedby = field.getAttribute( 'aria-describedby' );

                var r2 = !field.classList.contains( fieldErrorClass ) &&
                field.classList.contains( fieldSuccessClass ) &&
                ( ariaInvalidAttr === null || ariaInvalidAttr === '' ) &&
                ( ariaDescribedby === null || ariaDescribedby === '' ) ? true : false;

                return r && r2;
            }() ).toBeTruthy();
        } );

    } );


    describe( 'setStatusBySelector( selector, status )', function() {

        it( 'should have correct html depending on validation result', function() {
            expect( function() {
                var feedbackDisplay = new FeedbackDisplay();
                var id = 'name';
                var field = document.getElementById( id );
                var selector = '#name, #nameWithFeedbackDisplay';
                var fieldErrorClass = feedbackDisplay.options.fieldErrorClass;
                var fieldSuccessClass = feedbackDisplay.options.fieldSuccessClass;
                var ariaInvalidAttr = 'aria-invalid';
                var ariaDescribedby = 'aria-describedby';

                feedbackDisplay.setStatusBySelector( selector, false );

                var fieldsLength = document.querySelectorAll( '#form input[' + ariaInvalidAttr + ']' ).length;
                var r = fieldsLength === 2 ? true : false;
                return r;
            }() ).toBeTruthy();
        } );

    } );

} );
