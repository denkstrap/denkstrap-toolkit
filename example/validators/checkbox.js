validation.validators.checkbox = function( value ) {
    return new Promise( function( resolve, reject ) {
        var valid = value;
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