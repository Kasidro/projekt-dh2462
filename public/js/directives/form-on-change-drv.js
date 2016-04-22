magenta.directive("formOnChange", function($parse, $interpolate) {
    return {
        require: "form",
        link: function(scope, element, attrs, form) {
            var cb = $parse(attrs.formOnChange);
            element.on("change", function() {
                cb(scope);
            });
        }
    };
});
