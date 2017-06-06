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

        return this.cacheMap[ key ] || false;
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
