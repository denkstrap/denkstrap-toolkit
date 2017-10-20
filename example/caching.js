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
    var fieldDom = document.getElementsByName( fieldName )[ 0 ];
    var objData = fieldDom.getAttribute( 'data-validation' );
    objData = JSON.parse( objData );
    if ( !objData.caching ) {
        Object.keys( validation.validationServiceConstructorParam.validationConfig[ fieldName ] ).forEach( function( key ) {
            if ( validation.validators[ key ].caching ) {
                caching = true;
                return;
            }
        } );
    } else {
        caching = true;
    }
    return caching;
};
