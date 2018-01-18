import getValidationFields from './getValidationFields';

/**
 * The behaviour function provides cases for to trigger validations.
 * Handlers are stored to consider dynamic dom manipulating.
 */
export class Behaviour {

    /**
     *
     * @param {String} formId - The id of the form.
     * @param {String} validationAttr
     * @param {Function} condition - The condition for to collect the validating fields
     * @param {Object} configFields - The config of fields
     * @param {Object} validation  - The validation service object
     */
    constructor( formId, validationAttr, condition, configFields, validation ) {

        if ( typeof formId !== 'string' ) {
            throw new TypeError( 'form id must be of type String' );
        }

        if ( typeof condition !== 'function' ) {
            throw new TypeError( 'formId must be of type function' );
        }

        if ( typeof configFields !== 'object' ) {
            throw new TypeError( 'configFields must be of type function' );
        }

        if ( typeof validation !== 'object' ) {
            throw new TypeError( 'validation must be of type object' );
        }

        /**
         *
         * @type {String}
         */
        this.formId = formId;

        /**
         * @type {String}
         */
        this.validationAttr = validationAttr;

        /**
         *
         * @type {Function}
         */
        this.condition = condition;
        /**
         * @type{Object} validation
         */
        this.validation = validation;
        /**
         *
         * @type {Object} configFields
         */
        this.configFields = configFields;

        /**
         * @type {Object} The field event handlers are stored in this object ({@link behaviour}).
         */
        this.behaviourHandler = {};
    }

    /**
     * Updates the configFields property
     * @param {configFields} configFields - The config of fields
     * @param {Object} validation - The validation service object
     */
    updateConfigFieldsAndValidation( configFields, validation ) {
        this.configFields = configFields;
        this.validation = validation;
    }

    /**
     * The behaviour for each field
     */
    behaviour() {
        var fields = getValidationFields( this.formId, this.validationAttr, this.condition );
        Array.prototype.forEach.call( fields, function( field ) {
            var type = field.getAttribute( 'type' );
            var tagName = field.tagName.toLowerCase();
            var eventName = type !== 'checkbox' && type !== 'radio' && tagName !== 'select' ? 'blur' : 'change';

            if ( typeof this.behaviourHandler[ field.id ] !== 'undefined' ) {
                field.removeEventListener( eventName, this.behaviourHandler[ field.id ] );
            }

            /**
             * Creates field event handler
             */
            var handler = function() {
                var fieldIdentifier = field.id;
                this.validation.setValueByField( field );
                this.validation.validate( fieldIdentifier, this.formId ).catch( function() {} );
                if ( this.configFields[ fieldIdentifier ].groupSel !== null ) {

                    fields = document.querySelectorAll( this.configFields[ fieldIdentifier ].groupSel );
                    Array.prototype.forEach.call( fields, function( field ) {
                        var fieldIdentifierGroupMember = field.id;
                        if ( fieldIdentifierGroupMember !== fieldIdentifier ) {
                            this.validation.setValueByField( field );
                            this.validation.validate( fieldIdentifierGroupMember, this.formId )
                                .catch( function() {} );
                        }
                    }.bind( this ) );

                }
            }.bind( this );

            this.behaviourHandler[ field.id ] = handler;
            field.addEventListener( eventName,  handler );
        }.bind( this ) );
    }
}

