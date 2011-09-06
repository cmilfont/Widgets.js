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
}