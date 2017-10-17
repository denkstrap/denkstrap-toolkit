// validation cache off version
// validation.cache = {
//     getValue: function() {
//         return false;
//     },
//     setValue: function() {
//     }
// };
// validation cache (used to avoid unnecessary validations

validation.cache = {
    getValue: function( cacheKey ) {
        var fieldName = cacheKey.split( '.' )[ 1 ];
        if ( validation.isCachingEnabled( fieldName ) ) {
            return validation.cache.data[ cacheKey ];
        } else {
            return false;
        }
    },
    setValue: function( cacheKey, cached ) {
        validation.cache.data[ cacheKey ] = cached;
    }
};
validation.cache.data = [];

validation.isCachingEnabled = function( fieldName ) {
    var caching = false;
    var fieldDom = document.getElementsByName( fieldName )[ 0 ];
    var objData = fieldDom.getAttribute( 'data-validation' );
    objData = JSON.parse( objData );
    if ( !objData.caching ) {
        Object.keys( validation.validationConfig[ fieldName ] ).forEach( function( key ) {
            if ( validation.validators[ key ].caching ) {
                caching = true;
                return;
            }
        } );
    } else {
        caching = true;
    }
    return caching;
}



validation.condition = function( field ) {
    // adjusted jQuery
    // https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
    return !!( ( field.offsetWidth || field.offsetHeight ) && field.offsetParent );
}


// the validation resolver is handling the validators and validation-config
// to serve proper validation data to the ValidationService - Class
validation.resolver = {
    getValidator: function( validatorName ) {
        var validator =
            new Promise( function( resolve, reject ) {
                // the validator function itself is giving back via resolve
                // and could be taken via then
                resolve( function( value, validator, validationService, field ) {
                    return new Promise( function( resolve, reject ) {
                        var fieldDom = document.getElementsByName( field )[ 0 ];
                        if ( validation.condition( fieldDom ) ) {
                            validation.validators.action[ validatorName ]( value ).then( function( result ) {
                                resolve(
                                    {
                                        isValid: true
                                    }
                                );
                            } ).catch( function( result ) {
                                var message = typeof validator.message !== 'undefined' ? validator.message :
                                    ( typeof result.message !== 'undefined' ? result.message : '' );
                                reject(
                                    {
                                        isValid: false,
                                        message: message
                                    }
                                );
                            } );
                        } else {
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

// validationConfig
validation.validationConfig = {};

// fill up validation config via data attributes of fields
function setValidationConfig() {
    var config = {};
    var fields = document.querySelectorAll( 'input' );
    fields.forEach( function( field ) {
        var objData = field.getAttribute( 'data-validation' );
        objData = JSON.parse( objData );
        var objDataCleaned = {};
        Object.keys( objData ).forEach( function( key ) {
            if ( key !== 'caching' ) {
                objDataCleaned[ key ] = objData[ key ];
            }
        } );
        var validatorNames = Object.keys( objDataCleaned );
        validatorNames.forEach( function( ) {
            config[ field.name ] = objDataCleaned;
        } );
    } );
    return config;
}
validation.validationConfig = setValidationConfig();

console.log( 'validation.validationConfig', validation.validationConfig );

// console.log( 'validation', validation );

var validationService = new ValidationServiceExt(
    validation.validationConfig,
    validation.resolver,
    validation.cache );


var form = document.getElementById( 'form' );
form.addEventListener( 'submit', function( event ) {
    event.preventDefault();
    var validatorNames = Object.keys( validation.validationConfig );
    validatorNames.forEach( function( validatorName ) {
        var fieldValue = document.getElementsByName( validatorName )[ 0 ].value;
        validationService.setValueByField( document.getElementsByName( validatorName )[ 0 ] );
    } );
    validationService.validateForm().then( function( result ) {
        console.log( 'validateForm success', result );
    } ).catch( function( result ) {
        console.log( 'validateForm fail', result );
    } );
} );

var addInputFieldBtn = document.getElementById( 'addInputFieldBtn' );
if ( addInputFieldBtn !== null ) {
    var counter = 0;
    addInputFieldBtn.addEventListener( 'click', function() {
        counter++;
        var name = 'dynamic-field-required' + counter;
        var html = '<label for="' + name + '">' + name +
            '  </label>' +
            '<input name="' + name + '" id="' + name + '" ' +
            'data-validation=\'{' +
            '"required": { "message": "Required \\"' +
            name + '\\" not set" } }' +
            '\'' +
            '><br><br>';

        form.insertAdjacentHTML( 'afterbegin', html );
        validation.validationConfig = setValidationConfig();
        validationService.setConfig( validation.validationConfig );
        console.log( 'validation.validationConfig', validation.validationConfig );

    } );
}


// document.getElementById( 'submit-btn' ).click();
