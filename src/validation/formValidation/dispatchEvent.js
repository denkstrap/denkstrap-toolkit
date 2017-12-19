/**
 * The eventDispatch function triggers events after each validation of a field
 *
 * @param {Object } fieldDom - Reference to dom element.
 * @param {Boolean} isValid
 */
export default function eventDispatch( fieldDom, isValid ) {
    if ( !( fieldDom instanceof HTMLElement ) ) {
        throw new TypeError( 'fieldDom is not an instance of HTMLElement.' );
    }

    if ( typeof isValid !== 'boolean' ) {
        throw new TypeError( 'isValid is not of type Boolean' );
    }

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

