validation.setGroupMessageBehavior = function() {
    var groups = validation.form.querySelectorAll( '[data-validation-feedback-group-display]' );
    Array.prototype.forEach.call( groups, function( group ) {
        var objData = group.getAttribute( 'data-validation-feedback-group-display' );
        objData = JSON.parse( objData );
        var groupFields = validation.form.querySelectorAll( objData.fieldSelector );
        var groupOkAry = [];
        var groupValidatedAry = [];

        Array.prototype.forEach.call( groupFields, function( field ) {
            var name = field.getAttribute( 'name' );
            var eventName = name + '-validated';
            var index;
            group.addEventListener( eventName, function ( event ) {
                if ( !event.detail.isValid ) {
                    var id = group.getAttribute( 'id' ) + '-message';
                    var message = document.getElementById( id );
                    if ( message !== null ) {
                        message.parentNode.removeChild( message );
                    }
                    validation.display.showValidMessage( field, objData.message, id );
                }

                if ( event.detail.isValid ) {
                    index = groupOkAry.indexOf( name );
                    if ( index === -1 ) {
                        groupOkAry.push( name );
                    }
                } else {
                    index = groupOkAry.indexOf( name );
                    if ( index !== -1 ) {
                        groupOkAry.splice( index, 1 );
                    }
                }
                if ( groupOkAry.length === groupFields.length ) {
                    console.log( 'group is valid', groupOkAry );
                    var id = group.getAttribute( 'id' ) + '-message';
                    var message = document.getElementById( id );
                    if ( message !== null ) {
                        message.parentNode.removeChild( message );
                    }
                }
                // index = groupValidatedAry.indexOf( name );
                // if ( index !== - 1 ) {
                //     groupValidatedAry.push( name );
                // }
                // console.log( 'get Event', event.detail, groupOkAry.length );


            }, true );
        } );
    } );
};

validation.setGroupMessageBehavior();