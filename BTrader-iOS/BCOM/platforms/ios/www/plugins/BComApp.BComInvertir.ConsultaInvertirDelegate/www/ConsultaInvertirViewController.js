cordova.define("BComApp.BComInvertir.ConsultaInvertirDelegate.ConsultaInvertirDelegate", function(require, exports, module) {

// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

function ConsultaInvertirDelegate () {}

var instrumentoCod;
var instrumentoInv;
var importeMinimoIns;
var plazo;
var importe;

var temp;
   
var tasa;
var interes;
var gat;
var gatReal;

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
this.codigoInstrumento = codigoInstrumento;
this.plazo = plazo;
this.importe = importe;
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

               
ConsultaInvertirDelegate.prototype.leerInstrumentoInversion = function () { 

    var instrumentos = [];
    var listaInstrumentos = reglasNegocio.catalogos.compraInversiones.instrumento;
               
    if ((typeof listaInstrumentos.length == 'undefined') && (listaInstrumentos.length == null)) {
               
        if (listaInstrumentos.descripcion.length > 33) {
            listaInstrumentos.descripcion = listaInstrumentos.descripcion.substring(0,33);
        }
               
        instrumentos.push({'descripcion': listaInstrumentos.descripcion,'codigo': listaInstrumentos.codigo, 'importeminimo': listaInstrumentos.importeminimo});
    } else {
        listaInstrumentos = limpiarNulos(listaInstrumentos);
        for(var i = 0; i < listaInstrumentos.length; i++){
            
            if (listaInstrumentos[i].descripcion.length > 33) {
               listaInstrumentos[i].descripcion = listaInstrumentos[i].descripcion.substring(0,33);
            }
            
            instrumentos.push({'descripcion':listaInstrumentos[i].descripcion, 'codigo': listaInstrumentos[i].codigo, 'importeminimo': listaInstrumentos[i].importeminimo});
        }
    }
               
    return instrumentos;
}

ConsultaInvertirDelegate.prototype.cargaListaPlazos = function (){

    var lista = consultaInvertirDelegate.leerPlazos();
               
    var doc = loadIframe();
               
    var listaPlazo = doc.getElementById('lista-plazo');
               
    listaPlazo.parentNode.className = (lista.length < 10)?"":"overflowS";
               
    for (var i in lista) {
               
        var newLi = doc.createElement('li');
        var newDiv = document.createElement('div');
               
        newDiv.className = "lista-plazos-consulta";
        newDiv.setAttribute("onclick", "parent.consultaInvertirDelegate.plazoSelected(this);");
        newDiv.setAttribute("data-value", lista[i].valor);
        newDiv.innerHTML = lista[i].descripcion;
        
        newLi.appendChild(newDiv);
        listaPlazo.appendChild(newLi);
    }
               
    parent.hideLoadingLayer();
}
               
ConsultaInvertirDelegate.prototype.cargaListaInstrumentos = function (){
   
    var lista = consultaInvertirDelegate.leerInstrumentoInversion();
    var doc = loadIframe();
               
    var listaIntrumento = doc.getElementById('lista-instrumento');
               
    for (var i in lista){

        var newLi = doc.createElement('li');
        var newDiv = document.createElement('div');
               
        var codIns = lista[i].codigo;
               
        codIns = codIns.substring(0,2) + "-" + codIns.substring(2,codIns.length);
               
        newDiv.className = "lista-instrumento-consulta";
        newDiv.setAttribute("data-code", codIns);
        newDiv.setAttribute("data-importeminimo", lista[i].importeminimo);
        newDiv.setAttribute("onclick", "parent.consultaInvertirDelegate.instrumentoSelected(this);");
        newDiv.innerHTML = lista[i].descripcion;
               
        newLi.appendChild(newDiv);
               
        listaIntrumento.appendChild(newLi);

    }
               
    listaIntrumento.parentNode.className = (lista.length < 9)?"":"overflowS";
  
}
               
ConsultaInvertirDelegate.prototype.leerPlazos = function () {

    var plazos = [];
               
    var listaPlazos = limpiarNulos(reglasNegocio.catalogos.compraInversiones.instrumento.plazos.dias);
    
    for(var i = 0; i < listaPlazos.length; i++){
        var plazo = listaPlazos[i];
        
        if (plazo == "1") {
            elemento = plazo + " día";
        } else {
            elemento = plazo + " días";
        }
               
        plazos.push({'descripcion': elemento, 'valor': plazo});
    }
               
    return plazos;
}

ConsultaInvertirDelegate.prototype.validaDatosOperacion = function () {
               
    var doc = loadIframe();
    doc.getElementById("importeConsulta").blur();
               
    importe = formatearImporteParaPeticion(doc.getElementById("importeConsulta").value);
               
    if (parseFloat(importe) < parseFloat(importeMinimoIns)) {
        parent.loginDelegate.showAlert("Aviso\n", "El importe m\xednimo para un pagare con rendimiento liquidable al vencimiento es de $2000.00", "Aceptar");
    } else {
               
        showLoadingLayer();
        
        var datosAplicativos =
                              {
                                acceso: JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr.toString(),
                                usuario: sessionStorage.username,
                                codigoInstrumento: instrumentoCod,
                                plazo: plazo,
                                importe: importe
                              };
        
        var peticion = {
                        operacion: "imd_consulta_tasas_gat_op",
                        proceso: "imd_consulta_tasas_gat_pr",
                        accion: "consulta",
                        datosAplicativos: datosAplicativos
                       };
               
        consultaInvertirDelegate.leeDatosConsulta(peticion);
    }
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
    console.log('respuesta tasas', jsonResponse);
               
    tasa = response.respuesta.tasa;
    interes = response.respuesta.interes;
    gat = response.respuesta.gat;
    gatReal=response.respuesta.gatReal;
               
    console.log("tasa = " + tasa + " | interes = " + interes + " | gat = " + gat + " | gatReal = " + gatReal);
    
    consultaInvertirDelegate.cargaDatosRespuesta();
               
}

ConsultaInvertirDelegate.prototype.returnError = function (errorMessage) {
               
    console.log("errorMessage en returnError :",errorMessage);
    hideLoadingLayer();
    consultaInvertirDelegate.habilitarCampos();
    //parent.compraInvertirDelegate.muestraAlert("Aviso\n", JSON.parse(errorMessage), "Aceptar");
    //parent.compraInvertirDelegate.muestraAlert("Aviso\n", "Error a pesar de success", "Aceptar");
}

               
ConsultaInvertirDelegate.prototype.instrumentoSelected = function (nodoHtml) {
               
    var doc = loadIframe();
               
    var listaInstrumentos = doc.getElementsByClassName('lista-instrumento-consulta');
               
    $.each(listaInstrumentos, function (key,value) {
           
           $('.div-selectedAccount-consulta', this).remove();
           
    });
    
    if ((typeof plazo != "undefined") && (plazo != null) && (plazo != "")) {
        consultaInvertirDelegate.resetPlazos();
        consultaInvertirDelegate.resetDatosOperacion();
    }
               
    var newDiv = doc.createElement("div");
    newDiv.className = "div-selectedAccount-consulta";
    nodoHtml.appendChild(newDiv);
               
    instrumentoCod = nodoHtml.dataset.code;
    importeMinimoIns = nodoHtml.dataset.importeminimo;
               
    doc.getElementById("transferir-desactivar-miscuentas-cuentas-destino").style.display = "none";
}
               
ConsultaInvertirDelegate.prototype.plazoSelected = function (nodoHtml) {

    var doc = loadIframe();
               
    var listaPlazos = doc.getElementsByClassName('lista-plazos-consulta');
               
    $.each(listaPlazos, function (key,value) {
                      
           $('.div-selectedAccount-consulta', this).remove();

    });
               
    var newDiv = doc.createElement("div");
    newDiv.className = "div-selectedAccount-consulta";
    nodoHtml.appendChild(newDiv);
    
    if ((doc.getElementById("resultados-simulacion").style.display == "block") && (doc.getElementById("importeConsulta").value != "$0.00")){
               
            consultaInvertirDelegate.resetResultadosOperacion();
            consultaInvertirDelegate.resetDatosOperacion();
    }
    
    plazo = nodoHtml.dataset.value;
               
    doc.getElementById("transferir-desactivar-miscuentas-datos-operacion").style.display = "none";
}
               
ConsultaInvertirDelegate.prototype.cargaDatosRespuesta = function () {

    var doc = loadIframe();
    
    var imp = doc.getElementById("importeConsulta").value;
               
    if (imp.length > 15) {
        consultaInvertirDelegate.recalcularAnchoLblImporte(imp.length);
    }
               
      /* if (gatReal.indexOf("- ")!=-1){
            doc.getElementById("txtGATRConsulta").style.paddingLeft="10px";
        }*/
       doc.getElementById("txtGATRConsulta").style.marginBottom="-4px";
               
               
    doc.getElementById("txtImporteConsulta").innerHTML = imp;
    doc.getElementById("txtTBAConsulta").innerHTML = tasa + " %";
    doc.getElementById("txtINVConsulta").innerHTML = interes;
    doc.getElementById("txtGATRConsulta").innerHTML = gatReal;
    doc.getElementById("txtGATNConsulta").innerHTML = gat + " %";
    
    doc.getElementById("transferir-miscuentas-operacion-importe").style.display = "none";
    doc.getElementById("transferir-miscuentas-operacion-leyenda-confirmar").style.display = "none";
    doc.getElementById("transferir-miscuentas-boton-continuar").style.display = "none";
//    doc.getElementById("importeConsulta").blur();
               
    hideLoadingLayer();
    doc.getElementById("resultados-simulacion").style.display = "block";
}
               
ConsultaInvertirDelegate.prototype.resetPlazos = function () {
   
    plazo = null;
               
    var doc = loadIframe();
   
    var listaPlazos = doc.getElementsByClassName('lista-plazos-consulta');
   
    $.each(listaPlazos, function (key,value) {
          
            if (value.className.indexOf('selectedAccount') != -1) {
              value.className = value.className.replace(' selectedAccount', '');
            }
          
          });
           
}
               
ConsultaInvertirDelegate.prototype.resetDatosOperacion = function () {

    var doc = loadIframe();
               
    doc.getElementById("importeConsulta").value = "$0.00";
    doc.getElementById("importeConsulta").blur();
               
    if (doc.getElementById("resultados-simulacion").style.display == "block") {
        doc.getElementById("transferir-miscuentas-operacion-importe").style.display = "block";
        doc.getElementById("transferir-miscuentas-operacion-leyenda-confirmar").style.display = "block";
        doc.getElementById("transferir-miscuentas-boton-continuar").style.display = "block";
        doc.getElementById("resultados-simulacion").style.display = "none";
        consultaInvertirDelegate.resetResultadosOperacion();
    }
               
    doc.getElementById("transferir-desactivar-miscuentas-datos-operacion").style.display = "block";
}
               
ConsultaInvertirDelegate.prototype.resetResultadosOperacion = function () {
               
    tasa = null;
    interes = null;
    gat = null;
    gatReal = null;
               
    var doc = loadIframe();
               
    doc.getElementById("lblImporteConsulta").style.width = "46%";
    doc.getElementById("txtImporteConsulta").innerHTML = "";
    doc.getElementById("txtTBAConsulta").innerHTML = "";
    doc.getElementById("txtINVConsulta").innerHTML = "";
    doc.getElementById("txtGATRConsulta").innerHTML = "";
    doc.getElementById("txtGATNConsulta").innerHTML = "";
               
}
 
ConsultaInvertirDelegate.prototype.recalcularAnchoLblImporte = function (longitudImporte) {

    var doc = loadIframe();
               
    var factor = (longitudImporte - 15) + 1;
    
    var width;
               
    if (longitudImporte < 19) {
        width = 46 - (2*factor);
    } else {
        width = 46 - (2.55*factor);
    }
               
    doc.getElementById("lblImporteConsulta").style.width = width + "%";
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