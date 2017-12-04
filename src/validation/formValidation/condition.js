/**
 * The condition function provides a condition for validation of each field.
 * @param {Object} field - Reference to dom object.
 * @returns {Boolean}
 */
export default function condition( field ) {
    // adjusted jQuery
    // https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
    return !!( ( field.offsetWidth || field.offsetHeight ) && field.offsetParent );
}


