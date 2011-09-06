if(Object.defineProperty) {
    Object.defineProperty(Object.prototype, 'trying', {
        enumerable: false,
        value: function(property) {
            var retorno = false;
            var lastProperty = this;
            (function percorrer(property) {
                var hierarchy = property.split(".");
                var first = hierarchy[0];
                lastProperty = (lastProperty) ?  lastProperty[first]: undefined;
                var type = typeof lastProperty;
                retorno = (type != 'undefined');
                if(type == 'function') {lastProperty = lastProperty();}
                if(hierarchy.length > 1) {
                    first = hierarchy.shift();
                    percorrer(hierarchy.join("."));
                }
            })(property);
            return (retorno)? lastProperty : retorno;
        }
    });
    
    
    /**
     * @description Interpolate a string and fills it with json's properties
     * @argument values A json with properties for fill template
     * @argument @optional pattern A pattern for matching
     * @return String
     * @example "teste #{id} - #{teste}".interpolate({id:3});
     */
    Object.defineProperty(String.prototype, 'interpolate', {
        enumerable: false,
        value: function(values, pattern) {
            var pattrn = pattern || /\#\{([^}]+)\}/g;
            return this.replace(pattrn, function(match, value){
                var result = values[value];
                return (result)? result: "";
            });
        }
    });
    
    
    
    
}