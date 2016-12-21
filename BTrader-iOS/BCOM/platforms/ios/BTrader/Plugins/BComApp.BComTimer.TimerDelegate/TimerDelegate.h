//
//  TimerDelegate.h
//

#import <Cordova/CDV.h>

@interface TimerDelegate : CDVPlugin

@property (nonatomic, strong) NSString* callbackInactividad;
@property (nonatomic, strong) NSString* callbackOperacion;
@property (nonatomic, strong) NSString* callbackDoKeepAlive;
@property (nonatomic, strong) NSString* callbackStopDoKeepAlive;;

- (void) resetTimerInactividad: (CDVInvokedUrlCommand*) command;

- (void) resetTimerOperacion: (CDVInvokedUrlCommand*) command;

- (void) responseInactividad;

- (void) responseOperacion;

// - (void)initTimer:(CDVInvokedUrlCommand*)command;
// - (void)logout:(CDVInvokedUrlCommand*)command;
// - (void)reinicioTimer:(CDVInvokedUrlCommand*)command;

@end
