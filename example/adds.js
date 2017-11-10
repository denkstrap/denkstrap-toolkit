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

        // var config = getValidationConfig();
        // validation.configFields = config.fields;
        //
        // validation.validationServiceConstructorParam.validationConfig = config.service;
        // validationService.setConfig( config.service );
        //
        // validationService.setValueByField( document.getElementsByName( name )[ 0 ] );

        validationService.updateConfigAndValuesAndBehaviour();

        console.log( 'dyn config', validationService.config );
        console.log(  'validationService.data', validationService.validation.data );

    } );
}
