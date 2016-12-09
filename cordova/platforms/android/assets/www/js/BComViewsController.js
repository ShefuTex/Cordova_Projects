function BComViewsController() {
    this.banderaVentana = '';
}

BComViewsController.prototype = {
//    constructor: BComViewsController,
    
    mostrarPantallaMOtAplicaciones: function () {
        window.location = "baseviewcontroller.html";
    },

	mostrarPantallaWebtrader: function (opcion, paso) {
        $('#contentFrame2').html(' ');
        baseViewController.showHeader(true);
        baseViewController.showInferiorMenu('nav-webtrader');
        
        if (sessionStorage.tam==0 || $('#contentFrame').height()<sessionStorage.tam){
            sessionStorage.tam = $('#mainContent').height() + $('#nav-webtrader').height();
          
            $('#contentFrame').height(sessionStorage.tam);
        }
        
        
        
        $('#nav-bajo').hide();

        $('#nav-webtrader').children('a').removeClass('nb-selec');
        var sid = sessionStorage.SID;
        var aCtas = sessionStorage.activaConstaCta;
        var gmt = sessionStorage.wtGMT;
        
        var d = new Date();
        var n = d.getTimezoneOffset();
        var gmt = (n/60)*-1;
        
        $('#contentFrame').height(screen.height);
        $('#contentFrame').width(screen.width);
        
        if(sessionStorage.version == "TEST"){
        	document.getElementById("contentFrame").src = "WPMBancomer/www/clients/bancomer/site/index.html?sid="+sid+"&accounts="+aCtas+"&thousand=,&decimal=.&language=es&gmt=-5&server=teststreaming.bbvanet.com.mx&streaming=testbwt.bbvanet.com.mx&protocol=https";
        }else if(sessionStorage.version == "PRODUCCION"){
        	document.getElementById("contentFrame").src = "WPMBancomer/www/clients/bancomer/site/index.html?sid="+sid+"&accounts="+aCtas+"&thousand=,&decimal=.&language=es&gmt=-5&server=equitystreaming.bbvanet.com.mx&streaming=equitybwt.bbvanet.com.mx&protocol=https";
        } 
    }
}

var bComViewsController = new BComViewsController();