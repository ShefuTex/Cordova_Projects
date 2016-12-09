cordova.define("BComApp.BCom.GuardadoComprobantesViewController.GuardadoComprobantesDelegate", function(require, exports, module) {// __________ Inicia Phonegap __________
               
               var exec = require('cordova/exec');
               
               function GuardadoComprobantesDelegate() {}
               
               GuardadoComprobantesDelegate.prototype.leerComprobantesGua = function(itemReadCallback, allItemsReadCallback) {
               var index = 0;
               console.log('leyendo comprobantes.');
               var folderNm = "BCOM/"+JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
               var listComprobantes = readDirectory(folderNm, '.png', 'comprobante_');
               
               window.setTimeout(function() {
                                 console.log("comprobantes encontrados "+listComprobantes);
                                 listaComp(listComprobantes, itemReadCallback, allItemsReadCallback);
                                 }, 1000);
               
               }
               
               function listaComp(listComprobantes, itemReadCallback, allItemsReadCallback){
               
                    if (listComprobantes != null){
                       console.log("comprobantes length "+listComprobantes.length);
                       for (var i = 0; i < listComprobantes.length; i++) {
                           console.log("comprobante "+i+" "+(listComprobantes[i]));
                           if (listComprobantes[i].name != 'undefined'){
               
                               var portfolio = calculaNumero(listComprobantes[i].name);
                               var path = listComprobantes[i].fullPath.replace(listComprobantes[i].name,'');
                               console.log("comprobante "+i+" name "+(listComprobantes[i].name) + " portfolio "+portfolio+" path "+path);
                               var itemName = listComprobantes[i].name;
                               console.log("buscarComprobanteInfo success itemName "+itemName+" index "+i+" indexOf "+itemName.indexOf("comprobante_"));
               
                               if ( 
                                   ( (imageExists(path+"/"+itemName) == true) && (itemName.indexOf("comprobante_")==0) )
                                   ){
                                    itemReadCallback(path, itemName, portfolio, i);
                               }
               
                           }
                       }
                   }
                   allItemsReadCallback();
               }
               
               GuardadoComprobantesDelegate.prototype.leerEdosCuentaGuar = function() {}
               
               GuardadoComprobantesDelegate.prototype.leerImagenComprobantePrevia = function() {}
               
               GuardadoComprobantesDelegate.prototype.leerImagenComprobanteRecortada = function() {}
               
               GuardadoComprobantesDelegate.prototype.peticionPDF = function() {}
               
               GuardadoComprobantesDelegate.prototype.incrustadoPDF = function() {}
               
               GuardadoComprobantesDelegate.prototype.validaAcciones = function() {}
               
               GuardadoComprobantesDelegate.prototype.limpiaCache = function() {}
               
               GuardadoComprobantesDelegate.prototype.accionesComprobantes = function() {}
               
               GuardadoComprobantesDelegate.prototype.accionesEdosCuenta = function() {}
               
               GuardadoComprobantesDelegate.prototype.recuperaEdosCuenta = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "GuardadoComprobantesDelegate",
                    "recuperaEdosCuenta",
                    []
                    );
               }
               
               GuardadoComprobantesDelegate.prototype.recuperaComprobantes = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "GuardadoComprobantesDelegate",
                    "recuperaComprobantes",
                    []
                    );
               }
               
               GuardadoComprobantesDelegate.prototype.recuperaImgComprobantes = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "GuardadoComprobantesDelegate",
                    "recuperaImgComprobantes",
                    []
                    );
               }
               
               GuardadoComprobantesDelegate.prototype.recuperaImgEdosCuenta = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "GuardadoComprobantesDelegate",
                    "recuperaImgEdosCuenta",
                    []
                    );
               }
               
               var guardadoComprobantesDelegate = new GuardadoComprobantesDelegate();
               module.exports = guardadoComprobantesDelegate;
               
               // __________ Termina Phongegap __________
               
               });

// __________ Inicia JS __________

function calculaNumero(fileName) {
    console.log("calculaNumero "+fileName);
    index = fileName.lastIndexOf('_')+1;
    return fileName.substring(index, fileName.lastIndexOf('.'));
}

function buscarComprobanteInfo(portfolio, success, fail) {
    var folderName = "BCOM/"+JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
    var jsonName = 'comprobante_'+portfolio +".png";
    var dfd = new $.Deferred();
    
    console.log("Buscando info comprobante almacenado localstorage jsonName "+jsonName+" folderName "+folderName);
    readFile(folderName, jsonName, function(textJson){
             console.log(" ****buscarComprobanteInfo textJson "+textJson+" length "+textJson.length);
             if (textJson.length > 0){
             console.log(" ****buscarComprobanteInfo "+textJson);
             success(textJson);
             } else {
             fail();
             }
             
             });
    
}

function readDirectory(folderName, filterExtension, filterPrefix){
	var listFile = new Array();
	var isPrefix = false;
	var isExtension = false;
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                             console.log('requestFileSystem OK');
                             fileSystem.root.getDirectory( folderName, { create: true, exclusive: false },
                                  function ( dirEntry ) {
                                  console.log('GetDirectory '+folderName+' OK');
                                  
                                  var dirReader = dirEntry.createReader();
                                  dirReader.readEntries(function(entries) {
                                                        for(var i = 0; i < entries.length; i++) {
                                                        var entry = entries[i];
                                                        console.log("readDirectory "+folderName+" Fichero "+entry.name);
                                                        if (entry.isDirectory){
                                                        console.log('Directory: ' + entry.fullPath);
                                                        }
                                                        else if (entry.isFile){
                                                        isPrefix = true;
                                                        console.log("readDirectory "+folderName+" Fichero "+entry.name +" filterPrefix "+filterPrefix+" entry.name.startsWith(filterPrefix) "+entry.name.indexOf(filterPrefix));
                                                        if (filterPrefix != null && entry.name.indexOf(filterPrefix)==-1){
                                                        isPrefix = false;
                                                        }
                                                        isExtension = true;
                                                        
                                                        console.log("readDirectory "+folderName+" Fichero "+entry.name +" filterPrefix "+filterPrefix+" entry.name.endssWith(filterPrefix) "+entry.name.indexOf(filterPrefix, (entry.name.length) - filterPrefix.length ));
                                                        if (filterExtension != null &&  ( entry.name.indexOf(filterPrefix, (entry.name.length) - filterPrefix.length )!=-1 ) ){
                                                        isExtension = false;
                                                        }
                                                        console.log("readDirectory isExtension "+isExtension+" isPrefix "+isPrefix);
                                                        if (isExtension && isPrefix){
                                                        console.log("****entry name "+entry.name+" Entry "+entry );
                                                        

                                                            listFile.push(entry);
                                                            console.log("****push nueva entrada. " + entry.name);

                                                        
                                                        }
                                                        }
                                                        }
                                                        
                                                        }, errorHandler);
                                  }	);
                             }, fileSystemFail);
	
	return listFile;
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

function readFile(folderName, fileName, success){
	var listFile = new Array();
	var isPrefix = false;
	var isExtension = false;
	var textFile;
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem)
                             {
                             console.log("requestFileSystem OK"	);
                             fileSystem.root.getDirectory( folderName, { create: false, exclusive: false },
                                                          function ( dirEntry ) {
                                                          console.log("GetDirectory "+folderName+" OK dirEntry "+dirEntry);
                                                          folderDir = dirEntry;
                                                          folderDir.getFile( fileName, { create: true, exclusive: false },
                                                                            function ( fileEntry ) {
                                                                            console.log("getFile "+fileName+" OK fileEntry "+fileEntry);
                                                                            fileDir = fileEntry;
                                                                            fileDir.file(function(file) {
                                                                                         var reader = new FileReader();
                                                                                         reader.onloadend = function(evt) {
                                                                                         console.log("getFile file success evt "+evt+"evt.target "+evt.target+" result "+evt.target.result);
                                                                                         success(evt.target.result);
                                                                                         };
                                                                                         reader.readAsText(file);
                                                                                         }, errorHandler);
                                                                            }, errorHandler );
                                                          }, errorHandler );
                             }, fileSystemFail);
	
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
}

function fileSystemFail(evt) {
    console.log(evt.target.error.code);
}

// __________ Termina JS __________