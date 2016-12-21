var dpx1;
var dpy1;
var dpx2;
var dpy2;

var dp2x1;
var dp2y1;
var dp2x2;
var dp2y2;

var dp3x1;
var dp3y1;
var dp3x2;
var dp3y2;

var dp4x1;
var dp4y1;
var dp4x2;
var dp4y2;

var account;
var accountx;
var accounty;
var accountx2;
var accounty2;

var listaCuentasOrigen;
var catalogoCorrespondencias;
var reglasDeNegocio;
var tarjetasDeDebito;
var tarjetasDeCredito;

var TIPO_CLABE = "CLABE";
var TIPO_TDD = "TDD";
var DIVISA_MXP = "MXP";

var TIPO_AH="AH";
var TIPO_CH="CH";
var TIPO_LI="LI";
var TIPO_TC="TC";
var TIPO_IN="IN";
var TIPO_TP="TP";

var dragNumber = 0;
var dropNumber = 0;
var divSombra;
var acceso_usr_global;
var usuario_global;

var otrosBancosCCheqNuevaCta = false;
var otrosBancosCCheqDebito = false;
var otrosBancosCCheqCredito = false;

/**
 * Catálogo con los tipos de cuenta
 */
var CATALOGO_TIPO_CUENTA = {
    SINCHEQ : {value: TIPO_AH, name: "Sin/ cheq"},
    CONCHEQ: {value: TIPO_CH, name: "Con/ cheq"},
    LIBRETON : {value: TIPO_LI, name: "Libretón"},
    TDC : {value: TIPO_TC, name: "TDC"},
    INV : {value: TIPO_IN, name: "Inversiones"},
    TP : {value: TIPO_TP, name: "TDC Prepago"}
};

/**
 * Carga cuentas origen
 */
function cargarCuentasOrigen(){
    console.log("cargarCuentasOrigen INICIO");
    /* Lee del objeto sessionStorage y parsea a JSON */
    if ((sessionStorage.jsonPosicion != null) && (sessionStorage.jsonPosicion.length > 0) && (typeof sessionStorage.jsonPosicion != "undefined")) {
        var pg = JSON.parse(sessionStorage.jsonPosicion);
        if (pg != null){
            successCargaCuenta(pg.posicionGlobal);
        }else{
            fail();
        }
    }
    console.log("cargarCuentasOrigen FIN");
}

/**
 * Carga de cuentas origen
 * @param posicionGlobal
 */
function successCargaCuenta (posicionGlobal){
    
    console.log("successCargaCuenta INICIO");
    var saldo;
    var numero;
    
    tarjetasDeDebito = posicionGlobal.asuntos.lista_cuentas_mxp;
    console.log("successCargaCuenta tarjetasDeDebito length "+tarjetasDeDebito.length);
    
    for ( var i = 0; i < tarjetasDeDebito.length; i++) {
        if ((typeof tarjetasDeDebito[i].alias == "undefined") || (tarjetasDeDebito[i].alias == null) || (tarjetasDeDebito[i].alias == "")) {
            tarjetasDeDebito[i].alias = getTipoCuentaName(tarjetasDeDebito[i].tipo);
            console.log("tarjetasDeDebito["+i+"].id "+tarjetasDeDebito[i].id);
        }
    }
    
    tarjetasDeCredito = posicionGlobal.asuntos.lista_tarjetascredito;
    console.log("successCargaCuenta tarjetasDeCredito length "+tarjetasDeCredito.length);
    
    for ( var i = 0; i < tarjetasDeCredito.length; i++) {
        if ((typeof tarjetasDeCredito[i].alias == "undefined") || (tarjetasDeCredito[i].alias == null) || (tarjetasDeCredito[i].alias == "")) {
            tarjetasDeCredito[i].alias = getTipoCuentaName(tarjetasDeCredito[i].tipo);
            console.log("tarjetasDeCredito["+i+"].id "+tarjetasDeCredito[i].id);
        }
    }
    
    listaCuentasOrigen = tarjetasDeDebito.concat(tarjetasDeCredito);
    console.log("successCargaCuenta listaCuentasOrigen length "+listaCuentasOrigen.length);
    
    console.log("Lista total de cuentas origen:");
    for ( var i = 0; i < listaCuentasOrigen.length; i++) {
        console.log("Id Cuenta = ", listaCuentasOrigen[i].id);
        console.log("Alias = ", listaCuentasOrigen[i].alias);
    }
    
    $.each(listaCuentasOrigen,function(key, value)
	{
           
           if (	value.divisa == DIVISA_MXP &&
               (
                value.tipo == TIPO_AH || value.tipo == TIPO_CH ||
                value.tipo == TIPO_LI || value.tipo == TIPO_TC
                )
               ){
           var alias = value.alias;
           if (typeof alias == undefined || alias == ""){
            //Si la cuenta no tiene un alias se desplegará una descripción del tipo de cuenta que se obtendrá del catálogo de tipos de cuenta.
                alias = getTipoCuentaName(value.tipo);
           }
           
           if(alias.length >10){
        	   alias = alias.slice(10);
           }
           if(value.tipo == TIPO_TC){
	           saldo = value.saldofecha;
	           numero = mostrarUltimos5Digitos (value.numero.toString());           
           }else{
	           saldo = value.saldo_disponible;
	           numero = value.numero;
           }
           
           createDragButton("transferir-otrosbancos-drag-"+(key+1), "drag-t"+(key=="0"?"":key+1), alias, formatNumberDolar(saldo), numero.slice(-10) , value.divisa,value.id,value.tipo,key+1);
           createDropButton("transferir-otrosbancos-drop-"+(key+1), "drop-t"+(key=="0"?"":key+1), alias, formatNumberDolar(saldo), numero.slice(-10) , value.divisa,value.id,value.tipo,key+1);
           
           dragNumber++;
           
           createTouchstartDragButton(key, value.tipo, value.id, value.numero, false);
           
           }
           
           acceso_usr_global = posicionGlobal.acceso_usr;
           usuario_global = posicionGlobal.usuario_usr;
	});
    account = $("#nueva").position();
    accountx = account.left;
    accounty = account.top;
    accountx2 = accountx + $("#nueva").width();
    accounty2 = accounty + $("#nueva").height();
    
    $(".transferir-otrosbancos-div-drag").draggable();
    $("#loadingRetiro").hide();
}


function fail(){
    mostrarError("Error al obtener PosicionGlobal");
    $("#loadingRetiro").hide();
}

/**
 * Crea el div correspondiente a los botones draggables
 * @param divId
 * @param tableId
 * @param alias
 * @param saldo_disponible
 * @param numero
 * @param divisa
 */
function createDragButton(divId, tableId, alias, saldo_disponible, numero, divisa,id,tipo,cont){
    console.log("createDragButton divId "+divId);
    var newLi = document.createElement("li");
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "transferir-otrosbancos-div-drag");
    var hiddenValue = document.createElement("div");
    
    newDiv.setAttribute("draggable", true);
    newDiv.setAttribute("id", divId);
    hiddenValue.setAttribute("id","drag_id_account-"+cont);
	hiddenValue.setAttribute("style","displany:none");
    hiddenValue.setAttribute("value",id);
    hiddenValue.setAttribute("data-type",tipo);
    hiddenValue.setAttribute("saldo-val",saldo_disponible);    
    hiddenValue.setAttribute("account-number",numero);
    
    var newTable = document.createElement("table");
    newTable.setAttribute("id", tableId);
    
    var fila1 = "transferir-otrosbancos-tab-filauno";
    var fila2 = "transferir-otrosbancos-tab-filados";
    
    //First row
    createTRDragButton(fila1,newTable, alias, saldo_disponible);
    
    //Second row
    createTRDragButton(fila2,newTable, numero, divisa);
    
    newDiv.appendChild(hiddenValue);
    newDiv.appendChild(newTable);
    newLi.appendChild(newDiv);
    
    
    if (dragNumber > 3){
        listaAzul = listaAzulOculta;
    }
    
    listaAzul.appendChild(newLi);
    
}


/**
 * Crea la fila de la tabla del botón draggable
 * @param newTable
 * @param valueTd1
 * @param valueTd2
 */
function createTRDragButton(fila,newTable, valueTd1, valueTd2){
    
    var tr_first = document.createElement("tr");
    tr_first.setAttribute("class",fila);
    var td_left = document.createElement("td");
    td_left.setAttribute("class", "transferir-otrosbancos-tab-columna-izq");
    td_left.appendChild(document.createTextNode(valueTd1));
    tr_first.appendChild(td_left);
    var td_right = document.createElement("td");
    td_right.setAttribute("class", "transferir-otrosbancos-tab-columna-der");
    td_right.appendChild(document.createTextNode(valueTd2));
    tr_first.appendChild(td_right);
    
    newTable.appendChild(tr_first);
}


/**
 * Define el evento touchstart del botón draggable
 * @param key
 * @param tipoCuenta
 * @param idCuenta
 */
function createTouchstartDragButton(key, tipoCuenta, idCuenta, numeroCuenta, allowSameAccount){
    
    console.log("createTouchstartDragButton key"+key+ " id #transferir-otrosbancos-drag-"+(key+1)+" tipoCuenta "+tipoCuenta+" idCuenta "+idCuenta+" numeroCuenta "+numeroCuenta+" allowSameAccount "+allowSameAccount);
    
    $("#transferir-otrosbancos-drag-"+(key+1)).on("touchstart", function(e){
                                                  
                                                  $(this).addClass("dragEnable");
                                                  
                                                  modifyZIndex(allowSameAccount, numeroCuenta);
                                                  
                                                  $("#transferir-otrosbancos-drag-"+(key+1)).css({"z-index": "10000", "opacity": "1"});
                                                  
                                                  dragSelected = $("#transferir-otrosbancos-drag-"+(key+1));
                                                  originalPosition = $("#transferir-otrosbancos-drag-"+(key+1)).position();
                                                  tipoCuentaSelected = getTipoCuentaName(tipoCuenta);
                                                  idCuentaOrigen = idCuenta;
                                                  });
    
}


/**
 * Modifica z-index de los elementos de la pantalla
 */
function modifyZIndex(allowSameAccount, dragElementAccountNumber){
    console.log("INICIO modifyZIndex allowSameAccount "+allowSameAccount+" dragElementAccountNumber "+dragElementAccountNumber);
    
    //z-index div contenedor
    $("#todo").css({"z-index":"0"});
    
    $("#nueva").css({"z-index":"10", "opacity":"1"});
    
    //z-index botones drop
    $(".dropElement").each(function() {
                           var elClass = $(this).attr("class");
                           var elementId = $(this).attr("id");
                           var thisAccount = $("#"+elementId+"_asunto").val();
                           console.log("dragElementAccountNumber "+dragElementAccountNumber+" thisAccount "+thisAccount);
                           
                           if( (elClass.indexOf("disableDropEl")<0) && ( (allowSameAccount == true) || (dragElementAccountNumber != thisAccount) ) ){
                           $(this).css({"z-index":"10", "opacity": "1"});
                           }else{
                           $(this).css({"z-index":"0", "opacity": "0.3"});
                           }
                           });
    
    //z-index botones dragg
    $("#listaAzul li > div").each(function (){
                                  var elClass = $(this).attr("class");
                                  
                                  if( elClass.indexOf("dragEnable") >= 0 ){
                                  $(this).css({"z-index":"1000", "opacity": "1", "visibility":"visible"});
                                  }else{
                                  $(this).css({"z-index": "0", "opacity": "0.3", "visibility":"visible"});
                                  }
                                  });
    
}

/**
 * Crea el div correspondiente a los botones droppables
 * @param divId
 * @param classDivId
 * @param tableId
 * @param nomCorto
 * @param asuntoAbono
 * @param tipoCuenta
 * @param divisa
 * @param idInputHidden
 * @param idCuenta
 */

function createDropButton(divId, tableId, alias, saldo_disponible, numero, divisa,id,tipo,cont){
    console.log("createDropButton divId "+divId);
    var newLi = document.createElement("li");
    var newDiv = document.createElement("div");
    var hiddenValue = document.createElement("div");
    
    newDiv.setAttribute("class","dropElement");
    newDiv.setAttribute("id", divId);
    hiddenValue.setAttribute("id","drop_id_account-"+cont);
	hiddenValue.setAttribute("style","displany:none");
    hiddenValue.setAttribute("value",id);
    hiddenValue.setAttribute("data-type",tipo);
    
    var newTable = document.createElement("table");
    newTable.setAttribute("id", tableId);
    
    var fila1 = "transferir-otrosbancos-tab-filauno";
    var fila2 = "transferir-otrosbancos-tab-filados";
    
    //First row
    createTRDropButton(fila1,newTable, alias, saldo_disponible);
    
    //Second row
    createTRDropButton(fila2,newTable, numero, divisa);
    
    newDiv.appendChild(hiddenValue);
    newDiv.appendChild(newTable);
    newLi.appendChild(newDiv);
    
    
    if (dragNumber > 3){
        listaGris = listaGrisOculta;
    }
    
    listaGris.appendChild(newLi);
    
}


/**
 *  Crea la fila de la tabla del botón droppable
 * @param newTable
 * @param trClass
 * @param tdLeftClass
 * @param tdRightClass
 * @param valueTd1
 * @param valueTd2
 */
function createTRDropButton(fila,newTable,valueTd1, valueTd2){
    
    var tr_first = document.createElement("tr");
    tr_first.setAttribute("class",fila);
    var td_left = document.createElement("td");
    td_left.setAttribute("class", "transferir-otrosbancos-tab-columna-izq");
    td_left.appendChild(document.createTextNode(valueTd1));
    tr_first.appendChild(td_left);
    var td_right = document.createElement("td");
    td_right.setAttribute("class", "transferir-otrosbancos-tab-columna-der");
    td_right.appendChild(document.createTextNode(valueTd2));
    tr_first.appendChild(td_right);
    
    newTable.appendChild(tr_first);
    
    
}

/**
 * draggable
 */
$.fn.draggable = function () {
    var dp = $("#transferir-otrosbancos-drop-1").position();
    var dpx1 = dp.left;
    var dpy1 = dp.top;
    var dpx2 = dpx1 + $("#transferir-otrosbancos-drop-1").width();
    var dpy2 = dpy1 + $("#transferir-otrosbancos-drop-1").height();
    
    var dp2 = $("#transferir-otrosbancos-drop-2").position();
    var dp2x1 = dp2.left;
    var dp2y1 = dp2.top;
    var dp2x2 = dp2x1 + $("#transferir-otrosbancos-drop-2").width();
    var dp2y2 = dp2y1 + $("#transferir-otrosbancos-drop-2").height();
    
    var dp3 = $("#transferir-otrosbancos-drop-3").position();
    var dp3x1 = dp3.left;
    var dp3y1 = dp3.top;
    var dp3x2 = dp3x1 + $("#transferir-otrosbancos-drop-3").width();
    var dp3y2 = dp3y1 + $("#transferir-otrosbancos-drop-3").height();
    
    var dp4 = $("#transferir-otrosbancos-drop-4").position();
    var dp4x1 = dp4.left;
    var dp4y1 = dp4.top;
    var dp4x2 = dp4x1 + $("#transferir-otrosbancos-drop-4").width();
    var dp4y2 = dp4y1 + $("#transferir-otrosbancos-drop-4").height();
    var offset = null;
    var account = $("#nueva").position();
    var accountx = account.left;
    var accounty = account.top;
    var accountx2 = accountx + $("#nueva").width();
    var accounty2 = accounty + $("#nueva").height();
    
    var start = function (e) {
        console.log("INICIO start ");
        var orig = e.originalEvent;
        $(this).css({"z-index":"1000"});
        var pos = $(this).position();
        divSombra = document.getElementById("sombra");
        divSombra.style.visibility = "visible";
        parent.document.getElementById("sombraCabecera").style.visibility = "visible";
        
        var divOrigen = dragSelected[0].childNodes[0];
        idCuentaOrigen = divOrigen.getAttribute("value");
        var tipoCuentaOrigen = divOrigen.getAttribute("data-type");
        
        var divDestino1 = document.getElementById("transferir-otrosbancos-drop-1").childNodes[0];
        var idCuentaDestino1 = divDestino1.getAttribute("value");
        var tipoCuentaDestino1 = divDestino1.getAttribute("data-type");
        
        var divDestino2 = document.getElementById("transferir-otrosbancos-drop-2").childNodes[0];
        var idCuentaDestino2 = divDestino2.getAttribute("value");
        var tipoCuentaDestino2 = divDestino2.getAttribute("data-type");
        
        var divDestino3 = document.getElementById("transferir-otrosbancos-drop-3").childNodes[0];
        var idCuentaDestino3 = divDestino3.getAttribute("value");
        var tipoCuentaDestino3 = divDestino3.getAttribute("data-type");
        
        var divDestino4 = document.getElementById("transferir-otrosbancos-drop-4").childNodes[0];
        var idCuentaDestino4 = divDestino4.getAttribute("value");
        var tipoCuentaDestino4 = divDestino4.getAttribute("data-type");
        
        $("#nueva").css("background-image","url(img/normal/Ios_Btn_Drag_Nuevo.png)");
        $("#nueva").css("color","#ffff");
        $("#nueva").css("z-index",50);
        
        if(tipoCuentaOrigen == TIPO_TC){
            
            if(tipoCuentaDestino1 != TIPO_TC){
                $("#transferir-otrosbancos-drop-1").css("background-image","url(img/normal/Ios_Btn_Drag_Gris_Push.png)");
                $("#transferir-otrosbancos-drop-1").css("z-index",50);
            }else{
                $("#transferir-otrosbancos-drop-1").css("z-index",0);
            }
            if(tipoCuentaDestino2 != TIPO_TC){
                $("#transferir-otrosbancos-drop-2").css("background-image","url(img/normal/Ios_Btn_Drag_Gris_Push.png)");
                $("#transferir-otrosbancos-drop-2").css("z-index",50);
            }else{
                $("#transferir-otrosbancos-drop-2").css("z-index",0);
            }
            if(tipoCuentaDestino3 != TIPO_TC){
                $("#transferir-otrosbancos-drop-3").css("background-image","url(img/normal/Ios_Btn_Drag_Gris_Push.png)");
                $("#transferir-otrosbancos-drop-3").css("z-index",50);
            }else{
                $("#transferir-otrosbancos-drop-3").css("z-index",0);
            }
            if(tipoCuentaDestino4 != TIPO_TC){
                $("#transferir-otrosbancos-drop-4").css("background-image","url(img/normal/Ios_Btn_Drag_Gris_Push.png)");
                $("#transferir-otrosbancos-drop-4").css("z-index",50);
            }else{
                $("#transferir-otrosbancos-drop-4").css("z-index",0);
            }
            
        }else{
            if(idCuentaOrigen != idCuentaDestino1){
                $("#transferir-otrosbancos-drop-1").css("background-image","url(img/normal/Ios_Btn_Drag_Gris_Push.png)");
                $("#transferir-otrosbancos-drop-1").css("z-index",50);
                
            }else{
                $("#transferir-otrosbancos-drop-1").css("z-index",0);
            }
            if(idCuentaOrigen != idCuentaDestino2){
                $("#transferir-otrosbancos-drop-2").css("background-image","url(img/normal/Ios_Btn_Drag_Gris_Push.png)");
                $("#transferir-otrosbancos-drop-2").css("z-index",50);
                
            }else{
                $("#transferir-otrosbancos-drop-2").css("z-index",0);
            }
            if(idCuentaOrigen != idCuentaDestino3){
                $("#transferir-otrosbancos-drop-3").css("background-image","url(img/normal/Ios_Btn_Drag_Gris_Push.png)");
                $("#transferir-otrosbancos-drop-3").css("z-index",50);
                
            }else{
                $("#transferir-otrosbancos-drop-3").css("z-index",0);
            }
            if(idCuentaOrigen != idCuentaDestino4){
                $("#transferir-otrosbancos-drop-4").css("background-image","url(img/normal/Ios_Btn_Drag_Gris_Push.png)");
                $("#transferir-otrosbancos-drop-4").css("z-index",50);
                
            }else{
                $("#transferir-otrosbancos-drop-4").css("z-index",0);
            }
            
            console.log($("#transferir-otrosbancos-drop-1").css("z-index"));
            
        }
        
        offset = { x: orig.changedTouches[0].pageX - pos.left, y: orig.changedTouches[0].pageY - pos.top};
    };
    
    var moveMe = function (e) {
        console.log("INICIO moveMe ");
        $("#div-overlay").css({"visibility":"visible"});
        e.preventDefault();
        var orig = e.originalEvent;
        $("#listaAzul").css({"z-index":"0"});
        $("#list").css({"z-index":"0"});
        $(".transferir-otrosbancos-div-drag").css({"z-index":"1000", "opacity": "0.3"});
        $(this).css({"z-index":"1001", "opacity": "1"});
        
        $(this).css({top: orig.changedTouches[0].pageY - offset.y, left: orig.changedTouches[0].pageX - offset.x });
        
        $("#nueva").css("background-image","url(img/normal/Ios_Btn_Drag_Nuevo.png)");
        $("#nueva").css("z-index",1000);
        $("#nueva").css("opacity",1);
    };
    
    var doneMe = function (e) {
        console.log("INICIO doneMe ");
        $("#div-overlay").css({"visibility":"hidden"});
        e.preventDefault();
        var orig = e.originalEvent;
        
        //p1(x1,y1)
        //------------
        //|          |
        //|     p2(x1,y1)
        //|          |
        //|          |
        //------------
        //          p1(x2,y2)
        
        var dg = dragSelected.position();
        var dgx1 = dg.left;
        var dgx2 = dgx1 + dragSelected.width();
        var dgy1 = dg.top;
        var dgy2 = dgy1 + dragSelected.height();
        
        var divOrigen = dragSelected[0].childNodes[0];
        idCuentaOrigen = divOrigen.getAttribute("value");
        var tipoCuentaOrigen = divOrigen.getAttribute("data-type");

        var cuentaDebito = false;
        for (var i = 0;(i < tarjetasDeDebito.length) && (!cuentaDebito); i++ ) {
            if ( tarjetasDeDebito[i].id == idCuentaOrigen ){
                cuentaDebito = true;
            }
        }
        var accionArrastre = (cuentaDebito)?"debito":"credito";
        console.log("doneMe cuenta Origen "+accionArrastre);        
        var saldoCuentaOrigen = divOrigen.getAttribute("saldo-val");
        var numeroCuentaOrigen = divOrigen.getAttribute("account-number");
        
        //CHECK IF DRAG IMAGE IS INSIDE DROP IMAGE
        if ((dgx1 >= (dpx1 - 10) && dgx2 <= (dpx2 + 10)) && (dgy1 >= (dpy1 - 10) && dgy2 <= (dpy2 + 10))) {
            console.log("Selecciono el drop 1.");
            dragSelected.animate({top: dpy1 + 1, left: dpx1 + 1}, 500, function(){
            	
		         var divDestino = document.getElementById("transferir-otrosbancos-drop-1").childNodes[0];
		         var idCuentaDestino = divDestino.getAttribute("value");
		         var tipoCuentaDestino = divDestino.getAttribute("data-type");
		         
		         if(tipoCuentaOrigen == TIPO_TC){	         
			         if(tipoCuentaDestino != TIPO_TC){
				         divSombra.style.visibility = "hidden";
				         parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
                         accionArrastrar(accionArrastre);
				         accionIngresar(idCuentaOrigen,idCuentaDestino, saldoCuentaOrigen, tipoCuentaOrigen, cuentaDebito, numeroCuentaOrigen);
			         }else{
			        	 returnPosition();		         
			         }
		         }else{
			         if (idCuentaDestino != idCuentaOrigen){
				         divSombra.style.visibility = "hidden";
				         parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
                         accionArrastrar(accionArrastre);
				         accionIngresar(idCuentaOrigen,idCuentaDestino, saldoCuentaOrigen, tipoCuentaOrigen, cuentaDebito, numeroCuentaOrigen);
			         }else{
			        	 returnPosition();		         
			         }	         
		         }         
            });
        }else if ((dgx1 >= (dp2x1 - 10) && dgx2 <= (dp2x2 + 10)) && (dgy1 >= (dp2y1 - 10) && dgy2 <= (dp2y2 + 10))) {
            console.log("Selecciono el drop 2.");
            dragSelected.animate({top: dp2y1 + 1, left: dp2x1 + 1}, 500, function(){
                                 
	             var divDestino =document.getElementById("transferir-otrosbancos-drop-2").childNodes[0];
	             var idCuentaDestino = divDestino.getAttribute("value");
	             var tipoCuentaDestino = divDestino.getAttribute("data-type");	         
	             if(tipoCuentaOrigen == TIPO_TC){	             
		             if(tipoCuentaDestino != TIPO_TC){
			             divSombra.style.visibility = "hidden";
			             parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
                         accionArrastrar(accionArrastre);
			             accionIngresar(idCuentaOrigen,idCuentaDestino, saldoCuentaOrigen, tipoCuentaOrigen, cuentaDebito, numeroCuentaOrigen);
		             }else{
		            	 returnPosition();		             
		             }
	             }else{
		             if (idCuentaDestino != idCuentaOrigen){
			             divSombra.style.visibility = "hidden";
			             parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
                         accionArrastrar(accionArrastre);
			             accionIngresar(idCuentaOrigen,idCuentaDestino, saldoCuentaOrigen, tipoCuentaOrigen, cuentaDebito, numeroCuentaOrigen);
		             }else{
		            	 returnPosition();		             
		             }	             
	             }                                 
             });
        }else if ((dgx1 >= (dp3x1 - 10) && dgx2 <= (dp3x2 + 10)) && (dgy1 >= (dp3y1 - 10) && dgy2 <= (dp3y2 + 10))) {
            console.log("Selecciono el drop 3.");
            dragSelected.animate({top: dp3y1 + 1, left: dp3x1 + 1}, 500, function(){
                                 
                 var divDestino =document.getElementById("transferir-otrosbancos-drop-3").childNodes[0];
                 var idCuentaDestino = divDestino.getAttribute("value");
                 var tipoCuentaDestino = divDestino.getAttribute("data-type");
                 
                 if(tipoCuentaOrigen == TIPO_TC){                 
	                    if(tipoCuentaDestino != TIPO_TC){
	                        divSombra.style.visibility = "hidden";
	                        parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
                            accionArrastrar(accionArrastre);
	                        accionIngresar(idCuentaOrigen,idCuentaDestino, saldoCuentaOrigen, tipoCuentaOrigen, cuentaDebito, numeroCuentaOrigen);
	                    }else{
	                        returnPosition();
	                    }
                 }else{
	                 if (idCuentaDestino != idCuentaOrigen){
	                    divSombra.style.visibility = "hidden";
	                    parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
                        accionArrastrar(accionArrastre);
	                    accionIngresar(idCuentaOrigen,idCuentaDestino, saldoCuentaOrigen, tipoCuentaOrigen, cuentaDebito, numeroCuentaOrigen);
	                 }else{
	                	 returnPosition();
	                 
	                 }                 
                 }
            });            
        } else if ((dgx1 >= (dp4x1 - 10) && dgx2 <= (dp4x2 + 10)) && (dgy1 >= (dp4y1 - 10) && dgy2 <= (dp4y2 + 10))) {
            console.log("Selecciono el drop 4.");
            dragSelected.animate({top: dp4y1 + 1, left: dp4x1 + 1}, 500, function(){
                                 
	             var divDestino =document.getElementById("transferir-otrosbancos-drop-4").childNodes[0];
	             var idCuentaDestino = divDestino.getAttribute("value");
	             var tipoCuentaDestino = divDestino.getAttribute("data-type");
	             	             
	             if(tipoCuentaOrigen == TIPO_TC){	             
		             if(tipoCuentaDestino != TIPO_TC){
		                divSombra.style.visibility = "hidden";
		                parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
                        accionArrastrar(accionArrastre);
		                accionIngresar(idCuentaOrigen,idCuentaDestino, saldoCuentaOrigen, tipoCuentaOrigen, cuentaDebito, numeroCuentaOrigen);
		             }else{
		                returnPosition();		             
		             }
	             }else{
		             if (idCuentaDestino != idCuentaOrigen){
		                divSombra.style.visibility = "hidden";
		                parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
                        accionArrastrar(accionArrastre);
		                accionIngresar(idCuentaOrigen,idCuentaDestino, saldoCuentaOrigen, tipoCuentaOrigen, cuentaDebito, numeroCuentaOrigen);
		             
		             }else{
		                returnPosition();		             
		             }		             
	             }
             });
        }else if((dgx1 >= (accountx - 10) && dgx2 <= (accountx2 + 10)) && (dgy1 >= (accounty - 10) && dgy2 <= (accounty2 + 10))){
            console.log("Selecciono nueva cuenta");
            dragSelected.animate({top: accounty + 1, left: accountx + 1}, 500, function(){
                        divSombra.style.visibility = "hidden";
                        parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
                        accionArrastrar("otrosbancos-nuevaCta", idCuentaOrigen, "nuevaCuenta");
                        accionIngresar(idCuentaOrigen,"nuevaCuenta", saldoCuentaOrigen, tipoCuentaOrigen, cuentaDebito, numeroCuentaOrigen);
                    });
            
        }else{
            returnPosition();
        }
    };
    
    this.bind("touchstart", start);
    this.bind("touchmove", moveMe);
    this.bind("touchend", doneMe);
};

/**
 * accionArrastrar
 * @param valor
 * @param cuentaOrigen
 * @param cuentaDestino
 */
function accionArrastrar(valor){
	console.log("accionArrastrar valor "+valor);
    if (valor == "con-cheq") {
        conCheq();
    }else if (valor == "ahorradito" ) {
    }else if(valor == "mi-quince"){
        miQuince();
    }else if(valor == "tdc"){
        TDC();
    }else if(valor == "otrosbancos-nuevaCta"){
        otrosBancosNvaCta();
    }else if(valor == "debito"){
        otrosBancosDebito();
    }
    else if(valor == "credito"){
        otrosBancosCredito();
    }
}


//funciones agregadas
function miQuince(){
	otrosBancosCCheqNuevaCta = false;
	otrosBancosCCheqDebito = false;
	otrosBancosCCheqCredito = false;
}

function TDC(){
	otrosBancosCCheqNuevaCta = false;
	otrosBancosCCheqDebito = false;
	otrosBancosCCheqCredito = false;
}

function conCheq(){
	otrosBancosCCheqNuevaCta = false;
	otrosBancosCCheqDebito = false;
	otrosBancosCCheqCredito = false;
}

function ctasBBVACCheqNuevaCta(){
	otrosBancosCCheqNuevaCta = false;
	otrosBancosCCheqDebito = false;
	otrosBancosCCheqCredito = false;
}

function ctasBBVACCheqFrecuente(){
	otrosBancosCCheqNuevaCta = false;
	otrosBancosCCheqDebito = false;
	otrosBancosCCheqCredito = false;
}

function otrosBancosNvaCta(){
	otrosBancosCCheqNuevaCta = true;
	otrosBancosCCheqDebito = false;
	otrosBancosCCheqCredito = false;
}

function otrosBancosDebito(){
	otrosBancosCCheqNuevaCta = false;
	otrosBancosCCheqDebito = true;
	otrosBancosCCheqCredito = false;
}

function otrosBancosCredito(){
	otrosBancosCCheqNuevaCta = false;
	otrosBancosCCheqDebito = false;
	otrosBancosCCheqCredito = true;
}

var array;

/**
 * inicializarCatalogoCorrespondencias
 */
function inicializarCatalogoCorrespondencias() {
    catalogoCorrespondencias = obtenerCatalogoCorrespondenciasTipoDeCuenta();
}


/**
 * Get nombre por key
 * @param TipoCuentaNumber
 * @returns
 */
function getTipoCuentaName(tipoCuentaNumber){
    for (var key in CATALOGO_TIPO_CUENTA) {
        if (CATALOGO_TIPO_CUENTA[key].value == tipoCuentaNumber) {
            return CATALOGO_TIPO_CUENTA[key].name;
        }
    }
}

/**
 * obtenerDatosCuenta
 * @param claveCuenta
 * @returns
 */
function obtenerDatosCuenta(claveCuenta) {
    var datosCuenta;
    
    var i = 0;
    var encontrado = false;
    
    while ((i < listaCuentasOrigen.length) && (!encontrado)) {
        
        if (listaCuentasOrigen[i].id == claveCuenta) {
            console.log("Cuenta encontrada en listaCuentasOrigen");
            encontrado = true;
            
            datosCuenta = new DatosCuenta(listaCuentasOrigen[i].id, listaCuentasOrigen[i].alias, listaCuentasOrigen[i].tipo);
            
        } else {
            i++;
        }
    }
    
    return datosCuenta;
}

/**
 * obtenerCatalogoCorrespondenciasTipoDeCuenta
 * @returns
 */
function obtenerCatalogoCorrespondenciasTipoDeCuenta() {
    var catalogoDescripcionDeTipos = JSON.parse(sessionStorage.jsonReglasNegocio).catalogos.descripcionDeTipos.cuentasInterbancarios.ID;
    
    console.log("Catalogo descripción de tipos");
    
    for (var i = 0; i < catalogoDescripcionDeTipos.length; i++) {
        console.log(catalogoDescripcionDeTipos[i].tipo + " = " + catalogoDescripcionDeTipos[i].descripcion);
    }
    
    return catalogoDescripcionDeTipos;
}

/**
 * obtenerCorrespondenciaTipoDeCuenta
 * @param tipoCuenta
 * @returns {Array}
 */
function obtenerCorrespondenciaTipoDeCuenta(tipoCuenta) {
    
    var descripcionCuenta;
    var arrayCuentasEquivalentes = [];
    
    var encontrado = false;
    var i = 0;
    while ((i < catalogoCorrespondencias.length) && (!encontrado)) {
        if (catalogoCorrespondencias[i].tipo == tipoCuenta) {
            encontrado = true;
            descripcionCuenta = catalogoCorrespondencias[i].descripcion;
            
            if ((descripcionCuenta == TIPO_CLABE) || (descripcionCuenta == TIPO_TDD)) {
                arrayCuentasEquivalentes.push(TIPO_CH);
                arrayCuentasEquivalentes.push(TIPO_LI);
                arrayCuentasEquivalentes.push(TIPO_AH);
                
            } else {
                arrayCuentasEquivalentes.push(descripcionCuenta);
            }
            
        } else {
            i++;
        }
    }
    
    if (!encontrado) {
        arrayCuentasEquivalentes.push(tipoCuenta);
    }
    
    return arrayCuentasEquivalentes;
    
}

/** Método encargado de obtener las reglas de negocio permitidas para las transferencias interbancarias */
function obtenerReglasDeNegocio() {
    inicializarCatalogoCorrespondencias();
    
    var cargos = JSON.parse(sessionStorage.jsonReglasNegocio).aplicaciones.traspasosInterBancarios.operacion.cargo;
    
    console.log("Cargos");
    console.log(cargos);
    
    reglasDeNegocio = [];
    
    for ( var i = 0; i < cargos.length; i++) {
        
        // Se leen las cuentas permitidas como cuenta origen
        var cuentasDeCargo = cargos[i].cuentas.cuenta;
        
        
        // Se leen las cuentas permitidas como cuenta destino
        var cuentasDeAbono = cargos[i].abono.cuentas.cuenta;
        
        // Variables temporales en las que se almacenan las correspondencias de los tipos de cuenta
        // Como puede ocurrir que un tipo se corresponda con más de una cuenta, el resultado se almacena en un array que luego habrá
        // que recorrer elemento a elemento para pasarlo a la lista definitiva (de otra forma, la lista definitiva tendría elementos
        // que, a su vez, serían también arrays.
        var listaCorrespondenciaCuentasDeCargo = [];
        var listaCorrespondenciaCuentasDeAbono = [];
        
        // Lista definitiva de cuentas de cargo y de abono para una misma iteración
        var listaCuentasDeCargo = [];
        var listaCuentasDeAbono = [];
        
        // Se traducen a un mismo catálogo de tipos de cuenta todos los tipos de cuenta antes de generar las reglas de negocio
        if ((typeof cuentasDeCargo == "string") && (typeof cuentasDeAbono == "string")) {
            listaCorrespondenciaCuentasDeCargo.push(obtenerCorrespondenciaTipoDeCuenta(cuentasDeCargo));
            listaCorrespondenciaCuentasDeAbono.push(obtenerCorrespondenciaTipoDeCuenta(cuentasDeAbono));
            
            for (var l = 0; l < listaCorrespondenciaCuentasDeCargo[0].length; l++) {
                listaCuentasDeCargo.push(listaCorrespondenciaCuentasDeCargo[0][l]);
            }
            
            for (var l = 0; l < listaCorrespondenciaCuentasDeAbono[0].length; l++) {
                listaCuentasDeAbono.push(listaCorrespondenciaCuentasDeAbono[0][l]);
            }
            
        } else if ((typeof cuentasDeCargo == "string") && (Object.prototype.toString.call(cuentasDeAbono) === "[object Array]")) {
            listaCorrespondenciaCuentasDeCargo.push(obtenerCorrespondenciaTipoDeCuenta(cuentasDeCargo));
            
            for (var l = 0; l < listaCorrespondenciaCuentasDeCargo[0].length; l++) {
                listaCuentasDeCargo.push(listaCorrespondenciaCuentasDeCargo[0][l]);
            }
            
            for (var k = 0; k < cuentasDeAbono.length; k++) {
                listaCorrespondenciaCuentasDeAbono.push(obtenerCorrespondenciaTipoDeCuenta(cuentasDeAbono[k]));
                
                for (var l = 0; l < listaCorrespondenciaCuentasDeAbono[k].length; l++) {
                    listaCuentasDeAbono.push(listaCorrespondenciaCuentasDeAbono[k][l]);
                }
            }
            
        } else if ((Object.prototype.toString.call(cuentasDeCargo) === "[object Array]") && (typeof cuentasDeAbono == "string")) {
            listaCorrespondenciaCuentasDeAbono.push(obtenerCorrespondenciaTipoDeCuenta(cuentasDeAbono));
            
            for (var l = 0; l < listaCorrespondenciaCuentasDeAbono[0].length; l++) {
                listaCuentasDeAbono.push(listaCorrespondenciaCuentasDeAbono[0][l]);
            }
            
            for (var j = 0; j < cuentasDeCargo.length; j++) {
                listaCorrespondenciaCuentasDeCargo.push(obtenerCorrespondenciaTipoDeCuenta(cuentasDeCargo[j]));
                
                for (var l = 0; l < listaCorrespondenciaCuentasDeCargo[j].length; l++) {
                    listaCuentasDeCargo.push(listaCorrespondenciaCuentasDeCargo[j][l]);
                }
            }
            
        } else {
            for (var j = 0; j < cuentasDeCargo.length; j++) {
                listaCorrespondenciaCuentasDeCargo.push(obtenerCorrespondenciaTipoDeCuenta(cuentasDeCargo[j]));
                
                for (var l = 0; l < listaCorrespondenciaCuentasDeCargo[j].length; l++) {
                    listaCuentasDeCargo.push(listaCorrespondenciaCuentasDeCargo[j][l]);
                }
            }
            for (var k = 0; k < cuentasDeAbono.length; k++) {
                listaCorrespondenciaCuentasDeAbono.push(obtenerCorrespondenciaTipoDeCuenta(cuentasDeAbono[k]));
                
                for (var l = 0; l < listaCorrespondenciaCuentasDeAbono[k].length; l++) {
                    listaCuentasDeAbono.push(listaCorrespondenciaCuentasDeAbono[k][l]);
                }
            }
        }
        
        // Se generan las nuevas reglas de negocio de esta iteración
        for ( var j = 0; j < listaCuentasDeCargo.length; j++) {
            for ( var k = 0; k < listaCuentasDeAbono.length; k++) {
                if (!existeReglaNegocio(listaCuentasDeCargo[j], listaCuentasDeAbono[k])) {
                    
                    var nuevaRN = new ReglaNegocio(listaCuentasDeCargo[j], listaCuentasDeAbono[k]);
                    reglasDeNegocio.push(nuevaRN);
                }
            }
        }
    }
    
    console.log("Reglas de negocio para Transferencias interbancarias");
    console.log(reglasDeNegocio);
}

/**
 * ReglaNegocio
 * @param tipoCuentaOrigen
 * @param tipoCuentaDestino
 * @returns
 */
function ReglaNegocio(tipoCuentaOrigen, tipoCuentaDestino) {
    this.tipoCuentaOrigen = tipoCuentaOrigen;
    this.tipoCuentaDestino = tipoCuentaDestino;
}

/**
 * DatosCuenta
 * @param id
 * @param alias
 * @param tipo
 * @returns
 */
function DatosCuenta(id, alias, tipo) {
    this.id = id;
    this.alias = alias;
    this.tipo = tipo;
}

/**
 * existeReglaNegocio
 * @param tipoCuentaOrigen
 * @param tipoCuentaDestino
 * @returns {Boolean}
 */
function existeReglaNegocio(tipoCuentaOrigen, tipoCuentaDestino) {
    var encontrado = false;
    var i = 0;
    while ((i < reglasDeNegocio.length) && (!encontrado)) {
        if ((reglasDeNegocio[i].tipoCuentaOrigen == tipoCuentaOrigen) && (reglasDeNegocio[i].tipoCuentaDestino == tipoCuentaDestino)) {
            encontrado = true;
        } else {
            i++;
        }
    }
    
    return encontrado;
}

/**
 * mostrarTrazaCuentasSeleccionadas
 * @param idCuentaSeleccionada
 * @param idCuentaDestino
 */
function mostrarTrazaCuentasSeleccionadas(idCuentaSeleccionada, idCuentaDestino) {
    console.log("Id cuenta origen = ", idCuentaSeleccionada);
    console.log("Nombre cuenta seleccionada = ", obtenerDatosCuenta(idCuentaSeleccionada).alias);
    console.log("Tipo cuenta seleccionada = ", obtenerDatosCuenta(idCuentaSeleccionada).tipo);
    
    console.log("Id cuenta destino = ", idCuentaDestino);
    console.log("Nombre cuenta seleccionada = ", obtenerDatosCuenta(idCuentaDestino).alias);
    console.log("Tipo cuenta seleccionada = ", obtenerDatosCuenta(idCuentaDestino).tipo);
}


/**
 * Swipe Up handler containerAzul
 * @param event
 * @param direction
 * @param distance
 * @param duration
 * @param fingerCount
 */
function moveToUpOrigen() {
    
    if (dragNumber > 3){
        
        
        var firstDiv = $("ul#listaAzul li:first div").html();
        var secondDiv = $("ul#listaAzul li:eq(1) div").html();
        var thirdDiv = $("ul#listaAzul li:eq(2) div").html();
        var forthDiv = $("ul#listaAzul li:last div").html();
        
        var numberHiddenElements = $("ul#listaAzulOculta li").length;
        console.log("numberHiddenElements "+numberHiddenElements);
        
        for (var i =0; i<numberHiddenElements; i++) {
            window[i+"HiddenElement"] =  $("ul#listaAzulOculta li:eq("+i+") div").html();
        }
        
        //Relleno lista visible
        $("ul#listaAzul li:first div").html(secondDiv);
        $("ul#listaAzul li:eq(1) div").html(thirdDiv);
        $("ul#listaAzul li:eq(2) div").html(forthDiv);
        $("ul#listaAzul li:last div").html( window[(0)+"HiddenElement"] );
        
        //Relleno lista oculta
        $("ul#listaAzulOculta li:eq("+(numberHiddenElements-1)+") div").html(firstDiv);
        
        for (var i =0; i<(numberHiddenElements-1); i++) {
            $("ul#listaAzulOculta li:eq("+i+") div").html( (window[(i+1)+"HiddenElement"]) );
        }
    }
}

/**
 * Swipe Up handler containerAzul
 * @param event
 * @param direction
 * @param distance
 * @param duration
 * @param fingerCount
 */
function moveToUpDestino() {
    
    if (dragNumber > 3){
        
        
        var firstDiv = $("ul#listaGris li:first div").html();
        var secondDiv = $("ul#listaGris li:eq(1) div").html();
        var thirdDiv = $("ul#listaGris li:eq(2) div").html();
        var forthDiv = $("ul#listaGris li:last div").html();
        
        var numberHiddenElements = $("ul#listaGrisOculta li").length;
        console.log("numberHiddenElements "+numberHiddenElements);
        
        for (var i =0; i<numberHiddenElements; i++) {
            window[i+"HiddenElement"] =  $("ul#listaGrisOculta li:eq("+i+") div").html();
        }
        
        //Relleno lista visible
        $("ul#listaGris li:first div").html(secondDiv);
        $("ul#listaGris li:eq(1) div").html(thirdDiv);
        $("ul#listaGris li:eq(2) div").html(forthDiv);
        $("ul#listaGris li:last div").html( window[(0)+"HiddenElement"] );
        
        //Relleno lista oculta
        $("ul#listaGrisOculta li:eq("+(numberHiddenElements-1)+") div").html(firstDiv);
        
        for (var i =0; i<(numberHiddenElements-1); i++) {
            $("ul#listaGrisOculta li:eq("+i+") div").html( (window[(i+1)+"HiddenElement"]) );
        }
    }
}



/**
 * Swipe Down handler containerAzul
 * @param event
 * @param phase
 * @param direction
 * @param distance
 */
function moveToDownOrigen() {
    if (dragNumber > 3){
        
        var firstDiv = $("ul#listaAzul li:first div").html();
        var secondDiv = $("ul#listaAzul li:eq(1) div").html();
        var thirdDiv = $("ul#listaAzul li:eq(2) div").html();
        var forthDiv = $("ul#listaAzul li:last div").html();
        
        
        var numberHiddenElements = $("ul#listaAzulOculta li").length;
        console.log("numberHiddenElements "+numberHiddenElements);
        
        for (var i =0; i<numberHiddenElements; i++) {
            window[i+"HiddenElement"] =  $("ul#listaAzulOculta li:eq("+i+") div").html();
        }
        
        //Relleno lista visible
        $("ul#listaAzul li:first div").html( (window[(numberHiddenElements-1)+"HiddenElement"])  );
        $("ul#listaAzul li:eq(1) div").html(firstDiv);
        $("ul#listaAzul li:eq(2) div").html(secondDiv);
        $("ul#listaAzul li:last div").html(thirdDiv);
        
        //Relleno lista oculta
        $("ul#listaAzulOculta li:eq(0) div").html(forthDiv);
        
        for (var i =1; i<numberHiddenElements; i++) {
            $("ul#listaAzulOculta li:eq("+i+") div").html( (window[(i-1)+"HiddenElement"]) );
        }
    }
}


/**
 * Swipe Down handler containerAzul
 * @param event
 * @param phase
 * @param direction
 * @param distance
 */
function moveToDownDestino() {
    if (dragNumber > 3){
        
        var firstDiv = $("ul#listaGris li:first div").html();
        var secondDiv = $("ul#listaGris li:eq(1) div").html();
        var thirdDiv = $("ul#listaGris li:eq(2) div").html();
        var forthDiv = $("ul#listaGris li:last div").html();
        
        
        var numberHiddenElements = $("ul#listaGrisOculta li").length;
        console.log("numberHiddenElements "+numberHiddenElements);
        
        for (var i =0; i<numberHiddenElements; i++) {
            window[i+"HiddenElement"] =  $("ul#listaGrisOculta li:eq("+i+") div").html();
        }
        
        //Relleno lista visible
        $("ul#listaGris li:first div").html( (window[(numberHiddenElements-1)+"HiddenElement"])  );
        $("ul#listaGris li:eq(1) div").html(firstDiv);
        $("ul#listaGris li:eq(2) div").html(secondDiv);
        $("ul#listaGris li:last div").html(thirdDiv);
        
        //Relleno lista oculta
        $("ul#listaGrisOculta li:eq(0) div").html(forthDiv);
        
        for (var i =1; i<numberHiddenElements; i++) {
            $("ul#listaGrisOculta li:eq("+i+") div").html( (window[(i-1)+"HiddenElement"]) );
        }
    }
}


/**
 * Devuelve el botón azul a su posición original
 */
function returnPosition(){
    console.log("INICIO returnPosition ");
    dragSelected.animate({top: originalPosition.top, left: originalPosition.left}, 500);
    $(".transferir-otrosbancos-div-drag").css({"z-index"	:"1000"	, "opacity"	: "1"	});
    $("#transferir-otrosbancos-drop-1").css("background-image"	,"url(img/normal/Ios_Btn_Drag_Gris.png)"	);
    $("#transferir-otrosbancos-drop-2").css("background-image"	,"url(img/normal/Ios_Btn_Drag_Gris.png)"	);
    $("#transferir-otrosbancos-drop-3").css("background-image"	,"url(img/normal/Ios_Btn_Drag_Gris.png)"	);
    $("#transferir-otrosbancos-drop-4").css("background-image"	,"url(img/normal/Ios_Btn_Drag_Gris.png)"	);
    
    
    $("#transferir-otrosbancos-drag-1").css("z-index",50);
    $("#transferir-otrosbancos-drag-2").css("z-index",50);
    $("#transferir-otrosbancos-drag-3").css("z-index",50);
    $("#transferir-otrosbancos-drag-4").css("z-index",50);
    dragSelected.css("z-index",55);


    $("#nueva").css("background-image","url(img/normal/Ios_Btn_Drag_Nuevo.png)");
    $("#nueva").css("z-index",50);
    $("#nueva").css("opacity",1)
    
    divSombra.style.visibility = "hidden";
    parent.document.getElementById("sombraCabecera"	).style.visibility = "hidden";
    
}

function accionIngresar(idCuentaOrigen, idCuentaDestino, saldoCuentaOrigen, tipoCuentaOrigen, cuentaDebito, numeroCuentaOrigen){
    array = [otrosBancosCCheqNuevaCta, otrosBancosCCheqDebito, otrosBancosCCheqCredito];
    console.log("accionIngresar cuenta origen "+idCuentaOrigen+" cuenta destino "+idCuentaDestino+" saldo cuenta origen "+saldoCuentaOrigen+" tipo cuenta origen "+tipoCuentaOrigen+" numero cuenta origen "+numeroCuentaOrigen);
    var destinyPage = "transferirOtrosBancosCCheqCreditoInicio.html";  
    
    if(otrosBancosCCheqNuevaCta){
    	destinyPage = "transferirOtrosBancosCCheqNuevaCtaInicio.html";
    	console.log("accionIngresar Nueva cuenta de inicio");
    }else if(otrosBancosCCheqDebito){
    	destinyPage = "transferirOtrosBancosCCheqDebitoInicio.html";
    	console.log("accionIngresar transferir otros bancos débito");
    }else{
    	console.log("accionIngresar transferir otros bancos crédito");
    }
    
    var cuentaRetiro = numeroCuentaOrigen+" - "+saldoCuentaOrigen+" - "+tipoCuentaOrigen;
    var tipoTarjeta = (cuentaDebito)?"Tarjeta de Débito":"Cuenta "+getDescripcionCuenta(tipoCuentaOrigen);
    var fechaOperacion = getCurrentDate();
    var url = destinyPage+"?idOrigen="+idCuentaOrigen+"&idDestino="+idCuentaDestino+"&cuentaRetiro="+cuentaRetiro+"&tipoTarjeta="+tipoTarjeta+"&fechaOperacion="+fechaOperacion;
    console.log("accionIngresar url "+url);
    
    window.setTimeout(function () {
        hideLoadingLayer();
        parent.document.getElementById("sombraCabecera").style.visibility = "hidden";
        parent.document.getElementById("contentFrame").src = url;
        }, 1000);    
    
}

/**
 * get current date
 * @returns {String}
 */
function getCurrentDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'/'+mm+'/'+yyyy;
    return today;	
}

/**
 * Get descripción cuenta por tipo
 * @param tipoCuenta
 * @returns
 */
function getDescripcionCuenta(tipoCuenta){
    var descripcionCuenta;
    var arrayCuentasEquivalentes = [];
    
    var encontrado = false;
    var i = 0;
    while ((i < catalogoCorrespondencias.length) && (!encontrado)) {
        if (catalogoCorrespondencias[i].tipo == tipoCuenta) {
            encontrado = true;
            descripcionCuenta = catalogoCorrespondencias[i].descripcion;
        } else {
            i++;
        }
    }
    
    return descripcionCuenta; 
}

/**
 * Mostrar 5 últimos dígitos
 * @param numeroCuenta
 * @returns {String}
 */
function mostrarUltimos5Digitos (numeroCuenta) {
    var numeroCuentaOculto = "";
    
    for (i = 0; i < numeroCuenta.length; i++) {
        if (i < numeroCuenta.length - 5) {
            numeroCuentaOculto = "*****";
        } else {
            numeroCuentaOculto += numeroCuenta.charAt(i);
        }
    }
    
    return numeroCuentaOculto;
}

 

/**
 * Volver a la página de selección
 */
function atrasToSeleccion(){
	document.location = 'transferir-otrosbancos.html?banderaRegresar=true';
}