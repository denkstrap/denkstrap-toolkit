import {Cache as CacheService} from '../../cache/cache.service';
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
        var cache = Object.assign( new CacheService(), {
            isCached: function( cacheKey ) {
                var fieldName = cacheKey.split( '.' )[ 1 ];
                cache.checkKey( cacheKey );
                var test = this.isCachingEnabled( fieldName ) && cache.cacheMap[ cacheKey ] ? true : false;
                return this.isCachingEnabled( fieldName ) && cache.cacheMap[ cacheKey ] ? true : false;
            }.bind( this )
        } );
        return cache;
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
        /* must have value false to prevent taking undefined as false (no coercion) */
        return objData.caching === false ? false : true;
    }


}
