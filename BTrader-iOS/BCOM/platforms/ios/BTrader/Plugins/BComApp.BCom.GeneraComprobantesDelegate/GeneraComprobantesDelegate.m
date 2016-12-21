//
//  GeneraComprobantesDelegate.m
//

#import "GeneraComprobantesDelegate.h"
#import <Cordova/CDV.h>
#import "PersistenceFilesPathsProvider.h"


@implementation GeneraComprobantesDelegate

- (void)recuperaCuentasTDDPesos:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GeneraComprobantesDelegate-recuperaCuentasTDDPesos"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaCuentasDolares:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GeneraComprobantesDelegate-recuperaCuentasDolares"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaCuentasTDCPesos:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GeneraComprobantesDelegate-recuperaCuentasTDCPesos"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaPeriodos:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GeneraComprobantesDelegate-recuperaPeriodos"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) recuperaOperaciones:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *usuario = [objeto valueForKey:@"usuario"];
	NSString *idPeriodo  = [objeto valueForKey:@"idPeriodo"];
	NSString *tipoOperacion  = [objeto valueForKey:@"tipFunc"];
	NSString *claveOperaciones  = [objeto valueForKey:@"claveOperaciones"];
	NSString *otp  = [objeto valueForKey:@"OTP"];
	NSString *tipoEjecucion  = [objeto valueForKey:@"tipoEjecucion"];

    [self.httpInvoker recuperaOperaciones: usuario acceso: acceso idPeriodo:idPeriodo tipoOperacion:tipoOperacion claveOperaciones:claveOperaciones otp:otp tipoEjecucion:tipoEjecucion forClient: self];
    
}

- (NSData *) convertImageToPDF: (UIImage *) image {
    
    double pageWidth = image.size.width * image.scale * 72 / 96;
    double pageHeight = image.size.height * image.scale * 72 / 96;
    
    NSMutableData *pdfFile = [[NSMutableData alloc] init];
    CGDataConsumerRef pdfConsumer = CGDataConsumerCreateWithCFData((CFMutableDataRef)pdfFile);
   
    CGRect mediaBox = CGRectMake(0,0, pageWidth, pageHeight);
    CGContextRef pdfContext = CGPDFContextCreate(pdfConsumer, &mediaBox, NULL);
    
    CGContextBeginPage(pdfContext, &mediaBox);
    switch (image.imageOrientation) {
        case UIImageOrientationDown:
            CGContextTranslateCTM(pdfContext, pageWidth, pageHeight);
            CGContextScaleCTM(pdfContext, -1, -1);
            break;
            
        case UIImageOrientationLeft:
            mediaBox.size.width = pageHeight;
            mediaBox.size.height = pageWidth;
            CGContextTranslateCTM(pdfContext, pageWidth, 0);
            CGContextRotateCTM(pdfContext, M_PI / 2);
            break;
            
        case UIImageOrientationRight:
            mediaBox.size.width = pageHeight;
            mediaBox.size.height = pageWidth;
            CGContextTranslateCTM(pdfContext, 0, pageHeight);
            CGContextRotateCTM(pdfContext, -M_PI / 2);
            break;
            
        case UIImageOrientationUp:
            default:
            break;
            
    }
    CGContextDrawImage(pdfContext, mediaBox, [image CGImage]);
    CGContextEndPage(pdfContext);
    CGContextRelease(pdfContext);
    CGDataConsumerRelease(pdfConsumer);
    return pdfFile;
}


- (void)pngToPDF:(CDVInvokedUrlCommand*)command {
   
    NSString * pngName = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    NSString *resourceBCOMPath;
    
    NSString * directorioUser =[[Session getInstance] numeroDelUsuario];
    NSString * directorioAdmin = [[Session getInstance] usuarioAdmin];
    
    NSString *pngLocalPath;
    
    
    
    
    NSFileManager* fileManager = [NSFileManager defaultManager];
    
    NSString* resourceDocPath = [PersistenceFilesPathsProvider getDocumentsDirPath];
    

    
    
          if(!self.appDelegate.esInvitado){
              
                resourceBCOMPath = [resourceDocPath stringByAppendingPathComponent:[NSString stringWithFormat:@"BCOM/%@",directorioUser]];
              
                  pngLocalPath = [resourceDocPath stringByAppendingPathComponent:[NSString stringWithFormat:@"BCOM/%@/%@",directorioUser,pngName]];
          
          }else {
              
              resourceBCOMPath = [resourceDocPath stringByAppendingPathComponent:[NSString stringWithFormat:@"BCOM/%@/Invitados/%@",directorioAdmin,directorioUser]];
              
                  pngLocalPath = [resourceDocPath stringByAppendingPathComponent:[NSString stringWithFormat:@"BCOM/%@/Invitados/%@/%@",directorioAdmin,directorioUser,pngName]];
          
          }
    
    NSLog(@"ruta completa para guardar el pdf %@ y el path del png esta en %@",resourceBCOMPath,pngLocalPath);


 
    BOOL esDirectorio=TRUE;

    
   bool existe= [fileManager fileExistsAtPath:resourceBCOMPath isDirectory:&esDirectorio];
    
    
    NSLog((existe)?@"existe el directorio para guardar el comprobante en pdf:TRUE":@"existe el directorio para guardar el comprobante en pdf:FALSE");

    
    
    bool existe2= [fileManager fileExistsAtPath:resourceBCOMPath isDirectory:FALSE];

    
      NSLog((existe2)?@"existe el archivo png para guardar el comprobante en pdf:TRUE":@"existe el archivo png para guardar el comprobante en pdf:FALSE");
    

    UIImage* image = [UIImage imageWithContentsOfFile:pngLocalPath];
   
    NSData *data = [self convertImageToPDF:image];
    
    NSString* pdfFileName = [NSString stringWithFormat:@"%@.pdf",[[pngName lastPathComponent] stringByDeletingPathExtension]];
    
    NSLog(@"nombre del pdf a guardar %@",pdfFileName);

    
    NSString *pdfPNGPath = [resourceBCOMPath stringByAppendingPathComponent:pdfFileName];
    
    NSLog(@"ruta completa para guardar el pdf con el archivo %@",pdfPNGPath);

    
    [data writeToFile:pdfPNGPath atomically:YES];
    
    NSLog(@"despues del guardado del pdf %@",data);

 
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GeneraComprobantesDelegate-pngToPDF"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];


}


- (void)recuperaOpcionesDispositivo:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GeneraComprobantesDelegate-recuperaOpcionesDispositivo"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)guardarImgPreviaRecortadaC:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GeneraComprobantesDelegate-guardarImgPreviaRecortadaC"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)guardarImgPreviaC:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GeneraComprobantesDelegate-guardarImgPreviaC"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GeneraComprobantesDelegate-doNetworkOperation"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)networkResponse:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"GeneraComprobantesDelegate-networkResponse"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) showAlert:(CDVInvokedUrlCommand *) command
{
    NSString *tittle  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *message = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 1] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *button  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 2] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: tittle message: message delegate: self cancelButtonTitle: button otherButtonTitles: nil];
    
    [alertView show];
}

- (void) alertView: (UIAlertView *) alertView clickedButtonAtIndex: (NSInteger) buttonIndex
{
    if (buttonIndex == 0) { [ self.webView stringByEvaluatingJavaScriptFromString:@"cancelarAprobacion()" ]; }
}

- (void) analyzeServerResponse:(ServerResponse *)aServerResponse
{
    [super analyzeServerResponse: aServerResponse];
    
    Respuesta *respuesta = aServerResponse.responseHandler;
    
    if (respuesta.isCorrect) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: respuesta.jsonResponse];
        [self.appDelegate stopIndicatorActivity];
        [self.commandDelegate sendPluginResult: pluginResult callbackId: self.callbackId];
    } else {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: respuesta.jsonResponse];
        [self.appDelegate stopIndicatorActivity];
        [self.commandDelegate sendPluginResult: pluginResult callbackId: self.callbackId];
    }
}

- (void) recuperaComprobantesGua: (CDVInvokedUrlCommand*) command
{
//    NSString *folderName = [NSString stringWithUTF8String:[[command.arguments objectAtIndex:0] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *callbackComprobantesGuardados = command.callbackId;
    
    NSString *stringPath;
    
    if (!self.appDelegate.esInvitado) {
        stringPath = [ NSString stringWithFormat:@"BCOM/%@", [[Session getInstance] usuarioAdmin]];
    } else {
        stringPath = [NSString stringWithFormat:@"BCOM/%@/Invitados/%@", [[Session getInstance] usuarioAdmin],[[Session getInstance] numeroDelUsuario]];
    }
    
   // NSLog(@"path  en metodo recuperaComprobantesGua para buscar los comprobantes guardados %@",stringPath);
    
    
    
    NSFileManager* fileManager = [NSFileManager defaultManager];
    
    NSString* resourceDocPath = [PersistenceFilesPathsProvider getDocumentsDirPath];
    

    
    NSString *localFilesPath = [resourceDocPath stringByAppendingPathComponent:stringPath];
    
    
    NSLog(@"ruta completa en metodo recuperaComprobantesGua para buscar los comprobantes guardados %@",localFilesPath);

    
   // NSFileManager *fileManager = [ NSFileManager defaultManager ];
    
    NSError *error;
    
    NSArray *listaArchivos = [ fileManager contentsOfDirectoryAtPath: localFilesPath error:&error ];
    
    NSLog(@"el error es  %@",error);

    NSLog(@"lista de archivos recuperados en la ruta  %@",listaArchivos);

    
    
    CDVPluginResult* pluginResult;
    
    if (listaArchivos.count > 0) {
        pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsArray: listaArchivos];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"listaArchivos.count = 0"];
    }
    
    [ self.commandDelegate sendPluginResult: pluginResult callbackId:callbackComprobantesGuardados ];
}

- (void) getFullPath: (CDVInvokedUrlCommand*) command
{
    NSString *stringPath;
    
    if (!self.appDelegate.esInvitado) {
        stringPath = [ NSString stringWithFormat:@"BCOM/%@", [[Session getInstance] usuarioAdmin]];
    } else {
        stringPath = [NSString stringWithFormat:@"BCOM/%@/Invitados/%@", [[Session getInstance] usuarioAdmin],[[Session getInstance] numeroDelUsuario]];
    }
    
    
    //NSFileManager* fileManager = [NSFileManager defaultManager];
    
    NSString* resourceDocPath = [PersistenceFilesPathsProvider getDocumentsDirPath];
    
    
    NSString *localFilesPath = [resourceDocPath stringByAppendingPathComponent:stringPath];
    
    NSLog(@"ruta completa en getFullPath para buscar los comprobantes guardados %@",localFilesPath);


    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: localFilesPath];
    [ self.commandDelegate sendPluginResult: pluginResult callbackId:command.callbackId ];
}

@end
