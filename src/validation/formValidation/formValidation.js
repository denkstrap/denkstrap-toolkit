import {ValidationServiceExt} from '../validation.service.ext';

import {Cache} from './cache';

import {Resolver} from './resolver';

import {FeedbackDisplay} from './feedbackDisplay';

import condition from './condition';
import {Behaviour} from './behaviour';

import defaultValidatorRequired from './validators/required';
import defaultValidatorEmail from './validators/email';

import getValidationFields from './getValidationFields'

/**
 * This Class offers form validation via html driven setup combined with customized or default validators
 *
 * @example
  <form id="form">

   <input name="name" id="name"
     data-validation='{
     "validators": {
     "required": { "message": "Required \"name\" not set" } },
     "feedbackDisplay": {
        "messageLocation": [ { "minWidth": 0, "insertTargetSelector": "[for=\"name\"]" } ]
     }
    }'
  >

    <button id="submit-btn" type="submit">Validate Form</button>
  </form>

 <script type="text/javascript">

      var options = {
        formId: 'form',
        caching: false
    }

 var validationService = new FormValidation( options );

 var form = document.getElementById( 'form' );

 form.addEventListener( 'submit', function( event ) {
    event.preventDefault();

    validationService.validateForm().then( function( result ) {
        console.log( '----->validateForm success', result );
        form.submit();
    } ).catch( function( result ) {
        console.log( '----->validateForm fail', result );
    } );

} );

  </script>
  */
export class FormValidation {

    /**
     * @param {Object} options - The options to set. You have to set the form id for a minimal configuration setup.
     * @param {String} options.formId (default=null} - Id of the form.
     * @param {Boolean} [options.caching=true] - Enabling/disabling caching of form validation.
     * @param {Boolean} [options.stopValidationOnFirstFail=true] -
     * Stops further validation of field if one validator fails.
     * @param {Function} [options.condition] - (default={@link condition})
     * This condition function provides a condition for each field validation.
     * @param {Class} [options.Behaviour] - (default={@link Behaviour})
     * This Behaviour Class is setting up the validation behaviour for each field.
     * @param {Object} [options.validators] - (default={@link defaultValidatorRequired}, {@link defaultValidatorEmail})
     * @param {Object} [options.feedbackDisplayOptions] - (default={@link FeedbackDisplay.getOptions})
     */
    constructor( options ) {
        if ( typeof options === 'undefined' || typeof options !== 'object' ) {
            throw new TypeError( 'Options must be an object.' );
        }

        if ( typeof options === 'object' ) {
            if ( typeof options.formId !== 'string' ) {
                throw new TypeError( 'Options formID must be String.' );
            }
        }

        /**
         * The options merged by default options and param options.
         * @type {Object}
         */
        this.options = Object.assign( this.getOptions(), options );
        /**
         * Merging via assign is not working proper on subobjects.
         * So we have to merge separately.
         * @type {Object}
         */
        this.options.validators = Object.assign( this.getOptions().validators, options.validators );

        /**
         * {@link getValidationConfig}
         * @type {Object}
         */
        this.config = this.getValidationConfig();

        /**
         * {@link FeedbackDisplay}
         * @type {Class}
         */
        this.feedbackDisplay = new FeedbackDisplay( options.feedbackDisplayOptions );

        /**
         * {@link getValidationFieldConfig}
         * @type {Object}
         */
        this.configFields = this.getValidationFieldConfig();

        /**
         * {@link ValidationServiceExt}
         * @type {Class}
         */
        this.validation = new ValidationServiceExt(
            this.config,
            new Resolver(
                this.configFields,
                this.options.validators,
                this.feedbackDisplay ).resolver(),
            this.options.caching ? new Cache().getValidationCache() : new Cache().getValidationOffCache(),
            this.options.stopValidationOnFirstFail );

        /**
         *
         * @type {Object} behaviour {@link Behaviour}
         */
        try {
            this.behaviour = new this.options.Behaviour(
                this.options.formId,
                this.options.condition,
                this.configFields,
                this.validation );

            if ( !(this.behaviour instanceof this.options.Behaviour ) ) {
                throw new TypeError( 'Options Behaviour must be a class/prototype' );
            }
        } catch( error ) {
            throw new TypeError( 'Error on instantiating Behaviour class.')
        }
    }

    /**
     *
     * @return {Object}
     * @property {Boolean} caching : true
     * @property {String} formID : null
     * @property {Boolean} stopValidationOnFirstFail : true
     * @property {Function} condition {@link condition}
     * @property {Class} Behaviour  {@link behaviour}
     * @property {Object} validators
     * @property {Promise} validators.required {@link defaultValidatorRequired}
     * @property {Promise} validators.email {@link defaultValidatorEmail}
     * */
    getOptions() {
        return {
            caching: true,
            formId: null,
            stopValidationOnFirstFail: true,
            condition: condition,
            Behaviour: Behaviour,

            validators: {
                required: defaultValidatorRequired,
                email: defaultValidatorEmail
            }
        };
    }

    /**
     * Fills up validation config of fields via data attributes of fields and Id of each field.
     * {@link ValidationService}
     *
     * @example
     * <input name="name" id="nameId"
     *    data-validation='{
     *           "validators": {"required": { "message": "This field is required" }
     *           }'>
     *
     * {
     *     nameId: {
     *         required: { message: 'This field is required' }
     *     }
     * }
     *
     * @returns {Object}
     */
    getValidationConfig() {
        var config = {};
        var configService = {};
        var fields = getValidationFields( this.options.formId, this.options.condition, this.validation );
        fields.forEach( function( field ) {
            var objData = field.getAttribute( 'data-validation' );
            objData = JSON.parse( objData );
            var validators = {};
            Object.keys( objData.validators ).forEach( function( validatorName ) {
                var obj = {
                    message: objData.validators[ validatorName ].message
                };
                validators[ validatorName ] = obj;
            } );

            configService[ field.id ] = validators;
        }.bind( this ) );
        config.service = configService;
        return config.service;
    }

    /**
     * Fills up the validation data values
     * (Id of fields with it's value).
     * This values are used to validate.
     * {@link ValidationService.validate},
     * ({@link ValidationServiceExt.setValueByField},
     * {@link ValidationService.getValue} )
     */
    setValues() {
        var fieldIdentifiers = Object.keys( this.config );
        fieldIdentifiers.forEach( function( identifier ) {
            var el = document.getElementById( identifier );
            this.validation.setValueByField( el );
        }.bind( this ) );
    }

    /**
     * Before a validation of the entire form starts
     * this function should be called (Its called by {@link validateForm} )
     */
    updateConfigAndValuesAndBehaviour() {
        this.config = this.getValidationConfig();
        this.configFields = this.getValidationFieldConfig();
        this.validation.setConfig( this.config );
        this.setValues();
        this.behaviour.behaviour();
    }

    /**
     * This function is validating the entire form.
     * @returns {Promise}
     */
    validateForm() {
        this.updateConfigAndValuesAndBehaviour();
        return this.validation.validateForm( this.options.formId );
    }

    /**
     * The Default field config for each field.
     * @return {Object} This data is used in {@link getValidationFieldConfig}
     * @property {null} validators : null
     * @property {Object} feedbackDisplay {@link FeedbackDisplay.getDefaultFieldOptions}
     * @property {Boolean} caching : false
     * @property {Boolean} setEventOnValidation : false
     * @property {null} groupSel : null
     */
    getDefaultValidationFieldConfig() {
        return {
            validators: null,
            feedbackDisplay: this.feedbackDisplay.getDefaultFieldOptions(),
            caching: true,
            setEventOnValidation: false,
            groupSel: null
        }
    }

    /**
     * Merges the default field config {@link getDefaultValidationFieldConfig}
     * for each field with the HTML given config.
     * @return {Object}
     * @property {null|Object} validators : null|Object
     * @property {Object} feedbackDisplay
     * @property {Boolean} caching : true|false
     * @property {Boolean} setEventOnValidation : false|true
     * @property {String} groupSel : null|*css selector*
     *
     */
    getValidationFieldConfig() {
        var config = {};
        var configFields = {};
        var fields = getValidationFields( this.options.formId, this.options.condition, this.validation );
        fields.forEach( function( field ) {
            var objData = field.getAttribute( 'data-validation' );
            objData = JSON.parse( objData );
            var objDataField = this.getDefaultValidationFieldConfig();
            objDataField.validators = objData.validators;
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
}
