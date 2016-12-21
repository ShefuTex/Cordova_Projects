//
//  VentaInvertirDelegate.h
//  

#import "NativeDelegate.h"

@interface VentaInvertirDelegate : NativeDelegate

- (void)recuperaCuentaDeposito:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaContratosCuentasInv:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaDatosConsulta:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaDatosBarra:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaDatosOperaExitosa:(CDVInvokedUrlCommand*)command;
    
- (void)GeneraPDF:(CDVInvokedUrlCommand*)command;
    
- (void)guardarImgPreviaRecortadC:(CDVInvokedUrlCommand*)command;
    
- (void)guardarImgPreviaC:(CDVInvokedUrlCommand*)command;
    
- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command;
    
- (void)networkResponse:(CDVInvokedUrlCommand*)command;

- (void)aplicaVenta:(CDVInvokedUrlCommand*)command;
- (void)recuperaListaTitulos:(CDVInvokedUrlCommand*)command;

@end
