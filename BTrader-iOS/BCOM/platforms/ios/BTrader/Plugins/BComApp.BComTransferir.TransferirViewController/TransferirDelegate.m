//
//  TransferirDelegate.m
//

#import "TransferirDelegate.h"

@implementation TransferirDelegate

NSString *callbackComision;

- (void)recuperaCuentasTarRetiro:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-recuperaCuentasTarRetiro"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaCuentasTarDeposito:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-recuperaCuentasTarDeposito"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaCuentasTarFrecBBVA:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-recuperaCuentasTarFrecBBVA"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaCuentasTarFrecOBan:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-recuperaCuentasTarFrecOBan"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command
{
//  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-doNetworkOperation"];
//  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

    self.callbackId = command.callbackId;
    NSLog(@"doNetworkOperation %@", self.callbackId);
    NSLog(@"command = %@", command.description);
    [self.httpInvoker registraTraspaso:[command.arguments objectAtIndex: 0] forClient:self];

}

- (void)networkResponse:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-networkResponse"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)GeneraPDF:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-GeneraPDF"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)guardarImgPreviaRecortadC:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-guardarImgPreviaRecortadC"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)guardarImgPreviaC:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-guardarImgPreviaC"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaPagos:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-recuperaPagos"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaSaldos:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-recuperaSaldos"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)ejecutaGuardaCuentaNueva:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"TransferirDelegate-ejecutaGuardaCuentaNueva"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) pagoMinimoNoInteres:(CDVInvokedUrlCommand *)command
{
    self.callbackId = command.callbackId;
    NSLog(@"Pago minimo sin intereses %@", self.callbackId);
    NSLog(@"command = %@", command.description);
    [self.httpInvoker pagoMinimoNoInteres:[command.arguments objectAtIndex: 0] forClient:self];

}

- (void) solicitaComision:(CDVInvokedUrlCommand *)command
{
    self.callbackId = command.callbackId;
    callbackComision = command.callbackId;
    NSLog(@"Solicita-comision %@", self.callbackId);
    NSLog(@"command = %@", command.description);
    [self.httpInvoker solicitaComision:[command.arguments objectAtIndex: 0] forClient:self];
}

- (void) recuperaListasFrecuentes:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *idAplicacion  = [objeto valueForKey:@"idAplicacion"];
    NSString *usuario = [objeto valueForKey:@"usuario"];

    [self.httpInvoker recuperaListasFrecuentes: usuario acceso: acceso idAplicacion:idAplicacion forClient: self];
}

- (void) recuperaListasFrecuentesInterbancaria:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *idAplicacion  = [objeto valueForKey:@"idAplicacion"];
    NSString *usuario = [objeto valueForKey:@"usuario"];
    
    [self.httpInvoker recuperaListasFrecuentesInterbancaria: usuario acceso: acceso idAplicacion:idAplicacion forClient: self];
    
}

- (void) recuperaListasPreregistradas:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *idAplicacion  = [objeto valueForKey:@"idAplicacion"];
    NSString *usuario = [objeto valueForKey:@"usuario"];
    
    [self.httpInvoker recuperaListasPreregistradas: usuario acceso: acceso idAplicacion:idAplicacion forClient: self];
}


- (void) recuperaListasPreregistradasInterbancaria:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *idAplicacion  = [objeto valueForKey:@"idAplicacion"];
    NSString *usuario = [objeto valueForKey:@"usuario"];
    
    [self.httpInvoker recuperaListasPreregistradasInterbancaria: usuario acceso: acceso idAplicacion:idAplicacion forClient: self];
}

- (void) realizarTraspaso:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
	NSString *usuario = [objeto valueForKey:@"usuario"];
    NSString *fechaOperacion  = [objeto valueForKey:@"fechaOperacion"];
    
	NSString *idAsuntoCargo  = [objeto valueForKey:@"idAsuntoCargo"];
	NSString *idAsuntoAbono  = [objeto valueForKey:@"idAsuntoAbono"];
	NSString *nombreBeneficiario  = [objeto valueForKey:@"nombreBeneficiario"];
	NSString *importe  = [objeto valueForKey:@"importe"];
	NSString *rfc  = [objeto valueForKey:@"rfc"];
	NSString *iva  = [objeto valueForKey:@"iva"];
	NSString *nombreCorto  = [objeto valueForKey:@"nombreCorto"];
	NSString *email  = [objeto valueForKey:@"email"];
	NSString *claveOperacion  = [objeto valueForKey:@"claveOperacion"];
	NSString *otp  = [objeto valueForKey:@"otp"];
	NSString *tripletaTasa  = [objeto valueForKey:@"tripletaTasa"];
	NSString *digitoVerificador  = [objeto valueForKey:@"digitoVerificador"];
	NSString *periodo  = [objeto valueForKey:@"periodo"];
	NSString *fechaInicio  = [objeto valueForKey:@"fechaInicio"];
	NSString *fechaFin  = [objeto valueForKey:@"fechaFin"];
	NSString *repeticiones  = [objeto valueForKey:@"repeticiones"];
	NSString *nombreCortoPeriodico  = [objeto valueForKey:@"nombreCortoPeriodico"];
	
    [self.httpInvoker realizarTraspaso: usuario acceso: acceso fechaOperacion: fechaOperacion idAsuntoCargo: idAsuntoCargo idAsuntoAbono: idAsuntoAbono nombreBeneficiario: nombreBeneficiario importe: importe rfc: rfc iva: iva nombreCorto: nombreCorto email: email claveOperacion: claveOperacion otp: otp tripletaTasa: tripletaTasa digitoVerificador: digitoVerificador periodo: periodo fechaInicio: fechaInicio fechaFin: fechaFin  repeticiones: repeticiones nombreCortoPeriodico: nombreCortoPeriodico forClient: self];
}


- (void) realizarTraspasoInterbancaria3:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
	NSString *usuario = [objeto valueForKey:@"usuario"];
    NSString *standin  = [objeto valueForKey:@"standin"];
    
	NSString *idCtaCargo  = [objeto valueForKey:@"idCtaCargo"];
	NSString *idCtaBeneficiaria  = [objeto valueForKey:@"idCtaBeneficiaria"];
    NSString *dia  = [objeto valueForKey:@"dia"];
    NSString *mes  = [objeto valueForKey:@"mes"];
    NSString *anio  = [objeto valueForKey:@"anio"];
	NSString *fechaPosterior  = [objeto valueForKey:@"fechaPosterior"];
    NSString *tipoRetiro  = [objeto valueForKey:@"tipoRetiro"];
	NSString *importe  = [objeto valueForKey:@"importe"];
    NSString *concepto  = [objeto valueForKey:@"concepto"];
    NSString *referenciaNumerica  = [objeto valueForKey:@"referenciaNumerica"];
    NSString *reqComprobanteFiscal  = [objeto valueForKey:@"reqComprobanteFiscal"];
    NSString *RFC  = [objeto valueForKey:@"RFC"];
	NSString *iva  = [objeto valueForKey:@"iva"];
    NSString *indicaFrecuente  = [objeto valueForKey:@"indicaFrecuente"];
	NSString *nombreCorto  = [objeto valueForKey:@"nombreCorto"];
	NSString *emailBeneficiario  = [objeto valueForKey:@"emailBeneficiario"];
	NSString *claveOperaciones  = [objeto valueForKey:@"claveOperaciones"];
	NSString *otp  = [objeto valueForKey:@"otp"];
	NSString *tripletaTasa  = [objeto valueForKey:@"tripletaTasa"];
	NSString *digitoVerificador  = [objeto valueForKey:@"digitoVerificador"];
    NSString *nombreCortoRecurrente  = [objeto valueForKey:@"nombreCortoRecurrente"];
    NSString *frecuencia  = [objeto valueForKey:@"frecuencia"];
	NSString *fechaInicio  = [objeto valueForKey:@"fechaInicio"];
    NSString *numRepeticiones  = [objeto valueForKey:@"numRepeticiones"];
	NSString *fechaFin  = [objeto valueForKey:@"fechaFin"];
    
	
    [self.httpInvoker realizarTraspasoInterbancaria3: usuario acceso: acceso standin: standin idCtaCargo: idCtaCargo idCtaBeneficiaria: idCtaBeneficiaria dia: dia mes: mes anio: anio fechaPosterior: fechaPosterior tipoRetiro: tipoRetiro importe: importe concepto: concepto referenciaNumerica: referenciaNumerica reqComprobanteFiscal: reqComprobanteFiscal RFC: RFC iva: iva indicaFrecuente: indicaFrecuente nombreCorto: nombreCorto emailBeneficiario: emailBeneficiario claveOperaciones: claveOperaciones otp: otp tripletaTasa: tripletaTasa digitoVerificador: digitoVerificador nombreCortoRecurrente: nombreCortoRecurrente frecuencia: frecuencia fechaInicio: fechaInicio numRepeticiones: numRepeticiones fechaFin: fechaFin forClient: self];
}

- (void) realizarTraspasoInterbancaria3TDCFrecuente:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *usuario = [objeto valueForKey:@"usuario"];
//    NSString *standin  = [objeto valueForKey:@"standin"];
    
    NSString *idCtaCargo  = [objeto valueForKey:@"idCtaCargo"];
    NSString *idCtaBeneficiaria  = [objeto valueForKey:@"idCtaBeneficiaria"];
    NSString *dia  = [objeto valueForKey:@"dia"];
    NSString *mes  = [objeto valueForKey:@"mes"];
    NSString *anio  = [objeto valueForKey:@"anio"];
    NSString *fechaPosterior  = [objeto valueForKey:@"fechaPosterior"];
    NSString *tipoRetiro  = [objeto valueForKey:@"tipoRetiro"];
    NSString *importe  = [objeto valueForKey:@"importe"];
    NSString *concepto  = [objeto valueForKey:@"concepto"];
    NSString *referenciaNumerica  = [objeto valueForKey:@"referenciaNumerica"];
    NSString *reqComprobanteFiscal  = [objeto valueForKey:@"reqComprobanteFiscal"];
    NSString *RFC  = [objeto valueForKey:@"RFC"];
    NSString *iva  = [objeto valueForKey:@"iva"];
    NSString *indicaFrecuente  = [objeto valueForKey:@"indicaFrecuente"];
    NSString *nombreCorto  = [objeto valueForKey:@"nombreCorto"];
    NSString *emailBeneficiario  = [objeto valueForKey:@"emailBeneficiario"];
    NSString *claveOperaciones  = [objeto valueForKey:@"claveOperaciones"];
    NSString *otp  = [objeto valueForKey:@"otp"];
    NSString *tripletaTasa  = [objeto valueForKey:@"tripletaTasa"];
    NSString *digitoVerificador  = [objeto valueForKey:@"digitoVerificador"];
    NSString *nombreCortoRecurrente  = [objeto valueForKey:@"nombreCortoRecurrente"];
    NSString *frecuencia  = [objeto valueForKey:@"frecuencia"];
    NSString *fechaInicio  = [objeto valueForKey:@"fechaInicio"];
    NSString *numRepeticiones  = [objeto valueForKey:@"numRepeticiones"];
    NSString *fechaFin  = [objeto valueForKey:@"fechaFin"];
    
    
    //[self.httpInvoker realizarTraspasoInterbancaria3TDCFrecuente: usuario acceso: acceso idCtaCargo: idCtaCargo idCtaBeneficiaria: idCtaBeneficiaria dia: dia mes: mes anio: anio fechaPosterior: fechaPosterior tipoRetiro: tipoRetiro importe: importe concepto: concepto referenciaNumerica: referenciaNumerica reqComprobanteFiscal: reqComprobanteFiscal RFC: RFC iva: iva indicaFrecuente: indicaFrecuente nombreCorto: nombreCorto emailBeneficiario: emailBeneficiario claveOperaciones: claveOperaciones otp: otp tripletaTasa: tripletaTasa digitoVerificador: digitoVerificador nombreCortoRecurrente: nombreCortoRecurrente frecuencia: frecuencia fechaInicio: fechaInicio numRepeticiones: numRepeticiones fechaFin: fechaFin forClient: self];
}

- (void) realizarTraspasoInterbancaria3TDC:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *usuario = [objeto valueForKey:@"usuario"];
    NSString *standin  = [objeto valueForKey:@"standin"];
    
    NSString *idCtaCargo  = [objeto valueForKey:@"idCtaCargo"];
    NSString *idCtaBeneficiaria  = [objeto valueForKey:@"idCtaBeneficiaria"];
    NSString *dia  = [objeto valueForKey:@"dia"];
    NSString *mes  = [objeto valueForKey:@"mes"];
    NSString *anio  = [objeto valueForKey:@"anio"];
    NSString *fechaPosterior  = [objeto valueForKey:@"fechaPosterior"];
    NSString *tipoRetiro  = [objeto valueForKey:@"tipoRetiro"];
    NSString *importe  = [objeto valueForKey:@"importe"];
    NSString *concepto  = [objeto valueForKey:@"concepto"];
    NSString *referenciaNumerica  = [objeto valueForKey:@"referenciaNumerica"];
    NSString *reqComprobanteFiscal  = [objeto valueForKey:@"reqComprobanteFiscal"];
    NSString *RFC  = [objeto valueForKey:@"RFC"];
    NSString *iva  = [objeto valueForKey:@"iva"];
    NSString *indicaFrecuente  = [objeto valueForKey:@"indicaFrecuente"];
    NSString *nombreCorto  = [objeto valueForKey:@"nombreCorto"];
    NSString *emailBeneficiario  = [objeto valueForKey:@"emailBeneficiario"];
    NSString *claveOperaciones  = [objeto valueForKey:@"claveOperaciones"];
    NSString *otp  = [objeto valueForKey:@"otp"];
    NSString *tripletaTasa  = [objeto valueForKey:@"tripletaTasa"];
    NSString *digitoVerificador  = [objeto valueForKey:@"digitoVerificador"];
    NSString *nombreCortoRecurrente  = [objeto valueForKey:@"nombreCortoRecurrente"];
    NSString *frecuencia  = [objeto valueForKey:@"frecuencia"];
    NSString *fechaInicio  = [objeto valueForKey:@"fechaInicio"];
    NSString *numRepeticiones  = [objeto valueForKey:@"numRepeticiones"];
    NSString *fechaFin  = [objeto valueForKey:@"fechaFin"];
    
    
    [self.httpInvoker realizarTraspasoInterbancaria3TDC: usuario acceso: acceso standin: standin idCtaCargo: idCtaCargo idCtaBeneficiaria: idCtaBeneficiaria dia: dia mes: mes anio: anio fechaPosterior: fechaPosterior tipoRetiro: tipoRetiro importe: importe concepto: concepto referenciaNumerica: referenciaNumerica reqComprobanteFiscal: reqComprobanteFiscal RFC: RFC iva: iva indicaFrecuente: indicaFrecuente nombreCorto: nombreCorto emailBeneficiario: emailBeneficiario claveOperaciones: claveOperaciones otp: otp tripletaTasa: tripletaTasa digitoVerificador: digitoVerificador nombreCortoRecurrente: nombreCortoRecurrente frecuencia: frecuencia fechaInicio: fechaInicio numRepeticiones: numRepeticiones fechaFin: fechaFin forClient: self];
}

- (void) consultaBeneficiario:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
	NSString *usuario = [objeto valueForKey:@"usuario"];
    NSString *asunto  = [objeto valueForKey:@"asunto"];
    NSString *celular  = [objeto valueForKey:@"celular"];
    NSString *esCuentaExpress  = [objeto valueForKey:@"esCuentaExpress"];

    [self.httpInvoker consultaBeneficiario: usuario acceso: acceso asunto: asunto celular: celular esCuentaExpress: esCuentaExpress forClient: self];
}


- (void) cargaPreregistro:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
	NSString *usuario = [objeto valueForKey:@"usuario"];

    
    [self.httpInvoker cargaPreregistro: usuario acceso: acceso forClient: self];
}

- (void) cargaPreregistroInterbancaria:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
	NSString *usuario = [objeto valueForKey:@"usuario"];
    
    
    [self.httpInvoker cargaPreregistroInterbancaria: usuario acceso: acceso forClient: self];
}



- (void) getServerMode:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
	NSString *usuario = [objeto valueForKey:@"usuario"];
    
    
    [self.httpInvoker getServerMode: usuario acceso: acceso forClient: self];
}



- (void) preregistrarCuenta:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *usuario = [objeto valueForKey:@"usuario"];
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *otp  = [objeto valueForKey:@"otp"];
    NSString *tripletaTasa = [objeto valueForKey:@"tripletaTasa"];
    NSString *digitoVerificador  = [objeto valueForKey:@"digitoVerificador"];
    NSString *tipoRegistro  = [objeto valueForKey:@"tipoRegistro"];
    NSString *numeroCtaDeposito = [objeto valueForKey:@"asunto"];
    NSString *nombreBeneficiario  = [objeto valueForKey:@"nombreBeneficiario"];
    NSString *indicadorClienteBnet = [objeto valueForKey:@"indicadorClienteBnet"];
    
//  NSString *standin  = [objeto valueForKey:@"standin"];
   // NSString *tipoCuenta = [objeto valueForKey:@"tipoCuenta"];
    NSString *claveOperaciones = [objeto valueForKey:@"claveOperaciones"];
	NSString *tipoCredito = [objeto valueForKey:@"tipoCredito"];
    
    //[self.httpInvoker preregistrarCuenta: usuario acceso: acceso tipoRegistro: tipoRegistro claveOperaciones: claveOperaciones tipoCredito: tipoCredito nombreBeneficiario: nombreBeneficiario  otp: otp tripletaTasa: tripletaTasa digitoVerificador: digitoVerificador numCtaDeposito: numeroCtaDeposito indicadorClienteBnet: indicadorClienteBnet forClient: self];
    
}



//PARA INTERBANCARIAS
- (void) preregistrarCuentaInterbancarias:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
	NSString *usuario = [objeto valueForKey:@"usuario"];
    NSString *tipoRegistro  = [objeto valueForKey:@"tipoRegistro"];
    
    NSString *idBanco  = [objeto valueForKey:@"idBanco"];
    
    NSString *nombreBeneficiario  = [objeto valueForKey:@"nombreBeneficiario"];
    
    NSString *otp  = [objeto valueForKey:@"otp"];
	NSString *tripletaTasa = [objeto valueForKey:@"tripletaTasa"];
    NSString *digitoVerificador  = [objeto valueForKey:@"digitoVerificador"];
    
    NSString *claveOperaciones  = [objeto valueForKey:@"claveOperaciones"];
    
    NSString *numCtaDeposito  = [objeto valueForKey:@"numCtaDeposito"];

    NSString *tipoCredito  = [objeto valueForKey:@"tipoCredito"];

    NSString *tipoCuenta  = [objeto valueForKey:@"tipoCuenta"];


    
    
    
    [self.httpInvoker preregistrarCuentaInterbancarias: usuario acceso: acceso claveOperaciones: claveOperaciones digitoVerificador: digitoVerificador idBanco: idBanco nombreBeneficiario: nombreBeneficiario numCtaDeposito:  numCtaDeposito otp: otp tipoCredito: tipoCredito  tipoCuenta: tipoCuenta  tipoRegistro: tipoRegistro  tripletaTasa: tripletaTasa forClient: self];
    
}


- (void) permitirFrecuentes:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *idAplicacion  = [objeto valueForKey:@"idAplicacion"];
    NSString *usuario = [objeto valueForKey:@"usuario"];

    [self.httpInvoker permitirFrecuentes: usuario acceso: acceso idAplicacion:idAplicacion forClient: self];
}

- (void) envioEmail:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
	NSString *usuario = [objeto valueForKey:@"usuario"];
    NSString *operacion  = [objeto valueForKey:@"operacion"];    
	NSString *proceso  = [objeto valueForKey:@"proceso"];
	NSString *emailBeneficiario  = [objeto valueForKey:@"emailBeneficiario"];
	NSString *mensaje  = [objeto valueForKey:@"mensaje"];
	NSString *copiaTitular  = [objeto valueForKey:@"copiaTitular"];
	
    [self.httpInvoker envioEmail: operacion proceso: proceso usuario: usuario acceso: acceso emailBeneficiario: emailBeneficiario mensaje: mensaje copiaTitular: copiaTitular forClient: self];
}

- (void) recuperaFestivos:(CDVInvokedUrlCommand *)command
{
    self.callbackId = command.callbackId;
    NSLog(@"Solicita-festivos %@", self.callbackId);
    NSLog(@"command = %@", command.description);
    
    [self.httpInvoker recuperaFestivos:[command.arguments objectAtIndex:0] forClient:self];
}

- (void) analyzeServerResponse:(ServerResponse *)aServerResponse
{
    [super analyzeServerResponse: aServerResponse];
    
    Respuesta *respuesta = aServerResponse.responseHandler;
    
    if (respuesta.isCorrect) {
//        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: respuesta.jsonResponse];
        [self.appDelegate stopIndicatorActivity];
//        [self.commandDelegate sendPluginResult: pluginResult callbackId: self.callbackId];
        
        if (self.callbackId == callbackComision) {
            [self showAlert:respuesta];
        } else {
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: respuesta.jsonResponse];
            [self.appDelegate stopIndicatorActivity];
            [self.commandDelegate sendPluginResult: pluginResult callbackId: self.callbackId];
        }
    } else {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: respuesta.jsonResponse];
        [self.appDelegate stopIndicatorActivity];
        [self.commandDelegate sendPluginResult: pluginResult callbackId: self.callbackId];
    }
}

- (void) showAlert: (Respuesta*) respuesta
{
    
//    NSMutableString *respuestaJson = [ respuesta.jsonResponse stringByReplacingOccurrencesOfString:@"\\" withString:@"" ];
    
    NSData *datosJson = [ respuesta.jsonResponse dataUsingEncoding:NSUTF8StringEncoding];
    id json = [ NSJSONSerialization JSONObjectWithData:datosJson options:0 error:nil];
    
    NSString *mensaje = [NSString stringWithFormat: @"La comisión a pagar por disposición\nde efectivo es $ %@\nDeseas realizar la operación?", [[ json objectForKey:@"respuesta"] objectForKey: @"comisionDisposicion"] ];
    [[[UIAlertView alloc] initWithTitle:@"" message:mensaje delegate:self cancelButtonTitle:@"Aceptar" otherButtonTitles:@"Cancelar", nil ] show ];
}

- (void) alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if (buttonIndex == 0) {
        [self.webView stringByEvaluatingJavaScriptFromString:@"realizaTraspaso(true)"];
    } else {
        [self.webView stringByEvaluatingJavaScriptFromString:@"cancelarAprobacion()"];
    }
}

@end