cordova.define("BComApp.BComTransferir.TransferirViewController.TransferirDelegate", function(require, exports, module) {

					// __________ Inicia Phonegap __________

					var exec = require('cordova/exec');

					function TransferirDelegate() {
					}

					TransferirDelegate.prototype.recuperaCuentasTarFrecBBVA = function() {
						exec(function(result) {
							alert(result);
						}, function(error) {
							alert("Error" + error);
						}, "TransferirDelegate", "recuperaCuentasTarRetiro", []);
					}

					TransferirDelegate.prototype.leerCuentasTarRetiro = function() {
						exec(function(result) {
							alert(result);
						}, function(error) {
							alert("Error" + error);
						}, "TransferirDelegate", "recuperaCuentasTarDeposito",
								[]);
					}

					TransferirDelegate.prototype.leerCuentasTarDeposito = function() {
						exec(function(result) {
							alert(result);
						}, function(error) {
							alert("Error" + error);
						}, "TransferirDelegate", "recuperaCuentasTarFrecBBVA",
								[]);
					}

					TransferirDelegate.prototype.leerCuentasFrecuentes = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							transferirDelegate.leerCuentasPreregistradas(
									datosAplicativos, successCallBack,
									errorCallBack);
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate", "recuperaListasFrecuentes",
								[ datosAplicativos ]);
					}

					TransferirDelegate.prototype.leerCuentasPreregistradas = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate",
								"recuperaListasPreregistradas",
								[ datosAplicativos ]);
					}

					TransferirDelegate.prototype.leerCuentasTarDepOtrBan = function() {
						exec(function(result) {
							alert(result);
						}, function(error) {
							alert("Error" + error);
						}, "TransferirDelegate", "doNetworkOperation", []);
					}

					TransferirDelegate.prototype.leerOpcMisCuentas = function() {
						exec(function(result) {
							alert(result);
						}, function(error) {
							alert("Error" + error);
						}, "TransferirDelegate", "networkResponse", []);
					}

					TransferirDelegate.prototype.leerOpcBBVA = function() {
						exec(function(result) {
							alert(result);
						}, function(error) {
							alert("Error" + error);
						}, "TransferirDelegate", "GeneraPDF", []);
					}

					TransferirDelegate.prototype.leerOpcOtrosBan = function() {
						exec(function(result) {
							alert(result);
						}, function(error) {
							alert("Error" + error);
						}, "TransferirDelegate", "guardarImgPreviaRecortadC",
								[]);
					}

					TransferirDelegate.prototype.llenaCombo = function() {
						exec(function(result) {
							alert(result);
						}, function(error) {
							alert("Error" + error);
						}, "TransferirDelegate", "guardarImgPreviaC", []);
					}

					TransferirDelegate.prototype.llenaGrids = function() {
						exec(function(result) {
							alert(result);
						}, function(error) {
							alert("Error" + error);
						}, "TransferirDelegate", "recuperaPagos", []);
					}

					TransferirDelegate.prototype.accionArrastrar = function() {
						exec(function(result) {
							alert(result);
						}, function(error) {
							alert("Error" + error);
						}, "TransferirDelegate", "recuperaSaldos", []);
					}


TransferirDelegate.prototype.registraTraspaso = function(
		operacion, proceso, accion, datosAplicativos,
		registraTraspasoSuccess, registraTraspasoFail) {
	exec(function(jsonResponse) {
		registraTraspasoSuccess(jsonResponse);
	}, function(errorMessage) {
		registraTraspasoFail(errorMessage);
	}, "TransferirDelegate", "registraTraspaso", [
			operacion, proceso, accion, datosAplicativos ]);
}

//TransferirDelegate.prototype.accionArrasAFrecuentes = function() {}

	TransferirDelegate.prototype.leerCuentasFrecuentesInterbancaria = function(
			datosAplicativos, successCallBack, errorCallBack) {
		exec(function(jsonResponse) {
			transferirDelegate
					.leerCuentasPreregistradasInterbancaria(
							datosAplicativos, successCallBack,
							errorCallBack);
			successCallBack(jsonResponse);
		}, function(errorMessage) {
			errorCallBack(errorMessage);
		}, "TransferirDelegate",
				"recuperaListasFrecuentesInterbancaria",
				[ datosAplicativos ]);
	}

					TransferirDelegate.prototype.accionArrasATarDeposito = function() {
						exec(function(result) {
							alert(result);
						}, function(error) {
							alert("Error" + error);
						}, "TransferirDelegate", "ejecutaGuardaCuentaNueva", []);
					}


					TransferirDelegate.prototype.leerCuentasFrecuentesInterbancaria = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							transferirDelegate
									.leerCuentasPreregistradasInterbancaria(
											datosAplicativos, successCallBack,
											errorCallBack);
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate",
								"recuperaListasFrecuentesInterbancaria",
								[ datosAplicativos ]);
					}
	
	
	
	
	TransferirDelegate.prototype.showAlertDualCancelar = function(
			datosAplicativos, successCallBack, errorCallBack) {
		exec(function(jsonResponse) {
			successCallBack(jsonResponse);
		}, function(errorMessage) {
			errorCallBack(errorMessage);
		}, "TransferirDelegate", "showAlert",
				[ datosAplicativos ]);
	}
	


					TransferirDelegate.prototype.leerCuentasPreregistradasInterbancaria = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate",
								"recuperaListasPreregistradasInterbancaria",
								[ datosAplicativos ]);
					}



					TransferirDelegate.prototype.realizarTraspaso = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate", "realizarTraspaso",
								[ datosAplicativos ]);
					}



					TransferirDelegate.prototype.realizarTraspasoInterbancaria3 = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate",
								"realizarTraspasoInterbancaria3",
								[ datosAplicativos ]);
					}



					TransferirDelegate.prototype.consultaBeneficiario = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate", "consultaBeneficiario",
								[ datosAplicativos ]);
					}



					TransferirDelegate.prototype.preregistrarCuenta = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate", "preregistrarCuenta",
								[ datosAplicativos ]);
					}
					
					
					TransferirDelegate.prototype.preregistrarCuentaInterbancarias = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate", "preregistrarCuentaInterbancaria",
								[ datosAplicativos ]);
					}



					TransferirDelegate.prototype.cargaPreregistro = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate", "cargaPreregistro",
								[ datosAplicativos ]);
					}
					
					TransferirDelegate.prototype.cargaPreregistroInterbancaria = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate", "cargaPreregistroInterbancaria",
								[ datosAplicativos ]);
					}


					TransferirDelegate.prototype.permitirFrecuentes = function(
							datosAplicativos, dialogName, successCallBack,
							errorCallBack) {
						exec(function(jsonResponse) {
							successCallBack(jsonResponse, dialogName);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate", "permitirFrecuentes",
								[ datosAplicativos ]);
					}

	
					TransferirDelegate.prototype.envioEmail = function(
							datosAplicativos, successCallBack, errorCallBack) {
						exec(function(jsonResponse) {
							successCallBack(jsonResponse);
						}, function(errorMessage) {
							errorCallBack(errorMessage);
						}, "TransferirDelegate", "envioEmail",
								[ datosAplicativos ]);
					}

	
					TransferirDelegate.prototype.recuperaFestivos = function(
							peticion) {
						exec(function(jsonResponse) {
							sessionStorage.jsonFestivos = jsonResponse
						}, function(errorMessage) {
							muestraError(errorMessage)
						}, "TransferirDelegate", "recuperaFestivos",
								[ peticion ]);
					}

	
					TransferirDelegate.prototype.accionArrasAFrecuentes = function() {
					}

	
					TransferirDelegate.prototype.accionArrasANueCuenta = function() {
					}

	
					TransferirDelegate.prototype.accionMuestraSigPan = function() {
					}

	
					TransferirDelegate.prototype.accionesCombosCampos = function() {
					}

	
					TransferirDelegate.prototype.accionApareceBarra = function() {
					}

	
					TransferirDelegate.prototype.accionCambiaConsulta = function() {
					}

	
					TransferirDelegate.prototype.accionAsignaValRadios = function() {
					}

	
					TransferirDelegate.prototype.accionesCombosCamposRadios = function() {
					}

	
					TransferirDelegate.prototype.accionMuestraCorregir = function() {
					}

	
					TransferirDelegate.prototype.asignaCuentaBoton = function() {
					}

	
					TransferirDelegate.prototype.accionMuestraNueva = function() {
					}

	
					TransferirDelegate.prototype.accionMuestraComprobante = function() {
					}

	
					TransferirDelegate.prototype.accionMuestraConfirmar = function() {
					}

	
					TransferirDelegate.prototype.accionMuestraCancelar = function() {
					}


					TransferirDelegate.prototype.validaSecciones = function() {
					}


					TransferirDelegate.prototype.validaSeccionesCampos = function() {
					}


					TransferirDelegate.prototype.validaSeccionesInicio = function() {
					}

	
					TransferirDelegate.prototype.mostrarResultadoOpera = function() {
					}

	
					TransferirDelegate.prototype.enviarCorreo = function() {
					}


					TransferirDelegate.prototype.operaExitosa = function() {
					}


					TransferirDelegate.prototype.mostrarOpciones = function() {
					}


					var transferirDelegate = new TransferirDelegate();
					module.exports = transferirDelegate;

					// __________ Termina Phongegap __________

				});

// __________ Inicia JS __________

var MisCtasCCheqMquince = false;
var MisCtasCCheqTDC = false;
var MisCtasTDCCCheq = false;
var CtasBBVACCheqNuevaCta = false;
var CtasBBVACCheqFrecuente = false;
var otrosBancosCCheqNuevaCta = false;
var otrosBancosCCheqDebito = false;
var otrosBancosCCheqCredito = false;
var banderaMisCuentas = false;
var banderaCuentasBBVA = false;
var banderaOtrosBancos = false;

// __________ Termina JS __________

function devuelveLista(jsonResponse) {
	console.log("JSON RESPONSE "
			+ JSON.parse(jsonResponse).respuesta.listaTraspasos);
	sessionStorage.listaFrecuentesInterbancarias = JSON.parse(jsonResponse).respuesta.listaTraspasos;

}

function muestraError(errorMessage) {

	alert("ERROR " + errorMessage);
}
