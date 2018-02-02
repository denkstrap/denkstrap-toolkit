/**
 * # The cache service
 *
 * This is a simple service for providing a cache system in the frontend. This
 * one is an object cache saving the values in an object. It will not be persitent
 * between requests.
 */
export class Cache {

    /**
     * @constructor
     */
    constructor() {
        this.cacheMap = {};
    }

    /**
     * Get a value from the cache
     *
     * @param {String} key
     * @return {mixed}
     */
    getValue( key ) {
        this.checkKey( key );

        if ( typeof this.cacheMap[ key ] === 'undefined' ) {
            throw new Error( 'Check cache via isCached method before trying to fetch a value' );
        }
        return this.cacheMap[ key ];
    }

    /**
     * Checks if a value is stored for the given key
     * Checking is not done via getValue method
     * reason: a value could be of type boolean and so not be handled proper
     * @param {String} key
     * @returns {Boolean}
     */
    isCached( key ) {
        this.checkKey( key );
        return this.cacheMap[ key ] ? true : false;
    }

    /**
     * Set a value
     *
     * @param {String} key
     * @param {mixed} value
     */
    setValue( key, value ) {
        this.checkKey( key );
        this.cacheMap[ key ] = value;
    }

    /**
     * Check for the type of the key
     *
     * @param {String} key
     * @throws {TypeError}
     */
    checkKey( key ) {
        if ( typeof key !== 'string' ) {
            throw new TypeError( 'Key must be a string' );
        }
    }
}
