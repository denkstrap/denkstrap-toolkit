

var prismMarks = document.querySelectorAll('[data-prism]');

var escapeHTML = function( html ) {
    var tagsToReplace = {
        '<': '&lt;',
        '>': '&gt;'
    };
    return html.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};



prismMarks.forEach(function (el) {
    var escapedHTML = escapeHTML( el.innerHTML );
    var html = '<div class="prism-custom-wp">' + 
    '<div class="prism-custom-wp__inner"><pre class="prism-custom-pre"><code class="language-html">' + escapedHTML + 
    '</code></pre></div></div>';
    el.insertAdjacentHTML('afterend', html);
});