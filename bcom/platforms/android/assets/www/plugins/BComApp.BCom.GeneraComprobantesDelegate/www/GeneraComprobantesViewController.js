cordova.define("BComApp.BCom.GeneraComprobantesDelegate.GeneraComprobantesDelegate", function(require, exports, module) {// __________ Inicia Phonegap __________
			
			   var proceso_recuperaOperaciones="imd_consulta_comprobante_pr";
			   var operacion_recuperaOperaciones="imd_consulta_comprobante_op";
			   var accion_recuperaOperaciones="confirma";
	
	
               var exec = require('cordova/exec');
               
               function GeneraComprobantesDelegate() {}
               
               GeneraComprobantesDelegate.prototype.leerCuentas = function() {console.log('leerCuentas');}
               
               GeneraComprobantesDelegate.prototype.leerCuentasPeriodos = function() {console.log('leerCuentasPeriodos');}
               
               GeneraComprobantesDelegate.prototype.leerOperaciones = function() {}
               
               GeneraComprobantesDelegate.prototype.mostrarOpciones = function(datosAplicativos, folio, successCallBack, errorCallBack) {
               exec(
                    function(jsonResponse) {
                    successCallBack(jsonResponse, folio);
                    },
                    function (errorMessage) {
                    errorCallBack(errorMessage);
                    },
                    "GeneraComprobantesDelegate",
                    "recuperaOperaciones",
                    [proceso_recuperaOperaciones, operacion_recuperaOperaciones, accion_recuperaOperaciones, datosAplicativos]
                    );
               
               }
               
               GeneraComprobantesDelegate.prototype.mostrarAyuda = function() {}
               
               GeneraComprobantesDelegate.prototype.peticionPDF = function(divToExport, portfolio, successCallback, failCallback) {
               console.log("peticionPDF ");
               //               var div = $("div#" + divToExport + "");
               
               var frame = parent.document.getElementById('contentFrame');
               var div = $("#"+divToExport);
               if (frame != null){
                   var doc = (frame.contentWindow || frame.contentDocument)
                   if (doc.document) doc = doc.document;
                   var div = doc.getElementById(divToExport);
               }

               
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

                   var frame = parent.document.getElementById('contentFrame');
                   var div = $("#"+divToExport);
                   if (frame != null){ 
	                   var doc = (frame.contentWindow || frame.contentDocument)
	                   if (doc.document) doc = doc.document;
	                   div = doc.getElementById(divToExport);
	                   var div_leido = doc.getElementById("body-comprobante-leido-toexport");
                   }
                   
                   var folderName = "BCOM/"+JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.acceso_usr;
                   
                   // IMG GENERATION
                   var imagePrincipalName =  "comprobante_"+portfolio+".png";
                   var imageLeidaName =  "comprobante_"+portfolio+"_leido.png";
                   
	               	html2canvas( div, {
	            		onpreloaded:function() {
	            			$('#cabecera-comprobante').css('visibility','visible');
	                    },
	                    onrendered: function(canvas) {
	                    	$('#cabecera-comprobante').css('visibility','hidden');
	                    	 var imageData = canvas.toDataURL().replace(/data:image\/png;base64,/,'');
	                    	 imageData = atob(imageData);
	                    	 saveToDisk(folderName, imagePrincipalName, imageData, successCallback, failCallback);
	                    }
	            	});
	            	
	               	if (div_leido != null && div_leido != undefined){
		            	html2canvas( div_leido, {
		                    onrendered: function(canvas) {
		                    	 var imageData = canvas.toDataURL().replace(/data:image\/png;base64,/,'');
		                    	 imageData = atob(imageData);
		                    	$('#cabecera-comprobante').css('visibility','hidden');                                
		                    	 saveToDisk(folderName, imageLeidaName, imageData, successCallback, failCallback);	          
		                    }
		            	});
        			}
                           
        }
               
       GeneraComprobantesDelegate.prototype.guardarEnDisco = function(folderName, imageLeidaName, imageData, successCallback, failCallback) {
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
       
       var generaComprobantesDelegate = new GeneraComprobantesDelegate();
       module.exports = generaComprobantesDelegate;

       });

// __________ Termina Phongegap __________


       function generaComprobanteFailCallback(){
           $("#body-comprobante-leido-toexport").css("visibility","hidden");
           console.log("ERROR guardando Comprobante");           
           parent.loginDelegate.showAlert("Aviso\n","Se ha producido un error al generar el comprobante","Aceptar");           
       }
       
       function saveToDisk(folderName, fileName, dataToSave, succesCallback, failCallback){
    	   
    	    if(sessionStorage.esInvitado=='true'){
    	    	folderName = folderName + "/Invitados/" + sessionStorage.invitadoNumber;
    	    }
    	   
           var filePath;
           console.log("Inicio saveToDisk folderName "+folderName+" fileName "+fileName+" dataToSave "+dataToSave);
          
           
           /*
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
                                                                                   fileDir.createWriter(
                                                                                                        function(writer) {
                                                                                                        writer.onwrite = function(evt) {
                                                                                                        console.log("write success");
                                                                                                        
                                                                                                        if(fileName.indexOf('leido')<0){   
                                                                                                                succesCallback();
                                                                                                        }
                                                                                                        };
                                                                                                        
                                                                                                        var buffer = new ArrayBuffer(dataToSave.length);
                                                                                                        var array = new Uint8Array(buffer);
                                                                                                        
                                                                                                        for ( var i = 0; i < dataToSave.length; i++) {
                                                                                                        array[i] = dataToSave.charCodeAt(i);
                                                                                                        }
                                                                                                        writer.write(buffer);
                                                                                                        }, 
                                                                                                        errorHandler);
                                                                                   }, errorHandler );
                                                                 }, errorHandler );
                                    
                                    }, fileSystemFail);
          */ 
           
           
           /*prueba*/
           window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

           function gotFS(fileSystem) {
               fileSystem.root.getDirectory("BCOM", {create: true, exclusive: false});//, gotRootDir,fail);

               fileSystem.root.getDirectory(folderName, {create: true, exclusive: false}, gotDir,fail);

               
               console.log(fileSystem.root);

       }
           
       /*    function gotRootDir(fileSystem) {
               fileSystem.root.getDirectory(folderName, {create: true, exclusive: true}, gotDir,fail);
               console.log(fileSystem.root);

       }
*/
       function gotDir(dirEntry) {
               dirEntry.getFile(fileName, {create: true, exclusive: false}, gotFile,fail);
       }

       function gotFile(fileEntry) {

    	 //  alert("entra");
    	   
    	   console.log('getFile '+fileName+' OK');
           fileDir = fileEntry;
           console.log(fileDir);
           filePath = fileEntry.fullPath;
           console.log(filePath);
           fileDir.createWriter(
                                function(writer) {
                                writer.onwrite = function(evt) {
                                console.log("write success");
                                
                                if(fileName.indexOf('leido')<0){   
                                        succesCallback();
                                }
                                };
                                
                                var buffer = new ArrayBuffer(dataToSave.length);
                                var array = new Uint8Array(buffer);
                                
                                for ( var i = 0; i < dataToSave.length; i++) {
                                array[i] = dataToSave.charCodeAt(i);
                                }
                                writer.write(buffer);
                       
                                parent.loginDelegate.showAlert("Aviso\n","Comprobante guardado correctamente","Aceptar");           

                                }, 
                                errorHandler);
    	  
    	   
       }  

       function fail(error) {
          //alert(error);
          console.log(error);
       }
       /*fin prueba*/    
           
           
           
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

	       function generaComprobanteFailCallback(){
    $("#body-comprobante-leido-toexport").css("visibility","hidden !important");
	           console.log("ERROR guardando Comprobante");
	           parent.loginDelegate.showAlert('', 'Se ha producido un error al generar el comprobante', '');
	           $("body").removeClass("loading");
	       }
	           
	       return filePath;
       }