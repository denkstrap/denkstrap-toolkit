validation.setFeedbackDisplayLayout = function( form, validationService ) {
    var feedbackDisplay = validationService.feedbackDisplay;
    var opt = {};
    opt.messageLayoutTemplateInnerPosIdPrefix = 'validation-message-layout-inner-';
    opt.messageLayoutTemplate =
        '<div class="validation-message-layout" id="{{ id }}">' +
        '<div class="validation-message-layout__col-1" id="' +
        opt.messageLayoutTemplateInnerPosIdPrefix + '{{ id-suffix-1 }}"></div>' +
        '<div class="validation-message-layout__col-2" id="' +
        opt.messageLayoutTemplateInnerPosIdPrefix + '{{ id-suffix-2 }}"></div>' +
        '</div>';
    opt.messageCreateFunction = function( messageInfoData, html ) {
        var insertLoc = messageInfoData.insertLoc;
        var breakpointData = messageInfoData.breakpointData;
        if ( breakpointData && breakpointData.layoutContainerIdOuter && breakpointData.layoutContainerIdNrInner ) {
            var htmlLayoutDom = document.getElementById( breakpointData.layoutContainerIdOuter );

            if ( htmlLayoutDom === null ) {
                var htmlLayout = feedbackDisplay.options.messageLayoutTemplate.replace( '{{ id }}',
                    breakpointData.layoutContainerIdOuter ).replace( '{{ id-suffix-' +
                    breakpointData.layoutContainerIdNrInner + ' }}',
                    breakpointData.layoutContainerIdNrInner );
                insertLoc.insertAdjacentHTML( 'beforebegin', htmlLayout );
            } else {
                var el = document.getElementById( opt.messageLayoutTemplateInnerPosIdPrefix +
                    breakpointData.layoutContainerIdNrInner );
                if ( el === null ) {
                    el = document.getElementById( opt.messageLayoutTemplateInnerPosIdPrefix +
                        '{{ id-suffix-' + breakpointData.layoutContainerIdNrInner + ' }}' );
                    el.id = opt.messageLayoutTemplateInnerPosIdPrefix +
                        breakpointData.layoutContainerIdNrInner;
                }
            }

            var insertLoc = document.getElementById( opt.messageLayoutTemplateInnerPosIdPrefix +
                breakpointData.layoutContainerIdNrInner );
            insertLoc.insertAdjacentHTML( 'afterbegin', html );

        } else {
            insertLoc.insertAdjacentHTML( 'beforebegin', html );
        }
    }
    feedbackDisplay.options = Object.assign( feedbackDisplay.getOptions(), opt );
    // console.log( 'feedbackDisplay', validationService.feedbackDisplay.options );
};