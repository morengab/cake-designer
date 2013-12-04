$(document).ready( function () {

    $(".flavor_options > li").click(function (e){
        var selected_flavor = e.target.dataset['flavor'];
        if (cake) {
            cake.setFlavor(selected_flavor);
        } else {
            console.log("Cake does not exist.");
        }
    });

    $(".size_options > li").click(function (e){
        var selected_size = e.target.dataset['size'];
        if (cake) {
            cake.setSize(selected_size);
        } else {
            console.log("Cake does not exist.");
        }
    });

    $(".deco_options > li").click(function (e){
        var selected_deco = e.target.dataset['deco'];
        if (cake) {
            cake.createDecoration(selected_deco);
        } else {
            console.log("Cake does not exist.");
        }
    });

});