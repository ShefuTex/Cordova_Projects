cordova.define("BComApp.BComInvertir.VentaInvertirDelegate.VentaInvertirDelegate", function(require, exports, module) {

// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

function VentaInvertirDelegate() {}

VentaInvertirDelegate.prototype.leerContraCuenInversion = function() {
	exec(
		function(result) { alert( "Metodo : leerContraCuenInversion - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"VentaInvertirDelegate", 
    	"recuperaCuentaDeposito", 
		[]
	);
}

VentaInvertirDelegate.prototype.leerFecha = function() {
	exec(
		function(result) { alert( "Metodo : leerFecha - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"VentaInvertirDelegate", 
    	"recuperaContratosCuentasInv", 
		[]
	); 
}

VentaInvertirDelegate.prototype.validaCampos = function() {
	exec(
		function(result) { alert( "Metodo : validaCampos - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"VentaInvertirDelegate", 
    	"recuperaDatosConsulta", 
		[]
	); 
}

VentaInvertirDelegate.prototype.accionesCombos = function() {
	exec(
		function(result) { alert( "Metodo : accionesCombos - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"VentaInvertirDelegate", 
    	"recuperaDatosBarra", 
		[]
	); 
}

VentaInvertirDelegate.prototype.leeDatosConsulta = function() {
	exec(
		function(result) { alert( "Metodo : leeDatosConsulta - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"VentaInvertirDelegate", 
    	"recuperaDatosOperaExitosa", 
		[]
	); 
}

VentaInvertirDelegate.prototype.accionCambiaConsulta = function() {
	exec(
		function(result) { alert( "Metodo : accionCambiaConsulta - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"VentaInvertirDelegate", 
    	"GeneraPDF", 
		[]
	); 
}

VentaInvertirDelegate.prototype.accionApareceBarra = function() { 
	exec(
		function(result) { alert( "Metodo : accionApareceBarra - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"VentaInvertirDelegate", 
    	"guardarImgPreviaRecortadC", 
		[]
	); 
}

VentaInvertirDelegate.prototype.leerDatosOperaExitosa = function() { 
	exec(
		function(result) { alert( "Metodo : leerDatosOperaExitosa - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"VentaInvertirDelegate", 
    	"guardarImgPreviaC", 
		[]
	); 
}

VentaInvertirDelegate.prototype.validaAccionNueva = function() { 
	exec(
		function(result) { alert( "Metodo : validaAccionNueva - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"VentaInvertirDelegate", 
    	"doNetworkOperation", 
		[]
	); 
}

VentaInvertirDelegate.prototype.validaAccionCompro = function() { 
	exec(
		function(result) { alert( "Metodo : validaAccionCompro - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"VentaInvertirDelegate", 
    	"networkResponse", 
		[]
	); 
}

VentaInvertirDelegate.prototype.aplicaVenta = function(aplicaVenta, successCallBack, errorCallBack) {
exec(
    function(jsonResponse) {
    // sessionStorage.jsonAplicaVenta = jsonResponse
     successCallBack(jsonResponse);
    },
    function (errorMessage) {
    	errorCallBack(errorMessage);
    },
    "VentaInvertirDelegate",
    "aplicaVenta",
    [aplicaVenta]
    ); 
}
               
VentaInvertirDelegate.prototype.recuperaListaTitulos = function(datosAplicativos, successCallBack, errorCallBack) {
exec(
    function(jsonResponse) {
    	successCallBack(jsonResponse);
    },
    function (errorMessage) {
    	errorCallBack(errorMessage);
    },
    "VentaInvertirDelegate",
    "recuperaListaTitulos",
    [datosAplicativos]
    );
}  

VentaInvertirDelegate.prototype.validaAccionInicio = function() { 
	alert("Metodo : validaAccionInicio"); 
}

VentaInvertirDelegate.prototype.comprobante = function () {
	$('body', window.parent.document).append("<div id='comprobanteFrame' onclick='$(\"#comprobanteFrame\").remove();'><div id='imagenComprobante'></div></div>" );
}

var ventaInvertirDelegate = new VentaInvertirDelegate();
module.exports = ventaInvertirDelegate;

// __________ Termina Phongegap __________

});
