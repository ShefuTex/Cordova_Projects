cordova.define("BComApp.BComWebTrader.WebTraderViewController.WebTraderDelegate", function(require, exports, module) {

// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

function WebTraderDelegate() {}

WebTraderDelegate.prototype.recuperaContratosPatrimoniales = function(){
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "WebTraderDelegate", 
    	"recuperaContratosPatrimoniales", 
    	[]
  	);
}

WebTraderDelegate.prototype.recuperaTipoServicio = function(){
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "WebTraderDelegate", 
    	"recuperaTipoServicio", 
    	[]
  	);
}

WebTraderDelegate.prototype.recuperaConsultaTipoCapitales = function(){
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "WebTraderDelegate", 
    	"recuperaConsultaTipoCapitales", 
    	[]
  	);
}

WebTraderDelegate.prototype.recuperaConsultaCapitales = function(){
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "WebTraderDelegate", 
    	"recuperaConsultaCapitales", 
    	[]
  	);
}

WebTraderDelegate.prototype.ejecutaCompraVenta = function(){
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "WebTraderDelegate", 
    	"ejecutaCompraVenta", 
    	[]
  	);
}

WebTraderDelegate.prototype.ejecutaCancelacion = function(){
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "WebTraderDelegate", 
    	"ejecutaCancelacion", 
    	[]
  	);
}

WebTraderDelegate.prototype.limpiarMemoria = function(){
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "WebTraderDelegate", 
    	"limpiarMemoria", 
    	[]
  	);
}

WebTraderDelegate.prototype.doNetworkOperation = function(){
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "WebTraderDelegate", 
    	"doNetworkOperation", 
    	[]
  	);
}

WebTraderDelegate.prototype.networkResponse = function(){
	exec(
		function(result) { alert(result); },
	    function(error)  { alert("Error" + error); }, 
	    "WebTraderDelegate", 
    	"networkResponse", 
    	[]
  	);
}

var webTraderDelegate = new WebTraderDelegate();
module.exports = webTraderDelegate;

// __________ Termina Phongegap __________

});

// __________ Inicia JS __________

function leerContratosPatrimoniales() {}
function leerTipoServicio() {}
function leerConsultaTipoCapitales() {}
function validaSelecciones() {}
function accionSeleccion() {}

// __________ Termina JS __________
