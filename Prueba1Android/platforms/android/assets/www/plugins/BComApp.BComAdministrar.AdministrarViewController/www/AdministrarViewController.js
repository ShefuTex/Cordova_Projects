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

AdministrarDelegate.prototype.ejecutaBorradoInvitados = function(directorio) {
	cordova.exec(
		function(result) {},
	    function(error)  { alert("Error" + error); }, 
	    "AdministrarDelegate", 
    	"ejecutaBorradoInvitados", 
    	[directorio]
  	);
}
               
AdministrarDelegate.prototype.ejecutaBorradoDueno = function(directorio) {
    cordova.exec(
        function(result) { },
        function(error)  { alert("Error" + error); },
        "AdministrarDelegate",
        "ejecutaBorradoDueno",
        [directorio]
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

AdministrarDelegate.prototype.muestraAlerta = function() {
    cordova.exec(
        function(result) {
            location.reload();
        },
        function(error)  {
        },
        "AdministrarDelegate",
        "muestraAlerta",
        []
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

AdministrarDelegate.prototype.seleccionaComponentesPropios = function() {}

AdministrarDelegate.prototype.seleccionaComponentesOtros = function() {}

var administrarDelegate = new AdministrarDelegate();
module.exports = administrarDelegate;

// __________ Termina Phongegap __________

});

// __________ Inicia JS __________

var invitado = false;
function leerOpciones() {
	console.log(sessionStorage.esInvitado);
    if(sessionStorage.esInvitado=='true'){
        var text=document.getElementById('lblInv');
        text.innerHTML="Comprobantes guardados:";
        
        var tab=document.getElementById('administrar-tabla');
        tab.deleteRow(1);
        tab.deleteRow(0);
        
        parent.administrarDelegate.activaBanderaInvitado();
    }
}

function validaBotones() {
    var check1 = document.getElementById('administrar-radio-depurar2');
	var check2 = document.getElementById('administrar-radio-depurar0');
	var check3 = document.getElementById('administrar-radio-depurar1');
	if(check1.checked){
		check2.checked=true;
		check2.disabled=true;
		check3.checked=true;
		check3.disabled=true;
	}else {
		check2.checked=false;
		check2.disabled=false;
		check3.checked=false;
		check3.disabled=false;
	}
}

function validaSeleccion(){
	var directorioUsuario = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
	var directorioInvitados = directorioUsuario+"/Invitados";
    if(sessionStorage.esInvitado=='true'){
    	directorioInvitados = directorioInvitados + "/" +sessionStorage.invitadoNumber;
    	directorioUsuario = directorioInvitados;
        var check3 = document.getElementById('administrar-radio-depurar1');
        if(check3.checked){
            parent.administrarDelegate.ejecutaBorradoInvitados(directorioInvitados);
        }else{
            parent.administrarDelegate.muestraAlerta();
        }
        check3.checked = false;
    }else {
        var check1 = document.getElementById('administrar-radio-depurar2');
        var check2 = document.getElementById('administrar-radio-depurar0');
        var check3 = document.getElementById('administrar-radio-depurar1');
        if(check1.checked){
            parent.administrarDelegate.ejecutaBorrado(directorioUsuario);
        }else if(check2.checked && check3.checked){
            parent.administrarDelegate.ejecutaBorradoComprobantes();
        }else if(check2.checked && !check3.checked){
            parent.administrarDelegate.ejecutaBorradoDueno(directorioUsuario);
        }else if(check3.checked && !check2.checked){
            parent.administrarDelegate.ejecutaBorradoInvitados(directorioInvitados);
        }else{
            parent.administrarDelegate.muestraAlerta();
        }
        check1.checked = false;
        check2.checked = false;
        check3.checked = false;
        check2.disabled=false;
		check3.disabled=false;
    }

}


function muestraMensajes() {}

// __________ Termina JS __________
