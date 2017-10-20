validation.dispatchEvent = function( fieldName, fieldDom, isValid ) {
    // create and dispatch the event
    var eventName = fieldName + '-validated';
    var eventObj = {
        detail: {
            isValid: isValid
        }
    };
    var event = new CustomEvent( eventName, eventObj );
    fieldDom.dispatchEvent( event );
    console.log( 'dispatchEvent ' ,fieldName, eventName, isValid );
}
