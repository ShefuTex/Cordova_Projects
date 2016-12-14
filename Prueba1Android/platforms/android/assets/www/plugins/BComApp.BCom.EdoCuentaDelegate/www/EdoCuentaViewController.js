cordova.define("BComApp.BCom.EdoCuentaDelegate.EdoCuentaDelegate", function(require, exports, module) {
               
               // __________ Inicia Phonegap __________
               
               var exec = require('cordova/exec');
               
               function EdoCuentaDelegate() {}
               
               EdoCuentaDelegate.prototype.leerCuentas = function() {}
               
               EdoCuentaDelegate.prototype.leerCuentasPeriodos = function() {}
               
               EdoCuentaDelegate.prototype.mostrarAyuda = function() {}
               
               EdoCuentaDelegate.prototype.peticionPDF = function() {}
               
               EdoCuentaDelegate.prototype.accionesEdosCuenta = function() {}
               
               EdoCuentaDelegate.prototype.recuperaCuentasTDDPesos = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "EdoCuentaDelegate",
                    "recuperaCuentasTDDPesos",
                    []
                    );
               }
               
               EdoCuentaDelegate.prototype.recuperaCuentasDolares = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "EdoCuentaDelegate",
                    "recuperaCuentasDolares",
                    []
                    );
               }
               
               EdoCuentaDelegate.prototype.recuperaCuentasTDCPesos = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "EdoCuentaDelegate",
                    "recuperaCuentasTDCPesos",
                    []
                    );
               }
               
               EdoCuentaDelegate.prototype.recuperaPeriodos = function(proceso, operacion, datosAplicativos, successCallBack, errorCallBack) {
               exec(
                    function(jsonResponse) {
                        successCallBack(jsonResponse);
                    },
                    function (errorMessage) {
                        errorCallBack(errorMessage);
                    },
                    "EdoCuentaDelegate",
                    "recuperaPeriodos",
                    [proceso, operacion, datosAplicativos]
                    );
               }
               
               EdoCuentaDelegate.prototype.recuperaDatosPDF = function (proceso, operacion, datosAplicativos, successCallBack, errorCallBack) {
                exec(
                     function(jsonResponse) {
                        successCallBack(jsonResponse);
                     },
                     function (errorMessage) {
                        errorCallBack(jsonResponse);
                     },
                       "EdoCuentaDelegate",
                       "consultaEstadoDeCuenta",
                       [proceso, operacion, datosAplicativos]
                       );
               }
               
               EdoCuentaDelegate.prototype.GeneraPDF = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "EdoCuentaDelegate",
                    "GeneraPDF",
                    []
                    );
               }
               
               EdoCuentaDelegate.prototype.guardarImgPreviaRecortadE = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "EdoCuentaDelegate",
                    "guardarImgPreviaRecortadE",
                    []
                    );
               }
               
               EdoCuentaDelegate.prototype.guardarImgPreviaE = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "EdoCuentaDelegate",
                    "guardarImgPreviaE",
                    []
                    );
               }
               
               EdoCuentaDelegate.prototype.doNetworkOperation = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "EdoCuentaDelegate",
                    "doNetworkOperation",
                    []
                    );
               }
               
               EdoCuentaDelegate.prototype.networkResponse = function() {
               exec(
                    function(result) { alert(result); },
                    function(error)  { alert("Error" + error); },
                    "EdoCuentaDelegate",
                    "networkResponse",
                    []
                    );
               }
                              
               var edoCuentaDelegate = new EdoCuentaDelegate();
               module.exports = edoCuentaDelegate;
               
               // __________ Termina Phongegap __________
               
               });
