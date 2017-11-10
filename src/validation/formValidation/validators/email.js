export default function email( value ) {
    return new Promise( function( resolve, reject ) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = re.test( value );
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