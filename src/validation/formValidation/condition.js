/**
 * The condition function provides conditions for validation of each field.
 */

export default function condition( field ) {
    // adjusted jQuery
    // https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
    return !!( ( field.offsetWidth || field.offsetHeight ) && field.offsetParent );
}


