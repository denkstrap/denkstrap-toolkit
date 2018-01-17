import required from '../../../../src/validation/formValidation/validators/required';

/** @test {Cache} */

describe( 'Validator', function() {

    beforeEach( function() {
        this.result = fixture.load( '/test/fixtures/form.html' );
    } );


    describe( 'required( value )', function() {

        it( 'should turn back value "something" as { isValid: true }', function( done ) {

            var expectedObj = { isValid: true };

            var fieldId = 'name';
            var value = 'something';

            var validator = required( value );

            validator.then( function( result ) {
                expect( result.isValid ).toBe( expectedObj.isValid );
                done();
            } );


        } );

        it( 'should turn back value "" as { isValid: false }', function( done ) {

            var expectedObj = { isValid: false };

            var fieldId = 'name';
            var field = document.getElementById( fieldId );
            var value = field.value;

            var validator = required( value );

            validator.then( function( result ) {
            } ).catch( function( result ) {
                expect( result.isValid ).toBe( expectedObj.isValid );
                done();
            } );

        } );

    } );



} );
