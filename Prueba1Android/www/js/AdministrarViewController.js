
var invitado = false;
function leerOpciones() {
    var numTarjeta = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
    invitado = ( sessionStorage.esInvitado=="true" )?true:false;
    console.log("leerOpciones numTarjeta "+numTarjeta+" invitado "+invitado);
    if(invitado==true){
        console.log("leerOpciones es invitado");
       	$(".noInvitado").hide();
        
        var text=document.getElementById('lblInv');
        text.innerHTML="Comprobantes guardados:";
        
        var tab=document.getElementById('administrar-tabla');
        tab.deleteRow(1);
        tab.deleteRow(0);
        
        parent.administrarDelegate.activaBanderaInvitado();
        
    }else{
        console.log("leerOpciones NO es invitado");
        $(".noInvitado").show();
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
    
    var check1 = document.getElementById('administrar-radio-depurar2');
	var check2 = document.getElementById('administrar-radio-depurar0');
	var check3 = document.getElementById('administrar-radio-depurar1');
    
    console.log("validaSeleccion invitado "+invitado);
    var directorioComprobantes = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
    var directorioInvitados = directorioComprobantes+"/Invitados";
    
    if(invitado==true){
       //Invitado
        console.log("validaSeleccion invitado check borrar comprobantes guardados "+check3.checked);
        if(check3.checked){
            
            parent.administrarDelegate.muestraAlerta("Al oprimir Aceptar eliminarás tus comprobantes guardados",directorioComprobantes,"1","Tus comprobantes guardados han sido eliminados");
           // parent.administrarDelegate.ejecutaBorradoInvitados(directorioInvitados);
          //  ClearDirectory(directorioInvitados);
        }else{
            parent.compraInvertirDelegate.muestraAlert("Aviso\n","Debe seleccionar una opción","Aceptar");
        }
        check3.checked = false;
    }else {
        // Administrador
        
        console.log("validaSeleccion invitado check Número de tarjeta "+check1.checked);
       
        console.log("validaSeleccion invitado check comprobantes guardados "+check2.checked);
       
        console.log("validaSeleccion invitado check comprobantes de invitados guardados "+check3.checked);
        
        if(check1.checked){
            // Borro la carpeta del admin
           // parent.administrarDelegate.borrarCarpetaAdmin(JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr);
            
            parent.administrarDelegate.muestraAlerta("Al oprimir Aceptar eliminarás el numero de la tarjeta y los comprobantes guardados", directorioComprobantes,"0", "El número de la tarjeta y los comprobantes han sido eliminados");
           // parent.administrarDelegate.ejecutaBorrado(directorioComprobantes);
        }else if(check2.checked && check3.checked){
            parent.administrarDelegate.muestraAlerta("Al oprimir Aceptar eliminarás tus comprobantes guardados y los de tus invitados",directorioComprobantes,"0","Tus comprobantes guardados y los de tus invitados han sido eliminados");
           // parent.administrarDelegate.ejecutaBorradoComprobantes();
          //  ClearDirectory(directorioComprobantes);
        }else if(check2.checked && !check3.checked){
            parent.administrarDelegate.muestraAlerta("Al oprimir Aceptar eliminarás tus comprobantes guardados",directorioComprobantes,"1","Tus comprobantes guardados han sido eliminados");
           // parent.administrarDelegate.ejecutaBorradoDueno();
         //   ClearDirectory(directorioComprobantes);
        }else if(check3.checked && !check2.checked){
            parent.administrarDelegate.muestraAlerta("Al oprimir Aceptar eliminarás los comprobantes guardados de tus invitados",directorioComprobantes,"2","Los comprobantes de tus invitados han sido eliminados");
           // parent.administrarDelegate.ejecutaBorradoInvitados();
           // ClearDirectory(directorioInvitados);
        }else{
            parent.compraInvertirDelegate.muestraAlert("Aviso\n","Debe seleccionar una opción","Aceptar");
        }
        check1.checked = false;
        check2.checked = false;
        check3.checked = false;
        check2.disabled=false;
		check3.disabled=false;
    }
    
    
}


function muestraMensajes() {}


function ClearDirectory(directorio) {
    console.log("ClearDirectory directorio "+directorio);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
    function fail(evt) {
        console.log("FILE SYSTEM FAILURE" + evt.target.error.code);
    }
    function onFileSystemSuccess(fileSystem) {
        fileSystem.root.getDirectory("BCOM", {create: false, exclusive: false});
        fileSystem.root.getDirectory(
        		directorio,
            {create : false, exclusive : false},
            function(entry) {
            entry.removeRecursively(function() {
                console.log("Remove Recursively Succeeded");
            }, fail);
        }, fail);
    }
}

function success(parent) {
    console.log("Remove Recursively Succeeded");
}

function fail(error) {
    alert("Failed to remove directory or it's contents: " + error.code);
}


// __________ Termina JS __________
