validation.validators.checkbox = function( value ) {
    return new Promise( function( resolve, reject ) {
        var valid = value;
        if ( valid ) {
            resolve( {
                isValid: valid
            } );
        } else {
            reject( {
                isValid: valid,
                message: 'Enter a valid email, please.'
            } );
        }

    } );
}
