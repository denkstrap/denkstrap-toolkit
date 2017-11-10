export default function required( value ) {
    return new Promise( function( resolve, reject ) {
        var valid;
        if ( typeof value === 'string' ) {
            valid = value.trim() === '' ? false : true;
        } else {
            valid = value;
        }

        if ( valid ) {
            resolve( {
                isValid: valid
            } );
        } else {
            reject( {
                isValid: valid,
                message: 'This field is mandatory.'
            } );
        }
    } );
}