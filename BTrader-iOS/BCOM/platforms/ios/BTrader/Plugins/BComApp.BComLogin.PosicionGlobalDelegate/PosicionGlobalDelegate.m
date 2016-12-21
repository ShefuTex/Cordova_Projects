//
//  PosicionGlobalDelegate.m
// 

#import "PosicionGlobalDelegate.h"

@implementation PosicionGlobalDelegate

NSString *callbackId;

- (void) analyzeServerResponse: (ServerResponse *) serverResponse
{
    [super analyzeServerResponse: serverResponse];
    
    Respuesta *respuesta = serverResponse.responseHandler;
    
    if (respuesta.isCorrect) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: respuesta.jsonResponse];
        [self.appDelegate stopIndicatorActivity];
        [self.commandDelegate sendPluginResult: pluginResult callbackId: callbackId];
    } else {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: respuesta.jsonResponse];
        [self.appDelegate stopIndicatorActivity];
        [self.commandDelegate sendPluginResult: pluginResult callbackId: callbackId];
    }
}

- (void) updatePosicionGlobal: (CDVInvokedUrlCommand*) command
{
    [super doNetworkOperation: command];
    
    _usuario_usr = [self.argumentos objectAtIndex: 0];
    _acceso_usr  = [self.argumentos objectAtIndex: 1];
    
    [self.httpInvoker posicionGlobal: _usuario_usr acceso: _acceso_usr forClient: self];
}

- (void) getCuentasTraspasoEfectivo: (CDVInvokedUrlCommand*) command
{
    
    callbackId = command.callbackId;
    
    NSArray *arguments = command.arguments;
    
    NSString *usuario = [ arguments objectAtIndex: 0 ];
    NSString *acceso = [ arguments objectAtIndex: 1 ];
    NSString *idContrato = [ arguments objectAtIndex: 2];
    
    //[ self.httpInvoker getSaldoCuentaTraspasoEfectivo: usuario acceso:acceso idContrato:idContrato forClient:self ];
}

@end
