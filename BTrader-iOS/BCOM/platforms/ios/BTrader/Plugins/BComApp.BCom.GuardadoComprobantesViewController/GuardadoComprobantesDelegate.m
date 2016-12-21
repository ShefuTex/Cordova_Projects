//
//  GuardadoComprobantesDelegate.m
//

#import "GuardadoComprobantesDelegate.h"
#import <Cordova/CDV.h>
#import "PersistenceFilesPathsProvider.h"

@implementation GuardadoComprobantesDelegate

- (void)recuperaEdosCuenta:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GuardadoComprobantesDelegate-recuperaEdosCuenta"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaComprobantes:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GuardadoComprobantesDelegate-recuperaComprobantes"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaImgComprobantes:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GuardadoComprobantesDelegate-recuperaImgComprobantes"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaImgEdosCuenta:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GuardadoComprobantesDelegate-recuperaImgEdosCuenta"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)savePDFWithNameAndFromUrl:(CDVInvokedUrlCommand*)command
{
    NSString * pdfName = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    NSString *urlPdf = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 1] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    NSString *directorio = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 2] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    // Get the PDF Data from the url in a NSData Object
    NSData *pdfData = [[NSData alloc] initWithContentsOfURL:[
                                                             NSURL URLWithString:urlPdf]];
    
    
    // Store the Data locally as PDF File

    NSString* resourceDocPath = [PersistenceFilesPathsProvider getDocumentsDirPath];

                                 
     NSString *localPdfPath = [resourceDocPath stringByAppendingPathComponent:directorio];
    
    
    
    NSError *error;
    
    [[NSFileManager defaultManager] createDirectoryAtPath:localPdfPath
                                   withIntermediateDirectories:YES
                                                    attributes:nil
                                                    error:&error];
    
    if (error){
        
        NSLog(@"error en crear el directorio para guardar el pdf temporal para el visor pdf:%@",error);
        
    } else {
        NSLog(@"se crea el directorio para guardar el pdf temporal para el visor pdf: %@",localPdfPath);
        
        
    }

    
    
    NSString *localPdfFullPath = [localPdfPath
                          stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.pdf",pdfName]];
    
    [[NSFileManager defaultManager] removeItemAtPath:localPdfFullPath error:&error];
    
    BOOL pdfCreado = [pdfData writeToFile:localPdfFullPath atomically:YES];
    BOOL pdfFileExiste = [[NSFileManager defaultManager] fileExistsAtPath: localPdfFullPath];
   
    CDVPluginResult* pluginResult;
    if(pdfCreado && pdfFileExiste){
        
       pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:localPdfFullPath];
        
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"GuardadoComprobantesDelegate-savePDFWithNameAndFromUrl con error"];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
    
   
}



- (void)saveImageFromBase64:(CDVInvokedUrlCommand*)command
{
    
    //se borra la cache para que elimine referencias a imagenes antiguas con el mismo nombre en el navegador
    [[NSURLCache sharedURLCache] removeAllCachedResponses];


    
  //   [localName, imageSource, directorio]
    
    NSString *localName = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    NSString *base64String = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 1] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    NSString *directorio = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 2] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    // Get the image Data from the base64 code NSData Object
    NSData *dataImage = [[NSData alloc ]initWithBase64EncodedString:base64String options:NSDataBase64DecodingIgnoreUnknownCharacters];
    
    NSString *usuarioLogueado;
    NSString *usuarioAdmin;
    
    if(self.appDelegate.esInvitado){
        usuarioAdmin= [[Session getInstance] usuarioAdmin];
        usuarioLogueado = [[Session getInstance] numeroDelUsuario];
        directorio=[NSString stringWithFormat:@"%@/%@/Invitados/%@",directorio,usuarioAdmin,usuarioLogueado];
        
      //  NSString *usuarioAdmin= _username;
    }else {
        
        usuarioAdmin= [[Session getInstance] usuarioAdmin];
       // usuarioLogueado = [[Session getInstance] numeroDelUsuario];
        directorio=[NSString stringWithFormat:@"%@/%@",directorio,usuarioAdmin];
    
    }
    

    
    
    
    NSFileManager* fileManager = [NSFileManager defaultManager];
    
    NSString* resourceDocPath = [[PersistenceFilesPathsProvider getDocumentsDirPath] stringByAppendingPathComponent: [NSString stringWithFormat:@"%@",directorio]];
    
        NSError *error;
    
    if ([fileManager fileExistsAtPath: resourceDocPath] == NO)
    {
        [fileManager createDirectoryAtPath: resourceDocPath withIntermediateDirectories: YES attributes: nil error: &error];
    }
    
    
    if (error){
        
        NSLog(@"error en crear el directorio para guardar el png%@",error);
        
    } else {
        NSLog(@"se crea el directorio para guardar el png en %@",resourceDocPath);
        
        
    }
    
      BOOL esDirectorio=TRUE;
     
     
     bool existe= [fileManager fileExistsAtPath:resourceDocPath isDirectory:&esDirectorio];
     
     
     NSLog((existe)?@"existe el directorio raiz:TRUE":@"existe el directorio raiz:FALSE");
     
    
    
    
    
    

  
    NSString *localPngPath = [resourceDocPath
                              stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.png",localName]];
    
    
    
    
    
    
    
    
//    [[NSFileManager defaultManager] removeItemAtPath:localPngPath error:&error];
    
    [dataImage writeToFile:localPngPath atomically:YES];
    
        NSLog(@"despues del guardado del png %@",dataImage);
    
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GuardadoComprobantesDelegate-saveImageFromBase64"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}




@end
