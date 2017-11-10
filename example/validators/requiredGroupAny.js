validation.validators.requiredGroupAny = function( value, config ) {
    return new Promise( function( resolve, reject ) {

        // console.log( 'config', config );
        // console.log( 'value', value );
        //var groupMemberEls = document.querySelectorAll( config.requiredGroupAny.options.groupMemberSel );

        var otherValid = false;
        // if ( !value ) {
        //     Array.prototype.forEach.call( groupMemberEls, function( field ) {
        //         otherValid = !otherValid && !field.checked ? false : true;
        //     } );
        // }


        config.addInfo.groupMembers.forEach( function( el ) {
            var field = document.getElementById( el.identifier );
            // console.log( 111, el.identifier, field.checked );
            otherValid = !otherValid && !field.checked ? false : true;
        }.bind( this ) );

        var options;

        // console.log( 'otherValid', otherValid, 'value', value );

        var valid = value || otherValid;
        if ( valid ) {
            options = {
                "feedbackDisplay": {
                    "fieldShowState": value
                }
            }
            resolve( {
                options: options,
                isValid: valid
            } );
        } else {
            options = {
                "feedbackDisplay": {
                    "fieldShowState": true
                }
            }
            reject( {
                options: options,
                isValid: valid,
                message: 'This field is mandatory.'
            } );
        }
        // console.log( 'sent options', options );

    } );
}
