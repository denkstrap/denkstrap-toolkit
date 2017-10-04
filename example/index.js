// global validation object to store validation data
validation = {};

// the validators are in folder "/validators"
validation.validators = {};

// validation cache (used to avoid unnecessary validations
validation.cache = {
    getValue: function() {
        return false;
    },
    setValue: function() {
    }
};

// the validation resolver is handling the validators and validation-config
// to serve proper validation data to the ValidationService - Class
validation.resolver = {
    getValidator: function( validatorName ) {
        var validator =
            new Promise( function( resolve, reject ) {
                resolve( function( value, validator, validationService ) {
                    return new Promise( function( resolve, reject ) {
                        validation.validators[ validatorName ]( value ).then( function( result ) {
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

                    } );
                } );
            } );

        return validator;
    }
};

// validationConfig
validation.validationConfig = {};

function setValidationConfig() {
    var config = {};
    var fields = document.querySelectorAll( 'input' );
    fields.forEach( function( field ) {
        var objData = field.getAttribute( 'data-validation' );
        objData = JSON.parse( objData );
        var validatorNames = Object.keys( objData );
        validatorNames.forEach( function( validatorName ) {
            config[ field.name ] = objData;
        } );
    } );
    return config;
}
validation.validationConfig = setValidationConfig();

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
        // console.log( 'fieldValue', fieldValue );
        // validationService.setValue( validatorName, fieldValue );
        validationService.setValue( document.getElementsByName( validatorName )[ 0 ] );
    } );
    validationService.validateForm().then( function( result ) {
        console.log( 'validateForm success', result );
    } ).catch( function( result ) {
        console.log( 'validateForm fail', result );
    } );
} );

var addInputFieldBtn = document.getElementById( 'addInputFieldBtn' );

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

// validationService.setValue( 'fieldA', 'testsdfsdf.de' );
// validationService.setValue( 'fieldB', 'lorem ipsum' );
// validationService.validateForm().then( function( result ) {
//     console.log( 'validateForm success', result );
// } ).catch( function( result ) {
//     console.log( 'validateForm fail', result );
// } );

