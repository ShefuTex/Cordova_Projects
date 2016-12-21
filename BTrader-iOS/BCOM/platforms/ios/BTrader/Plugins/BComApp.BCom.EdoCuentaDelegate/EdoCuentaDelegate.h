//
//  EdoCuentaDelegate.h
//

#import "NativeDelegate.h"

@interface EdoCuentaDelegate : NativeDelegate


@property (nonatomic) NSString* urlPdfEstadoCuenta;
@property (nonatomic) NSString* nombreComprobanteEstadoCuenta;
@property (nonatomic) NSString* usuario;

- (void)recuperaCuentasTDDPesos:(CDVInvokedUrlCommand*)command;

- (void)recuperaCuentasDolares:(CDVInvokedUrlCommand*)command;

- (void)recuperaCuentasTDCPesos:(CDVInvokedUrlCommand*)command;

- (void)recuperaPeriodos:(CDVInvokedUrlCommand*)command;

- (void)recuperaDatosPDF:(CDVInvokedUrlCommand*)command;

- (void)GeneraPDF:(CDVInvokedUrlCommand*)command;

- (void)guardarImgPreviaRecortadE:(CDVInvokedUrlCommand*)command;

- (void)guardarImgPreviaE:(CDVInvokedUrlCommand*)command;

- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command;

- (void)networkResponse:(CDVInvokedUrlCommand*)command;

- (void)consultaEstadoDeCuenta:(CDVInvokedUrlCommand*)command;

- (void)comprobarFichero:(CDVInvokedUrlCommand*)command;

- (void)showConfirmationMessage:(CDVInvokedUrlCommand*)command;

- (void)showConfirmacionguardarComponentePDF:(CDVInvokedUrlCommand*)command ;


@end
