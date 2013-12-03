function Cake(attrs, HTMLelem) {
    var dflt = {
        flavor: "",
        size: "",
        price: 0.00,
        tiers: [HTMLelem.firstElementChild],
        elem: HTMLelem
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
}
Cake.inheritsFrom(Drawable);

Cake.prototype.sizes = {
    "small": {
        "w": 100,
        "h": 50
    },
    "large": {
        "w": 150,
        "h": 50
    }
}

Cake.prototype.addTier = function() {
    var newTier = document.createElement("div");
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
        
        var tier1 = tiers[0],
            tier2 = tiers[1],
            small = this.sizes["small"],
            large = this.sizes["large"];
        
        // draw tier 1
        tier1.style.width = small.w + "px";
        tier1.style.height = small.h + "px";
        tier1.style.left = ((large.w - small.w) / 2) + "px";
        tier1.style.top = "0px";

        // draw tier 2
        tier2.style.width = large.w + "px";
        tier2.style.height = large.h + "px";
        tier2.style.top = small.h + "px";
        tier2.style.left = "0px";
    } 
    else {
        // update tiers
        if (tiers.length > 1) {
            this.removeTier();
        }
        // draw normal
        var dimension = this.sizes[size],
            tier = tiers[0];
        tier.style.width = dimension.w + "px";
        tier.style.height = dimension.h + "px";
        
    }
}

Cake.prototype.draw = function (context) {
    this.updateSize();
}
    

Cake.prototype.setSize = function(size) {
    this.attrs.size = size;
    this.draw();
}