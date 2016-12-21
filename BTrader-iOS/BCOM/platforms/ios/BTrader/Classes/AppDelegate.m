/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  BCom
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"

#import <Cordova/CDVPlugin.h>
#import "Constantes.h"
#import "Session.h"
#import "LoginDelegate.h"
#import "TimerDelegate.h"
#import "PersistenceFilesPathsProvider.h"
#import "TokenViewController.h"

@implementation AppDelegate{
    UIActivityIndicatorView *activityIndicator;
}

@synthesize window, viewController;

- (id)init
{
    /** If you need to do any extra app-specific initialization, you can do it here
     *  -jm
     **/
    NSHTTPCookieStorage* cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];

    [cookieStorage setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];

    int cacheSizeMemory = 8 * 1024 * 1024; // 8MB
    int cacheSizeDisk = 32 * 1024 * 1024; // 32MB
#if __has_feature(objc_arc)
        NSURLCache* sharedCache = [[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"];
#else
        NSURLCache* sharedCache = [[[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"] autorelease];
#endif
    [NSURLCache setSharedURLCache:sharedCache];

    self = [super init];
    return self;
}

#pragma mark UIApplicationDelegate implementation

/**
 * This is main kick off after the app inits, the views and Settings are setup here. (preferred - iOS4 and up)
 */
- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    CGRect screenBounds = [[UIScreen mainScreen] bounds];

#if __has_feature(objc_arc)
        self.window = [[UIWindow alloc] initWithFrame:screenBounds];
#else
        self.window = [[[UIWindow alloc] initWithFrame:screenBounds] autorelease];
#endif
    self.window.autoresizesSubviews = YES;

#if __has_feature(objc_arc)
        self.viewController = [[MainViewController alloc] init];
#else
        self.viewController = [[[MainViewController alloc] init] autorelease];
#endif
    self.viewController.useSplashScreen = YES;

    // Set your app's start page by setting the <content src='foo.html' /> tag in config.xml.
    // If necessary, uncomment the line below to override it.
    // self.viewController.startPage = @"index.html";

    // NOTE: To customize the view's frame size (which defaults to full screen), override
    // [self.viewController viewWillAppear:] in your view controller.

    self.window.rootViewController = self.viewController;
    [self.window makeKeyAndVisible];

    return YES;
}

// this happens while we are running ( in the background, or from within our own app )
// only valid if BTrader-Info.plist specifies a protocol to handle
///- (BOOL)application:(UIApplication*)application openURL:(NSURL*)url sourceApplication:(NSString*)sourceApplication annotation:(id)annotation
- (BOOL)application:(UIApplication*)application handleOpenURL:(NSURL*)url
{
	if (!url) {
		return NO;
    }

	// calls into javascript global function 'handleOpenURL'
	NSString* jsString = [NSString stringWithFormat:@"handleOpenURL(\"%@\");", url];
	[self.viewController.webView stringByEvaluatingJavaScriptFromString:jsString];
///    [self.viewController processOpenUrl:url];

    // all plugins will get the notification, and their handlers will be called
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];

    return YES;
}

// repost all remote and local notification using the default NSNotificationCenter so multiple plugins may respond
- (void)            application:(UIApplication*)application
    didReceiveLocalNotification:(UILocalNotification*)notification
{
    // re-post ( broadcast )
    [[NSNotificationCenter defaultCenter] postNotificationName:CDVLocalNotification object:notification];
}

- (void)                                 application:(UIApplication*)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken
{
    // re-post ( broadcast )
    NSString* token = [[[[deviceToken description]
        stringByReplacingOccurrencesOfString:@"<" withString:@""]
        stringByReplacingOccurrencesOfString:@">" withString:@""]
        stringByReplacingOccurrencesOfString:@" " withString:@""];

    [[NSNotificationCenter defaultCenter] postNotificationName:CDVRemoteNotification object:token];
}

- (void)                                 application:(UIApplication*)application
    didFailToRegisterForRemoteNotificationsWithError:(NSError*)error
{
    // re-post ( broadcast )
    [[NSNotificationCenter defaultCenter] postNotificationName:CDVRemoteNotificationError object:error];
}

- (NSUInteger)application:(UIApplication*)application supportedInterfaceOrientationsForWindow:(UIWindow*)window
{
    // iPhone doesn't support upside down by default, while the iPad does.  Override to allow all orientations always, and let the root view controller decide what's allowed (the supported orientations mask gets intersected).
    NSUInteger supportedInterfaceOrientations = (1 << UIInterfaceOrientationPortrait) | (1 << UIInterfaceOrientationLandscapeLeft) | (1 << UIInterfaceOrientationLandscapeRight) | (1 << UIInterfaceOrientationPortraitUpsideDown);

    return supportedInterfaceOrientations;
}

- (void)applicationDidReceiveMemoryWarning:(UIApplication*)application
{
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
}

    // Inactividad Timer
-(void) initInactividadTimer
{
    inactividadTimer = [NSTimer scheduledTimerWithTimeInterval: TIME_OUT_INACTIVIDAD target: self selector: @selector(closeInactividadTimer) userInfo: nil repeats: NO];
}

-(void) resetInactividadTimer
{
    [inactividadTimer invalidate];
    
    inactividadTimer = nil;
    
    [self initInactividadTimer];
}

-(void) closeInactividadTimer
{
    [self  timerDelegateClosed: YES];
    
    [self validateClose];
    
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: @"Aviso\n" message: MESSAGE_CLOSE_FIN delegate: nil cancelButtonTitle: @"Aceptar" otherButtonTitles: nil];
    
    [alertView show];
}

    // Operacion Timer
-(void) initOperacionTimer: (BOOL) isWebTrader
{
    if (isWebTrader) {
        operacionTimer = [NSTimer scheduledTimerWithTimeInterval: TIME_OUT_WEB_TRADER target: self selector: @selector(closeOperacionTimer) userInfo:nil repeats: NO];
        doKeepAlive = [NSTimer scheduledTimerWithTimeInterval: TIME_DO_KEEP_ALIVE target: self selector: @selector(doKeepAliveOperation) userInfo:nil repeats: YES];
    } else {
        operacionTimer = [NSTimer scheduledTimerWithTimeInterval: TIME_OUT_OPERACION target: self selector: @selector(closeOperacionTimer) userInfo: nil repeats: NO];
        doKeepAlive = [NSTimer scheduledTimerWithTimeInterval: TIME_DO_KEEP_ALIVE target: self selector: @selector(doKeepAliveOperation) userInfo:nil repeats: YES];
    }
}

-(void) resetOperacionTimer: (BOOL) isWebTrader
{
    [operacionTimer invalidate];
    
    operacionTimer = nil;
    
    itsTimeToClose = false;
    
    [self initOperacionTimer:isWebTrader];
}

-(void) initOperacionTimerAviso
{
    operacionTimer = [NSTimer scheduledTimerWithTimeInterval: TIME_OUT_5 target: self selector: @selector(closeOperacionTimer) userInfo: nil repeats: NO];
}

-(void) resetOperacionTimerAviso
{
    [operacionTimer invalidate];
    
    operacionTimer = nil;
    
    [self initOperacionTimerAviso];
}

-(void) doKeepAliveOperation
{
    LoginDelegate *loginDelegate = [self.viewController getCommandInstance: @"LoginDelegate"];
    
    NSString *usuario;
    NSString *acceso;
    
    if (loginDelegate != nil) {
        usuario = loginDelegate.usuario_usr;
        acceso  = loginDelegate.acceso_usr;
    }
    
    if (usuario != nil && acceso != nil) {
        [self doKeepAliveOp:loginDelegate];
    }
    //[self ]

}

-(void) closeOperacionTimer
{
    if (!itsTimeToClose) {
        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Aviso\n" message:MESSAGE_CLOSE_5MIN delegate:nil cancelButtonTitle:@"Aceptar" otherButtonTitles: nil];
        
        [alertView show];
        
        itsTimeToClose = true;
        
        [self resetOperacionTimerAviso];
    } else {
        [self timerDelegateClosed: NO];
        
        [self validateClose];

        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Aviso\n" message:MESSAGE_CLOSE_FIN delegate:nil cancelButtonTitle:@"Aceptar" otherButtonTitles: nil];
        
        itsTimeToClose = false;

        [alertView show];
        
        /*TokenViewController* object = [[TokenViewController alloc] init];
        
        [object doKeep:_callbackLogoutTimer];*/
    }
}

- (void) timerDelegateClosed: (BOOL) isInactividad
{
    TimerDelegate *timerDelegate = [self.viewController getCommandInstance: @"TimerDelegate"];
    
    if (isInactividad) { [timerDelegate responseInactividad]; }
    else { [timerDelegate responseOperacion]; }
}

    // Reset App
-(void) resetApp
{
    self.viewController = [[MainViewController alloc] init];
    self.window.rootViewController = self.viewController;
    
    NSString* cookiesFile = [PersistenceFilesPathsProvider getCookiesStorageFilePath];
    NSMutableDictionary* storedCookies = [[NSMutableDictionary alloc] initWithContentsOfFile: cookiesFile];
    
    [storedCookies removeAllObjects];
    [storedCookies writeToFile:cookiesFile atomically:YES];
    
    [self.window makeKeyAndVisible];
}

    // Loading
-(void) startIndicatorActivity
{
    /**if (!activityIndicator) {
        activityIndicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle: UIActivityIndicatorViewStyleWhiteLarge];
        
        CGRect frame = self.window.rootViewController.view.frame;
        
        activityIndicator.frame = CGRectMake(frame.size.width/2-25, frame.size.height/2-25, 50, 50);
        
        [activityIndicator startAnimating];
        self.window.rootViewController.view.userInteractionEnabled = NO;
        [self.window addSubview: activityIndicator];
    }**/
}

-(void) stopIndicatorActivity
{
    /**if (activityIndicator) {
        [activityIndicator stopAnimating];
        [activityIndicator removeFromSuperview];
        activityIndicator = nil;
        self.window.rootViewController.view.userInteractionEnabled = YES;
    }**/
}

    // Close Session
- (void) closeSession: (LoginDelegate *) loginDelegate
{
    CDVInvokedUrlCommand* command = [[CDVInvokedUrlCommand alloc] initWithArguments: nil callbackId: @"LoginDelegateClose" className: @"" methodName: @""];
    
    loginDelegate.callbackLogoutWas = command.callbackId;
    loginDelegate.cdvLogoutWas = command;
    
    [loginDelegate closeSession];
    
    [operacionTimer invalidate];
    [inactividadTimer invalidate];
    [doKeepAlive invalidate];
    
    operacionTimer = nil;
    inactividadTimer = nil;
    doKeepAlive = nil;
    
    itsTimeToClose = false;
}

- (void) doKeepAliveOp: (LoginDelegate *) loginDelegate
{
    [loginDelegate doKeepAlive];
}

- (void) applicationDidEnterBackground: (UIApplication *) application
{
    [self validateClose];
}

- (void) applicationDidFinishLaunching: (UIApplication *) application
{
    itsTimeToClose = false;
}

- (void) validateClose
{
    LoginDelegate *loginDelegate = [self.viewController getCommandInstance: @"LoginDelegate"];
    
    NSString *usuario;
    NSString *acceso;
    
    if (loginDelegate != nil) {
        usuario = loginDelegate.usuario_usr;
        acceso  = loginDelegate.acceso_usr;
    }
    
    if (usuario != nil && acceso != nil) {
        [self closeSession: loginDelegate];
    }
}
@end
