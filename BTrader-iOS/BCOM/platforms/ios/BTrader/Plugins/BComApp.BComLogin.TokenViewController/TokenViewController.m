//
//  TokenViewController.m
//

#import "TokenViewController.h"
#import <Cordova/CDV.h>
#import "Constantes.h"
#import "Respuesta.h"
#import "Session.h"

@implementation TokenViewController {
    NSString *tokenCallback;
    NSString *bancosCallback;
    NSString *reglasCallback;
    //NSString *doKeep;
}

// - (void) asignarDatos:    (CDVInvokedUrlCommand*) command {}
// - (void) leerDatos:       (CDVInvokedUrlCommand*) command {}
// - (void) networkResponse: (CDVInvokedUrlCommand*) command {}

- (void) analyzeServerResponse: (ServerResponse *) aServerResponse
{
    [super analyzeServerResponse: aServerResponse];

    Respuesta *respuesta = aServerResponse.responseHandler;
    
    if (respuesta.isCorrect) {
        if (!self.appDelegate.esInvitado) {
            if ([tokenCallback  isEqualToString: self.callbackId]) { [self.session escribirJson: respuesta.jsonResponse deTipo: SigOn2JSONType]; }
            if ([bancosCallback isEqualToString: self.callbackId]) { [self.session escribirJson: respuesta.jsonResponse deTipo: CatBanJSONType]; }
//          if ([reglasCallback isEqualToString: self.callbackId]) { [self.session escribirJson: respuesta.jsonResponse deTipo: INDEFINIDO]; } }
            if ([reglasCallback isEqualToString: self.callbackId]) {
                CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: respuesta.jsonResponse];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
            }
        }
    }
}

- (void) doNetworkOperation: (CDVInvokedUrlCommand*) command
{
    [super doNetworkOperation: command];
    
    tokenCallback = command.callbackId;
    
    NSString *numero  = [self.argumentos objectAtIndex: 0];
    NSString *tipo    = [self.argumentos objectAtIndex: 1];
    NSString *usuario = [self.argumentos objectAtIndex: 2];
    NSString *acceso  = [self.argumentos objectAtIndex: 3];
    
    [self.httpInvoker signOnIS: usuario acceso: acceso numero: numero tipo: tipo forClient: self];
}

- (void) downloadBanksCatalog: (CDVInvokedUrlCommand *) command
{
    [super doNetworkOperation: command];
    
    bancosCallback = command.callbackId;
    
    NSString *usuario = [self.argumentos objectAtIndex: 0];
    NSString *acceso  = [self.argumentos objectAtIndex: 1];

    
    [self.httpInvoker catalogoBancos: usuario acceso: acceso forClient: self];
}

- (void) downloadBusinessRules: (CDVInvokedUrlCommand *) command
{
    [super doNetworkOperation: command];
    
    reglasCallback = command.callbackId;
    
    NSString *usuario = [self.argumentos objectAtIndex: 0];
    NSString *acceso  = [self.argumentos objectAtIndex: 1];
    
    [self.httpInvoker reglasNegocios:usuario acceso:acceso forClient:self];
    
}

- (void) wtConsultaTipoServicio: (CDVInvokedUrlCommand*) command
{
    [super doNetworkOperation: command];
    
    [self.httpInvoker consultaTipoServicio: _acceso numero: _uri numero: _usuario numero: @"" forClient:self];
}

- (void) wtConsultaContratosPatrimoniales: (CDVInvokedUrlCommand*) command
{
    [super doNetworkOperation: command];
    
    [self.httpInvoker consultaContratosPatrimoniales: _acceso_WT numero: _usuario_WT forClient: self];
}

- (void) wtDiaHabil:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation:command];
    
    NSString *usuario = [self.argumentos objectAtIndex: 0];
    
    [self.httpInvoker wtDiaHabil:usuario forClient:self];
}


@end