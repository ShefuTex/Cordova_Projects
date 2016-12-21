#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import "HTTPInvoker.h"
#import "ServerResponse.h"
#import "AppDelegate.h"
#import "Session.h"

@interface NativeDelegate : CDVPlugin<ServerClient>

@property (nonatomic, strong) NSString *callbackId;
@property (nonatomic, strong) HTTPInvoker *httpInvoker;
@property (nonatomic, strong) NSArray *argumentos;
@property (nonatomic, strong) AppDelegate *appDelegate;
@property (nonatomic, strong) Session *session;

- (void) analyzeServerResponse: (ServerResponse*) aServerResponse;

- (void) doNetworkOperation: (CDVInvokedUrlCommand*) command;

@end