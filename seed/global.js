var urlapi = "http://localhost:58257/api/";
//var urlapi = "http://107.180.36.180/plesk-site-preview/apps.thinkeco.com/api/";

function loadNav(){
    $("#topnav").load("topmenu.html");
    $("#sidenav").load("menu.html", function() {
        var tipo = localStorage.getItem('tipo')*1;
        if(tipo==1) {
            $("#menu-admin").removeClass("d-none");
            //$("#main-admin").removeClass("d-none");
        }
        else if(tipo==2) {
            $("#menu-user").removeClass("d-none");
            //$("#main-user").removeClass("d-none");
        }
    });
}

function loadPopover(){
    $('[data-toggle="popover"]').popover();
    $('body').on('click', function (e) {
        var t = $(e.target);
        if (t.is("i")) t = t.parent();
        if (t.attr('popover') == undefined && !t.hasClass('popover-body') && !t.hasClass('popover-header')){
            $('[data-toggle="popover"]').popover('hide');
        }
    });
}