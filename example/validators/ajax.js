validation.validators.ajax = function( value, data ) {
    return new Promise( function( resolve, reject ) {
        var options = {};
        var validatorData = data[ 'validatorData' ];

        options.url = validatorData.url;
        options.data = data;

        options.method = 'post';

        options.data = JSON.stringify( options.data );

        fetch( options ).then( function( response ) {
            var data = JSON.parse( response.responseText );
            if ( data.isValid ) {
                resolve(
                    {
                        isValid: data.isValid
                    }
                );
            } else {

                var dataBack = {
                    isValid: data.isValid
                };

                if ( data.options && data.options.feedbackDisplay ) {
                    dataBack.feedbackDisplay = data.options.feedbackDisplay;
                }

                if ( data.message ) {
                    dataBack.message = data.message;
                }
                // console.log( 'dataBack', dataBack );

                reject(
                    dataBack
                );

            }
        } ).catch( function( response ) {
            // console.log( 'response catch', response );
            var options = {
                feedbackDisplay: {
                    fieldShowState: false
                }
            }
            resolve( {
                options: options,
                isValid: true,
                message: 'This field is mandatory.'
            } )
        } );
    } );
}