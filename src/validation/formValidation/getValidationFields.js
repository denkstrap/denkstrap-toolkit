/**
 * Returns all fields dom references of the form
 * considering the given condition.
 * @param {String} formId
 * @param {String} validationAttr - validation attr (where validation data is stored)
 * @param {Function} condition
 * @return {Array} Collection of dom element references
 * @property {Object} field reference to dom element
 */
export default function getValidationFields( formId, validationAttr, condition) {
    if ( typeof formId !== 'string' ) {
        throw new TypeError( 'formId must be of type string' );
    }

    if ( typeof validationAttr !== 'string' ) {
        throw new TypeError( 'validationAttr must be of type string' );
    }

    if ( typeof condition !== 'function' ) {
        throw new TypeError( 'condition should be of type function' )
    }

    var form = document.getElementById( formId );
    if ( form === null ) {
        throw new TypeError( 'form should not be null' )
    }
    var fields = form.querySelectorAll(
        'input[' + validationAttr + '],select[' + validationAttr+ '],textarea['+ validationAttr + ']' );

    var fieldsAry = [];
    Array.prototype.forEach.call( fields, function( field ) {
        if ( condition( field ) ) {
            fieldsAry.push( field );
        }
    }.bind( this ) );

    return fieldsAry;
}