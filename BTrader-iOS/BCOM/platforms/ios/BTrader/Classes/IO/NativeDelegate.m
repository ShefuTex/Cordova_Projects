#import "NativeDelegate.h"
#import "HTTPInvoker.h"
#import "Respuesta.h"
#import "Constantes.h"

#define ERROR_DE_COMUNICANIONES                                 @"ERROR DE COMUNICACIONES"

@implementation NativeDelegate

- (CDVPlugin*) initWithWebView: (UIWebView*) theWebView
{
    self = [super initWithWebView: theWebView];
    
    if (self) {
        _httpInvoker = [HTTPInvoker getInstance];
        _appDelegate = [UIApplication sharedApplication].delegate;
        _session     = [Session getInstance];
    }
    
    return self;
}

- (void) analyzeServerResponse: (ServerResponse *) aServerResponse
{
    Respuesta *respuesta = aServerResponse.responseHandler;
    
    CDVPluginResult* pluginResult = nil;
    
    if (respuesta.isCorrect) {
        pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: respuesta.jsonResponse];
    }else if ([respuesta.valido isEqualToString:@"NO"]){
        [self showErrorWithMessage:respuesta.mensaje];
    }
    else {
        pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: respuesta.jsonResponse];
        if([respuesta.mensaje rangeOfString:@"Apreciable cliente: Solicite este servicio a su Ejecutivo Patrimonial"].location != NSNotFound)
            NSLog(@"SI tiene");
        else{
            [self showErrorWithMessage:respuesta.mensaje];
        }
    }
    
    [_appDelegate stopIndicatorActivity];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
}

- (void) doNetworkOperation: (CDVInvokedUrlCommand*) command
{
    [_appDelegate startIndicatorActivity];
    _callbackId = command.callbackId;
    _argumentos = command.arguments;
}

- (void) server: (HTTPInvoker*) aServer download: (NSInteger) aDownloadId finishedWithResponse: (ServerResponse*) aServerResponse
{
	[self analyzeServerResponse: aServerResponse];
}

-(void) mensajeError:(ServerResponse*) aServerResponse
{
	NSLog(@"Ha ocurrido un error controlado... trasmite");
}

- (void) erroredServer: (HTTPInvoker*) aServer download: (NSInteger) aDownloadId
{
    [self.appDelegate stopIndicatorActivity];
    //[self serverError];
    //[self showErrorWithMessage: ERROR_DE_COMUNICANIONES];
}

- (void) serverError
{
	NSLog(@"Ha ocurrido un error");
}

- (NSInteger) checkDownloadId: (NSInteger) aDownloadId
{
	return -1;
}


- (void) cancelledServer: (HTTPInvoker*) aServer download: (NSInteger) aDownloadId
{
	
}

- (void) showErrorWithMessage: (NSString*) message
{
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle: ERROR_MESSAGE_TITTLE message: message delegate: nil cancelButtonTitle: OK_BUTTON_TITTLE otherButtonTitles: nil];
    [alert show];
}

@end