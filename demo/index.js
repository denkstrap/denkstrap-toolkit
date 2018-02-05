var options = {
    validators: {
        minLength: validation.validators.minLength,
        requiredGroupAny: validation.validators.requiredGroupAny,
        requiredGroupNot: validation.validators.requiredGroupNot,
        ajax: validation.validators.ajax
    },
    formId: 'form',
    caching: true
}

var validationService = new FormValidation(
    options );

validationService.init();

console.log( 'validationService', validationService );

validationService.setValues();

var form = document.getElementById( 'form' );

validation.setGroupMessageBehavior( form, validationService );

form.addEventListener( 'submit', function( event ) {
    event.preventDefault();

    validationService.validateForm().then( function( result ) {
        console.log( '----->validateForm success', result );
    } ).catch( function( result ) {
        console.log( '----->validateForm fail', result );
    } );
} );
//form.querySelectorAll( '[type="submit"]' )[ 0 ].click();






var options2 = {
    formId: 'form-2'
}

var validationService2 = new FormValidation(
    options2 );

validationService2.init();

console.log( 'validationService2', validationService2 );

validationService2.setValues();

var form2 = document.getElementById( 'form-2' );

validation.setFeedbackDisplayLayout( form2, validationService2 );

form2.addEventListener( 'submit', function( event ) {
    event.preventDefault();
    // console.log( '#submit', validationService.setValues );
    validationService2.validateForm().then( function( result ) {
        console.log( '----->validateForm success', result );
    } ).catch( function( result ) {
        console.log( '----->validateForm fail', result );
    } );
} );
// form2.querySelectorAll( '[type="submit"]' )[ 0 ].click();
