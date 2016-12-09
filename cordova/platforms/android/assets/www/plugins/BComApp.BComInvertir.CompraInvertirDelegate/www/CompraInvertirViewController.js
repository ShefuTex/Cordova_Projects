cordova.define("BComApp.BComInvertir.CompraInvertirDelegate.CompraInvertirDelegate", function(require, exports, module) {

// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

var reglasNegocio;
var posicionGlobal;
               
/* Lee del objeto sessionStorage y parsea a JSON */
if ((typeof sessionStorage.jsonReglasNegocio != "undefined") && (sessionStorage.jsonReglasNegocio != null) && (sessionStorage.jsonReglasNegocio.length > 0)) {
    reglasNegocio = JSON.parse(sessionStorage.jsonReglasNegocio);
}

if ((typeof sessionStorage.jsonPosicion != "undefined") && (sessionStorage.jsonPosicion != null) && (sessionStorage.jsonPosicion.length > 0)) {
   posicionGlobal = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal;
}
            
var listaCuentasCheques = [];

function temporal (operacion, campo, valor) {
   this.operacion = operacion;
   this.campo = campo;
   this.valor = valor;
}

function rellenaTemporalCuenta(cuentaInv) {
   
   var cadenaCuentaInv = cuentaInv.split(' - ');
   var numeroCuenta = cadenaCuentaInv[0];
   var tipoCuenta = cadenaCuentaInv[1];
   var saldoDisponible = cadenaCuentaInv[2];
   
   var itemNumeroCuenta = new Temporal("G","numeroCuenta",numeroCuenta);
   var itemTipoCuenta = new Temporal("G","tipoCuenta",tipoCuenta);
   var itemSaldoDisponible = new Temporal("G","saldoDisponible",saldoDisponible);
}
               
function CompraInvertirDelegate() {}
               
function DatosAplicativos (acceso, claveOperaciones, digitoVerificador, fechaAplicacion, importe, importeInversion, instruccionCapital, instruccionIntereses, instrumento, inversion, numeroCuenta, otp, plazo, tripletaTasa, usuario) {
       this.acceso = acceso;
       this.claveOperaciones = claveOperaciones;
       this.digitoVerificador = digitoVerificador;
       this.fechaAplicacion = fechaAplicacion;
       this.importe = importe;
       this.importeInversion = importeInversion;
       this.instruccionCapital = instruccionCapital;
       this.instruccionIntereses = instruccionIntereses;
       this.instrumento = instrumento;
       this.inversion = inversion;
       this. numeroCuenta = numeroCuenta;
       this.otp = otp;
       this.plazo = plazo;
       this.tripletaTasa = tripletaTasa;
       this.usuario = usuario;
}
               
function devuelveDia(dia){
   
   var salida;
   
   if (dia==6){
       salida = "sabado";
   }else if (dia==7){
       salida = "domingo";
   }else{
       salida = "lunesViernes";
   }
   return salida;
}
               
function addZeroSingleNumber(val){
   var ret = val;
   if(parseInt(ret) < Number(10)) ret = "0"+ret;
   return ret;
}

function llenaDatos(divToExport){
       var date = new Date();
       var day = date.getDate();
       var month = date.getMonth();
       $("div#" + divToExport + " .date").html(addZeroSingleNumber(day)+"-"+addZeroSingleNumber(month)+"-"+date.getFullYear()+"&nbsp;"+addZeroSingleNumber(date.getHours())+":"+addZeroSingleNumber(date.getMinutes())+":"+addZeroSingleNumber(date.getSeconds()));
       
       var campos = ["","cuenta","instrumento","tituloInversion","plazo","fechaVencimiento","pagoCapital","importeVencimiento","pagoInteres","interesVencimiento","tasaBruta","totalAntesImp","impuesto","cuentaRetiro","importeInversion","fechaOperacion","horaOperacion","folioOperacion"];
       campos.reverse();
       $.each($('#dialog #bodyD table tr'), function(obj){
                  var ele = campos.pop();
                      td = $(this).children("td")[1];
                  if(ele == ""){
                      $(td).html("Comprar");
                  }else{
                      $(td).html($("#"+ele).html());
                  }
              });
       
       //	A espera de integracion
       //	$("#dialog .name").html(PosicionGlobal.posicionGlobal.nombre_usr);
}

function launchComprobante(event){

       llenaDatos("dialog");
       $("#dialog").dialog("open");
       
       event.stopPropagation();

}
               
CompraInvertirDelegate.prototype.recuperarHorario = function (){
   
   var fechaHoy = new Date();
   var salida;
   console.log("recuperarHorario  catalogos "+sessionStorage.jsonReglasNegocio.split("catalogos")[1]);
   console.log("recuperarHorario compraInversiones 0  "+sessionStorage.jsonReglasNegocio.split("compraInversiones")[0]);
   console.log("recuperarHorario compraInversiones 1  "+sessionStorage.jsonReglasNegocio.split("compraInversiones")[1]);
   console.log("recuperarHorario compraInversiones "+JSON.parse(sessionStorage.jsonReglasNegocio).aplicaciones.compraInversiones);
   console.log("recuperarHorario operacion "+JSON.parse(sessionStorage.jsonReglasNegocio).aplicaciones.compraInversiones.operacion);
   
   if (JSON.parse(sessionStorage.jsonReglasNegocio).aplicaciones.compraInversiones.operacion != undefined && JSON.parse(sessionStorage.jsonReglasNegocio).aplicaciones.compraInversiones.operacion.cargo != undefined){
	
	   var tablaHorarios = JSON.parse(sessionStorage.jsonReglasNegocio).aplicaciones.compraInversiones.operacion.cargo.abono.horarioOperacion;
	   var intervalo = devuelveDia(fechaHoy.getDay());
	   
	   if (intervalo=="lunesViernes"){
	       salida = tablaHorarios.lunesViernes;
	   }else if (intervalo=="sabado"){
	       salida = tablaHorarios.sabado;
	   }else{
	       salida = tablaHorarios.domingo;
	   }
   }

   console.log("recuperarHorario salida "+salida);
   
   return salida;
}
               
CompraInvertirDelegate.prototype.configurarUI = function () {
	exec(
		function(result) { alert( "Metodo : configurarUI - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"CompraInvertirDelegate", 
    	"recuperaCuentaRetiro", 
		[]
	); 
}

CompraInvertirDelegate.prototype.leerPlazos = function () { 

       var salida = [];
       var plazo;
       
       //Recupero la lista de objetos Plazos
       console.log("Reglas de negocio.catalogos "+JSON.parse(sessionStorage.jsonReglasNegocio).catalogos);
       var listaPlazos = JSON.parse(sessionStorage.jsonReglasNegocio).catalogos.compraInversiones.instrumento.plazos.dias;
       
       for (indice = 0; indice < listaPlazos.length; indice++){
           plazo = listaPlazos[indice];
           
           if (plazo == "1"){
               elemento = plazo + " día";
           }else{
               elemento = plazo + " días";
       }
       
       salida.push(elemento);
       
       }
       
       var frame = parent.document.getElementById('contentFrame');
       var doc = (frame.contentWindow || frame.contentDocument)
       if (doc.document) doc = doc.document;
       var comboPlazos = doc.getElementById('plazo');
       
       comboPlazos[0] = new Option ("Selecciona");
       
       for (var i = 0; i < listaPlazos.length; i++) {
    	   comboPlazos[i+1] = new Option (salida[i], salida[i].substring(0, salida[i].indexOf(" ")));
       }
//       return salida;
               
}

CompraInvertirDelegate.prototype.leerInstPagCapital = function () { 

   var salida = [];
   var listaPagoCap = reglasNegocio.catalogos.compraInversiones.instrumento.pagoCapital;
   
   for (indice = 0; indice < listaPagoCap.length; indice++){
       valor = listaPagoCap[indice];
       descripcion2 = valor.descripcion;
               salida.push({descripcion: descripcion2, tipo: valor.tipo});
   }
    
   var frame = parent.document.getElementById('contentFrame');
   var doc = (frame.contentWindow || frame.contentDocument)
   if (doc.document) doc = doc.document;
   var comboPagCapital = doc.getElementById('pagoCapital');
   
   comboPagCapital[0] = new Option ("Selecciona");
   
   for (var i = 0; i < salida.length; i++) {
	   comboPagCapital[i+1] = new Option (salida[i].descripcion, salida[i].tipo);
   }
       
//  return salida;
               
}

CompraInvertirDelegate.prototype.leerInstPagInteres = function () { 

   var salida = [];
   var listaPagoInt = reglasNegocio.catalogos.compraInversiones.instrumento.pagoInteres;
   
   for (indice = 0; indice < listaPagoInt.length; indice++){
       valor = listaPagoInt[indice];
       descripcion = valor.descripcion;
               salida.push({descripcion: descripcion, tipo: valor.tipo});
   }
   
   var frame = parent.document.getElementById('contentFrame');
   var doc = (frame.contentWindow || frame.contentDocument)
   if (doc.document) doc = doc.document;
   var comboPagInteres = doc.getElementById('pagoInteres');
   
   comboPagInteres[0] = new Option ("Selecciona");
   
   for (var i = 0; i < salida.length; i++) {
	   comboPagInteres[i+1] = new Option (salida[i].descripcion, salida[i].tipo);
   }
               
               
//   return salida;
               
}
CompraInvertirDelegate.prototype.leerContraCuenInversion = function () {  
    var salida = [];
    
    //Recupero la lista de objetos Cuenta.
    var listaContratosCuentas = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.asuntos.lista_inversiones_mxp;
    if (listaContratosCuentas != null){
        //Recorro la lista y concateno para pasar una lista correcta.
        for (indice = 0; indice < listaContratosCuentas.length; indice++) {
            valor = listaContratosCuentas[indice];
            numeroCuenta = valor.numero;
            tipoCuenta = valor.tipo;
            saldoDisponible = valor.saldo;
            
            elemento = numeroCuenta.substring(numeroCuenta.length-10,numeroCuenta.length) + " - " + tipoCuenta + " - $ " + saldoDisponible;
            salida.push([elemento, numeroCuenta]);
        }    	   
    }       
    var frame = parent.document.getElementById('contentFrame');
    var doc = (frame.contentWindow || frame.contentDocument)
    if (doc.document) doc = doc.document;
    var comboCtasInv = doc.getElementById('cuenta');
    
    comboCtasInv[0] = new Option ("Selecciona");
    
    for (var i = 0; i < salida.length; i++) {
 	   comboCtasInv[i+1] = new Option (salida[i][0],salida[i][1]);
    }
//    return salida;
            
}


CompraInvertirDelegate.prototype.leerInstrumentoInversion = function () { 
    var instrumentos = [];
    var listaInstrumentos = reglasNegocio.catalogos.compraInversiones.instrumento;
//    var listaPlazos = compraInvertirDelegate.leerPlazos();
               
    if ((typeof listaInstrumentos.length == 'undefined') && (listaInstrumentos.length == null)) {
    	instrumentos.push({descripcion: listaInstrumentos.descripcion, importeminimo: listaInstrumentos.importeminimo});
    } else {
    	for(var i = 0; i < listaInstrumentos.length; i++){
    		instrumentos.push({descripcion: listaInstrumentos[i].descripcion, importeminimo: listaInstrumentos[i].importeminimo});
        }
    }
   
    var frame = parent.document.getElementById('contentFrame');
    var doc = (frame.contentWindow || frame.contentDocument)
    if (doc.document) doc = doc.document;
    var comboInstrumento = doc.getElementById('instrumento');
    
    comboInstrumento[0] = new Option ("Selecciona", "-1");
    
	for (var i = 0; i < instrumentos.length; i++) {
		comboInstrumento[i+1] = new Option (instrumentos[i].descripcion, instrumentos[i].importeminimo);
	}
//    return instrumentos;
}

CompraInvertirDelegate.prototype.leerFecha = function () { 

    var frame = parent.document.getElementById('contentFrame');
    var doc = (frame.contentWindow || frame.contentDocument)
    if (doc.document) doc = doc.document;
    var campoFecha = doc.getElementById('fechaOperacion');
    campoFecha.innerHTML = reglasNegocio.usuario.fechaservidor;
}

CompraInvertirDelegate.prototype.leerCuentasRetiro= function () {

       var salida = [];

       // Sólo se toman las cuentas en pesos.
       var listaCuentasRetiro = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.asuntos.lista_cuentas_mxp;
       
       for (var i = 0; i < listaCuentasRetiro.length; i++){
               if ((listaCuentasRetiro[i].tipo == 'AH') || (listaCuentasRetiro[i].tipo == 'CH') || (listaCuentasRetiro[i].tipo == 'LI')) {
                   valor = listaCuentasRetiro[i];
                   
                   numeroCuenta = valor.numero;
                   saldoDisponible = valor.saldo_disponible;
                   
                   elemento = numeroCuenta.substring(numeroCuenta.length-10,numeroCuenta.length) + " - $ " + saldoDisponible;
                   
                   salida.push([elemento, numeroCuenta]);
               }
       }
       
       var frame = parent.document.getElementById('contentFrame');
       var doc = (frame.contentWindow || frame.contentDocument)
       if (doc.document) doc = doc.document;
       var comboCtasRet = doc.getElementById('cuentaRetiro');
       
       comboCtasRet[0] = new Option ("Selecciona");
       
       for (var i = 0; i < salida.length; i++) {
    	   comboCtasRet[i+1] = new Option (salida[i][0],salida[i][1]);
       }
           
//       return salida;
               
}

CompraInvertirDelegate.prototype.muestraAlert = function (titulo, mensaje, boton) {
    exec(function (jsonResponse) { /* Respuesta exitosa */ },
         function (errorMessage) { /* Respuesta erronea */ },
         "CompraInvertirDelegate",
         "muestraAlert",
         [titulo, mensaje, boton]
         );
}
CompraInvertirDelegate.prototype.aplicaCompra = function (proceso, operacion, accion, datosAplicativos, successCallBack, errorCallBack) {
       exec(
	        function(jsonResponse) {
	        	console.log("aplicaCompra jsonResponse "+jsonResponse);
	        	successCallBack(jsonResponse);
	        },
	        function (errorMessage) {
	        	errorCallBack(errorMessage);
           	},    		   
	        "CompraInvertirDelegate",
	        "aplicaCompra",
	        [proceso, operacion, accion, datosAplicativos]
	        );
}

CompraInvertirDelegate.prototype.recuperarAplicarCompra = function () {

    return JSON.parse(sessionStorage.aplicaCompraResponse).respuesta;
            
}
  
               
var compraInvertirDelegate = new CompraInvertirDelegate();
module.exports = compraInvertirDelegate;

// __________ Termina Phongegap __________

});