import {FeedbackDisplay} from '../../../src/validation/formValidation/feedbackDisplay';
/** @test {FeedbackDisplay} */

describe( 'FeedbackDisplay', function() {

    beforeEach( function() {
        this.result = fixture.load( '/test/fixtures/form.html' );
    } );

    afterEach( function() {
        viewport.reset()
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
                var selector = '#name, #nameWithFeedbackDisplay';
                var ariaInvalidAttr = 'aria-invalid';

                feedbackDisplay.setStatusBySelector( selector, false );

                var fieldsLength = document.querySelectorAll( '#form input[' + ariaInvalidAttr + ']' ).length;
                var r = fieldsLength === 2 ? true : false;
                return r;
            }() ).toBeTruthy();
        } );

    } );

    describe( 'getDefaultInsertLoc( field )', function() {

        it( 'should give back a reference to the according label of field', function() {
            expect( function() {
                var feedbackDisplay = new FeedbackDisplay();
                var field = document.getElementById( 'name' );
                var label = document.querySelector( '[for="name"]' );
                var r = feedbackDisplay.getDefaultInsertLoc( field ) === label ? true : false;
                return r;
            }() ).toBeTruthy();
        } );

    } );

    describe( 'getBreakpointMessageInfoLocationData( messageLocation )', function() {


        it( 'should return message breakpoint data 750', function() {

            var messageLocationMin750 =
            {
                minWidth: 750,
                insertTargetSelector: "#nameHidden"
            };

            expect( function() {

                var feedbackDisplay = new FeedbackDisplay();

                var messageLocation = [
                    {
                        minWidth: 0,
                        insertTargetSelector: "#name"
                    }
                ];

                messageLocation.push( messageLocationMin750 );

                viewport.set( 750 );
                var breakPointData = feedbackDisplay.getBreakpointMessageInfoLocationData( messageLocation );

                return breakPointData;
            }() ).toEqual( messageLocationMin750 );
        } );

        it( 'should return message location data of null', function() {

            var messageLocationMin750 =
            {
                minWidth: 750,
                insertTargetSelector: "#nameHidden"
            };

            expect( function() {

                var feedbackDisplay = new FeedbackDisplay();

                var messageLocation = [];

                messageLocation.push( messageLocationMin750 );

                viewport.set( 749 );
                var breakPointData = feedbackDisplay.getBreakpointMessageInfoLocationData( messageLocation );

                return breakPointData;
            }() ).toBe( null );
        } );

    } );


    describe( 'getMessageInsertLocationData( field, messageLocation )', function() {

        it( 'should return message location data with breakpoint data 750 and label of input as fallback insert point', function() {

            var messageLocationMin750 =
            {
                minWidth: 750,
                insertTargetSelector: "#nameHiddenDOES_NOT_EXIST"
            };

            var infoData = {
                insertLoc: document.querySelector( '[for="name"]' ),
                breakpointData: messageLocationMin750
            }

            expect( function() {

                var feedbackDisplay = new FeedbackDisplay();
                var id = 'name';
                var field = document.getElementById( id );

                var messageLocation = [];

                messageLocation.push( messageLocationMin750 );

                viewport.set( 750 );
                var breakPointData = feedbackDisplay.getMessageInsertLocationData( field, messageLocation );

                return breakPointData;


            }() ).toEqual( infoData );

        } );

    } );

    describe( 'showMessage( field, message, messageLocation )', function() {

        it( 'should show error message with specific message and fallback insert point', function() {
            expect( function() {
                var feedbackDisplay = new FeedbackDisplay();
                var field = document.getElementById( 'name' );
                var message = 'Enter a name, please.';
                var messageLocation = null;
                var messageId = feedbackDisplay.getMessageId( field );
                feedbackDisplay.showMessage( field, message, messageLocation );

                var messageDom = document.getElementById( messageId );
                var r =  messageDom instanceof HTMLElement &&
                messageDom.querySelector( 'label' ).innerHTML === message ? true : false;
                return r;
            }() ).toBeTruthy();
        } );

    } );


    describe( 'removeMessageAndAccordingAriaAttrOfField( field )', function() {

        it( 'should remove error message and accrding aria attributes of field', function() {
            expect( function() {
                var feedbackDisplay = new FeedbackDisplay();
                var field = document.getElementById( 'name' );
                var message = 'Enter a name, please.';
                var messageLocation = null;
                var messageId = feedbackDisplay.getMessageId( field );
                feedbackDisplay.showMessage( field, message, messageLocation );

                feedbackDisplay.removeMessageAndAccordingAriaAttrOfField( field );

                var messageDom = document.getElementById( messageId );
                var r =  messageDom === null &&
                    field.getAttribute( 'aria-describedby' ) === null ? true : false;
                return r;
            }() ).toBeTruthy();
        } );

    } );

    // describe( 'getMessageId( field )', function() {
    //
    //     it( 'should give back validation message id', function() {
    //         expect( function() {
    //             var feedbackDisplay = new FeedbackDisplay();
    //             var id = 'name';
    //             var field = document.getElementById( id );
    //             var messge = feedbackDisplay.getMessageId( field );s
    //             var r = message instanceof HTMLElement ? true : false;
    //             return r;
    //         }() ).toBeTruthy();
    //     } );
    //
    // } );



} );
