import condition from '../../../src/validation/formValidation/condition';
/** @test {condition} */

describe( 'condition', function() {

    beforeEach(function(){
        this.result = fixture.load( '/test/fixtures/form.html' );
    });

    /**
     * condition( field )
     */
    it( 'should throw an error when given parameter is not of type HTMLInputElement', function() {
        var field = document.getElementById( 'nameNOT-IN-DOM' );
        expect( function() {
            condition( field );
        }).toThrowError( TypeError );
    } );

    it( 'should give back condition as valid', function() {
        var field = document.getElementById( 'name' );
        expect( condition( field ) ).toBeTruthy();
    } );

    it( 'should give back condition as invalid', function() {
        var field = document.getElementById( 'nameHidden' );
        expect( condition( field ) ).not.toBeTruthy();
    } );

} );
