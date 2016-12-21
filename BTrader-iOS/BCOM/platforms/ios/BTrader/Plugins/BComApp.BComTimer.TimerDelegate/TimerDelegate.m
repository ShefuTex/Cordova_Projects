//
//  TimerDelegate.m
//

#import "TimerDelegate.h"
#import <Cordova/CDV.h>
#import "AppDelegate.h"

@implementation TimerDelegate

- (void)resetTimerInactividad:(CDVInvokedUrlCommand*)command
{
    _callbackInactividad = command.callbackId;
    
    AppDelegate *_appDelegate = [UIApplication sharedApplication].delegate;
    
    [_appDelegate resetInactividadTimer];
}

- (void)resetTimerOperacion:(CDVInvokedUrlCommand*)command
{
    _callbackOperacion = command.callbackId;
    
    BOOL isWebTrader = [[command.arguments objectAtIndex:0] boolValue];
    
    AppDelegate *_appDelegate = [UIApplication sharedApplication].delegate;
    
    [_appDelegate resetOperacionTimer:isWebTrader];
}

- (void) responseInactividad
{
    CDVPluginResult* result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: @"Reset Timer Inactividad"];
    
    [self.commandDelegate sendPluginResult: result callbackId: _callbackInactividad];
}

- (void) responseOperacion
{
    CDVPluginResult* result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: @"Reset Timer Operacion"];
    
    [self.commandDelegate sendPluginResult: result callbackId: _callbackOperacion];
}

// - (void)initTimer:(CDVInvokedUrlCommand*)command{}
// - (void)logout:(CDVInvokedUrlCommand*)command{}
// - (void)reinicioTimer:(CDVInvokedUrlCommand*)command{}

@end
