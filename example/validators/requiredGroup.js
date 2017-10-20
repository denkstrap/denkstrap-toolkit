validation.validators.requiredGroup = {};
validation.validators.requiredGroup.action = function( value ) {
    return new Promise( function( resolve, reject ) {
        var valid = value.trim() === '' ? false : true;
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
