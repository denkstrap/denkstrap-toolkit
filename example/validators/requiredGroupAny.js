validation.validators.requiredGroupAny = {};
validation.validators.requiredGroupAny.action = function( value, config ) {
    return new Promise( function( resolve, reject ) {

        var groupMemberEls = document.querySelectorAll( config.requiredGroupAny.options.groupMemberSel );

        var otherValid = false;
        if ( !value ) {
            Array.prototype.forEach.call( groupMemberEls, function( field ) {
                otherValid = !otherValid && !field.checked ? false : true;
            } );
        }

        var options;

        var valid = value || otherValid;
        if ( valid ) {
            options = {
                "feedbackDisplay": {
                    "fieldShowState": value
                }
            }
            resolve( {
                options: options,
                valid: valid
            } );
        } else {
            options = {
                "feedbackDisplay": {
                    "fieldShowState": true
                }
            }
            reject( {
                options: options,
                valid: valid,
                message: 'This field is mandatory.'
            } );
        }
        // console.log( 'sent options', options );

    } );
}
