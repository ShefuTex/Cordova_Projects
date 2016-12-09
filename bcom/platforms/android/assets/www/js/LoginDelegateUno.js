cordova.define("BComApp.BComLogin.LoginDelegate.LoginDelegate", function(require, exports, module) {
               
// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

var constants = new Constants();

var bComViewsController = new BComViewsController();
               
function LoginDelegate() {
    this.numeroTarjeta = '';
    this.contrasenia   = '';
    this.loginSecundarioVisible = false;
}

LoginDelegate.prototype = {

    constructor: LoginDelegate,
    
        // Sin Funcionalidad
    botonBorrarDatos:         function() {}, //* PENDIENTE ODT 1
    seleccionAutoSeguro:      function() {},
    seleccionBEstratega:      function() {},
    seleccionGeoLocalizacion: function() {},
    seleccionOtraAplicacion:  function() {},
        // Sin Funcionalidad
    
    leerDatos: function() {
    	console.log("leerDatos");
        this.numeroTarjeta = document.getElementById("inputTarjeta").value;
        this.contrasenia   = document.getElementById("password").value;
    },

    function botonEntrarLogin() {
    	console.log("botonEntrarLogin");
        this.leerDatos();
        
        if (this.validaDatos()) {
            this.doNetworkOperation();
        }
    },

    validaDatos: function() {
             if (this.numeroTarjeta.length < 16) { this.showAlert("Aviso\n", constants.CARD_ERROR_NUMBER, constants.ALERT_BUTTON_OK); }
        else if (this.contrasenia.length < 8)    { this.showAlert("Aviso\n", constants.PASSWORD_ERROR_NUMBER, constants.ALERT_BUTTON_OK); }
        else if (this.numeroTarjeta.length == 16 && this.contrasenia.length >= 8) { return true; }
    
        return false;
    },

    seleccionDesbloquear: function() {
        exec(
             function(jsonResponse) { /** Operación Succes **/ },
             function(jsonResponse) { /** Operación Error **/  },
             "LoginDelegate",
             "seleccionDesbloquear",
             []
        );
    },

    backClicked: function () {
        if (this.loginSecundarioVisible) {
            var ayudaToken = document.getElementById('ayudaToken');
            var loginDiv = document.getElementById('loginSecundario');

            if (!isNullOrUndefined(ayudaToken)) {
                $('#ayudaToken').remove();
            } else if(null != loginDiv) {
                loginDiv.id = "loginPrincipal";
                this.loginSecundarioVisible = false;
            }
        } else {
            navigator.app.exitApp();
            
        }
    },


    doNetworkOperation: function () {
    	console.log("doNetworkOperation");
        parent.showLoadingLayer();
        sessionStorage.nvaSesion = 0;
        exec(
             function (jsonResponse) { 

            	 parent.hideLoadingLayer();
            	 loginDelegate.doNetworkResponse(jsonResponse);
            	 loginDelegate.versionServidor();
            	 sessionStorage.tam=0;
            },
             function (errorMessage) {
            	console.log("doNetworkOperation: Err");
                parent.hideLoadingLayer();
                loginDelegate.cleanFields();
                if(errorMessage.length == 93537 || errorMessage.length == 81856)
                {
                	console.log("if_mario");
                }else{
                	console.log("else_mario");
                	//parent.loginDelegate.showAlert("Aviso\n", "Erro de conexión.", constants.ALERT_BUTTON_OK);
                   loginDelegate.wtLogout();
                }
             },
             "LoginDelegate",
             "doNetworkOperation",
             [accountNumberValidator.getBackupData(), passwordInputValidator.getBackupData(), sessionStorage.esInvitado]
        );
    },
            
    versionServidor: function(){
    	console.log("versionServidor");
        parent.showLoadingLayer();
        exec(
            function (jsonResponse) {
             
            	 parent.hideLoadingLayer();
		 sessionStorage.version = jsonResponse;
		 console.log("sessionStorage.version"+sessionStorage.version);
            },
            function (errorMessage) {
            		
            		 //parent.hideLoadingLayer();
            },
            "LoginDelegate",
            "versionServidor",
             []
        );
    },
               
               
    doNetworkResponse: function (jsonResponse) {
        parent.hideLoadingLayer();
     
        var jsonObject = JSON.parse(jsonResponse);
        this.cleanFields();

        if (isNullOrUndefined(jsonObject.posicionGlobal)) {
            sessionStorage.username       = jsonObject.solicitaInstrumentoSeguridad.usuario_usr; // WAS user.
            sessionStorage.userCardNumber = jsonObject.solicitaInstrumentoSeguridad.acceso_usr;  // User card number.
            sessionStorage.jsonToken      = jsonResponse;
            sessionStorage.invitadoNumber = this.numeroTarjeta;
            
  
            var loginDiv = document.getElementById("loginPrincipal");

            loginDiv.id = "loginSecundario";
            this.loginSecundarioVisible = true;

            tokenViewController.asignaNombreUsuario(jsonObject.solicitaInstrumentoSeguridad.alias_usr);
            tokenViewController.asignaTextoAyuda(jsonObject.solicitaInstrumentoSeguridad.tiseguridad_usr);

            parent.hideLoadingLayer();
         
        } else {
            sessionStorage.username       = jsonObject.posicionGlobal.usuario_usr; // WAS user.
            sessionStorage.userCardNumber = jsonObject.posicionGlobal.acceso_usr;  // User card number.
            sessionStorage.jsonPosicion   = jsonResponse;

            this.loginSecundarioVisible = false;

            tokenViewController.downloadBanksCatalog();
        }
    },

    consultaDatosGuardados: function () {
        exec(
             function (result) { loginDelegate.mostrarInvitado(); loginDelegate.asignarDatos(result); },
             function (result) { /** No hay datos guardados **/ },
             "LoginDelegate",
             "consultaDatosGuardados",
             []
        );
    },

    asignarDatos: function (numeroTarjeta) {
        accountNumberValidator.setData(numeroTarjeta);
               
        var input = document.getElementById('inputTarjeta');
        
        input.value = accountNumberValidator.getText();
        
        var input2 = document.getElementById('inputTarjetaAux');
        input2.setAttribute('readonly', 'readonly');
        input2.value = accountNumberValidator.getMaskedText();
    },

    mostrarInvitado: function () {
        $('#icono-invitado').css('display', 'initial');
    },

    limpiar: function () {
        sessionStorage.esInvitado = true;

        accountNumberValidator.setData('');
        passwordInputValidator.setData('');
        
        var input = document.getElementById('inputTarjeta');
        input.value = '';
        input.removeAttribute('readonly');
        
        var input = document.getElementById('inputTarjetaAux');
        input.value = '';
        input.removeAttribute('readonly');

        var input = document.getElementById('password');
        input.value = '';
        
        

        $('#icono-invitado').css('display', 'none');
    },

    logout: function () {
        parent.showLoadingLayer();
        exec(
             function (jsonResponse) { parent.hideLoadingLayer();sessionStorage.logOn=0;},
             function (errorMessage) { parent.hideLoadingLayer();},
             "LoginDelegate",
             "logout",
             [sessionStorage.username, sessionStorage.userCardNumber]
        );
    },
        
    wtLogout: function () {
        parent.showLoadingLayer();
        exec(
            function (jsonResponse) { parent.hideLoadingLayer();},
            function (errorMessage) { parent.hideLoadingLayer();},
            "LoginDelegate",
            "wtLogout",
            []
	            );
    }, 
    
        
    
    
    showAlertDual: function (tittle, message, button, button2) {
        exec(
             function(jsonResponse) { /** Operaci�n Succes **/ },
             function(jsonResponse) { /** Operaci�n Error **/  },
             "LoginDelegate",
             "showAlert",
             [tittle, message, button, button2]
        );
    },
       /* wtConsultaContratosPatrimoniales: function () {
        showLoadingLayer();
        exec(
            function (jsonResponse) { hideLoadingLayer();sessionStorage.okCP = true; },
            function (errorMessage) { hideLoadingLayer();sessionStorage.okCP = true; guardaRespuestaE(errorMessage,callback);},
            "LoginDelegate",
            "wtConsultaContratosPatrimoniales",
            [sessionStorage.username, sessionStorage.userCardNumber]
             );
    },
    */
    wtrealizaCompraVenta: function (data1, data2, data3, data4, data5, data6,sim,callback) {
    parent.showLoadingLayer();
    sessionStorage.elegibilidad = '';
    sessionStorage.importeComision = '';
    sessionStorage.porcentajeComision = '';
    sessionStorage.iva = '';
    sessionStorage.importe = '';
    sessionStorage.folioInternet = '';
        exec(
	    function (jsonResponse) {
                hideLoadingLayer();
                sessionStorage.okCV = true;
                console.log("LU_COMPRA_VENTA: ",jsonResponse);
                loginDelegate.guardaRespuesta(jsonResponse,callback);
             },
             function (errorMessage) {
                hideLoadingLayer();
                sessionStorage.okCV = false;
                console.log("LU_ERR_COMPRA_VENTA: ",errorMessage);
                loginDelegate.guardaRespuestaE(errorMessage,callback);
             },

        "LoginDelegate",
        "wtrealizaCompraVenta",
        [sessionStorage.username,data1,data2,data3,data4,data5,data6, sessionStorage.cuentaPatrimonial,sim]
        );    },
	
    getServerMode: function(successCallBack, errorCallBack) {
		exec(
        function(jsonResponse) {
		sessionStorage.jsonServerMode = jsonResponse
		},
        function(errorMessage) { }, 
		"LoginDelegate",
        "getServerMode",
		[]);
	},
	
    wtconsultaDetalleInversion: function (tiempo, callback) {
        
        exec(
             function (jsonResponse) {
                console.log("DetalleInversón: OK");
                parent.hideLoadingLayer();
                sessionStorage.ok = true;
                loginDelegate.guardaRespuesta1(jsonResponse,callback);
             },
             function (errorMessage) { parent.hideLoadingLayer();
                sessionStorage.ok = false;
                loginDelegate.guardaRespuestaE(errorMessage,callback);
                console.log("DetalleInversón: Err");
             },
            "LoginDelegate",
            "wtconsultaDetalleInversion",
            [sessionStorage.username,sessionStorage.cuentaPatrimonial,tiempo]
        );
    },
               
    wtconsultaCapitales: function (tipo,callback) {
        parent.showLoadingLayer();
        exec(
            function (jsonResponse) { parent.hideLoadingLayer();
	     
	     sessionStorage.okCap = true;
	     loginDelegate.guardaRespuesta2(jsonResponse,callback);
	     },
            function (errorMessage) { parent.hideLoadingLayer();
	     sessionStorage.okCap = false;
	     loginDelegate.guardaRespuestaE(errorMessage,callback);},
            "LoginDelegate",
            "wtconsultaCapitales",
            [sessionStorage.username,sessionStorage.cuentaPatrimonial,tipo]
            );
    },
               
    wtcancelaOrden: function (data1, data2, data3, data4,callback) {
        parent.showLoadingLayer();
	sessionStorage.folioInternetCancela = '';
        data3 = data3.substring(0,4)+"/"+data3.substring(4,6)+"/"+data3.substring(6,8);
            exec(
                function (jsonResponse) { parent.hideLoadingLayer(); 
                sessionStorage.okCO = true;
		loginDelegate.guardaRespuesta3(jsonResponse,callback);
		},
                function (errorMessage) { parent.hideLoadingLayer();
		sessionStorage.okCO = false;
		loginDelegate.guardaRespuestaE(errorMessage,callback);},
                "LoginDelegate",
                "wtcancelaOrden",
                [sessionStorage.username,data1,data2,data3,data4, sessionStorage.cuentaPatrimonial]
                    );
               },
               
    wtdetalleOrden: function (data1, data2, data3, fecha, callback) {
        parent.showLoadingLayer();
        exec(
            function (jsonResponse) { parent.hideLoadingLayer(); loginDelegate.guardaRespuesta4(jsonResponse,callback);sessionStorage.okDO = true;},
            function (errorMessage) { parent.hideLoadingLayer();sessionStorage.okDO = false;loginDelegate.guardaRespuestaE(errorMessage,callback);},
            "LoginDelegate",
            "wtdetalleOrden",
            [sessionStorage.username,data1, data2,data3, fecha, sessionStorage.cuentaPatrimonial]
            );
    },
    
    wtenvioEmail: function (data1, data2, data3, data4,callback) {
        parent.showLoadingLayer();
        exec(
             function (jsonResponse) { parent.hideLoadingLayer(); sessionStorage.okEC = true; if(callback){callback(jsonResponse);}},
             function (errorMessage) { parent.hideLoadingLayer(); sessionStorage.okEC = false; if(callback){callback(errorMessage);}},
            "LoginDelegate",
            "wtenvioEmail",
            [sessionStorage.userCardNumber,data1,data2,data3, data4]
        );
    },
               
    wtaperturaFichero: function (localPdfName, pdfSourceUrl, directorio, callback) {
        parent.showLoadingLayer();
        exec(
             function (localPdfPath) {
             
                sessionStorage.localPdfPath=localPdfPath;
                setTimeout(function(){ parent.hideLoadingLayer();}, 1000);
                if(callback)
                    callback();
             },
            function () {
                parent.hideLoadingLayer();
             },
            "LoginDelegate",
            "wtaperturaFichero",
            [localPdfName, pdfSourceUrl, directorio]
        );
    },
            
    wtListaCuentas: function (idCta, callback) {
        parent.showLoadingLayer();
        exec(
             function (jsonResponse) {
                parent.hideLoadingLayer();
                sessionStorage.okLC = true;
                if(callback)
                    callback(jsonResponse, "OK");
             },
            function (errorMessage) { 
                parent.hideLoadingLayer(); 
                sessionStorage.okLC = false;
                //loginDelegate.guardaRespuestaE(errorMessage,callback);
                if(callback)
                    callback(errorMessage, "ERR");
            },
            "LoginDelegate",
            "wtListaCuentas",
            [sessionStorage.username,idCta]
        );
    },
               
    wtaplicaTraspaso: function (idCtaAbono, idCtaCargo, importe, callback) {
        parent.showLoadingLayer();
        exec(
            function (jsonResponse) {
                parent.hideLoadingLayer();
                sessionStorage.okAT = true;
                if(callback)
                    callback(jsonResponse, "OK");
            },
            function (errorMessage) { 
                parent.hideLoadingLayer(); 
                sessionStorage.okAT = false;
                loginDelegate.guardaRespuestaE(errorMessage,callback);
                if(callback)
                    callback(errorMessage, "ERR");
            },
            "LoginDelegate",
            "wtaplicaTraspaso",
            [sessionStorage.username,idCtaAbono,idCtaCargo,importe]
        );
    },
               
    wtReglasValor: function (callback) {
        parent.showLoadingLayer();
        exec(
            function (jsonResponse) {
                parent.hideLoadingLayer();
                sessionStorage.okAT = true;
                var jsonObject = JSON.parse(jsonResponse);
                sessionStorage.fechaservidor = jsonObject.usuario.fechaservidor;
                var dia = sessionStorage.fechaservidor.substring(4,5)+"-"+sessionStorage.fechaservidor.substring(0,2);
                var wtAno = sessionStorage.fechaservidor.substring(6,10);
                var wtMes = sessionStorage.fechaservidor.substring(4,5);
                var wtDia = sessionStorage.fechaservidor.substring(0,2);
                console.log("LU_wtDia: ",wtAno,wtMes,wtDia);
                console.log("LU_dia: ",sessionStorage.fechaservidor);
                wtMes = wtMes-1;
                sessionStorage.wtDate = new Date (wtAno,wtMes,wtDia);
                sessionStorage.wtDate = sessionStorage.wtDate.substring(0,3);
                console.log("LU_wtDate: ",sessionStorage.wtDate);
                
                if(sessionStorage.diasFestivos.indexOf(dia) >= 0 || sessionStorage.wtDate.indexOf('Sat') >= 0 || sessionStorage.wtDate.indexOf('Sun') >= 0 ){
                    parent.loginDelegate.showAlert("Aviso\n", "El horario de servicio es de 07:00 a 17:59 en d\u00edas h\u00e1biles.", constants.ALERT_BUTTON_OK);
                    if(callback)
                        callback("LU_SI_FESTIVO_NO_PUEDE_OPERAR", "ERRH");
                }else{
                    sessionStorage.horaservidor = jsonObject.usuario.horaservidor;
                    console.log("LU_HORA_SERVICIO: ",sessionStorage.horaservidor);
                    if(sessionStorage.horaservidor.substring(0,2) >= 7 && sessionStorage.horaservidor.substring(0,2) < 18 ){
                        if(callback)
                            callback(jsonResponse, "OKH");
                    }else{
                        parent.loginDelegate.showAlert("Aviso\n", "El horario de servicio es de 07:00 a 17:59 en d\u00edas h\u00e1biles.", constants.ALERT_BUTTON_OK);
                        if(callback)
                            callback("LU_FUERA_HORARIO", "ERRH");
             
                    }
                }
             
                },
            function (errorMessage) {
                parent.hideLoadingLayer();
                sessionStorage.okAT = false;
                parent.loginDelegate.guardaRespuestaE(errorMessage,callback);
                if(callback)
                    callback(errorMessage, "ERR");
                },
                "LoginDelegate",
                "wtReglasValor",
                [sessionStorage.username, sessionStorage.userCardNumber,]
                );
    },

               
    showAlert: function (tittle, message, button, callback) {
        exec(
             function(jsonResponse) { if(callback)             {callback();
             } },
             function(jsonResponse) { /** Operaci—n Error **/  },
             "LoginDelegate",
             "showAlert",
             [tittle, message, button]
        );
    },

               
    cancelaTituloInv: function (cuentaInv, tituloInv, cuentaDep, importeInversion, fechaOperacion, tipoCliente,usuario_global,acceso_usr_global) {
    parent.showLoadingLayer();
        exec(
             function (jsonResponse) { parent.hideLoadingLayer();loginDelegate.guardaRespuesta11(jsonResponse,callback);sessionStorage.okInvertir = true;
             },
             function (errorMessage) { parent.hideLoadingLayer();sessionStorage.okInvertir = false;
             },
             "LoginDelegate",
             "cancelaTituloInv",
             [cuentaInv, tituloInv,cuentaDep,importeInversion,fechaOperacion,tipoCliente,usuario_global,acceso_usr_global]
             );

  },

           envioEmailInterbancario:function (datosAplicativos){
               parent.showLoadingLayer();
               exec(
                    function (jsonResponse){ parent.hideLoadingLayer();loginDelegate.guardaRespuesta7(jsonResponse);sessionStorage.okInterbancario = true;
                    
                    },
                    function (errorMessage){parent.hideLoadingLayer();sessionStorage.okInterbancario = false;
                    },
                    "loginDelegate",
                    "envioEmailInterbancario",
                    [datosAplicativos]
                    );
               
               
},
               
               
    guardaRespuesta: function (jsonResponse,callback) {
               
        var jsonObject = JSON.parse(jsonResponse);
               sessionStorage.importe = jsonObject.respuesta.importe;
        console.log("LU_sessionStorage.folioInternet",sessionStorage.folioInternet);
            if(jsonObject.respuesta.folioInternet){
               console.log("LU_SOY_FOLIO");
               sessionStorage.folioInternet = jsonObject.respuesta.folioInternet;
               console.log("LU_sessionStorage.folioInternet",sessionStorage.folioInternet);
               
            }else{
               
               console.log("LU_NO_SOY_FOLIO");
               sessionStorage.realizaCV= jsonResponse.respuesta;
               sessionStorage.elegibilidad = jsonObject.respuesta.elegibilidad;
               sessionStorage.importeComision = jsonObject.respuesta.importeComision;
               sessionStorage.porcentajeComision = jsonObject.respuesta.porcentajeComision;
               sessionStorage.iva = jsonObject.respuesta.iva;
               sessionStorage.importe = jsonObject.respuesta.importe;
            }
               
        if(callback)
            callback();
               
    },
               
    guardaRespuesta1: function (jsonResponse,callback) {
        try{
            var jsonObject = JSON.parse(jsonResponse);
               
            var arr = jsonObject.respuesta.listaDetalle;
            if(jsonObject.respuesta.listaDetalle){
        
               var lstDetalle = new Object();
               for(var i = 0; i < arr.length; i++) {
                    lstDetalle[i] = new Object();
                    lstDetalle[i].emisora = arr[i].emisora;
                    if(arr[i].emisora == "PE#OLES"){
                        emisora =  arr[i].emisora;
                        emisora = emisora.replace("#","&");
                        lstDetalle[i].emisora = emisora;
                    }
                    lstDetalle[i].precio = arr[i].precio.toString();
                    lstDetalle[i].serie = arr[i].serie.toString();
                    lstDetalle[i].titulos = arr[i].titulos.toString();
            
               }
            }else{
               jsonObject.respuesta.listaDetalle = "";
            }
        }catch(e){
        }
        sessionStorage.lstDetalle = JSON.stringify(lstDetalle);
        parent.hideLoadingLayer();
        if(callback)
        {
            callback();
        }
    },
               
    guardaRespuestaE: function (errorMessage,callback) {
        var errorMessage = JSON.parse(errorMessage);
        var mensajeError = JSON.stringify(errorMessage);
            console.log("llega a guardaRespuestaE:");
        try{
            console.log("mario_try:");
            var arrErr = errorMessage.error.mensaje;
            sessionStorage.errorDetalle = arrErr;
            
        }catch(e){
            console.log("mario_catch:");
            var arrErr = errorMessage.errorARQ.msg;
            sessionStorage.errorDetalle = arrErr;
           
        }
        if(callback)
        {   
            console.log("mario_callback");
            callback();
        }
    },
    
    guardaRespuesta2: function (jsonResponse,callback) {
               
        try{
            var jsonObject = JSON.parse(jsonResponse);
            if(jsonObject.respuesta.listaCapitales){
               var arr= jsonObject.respuesta.listaCapitales;
               
                var lstCap = new Object();
                for(var i = 0; i < arr.length; i++) {
                    lstCap[i] = new Object();
                   
                    lstCap[i].asignados = arr[i].asignados.toString();
                    lstCap[i].emisora = arr[i].emisora;
                    if(arr[i].emisora == "PE#OLES"){
                        emisora =  arr[i].emisora;
                        emisora = emisora.replace("#","&");
                        lstCap[i].emisora = emisora;
                    }
                   lstCap[i].empresa = arr[i].empresa;
                   lstCap[i].estado = arr[i].estado;
                   lstCap[i].fechareg = arr[i].fechaRegistro.substring(6,10)+""+arr[i].fechaRegistro.substring(3,5)+""+arr[i].fechaRegistro.substring(0,2);
                   lstCap[i].folio = arr[i].folio.toString();
                   lstCap[i].operacion = arr[i].operacion;
                   lstCap[i].pendientes = arr[i].pendientes.toString();
                   lstCap[i].precio = arr[i].precio.toString();
                   lstCap[i].serie = arr[i].serie.toString();
                   lstCap[i].solicitados = arr[i].solicitados.toString();
                   sessionStorage.lstCap = JSON.stringify(lstCap);
               }
            } else {
                var lstCap = new Object();
                jsonObject.respuesta.listaCapitales = jsonObject.respuesta.listaCapitales;
                sessionStorage.lstCap = JSON.stringify(jsonObject.respuesta.listaCapitales);
            }
        }catch(e){
    
        }
               
        
        parent.hideLoadingLayer();
               
        if(callback)
            callback();
    },
               
    guardaRespuesta3: function (jsonResponse,callback) {
        var jsonObject = JSON.parse(jsonResponse);
        sessionStorage.folioInternetCancela = jsonObject.respuesta.folioInternet;
        parent.hideLoadingLayer();
               
        if(callback)
            callback();
    },
    
    guardaRespuesta4: function (jsonResponse,callback) {
        var jsonObject = JSON.parse(jsonResponse);
        
        var arr= jsonObject.respuesta.listaTitulos;
               
        var lstTit = new Object();
        for(var i = 0; i < arr.length; i++) {
            lstTit[i] = new Object();
           
            lstTit[i].fecha = arr[i].sivaFecha.substring(6,10)+""+arr[i].sivaFecha.substring(3,5)+""+arr[i].sivaFecha.substring(0,2);
            lstTit[i].hora = arr[i].sivaHora.substring(0,2)+""+arr[i].sivaHora.substring(3,5)+""+arr[i].sivaHora.substring(6,8)+"";
            lstTit[i].tipo = arr[i].sivaTipo;
            lstTit[i].titulo = arr[i].sivaTitulos;
        }
        sessionStorage.lstTit = JSON.stringify(lstTit);
        parent.hideLoadingLayer();
               
        if(callback)
            callback();
    },
    
    guardaRespuesta5: function (jsonResponse) {
        
    },
               
      guardaRespuesta6: function (jsonResponse,callback) {
        var jsonObject = JSON.parse(jsonResponse);
               sessionStorage.respusta = jsonResponse.respuesta;
               sessionStorage.folio = jsonObject.respuesta.folio;
               sessionStorage.interesVto = jsonResponse.respuesta.interesVto;
               parent.hideLoadingLayer();
               
        if(callback)
        callback();
        },
               
               
       guardaRespuesta7: function (jsonResponse) {
        var jsonObject = JSON.parse(jsonResponse);
               sessionStorage.respuesta = jsonResponse.respuesta;
               sessionStorage.exitoEnvioMailBeneficiario = jsonObject.respuesta.exitoEnvioMailBeneficiario;
               sessionStorage.exitoEnvioMailPagador = jsonObject.respuesta.exitoEnvioMailPagador;
               parent.hideLoadingLayer();

        },
               
        guardaRespuesta8: function (jsonResponse) {
            var jsonObject = JSON.parse(jsonResponse);
            var arr= jsonObject.respuesta.listaCuentas;
            var lstCuen = new Object();
            for(var i = 0; i < arr.length; i++) {
                lstCuen[i] = new Object();
                lstCuen[i].saldo = arr[i].saldo;
                lstCuen[i].idCuenta = arr[i].idCuenta;
            }
            sessionStorage.lstCuen = JSON.stringify(lstCuen);
            parent.hideLoadingLayer();
                
            if(callback)
                callback();
        },
                
        guardaRespuesta9: function (jsonResponse,callback) {
            var jsonObject = JSON.parse(jsonResponse);
            sessionStorage.folioInternet = jsonObject.respuesta.folioInternet;
            if(callback)
                callback();
                
        },
               
    guardaRespuesta10: function (jsonResponse,callback) {
        
               if(callback)
               callback();
    },
               
    cleanFields: function () {
        var password = document.getElementById('password')
        password.value = '';
        passwordInputValidator.setData('');
        var input = document.getElementById('passwordAux');
        input.value = '';
        var inputT = document.getElementById('inputToken');
        inputT.value = '';
        var inputTA = document.getElementById('inputTokenAux');
        inputTA.value = '';
    }
    
}

var loginDelegate = new LoginDelegate();
module.exports = loginDelegate;

// __________ Termina Phongegap __________

});