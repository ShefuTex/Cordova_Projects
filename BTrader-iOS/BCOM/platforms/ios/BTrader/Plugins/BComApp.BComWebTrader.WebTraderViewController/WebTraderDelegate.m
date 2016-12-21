//
//  WebTraderDelegate.m
//

#import "WebTraderDelegate.h"

@implementation WebTraderDelegate

- (void)recuperaContratosPatrimoniales:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"WebTraderDelegate-recuperaContratosPatrimoniales"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaTipoServicio:(CDVInvokedUrlCommand*)command{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"WebTraderDelegate-recuperaTipoServicio"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaConsultaTipoCapitales:(CDVInvokedUrlCommand*)command{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"WebTraderDelegate-recuperaConsultaTipoCapitales"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaConsultaCapitales:(CDVInvokedUrlCommand*)command{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"WebTraderDelegate-recuperaConsultaCapitales"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)ejecutaCompraVenta:(CDVInvokedUrlCommand*)command{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"WebTraderDelegate-ejecutaCompraVenta"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)ejecutaCancelacion:(CDVInvokedUrlCommand*)command{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"WebTraderDelegate-ejecutaCancelacion"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)limpiarMemoria:(CDVInvokedUrlCommand*)command{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"WebTraderDelegate-limpiarMemoria"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"WebTraderDelegate-doNetworkOperation"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)networkResponse:(CDVInvokedUrlCommand*)command{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"WebTraderDelegate-networkResponse"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
    
@end
