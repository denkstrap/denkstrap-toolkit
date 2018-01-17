/**
 * The required validator.
 * @param {String} value
 * @returns {Promise}
 */
export default function required( value ) {
    return new Promise( function( resolve, reject ) {
        var valid = value !== '' ? value.trim() === '' ? false : true : false;

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
