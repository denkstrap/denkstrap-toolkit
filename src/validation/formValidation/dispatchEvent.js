/**
 * The eventDispatch function triggers events after each validation of a field
 *
 * @param {Object } fieldDom - Reference to dom element.
 * @param {Boolean} isValid
 */
export default function eventDispatch( fieldDom, isValid ) {
    // create and dispatch the event
    var eventName = fieldDom.id + '-validated';
    var eventObj = {
        detail: {
            isValid: isValid,
            field: fieldDom
        }
    };
    var event = new CustomEvent( eventName, eventObj );
    fieldDom.dispatchEvent( event );
}

