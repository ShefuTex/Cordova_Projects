//
//  CompraInvertirDelegate.h
//

//#import <Cordova/CDV.h>

#import "NativeDelegate.h"

@interface CompraInvertirDelegate : NativeDelegate


- (void)recuperaCuentaRetiro:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaContratosCuentasInv:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaInstrumentoInv:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaPlazos:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaInstrumentoPagoCap:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaInstrumentoPagoInt:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaDatosConsulta:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaDatosBarra:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaDatosOperaExitosa:(CDVInvokedUrlCommand*)command;
    
- (void)GeneraPDF:(CDVInvokedUrlCommand*)command;
    
- (void)guardarImgPreviaRecortadC:(CDVInvokedUrlCommand*)command;
    
- (void)guardarImgPreviaC:(CDVInvokedUrlCommand*)command;
    
- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command;
    
- (void)networkResponse:(CDVInvokedUrlCommand*)command;

- (void)muestraAlert:(CDVInvokedUrlCommand*)command;

- (void)muestraAlertDual:(CDVInvokedUrlCommand *)command;

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex;

- (void)aplicaCompra:(CDVInvokedUrlCommand*)command;

- (void)recuperaListaTitulos:(CDVInvokedUrlCommand *)command;

- (void)recuperaListaChequesCompra:(CDVInvokedUrlCommand *)command;

@end
