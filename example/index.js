// the validation resolver is handling the validators and validation-config
// to serve proper validation data to the ValidationService - Class
validation.validationServiceConstructorParam.resolver = {
    getValidator: function( validatorName ) {
        var validator =
            new Promise( function( resolve, reject ) {
                // the validator function itself is giving back via resolve
                // and could be taken via then
                resolve( function( value, validator, validationService, fieldName ) {
                    return new Promise( function( resolve, reject ) {
                        var fieldDom = validation.getDomByIdentifier( fieldName );
                        var vaildatorData = validation.configFields[ fieldName ].validators;
                        // objData = JSON.parse( objData );
                        // console.log( 'fieldName', fieldName, 'validatorName', validator );
                        if ( validation.condition( fieldDom ) ) {
                            var handleValidationFeedbackData = function( result, fieldName ) {
                                var configFeedbackDisplayValidator = result.options && result.options.feedbackDisplay ?
                                    result.options.feedbackDisplay : {};
                                var configFeedbackDisplay = {};

                                Object.keys( validation.configFields[ fieldName ].feedbackDisplay ).forEach( function( key ) {
                                    if ( typeof configFeedbackDisplayValidator[ key ] !== 'undefined' ) {
                                        configFeedbackDisplay[ key ] = configFeedbackDisplayValidator[ key ];
                                    } else {
                                        configFeedbackDisplay[ key ] = validation.configFields[ fieldName ].feedbackDisplay[ key ];
                                    }
                                } );

                                return configFeedbackDisplay;
                            };

                            validation.validators[ validatorName ].action( value, vaildatorData ).then( function( result ) {
                                var configFeedbackDisplay = handleValidationFeedbackData( result, fieldName );
                                // console.log( 'configFeedbackDisplayValidator', configFeedbackDisplayValidator, configFeedbackDisplay );

                                if ( configFeedbackDisplay.fieldShowState ) {
                                    validation.display.setValidStatus( fieldDom, true );
                                } else {
                                    validation.display.removeValidStatus( fieldDom );
                                }

                                if ( configFeedbackDisplay.messageShow ) {
                                    validation.display.removeValidMessage( fieldDom );
                                }

                                if ( validation.configFields[ fieldName ].setEventOnValidation ) {
                                    validation.dispatchEvent( fieldName, fieldDom, true );
                                }

                                resolve(
                                    {
                                        isValid: true
                                    }
                                );

                            } ).catch( function( result ) {

                                var message = typeof validator.message !== 'undefined' ? validator.message :
                                    ( typeof result.message !== 'undefined' ? result.message : '' );

                                var configFeedbackDisplay = handleValidationFeedbackData( result, fieldName );

                                if ( configFeedbackDisplay.fieldShowState ) {
                                    validation.display.setValidStatus( fieldDom, false );
                                } else {
                                    validation.display.removeValidStatus( fieldDom );
                                }

                                if ( configFeedbackDisplay.messageShow ) {
                                    validation.display.showValidMessage( fieldDom, message );
                                }

                                if ( validation.configFields[ fieldName ].setEventOnValidation ) {
                                    validation.dispatchEvent( fieldName, fieldDom, false );
                                }

                                reject(
                                    {
                                        isValid: false,
                                        message: message
                                    }
                                );

                            } );
                        } else {
                            if ( validation.configFields[ fieldName ].feedbackDisplay.fieldShowState ) {
                                validation.display.setValidStatus( fieldDom, true );
                            } else {
                                validation.display.removeValidStatus( fieldDom );
                            }

                            if ( validation.configFields[ fieldName ].feedbackDisplay.messageShow ) {
                                validation.display.removeValidMessage( fieldDom );
                            }

                            if ( validation.configFields[ fieldName ].setEventOnValidation ) {
                                validation.dispatchEvent( fieldName, fieldDom, true );
                            }

                            resolve(
                                {
                                    isValid: true
                                }
                            );
                        }
                    } );
                } );
            } );

        // the validator promise is giving back
        return validator;
    }
};

validation.getValidationFields = function() {
    return validation.form.querySelectorAll(
        'input[data-validation],select[data-validation],textarea[data-validation]' );
};

// validationConfig
validation.validationServiceConstructorParam.validationConfig = {};

validation.getIdentifierByDom = function( fieldDom ) {
    var name =  fieldDom.id;
    return name;
};

validation.getDomByIdentifier = function( identifier ) {
    return document.getElementById( identifier );
};

// fill up validation config via data attributes of fields
function getValidationConfig() {
    var config = {};
    var configService = {};
    var configFields = {};
    var fields = validation.getValidationFields();
    Array.prototype.forEach.call(fields, function( field ) {
        var objData = field.getAttribute( 'data-validation' );
        objData = JSON.parse( objData );
        var objDataField = {
            validators: objData.validators,
            feedbackDisplay: {
                fieldShowState: true,
                messageShow: true,
                messageLocation: null
            },
            caching: true,
            setEventOnValidation: false
        };
        Object.keys( objData ).forEach( function( key ) {
            if ( key !== 'validators' ) {
                if ( key === 'feedbackDisplay' ) {
                    Object.keys( objData.feedbackDisplay ).forEach( function( key2 ) {
                        objDataField.feedbackDisplay[ key2 ] = objData.feedbackDisplay[ key2 ];
                    } );
                } else {
                    objDataField[ key ] = objData[ key ];
                }
            }
        } );

        var validators = {};
        Object.keys( objData.validators ).forEach( function( validatorName ) {
            var obj = {
                message: objData.validators[ validatorName ].message
            }
            validators[ validatorName ] = obj;
        } );

        var identifier = validation.getIdentifierByDom( field );
        configService[ identifier ] = validators;
        configFields[ identifier ] = objDataField;
    } );
    config.service = configService;
    config.fields = configFields;
    return config;
}

(function(window, document, undefined) {
    var config = getValidationConfig();
    validation.validationServiceConstructorParam.validationConfig = config.service;
    validation.configFields = config.fields;
})(this, document);

console.log( 'validation.validationServiceConstructorParam.validationConfig',
    validation.validationServiceConstructorParam.validationConfig );

console.log( 'validation.configFields', validation.configFields );

// console.log( 'validation', validation );
var validationService = new ValidationServiceExt(
    validation.validationServiceConstructorParam.validationConfig,
    validation.validationServiceConstructorParam.resolver,
    validation.validationServiceConstructorParam.cache );


// validation.setBehavior();

validation.setValues = function() {
    var fieldNames = Object.keys( validation.validationServiceConstructorParam.validationConfig );
    // console.log( 'fieldNames', fieldNames );
    fieldNames.forEach( function( fieldName ) {
        // console.log( 'fieldName', fieldName );
        var el = validation.getDomByIdentifier( fieldName );
        var fieldValue = el.value;
        validationService.setValueByField( el );
    } );
};

validation.setValues();

validation.form.addEventListener( 'submit', function( event ) {
    event.preventDefault();
    validation.setValues();
    validationService.validateForm().then( function( result ) {
        console.log( 'validateForm success', result );
    } ).catch( function( result ) {
        console.log( 'validateForm fail', result );
    } );
} );



document.getElementById( 'submit-btn' ).click();
