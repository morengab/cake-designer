function Cake(attrs, HTMLelem) {
    var dflt = {
        flavor: "chocolate",
        size: "tiered",
        tiers: [HTMLelem.firstElementChild],
        elem: HTMLelem,
        calculator: new Calculator(this)
    };
    attrs = mergeWithDefault(attrs, dflt);
    Chargeable.call(this, attrs);
    this.draw();
}
Cake.inheritsFrom(Chargeable);

Cake.prototype.addTier = function() {
    var newTier = document.createElement("div");
        newTier.className = "tier";
        newTier.setAttribute("data-size", "tiered_large");

    this.attrs.elem.appendChild(newTier);
    this.attrs.tiers.push(newTier);
}

Cake.prototype.removeTier = function () {
    var old = this.attrs.tiers.pop();
    this.attrs.elem.removeChild(old);
}

Cake.prototype.updateSize = function() {
    var size = this.attrs.size,
        tiers = this.attrs.tiers;

    if (size === "tiered") {
        // update tiers
        if (tiers.length < 2) {
            this.addTier();
        }
        
        var tier_small = tiers[0],
            tier_large = tiers[1];
        tier_small.setAttribute("data-size", "small");
        tier_large.setAttribute("data-size", "large");
    } 
    else {
        if (!size) {return;}
        // update tiers
        if (tiers.length > 1) {
            this.removeTier();
        }
        // draw normal
        var tier = tiers[0];
        tier.setAttribute("data-size", size);        
    }
}

Cake.prototype.updateFlavor = function() {
    var flavor = this.attrs.flavor,
        tiers = document.getElementsByClassName("tier");
    
    if (!flavor) {return;}

    for (var i=0; i<tiers.length; i++) {
        tiers[i].setAttribute("data-flavor", flavor);
    }
}

Cake.prototype.updateReceipt = function() {
    var calculator = this.attrs.calculator;
        calculator.updateReceipt();
}

Cake.prototype.createDecoration = function (deco) {
    if (!deco) return;
    new Decoration({}, deco);
}

Cake.prototype.setFlavor = function(flavor) {
    if (!flavor) return;
    this.attrs.flavor = flavor;
    this.draw();
}

Cake.prototype.setSize = function(size) {
    if (!size) return;
    this.attrs.size = size;
    this.draw();   
}

Cake.prototype.draw = function (context) {
    this.updateSize();
    this.updateFlavor();
    this.updateReceipt();
}

function Decoration(attrs, type) {
    var deco = document.createElement("div"),
        palette = document.getElementById("palette"),
        dflt = {
        elem: deco
    };
    deco.className = "deco";
    deco.setAttribute("data-type", type);
    palette.appendChild(deco);

    attrs = mergeWithDefault(attrs, dflt);
    Chargeable.call(this, attrs);
}
Decoration.inheritsFrom(Chargeable);

