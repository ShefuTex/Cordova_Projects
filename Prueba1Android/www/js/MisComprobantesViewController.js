// Constantes
var DIVISA_MXP = "MXP";
var TIPO_AH="AH";
var TIPO_CH="CH";
var TIPO_LI="LI";
var TIPO_TC="TC";
var TIPO_IN="IN";
var TIPO_TP="TP";
var claveOperaciones = "R-Reimpresion";
var tipoEjecucionC = "C";
var CATALOGO_TIPO_CUENTA = {
    SINCHEQ : {
        value: TIPO_AH,
        name: "Sin/ cheq"
    },
    CONCHEQ: {value: TIPO_CH, name: "Con/ cheq"},
        LIBRETON : {value: TIPO_LI, name: "Libretón"},
        TDC : {value: TIPO_TC, name: "TDC"},
        INV : {value: TIPO_IN, name: "Inversiones"},
        TP : {value: TIPO_TP, name: "TDC Prepago"}
};
var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// Variables globales
var posGlobal;
var usuario_global;
var acceso_usr_global;
var tiseguridad_usr;
var cuentasMXP = [];
var cuentasUSD = [];
var cuentasTDC = [];
var cuentas = [];
var cuenOrig = [];
var tipoOperacion = [];
var periodo = [];
var movimientos = [];

function loadPosicionGlobal(){
    console.log("INICIO loadPosicionGlobal");
	/* Lee del objeto sessionStorage y parsea a JSON */
	if ((sessionStorage.jsonPosicion != null) && (sessionStorage.jsonPosicion.length > 0) && (typeof sessionStorage.jsonPosicion != "undefined")) {
		posGlobal = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal;
		acceso_usr_global=posGlobal.acceso_usr;
		usuario_global = posGlobal.usuario_usr;
		tiseguridad_usr = posGlobal.tiseguridad_usr;
        
        cuentasMXP = posGlobal.asuntos.lista_cuentas_mxp;
        
        var jsonCuentasUSD = posGlobal.asuntos.lista_cuentas_usd;
        if ((typeof jsonCuentasUSD != "undefined") && (jsonCuentasUSD != null) && (jsonCuentasUSD != "")) {
            for (var i in jsonCuentasUSD) {
                if (jsonCuentasUSD[i].plaza == "MEXICO") {
                    cuentasUSD.push(jsonCuentasUSD[i]);
                }
            }
        }
        cuentasTDC = posGlobal.asuntos.lista_tarjetascredito;

	}
    
    console.log("FIN loadPosicionGlobal");
}

function cargarCuentasOrigen(){
    
    loadPosicionGlobal();

    cuentas = limpiarNulos(cuentasMXP.concat(cuentasUSD.concat(cuentasTDC)));
    
    for(var i = 0; i<cuentas.length; i++){
        if ((cuentas[i]!="")&&(typeof cuentas[i] !='undefined')&&(cuentas[i]!=null)){
                
                    var alias = cuentas[i].alias;
                    if (typeof alias == 'undefined' || alias == ""){
                        //Si la cuenta no tiene un alias se desplegará una descripción del tipo de cuenta que se obtendrá del catálogo de tipos de cuenta.
                        alias = getTipoCuentaName(cuentas[i].tipo);
                    }
                    
                    if(alias.length >10){
                        alias = alias.slice(10);
                    }
                    
                    if(cuentas[i].tipo == TIPO_TC){
                        
                        saldo = cuentas[i].saldofecha.toString();
                        numero = mostrarUltimos5Digitos (cuentas[i].numero.toString());
                    }else{
                        saldo = cuentas[i].saldo_disponible.toString();
                        numero = cuentas[i].numero;
                    }
                    idCapa=i+1;
                    crearBotonCuentaOrigen("lista-cuenta-origen-"+idCapa, 'drag-t'+(i=="0"?"":i+1), alias, accounting.formatMoney(saldo, "", 2, ",", "."), numero.slice(-10) , "$",cuentas[i].id,cuentas[i].tipo,i+1);
            
        }
    }

    var listaCuentaOrigen = document.getElementById("lista-cuenta-origen");
    
    listaCuentaOrigen.parentNode.className = (cuentas.length < 9)?"":"overflowS";
    
    parent.hideLoadingLayer();
}

function crearBotonCuentaOrigen(divId, tableId, alias, saldo_disponible, numero, divisa,id,tipo,cont){
    
    var listaCuentaOrigen= document.getElementById("lista-cuenta-origen");
    
    console.log('crearBotonCuentaOrigen divId '+ divId);
    
    
    var newLi = document.createElement('li');
    var newDiv = document.createElement('div');
    
    newDiv.setAttribute("class", "lista-cuenta-origen");
    
    
    var hiddenValue = document.createElement('div');
    
    newDiv.setAttribute("id", divId);
    
    hiddenValue.setAttribute("id","drag_id_account-"+cont);
    
    newDiv.setAttribute("value",id);
    hiddenValue.setAttribute("data-type",tipo);
    newDiv.setAttribute("onclick", "origenSelected(this);");
    
    var newTable = document.createElement('table');
    newTable.setAttribute("id", tableId);
    
    var fila1 = "transferir-miscuentas-tab-filauno";
    var fila2 = "transferir-miscuentas-tab-filados";
    
    //First row
    createTRDragButton(fila1,newTable, numero, alias);
    //Second row
    createTRDragButton(fila2,newTable, divisa, saldo_disponible);
    
    newDiv.appendChild(hiddenValue);
    newDiv.appendChild(newTable);
    newLi.appendChild(newDiv);
    
    listaCuentaOrigen.appendChild(newLi);
    
}

function createTRDragButton(fila,newTable, valueTd1, valueTd2){
    
    var tr_first = document.createElement("tr");
    tr_first.setAttribute("class",fila);
    var td_left = document.createElement("td");
    td_left.setAttribute("class", "transferir-miscuentas-tab-columna-izq");
    td_left.appendChild(document.createTextNode(valueTd1));
    tr_first.appendChild(td_left);
    var td_right = document.createElement("td");
    td_right.setAttribute("class", "transferir-miscuentas-tab-columna-der");
    td_right.appendChild(document.createTextNode(valueTd2));
    tr_first.appendChild(td_right);
    
    newTable.appendChild(tr_first);
}

function origenSelected(divOrigen) {
    
    $(".lista-cuenta-origen").each(
                                   function () {
                                   $('.div-selectedAccount', this).remove();
                                   });
    
    
    var newDiv = document.createElement("div");
    newDiv.className = "div-selectedAccount";
    
    divOrigen.appendChild(newDiv);
    
    console.log(divOrigen);
    
    setCuenOrigen(divOrigen.getAttribute("value"));
    
    console.log('cuentaOrigen', cuenOrig);
    
    if ((typeof tipoOperacion != "undefined") && (tipoOperacion != null) && (tipoOperacion != "")) {
        resetTipoOperacion();
        resetPeriodos();
    }
    
    $("#transferir-desactivar-miscuentas-cuentas-destino").hide();
}

function tipoSelected(divOrigen) {
    
    console.log(divOrigen);
    
    tipoOperacion = divOrigen.dataset.type;
    
    console.log("tipoOperacion = " + tipoOperacion);
    
    $("#lista-tipos .lista-plazos-consulta").each(function () {
                                     $(this).removeClass('selectedAccount');
                                     $('.div-selectedAccount', this).remove();
                                     });
    
    var newDiv = document.createElement("div");
    newDiv.className = "div-selectedAccount";
    
    divOrigen.appendChild(newDiv);
    
    divOrigen.className += " selectedAccount";
    
    if ((typeof periodo != "undefined") && (periodo != null) && (periodo != "")) {
        resetPeriodos();
    }
    
    $("#transferir-desactivar-miscuentas-datos-operacion").hide();
    
}

function resetTipoOperacion () {
    
    tipoOperacion = null;
    
    $("#lista-tipos .lista-plazos-consulta").each(function () {
                                     $('.div-selectedAccount', this).remove();
                                     });
    
    if ((typeof periodo != "undefined") && (periodo != null) && (periodo != "")) {
        resetPeriodos();
    }
    
    $("#transferir-desactivar-miscuentas-cuentas-destino").show();
}

function setCuenOrigen (id){

    for (var i in cuentas) {
        if (cuentas[i].id == id) {
            cuenOrig = cuentas[i];
        }
    }
    
}

function cargarPeriodos () {
    
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    
    for (var i = 0; i < 4; i++) {
        
        var index = month-i;
        var anio = year;
        
        if (index < 0) {
            index = 12 - Math.abs(index);
            anio--;
        }
        
        var mes = meses[index];
        
        $("#lista-periodos li:nth-child(" + (i+1) + ") > div").html(mes + " " + anio);
        
    }
}

function resetPeriodos () {
    
    periodo = null;
    
    $("#lista-periodos .lista-plazos-consulta").each(function () {
                                                     $('.div-selectedAccount', this).remove();
                                                     });
    
    $("#transferir-desactivar-miscuentas-datos-operacion").show();
                                                     
}

function periodoSelected(divOrigen) {
    
    periodo = divOrigen.dataset.periodo;
    
    $("#lista-periodos .lista-plazos-consulta").each(function () {
                                                     $(this).removeClass('selectedAccount');
                                                     $('.div-selectedAccount', this).remove();
                                                    });
                                                     
    var newDiv = document.createElement("div");
    newDiv.className = "div-selectedAccount";
    
    divOrigen.appendChild(newDiv);
    divOrigen.className += " selectedAccount";
                                                     
    console.log("periodo = " + periodo);
}

function solicitaListado() {

    console.log("Solicitando comprobantes ...");
    
    if ((typeof periodo != "undefined") && (periodo != null) && (periodo != "")) {
    
        parent.showLoadingLayer();
        
        var datosAplicativos = {
            acceso: acceso_usr_global,
            usuario: usuario_global,
            idPeriodo: periodo,
            tipFunc: tipoOperacion,
            claveOperaciones: "",
            OTP: "",
            tipoEjecucion: tipoEjecucionC
        };
        
        var peticion = {
            proceso: "imd_consulta_comprobante_pr",
            operacion: "imd_consulta_comprobante_op",
            accion: "confirma",
            datosAplicativos: datosAplicativos
        };
        
        console.log('peticionComprobantes', peticion);
        
        parent.generaComprobantesDelegate.mostrarOpciones(datosAplicativos, '', returnResponseMostrarBusquedaDeComprobantes, returnError);
        
    } else {
        parent.loginDelegate.showAlert("Aviso\n", "Favor de seleccionar un perido espec\xEDfico", "Aceptar");
    }
    
}

function returnResponseMostrarBusquedaDeComprobantes(jsonResponse, portfolio) {
    
    var result = JSON.parse(jsonResponse);
    
    console.log('respuestaBusquedaComprobantes', result);
    
    if (result.respuesta != undefined){
        
        movimientos = limpiarNulos(result.respuesta.lcMovimientos);
        var tablaMovimientos = document.getElementById("tablaMovimientos");
       
        if ((typeof movimientos != "undefined") && (movimientos != null) && (movimientos.length > 0)) {
            for (var i in movimientos) {
                
                var trMovimiento = document.createElement('tr');
                
                var tdDescripcion = document.createElement('td');
                tdDescripcion.innerHTML = movimientos[i].descripcionOperacion.substring(0,15);
                tdDescripcion.style.textAlign = "left";
                tdDescripcion.style.paddingLeft = "20px";
                
                var tdFecha = document.createElement('td');
                tdFecha.innerHTML = formatFecha(movimientos[i].fechaOperacion);
                
                var tdImporte = document.createElement('td');
                tdImporte.innerHTML = accounting.formatMoney(movimientos[i].importe, "$ ", 2, ",", ".");
                tdImporte.style.textAlign = "right";
                tdImporte.style.paddingRight = "20px";
                
                trMovimiento.setAttribute("onClick", "window.frames.contentFrame.movimientoSelected(" + i + ", this)");
                trMovimiento.className = "tr-movimiento-comprobantes-operacion";
                trMovimiento.appendChild(tdDescripcion);
                trMovimiento.appendChild(tdFecha);
                trMovimiento.appendChild(tdImporte);
                
                tablaMovimientos.appendChild(trMovimiento);
                
            }
            
            if ($("#noHayRegistros").css("display") == "block") {
                $("#noHayRegistros").hide();
            }
            
        } else {
            $("#noHayRegistros").show();
        }
   
        parent.hideLoadingLayer();
        
        var html = $("#listaMovimientos").html();
        
        parent.abrirModal(html, 650);
        
    } else {
        returnError(jsonResponse);
    }

    
}

function movimientoSelected(index, trOrigen) {

    parent.hideLoadingLayer();
    
    parent.eliminarClase("tr-movimiento-comprobantes-operacion","selectedAccount");
    
    trOrigen.className += " selectedAccount";
    
    var movimiento = movimientos[index];
    
    console.log('movimiento seleccionado', movimiento);
    
    launchComprobante(movimiento);
}

function launchComprobante(movimiento) {
    
    $("#lblNUMFOLOPERACION").html(movimiento.folio)
    
    $("#lblNUMFECOPERACION").html(formatFechaComprobante(movimiento.fechaOperacion, "/"));
    
    var horaOp = movimiento.horaOperacion.replace(".",":");
    horaOp = horaOp.replace(".",":");
    
    $("#lblNUMHROPERACION").html(horaOp);
    
    $("#lblDESCONCEPTO").html(movimiento.descripcionOperacion.substring(0,12));
    
    $("#lblNUMIMPORTE").html(accounting.formatMoney(movimiento.importe, "$ ", 2, ",", "."));
    
    var longitudCuenta = movimiento.cuentaPrimaria.toString().length;
    var cuentaOculta = "*" + movimiento.cuentaPrimaria.toString().substring(longitudCuenta-5);
    $("#lblNUMTARJETA").html(mostrarUltimos6Digitos(cuentaOculta));
    
    $("#lblNUMCUENRETIRO").html(movimiento.cuentaAsociada);
    
    $("#lblHEADERCONCEPTO").html(movimiento.descripcionOperacion);
    
    var html = $("#dialog").html();
    
    parent.abrirModal(html, 800);
}

function formatFecha(strFecha){
   	var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Abo','Sep','Oct','Nov','Dic'];
    
    var splitter = "-";
    
    if (strFecha.indexOf("/") != -1) {
        splitter = "/";
    }
    
    var indexDia = 2;
    var indexAnio = 0;
    
    if (strFecha.split(splitter)[0].length == 2) {
        indexDia = 0;
        indexAnio = 2;
    }
    
    var dia = strFecha.split(splitter)[indexDia];
    var mes = parseInt(strFecha.split(splitter)[1]);
    
    var formatDate = dia + "/"+ months[mes-1];

   	return formatDate;
}

function formatFechaComprobante(date, separator) {
    
    var splitter = "-";
    if (date.indexOf("/") > 0) {
        splitter = "/";
    }
    
    var indexDia = 2;
    var indexMes = 1;
    var indexAnio = 0;
    
    if (date.split(splitter)[0].length == 2) {
        indexDia = 0;
        indexAnio = 2;
    }
    
    var dia = date.split(splitter)[indexDia];
    var mes = date.split(splitter)[indexMes];
    var anio = date.split(splitter)[indexAnio];
    
    return dia + separator + mes + separator + anio;
    
}

function mostrarUltimos5Digitos(numeroCuenta) {
	var numeroCuentaOculto = '';
	
	for (i = 0; i < numeroCuenta.length; i++) {
		if (i < numeroCuenta.length - 5) {
			numeroCuentaOculto += '*';
		} else {
			numeroCuentaOculto += numeroCuenta.charAt(i);
		}
	}
	
	return numeroCuentaOculto;
}

function mostrarUltimos6Digitos(numeroCuenta) {
    var numeroCuentaOculto = '';
    
    for (i = 0; i < numeroCuenta.length; i++) {
        if (i < numeroCuenta.length - 6) {
            numeroCuentaOculto += '*';
        } else {
            numeroCuentaOculto += numeroCuenta.charAt(i);
        }
    }
    
    return numeroCuentaOculto;
}


function substring(texto, length){
	var value = texto;
	if (texto.length > length){
		return texto.substring(0,length);
	}
	return value;
}

function replaceAll(string, find, replace) {
    return string.replace(new RegExp(find, 'g'), replace);
}



//pasar de YYYY-MM-DD a DD/MM/YYYY
function formateoDeFecha(fecha) {
    
    //fecha=replaceAll(fecha,'-','/');
    var dia=fecha.substring(8,10);
    var mes=fecha.substring(5,7);
    var anio=fecha.substring(0,4);
    
    fecha=dia+"/"+mes+"/"+anio;
    
    return fecha;
    
}

function getTipoCuentaName(TipoCuentaNumber){
    for (var key in CATALOGO_TIPO_CUENTA) {
        if (CATALOGO_TIPO_CUENTA[key].value == TipoCuentaNumber) {
            return CATALOGO_TIPO_CUENTA[key].name;
        }
    }
}

function returnResponseMostrarDetallesDeComprobante(jsonResponse, folio) {
    console.log("*****returnResponseMostrarDetallesDeComprobante jsonResponse "+jsonResponse+"\nfolio "+folio);
    var result = JSON.parse(jsonResponse);
	
	if (result != undefined){
        console.log("returnResponseMostrarDetallesDeComprobante folio "+folio);
    	$.each(result.respuesta.lcMovimientos,function(key, value)
               {
               if (value.folio == folio){
               //Seteamos los label.
               $('#lblNUMFOLOPERACION').text(value.folio);
               console.log("returnResponseMostrarDetallesDeComprobante lblNUMFOLOPERACION "+value.folio);
   
          
               
               
               
               
              // $('#lblNUMFECOPERACION').text(formateoDeFecha(value.fechaOperacion));
               
        
               
               $('#lblNUMFECOPERACION').text(value.fechaOperacion);

               horaOp=value.horaOperacion.replace(".",":");
               horaOp=horaOp.replace(".",":");
   
               $('#lblNUMHROPERACION').text(horaOp);//+":00");
               
               
               
               
               
               $('#lblDESCONCEPTO').text(substring(value.descripcionOperacion,12));
               
               
               
               //importeconDecimalesformatearImporte(value.importe)
               //alert(value.importe);
               
               $('#lblNUMIMPORTE').text("$ "+value.importe);
               //alert(value.cuentaPrimaria);
               
               longitudCuenta=value.cuentaPrimaria.toString().length;
               //alert(longitudCuenta);
               var cuentaOculta="*"+value.cuentaPrimaria.toString().substring(longitudCuenta-5);
               $('#lblNUMTARJETA').text(mostrarUltimos6Digitos(cuentaOculta));
               
               $('#lblNUMCUENRETIRO').text(value.cuentaAsociada);
               $('#lblHEADERCONCEPTO').text(value.descripcionOperacion);
               
               //Relleno comprobante dial
               $('#lblNUMFOLOPERACION_dial').text(value.folio);
              // $('#lblNUMHROPERACION_dial').text(value.horaOperacion);
                
                   $('#lblNUMFECOPERACION_dial').text(value.fechaOperacion);
               var horaOp=value.horaOperacion.replace(".",":");
               $('#lblNUMHROPERACION_dial').text(horaOp.replace(".",":"));
                
               
               $('#lblDESCONCEPTO_dial').text(substring(value.descripcionOperacion,12));
               $('#lblNUMIMPORTE_dial').text("$ "+value.importe);
               $('#lblNUMTARJETA_dial').text(mostrarUltimos6Digitos(value.cuentaPrimaria.toString()));
               $('#lblNUMCUENRETIRO_dial').text(value.cuentaAsociada);
               $('#lblHEADERCONCEPTO_dial').text(value.descripcionOperacion);
               
               $('#tabla-comprobantes-div').css('display', 'none');
               $('#detalles-comprobantes').css('display', 'block');
               
               return;
               }
               });
    }
    console.log("FIN returnResponseMostrarDetallesDeComprobante");
}

function mostrarDetallesDeComprobante(folio) {
	console.log("inicio mostrarDetallesDeComprobante folio "+folio);
	var numCuenta = $('#cboNUMCUENTA').val();
	var tipoOperacion = $('#cboTIPODEOPER').val();
	var numPeriodo =$('#cboNUMPERIODO').val();
	var cveComprobantes =$('#cveComprobantes').val();
	//var tipFunc = $('#lblTPOPERACION').val();
   // var otpVal = document.getElementById("tokenValue").value;
    var otpVal = "11111111";

    
	var datosAplicativos =
    {
    usuario: usuario_global, acceso: acceso_usr_global, idPeriodo: numPeriodo, tipoOperacion: tipoOperacion, claveOperaciones: claveOperaciones, otp: otpVal, tipoEjecucion: tipoEjecucionC
    };
    
    console.log("usuario "+usuario_global+" acceso "+acceso_usr_global+" idPeriodo "+numPeriodo +
                " tipoOperacion "+tipoOperacion+" claveOperaciones "+claveOperaciones+" otp "+otpVal+" tipoEjecucion "+tipoEjecucionC);
    
	// Consultamos comprobante
	parent.generaComprobantesDelegate.mostrarOpciones(datosAplicativos, folio, returnResponseMostrarDetallesDeComprobante, returnError );
}


function muestraComprobante(){
    console.log("abriendo dialog");
	var theDialog = $("#dialog").dialog(optComprobante);
    theDialog.dialog("open");
    parent.document.getElementById("sombraCabecera").style.backgroundColor = "rgba(3,3,3,0.6)";
    parent.document.getElementById("sombraCabecera").style.visibility = "visible";
    parent.document.getElementById("sombraCabecera").style.height = "11.1%";

    
    parent.document.getElementById("sombraCabecera").style.top = "-5px";
    
    
    parent.document.getElementById("sombraFooter").style.backgroundColor = "rgba(3,3,3,0.6)";
    
    parent.document.getElementById("sombraFooter").style.height = "5%";
    parent.document.getElementById("sombraFooter").style.top = "96.0%";
    parent.document.getElementById("sombraFooter").style.visibility = "visible";
    
    
    parent.document.getElementById("imgMenu").style.zIndex="-1";
    
}



function returnResponseMostrarOpciones (jsonResponse, portfolio) {
    console.log("*****returnResponseMostrarOpciones jsonResponse	"+jsonResponse+" portfolio "+portfolio);
    var result = JSON.parse(jsonResponse);
    
	if (result != undefined){
        var folderName = "BCOM/"+JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
        
    	$.each(result.respuesta.lcMovimientos,function(key, value)
               {
               console.log("returnResponseMostrarOpciones dentro folio "+value.folio+" portfolio "+portfolio);
               if (value.folio == portfolio){
               value.leido = false;
               
               //var fechaOperacion = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.fechaservidor;
               //fechaOperacion = replaceAll(fechaOperacion,'/','');
               //console.log("fechaOperacion "+fechaOperacion);

               //var horaOperacion = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.horaservidor;
               //horaOperacion = replaceAll(horaOperacion,':','')c
               //console.log("horaOperacion "+horaOperacion);
               
               var fechaActual= new Date();
               var diaActual=fechaActual.getDate();
               
               if (diaActual.toString().length<2){
               diaActual="0"+diaActual.toString();
               }
               
               
               var mesActual=fechaActual.getMonth()+1;
               
               if (mesActual.toString().length<2){
               mesActual="0"+mesActual.toString();
               }
               
               
               var horaActual=fechaActual.getHours();
               
               if (horaActual.toString().length<2){
               horaActual="0"+horaActual.toString();
               }
               
               var minutoActual=fechaActual.getMinutes();
               
               if (minutoActual.toString().length<2){
               minutoActual="0"+minutoActual.toString();
               }
               
               
               
               var segundoActual=fechaActual.getSeconds();
               
               if (segundoActual.toString().length<2){
               segundoActual="0"+segundoActual.toString();
               }
               
               
               
               var fechaHoraOperacion = diaActual+""+(mesActual)+""+fechaActual.getFullYear()+""+horaActual+""+minutoActual+""+segundoActual;
               
               console.log("FechaHoraOperacion "+fechaHoraOperacion);
               
               var jsonName = replaceAll(value.descripcionOperacion, ' ','')+"imd_consulta_comprobante_op"+fechaHoraOperacion+"_"+value.folio;
               console.log("jsonName "+jsonName);

               //si no se hace el guardado dos veces
               //en el success de leerImagenComprobante
               //ya se guarda el pdf a partir del png
              // guardarPDF("body-comprobante-toexport", jsonName, void(0), void(0));
               
               //alert("entra al if de comprobar folio");
               
               parent.generaComprobantesDelegate.leerImagenComprobante("comprobante-exportar", jsonName, void(0), void(0))
               console.log('Almacenado comprobante '+portfolio);
               
               return;
               }
               });
	}
    $("body").removeClass("loading");
    
    $(".sub-min-comprobante").hide();
    
}

function returnError (errorMessage) {

    console.log("ERROR "+errorMessage);
    
    parent.hideLoadingLayer();
    
    parent.baseViewController.validaLocation('isMisCuentas', 'nb-comprobantes', '');
}


function quitarFocoInputToken (){
    
    var inputToken = document.getElementById("inputToken");
    inputToken.blur();
    
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
    /*
    parent.document.getElementById("dialogHide").innerHTML = "";
    parent.document.getElementById("dialogHide").style.display = "block";
    */
    
    var fechaFinal= parent.document.getElementById('lblNUMFECOPERACION').innerHTML;
    fechaFinal=formatearFechaParaComprobante(fechaFinal);
    
    
    //cargar la hora del comprobante
    var date = new Date();
    var horaFinal= parent.document.getElementById('lblNUMHROPERACION').innerHTML;
    horaFinal=formatearHoraParaComprobante(horaFinal);
    
    var folioOp=parent.document.getElementById('lblNUMFOLOPERACION').innerHTML;
    
    var nombreComprobante=fechaFinal+"_"+horaFinal+"_"+folioOp+"_"+tipoOperacion;
    
  //  parent.document.getElementById("dialogHide").innerHTML = parent.document.getElementById("dialContainer").innerHTML;
    
    parent.generaComprobantesDelegate.leerImagenComprobante('dialContainer',nombreComprobante,void(0),void(0));
    
    
}


