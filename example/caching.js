// validation cache off version
// validation.validationServiceConstructorParam.cache = {
//     getValue: function() {
//         return false;
//     },
//     setValue: function() {
//     }
// };

// validation cache (used to avoid unnecessary validations
validation.validationServiceConstructorParam.cache = {
    getValue: function( cacheKey ) {
        var fieldName = cacheKey.split( '.' )[ 1 ];
        if ( validation.cache.isCachingEnabled( fieldName ) ) {
            return validation.cache.data[ cacheKey ];
        } else {
            return false;
        }
    },
    setValue: function( cacheKey, cached ) {
        // console.log( 'cacheKey, cached', cacheKey, cached );
        this.data[ cacheKey ] = cached;
    },
    data: []
}

validation.cache = {};
validation.cache.isCachingEnabled = function( fieldName ) {
    var caching = false;
    var fieldDom = validation.getDomByIdentifier( fieldName );
    var objData = fieldDom.getAttribute( 'data-validation' );
    objData = JSON.parse( objData );
    if ( !objData.caching ) {
        Object.keys( validation.validationServiceConstructorParam.validationConfig[ fieldName ] ).
        forEach( function( key ) {
            try {
                if ( validation.validators[ key ].caching ) {
                    caching = true;
                    return;
                }
            } catch( error ) {
                console.log( 'error:', error );
                console.log( 'validation.validators', validation.validators );
                console.log( 'key', key );
            }
        } );
    } else {
        caching = true;
    }
    return caching;
};
