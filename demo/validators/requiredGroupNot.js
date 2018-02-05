validation.validators.requiredGroupNot = function( value ) {
    return new Promise( function( resolve, reject ) {

        var options;

        var valid = !value;
        if ( valid ) {
            options = {
                feedbackDisplay: {
                    "fieldShowState": false
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
                message: 'Do not check this field.'
            } );
        }
        // console.log( 'sent options', options );

    } );
}
