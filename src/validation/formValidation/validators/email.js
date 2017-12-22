/**
 *
 * @param {String} value
 * @returns {Promise}
 */
export default function email( value ) {
    return new Promise( function( resolve, reject ) {
        // eslint-disable-next-line
        var regE = new RegExp( [ '^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)',
            '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
            // eslint-disable-next-line
            '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
            '[a-zA-Z]{2,}))$' ].join( '' ) );
        var valid = regE.test( value );

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
