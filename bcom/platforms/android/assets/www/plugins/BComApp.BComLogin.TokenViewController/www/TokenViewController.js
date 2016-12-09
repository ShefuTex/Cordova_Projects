cordova.define("BComApp.BComLogin.TokenViewController.TokenViewController", function(require, exports, module) {
               
// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

var constants = new Constants();
               
var bComViewsController = new BComViewsController();

function TokenViewController() {
    this.tipoInstrumento = '';
    this.numToken = '';
}

TokenViewController.prototype = {
    
    constructor: TokenViewController,
    
    leerDatosOperation: function () {
        this.numToken = document.getElementById("inputToken").value;
    },

    botonSignOn: function() {
        if (this.validaDatos()) {
            this.doNetworkOperation();
        }
    },

    validaDatos: function (tokenValue) {
        if(tokenValue == undefined){
               this.leerDatosOperation();
        }else{
               this.numToken = tokenValue;
        }
        if (this.numToken.length == 0) { loginDelegate.showAlert("Aviso\n", constants.TOKEN_ERROR_EMPTY, constants.ALERT_BUTTON_OK); }
        else if (this.numToken.length < 8) { loginDelegate.showAlert("Aviso\n", constants.TOKEN_LENGTH_ERROR, constants.ALERT_BUTTON_OK); }
        else if (this.numToken.length == 8) { return true; }
    
        return false;
    },

    mostrarAyuda: function(tipoI) {
        var tipoSeguridad;
        
        if(tipoI != undefined){
               this.tipoInstrumento = tipoI;
        }
               
             if (this.tipoInstrumento == 'T3') { tipoSeguridad = 'ayudaDP720'; }
        else if (this.tipoInstrumento == 'S1') { tipoSeguridad = 'ayudaSOFT';  }
        else if (this.tipoInstrumento == 'T6') { tipoSeguridad = 'ayudaOCRA';  }
               console.log("Mostrar ayuda tipoSeguridad "+tipoSeguridad+" tipoInstrumento "+this.tipoInstrumento);
        $('body', window.parent.document).append("<div id='ayudaToken' onclick='$(\"#ayudaToken\").remove();'>" +
                                                 "<div id='" + tipoSeguridad + "'></div>" +
                                                 "</div>");
    },
                                                                                                                               
    asignaTextoAyuda: function(tipoAyuda) {
        this.tipoInstrumento = tipoAyuda;
    
        var ayudaSeguridad;
    
             if (this.tipoInstrumento == 'T3') { ayudaSeguridad = constants.TOKEN_HELP_DP270; }
        else if (this.tipoInstrumento == 'S1') { ayudaSeguridad = constants.TOKEN_HELP_SOFT;  }
        else if (this.tipoInstrumento == 'T6') { ayudaSeguridad = constants.TOKEN_HELP_OCRA;  }
    
        document.getElementById("lblAyuda").innerHTML = ayudaSeguridad;
    },

    asignaNombreUsuario: function(txtNombreUsuario) {
        document.getElementById("lblNomCliente").innerHTML = txtNombreUsuario;
    },

    doNetworkOperation: function () {
        parent.showLoadingLayer();
        exec(
            function (jsonResponse) { tokenViewController.doNetworkResponse(jsonResponse); },
            function (jsonResponse) { parent.hideLoadingLayer(); tokenViewController.cleanFields(); },
            "TokenViewController",
            "doNetworkOperation",
            [tokenInputValidator.getBackupDataToken(), this.tipoInstrumento, sessionStorage.username, sessionStorage.userCardNumber]
         );
    },

    doNetworkResponse: function (jsonResponse) {
        var jsonObject = JSON.parse(jsonResponse);
        this.cleanFields();

        if (!isNullOrUndefined(jsonObject.posicionGlobal)) {
            sessionStorage.jsonPosicion   = jsonResponse;
            sessionStorage.username       = jsonObject.posicionGlobal.usuario_usr;  // WAS user.
            sessionStorage.userCardNumber = jsonObject.posicionGlobal.acceso_usr;   // User card number.

            tokenViewController.downloadBanksCatalog();
        }
    },

    downloadBanksCatalog: function () {
        exec(
                function (jsonResponse) { sessionStorage.jsonBancos = jsonResponse; tokenViewController.downloadBusinessRules(); },
                function (errorMessage) { parent.hideLoadingLayer(); },
                "TokenViewController",
                "downloadBanksCatalog",
                [sessionStorage.username, sessionStorage.userCardNumber]
        );
    },

    downloadBusinessRules: function () {
        exec(
             function (jsonResponse) {
                sessionStorage.jsonReglasNegocio = jsonResponse;
                var version_RG = JSON.parse(sessionStorage.jsonReglasNegocio).version;
                sessionStorage.dia_RG = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.fechaservidor;
                sessionStorage.hora_RG = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.horaservidor;
                console.log("LU_VERSION_HORA: ",sessionStorage.hora_RG);
             
                var wtAno = sessionStorage.dia_RG.substring(6,10);
                var wtMes = sessionStorage.dia_RG.substring(4,5);
                var wtDia = sessionStorage.dia_RG.substring(0,2);
                var wtHora = sessionStorage.hora_RG.substring(0,2);
                var wtMin = sessionStorage.hora_RG.substring(3,5);
                var wtSeg = sessionStorage.hora_RG.substring(6,8);
             
                wtMes = wtMes-1;
                sessionStorage.dataDevice = new Date ();
                console.log("LU_dataDevice: ",sessionStorage.dataDevice);
                sessionStorage.wtGMT = new Date (wtAno,wtMes,wtDia,wtHora,wtMin,wtSeg);
                console.log("LU_wtGMT: ",sessionStorage.wtGMT);
                //sessionStorage.wtGMT = new Date ("2015","03","02");
                sessionStorage.priGMT = parseInt(sessionStorage.wtGMT.substring(28,31));
                sessionStorage.segGMT = sessionStorage.wtGMT.substring(31,33);
                console.log("LU_priGMT: ",sessionStorage.priGMT);
                console.log("LU_segGMT: ",sessionStorage.segGMT);
             
                var inMexHour = parseInt(sessionStorage.hora_RG.substring(0,2));
                var inDevHour = parseInt(sessionStorage.dataDevice.substring(16,18));
                var inMexMin = parseInt(sessionStorage.hora_RG.substring(3,4));
                var inDevMin = parseInt(sessionStorage.dataDevice.substring(19,20));
                var dayMex = sessionStorage.wtGMT.substring(0,3);
                var dayDev = sessionStorage.dataDevice.substring(0,3);
             
                console.log("LU_inMexHour: ",inMexHour);
                console.log("LU_inDevHour: ",inDevHour);
             
                console.log("LU_inMexMin: ",inMexMin);
                console.log("LU_inDevMin: ",inDevMin);
             
                console.log("LU_dayMex: ",dayMex);
                console.log("LU_dayDev: ",dayDev);
             
                if (inMexMin != inDevMin){
                    sessionStorage.segGMT = .5;
                    console.log("LU_segGMT: ",sessionStorage.segGMT);
                }
             
                var i = 0;
                console.log("LU_SIGNO: ",sessionStorage.wtGMT.substring(28,29));
                if(sessionStorage.wtGMT.substring(28,29) == '-'){
                    var inGMT = parseFloat(sessionStorage.priGMT)-parseFloat(sessionStorage.segGMT);
                }else{
                    var inGMT = parseFloat(sessionStorage.priGMT)+parseFloat(sessionStorage.segGMT);
                }
                console.log("LU_REAL_GMT: ",inGMT);
             
                if (inDevHour == inMexHour) {
                    if(inMexMin == inDevMin){
                        console.log("LU_GMT: ",inGMT);
                    }else{
                        inGMT = inGMT-.5;
                        console.log("LU_GMT: ",inGMT);
                    }
                }else{
                    if(inDevHour<inMexHour){
                        console.log("LU_HORA_MEXICO_MAYOR");
                        if(dayDev != dayMex){
                            do{
                                i++;
                                console.log("LU_inDevHour: ",inDevHour);
                                if (inDevHour == 0) {
                                    inDevHour = 24;
                                }
                                inDevHour = inDevHour-1;
                                console.log("LU_inMexHour: ",inMexHour);
                                console.log("LU_inDevHour: ",inDevHour);
                                console.log("LU_i: ",i);
             
                            }while(inDevHour != inMexHour);
            
                            if(inMexMin == inDevMin){
                                inGMT = inGMT-i;
                                console.log("LU_GMT_SIN_DIF: ",inGMT);
                            }else{
                                inGMT = inGMT-i-.5;
                                console.log("LU_GMT_DIF: ",inGMT);
                            }
                        }else{
                            do{
                                i++;
                                inDevHour = inDevHour+1;
                                console.log("LU_inMexHour: ",inMexHour);
                                console.log("LU_inDevHour: ",inDevHour);
                                console.log("LU_i: ",i);
             
                            }while(inDevHour != inMexHour);
             
                            inGMT = inGMT+i;
                            console.log("LU_GMT: ",inGMT);
                        }
                    }else if (inDevHour>inMexHour){
                        console.log("LU_HORA_DISPOSITIVO_MAYOR");
                        if(dayDev != dayMex){
                            do{
                                i++;
                                console.log("LU_inDevHour: ",inMexHour);
                                if (inMexHour == 0) {
                                    inMexHour = 24;
                                }
                                inMexHour = inMexHour-1;
                                console.log("LU_inMexHour: ",inMexHour);
                                console.log("LU_inDevHour: ",inDevHour);
                                console.log("LU_i: ",i);
             
                            }while(inDevHour != inMexHour);
             
                            if(inMexMin == inDevMin){
                                inGMT = inGMT-i;
                                console.log("LU_GMT_SIN_DIF: ",inGMT);
                            }else{
                                inGMT = inGMT-i-1.5;
                                console.log("LU_GMT_DIF: ",inGMT);
                            }
                        }else{
                            do{
                                i++;
                                inDevHour = inDevHour-1;
                                console.log("LU_inMexHour: ",inMexHour);
                                console.log("LU_inDevHour: ",inDevHour);
                                console.log("LU_i: ",i);
                            }while(inDevHour != inMexHour);
                            if(inMexMin == inDevMin){
                                inGMT = inGMT-i;
                                console.log("LU_GMT_SIN_DIF: ",inGMT);
                            }else{
                                //OK_KABUL_8_AM_MEX
                                inGMT = inGMT-i-.5;
                                console.log("LU_GMT_DIF_2: ",inGMT);
                            }
                        }
                    }
                }
             
                tokenViewController.wtConsultaTipoServicio();
             },
             function (errorMessage) { parent.hideLoadingLayer(); loginDelegate.wtLogout(); },
             "TokenViewController",
             "downloadBusinessRules",
             [sessionStorage.username, sessionStorage.userCardNumber]
        );
    },
               
    wtConsultaTipoServicio: function () {
        exec(
            function (jsonResponse) {
                tokenViewController.guardaRespuesta(jsonResponse);
                if (jsonResponse.indexOf("\"idInfobolsa\":\"\"") != -1) {
                    loginDelegate.wtLogout();
                    parent.loginDelegate.showAlert("Aviso\n","Para ingresar a Bancomer Trader es necesario contratarlo previamente, contacta a tu ejecutivo.","Aceptar");
                } else {
                    tokenViewController.wtConsultaContratosPatrimoniales();
                }
            },
            function (errorMessage) { parent.hideLoadingLayer(); 
	    loginDelegate.wtLogout();},
            "TokenViewController",
            "wtConsultaTipoServicio",
            [sessionStorage.username, sessionStorage.userCardNumber]
        );
    },
                
    wtConsultaContratosPatrimoniales: function () {
        exec(
            function (jsonResponse) {
                tokenViewController.guardaRespuesta1(jsonResponse);
                tokenViewController.wtDiaHabil(); },
            function (errorMessage) {
                delete sessionStorage.SID;
                hideLoadingLayer();
                loginDelegate.wtLogout();
             },
                "TokenViewController",
                "wtConsultaContratosPatrimoniales",
                [sessionStorage.username, sessionStorage.userCardNumber]
                );
       },
               
    wtDiaHabil: function () {
        exec(
            function (jsonResponse) {
            tokenViewController.guardaRespuesta2(jsonResponse);
            tokenViewController.goToPosicionGlobal(jsonResponse); },
            function (errorMessage) {
            parent.hideLoadingLayer();
    	    loginDelegate.wtLogout();
            },
            "TokenViewController",
            "wtDiaHabil",
             [sessionStorage.userCardNumber]
        );
    },
               
    goToPosicionGlobal: function (jsonResponse) {
        parent.hideLoadingLayer();
        document.removeEventListener("backbutton", onBackClicked, false);
        bComViewsController.mostrarPantallaMOtAplicaciones();
        timerDelegate.resetTimerOperacion(false);
    },

    cleanFields: function () {
        var token = document.getElementById('inputToken')
        token.value = '';
        tokenInputValidator.setData('');
    },
               
    guardaRespuesta: function (jsonResponse) {
        var jsonObject = JSON.parse(jsonResponse);
        sessionStorage.SID = jsonObject.respuesta.objInfobolsa.idInfobolsa;
    },
               
    guardaRespuesta1: function (jsonResponse) {
        var jsonObject = JSON.parse(jsonResponse);
       
        var arr = jsonObject.respuesta.lista_AsuntosPatrimoniales;
        /**** Cuenta Patrimonial Seleccionada (por omisión la primer cuenta) ****/
        sessionStorage.cuentaPatrimonial = jsonObject.respuesta.lista_AsuntosPatrimoniales[0].id;
        /**** Hay más de una cuenta? SI = 1 No = 0 ****/
        sessionStorage.activaConstaCta = jsonObject.respuesta.lista_AsuntosPatrimoniales.length==1?0:1;
        var lstCtasP = new Object();
        for(i = 0; i < arr.length; i++) {
            lstCtasP[i] = new Object();
            lstCtasP[i].cuenta = arr[i].num_asunto;
            lstCtasP[i].id = arr[i].id;
            lstCtasP[i].divisas = arr[i].divisas;
        }
       
        sessionStorage.lstCtasPat = JSON.stringify(lstCtasP);
        jsonObject=null;
        lstCtasP=null;
    },
    
    guardaRespuesta2: function (jsonResponse) {
        var jsonObject = JSON.parse(jsonResponse);
        sessionStorage.diasFestivos = jsonObject.respuesta.diasFestivos;
    },
               
    guardaRespuesta3: function (jsonResponse) {
        var jsonObject = JSON.parse(jsonResponse);
               
    },
    
    guardaRespuesta4: function (jsonResponse) {
        var jsonObject = JSON.parse(jsonResponse);
               
    },
               
    guardaRespuesta5: function (jsonResponse) {
        var jsonObject = JSON.parse(jsonResponse);
               
    }
}

var tokenViewController = new TokenViewController();
module.exports = tokenViewController;

// __________ Termina Phongegap __________

});