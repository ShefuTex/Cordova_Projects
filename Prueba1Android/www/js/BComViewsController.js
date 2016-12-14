function BComViewsController() {
    this.banderaVentana = '';
}

BComViewsController.prototype = {

    mostrarPantallaMOtAplicaciones: function () {
        window.location = "baseviewcontroller.html";
    },


    mostrarPantallaWebtrader: function (opcion, paso) {
        $('#contentFrame2').html(' ');
        baseViewController.showHeader(true);
        baseViewController.showInferiorMenu('nav-webtrader');
        
        if (sessionStorage.tam==0 || $('#contentFrame').height()<sessionStorage.tam){
            sessionStorage.tam = $('#mainContent').height() + $('#nav-webtrader').height();
            $('#contentFrame').height(screen.width)
        }
        
        
        
        $('#nav-bajo').hide();

        $('#nav-webtrader').children('a').removeClass('nb-selec');
        var sid = sessionStorage.SID;
        var aCtas = sessionStorage.activaConstaCta;
        var gmt = sessionStorage.wtGMT;
        
        var d = new Date();
        var n = d.getTimezoneOffset();
        var gmt = (n/60)*-1;
        
        if(sessionStorage.version == 'TEST'){
            
            document.getElementById("contentFrame").src = "WPMBancomer/www/clients/bancomer/site/index.html?sid="+sid+"&accounts="+aCtas+"&thousand=,&decimal=.&language=es&gmt="+sessionStorage.difHours+"&server=teststreaming.bbvanet.com.mx&streaming=testbwt.bbvanet.com.mx&protocol=http";
            
        }else if(sessionStorage.version == 'PRODUCCION' || sessionStorage.version == 'PROD_LIGA_OCULTA'){
            document.getElementById("contentFrame").src = "WPMBancomer/www/clients/bancomer/site/index.html?sid="+sid+"&accounts="+aCtas+"&thousand=,&decimal=.&language=es&gmt="+sessionStorage.difHours+"&server=equitystreaming.bbvanet.com.mx&streaming=equitybwt.bbvanet.com.mx&protocol=https";
        }        console.log("FILE: ",document.getElementById("contentFrame").src);
    },
}

var bComViewsController = new BComViewsController();