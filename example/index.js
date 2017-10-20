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
                        var fieldDom = document.getElementsByName( fieldName )[ 0 ];
                        if ( validation.condition( fieldDom ) ) {

                            validation.validators[ validatorName ].action( value ).then( function( result ) {

                                if ( validation.configFields[ fieldName ].feedbackDisplay.fieldShowState ) {
                                    validation.display.setValidStatus( fieldDom, true );
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

                            } ).catch( function( result ) {

                                var message = typeof validator.message !== 'undefined' ? validator.message :
                                    ( typeof result.message !== 'undefined' ? result.message : '' );

                                if ( validation.configFields[ fieldName ].feedbackDisplay.fieldShowState ) {
                                    validation.display.setValidStatus( fieldDom, false );
                                }

                                if ( validation.configFields[ fieldName ].feedbackDisplay.messageShow ) {
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

// fill up validation config via data attributes of fields
function getValidationConfig() {
    var config = {};
    var configService = {};
    var configFields = {};
    var fields = validation.getValidationFields();
    Array.prototype.forEach.call(fields, function( field ) {
        var objData = field.getAttribute( 'data-validation' );
        objData = JSON.parse( objData );
        console.log( 'objData', objData );
        var objDataField = {
            validators: {},
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

        configService[ field.name ] = objData.validators;
        configFields[ field.name ] = objDataField;
    } );
    config.service = configService;
    config.fields = configFields;
    return config;
}

(function(window, document, undefined) {
    var config = getValidationConfig();
    validation.validationServiceConstructorParam.validationConfig = config .service;
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


validation.setBehavior();

validation.setValues = function() {
    var validatorNames = Object.keys( validation.validationServiceConstructorParam.validationConfig );
    validatorNames.forEach( function( validatorName ) {
        var fieldValue = document.getElementsByName( validatorName )[ 0 ].value;
        validationService.setValueByField( document.getElementsByName( validatorName )[ 0 ] );
    } );
};

validation.setValues();

validation.form.addEventListener( 'submit', function( event ) {
    event.preventDefault();
    validationService.validateForm().then( function( result ) {
        console.log( 'validateForm success', result );
    } ).catch( function( result ) {
        console.log( 'validateForm fail', result );
    } );
} );



// document.getElementById( 'submit-btn' ).click();
