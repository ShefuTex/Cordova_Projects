//
//  WebTraderDelegate.h
//

#import <Cordova/CDV.h>

@interface WebTraderDelegate :  CDVPlugin


- (void)recuperaContratosPatrimoniales:(CDVInvokedUrlCommand*)command;

- (void)recuperaTipoServicio:(CDVInvokedUrlCommand*)command;

- (void)recuperaConsultaTipoCapitales:(CDVInvokedUrlCommand*)command;

- (void)recuperaConsultaCapitales:(CDVInvokedUrlCommand*)command;

- (void)ejecutaCompraVenta:(CDVInvokedUrlCommand*)command;

- (void)ejecutaCancelacion:(CDVInvokedUrlCommand*)command;

- (void)limpiarMemoria:(CDVInvokedUrlCommand*)command;

- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command;

- (void)networkResponse:(CDVInvokedUrlCommand*)command;

@end
