validation.setFeedbackDisplayLayout = function( form, validationService ) {
    var feedbackDisplay = validationService.feedbackDisplay;
    var opt = {};
    opt.messageLayoutTemplateInnerPosIdPrefix = 'validation-message-layout-inner-';
    opt.messageLayoutTemplate =
        '<div class="validation-message-layout" id="{{ id }}">' +
        '<div class="validation-message-layout__col-1" id="' + opt.messageLayoutTemplateInnerPosIdPrefix + '{{ id-suffix-1 }}"></div>' +
        '<div class="validation-message-layout__col-2" id="' + opt.messageLayoutTemplateInnerPosIdPrefix + '{{ id-suffix-2 }}"></div>' +
        '</div>';
    opt.messageCreateFunction = function( messageInfoData, html ) {
        var insertLoc = messageInfoData.insertLoc;
        if ( messageInfoData.layoutContainerIdOuter && messageInfoData.layoutContainerIdNrInner ) {
            var htmlLayoutDom = document.getElementById( messageInfoData.layoutContainerIdOuter );

            if ( htmlLayoutDom === null ) {
                var htmlLayout = feedbackDisplay.options.messageLayoutTemplate.replace( '{{ id }}', messageInfoData.layoutContainerIdOuter ).replace( '{{ id-suffix-' + messageInfoData.layoutContainerIdNrInner + ' }}', messageInfoData.layoutContainerIdNrInner );
                insertLoc.insertAdjacentHTML( 'beforebegin', htmlLayout );
            } else {
                var el = document.getElementById( feedbackDisplay.options.messageLayoutTemplateInnerPosIdPrefix + messageInfoData.layoutContainerIdNrInner );
                if ( el === null ) {
                    el = document.getElementById( feedbackDisplay.options.messageLayoutTemplateInnerPosIdPrefix + '{{ id-suffix-' + messageInfoData.layoutContainerIdNrInner + ' }}' );
                    el.id = feedbackDisplay.options.messageLayoutTemplateInnerPosIdPrefix + messageInfoData.layoutContainerIdNrInner;
                }
            }

            var insertLoc = document.getElementById( feedbackDisplay.options.messageLayoutTemplateInnerPosIdPrefix + messageInfoData.layoutContainerIdNrInner );
            insertLoc.insertAdjacentHTML( 'afterbegin', html );

        } else {
            insertLoc.insertAdjacentHTML( 'beforebegin', html );
        }
    }
    feedbackDisplay.options = Object.assign( feedbackDisplay.getOptions(), opt );
    // console.log( 'feedbackDisplay', validationService.feedbackDisplay.options );
};