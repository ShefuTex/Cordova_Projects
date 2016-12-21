//
//  TokenViewController.h
//

#import "NativeDelegate.h"

@interface TokenViewController : NativeDelegate

@property (nonatomic, strong) NSString *acceso;
@property (nonatomic, strong) NSString *uri;
@property (nonatomic, strong) NSString *usuario;
@property (nonatomic, strong) NSString *sid_temp;
@property (nonatomic, strong) NSString *sid;
@property (nonatomic, strong) NSString *acceso_WT;
@property (nonatomic, strong) NSString *usuario_WT;
@property (nonatomic, strong) NSString *tipo_WT;

// - (void) asignarDatos:      (CDVInvokedUrlCommand*) command;
// - (void) leerDatos:         (CDVInvokedUrlCommand*) command;
// - (void) doNetworkResponse: (CDVInvokedUrlCommand*) command;

- (void) doNetworkOperation: (CDVInvokedUrlCommand*) command;

- (void) downloadBanksCatalog: (CDVInvokedUrlCommand*) command;

- (void) downloadBusinessRules: (CDVInvokedUrlCommand*) command;

- (void) wtConsultaTipoServicio: (CDVInvokedUrlCommand*) command;

- (void) wtConsultaContratosPatrimoniales: (CDVInvokedUrlCommand*) command;

- (void) wtconsultaPortafolio: (CDVInvokedUrlCommand*) command;

- (void) wtconsultarMKT: (CDVInvokedUrlCommand*) command;

- (void) wtDiaHabil: (CDVInvokedUrlCommand*) command;

@end