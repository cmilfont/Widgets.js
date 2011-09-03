describe("Parse do modal", function(){
    
	var spriteLoader, json, parsed, $modal;
	
	beforeEach(function() {
	   var fs = require("fs");
	   parsed = fs.readFileSync(__dirname + "/parsed.html").toString();
	   global.Eljs = require("eljs").Eljs;
	   spriteLoader = function() {
	       return fs.readFileSync(__dirname + "/template.html").toString();
	   };
	   jsonTemplate = {
                "Widgets": {
                    Modal: {
                        head: {
                            title: "Teste de Modal"
                        },
                        body: "Teste do corpo"
                    },
                    buttons: [
                        {
                            name: "Butao"
                        }
                    ]
                }
            };
       
        jQuery.extend({
            get: function( url, callback ) {
                var templatePath = __dirname + "/" + url;
                var template     = fs.readFileSync(templatePath).toString();
                callback(template);
            }
        });
        jQuery.fn.extend({
        	offset: function() {
                return {top: 80, left: 363};
            }
        });
        global.document.documentElement.clientHeight = 80;
        global.document.documentElement.clientWidth  = 363;
       require('../lib/widgets.dialog');
       var url = "template.html";
       $modal = jQuery("<div>").modal(jsonTemplate, url);
	});
	
	describe("Deveria renderizar o template", function() {
        it("Deveria buscar o template via Ajax", function() {
            var rendered = $modal.html().toString();
            expect(parsed).toEqual(rendered);
        });
        
        describe("Deveria estar exibido na página", function() {
            it("Deveria estar contido em window.document", function() {
            	$modal.attr("id", "teste");
	            var estaContido = jQuery(document).find("#teste")[0];
	            expect(estaContido).toBeDefined();
            });
            
            it("Deveria não ser hidden", function() {
                expect(true).toEqual($modal.is(':visible'));
            });
            
            it("Deveria estar no centro da página", function() {
                var top = Math.floor(global.document.documentElement.clientHeight);
                var left = Math.floor(global.document.documentElement.clientWidth);
                var offset = $modal.offset();
                expect(offset).toEqual({top: top, left: left});
            })
        });
            
	});
    

    
    xit("Não Deveria renderizar o template", function() {
        var $modal = jQuery("<div>").modal({}, spriteLoader());
        var rendered = $modal.html().toString();
        expect(parsed).not.toEqual(rendered);
    });
    
	
})