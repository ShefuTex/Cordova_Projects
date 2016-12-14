
banderaDrap   = false;
comprobanteID = null;
function alertDismissed() {
    // hacer algo
}


function mostrarError(mensaje){
	navigator.notification.alert(
                                 mensaje,     // mensaje (message)
                                 alertDismissed,         // funciÛn 'callback' (alertCallback)
                                 "ERROR",            // titulo (title)
                                 'Cerrar'                // nombre del botÛn (buttonName)
                                 );
}

//function startDragAndDrop(){
//	console.log("Todos los items añadidos");
//    var c=document.getElementById("CComprobantesGuadados").childNodes;
//    console.log("startDragAndDrop comprobantes length "+c.length);
//    $("#CComprobantesGuadados").moverComprobantes();
//    $(".comprobante").draggable({ revert: true, helper: "clone" });
//}

function loadCarrusel () {
    console.log("Cargando carrusel");
    var container = $(".swiper-container");
    var carrusel = new Swiper('.swiper-container', {
                              slidesPerView: 5,
                              effect: 'coverflow',
                              centeredSlides: true,
                              watchActiveIndex: true,
                              grabCursor: true,
                              coverflow: {
                              rotate: 10,
                              stretch: 0,
                              depth: 40,
                              modifier: 1,
                              slideShadows: false
                              },
                              onClick: function (swiper, e) {
                              var html = swiper.clickedSlide.children[0];
                              var backgroundImage = html.style.backgroundImage;
                              parent.document.getElementById("sombraCabecera").style.backgroundColor = "rgba(3,3,3,0.6)";
                              parent.document.getElementById("sombraCabecera").style.visibility = "visible";
                              parent.document.getElementById("sombraFooter").style.backgroundColor = "rgba(3,3,3,0.6)";
                              parent.document.getElementById("sombraFooter").style.visibility = "visible";
                              
                              $("#dialContainer").css({
                                                      "background-size": "100% 100%",
                                                      "background-repeat": "no-repeat",
                                                      "width" : "auto",
                                                      "background-image": backgroundImage
                                                      });
                              
                              $("#dialog").dialog("open");
                              }
                              
                              });
}

function imageExists (image_url){
    var result = false;
    console.log("imageExists image_url "+image_url);
    var http = new XMLHttpRequest();
    
    http.open('HEAD', image_url, false);
    http.send();
    
    console.log("imageExists http.status "+http.status);
    
    result =  (http.status != '404');
    
    console.log("imageExists Result "+result);
    
    return result;
}

function getFilesize(imageUri){
    console.log("getFilesize imageUri "+imageUri);
    window.resolveLocalFileSystemURI(imageUri,
                                     function(fileEntry) {
                                     console.log("getFilesize fileEntry "+fileEntry);
                                     fileEntry.file(function(fileObj) {
                                                    console	.log("Size = " + fileObj.size);
                                                    return fileObj.size;
                                                    });
                                     }
                                     );
    
}

function addComprobante(path, comprobante, portfolio, index){
    
    console.log("addComprobante inicio comprobante "+comprobante+" index "+index+" path "+path);
    
	var contenedor = document.getElementById("CComprobantesGuadados")
    var folderName = "BCOM/"+JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
   	var pathImagenPrincipal = path + comprobante;
    console.log("addComprobante pathImagenPrincipal "+pathImagenPrincipal);
    
    if ((imageExists(pathImagenPrincipal) == true) && (pathImagenPrincipal.indexOf('.png') > 0) && (index < 20)){
        
        console.log("addComprobante pathImagenPrincipal "+pathImagenPrincipal+" length "+getFilesize(pathImagenPrincipal));
        
        var padre = document.createElement('div');
        padre.className = "swiper-slide";
        
        var com = document.createElement('div');
        com.id = "capa" + index;
        com.className = "slide-comprobante";
        com.style.backgroundImage = "url('"+pathImagenPrincipal+"')";
        
        padre.appendChild(com);
        
        var reflection = document.createElement('div');
        reflection.className = "reflection";
        
        padre.appendChild(reflection);
        
        contenedor.appendChild(padre);
        
    }
}

function mostrarComprobantes() {
    console.log('Init:');
    //Cargamos los componentes guardados.
    
    
    var pictures = parent.guardadoComprobantesDelegate.leerComprobantesGua(addComprobante,loadCarrusel);
    
}

function buscarComprobanteInfo(portfolio, success, fail) {
    var folderName = "BCOM/"+JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
    
    var fechaOperacion = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.fechaservidor;
    fechaOperacion = replaceAll(fechaOperacion,'/','');
    var horaOperacion = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.horaservidor;
    horaOperacion = replaceAll(horaOperacion,':','');
    
    var jsonName = "comprobante_"+replaceAll(descripcionOperacion, ' ','')+"imd_consulta_comprobante_op"+fechaOperacion+horaOperacion+".png";
    var dfd = new $.Deferred();
    
    console.log('Buscando info comprobante almacenado localstorage');
    readFile(folderName, jsonName, function(textJson){
             if (textJson.length > 0){
             console.log("Encontrado "+textJson);
             success(JSON.parse(textJson));
             } else {
             console.log("NO Encontrado "+jsonName);
             }
             
             });
    
}

function compartir() {
   	if ($('.sub-min2').css('display') == 'none') { $('.sub-min2').css('display', '');  }
   	else { $('.sub-min2').css('display', 'none'); }
}

window.history.back= function() {
    window.history.go(-1);
}

/****************************************************************************************/
/**************************************** FASE 2 ****************************************/
/****************************************************************************************/

// Constantes
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Variables
var listaComprobantes = [];
var comprobantes = [];
var comprobante = [];
var periodos = [];
var comprobantesFiltrados = [];
var periodoSelecionado;
var fullPath;
var urlComprobante;

// Funciones
function cargarComprobantes() {
    console.log("Cargando periodos ...");
    
    
    var folderName = "BCOM/";

    parent.guardadoComprobantesDelegate.getFullPath(fullPathSuccess,fullPathError);
    
    parent.guardadoComprobantesDelegate.recuperaComprobantesGua(folderName, cargaListadoComprobantes, errorRecuperaComprobantesGua);
}


function fullPathSuccess(fullpathRecuperado){
    console.log(fullpathRecuperado);
    fullPath=fullpathRecuperado;
}

function fullPathError(fullpatherror){
    console.log(fullpatherror);
}

function cargaListadoComprobantes (responseComprobantes) {

    parent.hideLoadingLayer();

    for (var i in responseComprobantes) {
        
        //if ((responseComprobantes[i]!=".DS_Store")){

        if ((responseComprobantes[i]!=".DS_Store")&&(responseComprobantes[i]!="Invitados")){
        
        console.log('responseComprobantes[i]', responseComprobantes[i]);
        
        var nombre = responseComprobantes[i].split(".")[0];
        var extension = responseComprobantes[i].split(".")[1];
        
        var fechaOperacion = formatFechaCG(nombre.split("_")[0]);
        var horaOperacion = formatHoraCG(nombre.split("_")[1]);
        var folio = nombre.split("_")[2];
        var tipoOperacion = nombre.split("_")[3];
        
        comprobantes.push({
                          'nombre': nombre,
                          'extension': extension,
                          'fechaOperacion': fechaOperacion,
                          'folio': folio,
                          'horaOperacion': horaOperacion,
                          'tipoOperacion': tipoOperacion
                          });
        }
    }
    
    console.log('comprobantes', comprobantes);
    
    crearListadoPeriodos();
}

function errorRecuperaComprobantesGua (mensaje) {
    parent.hideLoadingLayer();
    $("#noComprobantesGuardados").show();
    console.log("ERROR AL RECUPERAR LISTADO DE FICHEROS");
}

function crearListadoPeriodos () {
    
    crearPeriodos();
    
    var listaPeriodos = document.getElementById("lista-periodos-comprobantes");
    
    for (var i in periodos) {
        
        var newLi = document.createElement('li');
        var newDiv = document.createElement('div');
        
        newDiv.setAttribute("data-mes", periodos[i].numeroMes);
        newDiv.setAttribute("data-anio", periodos[i].anio);
        newDiv.setAttribute("onclick", "periodoSelected(" + i + ", this);");
        newDiv.className = "lista-plazos-consulta";
        newDiv.innerHTML = periodos[i].mes + " " + periodos[i].anio;
        
        newLi.appendChild(newDiv);
        listaPeriodos.appendChild(newLi);
        
    }
    
    periodoSelecionado = null;
    
    listaPeriodos.parentNode.className = (periodos.length < 7)?"":"overflowS";
    
}

function crearPeriodos () {
    
    for (var i = comprobantes.length-1; i >= 0; i--) {
        var fecha = comprobantes[i].fechaOperacion;
        
        var anio = parseInt(fecha.split("/")[2]);
        var mes = meses[parseInt(fecha.split("/")[1]) - 1];
        
        var existePeriodo = false;
        
        if ((typeof periodos != "undefined") && (periodos != null) && (periodos.length > 0)) {
            for (var j in periodos) {
                if ((periodos[j].mes == mes) && (periodos[j].anio == anio)) {
                    existePeriodo = true;
                }
            }
        }
        
        if (!existePeriodo) {
            periodos.push({'numeroMes': fecha.split("/")[1], 'mes': mes, 'anio': anio});
        }
    }
    
    console.log('periodos', periodos);
    
}

function periodoSelected (index, nodoHtml) {
    var mesSelecionado = nodoHtml.dataset.mes;
    var anioSelecionado = nodoHtml.dataset.anio;
    comprobantesFiltrados = [];
    periodoSelecionado = periodos[index];
    
    $("#lista-periodos-comprobantes .lista-plazos-consulta").each(function () {
                                                                  $(this).removeClass('selectedAccount');
                                                                  $('.div-selectedAccount', this).remove();
                                                                  });
    
    var newDiv = document.createElement("div");
    newDiv.className = "div-selectedAccount";
    
    nodoHtml.appendChild(newDiv);
    nodoHtml.className += " selectedAccount";
    
    
    for (var i in comprobantes) {
        
        var anioComprobante = comprobantes[i].fechaOperacion.split("/")[2];
        var mesComprobante = comprobantes[i].fechaOperacion.split("/")[1];
        
        if ((mesSelecionado == mesComprobante) && (anioSelecionado == anioComprobante) && (comprobantes[i].extension == "pdf")) {
            comprobantesFiltrados.push(comprobantes[i]);
        }
    }
    
    if ((typeof comprobante != "undefined") && (comprobante != null) && (comprobante != "")) {
        urlComprobante = null;
        resetPreview();
    }
    
    listarComprobantes(comprobantesFiltrados);
}

function listarComprobantes (comprobantesFiltrados) {
    var ulComprobantes = document.getElementById("lista-comprobantes");

    ulComprobantes.innerHTML = "";
    
    for (var i = comprobantesFiltrados.length-1; i >= 0; i--) {
        
        var newLi = document.createElement("li");
        var newDiv = document.createElement("div");
        
        newDiv.setAttribute("data-nombre", comprobantesFiltrados[i].nombre);
        newDiv.setAttribute("data-tipoOp", comprobantesFiltrados[i].tipoOperacion);
        newDiv.setAttribute("onclick", "comprobanteSelected(" + i + ", this);");
        newDiv.setAttribute("class", "lista-plazos-consulta");
        
        var spanOp = document.createElement("span");
        var spanFe = document.createElement("span");
        var spanFo = document.createElement("span");
        
        spanOp.innerHTML = getTipoOperacion(comprobantesFiltrados[i].tipoOperacion);
        spanFe.innerHTML = comprobantesFiltrados[i].fechaOperacion.substring(0,5);
        spanFo.innerHTML = comprobantesFiltrados[i].folio;
        
        newDiv.appendChild(spanOp);
        newDiv.appendChild(spanFe);
        newDiv.appendChild(spanFo);
        
        newLi.appendChild(newDiv);
        
        ulComprobantes.appendChild(newLi);
    }
    
    ulComprobantes.parentNode.className = (comprobantesFiltrados.length < 7)?"":"overflowS";
    
    comprobante = null;
    
    $("#transferir-desactivar-miscuentas-cuentas-destino").hide();
    
}

function comprobanteSelected (index, nodoHtml) {
    
    comprobante = comprobantesFiltrados[index];
    
    $("#lista-comprobantes .lista-plazos-consulta").each(function () {
                                                         $(this).removeClass("selectedAccount");
                                                         $('.div-selectedAccount', this).remove();
                                                         });
    
    var newDiv = document.createElement("div");
    newDiv.className = "div-selectedAccount";
    
    nodoHtml.appendChild(newDiv);
    nodoHtml.className += " selectedAccount";
    
    console.log('comprobante seleccionado', comprobante);
    
    if ($("#transferir-desactivar-miscuentas-datos-operacion").css("display") == "none") {
        resetPreview();
    }
    
//    loadPreview();

}

function loadPreview () {
    
    urlComprobante = null;
    
    if ((typeof periodoSelecionado == "undefined") || (periodoSelecionado == null) || (periodoSelecionado == "")) {
        parent.loginDelegate.showAlert("Aviso\n", "Favor de seleccionar un periodo espec\xedfico", "Aceptar");
    } else if ((typeof comprobante == "undefined") || (comprobante == null) || (comprobante == "")) {
        parent.loginDelegate.showAlert("Aviso\n", "Favor de seleccionar un movimiento almacenado", "Aceptar");
    } else {
        
        urlComprobante = "file://"+ fullPath + "/" + comprobante.nombre + ".png";
        
        console.log("url comprobante: " + urlComprobante);
        
        document.getElementById("boton-expandir").style.visibility = "visible";
        
        var compPreview= document.getElementById("comprobante-preview");
        compPreview.style.backgroundImage="url('"+urlComprobante+"')";
        compPreview.style.visibility = "visible";
        
        $("#transferir-desactivar-miscuentas-datos-operacion").hide();

    }
    
}

function ampliarComprobante() {
    
    if ((typeof urlComprobante != "undefined") && (urlComprobante != null) && (urlComprobante != "")) {
        
        parent.hideLoadingLayer();
        
        if (comprobante.tipoOperacion != "EDOCUENTA") {
        
            var divComp = document.getElementById("comprobante-full-view");
        
            divComp.style.backgroundImage = "url(" + urlComprobante + ")";
            
            var height = "450px";
            
            switch (comprobante.tipoOperacion) {
                case "INCOMPRA":    height = "910px";                               break;
                case "TROB":        height = "560px";                               break;
                case "INVENTA":
                case "TRAT":
                case "TRCP":                                                        break;
            }
            
            divComp.style.height = height;
            
            document.getElementById("visor-estado-cuenta").style.display = "none";
            document.getElementById("comprobante-guardado-full").style.display = "block";
            document.getElementById("dialContainer").style.margin = "4% 2% 0%";
            
        } else {
            
            var src = "js/pdfjs/web/viewer.html?file=" + urlComprobante.replace(".png", ".pdf");
            
            var objVisor = document.getElementById("objectPDF");
            
            objVisor.setAttribute("data", src);
            
            document.getElementById("comprobante-guardado-full").style.display = "none";
            document.getElementById("visor-estado-cuenta").style.display = "block";
            document.getElementById("dialContainer").style.margin = "0px";
            
        }
        
        var html = document.getElementById("comprobante-full-size").innerHTML;
        
        parent.abrirModal(html, 800);
    }
    
}

function resetPreview (origen) {
    
    if ((typeof origen != "undefined") && (origen == "modal")) {
        resetMovimientos();
    }
    
    document.getElementById("boton-expandir").style.visibility = "hidden";
    document.getElementById("comprobante-preview").style.backgroundImage = "";
    document.getElementById("comprobante-preview").style.visibility = "hidden";
    
    $("#transferir-desactivar-miscuentas-datos-operacion").show();
}

function resetMovimientos() {
    
    urlComprobante = null;
    comprobante = null;
    
    $("#lista-comprobantes .lista-plazos-consulta").each(function () {
                                                         $(this).removeClass("selectedAccount");
                                                         $('.div-selectedAccount', this).remove();
                                                         });
    
}

function formatFechaCG (date) {
    return date.substring(6) + "/" + date.substring(4,6) + "/" + date.substring(0,4);
}

function formatHoraCG (hora) {
    return hora.substring(0,2) + ":" + hora.substring(2,4) + ":" + hora.substring(4);
}

function getTipoOperacion(tipo) {

    var tipoOperacion = null;
    
    switch (tipo) {
        case "TRCP":        tipoOperacion = "Tras Mis";     break;
        case "TRAT":        tipoOperacion = "Tras CtasB";   break;
        case "TROB":        tipoOperacion = "Tras Otros";   break;
        case "INVENTA":     tipoOperacion = "Inv Vender";   break;
        case "INCOMPRA":    tipoOperacion = "Inv Comprar";  break;
        case "EDOCUENTA":   tipoOperacion = "Edo Cuenta";   break;
        default:            tipoOperacion = "";             break;
    }
    
    return tipoOperacion;
}
