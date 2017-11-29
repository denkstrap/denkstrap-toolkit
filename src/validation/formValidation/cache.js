/**
 * This Class provides cache functionality to avoid doubled validation
 *
 */
export class Cache {

    /**
     * @constructor
     */
    constructor() {
    }

    // validation cache off version
    getValidationOffCache() {
        return {
            getValue: function() {
                return false;
            },
            setValue: function() {
            }
        };
    }

    // validation cache (used to avoid unnecessary validations
    getValidationCache() {
        return {
            getValue: function( cacheKey ) {
                var fieldName = cacheKey.split( '.' )[ 1 ];
                if ( this.isCachingEnabled( fieldName ) ) {
                    return this.data[ cacheKey ];
                } else {
                    return false;
                }
            }.bind( this ),
            setValue: function( cacheKey, cached ) {
                this.data[ cacheKey ] = cached;
            },
            data: []
        };
    }

    isCachingEnabled( fieldName ) {
        var fieldDom = document.getElementById( fieldName );
        var objData = fieldDom.getAttribute( 'data-validation' );
        objData = JSON.parse( objData );
        return objData.caching ? true : false;
    }

}
