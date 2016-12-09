cordova.define("BComApp.BComInvertir.ConsultaInvertirDelegate.ConsultaInvertirDelegate", function(require, exports, module) {

// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

function ConsultaInvertirDelegate () {}

var instrumentoCod;
var instrumentoInv;
var plazo;
var importe;
   
var temp;
   
var tasa;
var interes;
var gat;

var saldosChartData = [];
var pla;

var reglasNegocio;

/* Lee del objeto sessionStorage y parsea a JSON */
if ((typeof sessionStorage.jsonReglasNegocio != "undefined") && (sessionStorage.jsonReglasNegocio != null) && (sessionStorage.jsonReglasNegocio.length > 0)) {
    reglasNegocio = JSON.parse(sessionStorage.jsonReglasNegocio);
}
               
function temporal(codigoInstrumento, instrumento, plazo, importe){
   this.codigoInstrumento = codigoInstrumento;
   this.instrumento = instrumento;
   this.plazo = plazo;
   this.importe = importe;
}
               
function DatosAplicativos (usuario, acceso, codigoInstrumento, plazo, importe) {
this.usuario = usuario;
this.acceso = acceso;
this.codigoInstrumento = "03-00";
this.plazo = plazo;
this.importe = desformatearImporte(importe);
}

function validate(val) {
if (typeof val != "undefined") {
return val;
} else {
return null;
}
}

function Peticion (proceso, operacion, accion, datosAplic) {
this.proceso = proceso;
this.operacion = operacion;
this.accion = accion;
this.datosAplicativos = datosAplic;
}

//genera los datos a mostrar en la grafica
ConsultaInvertirDelegate.prototype.generaDatosGrafica = function (plazo, importe, tasa){

saldosChartData = [];

var n = 0;
var m = 0;
var aux = plazo.split(" ");
pla = parseInt(aux[0]);

n = ((tasa * parseFloat(importe))/365)*pla;
m = parseFloat(n * 2);
//saldosChartData.push([0,m]);

for(i=1; i<=pla; i++){
m = parseFloat(m * 2) + parseFloat(importe);
saldosChartData.push([i,m]);
}	
}

ConsultaInvertirDelegate.prototype.validaImporte = function (e, importe) {
               
               key = e.keyCode ? e.keyCode : e.which;
               if (key == 8) return true;
               
               //Valida valores a partir del '.' decimal
               if (importe.value != "") {
                   //si el input tiene '.' valida que solo tenga 2 dígitos
                   if ((importe.value.indexOf(".")) > 0) {
                       if (key > 47 && key < 58) {
                           if (importe.value == "") return true;
                           regexp = /[0-9]{2}$/;
                           return !(regexp.test(importe.value))
                       }
                   }
               }
               //Valida los dígitos antes del '.' decimal
               if (key > 47 && key < 58) {
                   if (importe.value == "") return true;
                   regexp = /[0-9]{18}/;
                   return !(regexp.test(importe.value));
               }
               
               if (key == 46) {
                   if (importe.value == "") return false;
                   regexp = /^[0-9]+$/;
                   return regexp.test(importe.value);
               }
               
               return false;
}
               
ConsultaInvertirDelegate.prototype.leerInstrumentoInversion = function () { 

               var instrumentos = [];
               var listaInstrumentos = reglasNegocio.catalogos.compraInversiones.instrumento;
               
               if ((typeof listaInstrumentos.length == 'undefined') && (listaInstrumentos.length == null)) {
               instrumentos.push(listaInstrumentos.descripcion);
               } else {
               for(var i = 0; i < listaInstrumentos.length; i++){
               instrumentos.push(listaInstrumentos[i].descripcion);
               }
               }
               
               return instrumentos;
}

ConsultaInvertirDelegate.prototype.cargaComboPlazos = function (){
var lista = consultaInvertirDelegate.leerPlazos();
               var frame = parent.document.getElementById('contentFrame');
               var doc = (frame.contentWindow || frame.contentDocument);
               if (doc.document) doc = doc.document;
               var comboPlazo = doc.getElementById('plazo');
               comboPlazo[0] = new Option("Selecciona","-1");
               for (index = 0; index < lista.length; index++){
               comboPlazo[index+1] = new Option(lista[index], lista[index].substring(0, lista[index].indexOf(" ")));
}
}
               
ConsultaInvertirDelegate.prototype.cargaComboInstrumentos = function (){
var lista = consultaInvertirDelegate.leerInstrumentoInversion();
var frame = parent.document.getElementById('contentFrame');
var doc = (frame.contentWindow || frame.contentDocument);
               if (doc.document) doc = doc.document;
               var comboIntrumento = doc.getElementById('instrumento');
               comboIntrumento[0] = new Option("Selecciona", "-1");
for (index = 0; index < lista.length; index++){
               comboIntrumento[index+1] = new Option(lista[index]);
}
}
               
ConsultaInvertirDelegate.prototype.leerPlazos = function () {

               var plazos = [];
               
               var listaPlazos = reglasNegocio.catalogos.compraInversiones.instrumento.plazos.dias;
               for(var i = 0; i < listaPlazos.length; i++){
               var plazo = listaPlazos[i];
               
               if(plazo == "1"){
               elemento = plazo + " d\xeda";
               }else{
               elemento = plazo + " d\xedas";
               }
               
               plazos.push(elemento);
               }
               
               return plazos;
}

ConsultaInvertirDelegate.prototype.validaCampos = function () {

               var frame = parent.document.getElementById('contentFrame');
               var doc = (frame.contentWindow || frame.contentDocument);
               if (doc.document) doc = doc.document;

               salida = true;
               
               instrumentoInv = escape(doc.getElementById("instrumento").value);
               plazo = escape(doc.getElementById("plazo").value);
               importe = formatearImporteParaPeticion(doc.getElementById("importeConsulta").value);
               
               
               if (instrumentoInv==='-1' || plazo==='-1' || importe=='0.00'){
               salida = false;
               }
               return salida;
}

ConsultaInvertirDelegate.prototype.deshabilitarCampos = function () {
               var frame = parent.document.getElementById('contentFrame');
               var doc = (frame.contentWindow || frame.contentDocument);
               if (doc.document) doc = doc.document;
               
               
               var inst= doc.getElementById("instrumento");
               inst.disabled=true;
               
               inst.style.color='rgb(204,204,204)';
               
               
               var plazo= doc.getElementById("plazo");
               plazo.disabled=true;
               plazo.style.color='rgb(204,204,204)';

               
               
               
               
               
       doc.getElementById('importeConsulta').disabled = true;
       doc.getElementById('confirmar').disabled = true;
}
               
ConsultaInvertirDelegate.prototype.habilitarCampos = function () {
               var frame = parent.document.getElementById('contentFrame');
               var doc = (frame.contentWindow || frame.contentDocument);
               if (doc.document) doc = doc.document;
               
               var inst= doc.getElementById("instrumento");
               
               inst.disabled = false;
               inst.style.color='rgb(26,26,26)';
      
               
               var plazo= doc.getElementById("plazo");
               plazo.disabled = false;
               plazo.style.color='rgb(26,26,26)';
               
               
       doc.getElementById('importeConsulta').disabled = false;
       doc.getElementById('confirmar').disabled = false;
               
               
               
}

ConsultaInvertirDelegate.prototype.cargaInversiones = function (plazo, importe, tasa, interes) {
               consultaInvertirDelegate.generaDatosGrafica(plazo, importe, tasa);
               
               var frame = parent.document.getElementById('contentFrame');
               var doc = (frame.contentWindow || frame.contentDocument);
               if (doc.document) doc = doc.document;
               var target = doc.getElementById('consultaInversiones');
               var gWidth, gHeight;
               
               var currentWidth = (0 != window.innerWidth) ? window.innerWidth : window.parent.window.innerWidth;
               var currentImgFolder = '1024x600';
               var markerUrl = "";
               if (isIOS()) {
            	   gWidth = 400;
            	   gHeight = 400;
               if (1024 == currentWidth) {
               currentImgFolder = 'normal';
               } else {
               currentImgFolder = 'retina';
               }
               
               markerUrl = 'img/' + currentImgFolder + '/Ios_Btn_Grafica.png';
               } else {
               
               if (1024 == currentWidth) {
            	   currentImgFolder = '1024x600';
            	   gWidth = 400;
            	   gHeight = 400;
               } else if (1280 == currentWidth) {
            	   currentImgFolder = '1280x800';
            	   gWidth = 550;
            	   gHeight = 600;
               } else if (1920 == currentWidth) {
            	   currentImgFolder = '1920x1200';
            	   gWidth = 800;
            	   gHeight = 800;
               }
               markerUrl = 'img/' + currentImgFolder + '/An_Btn_Grafica.png';
               }
               
               Highcharts.setOptions({
                                     lang: {
                                     numericSymbols: null
                                     }
                                     });
               
               var saldosPlot = new Highcharts.Chart({
                                                     chart: {
                                                     renderTo: target,
                                                     type: 'line',
                                                     width: gWidth,
                                                     height: 400,
                                                     },
                                                     title: {
                                                     text: ''
                                                     },
                                                     subtitle: {
                                                     text: ''
                                                     },
                                                     xAxis: {
                                                     tickInterval: 1
                                                     },
                                                     yAxis: {
                                                     min: 0,
                                                     gridLineDashStyle: 'shortdot',
                                                     gridLineColor: '#dde1e8',
                                                     title: {
                                                     text: ''
                                                     }
                                                     },
                                                     legend: {
                                                     enabled: false,
                                                     },
                                                     
                                                     series: [{
                                                              name: 'plazo',
                                                              data: saldosChartData,
                                                              color: '#006ec4',
                                                              marker: {
                                                              symbol: 'url(' + markerUrl + ')'
                                                              }
                                                              }],
                                                     tooltip: {
                                                     shared: false,
                                                     useHTML: true,
                                                     valueDecimals: 2,
                                                     borderRadius: 10,
                                                     borderWidth: 2,
                                                     borderColor: null,
                                                     formatter: function () {
                                                     return ('<div class="saldosCartTooltipTitle" style="color:' + this.series.color + ';">' + misCuentasViewController.formatForCurrency(this.y, false, $) + '</div>' +
                                                             '<div class="saldosCartTooltipValue">' + this.x + ' ' + this.series.name + '</div>');
                                                     }
                                                     },
                                                     exporting: {
                                                     enabled: false
                                                     },
                                                     credits: {
                                                     enabled: false
                                                     }
                                                     });
               
}
               
ConsultaInvertirDelegate.prototype.guardaDatos = function () {
            var listaInst = reglasNegocio.catalogos.compraInversiones.instrumento;
            var longitud, descripcion, valor;
            
            if ((typeof listaInst.length == 'undefined') || (listaInst.length == 'null')) {
               instrumentoCod = listaInst.codigo;
            } else {
               for(var i = 0; i < listaInst.length; i++){
                   var valor = listaInst[i];
               
                   var descripcion = valor.descripcion.replace(" ", "");
                   if(descripcion === instrumentoInv.replace("%20","")){
                       instrumentoCod = valor.codigo;
                   }
               }
            }
               
            temp = new temporal(instrumentoCod, instrumentoInv, plazo, importe);
}

ConsultaInvertirDelegate.prototype.leeDatosConsulta = function (peticion) {
    exec(function (jsonResponse) { consultaInvertirDelegate.returnResponse(jsonResponse); },
         function (errorMessage) { consultaInvertirDelegate.returnError(errorMessage); },
         "ConsultaInvertirDelegate",
         "recuperaTasas",
         [peticion]
	); 
}

ConsultaInvertirDelegate.prototype.returnResponse = function (jsonResponse) {
    var response = JSON.parse(jsonResponse);
               console.log(jsonResponse);
               tasa = response.respuesta.tasa;
               interes = response.respuesta.interes;
               gat = response.respuesta.gat;
               gatReal = response.respuesta.gatReal;
    console.log("tasa = " + tasa);
    console.log("interes = " + interes);
    console.log("gat = " + gat);
    var url = 'invertirConsultarTermino.html?instrumentoCod='+instrumentoCod+'&instrumentoInv='+instrumentoInv+'&plazo='+plazo+'&importe='+importe+'&tasa='+tasa+'&interes='+interes+'&gat='+gat+'&gatReal='+gatReal;               parent.document.getElementById('contentFrame').src = url;
}

ConsultaInvertirDelegate.prototype.returnError = function (errorMessage) {
	console.log("Error en consulta: " + errorMessage);
	consultaInvetirDelegate.habilitarCampos();
}

ConsultaInvertirDelegate.prototype.accionApareceGrafica = function (plazo, importe, tasa, interes) {
//	alert("Metodo : accionApareceGrafica");
               
               var frame = parent.document.getElementById('contentFrame');
               var doc = (frame.contentWindow || frame.contentDocument);
               if (doc.document) doc = doc.document;
               var target = doc.getElementById('consultaInversiones');
               target.style.display = 'block';
               
               consultaInvertirDelegate.cargaInversiones(plazo, importe, tasa, interes);
               
}
               
ConsultaInvertirDelegate.prototype.generaGrafica = function () {
//	alert("Metodo : accionApareceGrafica");
               
               consultaInvertirDelegate.deshabilitarCampos();  //desahibilita combos, textbox y boton
               
               if(consultaInvertirDelegate.validaCampos()){
               
               //guarda los datos en Temporal
               consultaInvertirDelegate.guardaDatos();
               
               var acceso = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr.toString();
               
               var datosAplic = new DatosAplicativos(sessionStorage.username,acceso,instrumentoCod,plazo,importe);
               var peticion = new Peticion ("imd_consulta_tasas_gat_pr","imd_consulta_tasas_gat_op","consulta",datosAplic);
               
               var frame = parent.document.getElementById('contentFrame');
               var doc = (frame.contentWindow || frame.contentDocument);
               if (doc.document) doc = doc.document;
               
               //leemos los datos obtenidos del JSON
               consultaInvertirDelegate.leeDatosConsulta(peticion);
               
               }else{
               parent.loginDelegate.showAlert("Aviso","La información ingresada es incorrecta","Aceptar");
               consultaInvertirDelegate.habilitarCampos();
               }
}
               
ConsultaInvertirDelegate.prototype.confirmaIC = function () {
   
   consultaInvertirDelegate.generaGrafica();
}

ConsultaInvertirDelegate.prototype.validaAccion2Grafica = function () { 
	alert("Metodo : validaAccion2Grafica"); 
}

ConsultaInvertirDelegate.prototype.accionGrafica = function () { 
	alert("Metodo : accionGrafica"); 
}

ConsultaInvertirDelegate.prototype.validaAccionNueva = function () { 
	alert("validaAccionNueva"); 
}

ConsultaInvertirDelegate.prototype.comprobante = function () {
	$('body', window.parent.document).append("<div id='comprobanteFrame' onclick='$(\"#comprobanteFrame\").remove();'><div id='imagenComprobante'></div></div>" );
}

var consultaInvertirDelegate = new ConsultaInvertirDelegate();
module.exports = consultaInvertirDelegate;

// __________ Termina Phongegap __________

});

function convierteImporte(importe){
    
    if(importe.length > 0){
        if(importe.substring(0,1)!='$'){
            formatoMoneda(importe);
            valorConvertido = importeInv;
        }else{
            valorConvertido = document.getElementById('importe').value;
        }
    }else{
        valorConvertido = '$ 0.00';
    }
    
    return valorConvertido;
}


function formatoMoneda(cantidad) {
    var resp = "$0.00";
    
    var parcial = "";
    var contador_aux = 0;
    
    if( existePunto(cantidad, ".") ){
        var aux_1 = cantidad.split(".");
        
        for(i = aux_1[0].length - 1; i >= 0 ; i--){
            if(contador_aux == 3 ){
                parcial += ",";
                contador_aux = 0;
            }
            
            contador_aux ++;
            parcial += ( aux_1[0].charAt(i) );
        }
        
        parcial = getOrden(parcial);
        parcial = parcial + "." + aux_1[1];
        
        resp = "$ " + parcial;
    }else{
        for(i = cantidad.length - 1; i >= 0 ; i--){
            if(contador_aux == 3 ){
                parcial += ",";
                contador_aux = 0;
            }
            
            contador_aux ++;
            parcial += ( cantidad.charAt(i) );
        }
        
        parcial = getOrden(parcial);
        parcial = parcial + ".00";
        
        resp = "$ " + parcial;
    }
    
    importeInv = resp;
}

function getOrden(cadena){
    var res = "";
    
    for(i = 0; i < cadena.length; i++){
        res += cadena.charAt( ( cadena.length -1 ) - i );
    }
    
    return res;
}


function existePunto(cantidad, caracter){
    var existe = false;
    for (i = 0; i < cantidad.length; i++) {
        if (cantidad.charAt(i) == caracter) {
            existe = true;
        }
    }
    return existe;
}