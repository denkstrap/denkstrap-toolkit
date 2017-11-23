/**
 * This function resolves the validation of each field
 *
 */
export default function resolver( thisValidationServiceExtAdaption, validActionValid, validActionInvalid, handleValidationFeedbackData, feedbackDisplay ) {
// the validation resolver is handling the validators and validation-config
// to serve proper validation data to the ValidationService - Class
        return {
        getValidator: function( validatorName ) {
            var validator =
                new Promise( function( resolve, reject ) {
                    // the validator function itself is giving back via resolve
                    // and could be taken via then
                    resolve( function( value, validator, validationService, fieldName ) {
                        return new Promise( function( resolve, reject ) {

                            var fieldDom = document.getElementById( fieldName );
                            var vaildatorData = thisValidationServiceExtAdaption.configFields[ fieldName ].validators;
                            var data = {};
                            data.value = value;
                            if ( thisValidationServiceExtAdaption.configFields[ fieldName ].groupSel !== null ) {
                                var fields = document.querySelectorAll( thisValidationServiceExtAdaption.configFields[ fieldName ].groupSel );
                                // console.log( '#fields', fields, fields.length );
                                data.addInfo = {};
                                data.addInfo.groupMembers = [];
                                Array.prototype.forEach.call( fields, function( field ) {
                                    data.addInfo.groupMembers.push( { identifier: field.id, value: field.value } ); //TODO
                                }.bind( this ) )
                            }
                            data[ 'validatorData' ] = vaildatorData;
                            // console.log( 'fieldName', fieldName, 'validatorName', validator, 'value', value );

                            // console.log( 'thisValidationServiceExtAdaption.options.validators', thisValidationServiceExtAdaption.options.validators );
                            // console.log( 'resolver vaildatorData', fieldName, value, validatorName, vaildatorData );
                            if ( typeof thisValidationServiceExtAdaption.options.validators[ validatorName ] === 'undefined' ) {
                               console.log( 'ERROR: Validator', validatorName, 'not defined' );
                            }
                            thisValidationServiceExtAdaption.options.validators[ validatorName ]( value, data ).then( function( result ) {

                                if ( thisValidationServiceExtAdaption.configFields[ fieldName ].setEventOnValidation ) {
                                    thisValidationServiceExtAdaption.dispatchEvent( fieldName, fieldDom, true );
                                }

                                validActionValid( result, fieldName, handleValidationFeedbackData, feedbackDisplay );

                                resolve(
                                    {
                                        isValid: true
                                    }
                                );

                            } ).catch( function( result ) {

                                if ( thisValidationServiceExtAdaption.configFields[ fieldName ].setEventOnValidation ) {
                                    thisValidationServiceExtAdaption.dispatchEvent( fieldName, fieldDom, false );
                                }

                                validActionInvalid( result, fieldName, validator, handleValidationFeedbackData, feedbackDisplay );

                                reject(
                                    {
                                        isValid: false
                                    }
                                );

                            } );

                        } );
                    } );
                } );

            // the validator promise is giving back
            return validator;
        }
    }
}


