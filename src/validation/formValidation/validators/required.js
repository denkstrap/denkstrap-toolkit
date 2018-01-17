/**
 * The required validator.
 * @param {Boolean|undefined} value
 * @returns {Promise}
 */
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
                isValid: true
            } );
        } else {
            reject( {
                isValid: false,
                message: 'This field is mandatory.'
            } );
        }
    } );
}
