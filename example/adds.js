var addInputFieldBtn = document.getElementById( 'addInputFieldBtn' );
if ( addInputFieldBtn !== null ) {
    var counter = 0;
    addInputFieldBtn.addEventListener( 'click', function() {
        counter++;
        var name = 'dynamic-field-required' + counter;
        var html = '<label for="' + name + '">' + name +
            '  </label>' +
            '<input name="' + name + '" id="' + name + '" ' +
            'data-validation=\'{' +
            '"required": { "message": "Required \\"' +
            name + '\\" not set" } }' +
            '\'' +
            '><br><br>';

        form.insertAdjacentHTML( 'afterbegin', html );
        validation.validationServiceConstructorParam.validationConfig = setValidationConfig();
        validationService.setConfig( validation.validationServiceConstructorParam.validationConfig );
        console.log( 'validation.validationServiceConstructorParam.validationConfig',
            validation.validationServiceConstructorParam.validationConfig );

    } );
}
