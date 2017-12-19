/**
 * This Class provides display functionality.
 * Is handles display of error messages and validation states of each field.
 *
 */
export class FeedbackDisplay {

    /**
     * @param {Object} options {@link getOptions}
     */
    constructor( options ) {
        /**
         * The general feedback display options.
         * {@link getOptions}
         * @type {Object}
         */
        if ( typeof options !== 'undefined' ) {
            this.options = Object.assign( this.getOptions(), options );
            if ( typeof this.options.fieldErrorClass !== 'string' ) {
                throw new TypeError( 'option fieldErrorClass is not of type String' );
            }
            if ( typeof this.options.fieldSuccessClass !== 'string' ) {
                throw new TypeError( 'option fieldSuccessClass is not of type String' );
            }
            if ( typeof this.options.messageTemplate !== 'string' ) {
                throw new TypeError( 'option messageTemplate is not of type String' );
            }
            if ( this.options.messageCreateFunction !== null &&
                typeof this.options.messageCreateFunction !== 'function' ) {
                throw new TypeError( 'optionmessageCreateFunction is not of type Null or Function' );
            }
        } else {
            this.options = this.getOptions();
        }
    }

    /**
     *
     * @return {Object}
     * @property {String} [fieldErrorClass='validation-error']
     * @property {String} [fieldSuccessClass='validation-success']
     * @property {String} [messageTemplate=look at getOptions-src-code, could not escape curly braces]
     * @property {Function} [messageCreateFunction=null]
     */
    getOptions() {
        return {
            fieldErrorClass: 'validation-error',
            fieldSuccessClass: 'validation-success',
            messageTemplate: '<p id="{{ id }}" class="validation-message" aria-live="assertive" role="alert">' +
            '<label for="{{ id-for }}">{{ message }}</label></p>',
            messageCreateFunction: null
        }
    }

    /**
     * The Default display options for each field.
     * @return {Object} This data is used in {@link getValidationFieldConfig}.
     *
     * @property {Boolean} fieldShowState : true - Sets display actions concerning each field directly.
     * Shows state on true, removes state on false.
     * @property {Boolean} messageShow : true - Enables displaying of message of field.
     * Shows message on true and invalid result.
     *
     * @property {null} messageLocation : null
     * @property {null} fieldIdForAriaUsage : null
     *
     * @property {Boolean} preferHTMLValidatorMessage : true - Enables prefering message given in HTML over message
     * given by validator.
     *
     * @property {Object} setByValidatorOnly - Set by validator. Usage does not depend on validation result.
     * These declarations are taken to operate field state actions.
     * @property {null} setByValidatorOnly.fieldShowStateValidSel -
     * The given validator should sent a valid CSS selector String.
     * @property {null} setByValidatorOnly.fieldShowStateInvalidSel -
     * The given validator should sent a valid CSS selector String.
     * @property {null} setByValidatorOnly.fieldRemoveStateSel -
     * The given validator should sent a valid CSS selector String.
     */
    static getDefaultFieldOptions() {
        return {
            // importance depend on validation results
            fieldShowState: true, // Shows state on true, Removes state on false
            messageShow: true, // Shows message on true and invalid result

            messageLocation: null,
            fieldIdForAriaUsage: null,

            preferHTMLValidatorMessage: true,

            // this is set by validator
            // does not depend on validation result
            setByValidatorOnly: {
                fieldShowStateValidSel: null,
                fieldShowStateInvalidSel: null,
                fieldRemoveStateSel: null
            }

        }
    }

    /**
     * Manages aria status of field (WCAG).
     * @see https://www.w3.org/TR/WCAG20-TECHS/ARIA21.html
     * used only if validation result is false
     * @param {Object} field - Reference to dom object.
     * @param {String|null} fieldIdForAriaUsage - This could be necessary to define
     * if one message is used for several form fields.
     */
    setStatusInvalidAria( field, fieldIdForAriaUsage ) {
        var fieldUse = field;
        if ( fieldIdForAriaUsage !== null ) {
            fieldUse = document.getElementById( fieldIdForAriaUsage );
        }
        var id = this.getMessageId( fieldUse );
        field.setAttribute( 'aria-invalid', 'true' );
        field.setAttribute( 'aria-describedby', id );
    }

    /**
     * Manages aria status of field (WCAG).
     * @see https://www.w3.org/TR/WCAG20-TECHS/ARIA21.html
     * @param {Object} field - Dom reference.
     */
    removeStatusAria( field ) {
        field.removeAttribute( 'aria-invalid' );
        field.removeAttribute( 'aria-describedby' );
    }

    /**
     * Removes status classes and aria attributes of a field.
     * @param {Object} field Reference to dom object.
     */
    removeStatus( field ) {
        field.classList.remove( this.options.fieldErrorClass );
        field.classList.remove( this.options.fieldSuccessClass );
        this.removeStatusAria( field );
    }

    /**
     *
     * @param {Object} field Dom reference of field.
     * @param {Boolean} valid The status type handle.
     * @param {String} fieldIdForAriaUsage
     */
    setStatus( field, valid, fieldIdForAriaUsage ) {
        var validErrorClass = this.options.fieldErrorClass;
        var validSuccessClass = this.options.fieldSuccessClass;
        if ( valid ) {
            field.classList.add( validSuccessClass );
            field.classList.remove( validErrorClass );
            this.removeStatusAria( field );
        } else {
            field.classList.add( validErrorClass );
            field.classList.remove( validSuccessClass );
            this.setStatusInvalidAria( field, fieldIdForAriaUsage );
        }
    }

    /**
     *
     * @param {String} selector - CSS selector.
     * @param {Boolean} status - The status to show.
     */
    setStatusBySelector( selector, status ){
        if ( selector !== null ) {
            var fields = document.querySelectorAll( selector );
            Array.prototype.forEach.call( fields, function( field ) {
                this.setStatus( field, status, null );
            }.bind( this ) );
        }
    }


    /**
     * Removes staus classes and aria attributes of dom elements.
     * @param {String} selector - CSS selector to get dom element list.
     */
    removeStatusBySelector( selector ){
        if ( selector !== null ) {
            var fields = document.querySelectorAll( selector );
            Array.prototype.forEach.call( fields, function( field ) {
                this.removeStatus( field );
            }.bind( this ) );
        }
    }

    /**
     * Returns the message id.
     * @param {Object} field - Reference to dom element.
     * @return {String}
     */
    getMessageId( field ) {
        return 'validation-message-' + field.id;
    }

    /**
     *
     * @param {Object} field - Reference to dom element.
     * @returns {Object} - Reference to dom element.
     */
    getDefaultInsertLoc( field ) {
        var attr = field.getAttribute( 'type' );
        var insertLoc = attr !== 'checkbox' && attr !== 'radio' ? field.previousElementSibling || field : field.parentNode;
        return insertLoc;
    }

    /**
     * Checks messageLocation data for its validity
     * @example
     * "messageLocation": [ { "minWidth": 0, "insertTargetSelector": "[for=\"nameWithFeedbackDisplay\"]" } ]
     * @param messageLocation
     */
    static checkMessageLocationDataFormat( messageLocation ) {

        if ( messageLocation !== null && !Array.isArray( messageLocation ) ) {
            throw new TypeError( 'messageLocation should be null or of type Array' )
        }

        if ( Array.isArray( messageLocation ) ) {
            var length = messageLocation.length;
            var bP;
            for ( var i = 0; i < length; i++ ) {
                bP = messageLocation[ i ];

                if ( typeof bP.minWidth !== 'number' ) {
                    throw new TypeError( 'messageLocation needs for each entry a minWidth property of type Number' );
                }

                if ( typeof bP.insertTargetSelector !== 'string' ) {
                    throw new TypeError( 'messageLocation needs for each entry ' +
                        'a insertTargetSelector property of type String' );
                }

                var insertLoc = document.querySelector( bP.insertTargetSelector );
                if ( typeof insertLoc === null ) {
                    throw new TypeError( 'messageLocation needs for each entry a insertTargetSelector not resulting in null' );
                }

            }
        }
    }

    /**
     *
     * @param {Object} messageLocation
     * @returns {Object|null} - Breakpoint depended message location data.
     * If breakpoint is matched all properties defined in HTML for this breakpoint (via min-width property)
     * are returned.
     * @example
     * {
     * "minWidth": 750,
     * "insertTargetSelector": "#name-name-second-insert-point",
     * "layoutContainerIdOuter": "#validation-message-layout-name-name-second",
     * "layoutContainerIdNrInner": 1
     * }
     */
    getBreakpointMessageInfoLocationData( messageLocation ) {
        var validBp = null;
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

        return validBp;
    }

    /**
     * Manages where to place the validator message.
     * @param {Object} field - Reference to dom element.
     * @param {Object} messageLocation
     * @returns {Object}
     * @property {Object} insertLoc - Reference to dom element.
     * @property {Object} breakpointData {@link getBreakpointMessageInfoLocationData}
     */
    getMessageInsertLocationData( field, messageLocation ) {
        var validBp = this.getBreakpointMessageInfoLocationData( messageLocation );
        var insertLoc;

        var infoData = {};

        if ( validBp !== null ) {
            insertLoc = document.querySelector( validBp.insertTargetSelector );
        }

        if ( validBp === null || insertLoc === null ) {
            insertLoc = this.getDefaultInsertLoc( field );
        }

        infoData.insertLoc = insertLoc;
        infoData.breakpointData = validBp;

        return infoData;
    }

    /**
     * Removes message and according aria attribute of given field.
     * @param {Object} field - Reference to dom element.
     */
    removeMessageAndAccordingAriaAttrOfField( field ) {
        var message = document.getElementById( this.getMessageId( field ) );
        if ( message !== null ) {
            message.parentNode.removeChild( message );
            field.removeAttribute( 'aria-describedby' );
        }
    }

    /**
     *
     * @param {Object} field - Reference to dom element.
     * @param {String} message - The error message.
     * @param messageLocation
     */
    showMessage( field, message, messageLocation ) {
        this.removeMessageAndAccordingAriaAttrOfField( field );
        var html = this.options.messageTemplate.replace( '{{ id }}',
            this.getMessageId( field ) ).replace( '{{ id-for }}', field.id )
            .replace( '{{ message }}', message );

        var insertLocData = this.getMessageInsertLocationData( field, messageLocation );

        if ( typeof this.options.messageCreateFunction === 'function' ) {
            this.options.messageCreateFunction( insertLocData, html );
        } else {
            insertLocData.insertLoc.insertAdjacentHTML( 'beforebegin', html );
        }
    }

}
