//
//  VentaInvertirDelegate.m
//  

#import "VentaInvertirDelegate.h"

@implementation VentaInvertirDelegate

- (void)recuperaCuentaDeposito:(CDVInvokedUrlCommand*)command
{
    NSLog(@"VentaInvertirDelegate-recuperaCuentaDeposito");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"VentaInvertirDelegate-recuperaCuentaDeposito"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaContratosCuentasInv:(CDVInvokedUrlCommand*)command
{
    NSLog(@"VentaInvertirDelegate-recuperaContratosCuentasInv");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"VentaInvertirDelegate-recuperaContratosCuentasInv"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaDatosConsulta:(CDVInvokedUrlCommand*)command
{
    NSLog(@"VentaInvertirDelegate-recuperaDatosConsulta");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"VentaInvertirDelegate-recuperaDatosConsulta"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaDatosBarra:(CDVInvokedUrlCommand*)command
{
    NSLog(@"VentaInvertirDelegate-recuperaDatosBarra");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"VentaInvertirDelegate-recuperaDatosBarra"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaDatosOperaExitosa:(CDVInvokedUrlCommand*)command
{
    NSLog(@"VentaInvertirDelegate-recuperaDatosOperaExitosa");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"VentaInvertirDelegate-recuperaDatosOperaExitosa"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)GeneraPDF:(CDVInvokedUrlCommand*)command
{
    NSLog(@"VentaInvertirDelegate-GeneraPDF");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"VentaInvertirDelegate-GeneraPDF"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)guardarImgPreviaRecortadC:(CDVInvokedUrlCommand*)command
{
    NSLog(@"VentaInvertirDelegate-guardarImgPreviaRecortadC");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"VentaInvertirDelegate-guardarImgPreviaRecortadC"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)guardarImgPreviaC:(CDVInvokedUrlCommand*)command
{
    NSLog(@"VentaInvertirDelegate-guardarImgPreviaC");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"VentaInvertirDelegate-guardarImgPreviaC"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command
{
    NSLog(@"VentaInvertirDelegate-doNetworkOperation");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"VentaInvertirDelegate-doNetworkOperation"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)networkResponse:(CDVInvokedUrlCommand*)command
{
    NSLog(@"VentaInvertirDelegate-networkResponse");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"VentaInvertirDelegate-networkResponse"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)aplicaVenta:(CDVInvokedUrlCommand*)command
{
    NSLog(@"VentaInvertirDelegate-aplicaVenta");
    [super doNetworkOperation: command];
    NSLog(@"Solicita-festivos %@", self.callbackId);
    NSLog(@"command = %@", command.description);
    
    [self.httpInvoker aplicaVenta:[command.arguments objectAtIndex:0] forClient:self];
}

- (void) recuperaListaTitulos:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *usuario = [objeto valueForKey:@"usuario"];
    
    [self.httpInvoker recuperaListaTitulos: usuario acceso: acceso forClient: self];
}

@end
