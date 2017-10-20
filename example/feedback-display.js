validation.display = {};

validation.display.getGroupByNameFields = function( field ) {
    var name = field.getAttribute( 'name' );
    return document.getElementsByName( name );
};

validation.display.setGroupByNameAction = function( field, action ) {
    Array.prototype.forEach.call( validation.display.getGroupByNameFields( field ), function( groupMember ) {
        action( groupMember );
    } );
};

validation.display.setValidStatus = function( field, valid ) {
    var validErrorClass = 'validation-error';
    var validSuccessClass = 'validation-success';
    var id = field.getAttribute( 'id' );
    validation.display.setGroupByNameAction( field, function( field ) {
        var idLocal = field.getAttribute( 'id' );
        if ( valid ) {
            if ( idLocal === id ) {
                field.classList.add( validSuccessClass );
            }
            field.classList.remove( validErrorClass );
        } else {
            field.classList.add( validErrorClass );
            field.classList.remove( validSuccessClass );
        }
    } )
};

validation.display.getMessageId = function( field ) {
    return 'validation-message-' + field.getAttribute( 'name' );
};

validation.display.getMessageInsertLocation = function( field ) {
    var fieldName = field.getAttribute( 'name' );
    var configField = validation.configFields[ fieldName ];
    var validBp = null;
    var insertLoc;
    if ( configField.feedbackDisplay.messageLocation !== null ) {
        var length = configField.feedbackDisplay.messageLocation.length;
        var matchMedia;
        for ( var i = 0; i < length; i++ ) {
            validBp = configField.feedbackDisplay.messageLocation[ i ];
            // console.log( 'validBp', validBp, i );
            matchMedia = '(min-width:' + validBp.minWidth + ')';
            if ( window.matchMedia( matchMedia ).matches ) {
                break;
            }
        }
    }

    if ( validBp !== null ) {
        // console.log( 'validBp.insertTargetSelector', validBp.insertTargetSelector );
        insertLoc = document.querySelector( validBp.insertTargetSelector );
    }

    if ( validBp === null || insertLoc === null ) {
        var attr =  field.getAttribute( 'type' );
        insertLoc = attr !== 'checkbox' && attr !== 'radio' ? field : field.parentNode;
    }

    return insertLoc;
};

validation.display.showValidMessage = function( field, message, id ) {
    validation.display.removeValidMessage( field );
    var id = typeof id === 'undefined' ? validation.display.getMessageId( field ) : id;
    var  html = '<p class="validation-message" ' +
        'id="' +
        id +
        '"' +
        '>' +
        message +
        '</p>';
    var insertLoc = validation.display.getMessageInsertLocation( field );
    insertLoc.insertAdjacentHTML( 'beforebegin', html );
};

validation.display.removeValidMessage = function( field ) {
    var id = validation.display.getMessageId( field );
    var message = document.getElementById( id );
    if ( message !== null ) {
        message.parentNode.removeChild( message );
    }
};
