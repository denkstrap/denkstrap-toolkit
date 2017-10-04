validation.validators.zip = function( value ) {
    return new Promise( function( resolve, reject ) {
        var options = {};
        options.url = 'simulate-backend-scripts/validation.php?value=' + value;
        options.method = 'get';

        fetch( options ).then( function( response ) {
            var data = JSON.parse( response.responseText );
            if ( data.isValid ) {
                resolve(
                    {
                        isValid: data.isValid
                    }
                );
            } else {
                reject(
                    {
                        isValid: data.isValid
                    }
                );

            }
        } ).catch( function( response ) {
            resolve(
                {
                    isValid: true
                }
            );
        } );
    } );
}