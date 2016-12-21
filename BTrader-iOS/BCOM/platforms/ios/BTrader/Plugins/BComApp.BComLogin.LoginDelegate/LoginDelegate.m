//
//  LoginDelegate.m
//

#import <Cordova/CDV.h>
#import "LoginDelegate.h"
#import "Constantes.h"
#import "Respuesta.h"
#import "ServerResponse.h"
#import "Session.h"
#import "Server.h"
#import "TokenViewController.h"

@implementation LoginDelegate


// - (void) doNetworkResponse:        (CDVInvokedUrlCommand*) command {}
// - (void) seleccionAutoSeguro:      (CDVInvokedUrlCommand*) command {}
// - (void) seleccionBEstratega:      (CDVInvokedUrlCommand*) command {}
// - (void) seleccionGeoLocalizacion: (CDVInvokedUrlCommand*) command {}
// - (void) limpiarMemoria:           (CDVInvokedUrlCommand*) command {}

- (void) analyzeServerResponse: (ServerResponse *) serverResponse
{
    [super analyzeServerResponse: serverResponse];
    
    Respuesta *respuesta = serverResponse.responseHandler;

    if (respuesta.isCorrect) {
        if ([_callbackLogoutWas isEqualToString: self.callbackId]) {
            if (!self.appDelegate.esInvitado) { [self.session escribirJson: respuesta.jsonResponse deTipo: SigOffJSONType]; }
            self.session.numeroDelUsuario = nil;
            [self.appDelegate resetApp];
        }
        else if ([_callbackLoginWas isEqualToString: self.callbackId]) {
            if (!self.appDelegate.esInvitado) {
                [self.session guardarNumeroTarjeta];
                [self.session escribirJson: respuesta.jsonResponse deTipo: SignOnJSONType];
            }
            [self saveKeys: respuesta.jsonResponse];
        } else if ([_callbackLogoutHost isEqualToString: self.callbackId]) {
            CDVInvokedUrlCommand* cdvLogoutWebSeal = [[CDVInvokedUrlCommand alloc] initWithArguments: nil callbackId: @"LoginDelegateLogoutWebSeal" className: @"" methodName: @""];
            _callbackLogoutWebSeal = cdvLogoutWebSeal.callbackId;
            [self closeSessionWebSeal: cdvLogoutWebSeal];
        }
        else if ([_callbackLogoutWebSeal isEqualToString: self.callbackId]) { [self closeSessionWas: _cdvLogoutWas]; }
        else if ([_callbackLoginWebSeal isEqualToString: self.callbackId]) { [self loginWas: _cdvLoginWas]; }
    } else {
        if ([_callbackLoginWebSeal isEqualToString: self.callbackId]) {
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: respuesta.jsonResponse];
            [self.appDelegate stopIndicatorActivity];
            [self.commandDelegate sendPluginResult: pluginResult callbackId: _callbackLoginWas];
        } else if ([_callbackLogoutHost isEqualToString: self.callbackId]) {
            CDVInvokedUrlCommand* cdvLogoutWebSeal = [[CDVInvokedUrlCommand alloc] initWithArguments: nil callbackId: @"LoginDelegateLogoutWebSeal" className: @"" methodName: @""];
            _callbackLogoutWebSeal = cdvLogoutWebSeal.callbackId;
            [self closeSessionWebSeal: cdvLogoutWebSeal];
        }
        else if ([_callbackLogoutWebSeal isEqualToString: self.callbackId]) { [self closeSessionWas:    _cdvLogoutWas]; }
    }
}

- (void) saveKeys: (NSString *) jsonResponse
{
    NSData *jsonData = [jsonResponse dataUsingEncoding: NSUTF8StringEncoding];
    NSError *error;
    NSDictionary *json = [NSJSONSerialization JSONObjectWithData: jsonData options: NSJSONReadingAllowFragments error: &error];
    NSDictionary *posicion = [json objectForKey: @"posicionGlobal"];
    NSDictionary *instrumento = [json objectForKey: @"solicitaInstrumentoSeguridad"];
    
    if (posicion != nil) {
        _acceso_usr  = [posicion objectForKey: @"acceso_usr"];
        _usuario_usr = [posicion objectForKey: @"usuario_usr"];
    } else if (instrumento != nil) {
        _acceso_usr  = [instrumento objectForKey: @"acceso_usr"];
        _usuario_usr = [instrumento objectForKey: @"usuario_usr"];
    }
}

- (void)doNetworkOperation:(CDVInvokedUrlCommand*) command
{
    _cdvLoginWas = command;
    _callbackLoginWas = command.callbackId;
    
    _tarjeta  = [command.arguments objectAtIndex: 0];
    _password = [command.arguments objectAtIndex: 1];
    
    self.appDelegate.esInvitado = [[command.arguments objectAtIndex: 2] boolValue];
    
    CDVInvokedUrlCommand* cdvLoginWebSeal = [[CDVInvokedUrlCommand alloc] initWithArguments: nil callbackId: @"LoginDelegateLoginWebSeal" className: @"" methodName: @""];
    _callbackLoginWebSeal = cdvLoginWebSeal.callbackId;
    [self loginWebSeal: cdvLoginWebSeal];
}

- (void)loginWebSeal:(CDVInvokedUrlCommand*) command
{
    [super doNetworkOperation: command];
    
    [self.httpInvoker signOnWebSeal: _tarjeta password: _password forClient: self];
}

- (void) loginWas:(CDVInvokedUrlCommand*) command
{
    [super doNetworkOperation: command];

    [self.httpInvoker signOnWas: _tarjeta password: _password ipEnmascarada: @"" forClient: self];
}

- (void) wtLogout:(CDVInvokedUrlCommand *)command
{
    _cdvLogoutWas = command;
    _callbackLogoutWas = command.callbackId;
    
    [self closeSession];
}

- (void) logout:(CDVInvokedUrlCommand*) command
{
    _cdvLogoutWas = command;
    _callbackLogoutWas = command.callbackId;
    
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: @"Aviso\n" message: @"¿Confirma que desea cerrar la sesión?" delegate: self cancelButtonTitle: @"Cancelar" otherButtonTitles: nil];
    
    [alertView addButtonWithTitle: @"Aceptar"];
    [alertView show];
}

- (void) versionServidor: (CDVInvokedUrlCommand*) command
{
    [super doNetworkOperation: command];
    
    NSString *version;
    
#if (APP_ESTADO == SIMULATION)
    version = @"SIMULATION";
#elif (APP_ESTADO == TEST)
    version = @"TEST";
#elif (APP_ESTADO == PROD_LIGA_OCULTA)
    version = @"PROD_LIGA_OCULTA";
#elif (APP_ESTADO == PRODUCCION)
    version = @"PRODUCCION";
#endif
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:version];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
}

- (void) wtrealizaCompraVenta: (CDVInvokedUrlCommand*) command
 {
 [super doNetworkOperation: command];

     NSString *usuario  = [self.argumentos objectAtIndex: 0];
     NSString *param1  = [self.argumentos objectAtIndex: 1];
     NSString *param2  = [self.argumentos objectAtIndex: 2];
     NSString *param3  = [self.argumentos objectAtIndex: 3];
     NSString *param4  = [self.argumentos objectAtIndex: 4];
     NSString *param5  = [self.argumentos objectAtIndex: 5];
     NSString *param6  = [self.argumentos objectAtIndex: 6];
     NSString *param7  = [self.argumentos objectAtIndex: 7];
     NSString *sim  = [self.argumentos objectAtIndex: 8];
     
     [self.httpInvoker wtrealizaCompraVenta: usuario acceso: param1 numero: param2 numero: param3 numero: param4 numero: param5 numero: param6 numero: param7 sim:sim forClient: self];
}

- (void) wtconsultaDetalleInversion:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    
    NSString *usuario  = [self.argumentos objectAtIndex: 0];
    NSString *numCon  = [self.argumentos objectAtIndex: 1];
    NSString *tiempo  = [self.argumentos objectAtIndex: 2];
    
    [self.httpInvoker wtconsultaDetalleInversion:usuario acceso:numCon tiempo:tiempo forClient:self];
}

- (void) wtconsultaCapitales:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSString *usuario  = [self.argumentos objectAtIndex: 0];
    NSString *numCon  = [self.argumentos objectAtIndex: 1];
    NSString *tipo  = [self.argumentos objectAtIndex: 2];
    
    [self.httpInvoker wtconsultaCapitales:usuario acceso:numCon tipo:tipo forClient:self];
}

- (void) wtcancelaOrden:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSString *usuario  = [self.argumentos objectAtIndex: 0];
    NSString *param1  = [self.argumentos objectAtIndex: 1];
    NSString *param2  = [self.argumentos objectAtIndex: 2];
    NSString *param3  = [self.argumentos objectAtIndex: 3];
    NSString *param4  = [self.argumentos objectAtIndex: 4];
    NSString *numCon  = [self.argumentos objectAtIndex: 5];

    [self.httpInvoker wtcancelaOrden:usuario acceso:param1 numero:param2 numero:param3 numero:param4 numero:numCon forClient:self];
}

//cancelaTitulo//
- (void) cancelaTituloInv:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSString *cuentaInv  = [self.argumentos objectAtIndex: 0];
    NSString *tituloInv  = [self.argumentos objectAtIndex: 1];
    NSString *cuentaDep  = [self.argumentos objectAtIndex: 2];
    NSString *importeInversion  = [self.argumentos objectAtIndex: 3];
    NSString *fechaOperacion  = [self.argumentos objectAtIndex: 4];
    NSString *tipoCliente  = [self.argumentos objectAtIndex: 5];
    NSString *usuario_global  = [self.argumentos objectAtIndex: 6];
    NSString *acceso_usr_global  = [self.argumentos objectAtIndex: 7];
    
    [self.httpInvoker cancelaTituloInv:cuentaInv tittuloInv:tituloInv cuentaDep:cuentaDep importeInversion:importeInversion fechaOperacion:fechaOperacion tipoCliente:tipoCliente acceso: usuario_global global: acceso_usr_global forClient:self];
    
}

- (void) envioEmailInterbancario:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    

    
    NSString *datosAplicativos  = [self.argumentos objectAtIndex: 0];

    NSString *operacion  = [datosAplicativos valueForKey:@"operacion"];
    NSString *proceso  = [datosAplicativos valueForKey:@"proceso"];
    NSString *acceso  = [datosAplicativos valueForKey:@"acceso"];
    NSString *concepto  = [datosAplicativos valueForKey:@"concepto"];
    NSString *copiaTitular  = [datosAplicativos valueForKey:@"copiaTitular"];
    NSString *emailBeneficiario  = [datosAplicativos valueForKey:@"emailBeneficiario"];
    
    NSString *idCtaBeneficiaria  = [datosAplicativos valueForKey:@"idCtaBeneficiaria"];
    NSString *idCtaCargo  = [datosAplicativos valueForKey:@"idCtaCargo"];
    NSString *importe  = [datosAplicativos valueForKey:@"importe"];
    NSString *mensaje  = [datosAplicativos valueForKey:@"mensaje"];
    NSString *referenciaNumerica  = [datosAplicativos valueForKey:@"referenciaNumerica"];
    NSString *tipoRetiro  = [datosAplicativos valueForKey:@"tipoRetiro"];
    NSString *fechaAplicacion = [datosAplicativos valueForKey:@"fechaAplicacion"];
    NSString *usuario = [datosAplicativos valueForKey:@"usuario"];
    
    [self.httpInvoker envioEmailInterbancario:operacion proceso:proceso acceso:acceso concepto:concepto copiaTitlar:copiaTitular emailBeneficiario:emailBeneficiario idCtaBeneficiaria:idCtaBeneficiaria idCtaCargo:idCtaCargo importe:importe mensaje:mensaje referenciaNumerica:referenciaNumerica tipoRetiro:tipoRetiro usuario:usuario fechaAplicacion:fechaAplicacion forClient:self];
}

- (void) wtdetalleOrden:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSString *usuario  = [self.argumentos objectAtIndex: 0];
    NSString *param1  = [self.argumentos objectAtIndex: 1];
    NSString *param2  = [self.argumentos objectAtIndex: 2];
    NSString *param3  = [self.argumentos objectAtIndex: 3];
    NSString *fecha  = [self.argumentos objectAtIndex: 4];
    NSString *numCon  = [self.argumentos objectAtIndex: 5];
    
    [self.httpInvoker wtdetalleOrden:usuario acceso:param1 numero:param2 numero:param3 numero:numCon forClient:self];
}

- (void) wtenvioEmail:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSString *usuario = [self.argumentos objectAtIndex: 0];
    NSString *emailBeneficiario  = [self.argumentos objectAtIndex: 1];
    NSString *mensaje  = [self.argumentos objectAtIndex: 2];
    NSString *copiaTitular  = [self.argumentos objectAtIndex: 3];
    NSString *tipoEnvio = [self.argumentos objectAtIndex: 4];
    
    //NSLog(@"LU_tipoEnvio: %@",tipoEnvio);
    
    [self.httpInvoker wtenvioEmail:usuario emailBeneficiario:emailBeneficiario mensaje:mensaje copiaTitular:copiaTitular tipoEnvio:tipoEnvio forClient:self];
}

- (void) wtaperturaFichero:(CDVInvokedUrlCommand *)command
{
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *documentsDirectory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
    NSString *extension = @"pdf";
    
    NSArray *contents = [fileManager contentsOfDirectoryAtPath:documentsDirectory error:nil];
    
    for (NSString *file in contents) {
        NSString *filePath = [documentsDirectory stringByAppendingPathComponent:file];
        
        if ( ([[file pathExtension] isEqualToString:extension]) && [fileManager isDeletableFileAtPath:filePath] ) {
            [fileManager removeItemAtPath:filePath error:nil];
        }
    }
    
    NSString *urlPdf = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 1] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    NSDateFormatter* formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyyMMddhhmmss"];
    NSString *date = [formatter stringFromDate:[NSDate date]];
    
    NSString *newPDF = [NSString stringWithFormat:@"%@%@", date,@".pdf"];
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *filePath = [NSString stringWithFormat:@"%@/%@", [paths objectAtIndex:0],newPDF];
    
    NSURL *url = [[NSURL alloc] initWithString:urlPdf];
    
    NSData *urlData = [NSData dataWithContentsOfURL:url];
    [urlData writeToFile:filePath atomically:YES];
    
    if ([urlData writeToFile:filePath atomically:YES]) {
        
    }
    NSString *documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
    
    NSString *imagesPath = [documentsPath stringByAppendingPathComponent:newPDF];
    
    if ([fileManager fileExistsAtPath:imagesPath]) {
    }else{
    }
    
    NSArray *resultArray = [fileManager subpathsOfDirectoryAtPath:documentsDirectory error:nil];

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:filePath];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

-(void)wtListaCuentas:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    NSString *acceso = [self.argumentos objectAtIndex: 0];
    NSString *contrato  = [self.argumentos objectAtIndex: 1];
    
    [self.httpInvoker wtListaCuentas:acceso numero:contrato forClient:self];
}

-(void)wtaplicaTraspaso:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    NSString *acceso = [self.argumentos objectAtIndex: 0];
    NSString *contrato  = [self.argumentos objectAtIndex: 1];
    NSString *idCuentaCargo = [self.argumentos objectAtIndex: 2];
    NSString *importe  = [self.argumentos objectAtIndex: 3];
    
    [self.httpInvoker wtaplicaTraspaso:acceso numero:contrato idCuentaCargo:idCuentaCargo importe:importe forClient:self];
}

- (void) wtReglasValor:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSString *usuario = [self.argumentos objectAtIndex: 0];
    NSString *acceso  = [self.argumentos objectAtIndex: 1];
    
    [self.httpInvoker wtReglasNegocios:usuario acceso:acceso forClient:self];
    
}

- (void) seleccionDesbloquear:(CDVInvokedUrlCommand*) command

{
//https://a1.bbvanet.com.mx/portalblg/portalblg/public/desbloqueousuario
    NSURL *url = [NSURL URLWithString: @"https://a1.bbvanet.com.mx/portalblg/portalblg/public/desbloqueousuario"];
    [[UIApplication sharedApplication] openURL: url];
}
- (void) consultaDatosGuardados:(CDVInvokedUrlCommand*) command
{
    NSString *tarjeta = self.session.numeroDelUsuario;
    
    if (tarjeta != nil) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: tarjeta];
        [self.commandDelegate sendPluginResult: pluginResult callbackId: command.callbackId];
    } else {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @""];
        [self.commandDelegate sendPluginResult: pluginResult callbackId: command.callbackId];
    }
}

- (void) showAlert:(CDVInvokedUrlCommand *) command
{
    NSString *tittle  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *message = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 1] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *button  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 2] cStringUsingEncoding: NSUTF8StringEncoding]];

    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: tittle message: message delegate: nil cancelButtonTitle: button otherButtonTitles: nil];
    
    [alertView show];
}

- (void) alertView: (UIAlertView *) alertView clickedButtonAtIndex: (NSInteger) buttonIndex
{
         if (buttonIndex == 1) { [self closeSession]; }
    else if (buttonIndex == 0) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @""];
        [self.commandDelegate sendPluginResult: pluginResult callbackId: _callbackLogoutWas];
    }
}

- (void) doKeepAlive
{
    [self.httpInvoker consultaContratosPatrimoniales:_acceso_WT numero:_usuario_WT forClient:self];
}

- (void) closeSession
{
    CDVInvokedUrlCommand* cdvLogoutHost = [[CDVInvokedUrlCommand alloc] initWithArguments: nil callbackId: @"LoginDelegateLogoutHost" className: @"" methodName: @""];
    _callbackLogoutHost = cdvLogoutHost.callbackId;    
    [self closeSessionHost: cdvLogoutHost];
}

- (void) closeSessionWas: (CDVInvokedUrlCommand *) command
{
    [super doNetworkOperation: command];
    
    [self.httpInvoker signOffWebSeal: _tarjeta forClient: self];
    //[self.httpInvoker signOffWas: _usuario_usr acceso: _acceso_usr forClient: self];
}

- (void) closeSessionWebSeal: (CDVInvokedUrlCommand *) command
{
    [super doNetworkOperation: command];
    
    [self.httpInvoker signOffServlet: _tarjeta forClient: self];
    //[self.httpInvoker signOffWebSeal: _tarjeta forClient: self];
}

- (void) closeSessionHost: (CDVInvokedUrlCommand *) command
{
    [super doNetworkOperation: command];
    
    //[self.httpInvoker signOffHost: _tarjeta forClient: self];
    [self.httpInvoker signOffWas: _tarjeta/*@"4555093000002481ADMINF"*/ acceso: /*_acceso_usr*/ @"ADMINF" forClient: self];

}


@end