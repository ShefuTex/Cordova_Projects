
var DIVISA_MXP = "MXP";
var TIPO_AH="AH";
var TIPO_CH="CH";
var TIPO_LI="LI";
var TIPO_TC="TC";
var TIPO_IN="IN";
var TIPO_TP="TP";
var dragNumber = 0;
var dpDisable=false;
var divSombra;
var reglasDeNegocio;
var pg;

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


function cargarCuentasOrigen(){
    console.log ("cargarCuentasOrigen");
    /* Lee del objeto sessionStorage y parsea a JSON */
    if ((sessionStorage.jsonPosicion != null) && (sessionStorage.jsonPosicion.length > 0) && (typeof sessionStorage.jsonPosicion != "undefined")) {
        pg = JSON.parse(sessionStorage.jsonPosicion);
        if (pg != null){
            success(pg.posicionGlobal);
        }else{
            fail();
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

function moveToUpOrigen() {
    console.log ("moveToUpOrigen");
    if (dragNumber > 3){
     
        
        var firstDiv = $('ul#listaAzul li:first div').html();
        var secondDiv = $('ul#listaAzul li:eq(1) div').html();
        var thirdDiv = $('ul#listaAzul li:eq(2) div').html();
        var forthDiv = $('ul#listaAzul li:last div').html();
        
        var numberHiddenElements = $('ul#listaAzulOculta li').length;
        console.log('numberHiddenElements '+numberHiddenElements);
        
        for (var i =0; i<numberHiddenElements; i++) {
            window[i+"HiddenElement"] =  $('ul#listaAzulOculta li:eq('+i+') div').html();
        }
        
        //Relleno lista visible
        $('ul#listaAzul li:first div').html(secondDiv);
        $('ul#listaAzul li:eq(1) div').html(thirdDiv);
        $('ul#listaAzul li:eq(2) div').html(forthDiv);
        $('ul#listaAzul li:last div').html( window[(0)+"HiddenElement"] );
        
        //Relleno lista oculta
        $('ul#listaAzulOculta li:eq('+(numberHiddenElements-1)+') div').html(firstDiv);
        
        for (var i =0; i<(numberHiddenElements-1); i++) {
            $('ul#listaAzulOculta li:eq('+i+') div').html( (window[(i+1)+"HiddenElement"]) );
        }
    }
}



/*
* Swipe Up handler containerAzul
* @param event
* @param direction
* @param distance
* @param duration
* @param fingerCount
*/

function moveToUpDestino() {
    console.log ("moveToUpDestino");
    if (dragNumber > 3){
        
        
        var firstDiv = $('ul#listaGris li:first div').html();
        var secondDiv = $('ul#listaGris li:eq(1) div').html();
        var thirdDiv = $('ul#listaGris li:eq(2) div').html();
        var forthDiv = $('ul#listaGris li:last div').html();
        
        var numberHiddenElements = $('ul#listaGrisOculta li').length;
        console.log('numberHiddenElements '+numberHiddenElements);
        
        for (var i =0; i<numberHiddenElements; i++) {
            window[i+"HiddenElement"] =  $('ul#listaGrisOculta li:eq('+i+') div').html();
        }
        
        //Relleno lista visible
        $('ul#listaGris li:first div').html(secondDiv);
        $('ul#listaGris li:eq(1) div').html(thirdDiv);
        $('ul#listaGris li:eq(2) div').html(forthDiv);
        $('ul#listaGris li:last div').html( window[(0)+"HiddenElement"] );
        
        //Relleno lista oculta
        $('ul#listaGrisOculta li:eq('+(numberHiddenElements-1)+') div').html(firstDiv);
        
        for (var i =0; i<(numberHiddenElements-1); i++) {
            $('ul#listaGrisOculta li:eq('+i+') div').html( (window[(i+1)+"HiddenElement"]) );
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
     console.log ("moveToDownOrigen");
       if (dragNumber > 3){
           
        var firstDiv = $('ul#listaAzul li:first div').html();
        var secondDiv = $('ul#listaAzul li:eq(1) div').html();
        var thirdDiv = $('ul#listaAzul li:eq(2) div').html();
        var forthDiv = $('ul#listaAzul li:last div').html();
        
        
        var numberHiddenElements = $('ul#listaAzulOculta li').length;
        console.log('numberHiddenElements '+numberHiddenElements);
        
        for (var i =0; i<numberHiddenElements; i++) {
            window[i+"HiddenElement"] =  $('ul#listaAzulOculta li:eq('+i+') div').html();
        }
        
        //Relleno lista visible
        $('ul#listaAzul li:first div').html( (window[(numberHiddenElements-1)+"HiddenElement"])  );
        $('ul#listaAzul li:eq(1) div').html(firstDiv);
        $('ul#listaAzul li:eq(2) div').html(secondDiv);
        $('ul#listaAzul li:last div').html(thirdDiv);
        
        //Relleno lista oculta
        $('ul#listaAzulOculta li:eq(0) div').html(forthDiv);
        
        for (var i =1; i<numberHiddenElements; i++) {
            $('ul#listaAzulOculta li:eq('+i+') div').html( (window[(i-1)+"HiddenElement"]) );
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
        console.log ("moveToDownDestino");
    if (dragNumber > 3){
        
        var firstDiv = $('ul#listaGris li:first div').html();
        var secondDiv = $('ul#listaGris li:eq(1) div').html();
        var thirdDiv = $('ul#listaGris li:eq(2) div').html();
        var forthDiv = $('ul#listaGris li:last div').html();
        
        
        var numberHiddenElements = $('ul#listaGrisOculta li').length;
        console.log('numberHiddenElements '+numberHiddenElements);
        
        for (var i =0; i<numberHiddenElements; i++) {
            window[i+"HiddenElement"] =  $('ul#listaGrisOculta li:eq('+i+') div').html();
        }
        
        //Relleno lista visible
        $('ul#listaGris li:first div').html( (window[(numberHiddenElements-1)+"HiddenElement"])  );
        $('ul#listaGris li:eq(1) div').html(firstDiv);
        $('ul#listaGris li:eq(2) div').html(secondDiv);
        $('ul#listaGris li:last div').html(thirdDiv);
        
        //Relleno lista oculta
        $('ul#listaGrisOculta li:eq(0) div').html(forthDiv);
        
        for (var i =1; i<numberHiddenElements; i++) {
            $('ul#listaGrisOculta li:eq('+i+') div').html( (window[(i-1)+"HiddenElement"]) );
        }
    }
}


function success (posicionGlobal){
    console.log ("success");
    var listaCuentas = posicionGlobal.asuntos.lista_cuentas_mxp;
    var listaTarjetasCredito = posicionGlobal.asuntos.lista_tarjetascredito;
    var saldo ;
    var numero;
    
    var  listaFinal = listaCuentas.concat(listaTarjetasCredito);
    
    if (listaFinal.length > 4) {
        cargaPaginador("", listaFinal.length, true);
    }
    
    $.each(listaFinal,function(key, value)
           {
           
           
           if ((value!="")&&(typeof value !='undefined')&&(value!=null)){
           
  
           if (	value.divisa == DIVISA_MXP &&
               (
                value.tipo == TIPO_AH || value.tipo == TIPO_CH ||
                value.tipo == TIPO_LI || value.tipo == TIPO_TC
                )
               ){
           
           var alias = value.alias;
           if (typeof alias == 'undefined' || alias == ""){
           //Si la cuenta no tiene un alias se desplegará una descripción del tipo de cuenta que se obtendrá del catálogo de tipos de cuenta.
           alias = getTipoCuentaName(value.tipo);
           console.log ("Alias: "+alias);
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
           
           createDragButton("transferir-miscuentas-drag-"+(key+1), 'drag-t'+(key=="0"?"":key+1), alias, formatNumberDolar(saldo), numero.slice(-10) , value.divisa,value.id,value.tipo,key+1);
           createDropButton("transferir-miscuentas-drop-"+(key+1), 'drop-t'+(key=="0"?"":key+1), alias, formatNumberDolar(saldo), numero.slice(-10) , value.divisa,value.id,value.tipo,key+1);
           
           
           dragNumber++;
           
           createTouchstartDragButton(key, value.tipo, value.id, value.numero, false);
           
           }
           }
           
           acceso_usr_global = posicionGlobal.acceso_usr;
           usuario_global = posicionGlobal.usuario_usr;
                   });
            var account = $('#nueva').position();
            var accountx = account.left;
            var accounty = account.top;
            var accountx2 = accountx + $('#nueva').width();
            var accounty2 = accounty + $('#nueva').height();
            
//            for (var i=0; i<dragNumber;i++){
//                
//                if (i==0){
//                    var dp = $('#transferir-miscuentas-drop-'+(i+1)).position();
//                    
//                    if ( dp != undefined){
//                        dpx1 = dp.left;
//                        dpy1 = dp.top;
//                        dpx2 = dpx1 + $('#transferir-miscuentas-drop-'+(i+1)).width();
//                        dpy2 = dpy1 + $('#transferir-miscuentas-drop-'+(i+1)).height();
//                        if ( ($('#transferir-miscuentas-drop-'+(i+1)).attr('class')).indexOf("disableDropEl") >= 0 ){
//                            dpDisable = true;
//                        }
//                    }
//                }else{
//                    window["dp"+(i+1)] = $('#transferir-miscuentas-drop-'+(i+2)).position();
//                    if ( ( window["dp"+(i+1)] ) != undefined){
//                        window["dp"+(i+1)+"x1"] = window["dp"+(i+1)].left;
//                        window["dp"+(i+1)+"y1"] = window["dp"+(i+1)].top;
//                        window["dp"+(i+1)+"x2"] = window["dp"+(i+1)+"x1"] + $('#transferir-miscuentas-drop-'+(i+2)).width();
//                        window["dp"+(i+1)+"y2"] = window["dp"+(i+1)+"y1"] + $('#transferir-miscuentas-drop-'+(i+2)).height();
//                        
//                        if ( ($('#transferir-miscuentas-drop-'+(i+2)).attr('class')).indexOf("disableDropEl") >= 0 ){
//                            window["dp"+(i+1)+"Disable"] = true;
//                        }
//                    }
//                }
//                
//            }
    
            $(".transferir-miscuentas-div-drag").draggable();
    
    
           $("#loadingRetiro").hide();
}


function fail(){
    console.log ("Fail");
    mostrarError("Error al obtener PosicionGlobal");
    $("#loadingRetiro").hide();
}



/**
 * Define el evento touchstart del botón draggable
 * @param key
 * @param tipoCuenta
 * @param idCuenta
 */
function createTouchstartDragButton(key, tipoCuenta, idCuenta, numeroCuenta, allowSameAccount){
    console.log("createTouchstartDragButton key"+key+ " id #drag"+(key=="0"?"":key+1)+"bbva"+" tipoCuenta "+tipoCuenta+" idCuenta "+idCuenta+" numeroCuenta "+numeroCuenta+" allowSameAccount "+allowSameAccount);
    
    $("#transferir-miscuentas-drag-"+(key+1)).on('touchstart', function(e){
        $(this).addClass("dragEnable");
        modifyZIndex(allowSameAccount, numeroCuenta);
        $("#transferir-miscuentas-drag-"+(key+1)).css({'z-index': '10000', 'opacity': '1'});
        dragSelected = $("#transferir-miscuentas-drag-"+(key+1));
        originalPosition = $("#transferir-miscuentas-drag-"+(key+1)).position();
        tipoCuentaSelected = getTipoCuentaName(tipoCuenta);
        console.log("tipoCuentaSelected: " + tipoCuentaSelected);
        idCuentaOrigen = idCuenta;
        console.log("tipoCuentaSelected: " + tipoCuentaSelected);
     });
}

/**
 * Modifica z-index de los elementos de la pantalla
 */
function modifyZIndex(allowSameAccount, dragElementAccountNumber){
    console.log("INICIO modifyZIndex allowSameAccount "+allowSameAccount+" dragElementAccountNumber "+dragElementAccountNumber);
    
    //z-index div contenedor
    $("#todo").css({'z-index':'0'});
    
    $("#nueva").css({'z-index':'10', 'opacity':'1'});
    
    //z-index botones drop
    $(".dropElement").each(function() {
        var elClass = $(this).attr('class');
        var elementId = $(this).attr("id");
        var thisAccount = $("#"+elementId+"_asunto").val();
        console.log ("elementId", elementId);
        console.log("dragElementAccountNumber "+dragElementAccountNumber+" thisAccount "+thisAccount);
        console.log("disableDropEl: -"+elClass.indexOf("disableDropEl")+ "- allowSameAccount: -" + allowSameAccount + "- dragElementAccountNumber: -" + dragElementAccountNumber + "- thisAccount: -" + thisAccount);
        if( (elClass.indexOf("disableDropEl")<0) && ( (allowSameAccount == true) || (dragElementAccountNumber != thisAccount) ) ){
            console.log ("Opa 1");
            $(this).css({'z-index':'10', 'opacity': '1'});
        }else{
            console.log ("Opa 2");
            $(this).css({'z-index':'0', 'opacity': '0.3'});
        }
    });
    
    //z-index botones dragg
    $("#listaAzul li > div").each(function (){
        var elClass = $(this).attr('class');
                                
        if( elClass.indexOf("dragEnable") >= 0 ){
            $(this).css({'z-index':'1000', 'opacity': '1', 'visibility':'visible'});
        }else{
            $(this).css({'z-index': '0', 'opacity': '0.3', 'visibility':'visible'});
        }
    });
    
}

/**
 * Parsea número a formato $999,999.99
 * @param number
 * @returns {String}
 */
function formatNumberDolar(number) {
    console.log ("Formatea Dollar");
    var str = number + '';
    x = str.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return "$"+(x1 + x2);
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
    console.log('createDragButton divId '+divId);
    var newLi = document.createElement('li');
    var newDiv = document.createElement('div');
    newDiv.setAttribute("class", "transferir-miscuentas-div-drag");
    var hiddenValue = document.createElement('div');
    
    newDiv.setAttribute("draggable", true);
    newDiv.setAttribute("id", divId);
    hiddenValue.setAttribute("id","drag_id_account-"+cont);
	hiddenValue.setAttribute("style","displany:none");
    hiddenValue.setAttribute("value",id);
    hiddenValue.setAttribute("data-type",tipo);
    
    var newTable = document.createElement('table');
    newTable.setAttribute("id", tableId);
    
    var fila1 = "transferir-miscuentas-tab-filauno";
    var fila2 = "transferir-miscuentas-tab-filados";
    
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
    console.log ("createTRDragButton");
    var tr_first = document.createElement('tr');
    tr_first.setAttribute("class",fila);
    var td_left = document.createElement('td');
    td_left.setAttribute("class", "transferir-miscuentas-tab-columna-izq");
    td_left.appendChild(document.createTextNode(valueTd1));
    tr_first.appendChild(td_left);
    var td_right = document.createElement('td');
    td_right.setAttribute("class", "transferir-miscuentas-tab-columna-der");
    td_right.appendChild(document.createTextNode(valueTd2));
    tr_first.appendChild(td_right);
    
    newTable.appendChild(tr_first);
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
    console.log('createDropButton divId '+divId);
    var newLi = document.createElement('li');
    var newDiv = document.createElement('div');
    var hiddenValue = document.createElement('div');
    
    newDiv.setAttribute("class","dropElement");
    newDiv.setAttribute("id", divId);
    hiddenValue.setAttribute("id","drop_id_account-"+cont);
	hiddenValue.setAttribute("style","displany:none");
    hiddenValue.setAttribute("value",id);
    hiddenValue.setAttribute("data-type",tipo);
    
    var newTable = document.createElement('table');
    newTable.setAttribute("id", tableId);
    
    var fila1 = "transferir-miscuentas-tab-filauno";
    var fila2 = "transferir-miscuentas-tab-filados";
    
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
    console.log ("createTRDropButton");
    var tr_first = document.createElement('tr');
    tr_first.setAttribute("class",fila);
    var td_left = document.createElement('td');
    td_left.setAttribute("class", "transferir-miscuentas-tab-columna-izq");
    td_left.appendChild(document.createTextNode(valueTd1));
    tr_first.appendChild(td_left);
    var td_right = document.createElement('td');
    td_right.setAttribute("class", "transferir-miscuentas-tab-columna-der");
    td_right.appendChild(document.createTextNode(valueTd2));
    tr_first.appendChild(td_right);
    
    newTable.appendChild(tr_first);

    
}


/**
 * Get nombre por key
 * @param TipoCuentaNumber
 * @returns
 */
function getTipoCuentaName(TipoCuentaNumber){
        console.log ("getTipoCuentaName");
    for (var key in CATALOGO_TIPO_CUENTA) {
        if (CATALOGO_TIPO_CUENTA[key].value == TipoCuentaNumber) {
            return CATALOGO_TIPO_CUENTA[key].name;
        }
    }
}


$.fn.draggable = function () {
    console.log ("Draggable");
    drop1 = $('#transferir-miscuentas-drop-1');
    if(drop1.width() != null) {
        var dp = $('#transferir-miscuentas-drop-1').position();
        var dpx1 = dp.left;
        var dpy1 = dp.top;
        var dpx2 = dpx1 + $('#transferir-miscuentas-drop-1').width();
        var dpy2 = dpy1 + $('#transferir-miscuentas-drop-1').height();
    }
    drop2 = $('#transferir-miscuentas-drop-2');
    if(drop2.width() != null) {
        var dp2 = $('#transferir-miscuentas-drop-2').position();
        var dp2x1 = dp2.left;
        var dp2y1 = dp2.top;
        var dp2x2 = dp2x1 + $('#transferir-miscuentas-drop-2').width();
        var dp2y2 = dp2y1 + $('#transferir-miscuentas-drop-2').height();
    }
    drop3 = $('#transferir-miscuentas-drop-3');
    if(drop3.width() != null) {
        var dp3 = $('#transferir-miscuentas-drop-3').position();
        var dp3x1 = dp3.left;
        var dp3y1 = dp3.top;
        var dp3x2 = dp3x1 + $('#transferir-miscuentas-drop-3').width();
        var dp3y2 = dp3y1 + $('#transferir-miscuentas-drop-3').height();
    }
    drop4 = $('#transferir-miscuentas-drop-4');
    if(drop4.width() != null) {
        var dp4 = $('#transferir-miscuentas-drop-4').position();
        var dp4x1 = dp4.left;
        var dp4y1 = dp4.top;
        var dp4x2 = dp4x1 + $('#transferir-miscuentas-drop-4').width();
        var dp4y2 = dp4y1 + $('#transferir-miscuentas-drop-4').height();
    }
    var offset = null;
    var account = $('#nueva').position();
    var accountx = account.left;
    var accounty = account.top;
    var accountx2 = accountx + $('#nueva').width();
    var accounty2 = accounty + $('#nueva').height();
    
    var start = function (e) {
        console.log("INICIO start ");
        var orig = e.originalEvent;
        $(this).css({'z-index':'1000'});
        var pos = $(this).position();
        divSombra = document.getElementById('sombra');
        divSombra.style.visibility = 'visible';
        parent.document.getElementById('sombraCabecera').style.visibility = 'visible';

        parent.document.getElementById('imgMenu').style.zIndex='-1';

//        divSombra.setAttribute('id', 'sombra');
//        divSombra.setAttribute('class', 'baseviewcontroller-loading-layer');
//        parent.document.body.appendChild(divSombra);
        
        var divOrigen = dragSelected[0].childNodes[0];
        idCuentaOrigen = divOrigen.getAttribute('value');
        var tipoCuentaOrigen = divOrigen.getAttribute('data-type');
        if(drop1.width() != null) {
            var divDestino1 = document.getElementById('transferir-miscuentas-drop-1').childNodes[0];
            var idCuentaDestino1 = divDestino1.getAttribute('value');
            var tipoCuentaDestino1 = divDestino1.getAttribute('data-type');
        }
        if(drop2.width() != null) {
            var divDestino2 = document.getElementById('transferir-miscuentas-drop-2').childNodes[0];
            var idCuentaDestino2 = divDestino2.getAttribute('value');
            var tipoCuentaDestino2 = divDestino2.getAttribute('data-type');
        }
        if(drop3.width() != null) {
            var divDestino3 = document.getElementById('transferir-miscuentas-drop-3').childNodes[0];
            var idCuentaDestino3 = divDestino3.getAttribute('value');
            var tipoCuentaDestino3 = divDestino3.getAttribute('data-type');
        }
        if(drop4.width() != null) {
        var divDestino4 = document.getElementById('transferir-miscuentas-drop-4').childNodes[0];
        var idCuentaDestino4 = divDestino4.getAttribute('value');
        var tipoCuentaDestino4 = divDestino4.getAttribute('data-type');
        }
        
        if(tipoCuentaOrigen == TIPO_TC){
            
            if((drop1.width() != null) && (tipoCuentaDestino1 != TIPO_TC)){
                 $("#transferir-miscuentas-drop-1").css('background-image','url(img/normal/Ios_Btn_Drag_Gris_Push.png)');
                 $("#transferir-miscuentas-drop-1").css('z-index',50);
            }else{
                $("#transferir-miscuentas-drop-1").css('z-index',0);
            }
            if((drop2.width() != null) && (tipoCuentaDestino2 != TIPO_TC)){
                $("#transferir-miscuentas-drop-2").css('background-image','url(img/normal/Ios_Btn_Drag_Gris_Push.png)');
                $("#transferir-miscuentas-drop-2").css('z-index',50);
            }else{
                $("#transferir-miscuentas-drop-2").css('z-index',0);
            }
            if((drop3.width() != null) && (tipoCuentaDestino3 != TIPO_TC)){
                $("#transferir-miscuentas-drop-3").css('background-image','url(img/normal/Ios_Btn_Drag_Gris_Push.png)');
                $("#transferir-miscuentas-drop-3").css('z-index',50);
            }else{
                $("#transferir-miscuentas-drop-3").css('z-index',0);
            }
            if((drop4.width() != null) && (tipoCuentaDestino4 != TIPO_TC)){
                $("#transferir-miscuentas-drop-4").css('background-image','url(img/normal/Ios_Btn_Drag_Gris_Push.png)');
                $("#transferir-miscuentas-drop-4").css('z-index',50);
            }else{
                $("#transferir-miscuentas-drop-4").css('z-index',0);
            }

        }else{
            if((drop1.width() != null) && (idCuentaOrigen != idCuentaDestino1)){
                $("#transferir-miscuentas-drop-1").css('background-image','url(img/normal/Ios_Btn_Drag_Gris_Push.png)');
                $("#transferir-miscuentas-drop-1").css('z-index',50);
                
            }else{
                $("#transferir-miscuentas-drop-1").css('z-index',0);
            }
            if((drop2.width() != null) && (idCuentaOrigen != idCuentaDestino2)){
                $("#transferir-miscuentas-drop-2").css('background-image','url(img/normal/Ios_Btn_Drag_Gris_Push.png)');
                $("#transferir-miscuentas-drop-2").css('z-index',50);
                
            }else{
                $("#transferir-miscuentas-drop-2").css('z-index',0);
            }
            if((drop3.width() != null) && (idCuentaOrigen != idCuentaDestino3)){
                $("#transferir-miscuentas-drop-3").css('background-image','url(img/normal/Ios_Btn_Drag_Gris_Push.png)');
                $("#transferir-miscuentas-drop-3").css('z-index',50);
                
            }else{
                $("#transferir-miscuentas-drop-3").css('z-index',0);
            }
            if((drop4.width() != null) && (idCuentaOrigen != idCuentaDestino4)){
                $("#transferir-miscuentas-drop-4").css('background-image','url(img/normal/Ios_Btn_Drag_Gris_Push.png)');
                $("#transferir-miscuentas-drop-4").css('z-index',50);
                
            }else{
                $("#transferir-miscuentas-drop-4").css('z-index',0);
            }

            console.log($("#transferir-miscuentas-drop-1").css('z-index'));
            
        }
        
        
        

        offset = { x: orig.changedTouches[0].pageX - pos.left, y: orig.changedTouches[0].pageY - pos.top};
    };
    
    var moveMe = function (e) {
        console.log("INICIO moveMe ");
        $("#div-overlay").css({'visibility':'visible'});
        e.preventDefault();
        var orig = e.originalEvent;
        $("#listaAzul").css({'z-index':'0'});
        $("#list").css({'z-index':'0'});
        $(".transferir-miscuentas-div-drag").css({'z-index':'1000', 'opacity': '0.3'});
        $(this).css({'z-index':'1001', 'opacity': '1'});
        
        $(this).css({top: orig.changedTouches[0].pageY - offset.y, left: orig.changedTouches[0].pageX - offset.x });
    };
    
    var doneMe = function (e) {
        console.log("INICIO doneMe ");
        $("#div-overlay").css({'visibility':'hidden'});
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
        idCuentaOrigen = divOrigen.getAttribute('value');
        var tipoCuentaOrigen = divOrigen.getAttribute('data-type');
        
      

        
        //CHECK IF DRAG IMAGE IS INSIDE DROP IMAGE
        if ((dgx1 >= (dpx1 - 10) && dgx2 <= (dpx2 + 10)) && (dgy1 >= (dpy1 - 10) && dgy2 <= (dpy2 + 10))) {
            console.log('Selecciono el drop 1.');
            dragSelected.animate({top: dpy1 + 1, left: dpx1 + 1}, 500, function(){
                                 
                                 var divDestino = document.getElementById('transferir-miscuentas-drop-1').childNodes[0];
                                 var idCuentaDestino = divDestino.getAttribute('value');
                                 var tipoCuentaDestino = divDestino.getAttribute('data-type');
                                 
                                 if(tipoCuentaOrigen == TIPO_TC){
                                 
                                    if(tipoCuentaDestino != TIPO_TC){
                                        divSombra.style.visibility = 'hidden';
                                        parent.document.getElementById('sombraCabecera').style.visibility = 'hidden';
                    
                                 parent.document.getElementById('sombraFooter').style.visibility = 'hidden';
                                 parent.document.getElementById('imgMenu').style.zIndex='1';
                                        accionIngresar(idCuentaOrigen,idCuentaDestino);
                                    }else{
                                        returnPosition();
                                 
                                    }
                                 }else{
                                    if (idCuentaDestino != idCuentaOrigen){
                                        divSombra.style.visibility = 'hidden';
                                 parent.document.getElementById('sombraCabecera').style.visibility = 'hidden';
                                              parent.document.getElementById('sombraFooter').style.visibility = 'hidden';
                                 parent.document.getElementById('imgMenu').style.zIndex='1';
                                        accionIngresar(idCuentaOrigen,idCuentaDestino);
                                 
                                    }else{
                                        returnPosition();
                                 
                                    }
                                 
                                 }
        
                            });
            
                                 
            
        }else if ((dgx1 >= (dp2x1 - 10) && dgx2 <= (dp2x2 + 10)) && (dgy1 >= (dp2y1 - 10) && dgy2 <= (dp2y2 + 10))) {
            console.log('Selecciono el drop 2.');
            dragSelected.animate({top: dp2y1 + 1, left: dp2x1 + 1}, 500, function(){
                                 
                                 var divDestino =document.getElementById('transferir-miscuentas-drop-2').childNodes[0];
                                 var idCuentaDestino = divDestino.getAttribute('value');
                                 var tipoCuentaDestino = divDestino.getAttribute('data-type');
                                 
                                 if(tipoCuentaOrigen == TIPO_TC){
                                 
                                    if(tipoCuentaDestino != TIPO_TC){
                                        divSombra.style.visibility = 'hidden';
                                 parent.document.getElementById('sombraCabecera').style.visibility = 'hidden';
                                              parent.document.getElementById('sombraFooter').style.visibility = 'hidden';
                                 parent.document.getElementById('imgMenu').style.zIndex='1';
                                        accionIngresar(idCuentaOrigen,idCuentaDestino);
                                    }else{
                                        returnPosition();
                                 
                                    }
                                 }else{
                                    if (idCuentaDestino != idCuentaOrigen){
                                        divSombra.style.visibility = 'hidden';
                                 parent.document.getElementById('sombraCabecera').style.visibility = 'hidden';
                                              parent.document.getElementById('sombraFooter').style.visibility = 'hidden';
                                 parent.document.getElementById('imgMenu').style.zIndex='1';
                                        accionIngresar(idCuentaOrigen,idCuentaDestino);
                                 
                                    }else{
                                        returnPosition();
                                 
                                    }
                                 
                                }

                            });
        }else if ((dgx1 >= (dp3x1 - 10) && dgx2 <= (dp3x2 + 10)) && (dgy1 >= (dp3y1 - 10) && dgy2 <= (dp3y2 + 10))) {
            console.log('Selecciono el drop 3.');
            dragSelected.animate({top: dp3y1 + 1, left: dp3x1 + 1}, 500, function(){
                                 
                                 var divDestino =document.getElementById('transferir-miscuentas-drop-3').childNodes[0];
                                 var idCuentaDestino = divDestino.getAttribute('value');
                                 var tipoCuentaDestino = divDestino.getAttribute('data-type');
                                 
                                 if(tipoCuentaOrigen == TIPO_TC){
                                 
                                    if(tipoCuentaDestino != TIPO_TC){
                                        divSombra.style.visibility = 'hidden';
                                 parent.document.getElementById('sombraCabecera').style.visibility = 'hidden';
                                              parent.document.getElementById('sombraFooter').style.visibility = 'hidden';
                                 parent.document.getElementById('imgMenu').style.zIndex='1';
                                        accionIngresar(idCuentaOrigen,idCuentaDestino);
                                 
                                    }else{
                                        returnPosition();
                                 
                                    }
                                 }else{
                                   if (idCuentaDestino != idCuentaOrigen){
                                     divSombra.style.visibility = 'hidden';
                                 parent.document.getElementById('sombraCabecera').style.visibility = 'hidden';
                                              parent.document.getElementById('sombraFooter').style.visibility = 'hidden';
                                 parent.document.getElementById('imgMenu').style.zIndex='1';

                                     accionIngresar(idCuentaOrigen,idCuentaDestino);
                                 
                                    }else{
                                        returnPosition();
                                 
                                    }
                                 
                                 }
                            });
            
        } /*else if ((dgx1 >= (dp4x1 - 10) && dgx2 <= (dp4x2 + 10)) && (dgy1 >= (dp4y1 - 10) && dgy2 <= (dp4y2 + 10))) {
            console.log('Selecciono el drop 4.');
            dragSelected.animate({top: dp4y1 + 1, left: dp4x1 + 1}, 500, function(){
                                 
                                 var divDestino =document.getElementById('transferir-miscuentas-drop-4').childNodes[0];
                                 var idCuentaDestino = divDestino.getAttribute('value');
                                 var tipoCuentaDestino = divDestino.getAttribute('data-type');

                                 
                                 if(tipoCuentaOrigen == TIPO_TC){
                                 
                                 if(tipoCuentaDestino != TIPO_TC){
                                   divSombra.style.visibility = 'hidden';
                                 parent.document.getElementById('sombraCabecera').style.visibility = 'hidden';
                                              parent.document.getElementById('sombraFooter').style.visibility = 'hidden';
                                 parent.document.getElementById('imgMenu').style.zIndex='1';

                                   accionIngresar(idCuentaOrigen,idCuentaDestino);
                                 }else{
                                   returnPosition();
                                 
                                 }
                                 }else{
                                   if (idCuentaDestino != idCuentaOrigen){
                                     divSombra.style.visibility = 'hidden';
                                 parent.document.getElementById('sombraCabecera').style.visibility = 'hidden';
                                              parent.document.getElementById('sombraFooter').style.visibility = 'hidden';
                                 parent.document.getElementById('imgMenu').style.zIndex='1';

                                     accionIngresar(idCuentaOrigen,idCuentaDestino);
                                 
                                    }else{
                                        returnPosition();
                                 
                                    }
                                 
                                 }
                            });
            
        }*/ else{
            
            returnPosition();
        }
    };
    
    this.bind("touchstart", start);
    this.bind("touchmove", moveMe);
    this.bind("touchend", doneMe);
};

/**
 * Devuelve el botón azul a su posición original
 */
function returnPosition(){
    console.log("INICIO returnPosition ");
    dragSelected.animate({top: originalPosition.top, left: originalPosition.left}, 500);
     $(".transferir-miscuentas-div-drag").css({'z-index':'1000', 'opacity': '1'});
     $("#transferir-miscuentas-drop-1").css('background-image','url(img/normal/Ios_Btn_Drag_Gris.png)');
     $("#transferir-miscuentas-drop-2").css('background-image','url(img/normal/Ios_Btn_Drag_Gris.png)');
     $("#transferir-miscuentas-drop-3").css('background-image','url(img/normal/Ios_Btn_Drag_Gris.png)');
     $("#transferir-miscuentas-drop-4").css('background-image','url(img/normal/Ios_Btn_Drag_Gris.png)');
     $("#transferir-miscuentas-drag-1").css("z-index",50);
     $("#transferir-miscuentas-drag-2").css("z-index",50);
     $("#transferir-miscuentas-drag-3").css("z-index",50);
     $("#transferir-miscuentas-drag-4").css("z-index",50);
     dragSelected.css("z-index",55);
       
     divSombra.style.visibility = 'hidden';
     parent.document.getElementById('sombraCabecera').style.visibility = 'hidden';
                 parent.document.getElementById('sombraFooter').style.visibility = 'hidden';
      parent.document.getElementById('imgMenu').style.zIndex='1';

}


function mostrarUltimos5Digitos (numeroCuenta) {
    console.log("mostrarUltimos5Digitos");
    var numeroCuentaOculto = '';
    
    for (i = 0; i < numeroCuenta.length; i++) {
        if (i < numeroCuenta.length - 5) {
            numeroCuentaOculto = '*****';
        } else {
            numeroCuentaOculto += numeroCuenta.charAt(i);
        }
    }
    
    return numeroCuentaOculto;
}


function obtenerReglaNegocio() {
    console.log ("ObtenReglasNeg");
    var cargos = JSON.parse(sessionStorage.jsonReglasNegocio).aplicaciones.entreMiscuentas.operacion.cargo;
    
    reglasDeNegocio = [];
    var cuentasDeAbonoAux2;
    var operaMismoDia;
	var operaProgramadas;
	var maximoDiasDeProgramacion;
	var operaEnSabado;
    var operaEnDomingo;
    var operaEnDiasNoHabiles;
    
    
    
    
    for ( var i = 0; i < cargos.length; i++) {
        var cuentasDeAbono = [];
        // Se leen las cuentas permitidas como cuenta origen
        
        if(cargos[i].moneda == DIVISA_MXP){
          var cuentasDeCargo = cargos[i].cuentas.cuenta;
            
                // Se leen las cuentas permitidas como cuenta destino
                    var cuentasDeabonoAux = cargos[i].abono;
            
                    if(Object.prototype.toString.call(cuentasDeabonoAux) === '[object Array]'){
                    
                        for(var l = 0; l < cuentasDeabonoAux.length;l++){
                            
                            operaMismoDia = cuentasDeabonoAux[l].operaMismoDia;
                            operaProgramadas = cuentasDeabonoAux[l].operaProgramadas;
                            maximoDiasDeProgramacion = cuentasDeabonoAux[l].maximoDiasDeProgramacion;
                            operaEnSabado = cuentasDeabonoAux[l].operaEnSabado;
                            operaEnDomingo = cuentasDeabonoAux[l].operaEnDomingo
                            operaEnDiasNoHabiles = cuentasDeabonoAux[l].operaEnDiasNohabiles;

                            
                            cuentasDeAbonoAux2 = cuentasDeabonoAux[l].cuentas;
                            
                            if(Object.prototype.toString.call(cuentasDeAbonoAux2.cuenta) === '[object Array]' ){
                               
                               for(var m = 0; m < cuentasDeAbonoAux2.cuenta.length;m++){
                                   
                                   if(cuentasDeAbonoAux2.cuenta[m] == TIPO_TC || cuentasDeAbonoAux2.cuenta[m] == TIPO_AH|| cuentasDeAbonoAux2.cuenta[m] == TIPO_LI || cuentasDeAbonoAux2.cuenta[m] == TIPO_CH){
                               
                                      cuentasDeAbono.push(cuentasDeAbonoAux2.cuenta[m]);
                                   }
                               }
                            }else{
                                if(cuentasDeAbonoAux2.cuenta == TIPO_TC || cuentasDeAbonoAux2.cuenta == TIPO_AH || cuentasDeAbonoAux2.cuenta == TIPO_LI || cuentasDeAbonoAux2.cuenta == TIPO_CH){
                                   cuentasDeAbono.push(cuentasDeAbonoAux2.cuenta);
                                }
                            }
                        
                        }
                    }else if(Object.prototype.toString.call(cuentasDeabonoAux.cuentas.cuenta) === '[object Array]'){
                        
                        operaMismoDia = cuentasDeabonoAux.operaMismoDia;
                        operaProgramadas = cuentasDeabonoAux.operaProgramadas;
                        maximoDiasDeProgramacion = cuentasDeabonoAux.maximoDiasDeProgramacion;
                        operaEnSabado = cuentasDeabonoAux.operaEnSabado;
                        operaEnDomingo = cuentasDeabonoAux.operaEnDomingo
                        operaEnDiasNoHabiles = cuentasDeabonoAux.operaEnDiasNohabiles;
                        
                        for(var n = 0; n < cuentasDeabonoAux.cuentas.cuenta.length;n++){
                            
                            if(cuentasDeabonoAux.cuentas.cuenta[n] == TIPO_TC || cuentasDeabonoAux.cuentas.cuenta[n] == TIPO_AH || cuentasDeabonoAux.cuentas.cuenta[n] == TIPO_LI || cuentasDeabonoAux.cuentas.cuenta[n] == TIPO_CH){
                              cuentasDeAbono.push(cuentasDeabonoAux.cuentas.cuenta[n]);
                            }
                        }
                        
                    }else{
                        if(cuentasDeabonoAux.cuentas.cuenta == TIPO_TC || cuentasDeabonoAux.cuentas.cuenta == TIPO_AH || cuentasDeabonoAux.cuentas.cuenta == TIPO_LI || cuentasDeabonoAux.cuentas.cuenta == TIPO_CH){
                           cuentasDeAbono.push(cuentasDeabonoAux.cuentas.cuenta);
                        }
                    }
                    
                    // Se generan las nuevas reglas de negocio de esta iteración
                    if ((typeof cuentasDeCargo == 'string') && (typeof cuentasDeAbono == 'string')) {
                        var nuevaRN = new ReglaNegocio(cuentasDeCargo, cuentasDeAbono);
                        reglasDeNegocio.push(nuevaRN);
                        
                    } else if ((typeof cuentasDeCargo == 'string') && (Object.prototype.toString.call(cuentasDeAbono) === '[object Array]')) {
                        for ( var k = 0; k < cuentasDeAbono.length; k++) {
                            if(cuentasDeCargo == TIPO_TC || cuentasDeCargo == TIPO_AH || cuentasDeCargo == TIPO_CH || cuentasDeCargo == TIPO_LI){
                                var nuevaRN = new ReglaNegocio(cuentasDeCargo, cuentasDeAbono[k], operaMismoDia,operaProgramadas,maximoDiasDeProgramacion,operaEnSabado,operaEnDomingo,operaEnDiasNoHabiles);
                                reglasDeNegocio.push(nuevaRN);
                            }
                        }
                        
                    } else if ((Object.prototype.toString.call(cuentasDeCargo) === '[object Array]') && (typeof cuentasDeAbono == 'string')) {
                        for ( var j = 0; j < cuentasDeCargo.length; j++) {
                            var nuevaRN = new ReglaNegocio(cuentasDeCargo[j], cuentasDeAbono);
                            reglasDeNegocio.push(nuevaRN);
                        }
                        
                    } else {
                        for ( var j = 0; j < cuentasDeCargo.length; j++) {
                            if(cuentasDeCargo[j] == TIPO_TC || cuentasDeCargo[j] == TIPO_AH || cuentasDeCargo[j] == TIPO_CH || cuentasDeCargo[j] == TIPO_LI){
                                for ( var k = 0; k < cuentasDeAbono.length; k++) {
                                    var nuevaRN = new ReglaNegocio(cuentasDeCargo[j], cuentasDeAbono[k],operaMismoDia,operaProgramadas,maximoDiasDeProgramacion,operaEnSabado,operaEnDomingo,operaEnDiasNoHabiles);
                                    reglasDeNegocio.push(nuevaRN);
                                }
                            }
                        }
                    }
                }
            }
    
    console.log(reglasDeNegocio);
    sessionStorage.reglasCalendario = JSON.stringify(reglasDeNegocio);

}

function ReglaNegocio(tipoCtaOrigen, tipoCtaDestino,operaMismoDia,operaProgramadas,maximoDiasDeProgramacion,operaEnSabado,operaEnDomingo,operaEnDiasNoHabiles) {
    console.log ("Regla Neg");
    this.tipoCtaOrigen = tipoCtaOrigen;
    this.tipoCtaDestino = tipoCtaDestino;
    this.operaMismoDia = operaMismoDia;
	this.operaProgramadas = operaProgramadas;
	this.maximoDiasDeProgramacion = maximoDiasDeProgramacion;
	this.operaEnSabado = operaEnSabado;
    this.operaEnDomingo = operaEnDomingo;
    this.operaEnDiasNoHabiles = operaEnDiasNoHabiles;
    
}

function DatosAplicativos2 (usuario, acceso, id, periodo) {
    console.log ("DAtos Aplicativos2 ");
    this.usuario = usuario;
    this.acceso = acceso;
    this.id = id;
    this.periodo = periodo;
}

function Peticion (proceso, operacion, accion, datosAplicativos) {
    console.log ("Petición");
    this.proceso = proceso;
    this.operacion = operacion;
    this.accion = accion;
    this.datosAplicativos = datosAplicativos;
}


function accionIngresar(idCuentaOrigen,idCuentaDestino){
    console.log ("accionIngresar");
    var listaCuentas = pg.posicionGlobal.asuntos.lista_cuentas_mxp;
    var listaTarjetasCredito = pg.posicionGlobal.asuntos.lista_tarjetascredito;
   
    var  listaFinal = listaCuentas.concat(listaTarjetasCredito);
    
    var i = 0;
    while(i<listaFinal.length && listaFinal[i].id!=idCuentaDestino){
        i++;
    }
    if(i<listaFinal.length && listaFinal[i].tipo == TIPO_TC){
    
    var datApl = new DatosAplicativos2 (sessionStorage.username, pg.posicionGlobal.acceso_usr, idCuentaDestino, 1);
    var peticion = new Peticion ("imd_movimientos_tdc_pr", "imd_movimientos_tdc_op", "edoCuenta", datApl);
    parent.misCuentasViewController.pagoMinimoNoInteres(JSON.stringify(peticion));
    
    showLoadingLayer();
    parent.document.getElementById('sombraCabecera').style.visibility = 'visible';
    
    window.setTimeout(function () {
                      hideLoadingLayer();
                      parent.document.getElementById('sombraCabecera').style.visibility = 'hidden';
                      var url = 'transferirMisCuentasIngresa.html?idOrigen='+idCuentaOrigen+'&idDestino='+idCuentaDestino;
                      parent.document.getElementById('contentFrame').src = url;
                      }, 1000);
    } else {
        var url = 'transferirMisCuentasIngresa.html?idOrigen='+idCuentaOrigen+'&idDestino='+idCuentaDestino;
        parent.document.getElementById('contentFrame').src = url;
    }

}

function muestraFlechas(longitud) {
    if (longitud > 4) {
        $("#arribaDrag, #abajoDrag, #arribaDrop, #abajoDrop").show();
    }
}

function cargaPagina (elemento) {
    
    parent.timerDelegate.resetTimerInactividad();
    
    var totalElementos = $('#' + elemento.parentNode.id + ' .numeroPagina');
    var listadoCuentas = pg.posicionGlobal.asuntos.lista_cuentas_mxp.concat(pg.posicionGlobal.asuntos.lista_tarjetascredito);
    var longitud = listadoCuentas.length/4;
    var cuentasPintar = [];
    var paginaSeleccionada;
    
    var clase = ".transferir-miscuentas-div-drag";
    var raizIdDrag = "transferir-miscuentas-drag-";
    var raizIdDrop = "transferir-miscuentas-drop-";
    
    
    if (elemento.dataset.status != 'inactivo') {
    
        if ((elemento.dataset.destino != 'inicio') && (elemento.dataset.destino != 'anterior') && (elemento.dataset.destino != 'fin') && (elemento.dataset.destino != 'siguiente')) {
            
            $('#' + elemento.parentNode.id + ' .numeroPagina').each(function () {
                                    $(this).removeClass('selected');
                                    });
            
            elemento.className += ' selected';
            
            var inicio = parseInt(elemento.dataset.destino) * 4;
            var limite = inicio + 4;
            
            if (elemento.parentNode.id == 'paginadorOrigen') {
                $('#listaAzul').empty();
                $('#listaAzulOculta').empty();
                listaAzul = document.getElementById('listaAzul');
            } else if (elemento.parentNode.id == 'paginadorDestino') {
                $('#listaGris').empty();
                $('#listaGrisOculta').empty();
                listaGris = document.getElementById('listaGris');
            }
            
            for (var i = inicio; i < limite; i++) {
                cuentasPintar.push(listadoCuentas[i]);
            }
            
        } else if (elemento.dataset.destino == 'inicio') {
            
            $('#' + elemento.parentNode.id + ' .numeroPagina').each(function () {
                                        $(this).removeClass('selected');
                                    });
            
            totalElementos[0].dataset.status = 'inactivo';
            totalElementos[1].dataset.status = 'inactivo';
            var datasetDestino = 0;
            for (var j = 2; j < 5; j++) {
                
                if (j == 2) {
                    totalElementos[j].className += ' selected';
                }
                
                totalElementos[j].dataset.destino = datasetDestino++;
                
                totalElementos[j].innerHTML = datasetDestino;
            }
            
            for (var i = 0; i < 4; i++) {
                cuentasPintar.push(listadoCuentas[i]);
            }

            if (elemento.parentNode.id == 'paginadorOrigen') {
                $('#listaAzul').empty();
                $('#listaAzulOculta').empty();
                listaAzul = document.getElementById('listaAzul');
            } else if (elemento.parentNode.id == 'paginadorDestino') {
                $('#listaGris').empty();
                $('#listaGrisOculta').empty();
                listaGris = document.getElementById('listaGris');
            }
            
            totalElementos[5].dataset.status = 'activo';
            totalElementos[6].dataset.status = 'activo';
            
        } else if (elemento.dataset.destino == 'anterior') {
            
            if (totalElementos[2].dataset.destino != 0) {
                $('#' + elemento.parentNode.id + ' .numeroPagina').each(function () {
                    if (((this).dataset.destino != 'inicio') && ((this).dataset.destino != 'anterior') && ((this).dataset.destino != 'fin') && ((this).dataset.destino != 'siguiente')) {
                            if ($(this).hasClass('selected')) {
                                paginaSeleccionada = this;
                            }
                            $(this).html((parseInt(this.innerHTML))-1).removeClass('selected');
                            this.dataset.destino = parseInt(this.dataset.destino)-1;
                    }
                });
                
                var inicio = parseInt(paginaSeleccionada.dataset.destino) * 4;
                var limite = inicio + 4;
                paginaSeleccionada.className += ' selected';
                
                for (var i = inicio; i < limite; i++) {
                    cuentasPintar.push(listadoCuentas[i]);
                }
                
                if (elemento.parentNode.id == 'paginadorOrigen') {
                    $('#listaAzul').empty();
                    $('#listaAzulOculta').empty();
                    listaAzul = document.getElementById('listaAzul');
                } else if (elemento.parentNode.id == 'paginadorDestino') {
                    $('#listaGris').empty();
                    $('#listaGrisOculta').empty();
                    listaGris = document.getElementById('listaGris');
                }
                
                totalElementos[5].dataset.status = 'activo';
                totalElementos[6].dataset.status = 'activo';
                
            } else {
                
                totalElementos[0].dataset.status = 'inactivo';
                totalElementos[1].dataset.status = 'inactivo';
                
            }
            
        } else if (elemento.dataset.destino == 'siguiente') {
            
            totalElementos[0].dataset.status = 'activo';
            totalElementos[1].dataset.status = 'activo';
            
            if (totalElementos[4].dataset.destino != longitud-1) {
                $('#' + elemento.parentNode.id + ' .numeroPagina').each(function () {
                    if (((this).dataset.destino != 'inicio') && ((this).dataset.destino != 'anterior') && ((this).dataset.destino != 'fin') && ((this).dataset.destino != 'siguiente')) {
                            if ($(this).hasClass('selected')) {
                                paginaSeleccionada = this;
                            }
                            $(this).html((parseInt(this.innerHTML))+1);
                            this.dataset.destino = parseInt(this.dataset.destino)+1;
                    }
                });
                
                var inicio = parseInt(paginaSeleccionada.dataset.destino) * 4;
                var limite = inicio + 4;
                
                for (var i = inicio; i < limite; i++) {
                    cuentasPintar.push(listadoCuentas[i]);
                }
                
                if (elemento.parentNode.id == 'paginadorOrigen') {
                    $('#listaAzul').empty();
                    $('#listaAzulOculta').empty();
                    listaAzul = document.getElementById('listaAzul');
                } else if (elemento.parentNode.id == 'paginadorDestino') {
                    $('#listaGris').empty();
                    $('#listaGrisOculta').empty();
                    listaGris = document.getElementById('listaGris');
                }
                
            } else {
                
                totalElementos[5].dataset.status = 'inactivo';
                totalElementos[6].dataset.status = 'inactivo';
                
            }
        } else if (elemento.dataset.destino == 'fin') {
            
            $('#' + elemento.parentNode.id + ' .numeroPagina').each(function () {
                                                                    $(this).removeClass('selected');
                                                                    });
            
            totalElementos[0].dataset.status = 'activo';
            totalElementos[1].dataset.status = 'activo';
            
            var datasetDestino = longitud;
            for (var j = 4; j > 1; j--) {
                
                if (j == 4) {
                    totalElementos[j].className += ' selected';
                }
                
                totalElementos[j].innerHTML = datasetDestino--;
				
                totalElementos[j].dataset.destino = datasetDestino;
                
            }
            
            var inicio = parseInt(totalElementos[4].dataset.destino) * 4;
            var limite = inicio + 4;
            
            for (var i = inicio; i < limite; i++) {
                cuentasPintar.push(listadoCuentas[i]);
            }
            
            if (elemento.parentNode.id == 'paginadorOrigen') {
                $('#listaAzul').empty();
                $('#listaAzulOculta').empty();
                listaAzul = document.getElementById('listaAzul');
            } else if (elemento.parentNode.id == 'paginadorDestino') {
                $('#listaGris').empty();
                $('#listaGrisOculta').empty();
                listaGris = document.getElementById('listaGris');
            }
            
            totalElementos[5].dataset.status = 'inactivo';
            totalElementos[6].dataset.status = 'inactivo';
            
        }
        
        dragNumber = 0;
        
        $.each(cuentasPintar, function (key,value) {
               
               if ((value!="")&&(typeof value !='undefined')&&(value!=null)){
               
               
               if (	value.divisa == DIVISA_MXP &&
                   (
                    value.tipo == TIPO_AH || value.tipo == TIPO_CH ||
                    value.tipo == TIPO_LI || value.tipo == TIPO_TC
                    )
                   ){
               
               var alias = value.alias;
               if (typeof alias == 'undefined' || alias == ""){
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
               
               if (elemento.parentNode.id == 'paginadorOrigen') {
               
               createDragButton(raizIdDrag+(key+1), 'drag-t'+(key=="0"?"":key+1), alias, formatNumberDolar(saldo), numero.slice(-10) , value.divisa,value.id,value.tipo,key+1);
               
               } else if (elemento.parentNode.id == 'paginadorDestino') {
               
               createDropButton(raizIdDrop+(key+1), 'drop-t'+(key=="0"?"":key+1), alias, formatNumberDolar(saldo), numero.slice(-10) , value.divisa,value.id,value.tipo,key+1);
               }
               
               dragNumber++;
               
               
               createTouchstartDragButton(key, value.tipo, value.id, value.numero, false);
               
               //                   $(clase).draggable();
               }
               }
               
               });
        
        $(clase).draggable();
        
    } // if (elemento.dataset.status != 'inactivo')
    
//    console.log("Cargando p\xe1gina ", elemento);
}

function actualizaListadoCuentas (listaCuentasPintar) {
    
}