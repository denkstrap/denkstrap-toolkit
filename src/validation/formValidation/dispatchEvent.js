/**
 *  @memberof formValidation
 * The eventDispatch function triggers events after each validation of a field
 */

export default function eventDispatch( fieldName, fieldDom, isValid ) {
    // create and dispatch the event
    var eventName = fieldName + '-validated';
    var eventObj = {
        detail: {
            isValid: isValid,
            field: fieldDom
        }
    };
    var event = new CustomEvent( eventName, eventObj );
    fieldDom.dispatchEvent( event );
}

