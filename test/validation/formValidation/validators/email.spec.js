import required from '../../../../src/validation/formValidation/validators/email';

/** @test {Cache} */

describe( 'Validator', function() {

    beforeEach( function() {
        this.result = fixture.load( '/test/fixtures/form.html' );
    } );


    describe( 'required( value )', function() {

        it( 'should turn back value "frank.uekermann@denkwerk.com" as { isValid: true }', function( done ) {

            var expectedObj = { isValid: true };

            var value = 'frank.uekermann@denkwerk.com';

            var validator = required( value );

            validator.then( function( result ) {
                expect( result.isValid ).toBe( expectedObj.isValid );
                done();
            } );


        } );

        it( 'should turn back value "frank.uekermann@denkwerk" as { isValid: false }', function( done ) {

            var expectedObj = { isValid: false };

            var value = 'frank.uekermann@denkwerk';

            var validator = required( value );

            validator.then( function( result ) {
            } ).catch( function( result ) {
                expect( result.isValid ).toBe( expectedObj.isValid );
                done();
            } );

        } );

    } );



} );
