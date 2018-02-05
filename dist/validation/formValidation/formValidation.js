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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getValidationFields;
/**
 * Returns all fields dom references of the form
 * considering the given condition.
 * @param {String} formId
 * @param {String} validationAttr - validation attr (where validation data is stored)
 * @param {Function} condition
 * @return {Array} Collection of dom element references
 * @property {Object} field reference to dom element
 */
function getValidationFields(formId, validationAttr, condition) {
    if (typeof formId !== 'string') {
        throw new TypeError('formId must be of type string');
    }

    if (typeof validationAttr !== 'string') {
        throw new TypeError('validationAttr must be of type string');
    }

    if (typeof condition !== 'function') {
        throw new TypeError('condition should be of type function');
    }

    var form = document.getElementById(formId);
    if (form === null) {
        throw new TypeError('form should not be null');
    }
    var fields = form.querySelectorAll('input[' + validationAttr + '],select[' + validationAttr + '],textarea[' + validationAttr + ']');

    var fieldsAry = [];
    Array.prototype.forEach.call(fields, function (field) {
        if (condition(field)) {
            fieldsAry.push(field);
        }
    }.bind(this));

    return fieldsAry;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * # The cache service
 *
 * This is a simple service for providing a cache system in the frontend. This
 * one is an object cache saving the values in an object. It will not be persitent
 * between requests.
 */
var Cache = exports.Cache = function () {

    /**
     * @constructor
     */
    function Cache() {
        _classCallCheck(this, Cache);

        this.cacheMap = {};
    }

    /**
     * Get a value from the cache
     *
     * @param {String} key
     * @return {mixed}
     */


    _createClass(Cache, [{
        key: 'getValue',
        value: function getValue(key) {
            this.checkKey(key);

            if (typeof this.cacheMap[key] === 'undefined') {
                throw new Error('Check cache via isCached method before trying to fetch a value');
            }
            return this.cacheMap[key];
        }

        /**
         * Checks if a value is stored for the given key
         * Checking is not done via getValue method
         * reason: a value could be of type boolean and so not be handled proper
         * @param {String} key
         * @returns {Boolean}
         */

    }, {
        key: 'isCached',
        value: function isCached(key) {
            this.checkKey(key);
            return this.cacheMap[key] ? true : false;
        }

        /**
         * Set a value
         *
         * @param {String} key
         * @param {mixed} value
         */

    }, {
        key: 'setValue',
        value: function setValue(key, value) {
            this.checkKey(key);
            this.cacheMap[key] = value;
        }

        /**
         * Check for the type of the key
         *
         * @param {String} key
         * @throws {TypeError}
         */

    }, {
        key: 'checkKey',
        value: function checkKey(key) {
            if (typeof key !== 'string') {
                throw new TypeError('Key must be a string');
            }
        }
    }]);

    return Cache;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = eventDispatch;
/**
 * The eventDispatch function triggers events after each validation of a field
 *
 * @param {Object } fieldDom - Reference to dom element.
 * @param {Boolean} isValid
 */
function eventDispatch(fieldDom, isValid) {
    if (!(fieldDom instanceof HTMLElement)) {
        throw new TypeError('fieldDom is not an instance of HTMLElement.');
    }

    if (typeof isValid !== 'boolean') {
        throw new TypeError('isValid is not of type Boolean');
    }

    // create and dispatch the event
    var eventName = fieldDom.id + '-validated';
    var eventObj = {
        detail: {
            isValid: isValid,
            field: fieldDom
        }
    };
    var event = new CustomEvent(eventName, eventObj);
    fieldDom.dispatchEvent(event);
}

/***/ }),
/* 3 */
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Behaviour = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getValidationFields = __webpack_require__(0);

var _getValidationFields2 = _interopRequireDefault(_getValidationFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The behaviour function provides cases for to trigger validations.
 * Handlers are stored to consider dynamic dom manipulating.
 */
var Behaviour = exports.Behaviour = function () {

    /**
     *
     * @param {String} formId - The id of the form.
     * @param {String} validationAttr
     * @param {Function} condition - The condition for to collect the validating fields
     * @param {Object} configFields - The config of fields
     * @param {Object} validation  - The validation service object
     */
    function Behaviour(formId, validationAttr, condition, configFields, validation) {
        _classCallCheck(this, Behaviour);

        if (typeof formId !== 'string') {
            throw new TypeError('form id must be of type String');
        }

        if (typeof validationAttr !== 'string') {
            throw new TypeError('validationAttr must be of type String');
        }

        if (typeof condition !== 'function') {
            throw new TypeError('formId must be of type function');
        }

        if ((typeof configFields === 'undefined' ? 'undefined' : _typeof(configFields)) !== 'object') {
            throw new TypeError('configFields must be of type function');
        }

        if ((typeof validation === 'undefined' ? 'undefined' : _typeof(validation)) !== 'object') {
            throw new TypeError('validation must be of type object');
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


    _createClass(Behaviour, [{
        key: 'updateConfigFieldsAndValidation',
        value: function updateConfigFieldsAndValidation(configFields, validation) {
            this.configFields = configFields;
            this.validation = validation;
        }

        /**
         * The behaviour for each field
         */

    }, {
        key: 'behaviour',
        value: function behaviour() {
            var fields = (0, _getValidationFields2.default)(this.formId, this.validationAttr, this.condition);
            Array.prototype.forEach.call(fields, function (field) {
                var type = field.getAttribute('type');
                var tagName = field.tagName.toLowerCase();
                var eventName = type !== 'checkbox' && type !== 'radio' && tagName !== 'select' ? 'blur' : 'change';

                if (typeof this.behaviourHandler[field.id] !== 'undefined') {
                    field.removeEventListener(eventName, this.behaviourHandler[field.id]);
                }

                /**
                 * Creates field event handler
                 */
                var handler = function () {
                    var fieldIdentifier = field.id;
                    this.validation.setValueByField(field);
                    this.validation.validate(fieldIdentifier, this.formId).catch(function () {});
                    if (this.configFields[fieldIdentifier].behaviourGroupSel !== null) {

                        fields = document.querySelectorAll(this.configFields[fieldIdentifier].behaviourGroupSel);
                        Array.prototype.forEach.call(fields, function (field) {

                            var fieldIdentifierGroupMember = field.id;
                            if (fieldIdentifierGroupMember !== fieldIdentifier) {
                                this.validation.setValueByField(field);
                                this.validation.validate(fieldIdentifierGroupMember, this.formId).catch(function () {});
                            }
                        }.bind(this));
                    }
                }.bind(this);

                this.behaviourHandler[field.id] = handler;
                field.addEventListener(eventName, handler);
            }.bind(this));
        }
    }]);

    return Behaviour;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Cache = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cache = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This Class provides cache functionality to avoid doubled validation
 *
 */
var Cache = exports.Cache = function () {

    /**
     * @constructor
     * @param {String} validationAttr - validation attr (where validation data is stored)
     */
    function Cache(validationAttr) {
        _classCallCheck(this, Cache);

        if (typeof validationAttr !== 'string') {
            throw new TypeError('validationAttr must be of type String');
        }
        this.validationAttr = validationAttr;
    }

    /**
     * Validation cache off version
     *
     * @return {{getValue: getValue, setValue: setValue}}
     */


    _createClass(Cache, [{
        key: 'getValidationOffCache',
        value: function getValidationOffCache() {
            return {
                getValue: function getValue() {
                    return false;
                },
                setValue: function setValue() {}
            };
        }

        /**
         * validation cache (used to avoid unnecessary validations
         * @returns {{getValue: (function(this:Cache)), setValue: setValue, data: Array}}
         */

    }, {
        key: 'getValidationCache',
        value: function getValidationCache() {
            var cache = Object.assign(new _cache.Cache(), {
                isCached: function (cacheKey) {
                    var fieldName = cacheKey.split('.')[1];
                    cache.checkKey(cacheKey);
                    var test = this.isCachingEnabled(fieldName) && cache.cacheMap[cacheKey] ? true : false;
                    return this.isCachingEnabled(fieldName) && cache.cacheMap[cacheKey] ? true : false;
                }.bind(this)
            });
            return cache;
        }

        /**
         *
         * @param {String} fieldName
         * @returns {boolean}
         */

    }, {
        key: 'isCachingEnabled',
        value: function isCachingEnabled(fieldName) {
            var fieldDom = document.getElementById(fieldName);
            var objData = fieldDom.getAttribute(this.validationAttr);
            objData = JSON.parse(objData);
            /* must have value false to prevent taking undefined as false (no coercion) */
            return objData.caching === false ? false : true;
        }
    }]);

    return Cache;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = condition;
/**
 * The condition function provides a condition for validation of each field.
 * @param {Object} field - Reference to dom object.
 * @returns {Boolean}
 */
function condition(field) {
    // adjusted jQuery
    // https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
    if (!(field instanceof HTMLElement)) {
        throw new TypeError('Error[condition( field )]: Field is not an instance of HTMLElement.');
    } else {
        return !!((field.offsetWidth || field.offsetHeight) && field.offsetParent);
    }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This Class provides display functionality.
 * Is handles display of error messages and validation states of each field.
 *
 */
var FeedbackDisplay = exports.FeedbackDisplay = function () {

    /**
     * @param {Object} options {@link getOptions}
     */
    function FeedbackDisplay(options) {
        _classCallCheck(this, FeedbackDisplay);

        /**
         * The general feedback display options.
         * {@link getOptions}
         * @type {Object}
         */
        if (typeof options !== 'undefined') {
            this.options = Object.assign(this.getOptions(), options);
            if (typeof this.options.fieldErrorClass !== 'string') {
                throw new TypeError('option fieldErrorClass is not of type String');
            }
            if (typeof this.options.fieldSuccessClass !== 'string') {
                throw new TypeError('option fieldSuccessClass is not of type String');
            }
            if (typeof this.options.messageTemplate !== 'string') {
                throw new TypeError('option messageTemplate is not of type String');
            }
            if (this.options.messageCreateFunction !== null && typeof this.options.messageCreateFunction !== 'function') {
                throw new TypeError('optionmessageCreateFunction is not of type Null or Function');
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


    _createClass(FeedbackDisplay, [{
        key: 'getOptions',
        value: function getOptions() {
            return {
                fieldErrorClass: 'validation-error',
                fieldSuccessClass: 'validation-success',
                messageTemplate: '<p id="{{ id }}" class="validation-message" aria-live="assertive" role="alert">' + '{{ message }}</p>',
                messageCreateFunction: null
            };
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

    }, {
        key: 'setStatusInvalidAria',


        /**
         * Manages aria status of field (WCAG).
         * @see https://www.w3.org/TR/WCAG20-TECHS/ARIA21.html
         * used only if validation result is false
         * @param {Object} field - Reference to dom object.
         * @param {String|null} fieldIdForAriaUsage - This could be necessary to define
         * if one message is used for several form fields.
         */
        value: function setStatusInvalidAria(field, fieldIdForAriaUsage) {
            var fieldUse = field;
            if (fieldIdForAriaUsage !== null) {
                fieldUse = document.getElementById(fieldIdForAriaUsage);
            }
            var id = this.getMessageId(fieldUse);
            field.setAttribute('aria-invalid', 'true');
            field.setAttribute('aria-describedby', id);
        }

        /**
         * Manages aria status of field (WCAG).
         * @see https://www.w3.org/TR/WCAG20-TECHS/ARIA21.html
         * @param {Object} field - Dom reference.
         */

    }, {
        key: 'removeStatusAria',
        value: function removeStatusAria(field) {
            field.removeAttribute('aria-invalid');
            field.removeAttribute('aria-describedby');
        }

        /**
         * Removes status classes and aria attributes of a field.
         * @param {Object} field Reference to dom object.
         */

    }, {
        key: 'removeStatus',
        value: function removeStatus(field) {
            field.classList.remove(this.options.fieldErrorClass);
            field.classList.remove(this.options.fieldSuccessClass);
            this.removeStatusAria(field);
        }

        /**
         *
         * @param {Object} field Dom reference of field.
         * @param {Boolean} valid The status type handle.
         * @param {String} fieldIdForAriaUsage
         */

    }, {
        key: 'setStatus',
        value: function setStatus(field, valid, fieldIdForAriaUsage) {
            var validErrorClass = this.options.fieldErrorClass;
            var validSuccessClass = this.options.fieldSuccessClass;
            if (valid) {
                field.classList.add(validSuccessClass);
                field.classList.remove(validErrorClass);
                this.removeStatusAria(field);
            } else {
                field.classList.add(validErrorClass);
                field.classList.remove(validSuccessClass);
                this.setStatusInvalidAria(field, fieldIdForAriaUsage);
            }
        }

        /**
         *
         * @param {String} selector - CSS selector.
         * @param {Boolean} status - The status to show.
         */

    }, {
        key: 'setStatusBySelector',
        value: function setStatusBySelector(selector, status) {
            if (selector !== null) {
                var fields = document.querySelectorAll(selector);
                Array.prototype.forEach.call(fields, function (field) {
                    this.setStatus(field, status, null);
                }.bind(this));
            }
        }

        /**
         * Removes staus classes and aria attributes of dom elements.
         * @param {String} selector - CSS selector to get dom element list.
         */

    }, {
        key: 'removeStatusBySelector',
        value: function removeStatusBySelector(selector) {
            if (selector !== null) {
                var fields = document.querySelectorAll(selector);
                Array.prototype.forEach.call(fields, function (field) {
                    this.removeStatus(field);
                }.bind(this));
            }
        }

        /**
         * Returns the message id.
         * @param {Object} field - Reference to dom element.
         * @return {String}
         */

    }, {
        key: 'getMessageId',
        value: function getMessageId(field) {
            return 'validation-message-' + field.id;
        }

        /**
         *
         * @param {Object} field - Reference to dom element.
         * @returns {Object} - Reference to dom element.
         */

    }, {
        key: 'getDefaultInsertLoc',
        value: function getDefaultInsertLoc(field) {
            var attr = field.getAttribute('type');
            var insertLoc = attr !== 'checkbox' && attr !== 'radio' ? field.previousElementSibling || field : field.parentNode;
            return insertLoc;
        }

        /**
         * Checks messageLocation data for its validity
         * @example
         * "messageLocation": [ { "minWidth": 0, "insertTargetSelector": "[for=\"nameWithFeedbackDisplay\"]" } ]
         * @param {null|String} messageLocation
         */

    }, {
        key: 'getBreakpointMessageInfoLocationData',


        /**
         *
         * @param {Object} messageLocation
         * @returns {Object|null} - Breakpoint depended message location data.
         * If breakpoint is matched all properties defined in HTML for this breakpoint (via min-width property)
         * are returned otherwise null is returned.
         * @example
         * {
         * "minWidth": 750,
         * "insertTargetSelector": "#name-name-second-insert-point",
         * "layoutContainerIdOuter": "#validation-message-layout-name-name-second",
         * "layoutContainerIdNrInner": 1
         * }
         */
        value: function getBreakpointMessageInfoLocationData(messageLocation) {
            var validBp = null;
            if (messageLocation !== null) {
                var length = messageLocation.length;
                var matchMedia;
                var bP;
                for (var i = 0; i < length; i++) {
                    bP = messageLocation[i];
                    matchMedia = '(min-width:' + bP.minWidth + 'px)';
                    if (window.matchMedia(matchMedia).matches) {
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

    }, {
        key: 'getMessageInsertLocationData',
        value: function getMessageInsertLocationData(field, messageLocation) {
            var validBp = this.getBreakpointMessageInfoLocationData(messageLocation);
            var insertLoc;

            var infoData = {};

            if (validBp !== null) {
                insertLoc = document.querySelector(validBp.insertTargetSelector);
            }

            if (validBp === null || insertLoc === null) {
                insertLoc = this.getDefaultInsertLoc(field);
            }

            infoData.insertLoc = insertLoc;
            infoData.breakpointData = validBp;

            return infoData;
        }

        /**
         * Removes message and according aria attribute of given field.
         * @param {Object} field - Reference to dom element.
         */

    }, {
        key: 'removeMessageAndAccordingAriaAttrOfField',
        value: function removeMessageAndAccordingAriaAttrOfField(field) {
            var message = document.getElementById(this.getMessageId(field));
            if (message !== null) {
                message.parentNode.removeChild(message);
                field.removeAttribute('aria-describedby');
            }
        }

        /**
         *
         * @param {Object} field - Reference to dom element.
         * @param {String} message - The error message.
         * @param {null|Array} messageLocation
         */

    }, {
        key: 'showMessage',
        value: function showMessage(field, message, messageLocation) {
            this.removeMessageAndAccordingAriaAttrOfField(field);
            var html = this.options.messageTemplate.replace('{{ id }}', this.getMessageId(field)).replace('{{ id-for }}', field.id).replace('{{ message }}', message);

            var insertLocData = this.getMessageInsertLocationData(field, messageLocation);

            if (typeof this.options.messageCreateFunction === 'function') {
                this.options.messageCreateFunction(insertLocData, html);
            } else {
                insertLocData.insertLoc.insertAdjacentHTML('beforebegin', html);
            }
        }
    }], [{
        key: 'getDefaultFieldOptions',
        value: function getDefaultFieldOptions() {
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

            };
        }
    }, {
        key: 'checkMessageLocationDataFormat',
        value: function checkMessageLocationDataFormat(messageLocation) {

            if (messageLocation !== null && !Array.isArray(messageLocation)) {
                throw new TypeError('messageLocation should be null or of type Array');
            }

            if (Array.isArray(messageLocation)) {
                var length = messageLocation.length;
                var bP;
                for (var i = 0; i < length; i++) {
                    bP = messageLocation[i];

                    if (typeof bP.minWidth !== 'number') {
                        throw new TypeError('messageLocation needs for each entry a minWidth property of type Number');
                    }

                    if (typeof bP.insertTargetSelector !== 'string') {
                        throw new TypeError('messageLocation needs for each entry ' + 'a insertTargetSelector property of type String');
                    }

                    var insertLoc = document.querySelector(bP.insertTargetSelector);
                    if (insertLoc === null) {
                        throw new TypeError('messageLocation needs for each entry a insertTargetSelector not resulting in null');
                    }
                }
            }
        }
    }]);

    return FeedbackDisplay;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Resolver = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dispatchEvent = __webpack_require__(2);

var _dispatchEvent2 = _interopRequireDefault(_dispatchEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This Class provides resolver functionality
 *
 */
var Resolver = exports.Resolver = function () {
    /**
     *
     * @param {Object} configFields
     * @param {Object} validators
     * @param {Object} feedbackDisplay
     */
    function Resolver(configFields, validators, feedbackDisplay) {
        _classCallCheck(this, Resolver);

        /**
         *
         * @type {Object}
         */
        if ((typeof configFields === 'undefined' ? 'undefined' : _typeof(configFields)) !== 'object') {
            throw new TypeError('configField is not of type object');
        }
        this.configFields = configFields;

        /**
         *
         * @type {Object}
         */
        if ((typeof validators === 'undefined' ? 'undefined' : _typeof(validators)) !== 'object') {
            throw new TypeError('validators is not of type object');
        }
        this.validators = validators;

        /**
         *
         * @type {Object}
         */
        if ((typeof feedbackDisplay === 'undefined' ? 'undefined' : _typeof(feedbackDisplay)) !== 'object') {
            throw new TypeError('feedbackDisplay is not of type object');
        }
        this.feedbackDisplay = feedbackDisplay;
        /**
         * {@link dispatchEvent}
         * @type {Function}
         */
        this.dispatchEvent = _dispatchEvent2.default;
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
     * @example
     *
     * from HTML:
     * "feedbackDisplay": {
     *   "fieldShowState": true
     * }
     *
     * from validator:
     * result = {
     *            options: {
     *                'feedbackDisplay': {
     *                    "fieldShowState": false
     *                }
     *            },
     *            isValid: valid
     *        }
      */


    _createClass(Resolver, [{
        key: 'getValidationFeedbackData',
        value: function getValidationFeedbackData(result, fieldName) {

            if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) !== 'object') {
                throw new TypeError('result must be an object');
            }

            if (typeof fieldName !== 'string') {
                throw new TypeError('fieldName must be a string');
            }

            // get validator feedbackData
            var configFeedbackDisplayValidator = result.options && result.options.feedbackDisplay ? result.options.feedbackDisplay : {};
            var configFeedbackDisplay = {};

            Object.keys(this.configFields[fieldName].feedbackDisplay).forEach(function (key) {
                configFeedbackDisplay[key] = typeof configFeedbackDisplayValidator[key] !== 'undefined' ? _typeof(this.configFields[fieldName].feedbackDisplay[key]) === 'object' && _typeof(configFeedbackDisplayValidator[key]) === 'object' ? Object.assign(this.configFields[fieldName].feedbackDisplay[key], configFeedbackDisplayValidator[key]) : configFeedbackDisplayValidator[key] : this.configFields[fieldName].feedbackDisplay[key];
            }.bind(this));

            return configFeedbackDisplay;
        }

        /**
         *
         * @param {Object} setByValidatorOnly
         */

    }, {
        key: 'displayActionSetByValidatorOnly',
        value: function displayActionSetByValidatorOnly(setByValidatorOnly) {
            this.feedbackDisplay.setStatusBySelector(setByValidatorOnly.fieldShowStateValidSel, true);
            this.feedbackDisplay.setStatusBySelector(setByValidatorOnly.fieldShowStateInvalidSel, false);
            this.feedbackDisplay.removeStatusBySelector(setByValidatorOnly.fieldRemoveStateSel);
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

    }, {
        key: 'displayActionInvalid',
        value: function displayActionInvalid(result, fieldDom, validator, configFeedbackDisplay) {
            var message = typeof validator.message !== 'undefined' && (configFeedbackDisplay.preferHTMLValidatorMessage || typeof result.message === 'undefined') ? validator.message : typeof result.message !== 'undefined' ? result.message : '';

            if (configFeedbackDisplay.fieldShowState) {
                this.feedbackDisplay.setStatus(fieldDom, false, configFeedbackDisplay.fieldIdForAriaUsage);
            } else {
                this.feedbackDisplay.removeStatus(fieldDom);
            }

            if (configFeedbackDisplay.messageShow) {
                this.feedbackDisplay.showMessage(fieldDom, message, configFeedbackDisplay.messageLocation, fieldDom.id);
            }

            this.displayActionSetByValidatorOnly(configFeedbackDisplay.setByValidatorOnly);
        }

        /**
         * This function provides validation valid actions.
         *
         * @param {Object} fieldDom
         * @param {Object} configFeedbackDisplay
         */

    }, {
        key: 'displayActionValid',
        value: function displayActionValid(fieldDom, configFeedbackDisplay) {
            if (configFeedbackDisplay.fieldShowState) {
                this.feedbackDisplay.setStatus(fieldDom, true, configFeedbackDisplay.fieldIdForAriaUsage);
            } else {
                this.feedbackDisplay.removeStatus(fieldDom);
            }

            this.feedbackDisplay.removeMessageAndAccordingAriaAttrOfField(fieldDom);
            this.displayActionSetByValidatorOnly(configFeedbackDisplay.setByValidatorOnly);
        }

        /**
         * Collects values of group members of field (set by sendToValidatorDataGroupSel)
         * to give additional data to the validators
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

    }, {
        key: 'getAddDataOfGroupMembers',
        value: function getAddDataOfGroupMembers(fieldName, configFields) {
            var fields = document.querySelectorAll(configFields[fieldName].sendToValidatorDataGroupSel);
            var addInfo = [];
            Array.prototype.forEach.call(fields, function (field) {
                addInfo.push({ id: field.id, value: field.value });
            });

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

    }, {
        key: 'resolver',
        value: function resolver() {
            /**
             * The validation resolver is handling the validators and validation-config
             * to serve proper validation data to the ValidationService - class.
             */
            return {
                /**
                 * This function is used in {link @validate},
                 * @param {String} validatorName - The name of the validator
                 * @return {Promise} - Returns am promise which is solved in @validate
                 */
                getValidator: function (validatorName) {

                    return new Promise(
                    /**
                     * @param {Function} resolve
                     */
                    function (resolve) {

                        resolve(
                        /**
                         *  This function is giving back via "resolve" to {@link validate}
                         *  and could be taken via "then". It's executed in {@link validate}.
                         */

                        /**
                         * @param {String} value
                         * @param {Object} validator
                         * @param {Object} validationService
                         * @param {String} fieldName
                         * @return {Promise}
                         */
                        function (value, validator, validationService, fieldName) {
                            /**
                             * @param {Function} resolve
                             * @param {Function} reject
                             */
                            return new Promise(function (resolve, reject) {
                                var fieldDom = document.getElementById(fieldName);

                                var sendToValidatorAddData = {
                                    // e.g.: {"message": 'Required "name" not set'}
                                    domConfigData: this.configFields[fieldName].validators[validatorName]
                                };

                                if (this.configFields[fieldName].sendToValidatorDataGroupSel !== null) {
                                    sendToValidatorAddData.groupData = this.getAddDataOfGroupMembers(fieldName, this.configFields);
                                }

                                if (typeof this.validators[validatorName] === 'undefined') {
                                    console.log('ERROR: Validator', validatorName, 'not defined');
                                }

                                this.validators[validatorName](value, sendToValidatorAddData).then(function (result) {

                                    var configFeedbackDisplay = this.getValidationFeedbackData(result, fieldName);
                                    this.displayActionValid(fieldDom, configFeedbackDisplay, this.feedbackDisplay);

                                    if (this.configFields[fieldName].setEventOnValidation) {
                                        this.dispatchEvent(fieldDom, true);
                                    }

                                    resolve({
                                        isValid: true
                                    });
                                }.bind(this)).catch(function (result) {

                                    var configFeedbackDisplay = this.getValidationFeedbackData(result, fieldName);

                                    this.displayActionInvalid(result, fieldDom, validator, configFeedbackDisplay);

                                    if (this.configFields[fieldName].setEventOnValidation) {
                                        this.dispatchEvent(fieldDom, false);
                                    }

                                    reject({
                                        isValid: false
                                    });
                                }.bind(this));
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));
                }.bind(this)
            };
        }
    }]);

    return Resolver;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = email;
/**
 *
 * @param {String} value
 * @returns {Promise}
 */
function email(value) {
    return new Promise(function (resolve, reject) {
        // eslint-disable-next-line
        var regE = new RegExp(['^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)', '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
        // eslint-disable-next-line
        '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+', '[a-zA-Z]{2,}))$'].join(''));
        var valid = regE.test(value);

        if (valid) {
            resolve({
                isValid: valid
            });
        } else {
            reject({
                isValid: valid,
                message: 'Enter a valid email, please.'
            });
        }
    });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = required;
/**
 * The required validator.
 * @param {String} value
 * @returns {Promise}
 */
function required(value) {
    return new Promise(function (resolve, reject) {
        var valid = typeof value === 'string' && value !== '' ? value.trim() === '' ? false : true : value;

        if (valid) {
            resolve({
                isValid: true
            });
        } else {
            reject({
                isValid: false,
                message: 'This field is mandatory.'
            });
        }
    });
}

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FormValidation = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validationService = __webpack_require__(11);

var _cache = __webpack_require__(5);

var _resolver = __webpack_require__(8);

var _feedbackDisplay = __webpack_require__(7);

var _condition = __webpack_require__(6);

var _condition2 = _interopRequireDefault(_condition);

var _behaviour = __webpack_require__(4);

var _required = __webpack_require__(10);

var _required2 = _interopRequireDefault(_required);

var _email = __webpack_require__(9);

var _email2 = _interopRequireDefault(_email);

var _getValidationFields2 = __webpack_require__(0);

var _getValidationFields3 = _interopRequireDefault(_getValidationFields2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var FormValidation = exports.FormValidation = function () {

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
    function FormValidation(options) {
        _classCallCheck(this, FormValidation);

        /**
         *
         * @type {Object} - merged options
         */
        this.options = this.getMergedOptions(options);

        /**
         * {@link FeedbackDisplay}
         * @type {Class}
         */
        this.feedbackDisplay = new _feedbackDisplay.FeedbackDisplay(options.feedbackDisplayOptions);

        /**
         * {@link Cache}
         * cache set a to this context to make them public
         * @type {Class}
         */
        this.cache = new _cache.Cache(this.options.validationAttr);

        /**
         * @type {Array} - Field dom references
         */
        var fields = this.getValidationFields();

        /**
         * {@link getValidationConfig}
         * @type {Object}
         */
        this.config = this.getValidationConfig(fields);

        /**
         * {@link getValidationFieldConfig}
         * @type {Object}
         */
        this.configFields = this.getValidationFieldConfig(fields);
    }

    /**
     *
     * @type {Class} Resolver
     */


    _createClass(FormValidation, [{
        key: 'setResolver',
        value: function setResolver() {
            this.resolver = new _resolver.Resolver(this.configFields, this.options.validators, this.feedbackDisplay);
        }

        /**
         * Initializes the validation service
         * and field behaviour.
         */

    }, {
        key: 'setValidationAndBehaviour',
        value: function setValidationAndBehaviour() {
            /**
             * {@link ValidationServiceDom}
             * @type {Class}
             */
            this.validation = new _validationService.ValidationServiceDom(this.config, this.resolver.resolver(), this.options.caching ? this.cache.getValidationCache() : this.cache.getValidationOffCache(), this.options.stopValidationOnFirstFail);

            /**
             *
             * @type {Object} behaviour {@link Behaviour}
             */
            try {
                this.behaviour = new this.options.Behaviour(this.options.formId, this.options.validationAttr, this.options.condition, this.configFields, this.validation);
                this.behaviour.behaviour();
            } catch (error) {
                // console.log( 'options.Behaviour must be a class/prototype to be instanciated of this.behaviour' );
                throw new Error('options.Behaviour must be a class/prototype to be instanciated of this.behaviour');
            }
        }

        /**
         * Does the required setup.
         * Set in extra part - why?
         * This allows to manipulate several objects for customization
         */

    }, {
        key: 'init',
        value: function init() {
            this.setResolver();
            this.setValidationAndBehaviour();
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

    }, {
        key: 'getDefaultOptions',
        value: function getDefaultOptions() {
            return {
                caching: true,
                formId: null,
                validationAttr: 'data-validation',
                stopValidationOnFirstFail: true,
                condition: _condition2.default,
                Behaviour: _behaviour.Behaviour,

                validators: {
                    required: _required2.default,
                    email: _email2.default
                }
            };
        }

        /**
         * Merges default options given options
         * @param {Object} options
         * @returns {Object}
         */

    }, {
        key: 'getMergedOptions',
        value: function getMergedOptions(options) {
            if (typeof options === 'undefined' || (typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
                throw new TypeError('Options must be an object.');
            }

            if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
                if (typeof options.formId !== 'string') {
                    throw new TypeError('Options formID must be String.');
                }
            }

            /**
             * The options merged by default options and param options.
             * @type {Object}
             */
            var opt = Object.assign(this.getDefaultOptions(), options);
            /**
             * Merging via assign is not working proper on subobjects.
             * So we have to merge separately.
             * @type {Object}
             */
            opt.validators = Object.assign(this.getDefaultOptions().validators, options.validators);
            return opt;
        }

        /**
         * @link {getValidationFields}
         * @returns {Array}
         */

    }, {
        key: 'getValidationFields',
        value: function getValidationFields() {
            return (0, _getValidationFields3.default)(this.options.formId, this.options.validationAttr, this.options.condition);
        }
    }, {
        key: 'getFieldData',
        value: function getFieldData(field) {
            var objData = field.getAttribute(this.options.validationAttr);
            try {
                objData = JSON.parse(objData);
            } catch (error) {
                console.log('Error while trying to parse objData:' + objData);
                console.log('Error:' + error);
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

    }, {
        key: 'getValidationConfig',
        value: function getValidationConfig(fields) {
            var configService = {};

            fields.forEach(function (field) {
                var objData = this.getFieldData(field);

                var validators = {};
                if (_typeof(objData.validators) !== 'object') {
                    throw new TypeError('validators must be of type object');
                }
                Object.keys(objData.validators).forEach(function (validatorName) {
                    var obj = {
                        message: objData.validators[validatorName].message
                    };
                    validators[validatorName] = obj;
                });

                if (Object.keys(objData.validators).length < 1) {
                    throw new Error('no validators specified');
                }

                configService[field.id] = validators;
            }.bind(this));
            return configService;
        }

        /**
         * Fills up the validation data values
         * (Id of fields with it's value).
         * This values are used to validate.
         * {@link ValidationService.validate},
         * ({@link ValidationServiceDom.setValueByField},
         * {@link ValidationService.getValue} )
         */

    }, {
        key: 'setValues',
        value: function setValues() {
            var fieldIdentifiers = Object.keys(this.config);
            fieldIdentifiers.forEach(function (identifier) {
                var el = document.getElementById(identifier);
                this.validation.setValueByField(el);
            }.bind(this));
        }

        /**
         * This function should be called
         * if any input fields have been added or deleted.
         * or before a validation of the entire form starts (Its called by {@link validateForm} )
         */

    }, {
        key: 'updateConfigAndValuesAndBehaviour',
        value: function updateConfigAndValuesAndBehaviour() {
            /**
             * @type {Array} - Field dom references
             */
            var fields = this.getValidationFields();
            this.config = this.getValidationConfig(fields);
            this.configFields = this.getValidationFieldConfig(fields);
            this.validation.setConfig(this.config);
            this.setValues();
            this.setResolver();
            this.validation.setResolver(this.resolver.resolver());
            this.behaviour.updateConfigFieldsAndValidation(this.configFields, this.validation);
            this.behaviour.behaviour();
        }

        /**
         * This function is validating the entire form.
         * @returns {Promise}
         */

    }, {
        key: 'validateForm',
        value: function validateForm() {
            return this.validation.validateForm(this.options.formId);
        }

        /**
         * The Default field config for each field.
         * @return {Object} This data is used in {@link getValidationFieldConfig}
         * @property {null} validators : null
         * @property {Object} feedbackDisplay {@link FeedbackDisplay.getDefaultFieldOptions}
         * @property {Boolean} caching : false
         * @property {Boolean} setEventOnValidation : false
         * @property {null} sendToValidatorDataGroupSel : null {@link Resolver}
         * @property {null} behaviourGroupSel : null - used in {@link Behaviour}
         */

    }, {
        key: 'getDefaultValidationFieldConfig',
        value: function getDefaultValidationFieldConfig() {
            return {
                validators: null,
                feedbackDisplay: _feedbackDisplay.FeedbackDisplay.getDefaultFieldOptions(),
                caching: true,
                setEventOnValidation: false,
                sendToValidatorDataGroupSel: null,
                behaviourGroupSel: null
            };
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
         * @property {String} behaviourGroupSel : null|*css selector*
         *
         */

    }, {
        key: 'getValidationFieldConfig',
        value: function getValidationFieldConfig(fields) {
            var config = {};
            var configFields = {};
            fields.forEach(function (field) {
                var objData = this.getFieldData(field);
                var objDataField = this.getDefaultValidationFieldConfig();
                objDataField.validators = objData.validators;
                Object.keys(objData).forEach(function (key) {
                    if (key !== 'validators') {
                        if (key === 'feedbackDisplay') {
                            Object.keys(objData.feedbackDisplay).forEach(function (key) {
                                if (key === 'messageLocation') {
                                    _feedbackDisplay.FeedbackDisplay.checkMessageLocationDataFormat(objData.feedbackDisplay[key]);
                                }
                                objDataField.feedbackDisplay[key] = objData.feedbackDisplay[key];
                            }.bind(this));
                        } else {
                            objDataField[key] = objData[key];
                        }
                    }
                }.bind(this));

                configFields[field.id] = objDataField;
            }.bind(this));
            config.fields = configFields;
            return config.fields;
        }
    }]);

    return FormValidation;
}();

/***/ })
/******/ ]);
});