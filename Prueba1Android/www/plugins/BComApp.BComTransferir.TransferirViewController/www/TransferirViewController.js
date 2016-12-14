cordova.define("BComApp.BComTransferir.TransferirViewController.TransferirDelegate", function(require, exports, module) {

// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

function TransferirDelegate() {}

TransferirDelegate.prototype.recuperaCuentasTarFrecBBVA = function () {
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "TransferirDelegate", 
    	"recuperaCuentasTarRetiro", 
    	[]
  	);
}

TransferirDelegate.prototype.leerCuentasTarRetiro = function() {
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "TransferirDelegate", 
    	"recuperaCuentasTarDeposito", 
    	[]
  	);
}

TransferirDelegate.prototype.leerCuentasTarDeposito = function() {
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "TransferirDelegate", 
    	"recuperaCuentasTarFrecBBVA", 
    	[]
  	);
}

TransferirDelegate.prototype.leerCuentasFrecuentes = function(datosAplicativos, successCallBack, errorCallBack) {
	exec(
	         function(jsonResponse) {
                 transferirDelegate.leerCuentasPreregistradas(datosAplicativos, successCallBack, errorCallBack);
	             successCallBack(jsonResponse);
	         },
	         function (errorMessage) {
	             errorCallBack(errorMessage);
	         },
	    "TransferirDelegate", 
    	"recuperaListasFrecuentes", 
    	[datosAplicativos]
  	);
}
               
               
TransferirDelegate.prototype.leerCuentasPreregistradas = function(datosAplicativos, successCallBack, errorCallBack) {
exec(
    function(jsonResponse) {
    successCallBack(jsonResponse);
    },
    function (errorMessage) {
    errorCallBack(errorMessage);
    },
    "TransferirDelegate",
    "recuperaListasPreregistradas",
    [datosAplicativos]
    );
}
               

TransferirDelegate.prototype.leerCuentasTarDepOtrBan = function () {
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "TransferirDelegate", 
    	"doNetworkOperation", 
    	[]
  	);
}

TransferirDelegate.prototype.leerOpcMisCuentas = function() {
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "TransferirDelegate", 
    	"networkResponse", 
    	[]
  	);
}

TransferirDelegate.prototype.leerOpcBBVA = function() {
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "TransferirDelegate", 
    	"GeneraPDF", 
    	[]
  	);
}

TransferirDelegate.prototype.leerOpcOtrosBan = function() {
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "TransferirDelegate", 
    	"guardarImgPreviaRecortadC", 
    	[]
  	);
}

TransferirDelegate.prototype.llenaCombo = function() {
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "TransferirDelegate", 
    	"guardarImgPreviaC", 
    	[]
  	);
}

TransferirDelegate.prototype.llenaGrids = function() {
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "TransferirDelegate", 
    	"recuperaPagos", 
    	[]
  	);
}

TransferirDelegate.prototype.accionArrastrar = function() {
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "TransferirDelegate", 
    	"recuperaSaldos", 
    	[]
  	);
}

TransferirDelegate.prototype.accionArrasATarDeposito = function() {
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "TransferirDelegate", 
    	"ejecutaGuardaCuentaNueva", 
    	[]
  	);
}
               
               
               
               
TransferirDelegate.prototype.leerCuentasFrecuentesInterbancaria = function(datosAplicativos, successCallBack, errorCallBack) {
               exec(
                    function (jsonResponse) {
                                                transferirDelegate.leerCuentasPreregistradasInterbancaria(datosAplicativos, successCallBack, errorCallBack);
                                                successCallBack(jsonResponse);
                                            },
                    function (errorMessage) { errorCallBack(errorMessage); },
                    "TransferirDelegate",
                    "recuperaListasFrecuentesInterbancaria",
                    [datosAplicativos]
                    );
}
               

               
TransferirDelegate.prototype.leerCuentasPreregistradasInterbancaria = function(datosAplicativos, successCallBack, errorCallBack) {
exec(
    function(jsonResponse) {
        successCallBack(jsonResponse);
    },
    function (errorMessage) {
        errorCallBack(errorMessage);
    },
    "TransferirDelegate",
    "recuperaListasPreregistradasInterbancaria",
    [datosAplicativos]
    );
}
               

TransferirDelegate.prototype.realizarTraspaso = function(datosAplicativos, successCallBack, errorCallBack) {
exec(
    function(jsonResponse) {
    	successCallBack(jsonResponse);
    },
    function (errorMessage) {
    	errorCallBack(errorMessage);
    },
    "TransferirDelegate",
    "realizarTraspaso",
    [datosAplicativos]
    );
}
               
TransferirDelegate.prototype.realizarTraspasoInterbancaria3 = function(datosAplicativos, succCallBack, errCallBack) {
exec(
    function(jsonResponse) {
    //  alert("realizarTraspasoInterbancaria3\n"+jsonResponse);
    succCallBack(jsonResponse);
    },
    function (errorMessage) {
     hideLoadingLayer();
    errCallBack(errorMessage);
    },
    "TransferirDelegate",
    "realizarTraspasoInterbancaria3",
    [datosAplicativos]
    );
}

TransferirDelegate.prototype.realizarTraspasoInterbancaria3TDC = function(datosAplicativos, succCallBack, errCallBack) {
exec(
    function(jsonResponse) {
     // alert("realizarTraspasoInterbancaria3TDC\n"+jsonResponse);
        succCallBack(jsonResponse);
    },
    function (errorMessage) {
        hideLoadingLayer();
        errCallBack(errorMessage);
    },
    "TransferirDelegate",
    "realizarTraspasoInterbancaria3TDC",
    [datosAplicativos]
    );
}
TransferirDelegate.prototype.realizarTraspasoInterbancaria3TDCFrecuente = function(datosAplicativos, succCallBack, errCallBack) {
               exec(
                    function(jsonResponse) {
                    // alert("realizarTraspasoInterbancaria3TDCFrecuente\n"+jsonResponse);
                    succCallBack(jsonResponse);
                    },
                    function (errorMessage) {
                    hideLoadingLayer();
                    errCallBack(errorMessage);
                    },
                    "TransferirDelegate",
                    "realizarTraspasoInterbancaria3TDCFrecuente",
                    [datosAplicativos]
                    );
               }
               
               
               
               TransferirDelegate.prototype.getServerMode = function(datosAplicativos, successCallBack, errorCallBack) {
               exec(function(jsonResponse) {
                    //successCallBack(jsonResponse);
                    sessionStorage.jsonServerMode = jsonResponse
                    }, function(errorMessage) {
                    errorCallBack(errorMessage);
                    }, "TransferirDelegate", "getServerMode",
                    [datosAplicativos]);
               }
               

               
               
     
               
               TransferirDelegate.prototype.preregistrarCuentaInterbancaria = function(datosAplicativos, successCallBack, errorCallBack) {
               exec(
                    function(jsonResponse) {
                    successCallBack(jsonResponse);
                    },
                    function (errorMessage) {
                    errorCallBack(errorMessage);
                    },
                    "TransferirDelegate",
                    "preregistrarCuentaInterbancarias",
                    [datosAplicativos]
                    );
               }
               
               
               
TransferirDelegate.prototype.consultaBeneficiario = function(datosAplicativos, successCallBack, errorCallBack) {
exec(
    function(jsonResponse) {
    	successCallBack(jsonResponse);
    },
    function (errorMessage) {
        hideLoadingLayer();
    	errorCallBack(errorMessage);
    },
    "TransferirDelegate",
    "consultaBeneficiario",
    [datosAplicativos]
    );
}
               

               TransferirDelegate.prototype.preregistrarCuenta = function(datosAplicativos, successCallBack, errorCallBack) {
               exec(
                    function(jsonResponse) {
                    successCallBack(jsonResponse);
                    },
                    function (errorMessage) {
                    errorCallBack(errorMessage);
                    },
                    "TransferirDelegate",
                    "preregistrarCuenta",
                    [datosAplicativos]
                    );
               }
               
               
               TransferirDelegate.prototype.cargaPreregistro = function(datosAplicativos, successCallBack, errorCallBack) {
               exec(
                    function(jsonResponse) {
                    successCallBack(jsonResponse);
                    },
                    function (errorMessage) {
                    errorCallBack(errorMessage);
                    },
                    "TransferirDelegate",
                    "cargaPreregistro",
                    [datosAplicativos]
                    );
               }
               
               
               
               TransferirDelegate.prototype.cargaPreregistroInterbancaria = function(datosAplicativos, successCallBack, errorCallBack) {
               exec(
                    function(jsonResponse) {
                    successCallBack(jsonResponse);
                    },
                    function (errorMessage) {
                    errorCallBack(errorMessage);
                    },
                    "TransferirDelegate",
                    "cargaPreregistroInterbancaria",
                    [datosAplicativos]
                    );
               }
               
               
               
               
               
               

TransferirDelegate.prototype.permitirFrecuentes = function(datosAplicativos, dialogName, successCallBack, errorCallBack) {
exec(
    function(jsonResponse) {
    	successCallBack(jsonResponse, dialogName);
    },
    function (errorMessage) {
    	errorCallBack(errorMessage);
    },
    "TransferirDelegate",
    "permitirFrecuentes",
    [datosAplicativos]
    );
}  

TransferirDelegate.prototype.envioEmail = function(datosAplicativos, successCallBack, errorCallBack) {
exec(
    function(jsonResponse) {
    	successCallBack(jsonResponse);
    },
    function (errorMessage) {
    	errorCallBack(errorMessage);
    },
    "TransferirDelegate",
    "envioEmail",
    [datosAplicativos]
    );
}
               
TransferirDelegate.prototype.recuperaFestivos = function(peticion) {
        exec(function(jsonResponse) { sessionStorage.jsonFestivos = jsonResponse; hideLoadingLayer(); },
        function(errorMessage) { muestraError(errorMessage) },
        "TransferirDelegate",
        "recuperaFestivos",
        [peticion]
        );
}

TransferirDelegate.prototype.RegistraTraspaso = function (argumentos) {
    
    exec(
         function (jsonResponse) {
            var response=JSON.parse(jsonResponse);
            var responseRespuesta=response.respuesta;
            parent.hideLoadingLayer();
            window.frames.contentFrame.launchComprobante(response);
         },
         function (errorMessage) { /*compraInvertirDelegate.muestraAlert("Aviso", JSON.parse(errorMessage).error.mensaje, "Aceptar");*/console.log("entra por error de RegistraTraspaso incidencia 2099");
            parent.hideLoadingLayer();
            //                    parent.document.getElementById("sombraCabecera").style.visibility="hidden";
            //                    parent.document.getElementById("sombraFooter").style.visibility="hidden";
         },
         "TransferirDelegate",
         "doNetworkOperation",
         [argumentos]
        );
}
               
TransferirDelegate.prototype.solicitaComision = function (peticion) {
       exec(function (jsonResponse) { /* success */
            sessionStorage.comisionMisCuentas = JSON.parse(jsonResponse).respuesta.comisionDisposicion;
//            var ccomission= document.getElementById('ccom');
//            ccomission.innerHTML = "$"+JSON.parse(jsonResponse).respuesta.comisionDisposicion;
                parent.hideLoadingLayer(); },
            function (errorMessage) { parent.hideLoadingLayer();
                        /*compraInvertirDelegate.muestraAlert("Aviso", JSON.parse(errorMessage).error.mensaje, "Aceptar");*/  },
            "TransferirDelegate",
            "solicitaComision",
            [peticion]
            );
}

TransferirDelegate.prototype.pagoMinimoNoInteres = function (peticion) {
       exec(function (jsonResponse) {
                console.log("pagoMinimo " + jsonResponse);
                sessionStorage.pagoMinimo = jsonResponse;
                window.frames.contentFrame.setTrTDC(jsonResponse);},
            function (errorMessage) { /* ERROR */ hideLoadingLayer(); parent.hideLoadingLayer(); },
            "TransferirDelegate",
            "pagoMinimoNoInteres",
            [peticion]
            );
}
               
TransferirDelegate.prototype.accionArrasAFrecuentes = function() {}

TransferirDelegate.prototype.accionArrasANueCuenta = function() {}

TransferirDelegate.prototype.accionMuestraSigPan = function() {}

TransferirDelegate.prototype.accionesCombosCampos = function() {}

TransferirDelegate.prototype.accionApareceBarra = function() {}

TransferirDelegate.prototype.accionCambiaConsulta = function() {}

TransferirDelegate.prototype.accionAsignaValRadios = function() {}

TransferirDelegate.prototype.accionesCombosCamposRadios = function() {}

TransferirDelegate.prototype.accionMuestraCorregir = function() {}

TransferirDelegate.prototype.asignaCuentaBoton = function() {}

TransferirDelegate.prototype.accionMuestraNueva = function() {}

TransferirDelegate.prototype.accionMuestraComprobante = function() {}

TransferirDelegate.prototype.accionMuestraConfirmar = function() {}

TransferirDelegate.prototype.accionMuestraCancelar = function() {}

TransferirDelegate.prototype.validaSecciones = function() {}

TransferirDelegate.prototype.validaSeccionesCampos = function() {}

TransferirDelegate.prototype.validaSeccionesInicio = function() {}

TransferirDelegate.prototype.mostrarResultadoOpera = function() {}

TransferirDelegate.prototype.enviarCorreo = function() {}

TransferirDelegate.prototype.operaExitosa = function() {}

TransferirDelegate.prototype.mostrarOpciones = function() {}

var transferirDelegate = new TransferirDelegate();
module.exports = transferirDelegate;

// __________ Termina Phongegap __________

});

// __________ Inicia JS __________

var MisCtasCCheqMquince      = false;
var MisCtasCCheqTDC          = false;
var MisCtasTDCCCheq          = false;
var CtasBBVACCheqNuevaCta    = false;
var CtasBBVACCheqFrecuente   = false;
var otrosBancosCCheqNuevaCta = false;
var otrosBancosCCheqDebito   = false;
var otrosBancosCCheqCredito  = false;
var banderaMisCuentas        = false;
var banderaCuentasBBVA       = false;
var banderaOtrosBancos       = false;

// __________ Termina JS __________

function devuelveLista (jsonResponse){
    console.log("JSON RESPONSE "+JSON.parse(jsonResponse).respuesta.listaTraspasos);
    sessionStorage.listaFrecuentesInterbancarias = JSON.parse(jsonResponse).respuesta.listaTraspasos;

}

function muestraError (errorMessage){
    
    console.log('errorFestivos', errorMessage);
    hideLoadingLayer();
    
    var opcion = null;
    
    var iFrame = loadIframe();
    if (iFrame.getAttribute("src") == "transferir-interbancarias.html") {
        opcion = "nb-otrosbancos";
    } else if (iFrame.getAttribute("src") == "transferir-terceros.html") {
        opcion = "nb-cuentasbbva";
    }
    
    baseViewController.validaLocation('isTransfer', opcion, '');
    loginDelegate.showAlert("Aviso\n", "ERROR "+errorMessage, "Aceptar");
}