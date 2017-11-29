/**
 * This function provides validation valid actions.
 * @param {Object} result
 * @param {String} fieldName
 * @param {Function} handleValidationFeedbackData
 * @param {Function} feedbackDisplay
 */
export default function resolverActionValid( result, fieldName, handleValidationFeedbackData, feedbackDisplay ) {
    var fieldDom = document.getElementById( fieldName );
    var fields;
    var configFeedbackDisplay = handleValidationFeedbackData( result, fieldName );
    var messages;
    // console.log( 'configFeedbackDisplay valid', configFeedbackDisplay );

    if ( configFeedbackDisplay.fieldShowState ) {
        feedbackDisplay.setValidStatus( fieldDom, true );
    } else {
        feedbackDisplay.removeValidStatus( fieldDom );
    }

    feedbackDisplay.removeValidMessage( fieldDom );

    // console.log( '#configFeedbackDisplay', configFeedbackDisplay );
    if ( configFeedbackDisplay.fieldShowStateValidSel !== null ) {
        fields = document.querySelectorAll( configFeedbackDisplay.fieldShowStateInvalidSel );
        Array.prototype.forEach.call( fields, function( field ) {
            feedbackDisplay.setValidStatus( field, false );
        }.bind( this ) );
    } else {
        if ( configFeedbackDisplay.fieldRemoveStateValidSel !== null ) {
            fields = document.querySelectorAll( configFeedbackDisplay.fieldRemoveStateInvalidSel );
            Array.prototype.forEach.call( fields, function( field ) {
                feedbackDisplay.removeValidStatus( field );
            }.bind( this ) );
        }
    }

    if ( configFeedbackDisplay.messageShowValidSel !== null ) {
        messages = document.querySelectorAll( configFeedbackDisplay.messageShowInvalidSel );
        Array.prototype.forEach.call( messages, function( message ) {
            feedbackDisplay.showValidMessage( fieldDom, message,
                configFeedbackDisplay.messageLocation,
                // this.validation.getIdentifier
                fieldDom.id //TODO
            );
        }.bind( this ) );
    }

    if ( configFeedbackDisplay.messageRemoveValidSel !== null ) {
        messages = document.querySelectorAll( configFeedbackDisplay.messageRemoveInvalidSel );
        Array.prototype.forEach.call( messages, function( message ) {
            feedbackDisplay.removeValidMessage( message );
        }.bind( this ) );
    }
}


