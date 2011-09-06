(function($) {

    var sprites = $("<div>");
    var templates = {};
    var pattern  = /\$\{partial\(([^}]+)\)\}/g;

    var spriteLoader = function(sprite) {
        sprite = "div#" + sprite.replace(/\"/g, "").replace(/\./g, "\\.").toString();
        return sprites.find(sprite).html().toString();
    };
    $.fn.extend({

        loadTemplate: function(templateConfig, callback) {
            $.get(templateConfig.url, function(template) {
                sprites.append(template);

                /**
                 * Partial Process
                 */
                var partials = template.match(pattern);
                if(partials) {
                    for(var i = 0; i < partials.length; i++) {
                        var nestedTemplate = partials[i].replace(pattern, "$1");
                        var tmpl = spriteLoader(nestedTemplate);
                        templates[nestedTemplate] = new Eljs({
                            template: tmpl
                        }).compile();
                    }
                }

                templates[templateConfig.url] = new Eljs({
                    template: spriteLoader(templateConfig.sprite),
                    helpers: {
                        partial: function(sprite) {
                            var json = templates[templateConfig.url].json;
                            var html = "";
                            var engine = templates[sprite] ||
                            templates["'"+sprite+"'"] ||
                            templates["\""+sprite+"\""];
                            var arr = json.trying(sprite);
                            for(var i = 0; i < arr.length; i++) {
                                html = html + engine.parse({button:arr[i] });
                            }
                            return html;
                        }
                    }
                }).compile();
                if(typeof callback === "function") {
                    callback( templates[templateConfig.url] );
                }
            });
        },
        modal: function(json, url, sprite) {
            var content = $(this);
            var fnCallback = function(renderer) {
                content
                .append(renderer.parse(json))
                .appendTo($(document.body));
            };
            var engine = templates[url];
            if(engine) {
                fnCallback(engine);
            } else {
                content.loadTemplate({url: url, sprite: sprite}, fnCallback);
            }
            return content;
        }
    });
})(jQuery);