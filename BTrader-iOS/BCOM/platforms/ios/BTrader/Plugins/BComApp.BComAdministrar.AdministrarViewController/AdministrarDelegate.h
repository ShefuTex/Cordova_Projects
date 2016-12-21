//
//  AdministrarDelegate.h
//

#import <Cordova/CDV.h>

@interface AdministrarDelegate : CDVPlugin<UIAlertViewDelegate>

- (void)doComprobantes:(CDVInvokedUrlCommand*)command;

- (void)doComprobantesInivitados:(CDVInvokedUrlCommand*)command;

- (void)ejecutaBorrado:(CDVInvokedUrlCommand*)command;

- (void)ejecutaBorradoInivitados:(CDVInvokedUrlCommand*)command;

- (void)muestraAlerta:(CDVInvokedUrlCommand*)command;

- (void)muestraAlertaCierre:(NSString*)msg;

//- (void) borrarCarpetaAdmin:(CDVInvokedUrlCommand*)command;

@end