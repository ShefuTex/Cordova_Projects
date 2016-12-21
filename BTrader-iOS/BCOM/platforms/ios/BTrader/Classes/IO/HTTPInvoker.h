/*
 * Copyright (c) 2010 BBVA. All Rights Reserved
 *
 * This software is the confidential and proprietary information of
 * BBVA ("Confidental Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with
 * the terms of the license agreement you entered into with BBVA.
 */


//#import "IOConstants.h"


/**
 * Flag to indicate HTTP POST usage (1 = use HTTP POST, otherwise use HTTP GET)
 */
#define USE_HTTP_POST											1


@class ServerResponse;
@class HTTPInvoker;

//Forward declarations
//@protocol ParsingHandler;


/**
 * Protocol implemented by HTTPInvoker clients to be informed asynchronously when download is finished or cancelled
 *
 * @author <a href="mailto:info@movilok.com">Movilok Interactividad Movil S.L.</a>
 */
@protocol HTTPInvokerClient <NSObject>

/**
 * The download has finished correctly. The informtion has already being parsed by the provider parser
 *
 * @param aDownloadId The download identification that has finished
 */
- (void) downloadFinished: (NSInteger) aDownloadId;
- (void) downloadDataFinished: (NSArray*) o;

/**
 * The download finished beacuse of an error
 *
 * @param aDownloadId The download identification that has finished because of an error
 */
- (void) downloadError: (NSInteger) aDownloadId;

/**
 * The download was cancelled by user
 *
 * @param aDownloadId The download identification that was cancelled
 */
- (void) downloadCancelled: (NSInteger) aDownloadId;

@end


/**
 * Protocol implemented by Server class clients. Protocol implementers are informed when the network request
 * finishes correctly, are cancel or finish with an error
 *
 * @author <a href="mailto:info@movilok.com">Movilok Interactividad Movil S.L.</a>
 */
@protocol ServerClient <NSObject>

/**
 * The request finished correctly
 *
 * @param aServer The server triggering the event
 * @param aDownloadId The download identification that finished correctly
 * @param aServerResponse The server response information
 */
- (void) server: (HTTPInvoker*) aServer download: (NSInteger) aDownloadId finishedWithResponse: (ServerResponse*) aServerResponse;

/**
 * The request was cancelled
 *
 * @param aServer The server triggering the event
 * @param aDownloadId The download identification that was cancelled
 */
- (void) cancelledServer: (HTTPInvoker*) aServer download: (NSInteger) aDownloadId;

/**
 * The request finished with an error
 *
 * @param aServer The server triggering the event
 * @param aDownloadId The download identification that finished with an error
 */
- (void) erroredServer: (HTTPInvoker*) aServer download: (NSInteger) aDownloadId;

@end


/**
 * Sends operation using HTTP protocol
 *
 * @author <a href="mailto:info@movilok.com">Movilok Interactividad Movil S.L.</a>
 */
@interface HTTPInvoker : NSObject {
    
@private
    
	NSMutableDictionary* _activeDownloads;
	
	NSInteger _nextDownloadProcessId;
    
    NSMutableDictionary *_pendingOperations;
    
    NSString *_username;
}

/**
 * Returns the singleton only instance
 *
 * @result The singleton only instance
 */
+ (HTTPInvoker*) getInstance;

/**
 * Invokes a network operation to the given URL
 *
 * @param aURLString The URL string to invoke the operation
 * @param aParametersString The parameters string used in the operation
 * @param aHandler The response handler to analyze the server response
 * @param aClient The client that starts the nerwokr operation
 * @param aManageCookiesFlag When YES, the cookies are managed by this class, when NO, the cookies are handled by NSMutableURLRequest object
 * @param aStoreCookiesFlag When YES, the cookies are stored in persistent memory, when NO, the cookies are not stored
 * @param aUseStoredCookiesFlag When YES, the cookies stored in persistent memory are sent, when NO, the default behaviour is used
 * @return A positive transaction number, or a negative number in case an error is detected
 */
- (NSInteger) invokeOperationToURL: (NSString*) aURLString withParameters: (NSString*) aParametersString
						andHandler: (ServerResponse*) aHandler forClient: (HTTPInvoker*) aClient
					  storeCookies: (BOOL) aStoreCookiesFlag andUseStoredCookies: (BOOL) aUseStoredCookiesFlag;

/**
 * Cancels the given download process and notifies the client. The associated
 * DonwloadInformation instance is removed from the pending downloads list
 *
 *
 * @param aDownloadId The download process Id that is going to be stopped
 */
- (void) cancelDownload: (NSInteger) aDownloadId;

/** <--     --> **/

- (NSInteger) signOnWebSeal: (NSString*) tarjeta password: (NSString*) password  forClient: (id<ServerClient>) client;

- (NSInteger) signOnWas: (NSString*) tarjeta password: (NSString*) password ipEnmascarada: (NSString*) ip forClient: (id<ServerClient>) client;

- (NSInteger) signOnIS: (NSString*) usuario acceso: (NSString*) acceso numero: (NSString*) numero tipo: (NSString*) tipo forClient: (id<ServerClient>) client;

- (NSInteger) signOffWas: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;

- (NSInteger) signOffWebSeal: (NSString*) tarjeta forClient:(id<ServerClient>) client;

- (NSInteger) signOffHost:(NSString *) tarjeta forClient:(id<ServerClient>) client;

- (NSInteger) catalogoBancos: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;

- (NSInteger) reglasNegocios: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;

- (NSInteger) wtReglasNegocios: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;

- (NSInteger) reglasNegociosKeep: (id<ServerClient>) client;

- (NSInteger) posicionGlobal: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;

- (NSInteger) movimientosCtasCheques: (NSString*) peticion forClient: (id<ServerClient>) client;

- (NSInteger) movimientosCtasUSD: (NSString*) peticion forClient: (id<ServerClient>) client;

- (NSInteger) movimientosTDC: (NSString*) peticion forClient: (id<ServerClient>) client;

- (NSInteger) recuperaTasas:(NSString*) peticion forClient: (id<ServerClient>) client;

- (NSInteger) registraTraspaso:(NSString*) peticion forClient: (id<ServerClient>) client;

- (NSInteger) pagoMinimoNoInteres:(NSString*) peticion forClient: (id<ServerClient>) client;

- (NSInteger) solicitaComision:(NSString*) peticion forClient: (id<ServerClient>) client;

- (NSInteger) aplicaCompra:(NSString*) peticion forClient: (id<ServerClient>) client;

- (NSInteger) consultaEstadoDeCuenta:(NSString*) usuario acceso: (NSString*) acceso numero: (NSString*) numero producto: (NSString*) producto formato: (NSString*) formato anio: (NSString*) anio mes: (NSString*) mes claveOperaciones: (NSString*) claveOperaciones OTP: (NSString*) OTP posicionTASA: (NSString*) posicionTASA valorPosicionTASA: (NSString*) valorPosicionTASA digitoVerficador: (NSString*) digitoVerficador valorDigitoVerficador: (NSString*) valorDigitoVerficador forClient: (id<ServerClient>) client;

- (NSInteger) recuperaPeriodos:(NSString*) usuario acceso: (NSString*) acceso ident: (NSString*) ident forClient: (id<ServerClient>) client;

- (NSInteger) recuperaOperaciones:(NSString*) usuario acceso: (NSString*) acceso idPeriodo: (NSString*) idPeriodo tipoOperacion: (NSString*) tipoOperacion claveOperaciones: (NSString*) claveOperaciones otp: (NSString*) otp tipoEjecucion: (NSString*) tipoEjecucion  forClient: (id<ServerClient>) client;

- (NSInteger) recuperaListasFrecuentes: (NSString*) usuario acceso: (NSString*) acceso idAplicacion: (NSString*) idAplicacion forClient: (id<ServerClient>) client;

- (NSInteger) recuperaListasFrecuentesInterbancaria: (NSString*) usuario acceso: (NSString*) acceso idAplicacion: (NSString*) idAplicacion forClient: (id<ServerClient>) client;

- (NSInteger) recuperaListasPreregistradas: (NSString*) usuario acceso: (NSString*) acceso idAplicacion: (NSString*) idAplicacion forClient: (id<ServerClient>) client;

- (NSInteger) recuperaListasPreregistradasInterbancaria: (NSString*) usuario acceso: (NSString*) acceso idAplicacion: (NSString*) idAplicacion forClient: (id<ServerClient>) client;







- (NSInteger) realizarTraspaso: (NSString*) usuario acceso: (NSString*) acceso fechaOperacion: (NSString*) fechaOperacion idAsuntoCargo: (NSString*) idAsuntoCargo idAsuntoAbono: (NSString*) idAsuntoAbono nombreBeneficiario: (NSString*) nombreBeneficiario importe: (NSString*) importe rfc: (NSString*) rfc iva: (NSString*) iva nombreCorto: (NSString*) nombreCorto email: (NSString*) email claveOperacion: (NSString*) claveOperacion otp: (NSString*) otp tripletaTasa: (NSString*) tripletaTasa digitoVerificador: (NSString*) digitoVerificador periodo: (NSString*) periodo fechaInicio: (NSString*) fechaInicio fechaFin: (NSString*) fechaFin  repeticiones: (NSString*) repeticiones nombreCortoPeriodico: (NSString*) nombreCortoPeriodico  forClient: (id<ServerClient>) client;

- (NSInteger) realizarTraspasoInterbancaria3: (NSString*) usuario acceso: (NSString*) acceso standin: (NSString*) standin idCtaCargo: (NSString*) idCtaCargo idCtaBeneficiaria: (NSString*) idCtaBeneficiaria dia: (NSString*) dia mes: (NSString*) mes anio: (NSString*) anio fechaPosterior: (NSString*) fechaPosterior tipoRetiro: (NSString*) tipoRetiro importe: (NSString*) importe concepto: (NSString*) concepto referenciaNumerica: (NSString*) referenciaNumerica reqComprobanteFiscal: (NSString*) reqComprobanteFiscal RFC: (NSString*) RFC iva: (NSString*) iva indicaFrecuente: (NSString*) indicaFrecuente nombreCorto: (NSString*) nombreCorto  emailBeneficiario: (NSString*) emailBeneficiario claveOperaciones: (NSString*) claveOperaciones otp: (NSString*) otp tripletaTasa: (NSString*) tripletaTasa digitoVerificador: (NSString*) digitoVerificador nombreCortoRecurrente: (NSString*) nombreCortoRecurrente frecuencia: (NSString*) frecuencia fechaInicio: (NSString*) fechaInicio numRepeticiones: (NSString*) numRepeticiones fechaFin: (NSString*) fechaFin forClient: (id<ServerClient>) client;

- (NSInteger) realizarTraspasoInterbancaria3TDCFrecuente: (NSString*) usuario acceso: (NSString*) acceso standin: (NSString*) standin idCtaCargo: (NSString*) idCtaCargo idCtaBeneficiaria: (NSString*) idCtaBeneficiaria dia: (NSString*) dia mes: (NSString*) mes anio: (NSString*) anio fechaPosterior: (NSString*) fechaPosterior tipoRetiro: (NSString*) tipoRetiro importe: (NSString*) importe concepto: (NSString*) concepto referenciaNumerica: (NSString*) referenciaNumerica reqComprobanteFiscal: (NSString*) reqComprobanteFiscal RFC: (NSString*) RFC iva: (NSString*) iva indicaFrecuente: (NSString*) indicaFrecuente nombreCorto: (NSString*) nombreCorto  emailBeneficiario: (NSString*) emailBeneficiario claveOperaciones: (NSString*) claveOperaciones otp: (NSString*) otp tripletaTasa: (NSString*) tripletaTasa digitoVerificador: (NSString*) digitoVerificador nombreCortoRecurrente: (NSString*) nombreCortoRecurrente frecuencia: (NSString*) frecuencia fechaInicio: (NSString*) fechaInicio numRepeticiones: (NSString*) numRepeticiones fechaFin: (NSString*) fechaFin forClient: (id<ServerClient>) client;

- (NSInteger) realizarTraspasoInterbancaria3TDC: (NSString*) usuario acceso: (NSString*) acceso standin: (NSString*) standin idCtaCargo: (NSString*) idCtaCargo idCtaBeneficiaria: (NSString*) idCtaBeneficiaria dia: (NSString*) dia mes: (NSString*) mes anio: (NSString*) anio fechaPosterior: (NSString*) fechaPosterior tipoRetiro: (NSString*) tipoRetiro importe: (NSString*) importe concepto: (NSString*) concepto referenciaNumerica: (NSString*) referenciaNumerica reqComprobanteFiscal: (NSString*) reqComprobanteFiscal RFC: (NSString*) RFC iva: (NSString*) iva indicaFrecuente: (NSString*) indicaFrecuente nombreCorto: (NSString*) nombreCorto  emailBeneficiario: (NSString*) emailBeneficiario claveOperaciones: (NSString*) claveOperaciones otp: (NSString*) otp tripletaTasa: (NSString*) tripletaTasa digitoVerificador: (NSString*) digitoVerificador nombreCortoRecurrente: (NSString*) nombreCortoRecurrente frecuencia: (NSString*) frecuencia fechaInicio: (NSString*) fechaInicio numRepeticiones: (NSString*) numRepeticiones fechaFin: (NSString*) fechaFin forClient: (id<ServerClient>) client;

- (NSInteger) consultaBeneficiario: (NSString*) usuario acceso: (NSString*) acceso asunto: (NSString*) asunto celular: (NSString*) celular esCuentaExpress: (NSString*) esCuentaExpress forClient: (id<ServerClient>) client;

- (NSInteger) cargaPreregistro: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;


- (NSInteger) getServerMode: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;


- (NSInteger) cargaPreregistroInterbancaria: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;

- (NSInteger) preregistrarCuenta:  (NSString*) usuario acceso: (NSString*) acceso asunto: (NSString*) asunto tipoRegistro: (NSString*) tipoRegistro nombreBeneficiario: (NSString*) nombreBeneficiario otp: (NSString*) otp tripletaTasa: (NSString*) tripletaTasa digitoVerificador: (NSString*) digitoVerificador indicadorClienteBnet: (NSString*) indicadorClienteBnet forClient: (id<ServerClient>) client;





//para interbancarias
- (NSInteger) preregistrarCuentaInterbancarias:  (NSString*) usuario acceso: (NSString*) acceso claveOperaciones: (NSString*) claveOperaciones digitoVerificador: (NSString*) digitoVerificador idBanco: (NSString*) idBanco nombreBeneficiario: (NSString*) nombreBeneficiario numCtaDeposito: (NSString*) numCtaDeposito otp: (NSString*) otp tipoCredito: (NSString*) tipoCredito  tipoCuenta: (NSString*) tipoCuenta  tipoRegistro: (NSString*) tipoRegistro  tripletaTasa: (NSString*) tripletaTasa  forClient: (id<ServerClient>) client;





- (NSInteger) permitirFrecuentes: (NSString*) usuario acceso: (NSString*) acceso idAplicacion: (NSString*) idAplicacion forClient: (id<ServerClient>) client;

- (NSInteger) envioEmail: (NSString*) operacion proceso: (NSString*) proceso usuario: (NSString*) usuario acceso: (NSString*) acceso emailBeneficiario: (NSString*) emailBeneficiario mensaje: (NSString*) mensaje copiaTitular: (NSString*) copiaTitular forClient: (id<ServerClient>) client;

- (NSInteger) wtenvioEmail: (NSString*) acceso emailBeneficiario: (NSString*) emailBeneficiario mensaje: (NSString*) mensaje copiaTitular: (NSString*) copiaTitular tipoEnvio: (NSString*) tipoEnvio forClient: (id<ServerClient>) client;

- (NSInteger) envioEmailInterbancario: (NSString*) operacion proceso: (NSString*) proceso acceso: (NSString*)acceso concepto: (NSString*)concepto copiaTitlar: (NSString*)copiaTitular emailBeneficiario: (NSString*)emailBeneficiario idCtaBeneficiaria: (NSString*)idCtaBeneficiaria idCtaCargo: (NSString*)idCtaCargo importe: (NSString*)importe mensaje: (NSString*)mensaje referenciaNumerica: (NSString*)referenciaNumerica tipoRetiro: (NSString*)tipoRetiro usuario: (NSString*)usuario fechaAplicacion:(NSString*)fechaAplicacion forClient: (id<ServerClient>) client;

- (NSInteger) recuperaFestivos:(NSString*) peticion forClient: (id<ServerClient>) client;

- (NSInteger) aplicaVenta:(NSString*) aplicaVenta forClient: (id<ServerClient>) client;

- (NSInteger) recuperaListaTitulos: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;

- (NSInteger) consultaTipoServicio: (NSString*) acceso numero: (NSString*) uri numero: (NSString*) usuario numero: (NSString*) tipo forClient: (id<ServerClient>) client;

- (NSInteger) consultaContratosPatrimoniales: (NSString*) acceso numero: (NSString*) usuario forClient: (id<ServerClient>) client;

- (NSInteger) wtconsultaCapitales: (NSString*) usuario acceso: (NSString*) numCont tipo: (NSString*) tipo forClient: (id<ServerClient>) client;

-(NSInteger) wtcancelaOrden: (NSString*) usuario acceso: (NSString*) param1 numero: (NSString*) param2 numero:(NSString*) param3 numero:(NSString*) param4 numero:(NSString*) numCont forClient: (id<ServerClient>) client;

- (NSInteger) wtrealizaCompraVenta:(NSString*) usuario acceso: (NSString*) param1 numero: (NSString*) param2 numero:(NSString*) param3 numero:(NSString*) param4 numero:(NSString*) param5 numero:(NSString*) param6 numero: (NSString*) param7 sim: (NSString*) sim forClient: (id<ServerClient>) client;

- (NSInteger) wtconsultaDetalleInversion: (NSString*) usuario acceso: (NSString*) numCont tiempo: (NSString*) tiempo forClient: (id<ServerClient>) client;

- (NSInteger) wtdetalleOrden: (NSString*) usuario acceso: (NSString*) param1 numero: (NSString*) param2 numero:(NSString*)param3 numero:(NSString*) numCont forClient: (id<ServerClient>) client;

- (NSInteger) wtconsultaPortafolio: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;

- (NSInteger) wtconsultarPromociones: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;

- (NSInteger) wtconsultarMKT: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;

- (NSInteger) wtConsultaEstatusOrdenesCapitales: (NSString*) tarjeta acceso: (NSString*) acceso forClient: (id<ServerClient>) client;

- (NSInteger) wtListaCuentas: (NSString*) tarjeta numero: (NSString*) numCont forClient: (id<ServerClient>) client;

- (NSInteger) wtaplicaTraspaso: (NSString*) tarjeta numero: (NSString*) numCont idCuentaCargo: (NSString*) idCuentaCargo importe: (NSString*) importe forClient: (id<ServerClient>) client;

- (NSInteger) wtDiaHabil: (NSString*) tarjeta forClient: (id<ServerClient>) client;

- (NSInteger) signOffServlet:(NSString *) tarjeta forClient:(id<ServerClient>) client;

- (NSInteger) cancelaTituloInv:(NSString*) cuentaInv tittuloInv: (NSString*) tittuloInv cuentaDep:(NSString*) cuentaDep importeInversion:(NSString*) importeInversion fechaOperacion:(NSString*) fechaOperacion tipoCliente:(NSString*) tipoCliente acceso: (NSString*) usuario_global global: (NSString*) acceso_usr_global forClient: (id<ServerClient>) client;

#if (APP_ESTADO == SIMULATION)
- (void) simulateOperationId: (NSInteger) downloadId withResponse: (NSString*) response andHandler: (ServerResponse*) handler forClient: (HTTPInvoker*) client;
#endif


@end
