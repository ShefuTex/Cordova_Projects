//
//  PosicionGlobalDelegate.h
//  

#import "NativeDelegate.h"

@interface PosicionGlobalDelegate : NativeDelegate

@property (nonatomic, strong) NSString *usuario_usr;
@property (nonatomic, strong) NSString *acceso_usr;

- (void) updatePosicionGlobal: (CDVInvokedUrlCommand*) command;
- (void) getCuentasTraspasoEfectivo: (CDVInvokedUrlCommand*) command;

@end
