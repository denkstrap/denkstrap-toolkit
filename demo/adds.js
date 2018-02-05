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
            '"validators": { "required": { "message": "Required \\"' +
            name + '\\" not set" } } }' +
            '\'' +
            '><br><br>';

        form.insertAdjacentHTML( 'afterbegin', html );
        validationService.updateConfigAndValuesAndBehaviour();
    } );
}
