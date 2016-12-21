function BaseViewController() {
    this.menusActivated     = true;
    this.inferiorMenuToShow = '';
    this.onDeviseReady = false;
}


BaseViewController.prototype = {

    constructor: BaseViewController,

    initPhonegap: function () {
        timerDelegate.resetTimerInactividad();
        
        document.addEventListener("menubutton", this.onMenuSelected, false);

        document.body.addEventListener('touchstart', function () { timerDelegate.resetTimerInactividad(); });

        this.onDeviseReady = true;

        this.initPage();
    },

    initPage: function () {
        this.asignaDatos();
        
        this.validaLocation();
        
        loadDeviceCSS();

        document.getElementById("body").style.width = window.innerWidth;
        document.getElementById("body").style.height = window.innerHeight;

        $('.lateral-trader').css('display','none');
    },

    validaLocation: function (seccion, opcion, paso) {
        var posG = false;

        if (seccion == 'isWebTrader') { mostrarMBComWebTrader(opcion, paso); }
        else {
            posG = true;

            if (sessionStorage.isLogin == 1) {
                posicionGlobalDelegate.updatePosicionGlobal();
            }
            else {
                mostrarMBComInicio(opcion, paso);
                viewsController.mostrarPantallaWebtrader(opcion, paso);
            }
        }
                this.menusActivated = true;
    },

    reloadView: function (url) {
        document.location = url;
    },

    
     showInferiorMenu: function (divToShowId) {
        $('#nav-bajo').children('div').css('display', 'none');
        this.inferiorMenuToShow = divToShowId;
    },
    
    showHeader: function (isWebTrader) {
        if (isWebTrader) {
            $('#cabeza').css('display', 'none');
           
        } else {
            $('#cabeza').css('display', '');
            $('#cabeza-webtrader').css('display', 'none');
        }
    },

    asignaDatos: function () {
        var jsonResponse = sessionStorage.jsonPosicion;
        var jsonObject = JSON.parse(jsonResponse);

        if (jsonObject.posicionGlobal.nombre_usr) {

        }

        if (jsonObject.posicionGlobal.fecha_sesionAnterior || jsonObject.posicionGlobal.hora_sesionAnterior) {

        }
    },

    isWebTraderEnabled: function () {
		var posG = JSON.parse(sessionStorage.jsonPosicion);
        var profile = posG.posicionGlobal.perfil_usr;   
        var result = false;
        var enabledProfiles = ['IF03', 'IF05', 'IF07', 'IF11', 'IF16'];
        var sid = sessionStorage.SID;
		
        for (var i = 0; i < enabledProfiles.length; i++) {
            if ((profile == enabledProfiles[i]) && (typeof sid != "undefined") && (sid != null) && (sid.length > 0)) {
                result = true;
                break;
            }
        }
        
        return result;
    }
    

}

var baseViewController = new BaseViewController();