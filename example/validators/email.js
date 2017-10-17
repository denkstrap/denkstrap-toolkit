validation.validators.email = {};
validation.validators.email.action = function( value ) {
    return new Promise( function( resolve, reject ) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = re.test( value );
        if ( valid ) {
            resolve( {
                valid: valid
            } );
        } else {
            reject( {
                valid: valid,
                message: 'Enter a valid email, please.'
            } );
        }

    } );
}