import { Cache } from '../../src/cache/cache.service';

describe( 'Cache', function() {
    it( 'should return false on an empty cache object', function() {
        var cache = new Cache();
        expect( cache.isCached( 'name' ) ).toBe( false );
    } );

    it( 'should throw an error when the key is not a string', function() {
        var cache = new Cache();
        expect( function () { cache.getValue() } )
            .toThrowError( TypeError, 'Key must be a string' );
    } );

    it( 'should throw an error when key is not cached', function() {
        var cache = new Cache();
        expect( function () { cache.getValue( 'test' ) } )
            .toThrowError( Error, 'Check cache via isCached method before trying to fetch a value' );
    } );

    it( 'should return the cached object', function() {
        var cache = new Cache();
        var obj = { value: 'test' };
        cache.setValue( 'test', obj );
        expect( cache.getValue( 'test' ) ).toBe( obj );
    } );

    it( 'should return false if not cached', function() {
        var cache = new Cache();
        var obj = { value: 'test' };
        cache.setValue( 'test', obj );
        expect( cache.isCached( 'test' ) ).toBeTruthy();
    } );

} );
