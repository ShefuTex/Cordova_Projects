cordova.define("BComApp.BComAdministrar.AdministrarViewController.AdministrarDelegate", function(require, exports, module) {
               
// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

function AdministrarDelegate() {}

AdministrarDelegate.prototype.doComprobantes = function() {
	cordova.exec(
		function(result) { alert("responde check1"+ result); },
	    function(error)  { alert("Error" + error); }, 
	    "AdministrarDelegate", 
    	"doComprobantes", 
    	[]
  	);
}

AdministrarDelegate.prototype.doComprobantesInvitados = function() {
	cordova.exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "AdministrarDelegate", 
    	"doComprobantesInivitados", 
    	[]
  	);
}

AdministrarDelegate.prototype.ejecutaBorrado = function(directorio) {
	cordova.exec(
		function(result) { },
	    function(error)  { alert("Error" + error); }, 
	    "AdministrarDelegate", 
    	"ejecutaBorrado", 
    	[directorio]
  	);
}

AdministrarDelegate.prototype.ejecutaBorradoInvitados = function() {
	cordova.exec(
		function(result) {},
	    function(error)  { alert("Error" + error); }, 
	    "AdministrarDelegate", 
    	"ejecutaBorradoInvitados", 
    	[]
  	);
}
               
AdministrarDelegate.prototype.ejecutaBorradoDueno = function() {
    cordova.exec(
        function(result) { },
        function(error)  { alert("Error" + error); },
        "AdministrarDelegate",
        "ejecutaBorradoDueno",
        []
    );
}
               
AdministrarDelegate.prototype.ejecutaBorradoComprobantes = function() {
    cordova.exec(
        function(result) { },
        function(error)  { alert("Errorsoy" + error); },
        "AdministrarDelegate",
        "ejecutaBorradoComprobantes",
        []
    );
}

AdministrarDelegate.prototype.muestraAlerta = function(texto, directorio,tipo,txtConfirmacion) {
    cordova.exec(
        function(result) {
                 console.log("------------------------------------------vuelvo de la alerta");
            //location.reload();
            
              if(tipo == "0"){
                 showLoadingLayer();
                 exec(
                      function (jsonResponse) { hideLoadingLayer(); },
                      function (errorMessage) { hideLoadingLayer(); },
                      "LoginDelegate",
                      "logout",
                      [sessionStorage.username, sessionStorage.userCardNumber, "1"]
                      );

                 } else {
                    compraInvertirDelegate.muestraAlert("Aviso\n", txtConfirmacion, "Aceptar");
                 }
        },
        function(error)  {
        },
        "AdministrarDelegate",
        "muestraAlerta",
        [texto, directorio, tipo]
    );
}
               
AdministrarDelegate.prototype.activaBanderaInvitado = function() {
    cordova.exec(
        function(result) { },
        function(error)  { alert("Error" + error); },
        "AdministrarDelegate",
        "activaBanderaInvitado",
        []
    );
}

AdministrarDelegate.prototype.muestraAlertaErr = function(texto) {
               cordova.exec(
                            function(result) {
                            console.log("------------------------------------------vuelvo de la alerta");
                            },
                            function(error)  {
                            },
                            "AdministrarDelegate",
                            "muestraAlertaErr",
                            [texto]
                            );
               }
               
AdministrarDelegate.prototype.borrarCarpetaAdmin = function(numAdmin) {
               cordova.exec(
                            function(result) {
                            console.log("------------------------------------------vuelvo de la alerta");
                            showLoadingLayer();
                            // cerramos la session
                            exec(
                                 function (jsonResponse) { hideLoadingLayer(); },
                                 function (errorMessage) { hideLoadingLayer(); },
                                 "LoginDelegate",
                                 "logout",
                                 [sessionStorage.username, sessionStorage.userCardNumber, "1"]
                                 );
                            
                            },
                            function(error)  {
                            alert("Error al borrar la carpeta de admin");
                            },
                            "AdministrarDelegate",
                            "borrarCarpetaAdmin",
                            [numAdmin]
                            );
               }



AdministrarDelegate.prototype.seleccionaComponentesPropios = function() {}

AdministrarDelegate.prototype.seleccionaComponentesOtros = function() {}

var administrarDelegate = new AdministrarDelegate();
module.exports = administrarDelegate;

// __________ Termina Phongegap __________

});

