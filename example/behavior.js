validation.setBehavior = function() {
    var fields = validation.getValidationFields();
    Array.prototype.forEach.call(fields, function( field ) {
        field.addEventListener( 'blur', function() {
            var  fieldName = field.getAttribute( 'name' );
            validationService.setValue( fieldName, field.value );
            validationService.validate( fieldName, 'form' ).catch( function() {});
        } );
    } );
};