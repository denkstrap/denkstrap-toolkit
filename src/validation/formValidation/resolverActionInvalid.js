/**
 * This function provides validation invalid actions.
 *
 */

export default function resolverActionInvalid( result, fieldName, validator, handleValidationFeedbackData, feedbackDisplay ) {
    var fieldDom = document.getElementById( fieldName );
    var configFeedbackDisplay = handleValidationFeedbackData( result, fieldName );

    var message = typeof validator.message !== 'undefined' &&
    ( configFeedbackDisplay.preferHTMLValidatorMessage || result.message === 'undefined' ) ? validator.message :
        ( typeof result.message !== 'undefined' ? result.message : '' );

    // console.log( 'result.message, validator.message, message', result.message, validator.message, message, configFeedbackDisplay.preferHTMLValidatorMessage );
    // console.log( 'configFeedbackDisplay', configFeedbackDisplay, result.message, message );
    var fields;
    var messages;

    if ( configFeedbackDisplay.fieldShowState ) {
        feedbackDisplay.setValidStatus( fieldDom, false, configFeedbackDisplay.messageUseMessageOfFieldSel );
    } else {
        feedbackDisplay.removeValidStatus( fieldDom );
    }

    if ( configFeedbackDisplay.messageShow ) {
        feedbackDisplay.showValidMessage( fieldDom, message,
            configFeedbackDisplay.messageLocation,
            //this.validation.getIdentifier
            fieldDom.id
        );
    }

    // console.log( '#configFeedbackDisplay', configFeedbackDisplay );
    if ( configFeedbackDisplay.fieldShowStateInvalidSel !== null ) {
        fields = document.querySelectorAll( configFeedbackDisplay.fieldShowStateInvalidSel );
        Array.prototype.forEach.call( fields, function( field ) {
            feedbackDisplay.setValidStatus( field, false );
        }.bind( this ) );
    } else {
        if ( configFeedbackDisplay.fieldRemoveStateInvalidSel !== null ) {
            fields = document.querySelectorAll( configFeedbackDisplay.fieldRemoveStateInvalidSel );
            Array.prototype.forEach.call( fields, function( field ) {
                feedbackDisplay.removeValidStatus( field );
            }.bind( this ) );
        }
    }

    if ( configFeedbackDisplay.messageShowInvalidSel !== null ) {
        messages = document.querySelectorAll( configFeedbackDisplay.messageShowInvalidSel );
        Array.prototype.forEach.call( messages, function( message ) {
            feedbackDisplay.showValidMessage( fieldDom, message,
                configFeedbackDisplay.messageLocation,
                // this.validation.getIdentifier
                fieldDom.id //TODO
            );
        }.bind( this ) );
    }

    if ( configFeedbackDisplay.messageRemoveInvalidSel !== null ) {
        messages = document.querySelectorAll( configFeedbackDisplay.messageRemoveInvalidSel );
        Array.prototype.forEach.call( messages, function( message ) {
            feedbackDisplay.removeValidMessage( message );
        }.bind( this ) );
    }
}


