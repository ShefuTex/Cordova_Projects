//
//  TransferirDelegate.h
//

//#import <Cordova/CDV.h>

#import "NativeDelegate.h"

@interface TransferirDelegate : NativeDelegate

- (void)recuperaCuentasTarRetiro:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaCuentasTarDeposito:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaCuentasTarFrecBBVA:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaCuentasTarFrecOBan:(CDVInvokedUrlCommand*)command;
    
- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command;
    
- (void)networkResponse:(CDVInvokedUrlCommand*)command;
    
- (void)GeneraPDF:(CDVInvokedUrlCommand*)command;
    
- (void)guardarImgPreviaRecortadC:(CDVInvokedUrlCommand*)command;
    
- (void)guardarImgPreviaC:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaPagos:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaSaldos:(CDVInvokedUrlCommand*)command;
    
- (void)ejecutaGuardaCuentaNueva:(CDVInvokedUrlCommand*)command;

- (void)pagoMinimoNoInteres:(CDVInvokedUrlCommand*)command;

- (void)solicitaComision:(CDVInvokedUrlCommand*)command;

- (void)recuperaListasFrecuentes:(CDVInvokedUrlCommand*)command;

- (void)recuperaListasFrecuentesInterbancaria:(CDVInvokedUrlCommand*)command;

- (void)recuperaListasPreregistradas:(CDVInvokedUrlCommand*)command;

- (void)recuperaListasPreregistradasInterbancaria:(CDVInvokedUrlCommand*)command;

- (void)realizarTraspaso:(CDVInvokedUrlCommand*)command;

- (void)realizarTraspasoInterbancaria3:(CDVInvokedUrlCommand*)command;

- (void)realizarTraspasoInterbancaria3TDC:(CDVInvokedUrlCommand*)command;

- (void)realizarTraspasoInterbancaria3TDCFrecuente:(CDVInvokedUrlCommand*)command;

- (void)consultaBeneficiario:(CDVInvokedUrlCommand*)command;

- (void)cargaPreregistro:(CDVInvokedUrlCommand*)command;

- (void)getServerMode:(CDVInvokedUrlCommand*)command;


- (void)cargaPreregistroInterbancaria:(CDVInvokedUrlCommand*)command;



- (void) preregistrarCuenta:(CDVInvokedUrlCommand*)command;

- (void) preregistrarCuentaInterbancarias:(CDVInvokedUrlCommand*)command;



- (void)permitirFrecuentes:(CDVInvokedUrlCommand*)command;

- (void)envioEmail:(CDVInvokedUrlCommand*)command;

- (void)recuperaFestivos:(CDVInvokedUrlCommand*)command;

@end
