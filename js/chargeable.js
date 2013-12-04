function Chargeable(attrs) {
    var dflt = {
        price: 0.00,
        tax: 0.00
    };
    this.attrs = mergeWithDefault(attrs, dflt);
}