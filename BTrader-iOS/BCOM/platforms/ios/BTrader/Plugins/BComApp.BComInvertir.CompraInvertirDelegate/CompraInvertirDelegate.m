//
//  CompraInvertirDelegate.m
//  
//
//  Created by Ricardo Ruiz on 21/05/14.
//
//

#import "CompraInvertirDelegate.h"
#import <UIKit/UIKit.h>
#import <UIKit/UIWebView.h>
#import <JavaScriptCore/WebKitAvailability.h>

//#import <Cordova/CDV.h>

@implementation CompraInvertirDelegate

- (void)recuperaCuentaRetiro:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-recuperaCuentaRetiro");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-recuperaCuentaRetiro"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaContratosCuentasInv:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-recuperaContratosCuentasInv");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-recuperaContratosCuentasInv"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaInstrumentoInv:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-recuperaInstrumentoInv");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-recuperaInstrumentoInv"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaPlazos:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-recuperaPlazos");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-recuperaPlazos"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaInstrumentoPagoCap:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-recuperaInstrumentoPagoCap");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-recuperaInstrumentoPagoCap"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaInstrumentoPagoInt:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-recuperaInstrumentoPagoInt");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-recuperaInstrumentoPagoInt"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaDatosConsulta:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-recuperaDatosConsulta");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-recuperaDatosConsulta"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaDatosBarra:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-recuperaDatosBarra");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-recuperaDatosBarra"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaDatosOperaExitosa:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-recuperaDatosOperaExitosa");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-recuperaDatosOperaExitosa"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)GeneraPDF:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-GeneraPDF");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-GeneraPDF"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)guardarImgPreviaRecortadC:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-guardarImgPreviaRecortadC");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-guardarImgPreviaRecortadC"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)guardarImgPreviaC:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-guardarImgPreviaC");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-guardarImgPreviaC"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-doNetworkOperation");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-doNetworkOperation"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)networkResponse:(CDVInvokedUrlCommand*)command
{
    NSLog(@"CompraInvertirDelegate-networkResponse");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"CompraInvertirDelegate-networkResponse"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)muestraAlert:(CDVInvokedUrlCommand *)command
{
    NSLog(@"Creando alerta");

    NSString *tittle  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *message = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 1] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *button  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 2] cStringUsingEncoding: NSUTF8StringEncoding]];
   // NSString *tituloConIcono = [NSString stringWithFormat:@"\u26A0   %@",tittle];
   
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: tittle message: message delegate: nil cancelButtonTitle: button otherButtonTitles: nil];
    [alertView show];
    
}

- (void)muestraAlertDual:(CDVInvokedUrlCommand *)command
{
    NSLog(@"Creando alerta dos botones");
    
    NSString *tittle  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *message = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 1] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *button1 = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 2] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *button2 = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 3] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: tittle message: message delegate: self cancelButtonTitle: button1 otherButtonTitles: button2, nil];
    
    [alertView show];
    
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if (buttonIndex == 1) {
        [self.webView stringByEvaluatingJavaScriptFromString:@"cancelarAprobacion()"];
    }
}

- (void)aplicaCompra:(CDVInvokedUrlCommand *)command
{
    self.callbackId = command.callbackId;
    NSLog(@"Aplicando compra %@", self.callbackId);
    [self.httpInvoker aplicaCompra:[command.arguments objectAtIndex:0] forClient:self];
}

- (void) recuperaListaTitulos:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *usuario = [objeto valueForKey:@"usuario"];
    
    [self.httpInvoker recuperaListaTitulos: usuario acceso: acceso forClient: self];
}

- (void) recuperaListaChequesCompra:(CDVInvokedUrlCommand *)command{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *usuario = [objeto valueForKey:@"usuario"];
    
    //self.httpInvoker recuperaListaChequesCompra: usuario acceso: acceso forClient: self];

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
