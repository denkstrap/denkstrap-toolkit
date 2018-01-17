import dispatchEvent from '../../../src/validation/formValidation/dispatchEvent';
/** @test {dispatchEvent} */

describe( 'dispatchEvent', function() {

    beforeEach( function() {
        this.result = fixture.load( '/test/fixtures/form.html' );
    } );

    describe( 'eventDispatch( fieldDom, isValid )', function() {

        it( 'should throw an error when given parameter fieldDom is not of type HTMLElement', function() {
            var field = document.getElementById( 'name_DOES_NOT_EXIST' );
            expect( function() {
                dispatchEvent( field, true );
            } ).toThrowError( TypeError );
        } );

        it( 'should throw an error when given parameter isValid is not of type Boolean', function() {
            var field = document.getElementById( 'name' );
            expect( function() {
                dispatchEvent( field, 'true' );
            } ).toThrowError( TypeError );
        } );

        it( 'should receive a proper event message', function( done ) {
            var fieldId = 'name';
            var field = document.getElementById( fieldId );
            var isValid = false;
            var receivedEvent;
            var eventObj = {
                detail: {
                    isValid: isValid,
                    field: field
                }
            };
            var eventName = fieldId + '-validated';
            field.addEventListener( eventName, function ( event ) {
                setTimeout( function(){
                    receivedEvent = event.detail;
                    expect( receivedEvent ).toEqual( eventObj.detail );
                    done();
                },  10);
            } );
            dispatchEvent( field, false );
        } );

    } );

} );