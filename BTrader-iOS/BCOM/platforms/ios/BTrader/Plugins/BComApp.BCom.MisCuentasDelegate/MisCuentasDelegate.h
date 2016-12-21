//
//  MisCuentasDelegate.h
//  BCom
//
//  Created by Malaga on 02/10/14.
//
//

#import "NativeDelegate.h"

@interface MisCuentasDelegate : NativeDelegate

- (void)recuperaCuentasTDDPesos:(CDVInvokedUrlCommand*)command;

- (void)recuperaCuentasDolares:(CDVInvokedUrlCommand*)command;

- (void)recuperaCuentasTDCPesos:(CDVInvokedUrlCommand*)command;

@end
