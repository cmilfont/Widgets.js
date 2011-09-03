describe("Parse do modal", function(){
    
	var spriteLoader, json, parsed;
	
	beforeEach(function() {
	   var fs = require("fs");
	   parsed = fs.readFileSync(__dirname + "/parsed.html").toString();
	   global.Eljs = require("eljs").Eljs;
	   spriteLoader = function() {
	       return fs.readFileSync(__dirname + "/template.html").toString();
	   };
	   json = {
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
	})
	
    it("Deveria renderizar o template", function() {
    	var renderer = new Eljs({ 
            template: spriteLoader( "Widgets\\.Modal" ),
            json : json, 
            helpers: {}
        });
        var rendered = renderer.parse();
        expect(parsed).toEqual(rendered);
    })
	
})