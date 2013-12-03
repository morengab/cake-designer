function Drawable(attrs) {
    var dflt = {
        left: 0,
        top: 0,
        width: 100,
        height: 100
    };
    this.attrs = mergeWithDefault(attrs, dflt);
}

Drawable.prototype.draw = function (context) {
    console.log("ERROR: Calling unimplemented draw method on drawable object.");
}