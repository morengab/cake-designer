function Calculator (cake) {
    this.cake = cake;
    this.prices = {
        "tiers": {
            "small": 20.00,
            "large": 30.00,
            "tiered": 50.00
        },
        "decorations": {
            "sm_bow": 4.00,
            "bow": 6.00,
            "rose": 4.00, 
            "bouquet": 4.00,
            "butterfly": 3.00 
        }
    },
    this.total = 0.0
}

Calculator.prototype.renderPrice = function() {
    // var receipt = document.getElementById("")

}

Calculator.prototype.updateReceipt = function() {
    var total = 0.0,
        prices = this.prices,
        cake = this.cake,
        tiers = cake.tiers;

    // tiers
    total += prices.tiers[cake.attrs.size];


    this.total = total;
    this.renderPrice();
}