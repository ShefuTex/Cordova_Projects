//
//  AdministrarDelegate.m
//

#import "AdministrarDelegate.h"
#import <objc/runtime.h>
#import <Cordova/CDV.h>

@implementation AdministrarDelegate
{
    CDVInvokedUrlCommand *commandG;
}

- (void)doComprobantes:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"AdministrarDelegate-doComprobantes"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)doComprobantesInivitados:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"AdministrarDelegate-doComprobantesInivitados"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)ejecutaBorrado:(CDVInvokedUrlCommand*)command
{   NSString * directorio = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSLog(@"Ejecutando borrado completo ----------%@", directorio);
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"AdministrarDelegate-ejecutaBorrado"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)ejecutaBorradoInivitados:(CDVInvokedUrlCommand*)command
{
    NSString * directorio = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSLog(@"Ejecutando borrado Invitados-------- %@", directorio);

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"AdministrarDelegate-muestraAlerta"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
    
}
NSString * directorio = nil;
NSString * tipoBorrado = nil;
- (void)muestraAlerta:(CDVInvokedUrlCommand*)command
{
    NSString * msgTxt = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    directorio = [NSString stringWithFormat:@"%@",[command.arguments objectAtIndex: 1]];
    tipoBorrado = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 2] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *basePath = ([paths count] > 0) ? [paths objectAtIndex:0] : nil;
    NSLog(@"%@", basePath);
    
    NSFileManager *fm = [NSFileManager defaultManager];
    NSString *directory = [basePath stringByAppendingPathComponent:@"/BCOM"];
    NSError *error = nil;
    
    if([tipoBorrado isEqualToString:@"1"]){
        directory = [directory stringByAppendingPathComponent:directorio];
    }
    if([[fm contentsOfDirectoryAtPath:directory error:&error] count] > 0){
        
        UIAlertView* alertView = [[UIAlertView alloc] initWithTitle:@"Confirmación" message:msgTxt delegate:self cancelButtonTitle:@"Cancelar" otherButtonTitles:nil];
        
        [alertView addButtonWithTitle:@"Aceptar"];
        // objc_setAssociatedObject(alertView, &directorio, @"1", OBJC_ASSOCIATION_RETAIN);
        [alertView show];
    
    } else {
        NSLog(@"NO HAY COMPROBANTES--------------------------------");
         UIAlertView* alertView2 = [[UIAlertView alloc] initWithTitle:@"Aviso\n" message:@"No existe información a eliminar" delegate:nil cancelButtonTitle:@"Aceptar" otherButtonTitles:nil];
        [alertView2 show];
    }
    
    
    
    commandG=command;
    
}

- (void)muestraAlertaCierre:(NSString *)msg
{
   // NSString * errMsg = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
   // UIAlertView* alertViewCierre = [[UIAlertView alloc] initWithTitle:@"Aviso" message:msg delegate:[self alertViewCierre] cancelButtonTitle:@"Aceptar" otherButtonTitles:nil];
  //  [alertViewCierre show];
}

- (void)alertViewCierre:(UIAlertView *)alertViewCierre clickedButtonAtIndex:(NSInteger)buttonIndex
{
    
    NSLog(@"Cerrando session");
    
}


- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    CDVPluginResult* pluginResult;
    if(buttonIndex == 0){
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:nil];
    } else {
        if(directorio != nil){
            NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
            NSString *basePath = ([paths count] > 0) ? [paths objectAtIndex:0] : nil;
            NSLog(@"%@", basePath);
            
            NSFileManager *fm = [NSFileManager defaultManager];
            NSString *directory = [basePath stringByAppendingPathComponent:@"/BCOM"];
            NSError *error = nil;
            if([tipoBorrado isEqualToString:@"0"]){
              
                
                for (NSString *file in [fm contentsOfDirectoryAtPath:directory error:&error]) {
                    NSString *pathFile = [NSString stringWithFormat:@"%@/%@", directory, file];
                    BOOL success = [fm removeItemAtPath:pathFile error:&error];
                   /* if (!success || error) {
                        NSLog(@"error en el borrado %@, razon: %@", directory, error);
                    }
*/
                }
                NSString *datosAdmin = [basePath stringByAppendingPathComponent:@"/Comprobantes"];
                BOOL success2 = [fm removeItemAtPath:datosAdmin error:&error];
            
            } else if([tipoBorrado isEqualToString:@"1"]){
            directory = [directory stringByAppendingPathComponent:directorio];
            BOOL success = [fm removeItemAtPath:directory error:&error];
            } else if([tipoBorrado isEqualToString:@"2"]){
                
                for (NSString *file in [fm contentsOfDirectoryAtPath:directory error:&error]) {
                    if(![file isEqualToString:directorio]){
                    NSString *pathFile = [NSString stringWithFormat:@"%@/%@", directory, file];
                    BOOL success = [fm removeItemAtPath:pathFile error:&error];
                        if (!success || error) {
                            NSLog(@"error en el borrado %@, razon: %@", directory, error);
                        }
                    }
                }
            }
            
            
        
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:nil];
        }
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:commandG.callbackId];
    
}
/*
- (void) borrarCarpetaAdmin:(CDVInvokedUrlCommand*)command{
    NSLog(@"Borrando la carpeta de admin");
    NSString * numAdmin = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *basePath = ([paths count] > 0) ? [paths objectAtIndex:0] : nil;
    NSLog(@"%@", basePath);
    
    NSFileManager *fm = [NSFileManager defaultManager];
    NSString *directory = [[basePath stringByAppendingPathComponent:@"/BCOM"] stringByAppendingPathComponent:numAdmin];
    
    
}*/
@end