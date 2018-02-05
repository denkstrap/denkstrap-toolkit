validation.validators.requiredGroupAny = function( value, config ) {
    return new Promise( function( resolve, reject ) {
        var otherValid = false;

        config.groupData.forEach( function( el ) {
            var field = document.getElementById( el.id );
            // console.log( 111, el.identifier, field.checked );
            otherValid = !otherValid && !field.checked ? false : true;
        }.bind( this ) );

        var options;

        var valid = value || otherValid;
        if ( valid ) {
            options = {
                feedbackDisplay: {
                    "fieldShowState": value
                }
            }
            resolve( {
                options: options,
                isValid: valid
            } );
        } else {
            options = {
                feedbackDisplay: {
                    "fieldShowState": true
                }
            }
            reject( {
                options: options,
                isValid: valid,
                message: 'This field is mandatory.'
            } );
        }
    } );
}
