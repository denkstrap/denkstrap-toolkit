/**
 * This Class provides cache functionality to avoid doubled validation
 *
 */
export class Cache {

    /**
     * @constructor
     * @param {String} validationAttr - validation attr (where validation data is stored)
     */
    constructor( validationAttr ) {
        if ( typeof validationAttr !== 'string' ) {
            throw new TypeError( 'validationAttr must be of type String' );
        }
        this.validationAttr = validationAttr;
    }

    /**
     * Validation cache off version
     *
     * @return {{getValue: getValue, setValue: setValue}}
     */
    getValidationOffCache() {
        return {
            getValue: function() {
                return false;
            },
            setValue: function() {
            }
        };
    }

    /**
     * validation cache (used to avoid unnecessary validations
     * @returns {{getValue: (function(this:Cache)), setValue: setValue, data: Array}}
     */
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

    /**
     *
     * @param {String} fieldName
     * @returns {boolean}
     */
    isCachingEnabled( fieldName ) {
        var fieldDom = document.getElementById( fieldName );
        var objData = fieldDom.getAttribute( this.validationAttr );
        objData = JSON.parse( objData );
        return objData.caching ? true : false;
    }

}
