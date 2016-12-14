var acceso_usr_global;
var usuario_global;
var posGlobal;
var listaTitulos;
var listaCuentasPago;
var tipoCliente;
var cuentaOrigen;
var cuentaDestino;
var folioOperacion;

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


/**
 * Mostrar n últimos dígitos
 * 
 * @param numeroCuenta
 * @returns {String}
 */
function mostrarUltimosNDigitos (numeroCuenta, numDig) {
    var numeroCuentaOculto = "";
    if (numeroCuenta != undefined){
        for (i = 0; i < numeroCuenta.length; i++) {
            if (i < numeroCuenta.length - numDig) {
                numeroCuentaOculto = "";
            } else {
                numeroCuentaOculto += numeroCuenta.charAt(i);
            }
        }
    }
    
    return numeroCuentaOculto;
}

/**
 * Parsea número a formato $999,999.99
 *
 * @param number
 * @returns {String}
 */
function formatNumberDolar(number) {
    var str = number + "";
    x = str.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return "$ "+(x1 + x2);
}

function getVarsUrl(){
    var url= document.location.search.replace("?", "");
    var arrUrl = url.split("&");
    var urlObj={};
    for(var i=0; i<arrUrl.length; i++){
        var x= arrUrl[i].split("=");
        urlObj[x[0]]=decodeURIComponent(x[1]);
    }
    return urlObj;
}

function regresarToVentaInicio(){
    var misVariablesGet = getVarsUrl();
    var cboCuentaSelected = misVariablesGet.cboCuentaSelected;
    var cboInversionSelected = misVariablesGet.cboInversionSelected;
    
    $('#contentFrame2').html(' ');
    
    console.log("goToInvertirVentaAprobacion cboCuentaSelected "+cboCuentaSelected+" cboInversionSelected "+cboInversionSelected);
    
    parent.document.getElementById('contentFrame').src = 'invertir-vender.html?bandRegresar=true&cboCuentaSelected='+cboCuentaSelected+'&cboInversionSelected='+cboInversionSelected;
    
    parent.document.getElementById('btns-lateral').setAttribute('class', 'invertir-selected');
    
}

/********************* INICIO PANTALLA ingreso Venta invertir *******************************/

/**
 * Carga ventana invertir-vender.html
 */
function loadViewVentaInvertir(){
	console.log("INICIO loadIngresoVentaInvertir");
    recuperaListaTitulos();
	console.log("FIN loadIngresoVentaInvertir");
}


/**
 * recuperaContratosCuentasInv
 */
function recuperaListaTitulos(){
    console.log("INICIO recuperaListaTitulos");
    
    parent.showLoadingLayer();
    if (usuario_global == undefined){
        posGlobal = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal;
        acceso_usr_global=posGlobal.acceso_usr;
        usuario_global = posGlobal.usuario_usr;        
    }
    
	var datosAplicativos =
    {
			usuario: usuario_global, acceso: acceso_usr_global
    };
    
    console.log("recuperaListaTitulos usuario "+usuario_global+" acceso "+acceso_usr_global);	
    
	parent.ventaInvertirDelegate.recuperaListaTitulos(datosAplicativos, successRecuperaListaTitulos, returnError);
    parent.document.getElementById('imgMenu').style.zIndex='0';
    console.log("FIN recuperaListaTitulos");
}

/**
 * successRecuperaListaTitulos
 * @param jsonResponse
 */
function successRecuperaListaTitulos(jsonResponse){
    
    parent.hideLoadingLayer();
    
    console.log("INICIO successRecuperaListaTitulos response "+jsonResponse);
	
    var respuesta = JSON.parse(jsonResponse).respuesta;
    
    if(typeof respuesta.listaTitulos === "undefined" || respuesta.listaTitulos == null || respuesta.listaTitulos.length == 0){
        
        parent.loginDelegate.showAlert("Aviso\n", "Para realizar la compra o venta de inversiones a plazo, requiere de un contrato, contacte a su ejecutivo de sucursal.", "Aceptar");
        parent.baseViewController.validaLocation('isInvertir','nb-consultar', '1');
     } else {
        listaTitulos = respuesta.listaTitulos;
        listaCuentasPago = respuesta.listaCuentasPago;
        tipoCliente = respuesta.tipoCliente;
        cargaListaInversion();
        cargaListaCuentasDeposito();
    }
    
    console.log("FIN successRecuperaListaTitulos");
}


/**
 * carga de combo cboINVERSION
 * @param listaTitulos
 */
function cargaListaInversion(){
 
    var numeroCuenta;
    var numeroCuentaCompleto;
    var fechaVencimiento;
    var numeroInversion;
    var fecha;

    for (var i in listaTitulos){
        
         numeroCuenta= mostrarUltimosNDigitos(listaTitulos[i].numeroCuenta,10);
         numeroCuentaCompleto = listaTitulos[i].numeroCuenta;
         fechaVencimiento= listaTitulos[i].fechaVencimiento;
         numeroInversion = listaTitulos[i].numeroInversion;
        
         console.log("fechaVencimiento: "+fechaVencimiento);
        
        if (fechaVencimiento === " "){
            fecha = "";
        }
        else{
            
            var anio = fechaVencimiento.split('-')[0];
            var mes = fechaVencimiento.split('-')[1];
            var dia = fechaVencimiento.split('-')[2];
            fecha = dia+"/"+mes+"/"+anio;
        }
        
       console.log("successRecuperaListaTitulos valor numeroCuentaCompleto "+numeroCuenta+" numeroInversion "+numeroInversion+" numeroInversion "+numeroInversion+"fecha: "+fecha);
       createElementoListaOrigen('origen-'+i, numeroCuentaCompleto, numeroCuenta, fecha, numeroInversion);
      
    }
    
    document.getElementById('lista-invertir-vender-origen').parentNode.className = (listaTitulos.length < 9)?"":"overflowS";
    
    console.log("FIN carga inversiones");
    
}


function createElementoListaOrigen(divId, numeroCuentaCompleto, numeroCuenta, fechaVencimiento, numeroInversion){

    console.log( "createElementoListaOrigen("+numeroCuentaCompleto+", "+numeroCuenta+", "+fechaVencimiento+", "+numeroInversion+")");
     var listaOrigen = document.getElementById('lista-invertir-vender-origen');
    
    var newLi = document.createElement('li');
    var newDiv = document.createElement('div');
    newDiv.setAttribute("id", divId);
    newDiv.setAttribute("class", "lista-origen-invertir-vender");
    newDiv.setAttribute("value", numeroCuentaCompleto);
    newDiv.setAttribute("onclick", "origenSelected(this);");
    
    var newTable = document.createElement('table');
    newTable.setAttribute("class","tab-invertir-celda");
    
    var tr_first = document.createElement("tr");
    tr_first.setAttribute("class","invertir-tab-filauno");
    
    var td_center = document.createElement("td");
    td_center.setAttribute("class", "invertir-tab-columna-centrada");
    td_center.appendChild(document.createTextNode(numeroCuenta));
    tr_first.appendChild(td_center);
    newTable.appendChild(tr_first);
    
    var tr_second = document.createElement("tr");
    var newTable2 = document.createElement('table');
    newTable2.setAttribute("class","tab-invertir-celda");
    var tr_second_table = document.createElement("tr");
    
    var td_left = document.createElement("td");
    td_left.setAttribute("class", "invertir-tab-columna-izq");
    td_left.appendChild(document.createTextNode(numeroInversion));
    tr_second_table.appendChild(td_left);
    var td_right = document.createElement("td");
    td_right.setAttribute("class", "transferir-miscuentas-tab-columna-der");
    td_right.appendChild(document.createTextNode(fechaVencimiento));
    tr_second_table.appendChild(td_right);
    newTable2.appendChild(tr_second_table);
    tr_second.appendChild(newTable2);
    newTable.appendChild(tr_second);
    
    newDiv.appendChild(newTable);
    newLi.appendChild(newDiv);
    listaOrigen.appendChild(newLi);
    
}



function createElementoListaDestino(divId,numeroCuentaCompleto, numeroCuenta, importe_saldo){
    
    console.log( "createElementoListaDestino("+numeroCuentaCompleto+", "+numeroCuenta+", "+importe_saldo+")");
    var listaDestino = document.getElementById('lista-invertir-vender-destino');
    
    var newLi = document.createElement('li');
    var newDiv = document.createElement('div');
    newDiv.setAttribute("id", divId);
    newDiv.setAttribute("class", "lista-destino-invertir-vender");
    newDiv.setAttribute("value", numeroCuentaCompleto);
    newDiv.setAttribute("onclick", "destinoSelected(this);");
    
    var newTable = document.createElement('table');
    newTable.setAttribute("class", "tab-invertir-celda");
    var tr = document.createElement("tr");
    var td_left = document.createElement("td");
    td_left.setAttribute("class", "invertir-tab-columna-izq");
    td_left.appendChild(document.createTextNode(numeroCuenta));
    tr.appendChild(td_left);
    var td_right = document.createElement("td");
    td_right.setAttribute("class", "transferir-miscuentas-tab-columna-der resaltado-azul2");
    td_right.appendChild(document.createTextNode(importe_saldo));
    tr.appendChild(td_right);
    newTable.appendChild(tr);
    
    newDiv.appendChild(newTable);
    newLi.appendChild(newDiv);
    listaDestino.appendChild(newLi);
}





/**
 * carga de Cuentas deposito
 * @param
 */
function cargaListaCuentasDeposito(){
    
    for (var i in listaCuentasPago){
        
        var numeroCuenta= mostrarUltimosNDigitos(listaCuentasPago[i].numeroCuenta,10);
        var numeroCuentaCompleto = listaCuentasPago[i].numeroCuenta;
        var saldoDisponible= listaCuentasPago[i].saldoDisponible;
       
        var filaCombo= numeroCuenta+" - "+formatNumberDolar(saldoDisponible);
            console.log("cargaListaCuentasDeposito key "+numeroCuentaCompleto+" fila "+filaCombo);
            console.log("cargaListaCuentasDeposito valor numeroCuentaCompleto "+numeroCuenta+" saldoDisponible "+saldoDisponible);
            createElementoListaDestino('destino-'+i, numeroCuentaCompleto, numeroCuenta, accounting.formatMoney(saldoDisponible, "$ ", 2, ",", "."));
    }
    
    document.getElementById('lista-invertir-vender-destino').parentNode.className = (listaCuentasPago.length < 9)?"":"overflowS";
    
}

function origenSelected(divOrigen){
    
    $(".lista-origen-invertir-vender").each(
                                   function () {
                                   $('.div-selectedAccount-venta', this).remove();
                                   });
    

    var newDiv = document.createElement("div");
    newDiv.className = "div-selectedAccount-venta";
    divOrigen.appendChild(newDiv);
    
    console.log(divOrigen);
    
    console.log("seteando cuenta origen  " + divOrigen.getAttribute("value") + "\n");
    setCuentaOrigen(divOrigen.id.split("-")[1]);
    $("#transferir-desactivar-miscuentas-cuentas-destino").css("display","none");
    cuentaDestino = undefined;
    $(".lista-destino-invertir-vender").each(
                                             function () {
                                             $('.div-selectedAccount-venta', this).remove();
                                             });
    var impLiquidar = document.getElementById("impLiquidar");
    impLiquidar.innerHTML = '';
    var fechaOperacion = document.getElementById("lblVFECHAOPE");
    fechaOperacion.innerHTML = '';

    $("#transferir-desactivar-miscuentas-datos-operacion").css("display","block");
    
}


function destinoSelected(divDestino){
    
    $(".lista-destino-invertir-vender").each(
                                    function () {
                                    $('.div-selectedAccount-venta', this).remove();
                                    });
    
    var newDiv = document.createElement("div");
    newDiv.className = "div-selectedAccount-venta";
    divDestino.appendChild(newDiv);
    
    console.log(divDestino);
    
    console.log("seteando cuenta destino" + divDestino.getAttribute("value") + "\n");
    setCuentaDestino(divDestino.getAttribute("value"));
    var impLiquidar = document.getElementById("impLiquidar");
    impLiquidar.innerHTML = accounting.formatMoney(cuentaOrigen.importeInversion, "$ ", 2, ",", ".");
    var fechaServidor = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.fechaservidor;
    var fechaOperacion = document.getElementById("lblVFECHAOPE");
    fechaOperacion.innerHTML = fechaServidor;
    $("#transferir-desactivar-miscuentas-datos-operacion").css("display","none");
   // establecerDatosOperacion();
}


function setCuentaDestino(id){

    console.log("cuentaDestino Selected"+id);
    var i = 0;
    while (i<listaCuentasPago.length && listaCuentasPago[i].numeroCuenta != id){
        i++;
    }
    if(listaCuentasPago[i].numeroCuenta == id){
        cuentaDestino = listaCuentasPago[i];
    }
    
}


function setCuentaOrigen (i){
    
    cuentaOrigen = listaTitulos[i];
   
    console.log('cuentaOrigen', cuentaOrigen);
}


function validaDatosOperacion(){

    if(cuentaOrigen == undefined || cuentaDestino == undefined){
        parent.loginDelegate.showAlert("Aviso\n", "Favor de seleccionar cuenta origen y cuenta destino", constants.ALERT_BUTTON_OK);
    } else if(validarRangoHorario()){
        aplicarVenta();
    }

}

function aplicarVenta(){

    var posGlobal = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal;
    acceso_usr_global=posGlobal.acceso_usr;
    usuario_global = posGlobal.usuario_usr;

    var importeLiquidar = formatearImporteParaPeticion(document.getElementById("impLiquidar").innerHTML);
    // Se eliminan los strings de los tipos de cuentas - Incidencia 125
    var datosAplicativosVenta =
    {
    usuario: usuario_global, acceso: acceso_usr_global, cuenta: cuentaOrigen.numeroCuenta, titulo: cuentaOrigen.numeroInversion, importe: importeLiquidar, interes: "", importeInversion: cuentaOrigen.importeInversion, ctaAbono: cuentaDestino.numeroCuenta, tipoCliente: tipoCliente , claveOperaciones: "00000000" , otp: "" , tripletaTasa: "" , digitoVerificador: ""
    };
    
    var aplicaVenta =
    {
    proceso: "imd_inversiones_a_plazo_venta_pr",
    operacion: "imd_inversiones_a_plazo_venta_op",
    accion: "cancelaTitulo",
    datosAplicativos: datosAplicativosVenta
    }
    parent.showLoadingLayer();
    
    parent.ventaInvertirDelegate.aplicaVenta (aplicaVenta, aplicarVentaSuccess, returnErrorAplicaVenta);
    
}

function aplicarVentaSuccess(jsonResponse){

    console.log("aplicarVentaSuccess   :\n"+jsonResponse);
    var respuesta = JSON.parse(jsonResponse).respuesta;
    var interesVto = respuesta.interesVto;
    folioOperacion = respuesta.folio;
    console.log("interes "+interesVto);
    console.log("folio "+folioOperacion);
    
    var horaServidor = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.horaservidor;
    var fechaServidor = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.fechaservidor;
    loadResultadoViewComprobante (cuentaOrigen.numeroCuenta,cuentaDestino.numeroCuenta,cuentaOrigen.numeroInversion,cuentaOrigen.importeInversion,fechaServidor,horaServidor,interesVto,folioOperacion)
    parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
    parent.document.getElementById("sombraCabecera").style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    parent.hideLoadingLayer();
    launchComprobante();

}

/**
 * returnError
 * @param errorMessage
 * @returns
 */
function returnError (errorMessage) {
    parent.hideLoadingLayer();
    console.log("ERROR "+errorMessage);
    parent.baseViewController.validaLocation('isInvertir','nb-consultar','1');
   // alert("ERROR "+errorMessage);
}

/**
 * returnErrorAplicaVenta
 */
function returnErrorAplicaVenta (errorMessage) {
    parent.hideLoadingLayer();
    console.log("ERROR APLICA VENTA " + errorMessage);
    parent.baseViewController.validaLocation('isInvertir','nb-vender','1');
}


function formatearFechaParaComprobante(fechaparaformatear){
    
    
    var fechaformateada;
    var i=0;
    while(i<2){
        
        fechaparaformatear=fechaparaformatear.replace("/","");
        i=i+1;
    }
    
    fechaformateada=fechaparaformatear.substring(4,8)+fechaparaformatear.substring(2,4)+fechaparaformatear.substring(0,2);
    
    return fechaformateada;
    
}

function formatearHoraParaComprobante(horaparaformatear){
    var horaformateada;
    var i=0;
    
    var pos=horaparaformatear.indexOf(":");
    var hora= horaparaformatear.substring(0,pos);
    if (hora.length<2){
        horaparaformatear="0"+horaparaformatear;
    }
    
    while(i<2){
        
        horaparaformatear=horaparaformatear.replace(":","");
        i=i+1;
    }
    
        horaformateada=horaparaformatear.substring(0,6);
    
    return  horaformateada;

}

/**
 * Guardar pdf del componente
 */
function guardarComponentePDF(){
    
    parent.document.getElementById("dialogHide").innerHTML = "";
    parent.document.getElementById("dialogHide").style.display = "block";
    
    
      var fechaFinal= parent.document.getElementById('fOpe').innerHTML;
    fechaFinal=formatearFechaParaComprobante(fechaFinal);

    
    //cargar la hora del comprobante
    var date = new Date();
    var horaFinal= parent.document.getElementById('hOpe').innerHTML;
    horaFinal=formatearHoraParaComprobante(horaFinal);
    
    var folioOp=parent.document.getElementById('foOpe').innerHTML;
    
    var nombreComprobante=fechaFinal+"_"+horaFinal+"_"+folioOp+"_INVENTA";
    
    
    parent.document.getElementById("dialogHide").innerHTML = parent.document.getElementById("dialContainer").innerHTML;
    
    parent.generaComprobantesDelegate.leerImagenComprobante('dialogHide',nombreComprobante,void(0),void(0));
    
}


function goToInvertirVentaAprobacion(){
	
	var cboInversion=$("#cboINVERSION option:selected").text();
	var cboCuenta=$("#cboCUENTADEPO option:selected").text();
	
	if (cboInversion == "Selecciona" || cboCuenta == "Selecciona" ){
		parent.compraInvertirDelegate.muestraAlert("Aviso\n", "La información ingresada es incorrecta", "Aceptar");		
	}else if (validarRangoHorario()){
	    $('#contentFrame2').html(' ');
    
        var fechaOperacion =  $("#lblVFECHAOPE").text();
//        var importeInversion = cboCuenta.split("\$")[1];
        
	    baseViewController.showHeader(false);
	    baseViewController.showInferiorMenu('nav-bajo-invertir');
        

        var cboCuentaSelected = $("#cboCUENTADEPO").val();
        var cboInversionSelected = $("#cboINVERSION").val();
        
        var importeInversion = cboInversionSelected.split("\_")[1];
      
        
        var urlBack = 'invertirVentaAprobacion.html?cuentaInv='+cboInversion+'&cuentaDeposito='+cboCuenta+'&importeInversion='+importeInversion+'&fechaOperacion='+fechaOperacion+'&cboCuentaSelected='+cboCuentaSelected+'&cboInversionSelected='+cboInversionSelected;
      
        
        sessionStorage.urlBack = urlBack;
        
	    console.log("urlBack "+urlBack);
	    
	    parent.document.getElementById('contentFrame').src = urlBack;
        
	    parent.document.getElementById('btns-lateral').setAttribute('class', 'invertir-selected');		
	}
	
}

/**
 * Recupera horario de operaciones
 * @returns
 */
function recuperarHorarioVenta(){
	   var tablaHorarios = JSON.parse(sessionStorage.jsonReglasNegocio).aplicaciones.ventaInversiones.operacion.abono.horarioOperacion;
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

/**
 * validarRangoHorario
 * @returns {Boolean}
 */
function validarRangoHorario(){
    
    //en horario tendremos el intervalo horario correspondiente al dia en que se realiza la peticion
    var salida = false;
    var date = new Date();
    
    var horario = recuperarHorarioVenta();
    
    var cadenaHoraInicio = horario.inicio.split(':');
    var integerHoraInicio = parseInt(cadenaHoraInicio[0]);
    var integerMinutoInicio = parseInt(cadenaHoraInicio[1]);
   /* if(integerHoraInicio.charAt(0) == '0'){
        
        integerHoraInicio = integerHoraInicio.charAt(1);
    }
   */
    var cadenaHoraFin = horario.fin.split(':');
    var integerHoraFin = parseInt(cadenaHoraFin[0]);
    var integerMinutoFin = parseInt(cadenaHoraFin[1]);
    
    var horaActual = date.getHours();
    
    var minutoActual = date.getMinutes();
   /* if (date.getMinutes()<10){
        minutoActual = 0 + minutoActual;
    }
   */
    console.log("validarRangoHorario horaActual "+horaActual+" integerHoraInicio "+integerHoraInicio+" minutoActual "+minutoActual+" integerHoraFin "+integerHoraFin+" integerMinutoFin "+integerMinutoFin);

    if ( (horaActual>integerHoraInicio) && (horaActual<integerHoraFin) ){
        salida = true;
    }else if ( (horaActual == integerHoraInicio) && (minutoActual>=integerMinutoInicio) ){
        salida = true;
    }else if ( (horaActual == integerHoraFin) && (minutoActual<=integerMinutoFin) ){
        salida = true;
    }
    
    if (!salida){
        parent.compraInvertirDelegate.muestraAlert("Aviso\n","El horario de operaci\xf3n para las inversiones es de " + horario.inicio + " a " +
              horario.fin + " hrs.", "Aceptar");
    }
    
    return salida;
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


function formatoMonedaInvertir (cantidad) {
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
    
    return importeInv;
}



/**
 * Abre popup comprobante
 * @param
 */
function launchComprobante(){
    
    console.log("launchComprobante abriendo dialog");
  
    var html = $("#dialog").html();
    console.log("Dialogo abierto");
    
    parent.abrirModal(html,800);
}



/**
 * Carga datos popup comprobante
 */
function loadResultadoViewComprobante (cuentaInv,cuentaDep,tituloInv,importeInversion,fechaServidor,horaServidor,interesVto,folio){
    
    var pg = JSON.parse(sessionStorage.jsonPosicion);
    if (pg != null){
        var user = pg.posicionGlobal.nombre_usr;
    }
    
    document.getElementById('user').innerHTML = user;
    document.getElementById('date').innerHTML = fechaServidor.replace(new RegExp('/','g'), '-')+"  "+ horaServidor;
    document.getElementById('cInv').innerHTML = cuentaInv.slice(-10);
    document.getElementById('cDep').innerHTML = cuentaDep.slice(-10);
    document.getElementById('tInv').innerHTML = tituloInv;
    document.getElementById('iInv').innerHTML = formatNumberDolar(importeInversion);
    document.getElementById('iVen').innerHTML = interesVto;
    document.getElementById('fOpe').innerHTML = fechaServidor;
    document.getElementById('hOpe').innerHTML = horaServidor;
    document.getElementById('foOpe').innerHTML = folio;
    
    
}

/********************* FIN PANTALLA ingreso Venta invertir *******************************/