validation.validators.required = {};
validation.validators.required.action = function( value ) {
    return new Promise( function( resolve, reject ) {
        var valid = value === '' ? false : true;
        if ( valid ) {
            resolve( {
                valid: valid
            } );
        } else {
            reject( {
                valid: valid,
                message: 'This field is mandatory.'
            } );
        }
    } );
}
validation.validators.required.caching = false;