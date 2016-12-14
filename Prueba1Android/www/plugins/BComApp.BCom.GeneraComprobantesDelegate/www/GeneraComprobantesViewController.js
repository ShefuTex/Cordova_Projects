cordova.define("BComApp.BCom.GeneraComprobantesDelegate.GeneraComprobantesDelegate", function(require, exports, module) {// __________ Inicia Phonegap __________
               
               var exec = require('cordova/exec');
               
               function GeneraComprobantesDelegate() {}
               
               GeneraComprobantesDelegate.prototype.leerCuentas = function() {console.log('leerCuentas');}
               
               GeneraComprobantesDelegate.prototype.leerCuentasPeriodos = function() {console.log('leerCuentasPeriodos');}
               
               GeneraComprobantesDelegate.prototype.leerOperaciones = function() {}
               
               GeneraComprobantesDelegate.prototype.mostrarOpciones = function(datosAplicativos, folio, successCallBack, errorCallBack) {
               exec(
                    function(jsonResponse) {
                    console.log("entra por ok en Generacomprobantes");
                    successCallBack(jsonResponse, folio);
                    },
                    function (errorMessage) {
                    console.log("entra por error en Generacomprobantes");
                    errorCallBack(errorMessage);
                    },
                    "GeneraComprobantesDelegate",
                    "recuperaOperaciones",
                    [datosAplicativos]
                    );
               
               }
               
               
               GeneraComprobantesDelegate.prototype.pngToPDF = function(pngFileName, successCallBack, errorCallBack) {
               console.log("Entrando pngToPDF");
              // var urlPdfWebtrader = "http://ifbdpsb.infobolsa.es/pdfs/EMISNET/2015/20150205/20150205165019FEB5_avisubmv_573307_1.pdf";
               exec(
                    function(jsonResponse) {
                    console.log("entra por ok en pngToPDF");
                    generaComprobantesDelegate.showAlert('Aviso','Se ha generado correctamente el comprobante.','Aceptar');
                    
                    },
                    function (errorMessage) {
                    console.log("entra por error en pngToPDF");
                    
                    },
                    "GeneraComprobantesDelegate",
                    "pngToPDF",
                    [pngFileName, sessionStorage.userCardNumber]
                    );
               
               }

               
               
               
               
               GeneraComprobantesDelegate.prototype.mostrarAyuda = function() {}
               
               GeneraComprobantesDelegate.prototype.peticionPDF = function(divToExport, portfolio, successCallback, failCallback) {
               console.log("peticionPDF ");
               //               var div = $("div#" + divToExport + "");
               
               var frame = parent.document.getElementById('contentFrame');
               var doc = (frame.contentWindow || frame.contentDocument)
               if (doc.document) doc = doc.document;
               var div = doc.getElementById(divToExport);
               
               var folderName = "BCOM/" + JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
               //PDF CONFIGURATION
               var pdfFilename = portfolio+".pdf";
               
               var leftmargin = 150;
               var topmargin = 10;
               
               var leftmargin = 150;
               var topmargin = 10;
               
               //PDF GENERATION
               var doc = new jsPDF('p', 'pt', 'a4');

               doc.addHTML(div, leftmargin, 2 * topmargin , {format : 'PNG'}, 
            		   function() {
                           saveToDisk(folderName,pdfFilename, doc.output(), successCallback, failCallback);
                       }
               );
        }
               
        GeneraComprobantesDelegate.prototype.leerImagenComprobante = function(divToExport, portfolio, successCallback, failCallback) {

//                   var frame = parent.document.getElementById('contentFrame');
//                   var doc = (frame.contentWindow || frame.contentDocument)
//                   if (doc.document) doc = doc.document;
               
                   var div = document.getElementById(divToExport);
              div.style.border = "none";
               
                  // var folderName = "BCOM/"+JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
               var folderName = "BCOM";

               
                   
               
                   // IMG GENERATION
                   var imagePrincipalName =  portfolio+".png";
                   //var imageLeidaName =  "comprobante_"+portfolio+"_leido.png";
                   var imageData = null;

               
	               	html2canvas( div, {
	            		/*onpreloaded:function() {
	            			$('#cabecera-comprobante').css('visibility','visible');
	                    },*/
                                
	                    onrendered: function(canvas) {
	                    	$('#cabecera-comprobante').css('visibility','hidden');
                               // theCancas=canvas;
                               // document.body.appendChild(canvas);
                                //document.getElementById("dialogHide");
                                //$("#dialogHide").append(canvas);
                                
                                //descomentar ahora
                                imageData = canvas.toDataURL().replace(/data:image\/png;base64,/,'');
                               //imageData = atob(imageData);
                                console.log("imageData en onrendered "+imageData);
          
                                //imageData="";
                                //imageData = Canvas2Image.convertToImage(canvas).src;
                                //console.log("imageData en onrendered 2 "+imageData);
                                
                                console.log("onrendered para guardad png, folderName "+folderName+" imagePrincipalName "+imagePrincipalName);
                                
                                
                                
                                var nombreImagen=imagePrincipalName.substring(0,imagePrincipalName.length-4);
                                
                                
                                parent.guardadoComprobantesDelegate.saveImageFromBase64(nombreImagen, imageData, folderName, successCallB, failCallB);
                                
                                function successCallB () {
                                
                                console.log("success de  guardar el png en local");
                                generaComprobantesDelegate.pngToPDF(imagePrincipalName);
                                
                              //  compraInvertirDelegate.muestraAlert('Aviso','Se ha generado correctamente el comprobante.','Aceptar');
                                /*
                                if ((sessionStorage.jsonPosicion != null) && (sessionStorage.jsonPosicion.length > 0) && (typeof sessionStorage.jsonPosicion != "undefined")) {
                                posGlobal = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal;
                                acceso_usr_global=posGlobal.acceso_usr;
                                usuario_global = posGlobal.usuario_usr;
                                }
                                
                                var extension="png";
                                
                                
                                var datosAplicativos = { usuario: usuario_global, acceso: acceso_usr_global, directorio: folderName, archivo: nombreImagen, extension: extension };
                                
                               
         
                                window.setTimeout(function(){
                                
                                
                                parent.edoCuentaDelegate.comprobarFichero( datosAplicativos, function (jsonResponsePng){
                                                                          
                                        console.log("entra en success de comprobar fichero png");
                                                                          
                                                                          
                                        var response=JSON.parse(jsonResponsePng);
                                                                          
                                        console.log("response "+JSON.stringify(response));
                                                                          
                                                                          
                                        if ((response.respuesta!=undefined) && (response.respuesta.existefichero!=undefined) && (response.respuesta.existefichero=="1")){
                                

                                            generaComprobantesDelegate.pngToPDF(imagePrincipalName);
                                

                                          //  compraInvertirDelegate.muestraAlert('Aviso','Se ha generado correctamente el comprobante.','Aceptar');
                                                                          
                                        } else {
                                                                          
                                               console.log("error guardar el png en local, no se creó el fichero");
                        
                                        }

                     
                                }
                                , failCallB);
                                
                                
                                
                                }, 0200);
                                
                                 */
                                
                                
                                }
                                
                                
                                function failCallB() {
                                
                                console.log("error guardar el png en local");
                                }
                                
                                
                               // window.open(imageData);
                              //  saveToDisk(folderName, imagePrincipalName, imageData, void(0), void(0));
                                
                                
	                    },
                               // width:1300,
                               // height:1100
                                
	            	});
       
                           
        }
                           
       GeneraComprobantesDelegate.prototype.guardarEnDisco = function(folderName, imageLeidaName, imageData, successCallback, failCallback) {
               console.log("folderName:   "+folderName+"    ,imageLeidaName:   "+imageLeidaName+"   ,imageData:   "+imageData);
    	   saveToDisk(folderName, imageLeidaName, imageData, successCallback, failCallback);
       }
                           
       GeneraComprobantesDelegate.prototype.accionesComprobante = function() {}
                           
       GeneraComprobantesDelegate.prototype.recuperaCuentasTDDPesos = function() {
       exec(
            function(result) { alert(result); },
            function(error)  { alert("Error" + error); },
            "GeneraComprobantesDelegate",
            "recuperaCuentasTDDPesos",
            []
            );
       }
                           
       GeneraComprobantesDelegate.prototype.recuperaCuentasDolares = function() {
       exec(
            function(result) { alert(result); },
            function(error)  { alert("Error" + error); },
            "GeneraComprobantesDelegate",
            "recuperaCuentasDolares",
            []
            );
       }
                           
       GeneraComprobantesDelegate.prototype.recuperaCuentasTDCPesos = function() {
       exec(
            function(result) { alert(result); },
            function(error)  { alert("Error" + error); },
            "GeneraComprobantesDelegate",
            "recuperaCuentasTDCPesos",
            []
            );
       }
       
       GeneraComprobantesDelegate.prototype.recuperaPeriodos = function() {
       exec(
            function(result) { alert(result); },
            function(error)  { alert("Error" + error); },
            "GeneraComprobantesDelegate",
            "recuperaPeriodos",
            []
            );
       }
       
       GeneraComprobantesDelegate.prototype.recuperaOperaciones = function() {
       exec(
            function(result) { alert(result); },
            function(error)  { alert("Error" + error); },
            "GeneraComprobantesDelegate",
            "recuperaOperaciones",
            []
            );
       }
       
       GeneraComprobantesDelegate.prototype.recuperaOpcionesDispositivo = function() {
       exec(
            function(result) { alert(result); },
            function(error)  { alert("Error" + error); },
            "GeneraComprobantesDelegate",
            "recuperaOpcionesDispositivo",
            []
            );
       }
       
       GeneraComprobantesDelegate.prototype.guardarImgPreviaRecortadaC = function() {
       exec(
            function(result) { alert(result); },
            function(error)  { alert("Error" + error); },
            "GeneraComprobantesDelegate",
            "guardarImgPreviaRecortadaC",
            []
            );
       }
       
       GeneraComprobantesDelegate.prototype.guardarImgPreviaC = function() {
       exec(
            function(result) { alert(result); },
            function(error)  { alert("Error" + error); },
            "GeneraComprobantesDelegate",
            "guardarImgPreviaC",
            []
            );
       }
       
       GeneraComprobantesDelegate.prototype.doNetworkOperation = function() {
       exec(
            function(result) { alert(result); },
            function(error)  { alert("Error" + error); },
            "GeneraComprobantesDelegate",
            "doNetworkOperation",
            []
            );
       }
       
       GeneraComprobantesDelegate.prototype.networkResponse = function() {
       exec(
            function(result) { alert(result); },
            function(error)  { alert("Error" + error); },
            "GeneraComprobantesDelegate",
            "networkResponse",
            []
            );
       }
               
       GeneraComprobantesDelegate.prototype.showAlert = function (tittle, message, button) {
       exec(
            function(jsonResponse) { if(callback) { callback(); } },
            function(jsonResponse) { /** Operación Error **/  },
            "GeneraComprobantesDelegate",
            "showAlert",
            [tittle, message, button]
            );
       }
       
       var generaComprobantesDelegate = new GeneraComprobantesDelegate();
       module.exports = generaComprobantesDelegate;

       });

// __________ Termina Phongegap __________


       function generaComprobanteFailCallback(){
           console.log("ERROR guardando Comprobante");           
           parent.compraInvertirDelegate.muestraAlert("Aviso\n","Se ha producido un error al generar el comprobante","Aceptar");           
       }
       
       function saveImagenComprobanteSuccessCallback(fileName){
    	   parent.compraInvertirDelegate.muestraAlert("Aviso\n","Se ha generado correctamente el comprobante.","Aceptar");       
       }       
       
       function saveToDisk(folderName, fileName, dataToSave, succesCallback, failCallback){
           var filePath;
           console.log("Inicio saveToDisk folderName "+folderName+" fileName "+fileName+" dataToSave "+dataToSave);
           
           window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess,fileSystemFail);
                                    
           function onFileSystemSuccess(fileSystem) {
                                    
                                    
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
                                            fileDir.createWriter(
                                                    function(writer) {
                                                       writer.onwrite = function(evt) {
                                                            console.log("write success");
                                                                                                        
                                                             if ((fileName.indexOf('leido')<0) || (fileName.indexOf('.png')<0)){
                                                                  saveImagenComprobanteSuccessCallback(fileName);
                                                              }
                                                       };
                                                                                                        
                                                    var buffer = new ArrayBuffer(dataToSave.length);
                                                    var array = new Uint8Array(buffer);
                                                                                                        
                                                    for ( var i = 0; i < dataToSave.length; i++) {
                                                         array[i] = dataToSave.charCodeAt(i);
                                                         //writer.write(array.b);
                                                         //console.log("i ",i);


                                                    }
                                                      // console.log("buffer ",buffer);
                                                      //writer.write(array);
                                                       writer.write(buffer);

                                                    },
                                            errorHandler);
                                        }, errorHandler );
                            }, errorHandler );
               
            }
           
           
           function fileSystemFail(error) {
        	   console.log(error.code);
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
           
           
	           
	       function saveImagenComprobanteSuccessCallback(imageName){
	           $("body").removeClass("loading");
               generaComprobantesDelegate.pngToPDF(imageName);
	           compraInvertirDelegate.muestraAlert('Aviso','Se ha generado correctamente el comprobante.','Aceptar');
	       }
	           
	       function generaComprobanteFailCallback(){
	           console.log("ERROR guardando Comprobante");
	           compraInvertirDelegate.muestraAlert('Aviso', 'Se ha producido un error al generar el comprobante', 'Aceptar');
	           $("body").removeClass("loading");
	       }
           
           console.log("FIN saveToDisk");

           console.log(filePath);
	       return filePath;
       }