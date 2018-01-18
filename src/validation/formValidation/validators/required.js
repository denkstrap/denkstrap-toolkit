/**
 * The required validator.
 * @param {String} value
 * @returns {Promise}
 */
export default function required( value ) {
    return new Promise( function( resolve, reject ) {
        var valid = typeof value === 'string' && value !== '' ? value.trim() === '' ? false : true : value;

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
