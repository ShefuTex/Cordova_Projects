//
//  EdoCuentaDelegate.m
//

#import "EdoCuentaDelegate.h"

#import "PersistenceFilesPathsProvider.h"


@implementation EdoCuentaDelegate

- (void)recuperaCuentasTDDPesos:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"EdoCuentaDelegate-recuperaCuentasTDDPesos"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaCuentasDolares:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"EdoCuentaDelegate-recuperaCuentasDolares"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaCuentasTDCPesos:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"EdoCuentaDelegate-recuperaCuentasTDCPesos"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)recuperaDatosPDF:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"EdoCuentaDelegate-recuperaDatosPDF"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)GeneraPDF:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"EdoCuentaDelegate-GeneraPDF"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)guardarImgPreviaRecortadE:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"EdoCuentaDelegate-guardarImgPreviaRecortadE"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)guardarImgPreviaE:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"EdoCuentaDelegate-guardarImgPreviaE"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}



- (void) comprobarFichero:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 0];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
	NSString *usuario = [objeto valueForKey:@"usuario"];
    NSString *directorio  = [objeto valueForKey:@"directorio"];
	NSString *archivo = [objeto valueForKey:@"archivo"];
    NSString *extension = [objeto valueForKey:@"extension"];
    
    
   // [self.httpInvoker comprobarFichero: usuario acceso: acceso directorio: (NSString*)  directorio  archivo: (NSString*) archivo  extension: (NSString*) extension  forClient: self];
    

}



- (void)doNetworkOperation:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"EdoCuentaDelegate-doNetworkOperation"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)networkResponse:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"EdoCuentaDelegate-networkResponse"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) recuperaPeriodos:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation: command];
    
    NSObject *objeto = [self.argumentos objectAtIndex: 2];
    
    NSString *acceso  = [objeto valueForKey:@"acceso"];
    NSString *ident  = [objeto valueForKey:@"id"];
    NSString *usuario = [objeto valueForKey:@"usuario"];

    [self.httpInvoker recuperaPeriodos: usuario acceso: acceso ident:ident forClient: self];
    
}

- (void)consultaEstadoDeCuenta:(CDVInvokedUrlCommand*)command
{
    [super doNetworkOperation: command];  
    
    NSLog(@"consultaEstadoDeCuenta ");
    
    NSObject *objeto = [self.argumentos objectAtIndex: 2];

    NSString *usuario = [objeto valueForKey:@"usuario"];
    NSString *acceso  = [NSString stringWithFormat:@"%@",[objeto valueForKey:@"acceso"]];
    NSString *numero  = [objeto valueForKey:@"numero"];
    NSString *producto  = [objeto valueForKey:@"producto"];
    NSString *formato  = [objeto valueForKey:@"formato"];
    NSString *anio  = [NSString stringWithFormat:@"%@",[objeto valueForKey:@"anio"]];
    NSString *mes  = [NSString stringWithFormat:@"%@",[objeto valueForKey:@"mes"]];
    NSString *claveOperaciones  = [objeto valueForKey:@"claveOperaciones"];
    NSString *OTP  = [objeto valueForKey:@"OTP"];
    NSString *posicionTASA  = [objeto valueForKey:@"posicionTASA"];
    NSString *valorPosicionTASA  = [objeto valueForKey:@"valorPosicionTASA"];
    NSString *digitoVerficador  = [objeto valueForKey:@"digitoVerficador"];
    NSString *valorDigitoVerficador  = [objeto valueForKey:@"valorDigitoVerficador"];
    
    [self.httpInvoker consultaEstadoDeCuenta: usuario acceso: acceso numero:numero producto:producto formato:formato anio:anio mes:mes claveOperaciones:claveOperaciones OTP:OTP posicionTASA:posicionTASA valorPosicionTASA:valorPosicionTASA digitoVerficador:digitoVerficador valorDigitoVerficador:valorDigitoVerficador forClient: self];
    
}

- (void)showConfirmationMessage:(CDVInvokedUrlCommand*)command {
    
  
    
    NSString *titulo  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *message = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 1] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *buttonOkTxt  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 2] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *buttonNoTxt  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 3] cStringUsingEncoding: NSUTF8StringEncoding]];
    _usuario  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 4] cStringUsingEncoding: NSUTF8StringEncoding]];
    _urlPdfEstadoCuenta  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 5] cStringUsingEncoding: NSUTF8StringEncoding]];
    _nombreComprobanteEstadoCuenta  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 6] cStringUsingEncoding: NSUTF8StringEncoding]];

    
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: titulo message: message delegate: self
                                              cancelButtonTitle: buttonNoTxt otherButtonTitles: buttonOkTxt, nil];
    
    [alertView show];

}


- (void)showConfirmacionguardarComponentePDF:(CDVInvokedUrlCommand*)command {
    
    NSString *titulo  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 0] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *message = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 1] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *buttonOkTxt  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 2] cStringUsingEncoding: NSUTF8StringEncoding]];
    NSString *buttonNoTxt  = [NSString stringWithUTF8String: [[command.arguments objectAtIndex: 3] cStringUsingEncoding: NSUTF8StringEncoding]];
    
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: titulo message: message delegate: self
                                              cancelButtonTitle: buttonNoTxt otherButtonTitles: buttonOkTxt, nil];
    
    [alertView show];
    
}

- (BOOL)savePDFFromUrl:(NSString*)urlPdf andName:(NSString*)pdfName AndInPath:(NSString*)directorio{



// Get the PDF Data from the url in a NSData Object
NSData *pdfData = [[NSData alloc] initWithContentsOfURL:[NSURL URLWithString:urlPdf]];

    
    

    
    NSString* localDirectoryPath = [[PersistenceFilesPathsProvider getDocumentsDirPath] stringByAppendingPathComponent:[NSString stringWithFormat:@"%@",directorio]];
    
    
    NSLog(@"ruta para para guardar el pdf de estado de cuenta %@",localDirectoryPath);

    
    
    
    
    
NSError *error;

[[NSFileManager defaultManager] createDirectoryAtPath:localDirectoryPath
                          withIntermediateDirectories:YES
                                           attributes:nil
                                                error:&error];
    
    if (error){
        
        NSLog(@"error en crear el directorio para guardar el pdf de estado de cuenta:%@",error);
        
    } else {
        NSLog(@"se crea el directorio para guardar el pdf en: %@",localDirectoryPath);
        
        
    }



NSString *localPdfPath = [localDirectoryPath
                          stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.pdf",pdfName]];
    
    

    BOOL pdfCreado = [pdfData writeToFile:localPdfPath atomically:YES];
    
    BOOL pdfFileExiste = [[NSFileManager defaultManager] fileExistsAtPath: localPdfPath];
    
    if(pdfCreado && pdfFileExiste){
        
        NSLog(@"se crea el pdf para edo cuenta en: %@",localPdfPath);

        
    }

    
    CFURLRef url = (__bridge CFURLRef)[NSURL fileURLWithPath:localPdfPath];
    
   
    
    // Get the PDF Data from the url in a NSData Object
    
  CGPDFDocumentRef  SourcePDFDocument = CGPDFDocumentCreateWithURL (url);
    
    size_t numberOfPages = CGPDFDocumentGetNumberOfPages(SourcePDFDocument);

    BOOL creado= false;
    
   //CGPDFDocumentRef SourcePDFDocument = CGPDFDocumentCreateWithURL((__bridge CFURLRef)urlPDFparaPNG);
    
 /*   for(int currentPage = 1; currentPage <= numberOfPages; currentPage ++ )
    {
    
   CGPDFPageRef SourcePDFPage = CGPDFDocumentGetPage(SourcePDFDocument, currentPage);
   */
  CGPDFPageRef SourcePDFPage = CGPDFDocumentGetPage(SourcePDFDocument, 1);



    CGPDFPageRetain(SourcePDFPage);
    

    CGRect sourceRect = CGPDFPageGetBoxRect(SourcePDFPage, kCGPDFMediaBox);
    
    
    
    NSString *localPngPath = [localDirectoryPath
                              stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.png",pdfName]];
    
    NSLog(@"ruta para para guardar el png de estado de cuenta %@",localPngPath);

    
    
    UIGraphicsBeginPDFContextToFile(localPngPath, sourceRect, nil);
    
    UIGraphicsBeginImageContext(CGSizeMake(sourceRect.size.width,sourceRect.size.height));
    
    CGContextRef currentContext = UIGraphicsGetCurrentContext();
    
    CGContextTranslateCTM(currentContext, 0.0, sourceRect.size.height); //596,842 //640×960,
    
    CGContextScaleCTM(currentContext, 1.0, -1.0);
    
    CGContextDrawPDFPage (currentContext, SourcePDFPage); // draws the page in the graphics context
    
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    
    UIGraphicsEndImageContext();
    
    //NSString *imagePath = [documentsDirectory stringByAppendingPathComponent: relativeOutputFilePath];
    
     creado= [UIImagePNGRepresentation(image) writeToFile: localPngPath atomically:YES];
        
  //  }
    
    
    
    
    return creado;


}



- (void) alertView: (UIAlertView *) alertView clickedButtonAtIndex: (NSInteger) buttonIndex
{
  
    UIAlertView *alertV;
    BOOL pdfCreatedSuccess;
    if (buttonIndex == 1) {
        if(!self.appDelegate.esInvitado){
        pdfCreatedSuccess = [self savePDFFromUrl:_urlPdfEstadoCuenta andName:_nombreComprobanteEstadoCuenta AndInPath:[NSString stringWithFormat:@"BCOM/%@",[[Session getInstance] usuarioAdmin]]];
        } else {
            
        pdfCreatedSuccess = [self savePDFFromUrl:_urlPdfEstadoCuenta andName:_nombreComprobanteEstadoCuenta AndInPath:[NSString stringWithFormat:@"BCOM/%@/Invitados/%@", [[Session getInstance] usuarioAdmin],[[Session getInstance] numeroDelUsuario]]];
        }
        if(pdfCreatedSuccess){
             alertV = [[UIAlertView alloc] initWithTitle: @"Aviso \n" message: @"Se ha generado correctamente el comprobante." delegate: nil cancelButtonTitle: @"Aceptar" otherButtonTitles:nil];
        } else {
             alertV = [[UIAlertView alloc] initWithTitle: @"Aviso \n" message: @"Error al guardar el comprobante." delegate: nil cancelButtonTitle: @"Aceptar" otherButtonTitles:nil];
        }
       [alertV show];
       [ self.webView stringByEvaluatingJavaScriptFromString:@"cierraDialog('isMisCuentas','nb-estado','');"];
        
    } else if (buttonIndex == 0) {
        
        [ self.webView stringByEvaluatingJavaScriptFromString:@"cierraDialog('isMisCuentas','nb-estado','');"];
       
    }
}



@end
