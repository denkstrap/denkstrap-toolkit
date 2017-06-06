export class Cache {
    constructor() {
        this.cacheMap = {};
    }

    getValue( key ) {
        this.checkKey( key );

        return this.cacheMap[ key ] || false;
    }

    setValue( key, value ) {
        this.checkKey( key );

        this.cacheMap[ key ] = value;
    }

    checkKey( key ) {
        if ( typeof key !== 'string' ) {
            throw new TypeError( 'Key must be a string' );
        }
    }
}
