/**
 * # The validator service
 *
 * This service dispatches several validaitons to the right validators. It accepts a config for each field
 * configuring the validators and a validationResolver. A config can look like this:
 *
 * ```
 * {
 *     fieldA: {
 *         required: { message: 'This field is required' },
 *         email: { message: 'This field must contain a valid email address' }
 *         ajax: { endpoint: 'http://localhost/validation' }
 *     },
 *     fieldB: {
 *         required: { message: 'Field B is required' }
 *     }
 * }
 * ```
 *
 * The validation resolver must implement a getValidator method accepting the validator name as an argument
 * validator is passed.
 *
 * ## Validators
 *
 * A validator must implement a certain interface. This interface is not checked, so be sure to implement it
 * the right way.
 *
 * There are three parameters passed to the validator:
 *
 * 1. The value which should be validate
 * 2. The config for the validator coming straight from the service config
 * 3. The validator service itself to eventually do validation on dependencies
 *
 * The validator **must** return a promise which is resolved when the validation is valid and rejects
 * when the validation fails. The results must be passed to the resolve/reject function as an object looking
 * like this:
 *
 * ```
 * {
 *     isValid: false,
 *     message: 'This is a validation message which can come via config'
 * }
 * ```
 *
 * When the validation in a validator is successful the the `isValid` property should be true and there is
 * no message. For an invalid validation the message is helpful for the user.
 */
export class ValidationService {

    /**
     * @param {Object} config
     * @param {Object} validationResolver
     * @param {Object} cache
     * @throws {TypeError}
     * @constructor
     */
    constructor( config, validationResolver, cache ) {
        if ( config === undefined || typeof config !== 'object' || Array.isArray( config ) ) {
            throw new TypeError( 'Config must be an object' );
        }

        if ( typeof validationResolver.getValidator !== 'function' ) {
            throw new TypeError( 'The validation resolver must implement the getValidator function' );
        }

        if ( typeof cache.getValue !== 'function' || typeof cache.setValue !== 'function' ) {
            throw new TypeError( 'The cache must be implement the cache interface' );
        }

        this.validationResolver = validationResolver;
        this.config = config;
        this.data = {};
        this.cache = cache;
    }

    /**
     * Set all values
     *
     * @param {Object} data
     */
    setValues( data ) {
        this.data = data;
    }

    /**
     * Set one value
     *
     * @param {String} name
     * @param {String|Array} value
     */
    setValue( name, value ) {
        this.data[ name ] = value;
    }

    /**
     * Returns all values
     *
     * @return {Object}
     */
    getValues() {
        return this.data;
    }

    /**
     * Returns one specific value
     *
     * @param {String} name
     * @return {String/Array}
     */
    getValue( name ) {
        return this.data[ name ];
    }

    /**
     * Returns all configured fields
     *
     * @return {Array}
     */
    getFields() {
        return Object.keys( this.config );
    }

    /**
     * Validate one field
     *
     * @param {String} field
     * @param {String} formId
     * @return {Promise}
     */
    validate( field, formId ) {
        return new Promise( function( resolve, reject ) {
            var validators = this.config[ field ];

            if ( validators === undefined ) {
                resolve( { isValid: true } );
            }

            var validatorNames = Object.keys( validators );

            var resolvedCount = 0;
            var hasError = false;

            var validationResults = {};

            var handleValidationResult = function( validationResult, validatorName ) {
                resolvedCount++;

                validationResults[ validatorName ] = validationResult;

                if ( resolvedCount === validatorNames.length && hasError === false ) {
                    resolve( {
                        isValid: true,
                        results: validationResults
                    } );
                } else if ( resolvedCount === validatorNames.length ) {
                    reject( {
                        isValid: false,
                        results: validationResults
                    } );
                }
            }.bind( this );

            var value = this.getValue( field );

            var cacheKey = formId + '.' + field;
            var cached = this.cache.getValue( cacheKey ) ||
                {
                    value: value,
                    results: {}
                };

            validatorNames.forEach( function( validatorName ) {
                if ( cached.value === value && cached.results[ validatorName ] !== undefined ) {
                    if ( cached.results[ validatorName ].isValid === false ) {
                        hasError = true;
                    }
                    handleValidationResult( cached.results[ validatorName ], validatorName );
                    return;
                }

                this.validationResolver.getValidator( validatorName ).then( function( validator ) {
                    return validator(
                        value,
                        validators[ validatorName ],
                        this
                    ).then( function( validationResult ) {
                        cached.results[ validatorName ] = validationResult;
                        this.cache.setValue( cacheKey, cached );

                        return new Promise( function( resolve ) {
                            resolve( validationResult );
                        } );
                    }.bind( this ) ).catch( function( validationResult ) {
                        cached.results[ validatorName ] = validationResult;
                        this.cache.setValue( cacheKey, cached );

                        return new Promise( function( resolve, reject ) {
                            reject( validationResult );
                        } );
                    }.bind( this ) );
                }.bind( this ) ).then( function( validationResult ) {
                    handleValidationResult( validationResult, validatorName );
                } ).catch( function( validationResult ) {
                    hasError = true;
                    handleValidationResult( validationResult, validatorName );
                } );
            }.bind( this ) );
        }.bind( this ) );
    }

    /**
     * Validate the whole form
     *
     * @param {String} formId
     * @return {Promise}
     */
    validateForm( formId ) {
        formId = formId || '';
        return new Promise( function( resolve, reject ) {
            var fieldNames = this.getFields();

            var resolvedCount = 0;
            var hasError = false;

            var validationResults = {};

            var handleValidationResult = function( validationResult, field ) {
                resolvedCount++;
                validationResults[ field ] = validationResult;

                if ( resolvedCount === fieldNames.length && hasError === false ) {
                    resolve( {
                        isValid: true,
                        results: validationResults
                    } );
                } else if ( resolvedCount === fieldNames.length ) {
                    reject( {
                        isValid: false,
                        results: validationResults
                    } );
                }
            }.bind( this );

            fieldNames.forEach( function( fieldName ) {
                this.validate( fieldName, formId ).then( function( validationResult ) {
                    handleValidationResult( validationResult, fieldName );
                } ).catch( function( validationResult ) {
                    hasError = true;
                    handleValidationResult( validationResult, fieldName );
                } );
            }.bind( this ) );
        }.bind( this ) );
    }
}
