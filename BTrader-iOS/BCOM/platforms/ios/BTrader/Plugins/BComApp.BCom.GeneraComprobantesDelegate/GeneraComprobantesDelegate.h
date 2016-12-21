//
//  GeneraComprobantesDelegate.h
//

#import "NativeDelegate.h"

@interface GeneraComprobantesDelegate : NativeDelegate

- (void)recuperaCuentasTDDPesos:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaCuentasDolares:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaCuentasTDCPesos:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaPeriodos:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaOperaciones:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaOpcionesDispositivo:(CDVInvokedUrlCommand*)command;
    
- (void)guardarImgPreviaRecortadaC:(CDVInvokedUrlCommand*)command;
    
- (void)guardarImgPreviaC:(CDVInvokedUrlCommand*)command;
    
- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command;
    
- (void)networkResponse:(CDVInvokedUrlCommand*)command;
- (void)pngToPDF:(CDVInvokedUrlCommand*)command;

- (void) showAlert: (CDVInvokedUrlCommand*) command;

- (void) recuperaComprobantesGua: (CDVInvokedUrlCommand*) command;

- (void) getFullPath: (CDVInvokedUrlCommand*) command;

@end
