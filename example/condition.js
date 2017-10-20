validation.condition = function( field ) {
    // adjusted jQuery
    // https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
    return !!( ( field.offsetWidth || field.offsetHeight ) && field.offsetParent );
};
