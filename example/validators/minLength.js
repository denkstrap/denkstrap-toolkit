validation.validators.minlength = {};
validation.validators.minlength.action = function( value ) {
    return new Promise( function( resolve, reject ) {
        var valid = value === '' || value.length < 3 ? false : true;
        if ( valid ) {
            resolve( {
                valid: valid
            } );
        } else {
            reject( {
                valid: valid,
                message: 'This field needs 3 characters minimum'
            } );
        }
    } );
}