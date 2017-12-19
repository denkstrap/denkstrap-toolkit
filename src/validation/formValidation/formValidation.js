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

        /**
         *
         * @type {Object} - merged options
         */
        this.options = this.getMergedOptions( options );

        /**
         * @type {Array} - Field dom references
         */
        var fields = this.getValidationFields();

        /**
         * {@link getValidationConfig}
         * @type {Object}
         */
        this.config = this.getValidationConfig( fields );

        /**
         * {@link getValidationFieldConfig}
         * @type {Object}
         */
        this.configFields = this.getValidationFieldConfig( fields );

        /**
         * {@link FeedbackDisplay}
         * @type {Class}
         */
        this.feedbackDisplay = new FeedbackDisplay( options.feedbackDisplayOptions );

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
            this.options.caching ? new Cache( this.options.validationAttr ).getValidationCache() : new Cache().getValidationOffCache(),
            this.options.stopValidationOnFirstFail );

        /**
         *
         * @type {Object} behaviour {@link Behaviour}
         */
        try {
            this.behaviour = new this.options.Behaviour(
                this.options.formId,
                this.options.validationAttr,
                this.options.condition,
                this.configFields,
                this.validation );

        } catch( error ) {
            // console.log( 'options.Behaviour must be a class/prototype to be instanciated of this.behaviour' );
            throw new Error( 'options.Behaviour must be a class/prototype to be instanciated of this.behaviour' );
        }
    }

    /**
     *
     * @return {Object}
     * @property {Boolean} caching : true
     * @property {String} formID : null
     * @property {String} validationAttr: 'data-validation'
     * @property {Boolean} stopValidationOnFirstFail : true
     * @property {Function} condition {@link condition}
     * @property {Class} Behaviour  {@link behaviour}
     * @property {Object} validators
     * @property {Promise} validators.required {@link defaultValidatorRequired}
     * @property {Promise} validators.email {@link defaultValidatorEmail}
     * */
    getDefaultOptions() {
        return {
            caching: true,
            formId: null,
            validationAttr: 'data-validation',
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
     * Merges default options given options
     * @param {Object} options
     * @returns {Object}
     */
    getMergedOptions( options ) {
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
        var opt = Object.assign( this.getDefaultOptions(), options );
        /**
         * Merging via assign is not working proper on subobjects.
         * So we have to merge separately.
         * @type {Object}
         */
        opt.validators = Object.assign( this.getDefaultOptions().validators, options.validators );
        return opt;
    }

    /**
     * @link {getValidationFields}
     * @returns {Array}
     */
    getValidationFields() {
        return getValidationFields(
            this.options.formId,
            this.options.validationAttr,
            this.options.condition );
    }

    getFieldData( field ) {
        var objData = field.getAttribute( this.options.validationAttr );
        try {
            objData = JSON.parse( objData );
        } catch( error ) {
            console.log( 'Error while trying to parse objData:' + objData );
            console.log( 'Error:' + error );
        }
        return objData;
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
     * @param {Array} fields - Array of field references to dom
     * @returns {Object}
     */
    getValidationConfig( fields ) {
        var configService = {};

        fields.forEach( function( field ) {
            var objData = this.getFieldData( field );

            var validators = {};
            if ( typeof objData.validators !== 'object' ) {
                throw new TypeError( 'validators must be of type object' );
            }
            Object.keys( objData.validators ).forEach( function( validatorName ) {
                var obj = {
                    message: objData.validators[ validatorName ].message
                };
                validators[ validatorName ] = obj;
            } );

            if ( Object.keys( objData.validators ).length < 1 ) {
                throw new Error( 'no validators specified' );
            }

            configService[ field.id ] = validators;
        }.bind( this ) );
        return configService;
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
        /**
         * @type {Array} - Field dom references
         */
        var fields = this.getValidationFields();

        this.config = this.getValidationConfig( fields );
        this.configFields = this.getValidationFieldConfig( fields );
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
            feedbackDisplay: FeedbackDisplay.getDefaultFieldOptions(),
            caching: true,
            setEventOnValidation: false,
            groupSel: null
        }
    }

    /**
     * Merges the default field config {@link getDefaultValidationFieldConfig}
     * for each field with the HTML given config.
     * @param {Array} fields - Array of field references to dom
     * @return {Object}
     * @property {null|Object} validators : null|Object
     * @property {Object} feedbackDisplay
     * @property {Boolean} caching : true|false
     * @property {Boolean} setEventOnValidation : false|true
     * @property {String} groupSel : null|*css selector*
     *
     */
    getValidationFieldConfig( fields ) {
        var config = {};
        var configFields = {};
        fields.forEach( function( field ) {
            var objData = this.getFieldData( field );
            var objDataField = this.getDefaultValidationFieldConfig();
            objDataField.validators = objData.validators;
            Object.keys( objData ).forEach( function( key ) {
                if ( key !== 'validators' ) {
                    if ( key === 'feedbackDisplay' ) {
                        Object.keys( objData.feedbackDisplay ).forEach( function( key ) {
                            if ( key === 'messageLocation' ) {
                                FeedbackDisplay.checkMessageLocationDataFormat( objData.feedbackDisplay[ key ] );
                            }
                            objDataField.feedbackDisplay[ key ] = objData.feedbackDisplay[ key ];
                        }.bind( this ) );
                    } else {
                        objDataField[ key ] = objData[ key ];
                    }
                }
            }.bind( this ) );

            configFields[ field.id ] = objDataField;
        }.bind( this ) );
        config.fields = configFields;
        return config.fields;
    }
}
