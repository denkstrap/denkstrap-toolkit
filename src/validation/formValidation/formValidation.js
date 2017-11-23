import {ValidationServiceExt} from '../validation.service.ext';

import {Cache} from './cache';

/**
 * @see resolver
 */
import resolver from './resolver';

import {FeedbackDisplay} from './feedbackDisplay';

import condition from './condition';
import behaviour from './behaviour';
import dispatchEvent from './dispatchEvent';

import resolverActionValid from './resolverActionValid';
import resolverActionInvalid from './resolverActionInvalid';

import defaultValidatorRequired from './validators/required';
import defaultValidatorEmail from './validators/email';


/**
 * This Class uses the validation.service.ext
 *
 */
export class FormValidation {

    /**
     * This behaviour function is setting up the validation behaviour.
     *
     * @callback behaviour
     */

    /**
     * This condition function provide a condition for each field validation.
     *
     * @callback condition
     * @param {Object) field - Reference to dom object.
     *
     */


    /**
     * @param {Object} options
     * @param {Boolean} caching - Enabling/disabling caching of form validation.
     * @param {String} formId - Id of the Form.
     * @callback condition
     * @callback behaviour
     * @param {Object] validators - The customized validators.
     */

    constructor( options ) {
        this.options = Object.assign( this.getOptions(), options );
        this.options.validators = Object.assign( this.getOptions().validators, options.validators );

        this.config = this.getValidationConfig();
        var cacheClass = new Cache( this.getDomByIdentifier );
        var cache = this.options.caching ? cacheClass.getValidationCache() : cacheClass.getValidationOffCache();

        this.feedbackDisplay = new FeedbackDisplay( options.feedbackDisplay );

        var resolver = this.getValidationResolver();
        console.log( 1, this.options.stopValidationOnFirstFail );
        this.validation = new ValidationServiceExt( this.config, resolver, cache, this.options.stopValidationOnFirstFail );

        this.dispatchEvent = dispatchEvent;

        this.configFields = this.getValidationFieldConfig();

        this.handler = {};
        this.options.behaviour();

    }

    getOptions() {
        return {
            caching: true,
            formId: null,
            stopValidationOnFirstFail: true,
            condition: condition,
            behaviour: behaviour.bind( this ),

            validators: {
                required: defaultValidatorRequired,
                email: defaultValidatorEmail
            }
        }
    }

    updateConfigAndValuesAndBehaviour() {
        this.config = this.getValidationConfig();
        this.configFields = this.getValidationFieldConfig();
        this.validation.setConfig( this.config );
        this.setValues();
        this.options.behaviour();
    }

    validateForm() {
        this.updateConfigAndValuesAndBehaviour();
        return this.validation.validateForm( this.options.formId );
    }

    getValidationFields() {
        var form = document.getElementById( this.options.formId );
        var fields = form.querySelectorAll(
            'input[data-validation],select[data-validation],textarea[data-validation]' );

        var fieldsAry = [];
        Array.prototype.forEach.call( fields, function( field ) {
            if ( this.options.condition( field ) ) {
                fieldsAry.push( field );
            }
        }.bind( this ) );

        return fieldsAry;
    }

    setValues() {
        // console.log( '--->setValues' );
        var fieldIdentifiers = Object.keys( this.config );
        fieldIdentifiers.forEach( function( identifier ) {
            var el = document.getElementById( identifier );
            this.validation.setValueByField( el );
        }.bind( this ) );
    }

    // fill up validation config via data attributes of fields
    getValidationConfig() {
        var config = {};
        var configService = {};
        var fields = this.getValidationFields();
        fields.forEach( function( field ) {
            var objData = field.getAttribute( 'data-validation' );
            objData = JSON.parse( objData );
            var validators = {};
            Object.keys( objData.validators ).forEach( function( validatorName ) {
                var obj = {
                    message: objData.validators[ validatorName ].message
                }
                validators[ validatorName ] = obj;
            } );

            configService[ field.id ] = validators;
        }.bind( this ) );
        config.service = configService;
        return config.service;
    }

    getValidationFieldConfig() {
        var config = {};
        var configFields = {};
        var fields = this.getValidationFields();
        fields.forEach( function( field ) {
            var objData = field.getAttribute( 'data-validation' );
            objData = JSON.parse( objData );
            var objDataField = {
                validators: objData.validators,
                feedbackDisplay: {
                    fieldShowState: true,
                    messageShow: true,

                    preferHTMLValidatorMessage: true,

                    fieldShowStateInvalidSel: null,
                    fieldRemoveStateInvalidSel: null,
                    messageShowInvalidSel: null,
                    messageRemoveInvalidSel: null,

                    fieldShowStateValidSel: null,
                    fieldRemoveStateValidSel: null,
                    messageShowValidSel: null,
                    messageRemoveValidSel: null,

                    messageLocation: null,
                    messageUseMessageOfFieldSel: null
                },
                caching: true,
                setEventOnValidation: false,
                groupSel: null
            };
            Object.keys( objData ).forEach( function( key ) {
                if ( key !== 'validators' ) {
                    if ( key === 'feedbackDisplay' ) {
                        Object.keys( objData.feedbackDisplay ).forEach( function( key2 ) {
                            objDataField.feedbackDisplay[ key2 ] = objData.feedbackDisplay[ key2 ];
                        } );
                    } else {
                        objDataField[ key ] = objData[ key ];
                    }
                }
            } );

            configFields[ field.id ] = objDataField;
        }.bind( this ) );
        config.fields = configFields;
        return config.fields;
    }

    getValidationResolver() {
        var feedbackDisplay = this.feedbackDisplay;

        var handleValidationFeedbackData = function( result, fieldName ) {

            // get validator feedbackData
            var configFeedbackDisplayValidator = result.options && result.options.feedbackDisplay ?
                result.options.feedbackDisplay : {};
            var configFeedbackDisplay = {};

            // merge with html feedbackData
            Object.keys( this.configFields[ fieldName ].feedbackDisplay ).forEach( function( key ) {
                if ( typeof configFeedbackDisplayValidator[ key ] !== 'undefined' ) {
                    configFeedbackDisplay[ key ] = configFeedbackDisplayValidator[ key ];
                } else {
                    configFeedbackDisplay[ key ] = this.configFields[ fieldName ].feedbackDisplay[ key ];
                }
                // configFeedbackDisplay[ key ] = Object.assign( this.configFields[ fieldName ].feedbackDisplay[ key ] || {}, configFeedbackDisplayValidator[ key ] || {} );
                // console.log( 'key:', key, 'this.configFields[ fieldName ].feedbackDisplay[ key ]:', this.configFields[ fieldName ].feedbackDisplay[ key ],
                //     'configFeedbackDisplay[ key ]:', configFeedbackDisplay[ key ]);
            }.bind( this ) );

            // console.log( 'configFeedbackDisplay', configFeedbackDisplay );

            return configFeedbackDisplay;
        }.bind( this );

        return resolver( this, resolverActionValid, resolverActionInvalid, handleValidationFeedbackData, feedbackDisplay );

    }

}
