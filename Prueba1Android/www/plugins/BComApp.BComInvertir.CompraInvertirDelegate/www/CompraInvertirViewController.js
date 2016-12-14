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
               
function DatosAplicativos (acceso, claveOperaciones, digitoVerificador, fechaAplicacion, importe, importeInversion, instruccionCapital, instruccionInteres, instrumento, inversion, numeroCuenta, otp, plazo, tripletaTasa, usuario) {
       this.acceso = acceso;
       this.claveOperaciones = claveOperaciones;
       this.digitoVerificador = digitoVerificador;
       this.fechaAplicacion = fechaAplicacion;
       this.importe = importe;
       this.importeInversion = importeInversion;
       this.instruccionCapital = instruccionCapital;
       this.instruccionInteres = instruccionInteres;
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
               
       //parent.document.getElementById('imgMenu').style.zIndex='-1';
       
       llenaDatos("dialog");
       $("#dialog").dialog("open");
       
       event.stopPropagation();

}
               
CompraInvertirDelegate.prototype.recuperarHorario = function (){
   var tablaHorarios = reglasNegocio.aplicaciones.compraInversiones.operacion.cargo.abono.horarioOperacion;
   var fechaHoy = new Date();
   var salida;
   
   var intervalo = devuelveDia(fechaHoy.getDay());
   
   if (intervalo=="lunesViernes"){
       salida = tablaHorarios.lunesViernes;
   }else if (intervalo=="sabado"){
       salida = tablaHorarios.sabado;
   }else{
       salida = tablaHorarios.domingo;
   }
           
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

CompraInvertirDelegate.prototype.leerCuentasRetiro= function () {
//	exec(
//		function(result) { alert( "Metodo : leerCuentasRetiro - Plugin : " + result); },
//    	function(error) { alert("Error" + error); }, 
//		"CompraInvertirDelegate", 
//    	"recuperaContratosCuentasInv", 
//		[]
//	);
               
       var salida = [];
//       var tiposCuentasRetiro = reglasNegocio.aplicaciones.compraInversiones.operacion.cargo.cuentas.cuenta;
               
       // Sólo se toman las cuentas en pesos.
       var listaCuentasRetiro = posicionGlobal.asuntos.lista_cuentas_mxp;
       
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

CompraInvertirDelegate.prototype.leerContraCuenInversion = function () {  
//	exec(
//		function(result) { alert( "Metodo : leerContraCuenInversion - Plugin : " + result); },
//    	function(error) { alert("Error" + error); }, 
//		"CompraInvertirDelegate", 
//    	"recuperaInstrumentoInv", 
//		[]
//	); 

       var salida = [];
       
       //Recupero la lista de objetos Cuenta.
       var listaContratosCuentas = posicionGlobal.asuntos.lista_inversiones_mxp;
       
       //Recorro la lista y concateno para pasar una lista correcta.
       for (indice = 0; indice < listaContratosCuentas.length; indice++) {
           valor = listaContratosCuentas[indice];
           numeroCuenta = valor.numero;
           tipoCuenta = valor.tipo;
           saldoDisponible = valor.saldo;
           
           elemento = numeroCuenta.substring(numeroCuenta.length-10,numeroCuenta.length) + " - " + tipoCuenta + " - $ " + saldoDisponible;
           salida.push([elemento, numeroCuenta]);
       }
       
               var frame = parent.document.getElementById('contentFrame');
               var doc = (frame.contentWindow || frame.contentDocument)
               if (doc.document) doc = doc.document;
               var comboCtasInv = doc.getElementById('cuenta');
               
               comboCtasInv[0] = new Option ("Selecciona");
               
               for (var i = 0; i < salida.length; i++) {
               comboCtasInv[i+1] = new Option (salida[i][0],salida[i][1]);
               }
//       return salida;
               
}

CompraInvertirDelegate.prototype.leerInstrumentoInversion = function () { 
//	exec(
//		function(result) { alert( "Metodo : leerInstrumentoInversion - Plugin : " + result); },
//    	function(error) { alert("Error" + error); }, 
//		"CompraInvertirDelegate", 
//    	"recuperaPlazos", 
//		[]
//	);
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

CompraInvertirDelegate.prototype.leerPlazos = function () { 
//	exec(
//		function(result) { alert( "Metodo : leerPlazos - Plugin : " + result); },
//    	function(error) { alert("Error" + error); }, 
//		"CompraInvertirDelegate", 
//    	"recuperaInstrumentoPagoCap", 
//		[]
//	); 

       var salida = [];
       var plazo;
       
       //Recupero la lista de objetos Plazos
       var listaPlazos = reglasNegocio.catalogos.compraInversiones.instrumento.plazos.dias;
       
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
//	exec(
//		function(result) { alert( "Metodo : leerInstPagCapital - Plugin : " + result); },
//    	function(error) { alert("Error" + error); }, 
//		"CompraInvertirDelegate", 
//    	"recuperaInstrumentoPagoInt", 
//		[]
//	); 

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
//	exec(
//		function(result) { alert( "Metodo : leerInstPagInteres - Plugin : " + result); },
//    	function(error) { alert("Error" + error); }, 
//		"CompraInvertirDelegate", 
//    	"recuperaDatosConsulta", 
//		[]
//	); 

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

CompraInvertirDelegate.prototype.leerFecha = function () { 
//	exec(
//		function(result) { alert( "Metodo : leerFecha - Plugin : " + result); },
//    	function(error) { alert("Error" + error); }, 
//		"CompraInvertirDelegate", 
//    	"recuperaDatosBarra", 
//		[]
//	);
    var frame = parent.document.getElementById('contentFrame');
    var doc = (frame.contentWindow || frame.contentDocument)
    if (doc.document) doc = doc.document;
    var campoFecha = doc.getElementById('fechaOperacion');
    campoFecha.innerHTML = reglasNegocio.usuario.fechaservidor;
}

    CompraInvertirDelegate.prototype.aplicaCompra = function (peticion, successCallBack, errorCallBack) {
               exec(
                    function(jsonResponse) {
                        successCallBack(jsonResponse);
                    },
                    function (errorMessage) {
                        errorCallBack(errorMessage);
                    },
            "CompraInvertirDelegate",
            "aplicaCompra",
            [peticion]
            );
}
               
CompraInvertirDelegate.prototype.devuelveCuenta = function (tipo, num) {

               var tipoC = "", numero = "";
               
               if (tipo == "retiro") {
                    var listaCuentas = posicionGlobal.asuntos.lista_cuentas_mxp;
               
                    for (var i in listaCuentas) {
                        if (num == listaCuentas[i].numero) {
                            tipoC = listaCuentas[i].tipo;
                            numero = listaCuentas[i].numero;
                        }
                    }
               } else if (tipo == "inversion") {
                    numero = num;
                    tipoC = "IN";
               }
               console.log("devuelveCuenta "+numero + "-" + tipoC);

               return numero + "-" + tipoC;
               
}
               
CompraInvertirDelegate.prototype.muestraAlert = function (titulo, mensaje, boton) {
               exec(function (jsonResponse) { /* Respuesta exitosa */ },
                    function (errorMessage) { /* Respuesta erronea */ },
                    "CompraInvertirDelegate",
                    "muestraAlert",
                    [titulo, mensaje, boton]
                    );
}

CompraInvertirDelegate.prototype.muestraAlertDual = function (titulo, mensaje, boton1, boton2) {
   exec(function (jsonResponse) { /* Respuesta exitosa */ },
        function (errorMessage) { /* Respuesta erronea */ },
        "CompraInvertirDelegate",
        "muestraAlertDual",
        [titulo, mensaje, boton1, boton2]
        );
}
               
               
CompraInvertirDelegate.prototype.recuperaListaChequesCompra = function (datosAplicativos, successCallBack, errorCallBack) {
               exec( function(jsonResponse) {
                    successCallBack(jsonResponse);
                    },
                    function (errorMessage) {
                    errorCallBack(errorMessage);
                    },
                    "CompraInvertirDelegate",
                    "recuperaListaChequesCompra",
                    [datosAplicativos]
                    );
               }
               
CompraInvertirDelegate.prototype.devuelveCodigoInstrumento = function (instrumento) {
    var listaInstrumentos = reglasNegocio.catalogos.compraInversiones.instrumento;
    var codigoInstrumento;
               
        if ((typeof listaInstrumentos.length == 'undefined') && (listaInstrumentos.length == null)) {
               console.log("listaInstrumentos.descripcion "+listaInstrumentos.descripcion);
               console.log("instrumento toUpperCase"+instrumento.toUpperCase());

               if (listaInstrumentos.descripcion.localeCompare(instrumento.toUpperCase())==0) {
                    codigoInstrumento = listaInstrumentos.codigo;
               }
        } else {
            for(var j = 0; i < listaInstrumentos.length; j++){
               console.log("listaInstrumentos[j].descripcion "+listaInstrumentos[j].descripcion);
               console.log("instrumento toUpperCase "+instrumento.toUpperCase());


               if (listaInstrumentos[j].descripcion.localeCompare(instrumento.toUpperCase())==0) {
                   codigoInstrumento = listaInstrumentos[j].codigo;
               console.log("codigoInstrumento = listaInstrumentos[j].codigo; "+ listaInstrumentos[j].codigo);

               }
            }
        }
               console.log("codigoInstrumento "+codigoInstrumento);
    return codigoInstrumento;
}

CompraInvertirDelegate.prototype.recuperarAplicarCompra = function () {
               
               
var respuestaAplicarCompra="";
               
if (sessionStorage.aplicaCompraResponse!=null){
               

    respuestaAplicarCompra= JSON.parse(sessionStorage.aplicaCompraResponse).respuesta;
               
}
               
               
return respuestaAplicarCompra;

}
               
/*
CompraInvertirDelegate.prototype.validaCampos = function () {  
	exec(
		function(result) { alert( "Metodo : validaCampos - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"CompraInvertirDelegate", 
    	"recuperaDatosOperaExitosa", 
		[]
	); 
}

CompraInvertirDelegate.prototype.accionesCombos = function () {  
	exec(
		function(result) { alert( "Metodo : accionesCombos - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"CompraInvertirDelegate", 
    	"GeneraPDF", 
		[]
	); 
}

CompraInvertirDelegate.prototype.leeDatosConsulta = function () {  
	exec(
		function(result) { alert( "Metodo : leeDatosConsulta - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"CompraInvertirDelegate", 
    	"guardarImgPreviaRecortadC", 
		[]
	); 
}

CompraInvertirDelegate.prototype.accionCambiaConsulta = function () { 
	exec(
		function(result) { alert( "Metodo : accionCambiaConsulta - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"CompraInvertirDelegate", 
    	"guardarImgPreviaC", 
		[]
	); 
}

CompraInvertirDelegate.prototype.accionApareceBarra = function () { 
	exec(
		function(result) { alert( "Metodo : accionApareceBarra - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"CompraInvertirDelegate", 
    	"doNetworkOperation", 
		[]
	); 
}

CompraInvertirDelegate.prototype.leerDatosOperaExitosa = function () {
	exec(
		function(result) { alert( "Metodo : leerDatosOperaExitosa - Plugin : " + result); },
    	function(error) { alert("Error" + error); }, 
		"CompraInvertirDelegate", 
    	"networkResponse", 
		[]
	); 
}

CompraInvertirDelegate.prototype.validaAccionNueva = function () { 
	alert("Metodo : validaAccionNueva"); 
}

CompraInvertirDelegate.prototype.validaAccionCompro = function () {
	alert("Metodo : validaAccionCompro"); 
}

CompraInvertirDelegate.prototype.validaAccionInicio= function () { 
	alert("Metodo : validaAccionInicio"); 
}
*/
               
               
     

/**
 * Guardar pdf del componente
 */
/*
CompraInvertirDelegate.prototype.guardarComponentePDF = function(){
//function guardarComponentePDF(){
               
               
 
    var folioOperacion = parent.document.getElementById('foOpe').innerHTML;
               
    parent.generaComprobantesDelegate.leerImagenComprobante('dialContainer',folioOperacion,void(0),void(0));
    window.setTimeout(function(){
        
        $("#dialog").dialog('close');
        parent.document.getElementById('imgMenu').style.zIndex='0';
                                 
        parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
        parent.document.getElementById("sombraCabecera").style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        },1000);
               
}
   */
               
/*
CompraInvertirDelegate.prototype.comprobante = function (divToExport, portfolio) {
               
               var bbvalogo = "data:image/jpeg;base64,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";
               
               var pdf = new jsPDF('p', 'pt', 'a3');
               
               var frame = parent.document.getElementById('contentFrame');
               var doc = (frame.contentWindow || frame.contentDocument)
               if (doc.document) doc = doc.document;
               var div = doc.getElementById(divToExport);
               
               var fileName = 'Comprobante_' + portfolio + '.pdf';
               var folderName = 'BCOM/' + JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
               var file = folderName + '/' + fileName;
               var elementHandler = {
               '#editor': function (e, r) { return true; }
               }
               
               var options = { pagesplit: true, 'elementHandlers': elementHandler, format: 'PNG' };
               div.style.display = 'block';
               console.log("display = " + div.style.display);
               pdf.addHTML(div, options, function () {
                           saveToDisk(folderName, fileName, pdf.output(), saveImagenComprobanteSuccessCallback, generaComprobanteFailCallback);
                           });
//               pdf.addImage(bbvalogo, 'JPEG', 0, 0, 160, 28);
//               pdf.fromHTML(div, 10, 35, options);
               
//               console.log(pdf);
               
               
               
//               pdf.save(fileName);
               
//               saveToDisk(folderName, fileName, pdf.output(), saveImagenComprobanteSuccessCallback, generaComprobanteFailCallback);
               
               function generaComprobanteFailCallback(){
               console.log("ERROR guardando Comprobante");
               
               div.style.display = 'none';
               console.log("display = " + div.style.display);
               compraInvertirDelegate.muestraAlert("Aviso","Se ha producido un error al generar el comprobante","Aceptar");
               
               }
               
               function saveImagenComprobanteSuccessCallback(){
               div.style.display = 'none';
               console.log("display = " + div.style.display);
               compraInvertirDelegate.muestraAlert("Aviso","Se ha generado correctamente el comprobante.","Aceptar");
               
               }
               
               
               function saveToDisk(folderName, fileName, dataToSave, succesCallback, failCallback){
               var filePath;
               console.log("Inicio saveToDisk folderName "+folderName+" fileName "+fileName+" dataToSave "+dataToSave);
               
               window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                                        console.log('requestFileSystem OK');
                                        fileSystem.root.getDirectory('BCOM', { create: true, exclusive: false });
                                        fileSystem.root.getDirectory( folderName, { create: true, exclusive: false },
                                                                     function ( dirEntry ) {
                                                                     console.log('GetDirectory '+folderName+' OK');
                                                                     folderDir = dirEntry;
                                                                     folderDir.getFile( fileName, { create: true, exclusive: false },
                                                                                       function ( fileEntry ) {
                                                                                       console.log('getFile '+fileName+' OK');
                                                                                       fileDir = fileEntry;
                                                                                       console.log(fileDir);
                                                                                       filePath = fileEntry.fullPath;
                                                                                       console.log(filePath);
                                                                                       fileDir.createWriter(function(writer) {
                                                                                                            writer.onwrite = function(evt) {
                                                                                                            console.log("write success");
                                                                                                            
                                                                                                            if(fileName.indexOf('leido')<0){                                                                 saveImagenComprobanteSuccessCallback();
                                                                                                            }
                                                                                                            };
                                                                                                            
                                                                                                            var buffer = new ArrayBuffer(dataToSave.length);
                                                                                                            var array = new Uint8Array(buffer);
                                                                                                            
                                                                                                            for ( var i = 0; i < dataToSave.length; i++) {
                                                                                                            array[i] = dataToSave.charCodeAt(i);
                                                                                                            }
                                                                                                            writer.write(buffer);
                                                                                                            }, errorHandler);
                                                                                       }, errorHandler );
                                                                     }, errorHandler );
                                        
                                        }, fileSystemFail);
               
               console.log("FIN saveToDisk");
               function fileSystemFail(evt) {
               console.log(evt.target.error.code);
               }
               
               function errorHandler( e ) {
               var msg = '';
               switch ( e.code ) {
               case FileError.ENCODING_ERR:
               msg = 'ENCODING_ERR';
               break;
               case FileError.INVALID_MODIFICATION_ERR:
               msg = 'INVALID_MODIFICATION_ERR';
               break;
               case FileError.INVALID_STATE_ERR:
               msg = 'INVALID_STATE_ERR';
               break;
               case FileError.NO_MODIFICATION_ALLOWED_ERR:
               msg = 'NO_MODIFICATION_ALLOWED_ERR';
               break;
               case FileError.NOT_FOUND_ERR:
               msg = 'NOT_FOUND_ERR';
               break;
               case FileError.NOT_READABLE_ERR:
               msg = 'NOT_READABLE_ERR';
               break;
               case FileError.PATH_EXISTS_ERR:
               msg = 'PATH_EXISTS_ERR';
               break;
               case FileError.QUOTA_EXCEEDED_ERR:
               msg = 'QUOTA_EXCEEDED_ERR';
               break;
               case FileError.SECURITY_ERR:
               msg = 'SECURITY_ERR';
               break;
               case FileError.TYPE_MISMATCH_ERR:
               msg = 'TYPE_MISMATCH_ERR';
               break;
               default:
               msg = 'Unknown Error';
               break;
               };
               
               console.log( 'Error: ' + msg );
               generaComprobanteFailCallback();
               
               
               }
               }
}

 */
               
var compraInvertirDelegate = new CompraInvertirDelegate();
module.exports = compraInvertirDelegate;

// __________ Termina Phongegap __________

});