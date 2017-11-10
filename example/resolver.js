// // the validation resolver is handling the validators and validation-config
// // to serve proper validation data to the ValidationService - Class
// validation.validationServiceConstructorParam.resolver = {
//     getValidator: function( validatorName ) {
//         var validator =
//             new Promise( function( resolve, reject ) {
//                 // the validator function itself is giving back via resolve
//                 // and could be taken via then
//                 resolve( function( value, validator, validationService, fieldName ) {
//                     return new Promise( function( resolve, reject ) {
//                         console.log( '#this', validationService );
//                         var fieldDom = validation.getDomByIdentifier( fieldName );
//                         var vaildatorData = validation.configFields[ fieldName ].validators;
//                         // objData = JSON.parse( objData );
//                         // console.log( 'fieldName', fieldName, 'validatorName', validator );
//                         if ( validation.condition( fieldDom ) ) {
//                             var handleValidationFeedbackData = function( result, fieldName ) {
//                                 var configFeedbackDisplayValidator = result.options && result.options.feedbackDisplay ?
//                                     result.options.feedbackDisplay : {};
//                                 var configFeedbackDisplay = {};
//
//                                 Object.keys( validation.configFields[ fieldName ].feedbackDisplay ).forEach( function( key ) {
//                                     if ( typeof configFeedbackDisplayValidator[ key ] !== 'undefined' ) {
//                                         configFeedbackDisplay[ key ] = configFeedbackDisplayValidator[ key ];
//                                     } else {
//                                         configFeedbackDisplay[ key ] = validation.configFields[ fieldName ].feedbackDisplay[ key ];
//                                     }
//                                 } );
//
//                                 return configFeedbackDisplay;
//                             };
//
//                             validation.validators[ validatorName ].action( value, vaildatorData ).then( function( result ) {
//                                 var configFeedbackDisplay = handleValidationFeedbackData( result, fieldName );
//                                 // console.log( 'configFeedbackDisplayValidator', configFeedbackDisplayValidator, configFeedbackDisplay );
//
//                                 if ( configFeedbackDisplay.fieldShowState ) {
//                                     validation.display.setValidStatus( fieldDom, true, configFeedbackDisplay.messageShow );
//                                 } else {
//                                     validation.display.removeValidStatus( fieldDom );
//                                     validation.display.removeValidStatusAria( fieldDom );
//                                 }
//
//                                 if ( configFeedbackDisplay.messageShow ) {
//                                     validation.display.removeValidMessage( fieldDom );
//                                 }
//
//                                 if ( validation.configFields[ fieldName ].setEventOnValidation ) {
//                                     validation.dispatchEvent( fieldName, fieldDom, true );
//                                 }
//
//                                 resolve(
//                                     {
//                                         isValid: true
//                                     }
//                                 );
//
//                             } ).catch( function( result ) {
//
//                                 var message = typeof validator.message !== 'undefined' ? validator.message :
//                                     ( typeof result.message !== 'undefined' ? result.message : '' );
//
//                                 var configFeedbackDisplay = handleValidationFeedbackData( result, fieldName );
//
//                                 if ( configFeedbackDisplay.fieldShowState ) {
//                                     validation.display.setValidStatus( fieldDom, false, configFeedbackDisplay.messageShow  );
//                                 } else {
//                                     validation.display.removeValidStatus( fieldDom );
//                                 }
//
//                                 if ( configFeedbackDisplay.messageShow ) {
//                                     validation.display.showValidMessage( fieldDom, message, configFeedbackDisplay.messageLocation );
//                                 }
//
//                                 if ( validation.configFields[ fieldName ].setEventOnValidation ) {
//                                     validation.dispatchEvent( fieldName, fieldDom, false );
//                                 }
//
//                                 reject(
//                                     {
//                                         isValid: false,
//                                         message: message
//                                     }
//                                 );
//
//                             } );
//                         } else {
//                             if ( validation.configFields[ fieldName ].feedbackDisplay.fieldShowState ) {
//                                 validation.display.setValidStatus( fieldDom, true );
//                             } else {
//                                 validation.display.removeValidStatus( fieldDom );
//                             }
//
//                             if ( validation.configFields[ fieldName ].feedbackDisplay.messageShow ) {
//                                 validation.display.removeValidMessage( fieldDom );
//                             }
//
//                             if ( validation.configFields[ fieldName ].setEventOnValidation ) {
//                                 validation.dispatchEvent( fieldName, fieldDom, true );
//                             }
//
//                             resolve(
//                                 {
//                                     isValid: true
//                                 }
//                             );
//                         }
//                     } );
//                 } );
//             } );
//
//         // the validator promise is giving back
//         return validator;
//     }
// };
