//
//  ConsultaInvertirDelegate.h
//

//#import <Cordova/CDV.h>

#import "NativeDelegate.h"

@interface ConsultaInvertirDelegate : NativeDelegate

- (void)recuperaInstrumentoInv:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaPlazos:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaDatosConsulta:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaDatosBarra:(CDVInvokedUrlCommand*)command;
    
- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command;
    
- (void)networkResponse:(CDVInvokedUrlCommand*)command;

- (void)recuperaTasas:(CDVInvokedUrlCommand*)command;

@end
