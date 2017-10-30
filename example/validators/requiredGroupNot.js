validation.validators.requiredGroupNot = {};
validation.validators.requiredGroupNot.action = function( value, config ) {
    return new Promise( function( resolve, reject ) {

        var options;

        var valid = !value;
        if ( valid ) {
            options = {
                "feedbackDisplay": {
                    "fieldShowState": false
                }
            }
            resolve( {
                options: options,
                valid: valid
            } );
        } else {
            options = {
                "feedbackDisplay": {
                    "fieldShowState": true
                }
            }
            reject( {
                options: options,
                valid: valid,
                message: 'Do not check this field.'
            } );
        }
        // console.log( 'sent options', options );

    } );
}
