//
//  LoginDelegate.h
//

#import "NativeDelegate.h"

@interface LoginDelegate : NativeDelegate<UIAlertViewDelegate>

@property (nonatomic, strong) NSString *usuario_usr;
@property (nonatomic, strong) NSString *acceso_usr;
@property (nonatomic, strong) NSString *acceso_WT;
@property (nonatomic, strong) NSString *usuario_WT;
@property (nonatomic, strong) NSString *tipo_WT;
@property (nonatomic, strong) NSString *tarjeta;
@property (nonatomic, strong) NSString *password;
@property (nonatomic, strong) NSString *callbackLogoutWas;
@property (nonatomic, strong) NSString *callbackLogoutWebSeal;
@property (nonatomic, strong) NSString *callbackLogoutHost;
@property (nonatomic, strong) NSString *callbackLoginWas;
@property (nonatomic, strong) NSString *callbackLoginWebSeal;
@property (nonatomic, strong) CDVInvokedUrlCommand *cdvLogoutWas;
@property (nonatomic, strong) CDVInvokedUrlCommand *cdvLoginWas;

// - (void) doNetworkResponse:        (CDVInvokedUrlCommand*) command;
// - (void) seleccionAutoSeguro:      (CDVInvokedUrlCommand*) command;
// - (void) seleccionBEstratega:      (CDVInvokedUrlCommand*) command;
// - (void) seleccionGeoLocalizacion: (CDVInvokedUrlCommand*) command;
// - (void) limpiarMemoria:           (CDVInvokedUrlCommand*) command;

- (void) doNetworkOperation: (CDVInvokedUrlCommand*) command;

- (void) seleccionDesbloquear: (CDVInvokedUrlCommand*) command;

- (void) consultaDatosGuardados: (CDVInvokedUrlCommand*) command;

- (void) showAlert: (CDVInvokedUrlCommand*) command;

- (void) logout: (CDVInvokedUrlCommand*) command;

//- (void) wtConsultaContratosPatrimoniales: (CDVInvokedUrlCommand*) command;
- (void) wtrealizaCompraVenta: (CDVInvokedUrlCommand*) command;
- (void) versionServidor: (CDVInvokedUrlCommand*) command;
- (void) wtconsultaDetalleInversion: (CDVInvokedUrlCommand*) command;
- (void) wtconsultaCapitales: (CDVInvokedUrlCommand*) command;
- (void) wtcancelaOrden: (CDVInvokedUrlCommand*) command;
//- (void) doKeep:(CDVInvokedUrlCommand *)command;
- (void) wtdetalleOrden: (CDVInvokedUrlCommand*) command;
- (void) wtaperturaFichero:(CDVInvokedUrlCommand *)command;
- (void) wtenvioEmail:(CDVInvokedUrlCommand*)command;
- (void) wtListaCuentas:(CDVInvokedUrlCommand*)command;
- (void) wtaplicaTraspaso:(CDVInvokedUrlCommand*)command;
- (void) closeSession;
- (void) doKeepAlive;
///- (void) wtReglasValor;
- (void) wtLogout:(CDVInvokedUrlCommand*)command;

- (void) closeSessionWas: (CDVInvokedUrlCommand*) command;

- (void) closeSessionWebSeal: (CDVInvokedUrlCommand*) command;

- (void) closeSessionHost: (CDVInvokedUrlCommand*) command;

- (void) saveKeys: (NSString*) json;

- (void) loginWebSeal: (CDVInvokedUrlCommand*) command;

- (void) loginWas: (CDVInvokedUrlCommand*) command;

-(void) cancelaTituloInv: (CDVInvokedUrlCommand*) command;

-(void) envioEmailInterbancario: (CDVInvokedUrlCommand*) command;

-(void) diaHabil: (CDVInvokedUrlCommand*) command;

@end
