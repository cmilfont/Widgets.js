(function($){
    $.fn.extend({
        modal: function(json, url) {
        	var content = $(this);
        	$.get(url, function(template){
                var renderer = new Eljs({ 
                    template: template,
                    json : json, 
                    helpers: {}
                });
                content.append(renderer.parse());        		
        	});
            return content;
        }
    });
})(jQuery)