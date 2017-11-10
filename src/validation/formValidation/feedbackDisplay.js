/**
 * This Class provides display functionality
 *
 */
export class FeedbackDisplay {

    /**
     * @param {Object}
     * @constructor
     */
    constructor( options ) {
        this.options = Object.assign( this.getOptions(), options );
    }

    getOptions() {
        var opt = {
            fieldErrorClass: 'validation-error',
            fieldSuccessClass: 'validation-success',
            messageTemplate:'<p id="{{ id }}" class="validation-message" aria-live="assertive" role="alert"><label for="{{ id-for }}">{{ message }}</label></p>',
            messageCreateFunction: null
        };
        return opt;
    }

    removeValidStatus( field ) {
        field.classList.remove( this.options.fieldErrorClass );
        field.classList.remove( this.options.fieldSuccessClass );
        this.removeValidStatusAria( field );
    }

    setValidStatus( field, valid, messageUseMessageOfFieldSel ) {
        var validErrorClass = this.options.fieldErrorClass;
        var validSuccessClass = this.options.fieldSuccessClass;
        var id = field.id; // TODO
        var idLocal = field.id;
        if ( valid ) {
            if ( idLocal === id ) {
                field.classList.add( validSuccessClass );
            }
            field.classList.remove( validErrorClass );
            this.removeValidStatusAria( field );
        } else {
            field.classList.add( validErrorClass );
            field.classList.remove( validSuccessClass );
            this.setValidStatusAria( field, messageUseMessageOfFieldSel );
        }
 }

    removeValidStatusAria( field ) {
        field.removeAttribute( 'aria-invalid' );
        field.removeAttribute( 'aria-describedby' );
    }


    setValidStatusAria( field, messageUseMessageOfFieldSel ) {
        var field = field;
        var fieldUse = field;
        var id;
        if  ( messageUseMessageOfFieldSel !== null ) {
            fieldUse = document.querySelector( messageUseMessageOfFieldSel );
        }
        id = this.getMessageId( fieldUse );
        field.setAttribute( 'aria-invalid', 'true' );
        field.setAttribute( 'aria-describedby', id );
    }


    getMessageId( field ) {
        return 'validation-message-' + field.id;
    }

    getDefaultInsertLoc( field ) {
        var attr = field.getAttribute( 'type' );
        var insertLoc = attr !== 'checkbox' && attr !== 'radio' ? field.previousElementSibling || field : field.parentNode;
        return insertLoc;
    }

    getMessageInfoData( field, messageLocation ) {
        var validBp = null;
        var insertLoc;
        if ( messageLocation !== null ) {
            var length = messageLocation.length;
            var matchMedia;
            var bP;
            for ( var i = 0; i < length; i++ ) {
                bP = messageLocation[ i ];
                matchMedia = '(min-width:' + bP.minWidth + 'px)';
                if ( window.matchMedia( matchMedia ).matches ) {
                    validBp = bP;
                }
            }
        }

        var infoData = {};

        if ( validBp !== null ) {
            insertLoc = document.querySelector( validBp.insertTargetSelector );
            infoData = validBp;
        }

        if ( validBp === null || insertLoc === null ) {
            insertLoc = this.getDefaultInsertLoc( field );
        }

        infoData.insertLoc = insertLoc;
        return infoData;
    }

    removeValidMessage( field ) {
        var id = this.getMessageId( field );
        var message = document.getElementById( id );
        if ( message !== null ) {
            message.parentNode.removeChild( message );
        }
    }

    showValidMessage( field, message, messageLocation ) {
        this.removeValidMessage( field );
        var id = typeof id === 'undefined' ? this.getMessageId( field ) : id;
        var html = this.options.messageTemplate.replace( '{{ id }}', id ).replace( '{{ id-for }}', field.id ).replace( '{{ message }}', message );

        var messageInfoData = this.getMessageInfoData( field, messageLocation );
        var insertLoc = messageInfoData.insertLoc;

        if ( typeof this.options.messageCreateFunction === 'function' ) {
            this.options.messageCreateFunction( messageInfoData, html );
        } else {
            insertLoc.insertAdjacentHTML( 'beforebegin', html );
        }
    }


}
