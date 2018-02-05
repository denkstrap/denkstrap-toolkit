(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValidationServiceDom = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _validation = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * # The validator service ext
 *
 * This Class extends the validation.service
 * configuring the validators and a validationResolver. A config can look like this:
 *
 * @extends ValidationService
 */
var ValidationServiceDom = exports.ValidationServiceDom = function (_ValidationService) {
    _inherits(ValidationServiceDom, _ValidationService);

    /**
     * @param {Object} config
     * @param {Object} validationResolver
     * @param {Object} cache
     * @param {Boolean} stopValidationOnFirstFail
     * @throws {TypeError}
     * @constructor
     */
    function ValidationServiceDom(config, validationResolver, cache, stopValidationOnFirstFail) {
        _classCallCheck(this, ValidationServiceDom);

        return _possibleConstructorReturn(this, (ValidationServiceDom.__proto__ || Object.getPrototypeOf(ValidationServiceDom)).call(this, config, validationResolver, cache, stopValidationOnFirstFail));
    }

    /**
     * Set one value by field
     *
     * @param {Object} field
     */


    _createClass(ValidationServiceDom, [{
        key: 'setValueByField',
        value: function setValueByField(field) {
            if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
                throw new TypeError('The field parameter must be instance of ' + 'HTMLInputElement, HTMLSelectElement or  HTMLTextAreaElement');
            }
            var name = field.id;
            var attr = field.getAttribute('type');
            var value = attr === 'checkbox' || attr === 'radio' ? field.checked ? true : false : field.value;
            /**
             * {@link setValue}
             */
            _get(ValidationServiceDom.prototype.__proto__ || Object.getPrototypeOf(ValidationServiceDom.prototype), 'setValue', this).call(this, name, value);
        }
    }]);

    return ValidationServiceDom;
}(_validation.ValidationService);

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * # The validator service
 *
 * This service dispatches several validations to the right validators. It accepts a config for each field
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
 * There are four parameters passed to the validator:
 *
 * 1. The value which should be validate
 * 2. The config for the validator coming straight from the service config
 * 3. The validator service itself to eventually do validation on dependencies
 * 4. The fieldname to handle field propertys in validator (e.g. visibility)
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
var ValidationService = exports.ValidationService = function () {

    /**
     * @param {Object} config
     * @param {Object} validationResolver
     * @param {Object} cache
     * @param {Boolean} stopValidationOnFirstFail
     * @throws {TypeError}
     * @constructor
     */
    function ValidationService(config, validationResolver, cache, stopValidationOnFirstFail) {
        _classCallCheck(this, ValidationService);

        if (config === undefined || (typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object' || Array.isArray(config)) {
            throw new TypeError('Config must be an object');
        }

        if (typeof validationResolver.getValidator !== 'function') {
            throw new TypeError('The validation resolver must implement the getValidator function');
        }

        if (typeof cache.getValue !== 'function' || typeof cache.setValue !== 'function') {
            throw new TypeError('The cache must be implement the cache interface');
        }

        /**
         *
         * @type {Boolean}
         */
        this.stopValidationOnFirstFail = false;
        if (typeof stopValidationOnFirstFail !== 'undefined' && typeof stopValidationOnFirstFail !== 'boolean') {
            throw new TypeError('The stopValidationOnFirstFail param must be of type boolean if set.');
        } else if (typeof stopValidationOnFirstFail !== 'undefined') {
            this.stopValidationOnFirstFail = stopValidationOnFirstFail;
        }

        /**
         *
         * @type {Object}
         */
        this.validationResolver = validationResolver;
        /**
         *
         * @type {Object}
         */
        this.config = config;
        /**
         *
         * @type {Object}
         */
        this.data = {};
        /**
         *
         * @type {Object}
         */
        this.cache = cache;
    }

    /**
     * Set config
     *
     * @param {Object} config
     */


    _createClass(ValidationService, [{
        key: 'setConfig',
        value: function setConfig(config) {
            this.config = config;
        }

        /**
         * Set resolver
         *
         * @param {Object} validationResolver
         */

    }, {
        key: 'setResolver',
        value: function setResolver(validationResolver) {
            this.validationResolver = validationResolver;
        }

        /**
         * Set all values
         * @example
         * validationService.setValues( {
                name: 'Elvis',
                nickname: 'The Pelvis'
            } );
         *
         * @param {Object} data
         */

    }, {
        key: 'setValues',
        value: function setValues(data) {
            this.data = data;
        }

        /**
         * Set one value
         * @example
         * validationService.setValue( 'name', 'Elvis' );
         *
         * @param {String} name
         * @param {String|Array} value
         */

    }, {
        key: 'setValue',
        value: function setValue(name, value) {
            this.data[name] = value;
        }

        /**
         * Returns all values
         *
         * @return {Object}
         */

    }, {
        key: 'getValues',
        value: function getValues() {
            return this.data;
        }

        /**
         * Returns one specific value
         *
         * @param {String} name
         * @return {String/Array}
         */

    }, {
        key: 'getValue',
        value: function getValue(name) {
            return this.data[name];
        }

        /**
         * Returns all configured fields
         *
         * @return {Array}
         */

    }, {
        key: 'getFields',
        value: function getFields() {
            return Object.keys(this.config);
        }

        /**
         * Validate one field
         *
         * @param {String} field
         * @param {String} formId
         * @return {Promise}
         */

    }, {
        key: 'validate',
        value: function validate(field, formId) {
            return new Promise(function (resolve, reject) {
                var validators = this.config[field];

                if (validators === undefined) {
                    resolve({ isValid: true });
                }

                var validatorNames = Object.keys(validators);

                var resolvedCount = 0;
                var hasError = false;

                var validationResults = {};

                var handleValidationResult = function (validationResult, validatorName) {
                    resolvedCount++;

                    validationResults[validatorName] = validationResult;

                    if (resolvedCount === validatorNames.length && hasError === false) {
                        resolve({
                            isValid: true,
                            results: validationResults
                        });
                    } else if (resolvedCount === validatorNames.length || this.stopValidationOnFirstFail && hasError) {
                        reject({
                            isValid: false,
                            results: validationResults
                        });
                    } else {
                        if (!this.stopValidationOnFirstFail || hasError === false) {
                            handleValidation(validatorNames[resolvedCount]);
                        }
                    }
                }.bind(this);

                var value = this.getValue(field);

                var cacheKey = formId + '.' + field; // TODO: discuss if formId is needed

                var isCached = this.cache.isCached(cacheKey);

                var cached = isCached ? this.cache.getValue(cacheKey) : {
                    value: value,
                    results: {}
                };

                var handleValidation = function (validatorName) {

                    if (isCached && cached.value === value && cached.results[validatorName] !== undefined) {
                        if (cached.results[validatorName].isValid === false) {
                            hasError = true;
                        }
                        handleValidationResult(cached.results[validatorName], validatorName);
                        return;
                    }

                    cached.value = value;

                    this.validationResolver.getValidator(validatorName).then(function (validator) {

                        return validator(value, validators[validatorName], this, field).then(function (validationResult) {
                            cached.results[validatorName] = validationResult;
                            this.cache.setValue(cacheKey, cached);

                            handleValidationResult(validationResult, validatorName);
                        }.bind(this)).catch(function (validationResult) {
                            cached.results[validatorName] = validationResult;
                            this.cache.setValue(cacheKey, cached);

                            hasError = true;
                            handleValidationResult(validationResult, validatorName);
                        }.bind(this));
                    }.bind(this));
                }.bind(this);

                handleValidation(validatorNames[resolvedCount]);
            }.bind(this));
        }

        /**
         * Validate the whole form
         *
         * @param {String} formId
         * @return {Promise}
         */

    }, {
        key: 'validateForm',
        value: function validateForm(formId) {
            formId = formId || '';
            return new Promise(function (resolve, reject) {
                var fieldNames = this.getFields();

                var resolvedCount = 0;
                var hasError = false;

                var validationResults = {};

                var handleValidationResult = function (validationResult, field) {
                    resolvedCount++;
                    validationResults[field] = validationResult;

                    if (resolvedCount === fieldNames.length && hasError === false) {
                        resolve({
                            isValid: true,
                            results: validationResults
                        });
                    } else if (resolvedCount === fieldNames.length) {
                        reject({
                            isValid: false,
                            results: validationResults
                        });
                    }
                }.bind(this);

                fieldNames.forEach(function (fieldName) {
                    this.validate(fieldName, formId).then(function (validationResult) {
                        handleValidationResult(validationResult, fieldName);
                    }).catch(function (validationResult) {
                        hasError = true;
                        handleValidationResult(validationResult, fieldName);
                    });
                }.bind(this));
            }.bind(this));
        }
    }]);

    return ValidationService;
}();

/***/ })

/******/ });
});