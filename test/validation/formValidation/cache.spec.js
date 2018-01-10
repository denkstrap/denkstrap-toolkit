import {Cache} from '../../../src/validation/formValidation/cache';

/** @test {Behaviour} */

describe( 'Cache', function() {

    beforeEach(function(){
        this.result = fixture.load( '/test/fixtures/form.html' );
    });


    describe( 'constructor( validationAttr )', function() {

        it( 'should throw an error on wrong validationAttr type', function() {
            expect( function() {
                var cache = new Cache( 1 );
            } ).toThrowError( TypeError );
        } );

        //this.options.caching ? new Cache( this.options.validationAttr ).getValidationCache() : new Cache().getValidationOffCache(),

    } );

    describe( 'getValidationCache()', function() {
    
        it( 'should cache the value', function() {

            var fieldId = 'name';
            var formId = 'form';
            var field = document.getElementById( fieldId );
            field.value = 'test';
            var cacheKey = formId + '.' + fieldId;
            var cached = field.value;
            var cache = new Cache( 'data-validation' );

            var validationCache = cache.getValidationCache();

            validationCache.setValue( cacheKey, cached );

            // return validationCache.getValue( cacheKey );
            expect( validationCache.getValue( cacheKey )).toEqual( cached );
        } );


        it( 'should not cache the value', function() {
        
            var fieldId = 'nameWithFeedbackDisplay';
            var formId = 'form';
            var field = document.getElementById( fieldId );
            field.value = 'test';
            var cacheKey = formId + '.' + fieldId;
            var cached = field.value;
            var cache = new Cache( 'data-validation' );
        
            var validationCache = cache.getValidationCache();
        
            validationCache.setValue( cacheKey, cached );
            expect( validationCache.getValue( cacheKey )).toEqual( false );
        } );
        
    } );

} );
