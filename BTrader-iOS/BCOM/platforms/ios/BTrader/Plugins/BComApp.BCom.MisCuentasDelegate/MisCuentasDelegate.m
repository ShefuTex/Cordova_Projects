//
//  MisCuentasDelegate.m
//  BCom
//
//  Created by Malaga on 02/10/14.
//
//

#import "MisCuentasDelegate.h"

@implementation MisCuentasDelegate

 - (void) analyzeServerResponse:(ServerResponse *) aServerResponse
 {
     [super analyzeServerResponse: aServerResponse];
 
     Respuesta *response = aServerResponse.responseHandler;
 
     if (response.isCorrect) {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: response.jsonResponse];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
     }
}

- (void) recuperaCuentasTDDPesos:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;
    NSLog(@"Recupera cuentas MXP MisCuentasDelegate.m");
    NSLog(@"command = %@", command.debugDescription);
    [self.httpInvoker movimientosCtasCheques:[command.arguments objectAtIndex: 0] forClient:self];
}

- (void) recuperaCuentasDolares:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;
    NSLog(@"Recupera cuentas USD MisCuentasDelegate.m");
    [self.httpInvoker movimientosCtasUSD:[command.arguments objectAtIndex:0] forClient:self];
}

- (void) recuperaCuentasTDCPesos:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;
    NSLog(@"Recupera movimientos TDC MisCuentasDelegate.m");
    [self.httpInvoker movimientosTDC:[command.arguments objectAtIndex:0] forClient:self];
}

@end
