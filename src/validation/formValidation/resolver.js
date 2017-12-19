import dispatchEvent from './dispatchEvent';

/**
 * This Class provides resolver functionality
 *
 */
export class Resolver {
    /**
     *
     * @param {Object} configFields
     * @param {Object} validators
     * @param {Object} feedbackDisplay
     */
    constructor( configFields, validators, feedbackDisplay ) {
        /**
         *
         * @type {Object}
         */
        if ( typeof configFields !== 'object' ) {
            throw new TypeError( 'configField is not of type object' );
        }
        this.configFields = configFields;

        /**
         *
         * @type {Object}
         */
        if ( typeof configFields !== 'validators' ) {
            throw new TypeError( 'validators is not of type object' );
        }
        this.validators = validators

        /**
         *
         * @type {Object}
         */
        if ( typeof configFields !== 'object' ) {
            throw new TypeError( 'feedbackDisplay is not of type object' );
        }
        this.feedbackDisplay = feedbackDisplay;
        /**
         * {@link dispatchEvent}
         * @type {Function}
         */
        this.dispatchEvent = dispatchEvent;
    }

    /**
     * Merges validator feedbackData with HTML given feedbackData (stored in this.configFields) and returns the
     * resulting data object.
     * @param {Object} result
     * @param {Boolean} result.isValid
     * @param {String} result.message
     * @param {String} fieldName
     * @return {Object}
     * @property {Object} result merged HTML given data
     * (merged with default feedbackData {@link getValidationFieldConfig} )
     * and validator feedbackData
     */
    getValidationFeedbackData( result, fieldName ) {
        // get validator feedbackData
        var configFeedbackDisplayValidator = result.options && result.options.feedbackDisplay ?
            result.options.feedbackDisplay : {};
        var configFeedbackDisplay = {};

        Object.keys( this.configFields[ fieldName ].feedbackDisplay ).forEach( function( key ) {
            configFeedbackDisplay[ key ] = configFeedbackDisplayValidator[ key ] ?
                Object.assign(
                    this.configFields[ fieldName ].feedbackDisplay[ key ] || {},
                    configFeedbackDisplayValidator[ key ] || {}
                ) : this.configFields[ fieldName ].feedbackDisplay[ key ];
        }.bind( this ) );

        return configFeedbackDisplay;
    }

    /**
     * This function provides validation invalid actions.
     * @param {Object} result
     * @param {Boolean} result.isValid
     * @param {String} result.message
     * @param {Object} fieldDom
     * @param {Object} validator
     * @param {Object} configFeedbackDisplay
     */
    displayActionInvalid( result, fieldDom, validator, configFeedbackDisplay ) {
        var message = typeof validator.message !== 'undefined' &&
        ( configFeedbackDisplay.preferHTMLValidatorMessage || typeof result.message === 'undefined' ) ? validator.message :
            ( typeof result.message !== 'undefined' ? result.message : '' );

        if ( configFeedbackDisplay.fieldShowState ) {
            this.feedbackDisplay.setStatus( fieldDom, false, configFeedbackDisplay.fieldIdForAriaUsage );
        } else {
            this.feedbackDisplay.removeStatus( fieldDom );
        }

        if ( configFeedbackDisplay.messageShow ) {
            this.feedbackDisplay.showMessage( fieldDom, message,
                configFeedbackDisplay.messageLocation,
                fieldDom.id
            );
        }

        this.displayActionSetByValidatorOnly( configFeedbackDisplay.setByValidatorOnly );
    }

    /**
     * This function provides validation valid actions.
     *
     * @param {Object} fieldDom
     * @param {Object} configFeedbackDisplay
     */
    displayActionValid( fieldDom, configFeedbackDisplay ) {
        if ( configFeedbackDisplay.fieldShowState ) {
            this.feedbackDisplay.setStatus( fieldDom, true, configFeedbackDisplay.fieldIdForAriaUsage );
        } else {
            this.feedbackDisplay.removeStatus( fieldDom );
        }

        this.feedbackDisplay.removeMessageAndAccordingAriaAttrOfField( fieldDom );
        this.displayActionSetByValidatorOnly( configFeedbackDisplay.setByValidatorOnly );
    }

    /**
     *
     * @param {Object} setByValidatorOnly
     */
    displayActionSetByValidatorOnly( setByValidatorOnly ) {
        this.feedbackDisplay.setStatusBySelector( setByValidatorOnly.fieldShowStateValidSel, true );
        this.feedbackDisplay.setStatusBySelector( setByValidatorOnly.fieldShowStateInvalidSel, false );
        this.feedbackDisplay.removeStatusBySelector( setByValidatorOnly.fieldRemoveStateSel );
    }

    /**
     *
     * @param {String} fieldName
     * @param {Object} configFields
     *
     * @return {Object} addInfo
     * @property {Array} groupMembers
     * @property {Object} {}
     * @property {String} id
     * @propery {String} value
     */
    getAddInfoData( fieldName, configFields ) {
        var addInfo = {};
        var fields = document.querySelectorAll( configFields[ fieldName ].groupSel );
        addInfo.groupMembers = [];
        Array.prototype.forEach.call( fields, function( field ) {
            addInfo.groupMembers.push( { id: field.id, value: field.value } );
        } );

        return addInfo;
    }


    /**
     * This function resolves the validation of each field.
     * The validation resolver is providing a getValidation function.
     * The getValidation function is providing a promise object.
     * This promise object is used inside validation loop in
     * {@link ValidationService.validate}
     * @return {Object} - returns a promise object
     */
    resolver() {
        /**
         * The validation resolver is handling the validators and validation-config
         * to serve proper validation data to the ValidationService - class.
         */
        return {
            /**
             * This function is used in {link @validate},
             * {String} validatorName - The name of the validator
             * @return {Promise} - Returns am promise which is solved in @validate
             * @property {Function) resolve
             * @property {Function) rejects
         */
            getValidator: function( validatorName ) {
                return new Promise( function( resolve ) {
                    /**
                     *  This function is giving back via "resolve" to {@link validate}
                     *  and could be taken via "then". It's executed in {@link validate}.
                     */
                    resolve(
                        function( value, validator, validationService, fieldName ) {
                            return new Promise( function( resolve, reject ) {
                                var fieldDom = document.getElementById( fieldName );

                                var data = {};
                                data.value = value;

                                if ( this.configFields[ fieldName ].groupSel !== null ) {
                                    data.addInfo = this.getAddInfoData( fieldName, this.configFields );
                                }

                                if ( typeof this.validators[ validatorName ] ===
                                    'undefined' ) {
                                    console.log( 'ERROR: Validator', validatorName, 'not defined' );
                                }

                                this.validators[ validatorName ]( value, data )
                                    .then( function( result ) {
                                        if ( this.configFields[ fieldName ]
                                                .setEventOnValidation ) {
                                            this.dispatchEvent( fieldDom, true );
                                        }

                                        var configFeedbackDisplay = this.getValidationFeedbackData( result, fieldName );
                                        this.displayActionValid( fieldDom, configFeedbackDisplay, this.feedbackDisplay );

                                        resolve(
                                            {
                                                isValid: true
                                            }
                                        );

                                    }.bind( this ) ).catch( function( result ) {
                                        if ( this.configFields[ fieldName ]
                                                .setEventOnValidation ) {
                                            this.dispatchEvent( fieldDom, false );
                                        }

                                        var configFeedbackDisplay = this.getValidationFeedbackData( result, fieldName );

                                        this.displayActionInvalid( result, fieldDom, validator, configFeedbackDisplay,
                                            this.feedbackDisplay );

                                        reject(
                                            {
                                                isValid: false
                                            }
                                        );

                                }.bind( this ) );

                            }.bind( this ) );
                        }.bind( this ) );
                }.bind( this ) );
            }.bind( this )
        };
    }

}


