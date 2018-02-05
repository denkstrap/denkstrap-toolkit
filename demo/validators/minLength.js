validation.validators.minLength = function( value ) {
    return new Promise( function( resolve, reject ) {
        var valid = value === '' || value.length < 3 ? false : true;
        console.log( '### value', value, valid );
        if ( valid ) {
            resolve( {
                isValid: valid
            } );
        } else {
            reject( {
                isValid: valid,
                message: 'This field needs 3 characters minimum'
            } );
        }
    } );
}