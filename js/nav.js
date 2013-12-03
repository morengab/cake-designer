$(document).ready( function () {

    $(".size-options > li").click(function (e){
        var selected_size = e.target.dataset['size'];
        if (cake) {
            cake.setSize(selected_size);
        } else {
            console.log("Cake does not exist.");
        }
    });

});