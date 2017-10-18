validation.validationServiceConstructorParam = {};

// validation cache off version
// validation.validationServiceConstructorParam.cache = {
//     getValue: function() {
//         return false;
//     },
//     setValue: function() {
//     }
// };

// validation cache (used to avoid unnecessary validations
validation.validationServiceConstructorParam.cache = {
    getValue: function( cacheKey ) {
        var fieldName = cacheKey.split( '.' )[ 1 ];
        if ( validation.cache.isCachingEnabled( fieldName ) ) {
            return validation.cache.data[ cacheKey ];
        } else {
            return false;
        }
    },
    setValue: function( cacheKey, cached ) {
        // console.log( 'cacheKey, cached', cacheKey, cached );
        this.data[ cacheKey ] = cached;
    },
    data: []
}

validation.cache = {};
validation.cache.isCachingEnabled = function( fieldName ) {
    var caching = false;
    var fieldDom = document.getElementsByName( fieldName )[ 0 ];
    var objData = fieldDom.getAttribute( 'data-validation' );
    objData = JSON.parse( objData );
    if ( !objData.caching ) {
        Object.keys( validation.validationServiceConstructorParam.validationConfig[ fieldName ] ).forEach( function( key ) {
            if ( validation.validators[ key ].caching ) {
                caching = true;
                return;
            }
        } );
    } else {
        caching = true;
    }
    return caching;
};



validation.condition = function( field ) {
    // adjusted jQuery
    // https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
    return !!( ( field.offsetWidth || field.offsetHeight ) && field.offsetParent );
};

validation.display = {};

validation.display.getGroupFields = function( field ) {
    var name = field.getAttribute( 'name' );
    return document.getElementsByName( name );
};

validation.display.setGroupAction = function( field, action ) {
    validation.display.getGroupFields( field ).forEach( function( groupMember ) {
        // console.log( 'groupMember', groupMember );
        action( groupMember );
    } );
};

validation.display.setValidStatus = function( field, valid ) {
    var validErrorClass = 'validation-error';
    var validSuccessClass = 'validation-success';
    var id = field.getAttribute( 'id' );
    validation.display.setGroupAction( field, function( field ) {
        var idLocal = field.getAttribute( 'id' );
        if ( valid ) {
            if ( idLocal === id ) {
                field.classList.add( validSuccessClass );
            }
            field.classList.remove( validErrorClass );
        } else {
            field.classList.add( validErrorClass );
            field.classList.remove( validSuccessClass );
        }
    } )
};

validation.display.getMessageId = function( field ) {
    return 'validation-message-' + field.getAttribute( 'name' );
};

validation.display.showValidMessage = function( field, message ) {
    validation.display.removeValidMessage( field );
    var id = validation.display.getMessageId( field );
    var  html = '<p class="validation-message" ' +
         'id="' +
         id +
         '"' +
        '>' +
        message +
        '</p>';
    var attr =  field.getAttribute( 'type' );
    var insertLoc = attr !== 'checkbox' && attr !== 'radio' ? field : field.parentNode;
    insertLoc.insertAdjacentHTML( 'beforebegin', html );
};

validation.display.removeValidMessage = function( field ) {
    var id = validation.display.getMessageId( field );
    var message = document.getElementById( id );
    if ( message !== null ) {
        message.parentNode.removeChild( message );
    }
};

// the validation resolver is handling the validators and validation-config
// to serve proper validation data to the ValidationService - Class
validation.validationServiceConstructorParam.resolver = {
    getValidator: function( validatorName ) {
        var validator =
            new Promise( function( resolve, reject ) {
                // the validator function itself is giving back via resolve
                // and could be taken via then
                resolve( function( value, validator, validationService, field ) {
                    return new Promise( function( resolve, reject ) {
                        var fieldDom = document.getElementsByName( field )[ 0 ];
                        if ( validation.condition( fieldDom ) ) {
                            validation.validators[ validatorName ].action( value ).then( function( result ) {
                                validation.display.setValidStatus( fieldDom, true );
                                validation.display.removeValidMessage( fieldDom );
                                resolve(
                                    {
                                        isValid: true
                                    }
                                );
                            } ).catch( function( result ) {
                                var message = typeof validator.message !== 'undefined' ? validator.message :
                                    ( typeof result.message !== 'undefined' ? result.message : '' );
                                validation.display.setValidStatus( fieldDom, false );
                                validation.display.showValidMessage( fieldDom, message );
                                reject(
                                    {
                                        isValid: false,
                                        message: message
                                    }
                                );
                            } );
                        } else {
                            validation.display.setValidStatus( fieldDom, true );
                            validation.display.removeValidMessage( fieldDom );
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

validation.behavior = function() {
    var fields = validation.getValidationFields();
    fields.forEach( function( field ) {
        field.addEventListener( 'blur', function() {
            var  fieldName = field.getAttribute( 'name' );
            validationService.setValue( fieldName, field.value );
            validationService.validate( fieldName, 'form' ).catch( function() {});
        } );
    } );
};

// validationConfig
validation.validationServiceConstructorParam.validationConfig = {};

validation.form = document.getElementById( 'form' );

// fill up validation config via data attributes of fields
function setValidationConfig() {
    var config = {};
    var fields = validation.getValidationFields();
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
validation.validationServiceConstructorParam.validationConfig = setValidationConfig();

console.log( 'validation.validationServiceConstructorParam.validationConfig',
    validation.validationServiceConstructorParam.validationConfig );

// console.log( 'validation', validation );
var validationService = new ValidationServiceExt(
    validation.validationServiceConstructorParam.validationConfig,
    validation.validationServiceConstructorParam.resolver,
    validation.validationServiceConstructorParam.cache );


// validation.behavior();

validation.form.addEventListener( 'submit', function( event ) {
    event.preventDefault();
    var validatorNames = Object.keys( validation.validationServiceConstructorParam.validationConfig );
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
        validation.validationServiceConstructorParam.validationConfig = setValidationConfig();
        validationService.setConfig( validation.validationServiceConstructorParam.validationConfig );
        console.log( 'validation.validationServiceConstructorParam.validationConfig',
            validation.validationServiceConstructorParam.validationConfig );

    } );
}


// document.getElementById( 'submit-btn' ).click();
