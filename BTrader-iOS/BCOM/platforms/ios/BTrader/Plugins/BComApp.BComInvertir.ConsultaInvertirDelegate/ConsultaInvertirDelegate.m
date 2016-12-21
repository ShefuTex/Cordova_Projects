//
//  ConsultaInvertirDelegate.m
//  
//
//  Created by Ricardo Ruiz on 21/05/14.
//
//

#import "ConsultaInvertirDelegate.h"
//#import <Cordova/CDV.h>

@implementation ConsultaInvertirDelegate

- (void)recuperaInstrumentoInv:(CDVInvokedUrlCommand*)command
{
    NSLog(@"ConsultaInvertirDelegate-recuperaInstrumentoInv");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"ConsultaInvertirDelegate-recuperaInstrumentoInv"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaPlazos:(CDVInvokedUrlCommand*)command
{
    NSLog(@"ConsultaInvertirDelegate-recuperaPlazos");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"ConsultaInvertirDelegate-recuperaPlazos"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaDatosConsulta:(CDVInvokedUrlCommand*)command
{
    NSLog(@"ConsultaInvertirDelegate-recuperaDatosConsulta");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"ConsultaInvertirDelegate-recuperaDatosConsulta"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

- (void)recuperaDatosBarra:(CDVInvokedUrlCommand*)command
{
    NSLog(@"ConsultaInvertirDelegate-recuperaDatosBarra");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"ConsultaInvertirDelegate-recuperaDatosBarra"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command
{
    NSLog(@"ConsultaInvertirDelegate-doNetworkOperation");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"ConsultaInvertirDelegate-doNetworkOperation"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)networkResponse:(CDVInvokedUrlCommand*)command
{
    NSLog(@"ConsultaInvertirDelegate-networkResponse");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"ConsultaInvertirDelegate-networkResponse"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) recuperaTasas:(CDVInvokedUrlCommand *)command
{
    self.callbackId = command.callbackId;
    NSLog(@"Recupera Tasas-inversion");
    [self.httpInvoker recuperaTasas:[command.arguments objectAtIndex:0] forClient:self];
}

- (void) analyzeServerResponse:(ServerResponse *)aServerResponse
{
    [super analyzeServerResponse: aServerResponse];
    
    Respuesta *respuesta = aServerResponse.responseHandler;
    
    if (respuesta.isCorrect) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: respuesta.jsonResponse];
        [self.appDelegate stopIndicatorActivity];
        [self.commandDelegate sendPluginResult: pluginResult callbackId: self.callbackId];
    } else {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: respuesta.jsonResponse];
        [self.appDelegate stopIndicatorActivity];
        [self.commandDelegate sendPluginResult: pluginResult callbackId: self.callbackId];
    }
}

@end