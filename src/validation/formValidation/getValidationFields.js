/**
 * Returns all fields dom references of the form
 * considering the given condition.
 * @param {String} formId
 * @param {Function} condition
 * @return {Array} Collection of dom element references
 * @property {Object} field reference to dom element
 */
export default function getValidationFields( formId, condition) {
    var form = document.getElementById( formId );
    var fields = form.querySelectorAll(
        'input[data-validation],select[data-validation],textarea[data-validation]' );

    var fieldsAry = [];
    Array.prototype.forEach.call( fields, function( field ) {
        if ( condition( field ) ) {
            fieldsAry.push( field );
        }
    }.bind( this ) );

    return fieldsAry;
}