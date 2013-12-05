var selected_deco = undefined;

function Decoration(attrs, type) {
    var deco = document.createElement("div"),
        img = new Image();
        
    var dflt = {
        elem: deco,
        deco_class: "deco",
        selected_class: "selected",
        hover_class: "hover"
    };

    deco.self = this;
    deco.className = "deco";
    deco.setAttribute("data-type", type);
    
    img.src = "img/"+type+".svg";

    deco.appendChild(img);
    palette.appendChild(deco);

    $(deco).draggable({
        containment: "parent",
        stack: "."+dflt.deco_class
    });
    
    $(deco).hover( 
        function () {
            if (!$(this).hasClass(dflt.hover_class)) {
                $(this).addClass(dflt.hover_class);
            }
        }, 
        function () {
            if ($(this).hasClass(dflt.hover_class)) {
                $(this).removeClass(dflt.hover_class);
            }
        } 
    );

    $(deco).click(function (){
        $("."+dflt.deco_class).removeClass(dflt.selected_class);
        $(this).addClass(dflt.selected_class);
        selected_deco = this; 
    });

    $(deco).mouseup(function (){
        $("."+dflt.deco_class).removeClass(dflt.selected_class);
        $(this).addClass(dflt.selected_class);
        selected_deco = this;
    });

    attrs = mergeWithDefault(attrs, dflt);
    Chargeable.call(this, attrs);
}
Decoration.inheritsFrom(Chargeable);


$(document).ready(function(){

    $(this).keydown(function (e) {
        if (e.keyCode === 68) {
            if (document.contains(selected_deco)) {
                var deleted = palette.removeChild(selected_deco);
                undo.push(deleted);
            }
        }
        if (e.keyCode === 90) {
            var deco = undo.pop();
            if (deco) {
                $(deco).removeClass("selected");
                palette.appendChild(deco);
            }
        }
    });


});