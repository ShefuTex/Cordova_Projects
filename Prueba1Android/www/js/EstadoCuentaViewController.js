// __________ Comienzo javascript ________




var MONTHS = {
    ENERO : {value: 1, name: "Enero"},
    FEBRERO: {value: 2, name: "Febrero"},
    MARZO : {value: 3, name: "Marzo"},
    ABRIL : {value: 4, name: "Abril"},
    MAYO : {value: 5, name: "Mayo"},
    JUNIO : {value: 6, name: "Junio"},
    JULIO : {value: 7, name: "Julio"},
    AGOSTO : {value: 8, name: "Agosto"},
    SEPTIEMBRE : {value: 9, name: "Septiembre"},
    OCTUBRE : {value: 10, name: "Octubre"},
    NOVIEMBRE : {value: 11, name: "Noviembre"},
    DICIEMBRE : {value: 12, name: "Diciembre"},
};

function getMonthName(monthNumber){
    for (var key in MONTHS) {
        console.log(key);
        console.log(MONTHS[key].value);
        console.log(MONTHS[key].name);
        console.log("monthNumber "+monthNumber);

        
        if (MONTHS[key].value == monthNumber) {
            return MONTHS[key].name;
        }
    }
}

function getNumerMonth(monthName){
    for (var key in MONTHS) {
        if (MONTHS[key].name == monthName) {
            //return (MONTHS[key].value + 1);
            return (MONTHS[key].value);

        }
    }
}

function comboNumPeriodoInit() {
    console.log("INICIO comboNumPeriodoInit");
	var selectCombo = $('#cboEDONUMPERIODO');
	
	selectCombo.empty();
	selectCombo.append('<option value=i selected=true>Selecciona</option>');
	selectCombo.attr('disabled','disabled');
    console.log("FIN comboNumPeriodoInit");
}

function comboNumPeriodo() {
    console.log("INICIO comboNumPeriodo");
	var comboCuenta = $('#cboNUMCUENTA option:selected').text();
	//$("#loading").show();
    showLoadingLayer();
    parent.document.getElementById("sombraCabecera").style.visibility="visible";
    parent.document.getElementById("sombraFooter").style.visibility="visible";
    parent.document.getElementById("imgMenu").style.zIndex="-1";


    document.getElementById("inputToken").value="";
    document.getElementById("tokenValue").value="";
    $("#tokenValue div").empty();
    //vaciar la capa oculta para el token
    tokenInputValidatorPaso2.setData("");
    

    
	if (comboCuenta == "Selecciona"){
		comboNumPeriodoInit();
        
        hideLoadingLayer();
        parent.document.getElementById("sombraCabecera").style.visibility="hidden";
        parent.document.getElementById("sombraFooter").style.visibility="hidden";
        parent.document.getElementById("imgMenu").style.zIndex="1";
        
        //alert("token");

        
	}else{
		$('#cboEDONUMPERIODO').attr('disabled',false);
		var proceso = procesoEdoCuenta;
		var operacion = operacionEdoCuenta;
		var accion = accionRecuperarPeriodo;
        //debido a la modificacion 34 y la incidencia 2275 se concatena el numero de cuenta al id
		var numeroCuenta = $('#cboNUMCUENTA').val().substring(0,12);
		
		var datosAplicativos = { usuario: usuario_global, acceso: acceso_usr_global, id: numeroCuenta };
		console.log("recuperaPeriodos proceso "+proceso+" operacion "+operacion+" datosAplicativos "+datosAplicativos);
		addDataToPeriodoSelect(proceso, operacion, datosAplicativos);
	}
    console.log("FIN comboNumPeriodo");
}

function comboNumCuentaInit() {
    console.log("INICIO comboNumCuentaInit");
    var selectCombo = $('#cboNUMCUENTA');
    selectCombo.empty();
    selectCombo.append('<option value="-1" selected=true>Selecciona</option>');
    $.each(posGlobal.asuntos.lista_cuentas_mxp,function(key, value)
           {
           console.log("lista_cuentas_mxp:"+value.id+" "+value.numero+" "+value.saldocorte+" "+value.tipo);

           selectCombo.append('<option value=' + value.id+"_"+value.numero+ '>' + value.numero.slice(-10) +' - $ '+ value.saldo_disponible +' - ' + value.tipo+ '</option>');
    });
    $.each(posGlobal.asuntos.lista_tarjetascredito,function(key, value)
           {
           console.log("lista_tarjetascredito: "+value.id+" "+value.numero+" "+value.saldocorte+" "+value.tipo);
           if (value!=null){
           selectCombo.append('<option value=' + value.id+"_"+value.numero.toString()+ '>' + value.numero.toString().slice(-10) +' - $ '+ value.saldocorte +' - ' + value.tipo+ '</option>');
           }
    });
    $.each(posGlobal.asuntos.lista_cuentas_usd,function(key, value)
           {
           console.log("lista_cuentas_usd: "+value.id+" "+value.numero+" "+value.saldocorte+" "+value.tipo);

           if (value.plaza == "MEXICO"){
           selectCombo.append('<option value=' + value.id+"_"+value.numero+ '>' + value.numero.slice(-10) +' - $ '+ value.saldo_disponible +' - ' + value.tipo+ '</option>');
           }
    });
    console.log("FIN comboNumCuentaInit");
}

function loadPosicionGlobal(){
    console.log("INICIO loadPosicionGlobal");
	/* Lee del objeto sessionStorage y parsea a JSON */
	if ((sessionStorage.jsonPosicion != null) && (sessionStorage.jsonPosicion.length > 0) && (typeof sessionStorage.jsonPosicion != "undefined")) {
		posGlobal = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal;
		acceso_usr_global=posGlobal.acceso_usr;
		usuario_global = posGlobal.usuario_usr;
        
        
        
        if ((posGlobal.simulacion!= undefined)&&(posGlobal.simulacion == 1)){
            
            sessionStorage.simulacion=1;
            
        }
                
        
		$("#tipoInstrumento").val(posGlobal.tiseguridad_usr);
        if (posGlobal.tiseguridad_usr == "T3") {
            $("#lblAYUDACCESO").html("C&oacute;digo de 8 que aparece en el dispositivo de Acceso Seguro (Enci&eacute;ndelo y presiona el bot&oacute;n 1)");
        } else if (posGlobal.tiseguridad_usr == "T6") {
            $("#lblAYUDACCESO").html("C&oacute;digo de 8 que aparece en el dispositivo de Acceso Seguro (Enci&eacute;ndelo, presiona el bot&oacute;n C&oacute;digo)");
        } else if (posGlobal.tiseguridad_usr == "S1") {
            $("#lblAYUDACCESO").html("Desde tu Bancomer m&oacute;vil, ingresa a \"Token m&oacute;vil\" y selecciona \"Generar c&oacute;digo de seguridad\"");
        }
	}
    console.log("FIN loadPosicionGlobal");
}


function returnResponseRecuperaPeriodos (jsonResponse) {
    console.log("*****recuperaPeriodos jsonResponse	"+jsonResponse);
    var tempData = JSON.parse(jsonResponse).respuesta;
    var comboPeriodo = $("#cboEDONUMPERIODO");
    
    hideLoadingLayer();
    parent.document.getElementById("sombraCabecera").style.visibility="hidden";
    parent.document.getElementById("sombraFooter").style.visibility="hidden";
    
    parent.document.getElementById("imgMenu").style.zIndex="1";


    
    $("#cboEDONUMPERIODO").removeAttr("disabled");
    $("#inputToken").removeAttr("disabled");
    
    if ((typeof tempData.periodos != "undefined") && (tempData.periodos != null) && (tempData.periodos.ListaPeriodos.length > 0)) {
        var numero = tempData.numero;
        var listaPeriodos = tempData.periodos.ListaPeriodos;
        console.log("numero = " + numero);
        console.log("ListaPeriodos length = " + listaPeriodos.length);
        
        var numCuenta = tempData.numero;
        console.log("numCuenta " +numCuenta);
        comboPeriodo.empty();
        comboPeriodo.append("<option value=i selected=true>Selecciona</option>" );
        
        //console.log("ListaPeriodos",tempData.periodos.ListaPeriodos);
        
        $.each(tempData.periodos.ListaPeriodos,function(key, value)
               {
               var mes = getMonthName(tempData.periodos.ListaPeriodos[key].mes);
               console.log("ListaPeriodos mes",mes);

               
               var newOption =("<option value='" + key + "'>" + mes +" "+tempData.periodos.ListaPeriodos[key].anio + "</option>");
               comboPeriodo.append(newOption);
               
               });
        
    } else {
        $("#cboEDONUMPERIODO").attr("disabled","disabled");
        $("#inputToken").attr("disabled","disabled");
        parent.compraInvertirDelegate.muestraAlert("Aviso\n", "Informaci\xf3n no disponible", "Aceptar");
    }
   // $("#loading").hide();
    //hideLoadingLayer();
}

function returnError (errorMessage) {
    console.log(errorMessage);
    
    parent.document.getElementById('contentFrame').src = "miscuentas-estadocuentas.html";
    //alert("ERROR "+errorMessage);
    
    //parent.compraInvertirDelegate.muestraAlert("Aviso entra por error \n", errorMessage, "Aceptar");
   // $("#loading").hide();
    parent.hideLoadingLayer();
    
   /* parent.document.getElementById("sombraCabecera").style.visibility="hidden";
    parent.document.getElementById("sombraFooter").style.visibility="hidden";
    parent.document.getElementById("imgMenu").style.zIndex="1";
    
    
    $("#cboEDONUMPERIODO").attr("disabled","disabled");
    $("#inputToken").attr("disabled","disabled");
*/
}

function addDataToPeriodoSelect(proceso, operacion, datosAplicativos){
	//$("#loading").show();
   // showLoadingLayer();
    
    console.log("INICIO addDataToPeriodoSelect proceso " +proceso+" operacion "+operacion+" acceso "+datosAplicativos.acceso +" id "+ datosAplicativos.id +" usuario "+datosAplicativos.usuario);
    
    var tempData = parent.edoCuentaDelegate.recuperaPeriodos(proceso, operacion, datosAplicativos, returnResponseRecuperaPeriodos, returnError);
    console.log("tempData "+tempData);
    
    console.log("FIN addDataToPeriodoSelect");
}


function confirmarEdoController(){
    
    console.log("INICIO confirmarEdoController");
    var comboCuenta = $('#cboNUMCUENTA option:selected').text();
    var comboPeriodo = $('#cboEDONUMPERIODO option:selected').text();
 
    
    console.log("confirmarEdoController comboCuenta "+comboCuenta+" comboPeriodo "+comboPeriodo);
    if (comboCuenta == "Selecciona" || comboPeriodo=="Selecciona"){
        
        parent.compraInvertirDelegate.muestraAlert("Aviso\n","Es obligatorio seleccionar una Cuenta y un periodo.","Aceptar");
        
        
    } else {
        //Validación de token
        var tokenVal = parent.tokenViewController.validaDatos(document.getElementById("inputToken").value);
        console.log("confirmarEdoController tokenVal "+tokenVal);
        if(tokenVal){
            
            $("#divPDF").hide();

            
            $("#loading").show();
            var proceso = procesoEdoCuenta;
    		var operacion = operacionEdoCuenta;
            
            var numeroCuenta = $('#cboNUMCUENTA').val().substring(13);

    		//var numeroCuenta = comboCuenta.split(" - $")[0];
    		var producto = comboCuenta.split(" - ")[2];
    		var anio = comboPeriodo.split(" ")[1];
    		var mes = getNumerMonth(comboPeriodo.split(" ")[0]);
    		var formatoConsultado = "PDF";
    		var claveOperaciones = "00000000";
    		var OTP = document.getElementById("tokenValue").value;
    		var posicionTASA = "";
    		var valorPosicionTASA = "";
    		var digitoVerficador = "";
    		var valorDigitoVerficador="";
            
            OTP = (OTP == undefined)?"":OTP;
            
    		var datosAplicativos =
            {
            usuario: usuario_global, acceso: acceso_usr_global, numero: numeroCuenta, producto: producto, formato: formatoConsultado, anio: anio, mes: mes,
            claveOperaciones: claveOperaciones, OTP: OTP, posicionTASA: posicionTASA, valorPosicionTASA: valorPosicionTASA,
            digitoVerficador: digitoVerficador, valorDigitoVerficador: valorDigitoVerficador
            };
            
            console.log("usuario "+usuario_global+" acceso "+acceso_usr_global+" numero "+numeroCuenta +
                        " producto "+producto+" formato "+formatoConsultado+" anio "+anio+" mes "+mes+
                        " claveOperaciones "+claveOperaciones+" otp "+OTP+" posicionTasa "+posicionTASA+
                        " valorpostasa "+valorPosicionTASA+" digitoVer "+digitoVerficador+" valorDigitoVer "+valorDigitoVerficador);
            $("#loading").hide();
            muestraPDF(proceso, operacion, datosAplicativos);
        
        
        }
    }
    
    console.log("FIN confirmarEdoController");
}


/** Muestra PDF **/
function muestraPDF(proceso, operacion, datosAplicativos){
    
  
    
    console.log("INICIO muestraPDF proceso "+proceso+" operacion "+operacion);
    $("#loading").show();
    
    var resultado = parent.edoCuentaDelegate.recuperaDatosPDF(proceso, operacion, datosAplicativos, recuperaDatosSuccess, returnError);
    
    console.log("FIN muestraPDF");
    document.getElementById("btnConfirmar").style.display = 'none';
    document.getElementById("btnExtraNueva").style.display = 'inline';
    document.getElementById("cboNUMCUENTA").disabled = true;
    document.getElementById("cboEDONUMPERIODO").disabled = true;
    document.getElementById("inputToken").disabled = true;
}

function fail(evt) {  
    console.log(evt.target.error.code);  
}



//para convertir esta lista que devuelve la respuesta
//"ListaParametros":[{"valorParametro":valor,"nombreParametro":clave},{"valorParametro":valor,"nombreParametro":clave},...]
//en un array asociativo
//'arrayAsociativoParametros'


function convertirArrayAsociativo(arrayDeArrays){

    var arrayAsociativoParametros={};
    
    
    for (i = 0; i < arrayDeArrays.length; i++) {
        arrayAsociativoParametros[arrayDeArrays[i]["nombreParametro"]]=arrayDeArrays[i]["valorParametro"];
    }
    
    return arrayAsociativoParametros;

}








function recuperaDatosSuccess (jsonResponse) {
    
    //parent.compraInvertirDelegate.muestraAlert("Aviso entra por success\n", jsonResponse, "Aceptar");

    
    console.log("recuperaDatosSuccess ");
    var resultado = JSON.parse(jsonResponse);
    var numero = resultado.respuesta.numero;
    var fechaDeConsulta = resultado.respuesta.fechaDeConsulta;
    var periodoConsultado = resultado.respuesta.periodoConsultado;
    
    console.log("numero = " + numero);
    console.log("periodoConsultado = " + periodoConsultado);
    console.log("periodoConsultado = " + periodoConsultado);
    if (resultado != undefined && resultado.respuesta != undefined){
        
        var urlEstadoCuenta = resultado.respuesta.recursoWEB;
        var numeroCliente = resultado.respuesta.numero;
        
        var arrayParametrosRespuesta=resultado.respuesta.parametros.ListaParametros;
        
        
        var arrayAsocParametros=convertirArrayAsociativo(arrayParametrosRespuesta);
        
        console.log("urlEstadoCuenta "+urlEstadoCuenta);
        var formato=urlEstadoCuenta.substring(urlEstadoCuenta.length-3);
        
       
        
        //alert(arrayParametrosRespuesta);
        //alert(arrayAsocParametros['OPERACION']);
        
      

        var folderName =  "BCOM/" + JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
        var fechaOperacion = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.fechaservidor;
        fechaOperacion = fechaOperacion.replace("/", "");
        fechaOperacion = fechaOperacion.replace("/", "");
        var horaOperacion = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.horaservidor;
        horaOperacion = fechaOperacion.replace(":", "");
        horaOperacion = fechaOperacion.replace(":", "");
        var fileName = 'EstadoCuenta'+fechaOperacion+horaOperacion;
        
        fileName = 'EstadoCuenta'+fechaOperacion+horaOperacion;
        
        if (sessionStorage.version == 'SIMULATION'){
            // SIMULACION
            var urlCorta = "https://148.244.45.93";
        urlPeticionEstadoCuenta=urlCorta+urlEstadoCuenta+"?OPERACION="+arrayAsocParametros['OPERACION']+"&LOCALE="+arrayAsocParametros['LOCALE']+"&PAR_INICIO.0="+arrayAsocParametros['PAR_INICIO.0']+"&PAR_INICIO.1=0"+"&sesionID="+arrayAsocParametros['sesionID'];
        }
        else if(sessionStorage.version == 'TEST'){
            //TEST
            var urlCorta = "https://148.244.45.93";
            urlPeticionEstadoCuenta=urlCorta+urlEstadoCuenta+"?OPERACION="+arrayAsocParametros['OPERACION']+"&LOCALE="+arrayAsocParametros['LOCALE']+"&PAR_INICIO.0="+arrayAsocParametros['PAR_INICIO.0']+"&PAR_INICIO.1=0"+"&sesionID="+arrayAsocParametros['sesionID'];
        }else if(sessionStorage.version == 'PROD_LIGA_OCULTA'){
            //PRODUCCION LIGA OCULTA
            var urlCorta = "https://a2.bbvanet.com.mx";
            urlPeticionEstadoCuenta=urlCorta+urlEstadoCuenta+"?OPERACION="+arrayAsocParametros['OPERACION']+"&LOCALE="+arrayAsocParametros['LOCALE']+"&PAR_INICIO.0="+arrayAsocParametros['PAR_INICIO.0']+"&PAR_INICIO.1=0"+"&sesionID="+arrayAsocParametros['sesionID'];
        }else if(sessionStorage.version == 'PRODUCCION'){
            //PRODUCCION
            var urlCorta = "https://a1.bbvanet.com.mx";
            urlPeticionEstadoCuenta=urlCorta+urlEstadoCuenta+"?OPERACION="+arrayAsocParametros['OPERACION']+"&LOCALE="+arrayAsocParametros['LOCALE']+"&PAR_INICIO.0="+arrayAsocParametros['PAR_INICIO.0']+"&PAR_INICIO.1=0"+"&sesionID="+arrayAsocParametros['sesionID'];
        
        }
            
            
        console.log("url Peticion de Estado cuenta "+urlPeticionEstadoCuenta);
        
        
        
        parent.loginDelegate.wtaperturaFichero("ec_temp",urlPeticionEstadoCuenta,"temp_ec", function() {
                                               var src = "js/pdfjs/web/viewer.html?file=" + sessionStorage.localPdfPath;
                                               console.log("mostrando PDF: "+sessionStorage.localPdfPath);
                                               console.log("src para el visor pdf: ",src);
                                               
                                               console.log("iframe attr: ", $("#objectPDF").attr("src"));
                                               
                                                $("#objectPDF").attr("src",src);
                                                $("#loading").hide();
                                                $("#divPDF").show();
                                               console.log("dialogo abierto");
                                               
                                               var html=$("#divPDF-estado-cuenta").html();
                                               parent.abrirModal(html,800);
                                               
        });
    }
}
    function failCallB() {
        
        console.log("error guardar el pdf en local");
    }

function fail(error) {
	console.log(error.code);
}

function fail(evt) {
    console.log(evt.target.error.code);
}

/** Save document into device */
//First step check parameters mismatch and checking network connection if available call download function
function downloadFile(URL, Folder_Name, File_Name) {
    //Parameters mismatch check
    if (URL == null && Folder_Name == null && File_Name == null) {
        return;
    }
    else {
        //checking Internet connection availablity
        var networkState = navigator.connection.type;
        if (networkState == Connection.NONE) {
            return;
        } else {
            download(URL, Folder_Name, File_Name); //If available download function call
        }
    }
}

//Second step to get Write permission and Folder Creation
function download(URL, Folder_Name, File_Name) {
	//step to request a file system
    console.log("download URL "+URL+" folder_Name "+Folder_Name+" file_name "+File_Name);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function fileSystemSuccess(fileSystem) {
                             console.log("fileSystemSuccess URL "+URL+" fileSystem "+fileSystem);
                             var download_link = encodeURI(URL);
                             ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL
                             
                             var directoryEntry = fileSystem.root; // to get root path of directory
                             directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
                             var rootdir = fileSystem.root;
                             var fp = rootdir.fullPath; // Returns Fulpath of local directory
                             
                             fp = fp + "/" + Folder_Name + "/" + File_Name + ".pdf"; // fullpath and name of the file which we want to give
                             // download function call
                             filetransfer(download_link, fp);
                             }, fileSystemFail);
    
	
    
	function onDirectorySuccess(parent) {
        // Directory created successfuly
        console.log("Directory success");
        //alert("Directory success");
	}
    
	function onDirectoryFail(error) {
        //Error while creating directory
		mostrarError("Unable to create new directory: " + error.code);
        //alert("Unable to create new directory: " + error.code);

	}
    
    function fileSystemFail(evt) {
        //Unable to access file system
        //alert("File System Fail "+evt.target.error.code);
        console.log("File System Fail "+evt.target.error.code);
    }
}

//Third step for download a file into created folder
function filetransfer(download_link, fp) {
	var fileTransfer = new FileTransfer();
	// File download function with URL and local path
	fileTransfer.download(download_link, fp,
                          function (entry) {
                            console.log("download complete: " + entry.fullPath);
                          },
                          function (error) {
                          //Download abort errors or download failed errors
                          mostrarError("download error source " + error.source);
                          //alert("download error target " + error.target);
                          //alert("upload error code" + error.code);
                          }
                          );
}
/** Save document into device */

function mostrarError(mensaje){
	navigator.notification.confirm(
                                   mensaje,// mensaje (message)
                                   alertDismissed,// funcin 'callback' (alertCallback)
                                   "ERROR",// titulo (title)
                                   'Cerrar'// nombre del botn (buttonName)
                                   );
}
function alertDismissed() {
    console.log("Alert Dimissed ");
}

function showEtiquetaSeguridad(HdnTISEG){
    
	if (HdnTISEG == "T3"){
		$('#lblAYUDACCESO').html('Código de 8 posiciones que aparece en el dispositivo de Acceso Seguro (Enciéndelo y presiona el botón 1).<br><a href="img/normal/AyudaTokenDP270.png">Ver ayuda</a>')
	} else if(HdnTISEG == "T6"){
		$('#lblAYUDACCESO').html('Código de 8 posiciones que aparece en el dispositivo de Acceso Seguro (Enciéndelo, presiona el botón Código).<br><a href="img/normal/AyudaTokenDP270.png">Ver ayuda</a>')
	} else if (HdnTISEG == "TS1"){
		$('#lblAYUDACCESO').html('Desde tu Bancomer móvil, ingresa a "Token móvil" y selecciona "Generar código de seguridad".<br><a href="img/normal/AyudaTokenDP270.png">Ver ayuda</a>')
	}
}

function generaComprobanteFailCallback(){
    console.log("ERROR guardando Comprobante");
    compraInvertirDelegate.muestraAlert('', 'Se ha producido un error al generar el comprobante', '');
    $("body").removeClass("loading");
}

function guardarPdfEnDisco(divToExport, folderName, fileName, dataToSave, succesCallback, failCallback){
    console.log("peticionPDF ");
    //var div = $("#" + divToExport);
    
    var frame = parent.document.getElementById('contentFrame');
    var doc = (frame.contentWindow || frame.contentDocument)
    if (doc.document) doc = doc.document;
    var div = doc.getElementById(divToExport);
    
    
    //PDF CONFIGURATION
    var pdfFilename = fileName;
	parent.generaComprobantesDelegate.peticionPDF(divToExport, pdfFilename, void(0), void(0));
  	
}

function guardarImagenEnDisco(divToExport, folderName, fileName, dataToSave, succesCallback, failCallback){
	
    var frame = parent.document.getElementById('contentFrame');
    var doc = (frame.contentWindow || frame.contentDocument)
    if (doc.document) doc = doc.document;
    var div = doc.getElementById(divToExport);
    
    // IMG GENERATION
    var imagePrincipalName =  fileName+".png";
    html2canvas( div, {
                onpreloaded:function() {
                $('#cabecera-comprobante').css('visibility','visible');
                },
                onrendered: function(canvas) {
                $('#cabecera-comprobante').css('visibility','hidden');
                var imageData = canvas.toDataURL().replace(/data:image\/png;base64,/,'');
                imageData = atob(imageData);
                saveToDisk(folderName, imagePrincipalName, imageData, void(0), void(0));
                }
                });
    
}


function saveToDisk(folderName, fileName, dataToSave, succesCallback, failCallback){
	var filePath;
	console.log("Inicio saveToDisk folderName "+folderName+" fileName "+fileName+" dataToSave "+dataToSave);
    var i = 0;
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
                                                                                                 i++;
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
	
    function saveImagenComprobanteSuccessCallback(){
        $("body").removeClass("loading");
        if (i == 1)
            compraInvertirDelegate.muestraAlert('Aviso','Se ha generado correctamente el comprobante.','Aceptar');
    }
    
    function generaComprobanteFailCallback(){
        console.log("ERROR guardando Comprobante");
        if (i == 1)
            compraInvertirDelegate.muestraAlert('', 'Se ha producido un error al generar el comprobante', '');
        $("body").removeClass("loading");
    }
    
	return filePath;
}


// __________ Fin javascript _____________


//------------------------------------ Nuevo javascript ---------------------------------------------//


// Variables Globales

var cuentasOrigen;
var cuentaOrigen;
var periodoSeleccionado;
var listaPeriodosCuenta;
var nombreFicheroEstadoCuenta;
var rutaPdfLocal;
var URL_PDF_Request;

var procesoEdoCuenta = "imd_consulta_estado_cuenta_pdf_pr";
var operacionEdoCuenta = "imd_consulta_estado_cuenta_pdf_op";
var accionRecuperarPeriodo = "consultaPeriodos";
var accionConsultaEstadoDeCuenta = "consultaEstadoDeCuenta";

var posGlobal= JSON.parse(sessionStorage.jsonPosicion).posicionGlobal;
var acceso_usr_global = posGlobal.acceso_usr;
var usuario_global = posGlobal.usuario_usr;
var listaCuentasMPX = posGlobal.asuntos.lista_cuentas_mxp;
var listaCuentasTC = posGlobal.asuntos.lista_tarjetascredito;
var listaCuentasUSD = posGlobal.asuntos.lista_cuentas_usd;


// ---------------------  Auxiliares



var TIPO_AH="AH";
var TIPO_CH="CH";
var TIPO_LI="LI";
var TIPO_TC="TC";
var TIPO_IN="IN";
var TIPO_TP="TP";



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


function formatNumberDolarImporte(number) {
    var str = number + "";
    x = str.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return (x1 + x2);
}



/**
 * Get nombre por key
 *
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



//------------------   Fin auxiliares
        
function loadViewEstadoCuentas(){
    cargarListaCuentas();

}


function crearElementoCuentaOrigen(divId, tableId, saldo, numeroCuenta, tipoCuenta, idCuenta){
    var listaOrigen = document.getElementById('lista-cuenta-origen');
    
    console.log('crearElementoCuentaOrigen divId '+divId);
    
    var newLi = document.createElement('li');
    var newDiv = document.createElement('div');
    
    newDiv.setAttribute("class", "lista-cuenta-origen");
    newDiv.setAttribute("id", divId);
    newDiv.setAttribute("value",idCuenta);
    newDiv.setAttribute("onclick", "origenSelected(this);");
    var newTable = document.createElement('table');
    newTable.setAttribute("id", tableId);
    var fila1 = "transferir-miscuentas-tab-filauno";
    var fila2 = "transferir-miscuentas-tab-filados";
    
    //First row
    createTRDragButton(fila1,newTable, numeroCuenta, getTipoCuentaName(tipoCuenta));
    //Second row
    createTRDragButton(fila2,newTable,'$', saldo);
    newDiv.appendChild(newTable);
    newLi.appendChild(newDiv);
    listaOrigen.appendChild(newLi);
    
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
    td_left.setAttribute("class", "transferir-miscuentas-tab-columna-izq");
    td_left.appendChild(document.createTextNode(valueTd1));
    tr_first.appendChild(td_left);
    var td_right = document.createElement("td");
    td_right.setAttribute("class", "transferir-miscuentas-tab-columna-der");
    td_right.appendChild(document.createTextNode(valueTd2));
    tr_first.appendChild(td_right);
    
    newTable.appendChild(tr_first);
}




function cargarListaCuentas() {
    var numeroCuenta;
    var saldoDisponible;
    var tipo;
    var alias;
    
    cuentasOrigen =[];
    
    var j=0;
    
    for (var i = 0; i < listaCuentasMPX.length; i++){
        cuentasOrigen.push(listaCuentasMPX[i]);
        numeroCuenta = listaCuentasMPX[i].numero;
        saldoDisponible = listaCuentasMPX[i].saldo_disponible;
        tipo = listaCuentasMPX[i].tipo;
        alias = listaCuentasMPX[i].alias;
        if (typeof alias == 'undefined' || alias == ""){
            alias = numeroCuenta.slice(-10);
        }
        
        crearElementoCuentaOrigen("lista-cuenta-origen-"+(i+1),"drag-t"+(i=="0"?"":i+1), accounting.formatMoney(saldoDisponible, "", 2, ",", "."),alias, tipo, listaCuentasMPX[i].id);
        j=j+1;
    }
    
    //var j=i;
    if (listaCuentasTC!=null){
     for (var i = 0; i < listaCuentasTC.length; i++){
        
        cuentasOrigen.push(listaCuentasTC[i]);
        numeroCuenta = listaCuentasTC[i].numero;
        saldoDisponible = listaCuentasTC[i].saldocorte;
        tipo = listaCuentasTC[i].tipo;
        alias = listaCuentasTC[i].alias;
        
        if (typeof alias == 'undefined' || alias == ""){
            alias = mostrarUltimos5DigitosTDC(numeroCuenta.toString());
        }

        crearElementoCuentaOrigen("lista-cuenta-origen-"+(j+i+1),"drag-t"+(i=="0"?"":j+i+1), accounting.formatMoney(saldoDisponible, "", 2, ",", "."), alias , tipo, listaCuentasTC[i].id);
        j=j+1;
    }
   }

    //j=j+i;
   if (listaCuentasUSD!=null){
    for (var i = 0; i < listaCuentasUSD.length; i++){
        if (listaCuentasUSD[i].plaza == "MEXICO"){
            cuentasOrigen.push(listaCuentasUSD[i]);
        numeroCuenta = listaCuentasUSD[i].numero;
        saldoDisponible = listaCuentasUSD[i].saldo_disponible;
        tipo = listaCuentasUSD[i].tipo;
            
        alias = listaCuentasUSD[i].alias;
        if (typeof alias == 'undefined' || alias == ""){
            alias = numeroCuenta.slice(-10);
        }

        
        crearElementoCuentaOrigen("lista-cuenta-origen-"+(j+i+1),"drag-t"+(i=="0"?"":j+i+1), accounting.formatMoney(saldoDisponible, "", 2, ",", "."), alias, tipo, listaCuentasUSD[i].id);
        j=j+1;
        }
    }
  }
    
    var listaOrigen = document.getElementById('lista-cuenta-origen');
    
    listaOrigen.parentNode.className = (cuentasOrigen.length < 9)?"":"overflowS";
    
    console.log("FIN carga de cuentas");
    
}

function cargaListaPeriodos(){
    
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var listaPeriodos = document.getElementById('lista-periodos');
    listaPeriodos.innerHTML = '';
    for (var i in listaPeriodosCuenta) {
        
        var mes = meses[parseInt(listaPeriodosCuenta[i].mes) -1];
        console.log("listaPeriodosCuenta mes",mes);
        
        
        var newLi = document.createElement('li');
        var newDiv = document.createElement('div');
        newDiv.setAttribute("id", "periodo-"+i);
        newDiv.className = "lista-periodos-estado-cuenta";
        newDiv.setAttribute("onclick", "periodoSelected(this);");
        newDiv.setAttribute("value", i);
        newDiv.innerHTML = mes +" "+listaPeriodosCuenta[i].anio;
        
        newLi.appendChild(newDiv);
        listaPeriodos.appendChild(newLi);
    }
    
   listaPeriodos.parentNode.className = (listaPeriodosCuenta.length < 8)?"":"overflowS";
    
}



function origenSelected(divOrigen){
    
    $(".lista-cuenta-origen").each(
                                   function () {
                                   $('.div-selectedAccount', this).remove();
                                   });
    
    
    var newDiv = document.createElement("div");
    newDiv.className = "div-selectedAccount";
    
    divOrigen.appendChild(newDiv);
    
    console.log(divOrigen);
    
    console.log("seteando cuenta origen  " + divOrigen.getAttribute("value") + "\n");
    setCuentaOrigen(divOrigen.getAttribute("value"));
    console.log("Realizar peticion de periodos para la cuenta  " + divOrigen.getAttribute("value") + "\n");
   
   
    recuperaListaPeriodos();
    $("#transferir-desactivar-miscuentas-datos-operacion").css("display","block");
    
}

function periodoSelected(divPeriodo){
    
   
    $(".lista-periodos-estado-cuenta").each(
                                    function () {
                                    $('.div-selectedAccount', this).remove();
                                    });
    
    
    var newDiv = document.createElement("div");
    newDiv.className = "div-selectedAccount";
    
    divPeriodo.appendChild(newDiv);
    
    setPeriodoCuenta(divPeriodo.getAttribute("value"));
   
}


function setPeriodoCuenta(id){
     periodoSeleccionado = undefined;
     periodoSeleccionado = listaPeriodosCuenta[id];
    
     console.log("periodoSeleccionado = "+periodoSeleccionado);
    

}


function setCuentaOrigen (id){
    
    console.log("cuentaOrigen Selected"+id);
    var i = 0;
    while (i<cuentasOrigen.length && cuentasOrigen[i].id != id){
        i++;
    }
    if(cuentasOrigen[i].id == id){
        cuentaOrigen = cuentasOrigen[i];
    }
    
    
}

/**
 * recuperaListaPeriodos
 */
function recuperaListaPeriodos(){
    console.log("INICIO recuperaListaPeriodos");
    
    var proceso = procesoEdoCuenta;
    var operacion = operacionEdoCuenta;
    var accion = accionRecuperarPeriodo;
   
    var datosAplicativos = { usuario: usuario_global, acceso: acceso_usr_global, id: cuentaOrigen.id };
    console.log("recuperaPeriodos proceso "+proceso+" operacion "+operacion+" datosAplicativos "+datosAplicativos);
    
    parent.edoCuentaDelegate.recuperaPeriodos(proceso, operacion, datosAplicativos, successRecuperaPeriodos, returnErrorPeriodos);
    parent.showLoadingLayer();
    parent.document.getElementById('imgMenu').style.zIndex='0';
    console.log("FIN recuperaListaPeriodos");
}


function returnErrorPeriodos (errorMessage) {
    
    console.log(errorMessage);
    var listaPeriodos = document.getElementById('lista-periodos');
    listaPeriodos.innerHTML = '';
    $("#noPeriodos").hide();

    parent.hideLoadingLayer();
    //parent.baseViewController.validaLocation('isMisCuentas','nb-estado','');
    
    

}

function successRecuperaPeriodos(jsonResponse){
    console.log("successRecuperaPeriodos  Respuesta = "+JSON.parse(jsonResponse).respuesta);
    
    //----------------------------------------------------------------------------//
    console.log("*****recuperaPeriodos jsonResponse	"+jsonResponse);
    var respuesta = JSON.parse(jsonResponse).respuesta;
    var numeroCuentaPeriodos = respuesta.numero;
     listaPeriodosCuenta = respuesta.periodos.ListaPeriodos;
    
    var fechaActual= new Date();
    var mesActual= parseInt(fechaActual.getMonth())+1;
    var anioActual= parseInt(fechaActual.getFullYear());
    var anioLimite=anioActual;
    
    if (mesActual<12){
        anioLimite=anioActual-1;
    }
    
    var mesLimite= mesActual+1;
    if (mesLimite>12){
        mesLimite=1;
    }
    
    var i=0;
    
   
    var mes="";
    var anio="";
    
    var array_mes_anio=[];
    
    $.each(listaPeriodosCuenta,function(key, value)
           {
           
           // mes = getMonthName(tempData.periodos.ListaPeriodos[key].mes);
           
           mes = parseInt(listaPeriodosCuenta[key].mes);
           anio= parseInt(listaPeriodosCuenta[key].anio);
           console.log("ListaPeriodos mes",mes);
           console.log("ListaPeriodos anio",anio);
           
           
           array_mes_anio[i]=[mes,anio];
           i=i+1;
          });
    
    //ordena el array de mes año en orden ascendente
    array_mes_anio.sort(function(a,b){
                        
                        if ((a[0] < b[0]) && (a[1] == b[1])) return 1; //mayor el segundo
                        if ((a[0] > b[0]) && (a[1] == b[1])) return -1; //mayor el primero
                        if ((a[0] > b[0]) && (a[1] > b[1])) return  -1; //mayor el primero
                        if ((a[0] > b[0]) && (a[1] < b[1])) return  1; //mayor el segundo
                        if ((a[0] < b[0]) && (a[1] > b[1])) return  -1; //mayor el primero
                        if ((a[0] < b[0]) && (a[1] < b[1])) return  1; //mayor el segundo
                        if ((a[0] == b[0]) && (a[1] > b[1])) return  -1; //mayor el primero
                        if ((a[0] == b[0]) && (a[1] < b[1])) return  1; //mayor el segundo
                        return 0;
                        
                        });
    
    
    i=0;
    
    console.log("array_mes_anio  "+array_mes_anio);

    listaPeriodosCuenta = [];
    while (i<array_mes_anio.length){
        
        if (((array_mes_anio[i][1]==anioLimite)&&(array_mes_anio[i][0]>=mesLimite))
            || ((array_mes_anio[i][1]==anioLimite+1)&&(array_mes_anio[i][0]<mesLimite))){
            
         listaPeriodosCuenta.push({mes:array_mes_anio[i][0],anio:array_mes_anio[i][1]});
            
        }
        
        i=i+1;
        
    }

//    listaPeriodosCuenta = [];
    console.log("numero = " + numeroCuentaPeriodos);
    console.log("ListaPeriodos length = " + listaPeriodosCuenta.length);
   
    if (listaPeriodosCuenta.length > 0) {
        $("#noPeriodos").hide();
        cargaListaPeriodos();
    } else {
        $("#noPeriodos").show();
    }
    
    $("#transferir-desactivar-miscuentas-cuentas-destino").css("display","none");
    parent.hideLoadingLayer();
}


function validaDatosOperacion(){
    
    if(cuentaOrigen == undefined || periodoSeleccionado == undefined){
    
        parent.loginDelegate.showAlert("Aviso\n","Es obligatorio seleccionar una Cuenta y un periodo.","Aceptar");
    
    } else {
    
        parent.muestraToken('TOKENEDOCTA');
    
    }


}
function quitarFocoInputToken (){
    
    var inputToken = parent.document.getElementById("inputToken");
    inputToken.blur();
    
}


function confirmaConsultaEstadoCuenta(){
    quitarFocoInputToken();
    var otp = parent.document.getElementById("tokenValue").value;
    parent.document.getElementById("tokenValue").value = "";
    console.log("OTP ------> "+otp);
    
    var proceso = procesoEdoCuenta;
    var operacion = operacionEdoCuenta;
    var numeroCuenta = cuentaOrigen.numero;
    var producto = cuentaOrigen.tipo;
    var anio = periodoSeleccionado.anio;
    var mes = periodoSeleccionado.mes;
    var formatoConsultado = "pdf";
    var claveOperaciones = "00000000";
    
        var posicionTASA = "";
        var valorPosicionTASA = "";
        var digitoVerficador = "";
        var valorDigitoVerficador="";
        
    
        var datosAplicativos =
        {
        usuario: usuario_global, acceso: acceso_usr_global, numero: numeroCuenta, producto: producto, formato: formatoConsultado, anio: anio, mes: mes,
        claveOperaciones: claveOperaciones, OTP: otp, posicionTASA: posicionTASA, valorPosicionTASA: valorPosicionTASA,
        digitoVerficador: digitoVerficador, valorDigitoVerficador: valorDigitoVerficador
        };
        
        console.log("usuario "+usuario_global+" acceso "+acceso_usr_global+" numero "+numeroCuenta +
                    " producto "+producto+" formato "+formatoConsultado+" anio "+anio+" mes "+mes+
                    " claveOperaciones "+claveOperaciones+" otp "+otp+" posicionTasa "+posicionTASA+
                    " valorpostasa "+valorPosicionTASA+" digitoVer "+digitoVerficador+" valorDigitoVer "+valorDigitoVerficador);
    
       parent.edoCuentaDelegate.recuperaDatosPDF(proceso, operacion, datosAplicativos, recuperaDatosPdfSuccess, returnErrorDatos);
        
        
}

function returnErrorDatos (errorMessage) {
    
    console.log(errorMessage);
    parent.hideLoadingLayer();
    parent.baseViewController.validaLocation('isMisCuentas','nb-estado','');
    
    
    
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



function recuperaDatosPdfSuccess (jsonResponse) {

    console.log("recuperaDatosSuccess ");
    var resultado = JSON.parse(jsonResponse);
    var numero = resultado.respuesta.numero;
    var fechaDeConsulta = resultado.respuesta.fechaDeConsulta;
    var periodoConsultado = resultado.respuesta.periodoConsultado;
    
    console.log("numero = " + numero);
    console.log("periodoConsultado = " + periodoConsultado);
    console.log("periodoConsultado = " + periodoConsultado);
    
    var URL_Base = "https://test.bbvanet.com.mx/";
    var recursoWeb = resultado.respuesta.recursoWEB;
    var listaParametrosUrl = resultado.respuesta.parametros.ListaParametros;
    
    URL_PDF_Request = constructURLPDFRequest(URL_Base,recursoWeb,listaParametrosUrl);
    
    
        var urlEstadoCuenta = resultado.respuesta.recursoWEB;
        var numeroCliente = resultado.respuesta.numero;
        
        var arrayParametrosRespuesta=resultado.respuesta.parametros.ListaParametros;
        
        
        var arrayAsocParametros=convertirArrayAsociativo(arrayParametrosRespuesta);
        
        console.log("urlEstadoCuenta "+urlEstadoCuenta);
        var formato=urlEstadoCuenta.substring(urlEstadoCuenta.length-3);
                
        var folderName =  "BCOM/" + JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
       // var fechaOperacion = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.fechaservidor;
    
        var fechaOperacion = resultado.respuesta.fechaDeConsulta;
        fechaOperacion=formatearFechaParaComprobante(fechaOperacion);
    
    
        //var horaOperacion = JSON.parse(sessionStorage.jsonReglasNegocio).usuario.horaservidor;
        var horaOperacion = resultado.respuesta.horaDeConsulta;
        horaOperacion=formatearHoraParaComprobante(horaOperacion);

    
        var fileName = 'EstadoCuenta'+fechaOperacion+horaOperacion;
    
    var numeroCuenta= numero.toString();
    
    
        nombreFicheroEstadoCuenta = fechaOperacion+"_"+horaOperacion+"_"+numeroCuenta.slice(-10)+"_EDOCUENTA";
    
    
    //debugger;
    if (sessionStorage.version == 'SIMULATION'){
        // SIMULACION
        /*var urlCorta = "ttps://148.244.45.93";
        
        urlPeticionEstadoCuenta=urlCorta+urlEstadoCuenta+"?OPERACION="+arrayAsocParametros['OPERACION']+"&LOCALE="+arrayAsocParametros['LOCALE']+"&PAR_INICIO.0="+arrayAsocParametros['PAR_INICIO.0']+"&PAR_INICIO.1=0"+"&sesionID="+arrayAsocParametros['sesionID'];*/
        
        urlPeticionEstadoCuenta=urlEstadoCuenta;
    }
    else if(sessionStorage.version == 'TEST'){
        //TEST
        var urlCorta = "https://148.244.45.93";
        urlPeticionEstadoCuenta=urlCorta+urlEstadoCuenta+"?OPERACION="+arrayAsocParametros['OPERACION']+"&LOCALE="+arrayAsocParametros['LOCALE']+"&PAR_INICIO.0="+arrayAsocParametros['PAR_INICIO.0']+"&PAR_INICIO.1=0"+"&sesionID="+arrayAsocParametros['sesionID'];
    }else if(sessionStorage.version == 'PROD_LIGA_OCULTA'){
        //PRODUCCION LIGA OCULTA
        var urlCorta = "https://a2.bbvanet.com.mx";
        urlPeticionEstadoCuenta=urlCorta+urlEstadoCuenta+"?OPERACION="+arrayAsocParametros['OPERACION']+"&LOCALE="+arrayAsocParametros['LOCALE']+"&PAR_INICIO.0="+arrayAsocParametros['PAR_INICIO.0']+"&PAR_INICIO.1=0"+"&sesionID="+arrayAsocParametros['sesionID'];
    }else if(sessionStorage.version == 'PRODUCCION'){
        //PRODUCCION
        var urlCorta = "https://a1.bbvanet.com.mx";
        urlPeticionEstadoCuenta=urlCorta+urlEstadoCuenta+"?OPERACION="+arrayAsocParametros['OPERACION']+"&LOCALE="+arrayAsocParametros['LOCALE']+"&PAR_INICIO.0="+arrayAsocParametros['PAR_INICIO.0']+"&PAR_INICIO.1=0"+"&sesionID="+arrayAsocParametros['sesionID'];
        
    }
    
    

        console.log("url Peticion de Estado cuenta "+urlPeticionEstadoCuenta);
    
    URL_PDF_Request=urlPeticionEstadoCuenta;
    
            posGlobal = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal;
            acceso_usr_global=posGlobal.acceso_usr;
            usuario_global = posGlobal.usuario_usr;
            
        parent.guardadoComprobantesDelegate.savePDFWithNameAndFromUrl("ec_temp", urlPeticionEstadoCuenta, "temp_ec", successCallBPdf, failCallBPdf);
        
 
}

// Construye la url del pdf de estado de la cuenta.
function constructURLPDFRequest(URL_Base,recursoWeb,listaParametrosUrl){
    var result = URL_Base+recursoWeb+"?";
    for(var i = 0; i<listaParametrosUrl.length; i++){
       result+= (i == listaParametrosUrl.length-1)?listaParametrosUrl[i].nombreParametro+"="+listaParametrosUrl[i].valorParametro:listaParametrosUrl[i].nombreParametro+"="+listaParametrosUrl[i].valorParametro+"&";
        
    }
    return result;

}

function successCallBPdf (response) {
    
   // var url="../../../temp_ec/ec_temp.pdf";
    
    var url="file://"+response;

    
    
   // var url="ttps://oficinavirtual.ugr.es/apli/solicitudPAU/test.pdf";
    
    var src = "js/pdfjs/web/viewer.html?file=" + url;
    console.log("src para el visor pdf  ",src);
    parent.hideLoadingLayer();
    
    $("#objectPDF").attr("src",src);
    
    console.log(" abriendo dialog estado de cuenta");
    
    var html = $("#divPDF-estado-cuenta").html();
    console.log("Dialogo abierto");
    
    parent.abrirModal(html,800);
    
}

function failCallBPdf() {
    
    parent.hideLoadingLayer();
    parent.loginDelegate.showAlert("Aviso\n","De momento no se puede mostrar el documento. Intente mas tarde.","Aceptar");
    parent.baseViewController.validaLocation('isMisCuentas','nb-estado','');
    
}


function cierraPdfEstadoCuenta(){
    parent.edoCuentaDelegate.showConfirmationMessage("Aviso\n", "Deseas cerrar el Estado de cuenta", "Aceptar", "Cancelar");
}

function showConfirmacionguardarComponentePDF(){

     parent.edoCuentaDelegate.showConfirmacionguardarComponentePDF("Aviso\n", "Confirmas que deseas guardar el comprobante?", "Aceptar", "Cancelar", guardarComponentePDF);

}

function guardarComponentePDF(){

    console.log("guardado   Comprobante");
//window.frames.contentFrame.guardarComponentePDF(JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr, URL_PDF_Request, nombreFicheroEstadoCuenta);
    var usuario = acceso_usr_global.toString();
     parent.edoCuentaDelegate.showConfirmationMessage("Aviso\n", "¿Deseas guardar el comprobante?", "Aceptar", "Cancelar",usuario, URL_PDF_Request, nombreFicheroEstadoCuenta);
    
  // parent.guardadoComprobantesDelegate.savePDFWithNameAndFromUrl(JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr, URL_PDF_Request, nombreFicheroEstadoCuenta, successGuardadoPdf, failGuardadoPdf);

}

function successGuardadoPdf(){
    loginDelegate.showAlert("Aviso\n","El Estado de cuenta se guardó con exito.","Aceptar");
}

function failGuardadoPdf(){
    // Error al guardar el PDF en su localización definitiva
}


function guardarPNGyPDF(){
    
    // var folioOperacion = QueryString.folio;
    
   /* parent.document.getElementById("dialogHide").innerHTML = "";
    parent.document.getElementById("dialogHide").style.display = "block";
    
    parent.document.getElementById("dialogHide").innerHTML = parent.document.getElementById("dialContainer").innerHTML;
    */
    //fechaFinal=formatearFechaParaComprobante(fechaFinal);
    
    fechaFinal="20150623";

    
    //cargar la hora del comprobante
    var date = new Date();
    horaFinal= addZeroSingleNumber(date.getHours())+""+addZeroSingleNumber(date.getMinutes())+""+addZeroSingleNumber(date.getSeconds());
    
    var nombreComprobante=fechaFinal+"_"+horaFinal+"_"+folioOperacion+"_EDOCUENTA";
    
    
    parent.generaComprobantesDelegate.leerImagenComprobante('objectPDF',nombreComprobante,void(0),void(0));
    
}



