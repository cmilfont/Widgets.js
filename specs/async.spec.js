describe("Modal Async", function(){
    
    var spriteLoader, json, parsed, $modal;
    
    beforeEach(function() {
       var fs = require("fs");
       parsed = fs.readFileSync(__dirname + "/parsed.html").toString();
       global.Eljs = require("eljs").Eljs;

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
                fs.readFile(templatePath, function (err, data) {
                  if (err) throw err;
                  callback(data.toString());
                });
            }
        });
       require('../lib/minified/widgets.min');
       var url = "template.html";
       $modal = jQuery("<div>").modal(jsonTemplate, url);
    });
    
    it("Deveria renderizar o template de forma async", function() {

        waitsFor(function(){
            return $modal.html().toString() !== "";
        }, "Rendered Template", 10000);
        runs(function(){
        	var rendered = $modal.html().toString();
            expect(parsed).toEqual(rendered);
        });
        
    });
    

    
    
})