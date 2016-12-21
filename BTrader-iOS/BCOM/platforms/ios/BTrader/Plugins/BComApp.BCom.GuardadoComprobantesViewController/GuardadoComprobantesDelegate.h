//
//  GuardadoComprobantesDelegate.h
//  

#import "NativeDelegate.h"

@interface GuardadoComprobantesDelegate : NativeDelegate

- (void)recuperaEdosCuenta:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaComprobantes:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaImgComprobantes:(CDVInvokedUrlCommand*)command;
    
- (void)recuperaImgEdosCuenta:(CDVInvokedUrlCommand*)command;

- (void)savePDFWithNameAndFromUrl:(CDVInvokedUrlCommand*)command;

- (void)saveImageFromBase64:(CDVInvokedUrlCommand*)command;

@end
