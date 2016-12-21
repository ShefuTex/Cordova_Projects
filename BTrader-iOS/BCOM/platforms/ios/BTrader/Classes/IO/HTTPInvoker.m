/*
 * Copyright (c) 2010 BBVA. All Rights Reserved
 *
 * This software is the confidential and proprietary information of
 * BBVA ("Confidental Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with
 * the terms of the license agreement you entered into with BBVA.
 */

#import "HTTPInvoker.h"
//#import "ParsingHandler.h"
#import "ServerResponse.h"
#import "Respuesta.h"
//#import "Parser.h"
#import "PersistenceFilesPathsProvider.h"
//#import "LoginDataBaseParser.h"
#import "Session.h"
#import "Server.h"
#import "MensajesDeSimulacion.h"
#import "Constantes.h"


/**
 * HTTP OK status code
 */
#define OK_STATUS_CODE								200

/**
 * HTTP post content type
 */
#define HTTP_POST_CONTENT_TYPE						@"application/x-www-form-urlencoded; charset=UTF-8"

/**
 * Content type header field
 */
#define CONTENT_TYPE_HEADER_FIELD					@"Content-type"

/**
 * Time-out connection interval (in seconds)
 */
#define TIME_OUT_INTERVAL							50.0f

/**
 * Defines the simulator response delay (in seconds)
 */
#define SIMULATION_RESPONSE_TIME					1.00f

@class DownloadInformation;


/**
 * HTTPInvoker extension
 */
@interface HTTPInvoker()

/**
 * Notifies the client asociated to a downlaod that the download finished correctly
 *
 * @param aDownloadInformation The download that finished correctly (contains the data downloaded and the client)
 */
- (void) notifyDownloadFinished: (DownloadInformation*) aDownloadInformation;

/**
 * Notifies the client asociated to a downlaod that the download finished in error
 *
 * @param aDownloadInformation The download that finished in error (contains the client)
 */
- (void) notifyDownloadFinishedInError: (DownloadInformation*) aDownloadInformation;

/**
 * Notifies the lient asociated to a downlaod that the download was cancelled
 *
 * @param aDownloadInformation The download that was cancelled (contains the client)
 */
- (void) notifyDownloadCancelled: (DownloadInformation*) aDownloadInformation;

@end


/**
 * Contains information and manages a single data download process
 */
@interface DownloadInformation : NSObject
{
    /**
     * Download identification
     */
    NSInteger _downloadId;
    
    /**
     * Connection to invoke HTTP operation
     */
    NSURLConnection* _connection;
    
    /**
     * Data being retrieved while download is still active
     */
    NSMutableData* _data;
    
    /**
     * Element to parse the information received
     */
    ServerResponse *_parsingHandler;
    
    /**
     * Download client
     */
    HTTPInvoker *_client;
    
    /**
     * Manage cookies flag
     */
    BOOL _manageCookies;
}

/**
 * Provides read access to the download process identification
 */
@property (nonatomic, readonly) NSInteger downloadId;
/**
 * Provides read access to the remote URL where data can be found
 */
@property (nonatomic, readonly) NSURL* remoteURL;

/**
 * Provides read access to the remote URL string
 */
@property (nonatomic, readonly) NSString* remoteURLString;

/**
 * Provides read access to the memory address where connection object exists
 */
@property (nonatomic, readonly, assign) NSNumber* connectionAddress;

/**
 * Provides read access to the data
 */
@property (nonatomic, readonly) NSData* data;

/**
 * Provides read access to the download client
 */
@property (nonatomic, readonly, retain) HTTPInvoker *client;

/**
 * Provides read access to the manage cookies flag
 */
@property (nonatomic, readonly, assign) BOOL manageCookies;

/**
 * Designated instance initializer. Initializes the DownloadInformation instance with the provided information
 *
 * @param aDownloadId The download process identification
 * @param aRemoteURL Remote URL where information can be found
 * @param aRemoteURLString The remote URL string to store
 * @param aConnection Connection used to invoke HTTP operation
 * @param aHandler The handler to analyze the data received
 * @param aClient The client to download the data for
 * @param aManageCookiesFlag The manage cookies flag to store
 * @result Initialized DownloadInformation instance
 */
- (id) initWithDownloadId: (NSInteger) aDownloadId remoteURL: (NSURL*) aRemoteURL remoteURLString: (NSString*) aRemoteURLString
               connection: (NSURLConnection*) aConnection handler: (ServerResponse*) aHandler client: (HTTPInvoker*) aClient
         andManageCookies: (BOOL) aManageCookiesFlag;

/**
 * Appends another chunk of data into the downloaded information
 *
 * @param aDataChunk Chunk of data to append to existing data
 */
- (void) appendData: (NSData*) aDataChunk;

/**
 * Parses the received information
 */
- (void) parseData;

@end


/**
 * Contains the pending operation information needed to inform clients when the download finishes
 */
@interface ServerDownloadInfo : NSObject
{
@private
    /**
     * Server response where information is analyzed
     */
    ServerResponse* _serverResponse;
    
    /**
     * Server client to be informed when download finishes
     */
    id<ServerClient> _client;
}

/**
 * Provides read-only access to the server response
 */
@property (nonatomic, readonly, retain) ServerResponse* serverResponse;

/**
 * Provides read-only access to the server client
 */
@property (nonatomic, readonly, retain) id<ServerClient> client;

/**
 * Creates an autoreleased server download information instance with the provided information
 *
 * @param aServerResponse The server response to store
 * @param aClient The server client to store
 * @return The autoreleased server download information instance
 */
+ (id) serverDownloadInfoWithServerResponse: (ServerResponse*) aServerResponse andClient: (id<ServerClient>) aClient;

/**
 * Designated initializer. Initializes a server download information instance with the provided information
 *
 * @param aServerResponse The server response to store
 * @param aClient The server client to store
 * @return The initialized server download information instance
 */
- (id) initWithServerResponse: (ServerResponse*) aServerResponse andClient: (id<ServerClient>) aClient;

@end


@implementation DownloadInformation

@synthesize downloadId = _downloadId;
@synthesize remoteURL = _remoteURL;
@synthesize remoteURLString = _remoteURLString;
@dynamic connectionAddress;
@synthesize data = _data;
@synthesize client = _client;
@synthesize manageCookies = _manageCookies;

/*
 * Appends another chunk of data into the downloaded information
 */
- (void) appendData: (NSData*) aDataChunk {
    [_data appendData: aDataChunk];
}

/*
 * Provides read access to the memory address where connection object exists
 */
- (NSNumber*) connectionAddress
{
    return [NSNumber numberWithInteger: (NSInteger)_connection];
}


/**
 * Super class designated instance initializer (invalidated)
 */
- (id) init
{
    return nil;
}

/*
 * Designated instance initializer. Initializes the DownloadInformation instance with the provided information
 */
- (id) initWithDownloadId: (NSInteger) aDownloadId remoteURL: (NSURL*) aRemoteURL remoteURLString: (NSString*) aRemoteURLString
               connection: (NSURLConnection*) aConnection handler: (ServerResponse*) aHandler client: (HTTPInvoker*) aClient
         andManageCookies: (BOOL) aManageCookiesFlag {
    if (self = [super init]) {
        _downloadId = aDownloadId;
        _remoteURL = [aRemoteURL copy];
        _remoteURLString = [aRemoteURLString copy];
        _connection = aConnection;
        _data = [[NSMutableData alloc] initWithCapacity: 1024];
        _parsingHandler = aHandler;
        _client = aClient;
        _manageCookies = aManageCookiesFlag;
    }
    
    return self;
}

/*
 * Parses the received information
 */
- (void) parseData {
    //if ([_parsingHandler usesParser] == YES) {
    NSString* dataAsString = [[NSString alloc] initWithData: _data encoding: NSISOLatin1StringEncoding];
    dataAsString = [dataAsString stringByReplacingOccurrencesOfString:@"\n" withString:@""];
    dataAsString = [dataAsString stringByReplacingOccurrencesOfString:@"\r" withString:@""];
    dataAsString = [dataAsString stringByReplacingOccurrencesOfString:@"\t" withString:@""];
#ifdef DEBUG
    NSLog(@"Data received: %@", dataAsString);
#endif
    NSLog(@"++++");
    NSLog(@"Data received: %@", dataAsString);
    NSLog(@"LENGHT DATA RECEIVED %i",[dataAsString length]);
    int contadorBlancos=0;
    int one=7000;
    if ([dataAsString length] >0) {
        
        
        for (int i=0; i< one; i++) {
            char caracter = [dataAsString characterAtIndex:i];
            if (caracter == ' ') {
                contadorBlancos ++;
            }
            else {
                one=-10;
            }
            
        }
    }
    NSLog(@"INDEX = %i",contadorBlancos);
    
    dataAsString=[dataAsString substringFromIndex:contadorBlancos];
    ServerResponse* response=((ServerResponse*)_parsingHandler);
    
    Respuesta *respuesta = response.responseHandler;
    respuesta.jsonResponse = dataAsString;
    [respuesta resultadoDeLaConexion];
    NSLog(@"Fin");
    
    
    
    NSLog(@"++++");
    
    //} else {
    
    //}
}

@end

@implementation ServerDownloadInfo

@synthesize serverResponse = _serverResponse;
@synthesize client = _client;

/**
 * Deallocates used memory
 */
- (void) dealloc {
    /*	[_serverResponse release];
     _serverResponse = nil;
     
     [_client release];
     _client = nil;
     
     [super dealloc];*/
}

/*
 * Designated initializer. Initializes a server download information instance with the provided information
 */
- (id) initWithServerResponse: (ServerResponse*) aServerResponse andClient: (id<ServerClient>) aClient {
    if (self = [super init]) {
        _serverResponse = [aServerResponse copy];
        _client = aClient;
    }
    
    return self;
}

/*
 * Creates an autoreleased server download information instance with the provided information
 */
+ (id) serverDownloadInfoWithServerResponse: (ServerResponse*) aServerResponse andClient: (id<ServerClient>) aClient {
    return [[ServerDownloadInfo alloc] initWithServerResponse: aServerResponse andClient: aClient];
}

@end


#if (APP_ESTADO == SIMULATION)
/**
 * Class used to store the information needed to invoke the connection simulation in a delayed way when simulation is enabled
 */
@interface SimulationParams : NSObject
{
@private
    /**
     * Simulated download identification
     */
    NSInteger _downloadId;
    
    /**
     * Simulated server response
     */
    NSString* _response;
    
    /**
     * Handler to parse the response
     */
    ServerResponse* _handler;
    
    /**
     * Client asking for the simulated response
     */
    HTTPInvoker *_client;
}

/**
 * Provides read-only access to the simulated download identification
 */
@property (nonatomic, readonly) NSInteger downloadId;

/**
 * Provides read-only access to the simulated server response
 */
@property (nonatomic, readonly, copy) NSString* response;

/**
 * Provides read-only access to the handler to parse the response
 */
@property (nonatomic, readonly, retain) ServerResponse* handler;

/**
 * Provides read-only access to the client asking for the simulated response
 */
@property (nonatomic, readonly, retain) HTTPInvoker *client;

/**
 * Creates and returns an autoreleased SimulationParams instance using the provided information
 *
 * @param aDownloadId The simulated download identification to store
 * @param aResponse The simulate server response to store
 * @param aHandler The handlet to store
 * @param aClient The client to store
 * @return The autoreleased SimulationParams instance
 */
+ (id) simulationParamsWithDownloadId: (NSInteger) aDownloadId response: (NSString*) aResponse
                              handler: (ServerResponse*) aHandler andClient: (HTTPInvoker*) aClient;

/**
 * Designated initialized. Initializes a SimulationParams instance using the provided information
 *
 * @param aDownloadId The simulated download identification to store
 * @param aResponse The simulate server response to store
 * @param aHandler The handlet to store
 * @param aClient The client to store
 * @return The initialized SimulationParams instance
 */
- (id) initWithDownloadId: (NSInteger) aDownloadId response: (NSString*) aResponse
                  handler: (ServerResponse*) aHandler andClient: (HTTPInvoker*) aClient;

@end
#endif

#if (APP_ESTADO == SIMULATION)
@implementation SimulationParams

@synthesize downloadId = _downloadId;
@synthesize response = _response;
@synthesize handler = _handler;
@synthesize client = _client;


/**
 * Deallocates used memory
 */
- (void) dealloc {
    /*	[_client release];
     _client = nil;
     
     [_handler release];
     _handler = nil;
     
     [_response release];
     _response = nil;
     
     [super dealloc];*/
}

/*
 * Designated initialized. Initializes a SimulationParams instance using the provided information
 */
- (id) initWithDownloadId: (NSInteger) aDownloadId response: (NSString*) aResponse
                  handler: (ServerResponse*) aHandler andClient: (HTTPInvoker*) aClient {
    if (self = [super init]) {
        _downloadId = aDownloadId;
        _response = [aResponse copy];
        _handler = aHandler;
        _client = aClient;
        
    }
    
    return self;
}

/**
 * Creates and returns an autoreleased SimulationParams instance using the provided information
 *
 * @param aDownloadId The simulated download identification to store
 * @param aResponse The simulate server response to store
 * @param aHandler The handlet to store
 * @param aClient The client to store
 * @return The autoreleased SimulationParams instance
 */
+ (id) simulationParamsWithDownloadId: (NSInteger) aDownloadId response: (NSString*) aResponse
                              handler: (ServerResponse*) aHandler andClient: (HTTPInvoker*) aClient {
    return [[SimulationParams alloc] initWithDownloadId: aDownloadId response: aResponse
                                                handler: aHandler andClient: aClient] ;
}

@end
#endif

@implementation HTTPInvoker
/**/
- (BOOL)connection:(NSURLConnection *)connection canAuthenticateAgainstProtectionSpace:(NSURLProtectionSpace *)protectionSpace {
    return [protectionSpace.authenticationMethod isEqualToString:NSURLAuthenticationMethodServerTrust];
}

- (void)connection:(NSURLConnection *)connection didReceiveAuthenticationChallenge:(NSURLAuthenticationChallenge *)challenge {
    [challenge.sender useCredential:[NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust] forAuthenticationChallenge:challenge];
    
    [challenge.sender continueWithoutCredentialForAuthenticationChallenge:challenge];
}
/**/

/**
 * Singleton only instance
 */
static HTTPInvoker* _httpInvokerInstance = nil;

/**
 * The allocation returns the singleton only instance
 */
+ (id) allocWithZone: (NSZone*) zone
{
    @synchronized([HTTPInvoker class]) {
        if (_httpInvokerInstance == nil) {
            _httpInvokerInstance = [super allocWithZone: zone];
            return _httpInvokerInstance;
        }
    }
    
    return nil;
}

/*
 * Cancels the given download process and notifies the client. The associated
 * DonwloadInformation instance is removed from the pending downloads list
 */
- (void) cancelDownload: (NSInteger) aDownloadId {
    if (aDownloadId > 0) {
        NSArray* pendingDownload = [_activeDownloads allValues];
        
        NSNumber* foundKey = nil;
        DownloadInformation* downloadInformation = nil;
        
        for (downloadInformation in pendingDownload) {
            if (downloadInformation.downloadId == aDownloadId) {
                foundKey = downloadInformation.connectionAddress;
                break;
            }
        }
        
        if (foundKey != nil) {
            HTTPInvoker *client = downloadInformation.client;
            [_activeDownloads removeObjectForKey: foundKey];
            [client downloadCancelled: aDownloadId];
        }
    }
}

/**
 * From NSURLConnection delegate. Sent when a connection has finished loading successfully. Client is notified
 * that information was correctly download. The associated DonwloadInformation instance is removed from the
 * pending downloads list
 *
 * @param connection The connection that finished successfully
 */
- (void) connectionDidFinishLoading: (NSURLConnection*) connection
{
    DownloadInformation* downloadInfo = [_activeDownloads objectForKey: [NSNumber numberWithInteger: (NSInteger)connection]] ;
    
    if (downloadInfo != nil)
    {
        [self notifyDownloadFinished: downloadInfo];
        
        [_activeDownloads removeObjectForKey: downloadInfo.connectionAddress];
    }
}

/**
 * From NSURLConnection delegate. Sent when a connection fails to load its request successfully. Client is
 * notified that the connection failed. The associated DownloadInformation instance is removed from the
 * pending downloads list
 *
 * @param connection The connection that failled to load
 * @param error The error information
 */
- (void) connection: (NSURLConnection*) connection didFailWithError: (NSError*) error
{
    if (error.code == -1001){
        //[self showTimeoutAlert];//My method to show dialog with timeout message.
        
        /*UIAlertView *alertViewError = [[UIAlertView alloc] initWithTitle: @"Aviso" message: @"Servicio temporalmente no disponible" delegate: nil cancelButtonTitle: @"Aceptar" otherButtonTitles: nil];
        
        [alertViewError show];*/

        
        NSLog(@"LU_ERROR.CODE = -1001");
    } else {
        NSLog(@"LU_ERROR_ELSE");
        //[self showInvalidURLAlert];//My method to show dialog with bad URL message.
    }
    NSLog(@"connection: didFailWithError: %@",[error localizedDescription]);
    DownloadInformation* downloadInfo = [_activeDownloads objectForKey: [NSNumber numberWithInteger: (NSInteger)connection]];
    
    if (downloadInfo != nil)
    {
        [_activeDownloads removeObjectForKey: downloadInfo.connectionAddress];
        
        [self notifyDownloadFinishedInError: downloadInfo];
        
        [_activeDownloads removeObjectForKey: downloadInfo.connectionAddress];
    }
}

/**
 * From NSURLConnection delegate. Sent as a connection loads data incrementally. Information is stored
 * in the associated DownloadInformation instance
 *
 * @param connection The connection that received the data
 * @param data The data received
 */
- (void) connection: (NSURLConnection*) connection didReceiveData: (NSData*) data
{
    DownloadInformation* downloadInfo = [_activeDownloads objectForKey: [NSNumber numberWithInteger: (NSInteger)connection]];
    
    if (downloadInfo != nil)
    {
        [downloadInfo appendData: data];
    }
}

/**
 * From NSURLConnection delegate. Sent when the connection has received sufficient data to construct the URL response for its request.
 * If status code is not OK, the client is notified as the download failed, and the associated DownloadInformation instance is removed
 * from the pending downloads list
 *
 * @param connection The connection that received the URL response
 * @param response The response information received
 */
- (void) connection: (NSURLConnection*) connection didReceiveResponse: (NSURLResponse*) response
{
    if ([response isKindOfClass: [NSHTTPURLResponse class]] == YES)
    {
        DownloadInformation* downloadInfo = [_activeDownloads objectForKey: [NSNumber numberWithInteger: (NSInteger)connection]];
        
        NSHTTPURLResponse* httpResponse = (NSHTTPURLResponse*)response;
        
        NSDictionary* losheaders = [httpResponse allHeaderFields];
        NSString* liga;
        liga = [losheaders valueForKey:@"Location"];
        NSLog(@"location: %@",liga);
        NSLog(@" status code %d ",httpResponse.statusCode);
        
        if (httpResponse.statusCode != OK_STATUS_CODE)
        {
            [self notifyDownloadFinishedInError: downloadInfo];
            
            [_activeDownloads removeObjectForKey: downloadInfo.connectionAddress];
        } else {
            
            if (downloadInfo.manageCookies == YES) {
                
                NSArray* cookiesArray = [NSHTTPCookie cookiesWithResponseHeaderFields: [httpResponse allHeaderFields] forURL: downloadInfo.remoteURL];
                NSMutableArray* cookiesArrayMut=[NSMutableArray arrayWithArray:cookiesArray];
                [PersistenceFilesPathsProvider createDirectoryStructure];
                NSString* cookiesFile = [PersistenceFilesPathsProvider getCookiesStorageFilePath];
                NSLog(@"archivo de las cookies: %@", cookiesFile);
                NSLog(@"--------------------------------------------------------------------");
                NSLog(@"cookies en response");
                NSHTTPCookie* galleta = nil;
                int i=0;
                NSInteger index;
                
#if(WAS_TEST==0)
                bool encontrado=false;
                
                for (galleta in cookiesArrayMut){
                    NSString* valor=[galleta name];
                    NSRange textRange=[valor rangeOfString:@"JSESSIONID"];
                    if (textRange.location != NSNotFound) {
                        index=textRange.location;
                        NSLog(@"***** INDEX %d ", index);
                        if (i==0&&index>0) {
                            
                            encontrado=true;
                        }
                    }
                    NSLog(@"cookie en response1: key: %@, val: %@", [galleta name],[galleta value]);
                    
                    i++;
                    
                }
                NSLog(@"***** borrando... ");
                if (encontrado) {
                    [cookiesArrayMut removeObjectAtIndex:0];
                    NSLog(@"***** borreeee2 ");
                }
                
                for (galleta in cookiesArrayMut){
                    NSLog(@"cookie en response2: key: %@, val: %@", [galleta name],[galleta value]);
                }
                NSLog(@"--------------------------------------------------------------------");
                NSDictionary* headerDictionary = [NSHTTPCookie requestHeaderFieldsWithCookies: cookiesArrayMut];
                NSMutableDictionary * cookiesHeaders = [NSMutableDictionary dictionaryWithDictionary:headerDictionary];
                NSMutableDictionary * allCookies = [[NSMutableDictionary alloc] initWithContentsOfFile:cookiesFile];
                if (!allCookies) {
                    allCookies = [[NSMutableDictionary alloc] init];
                }
                [allCookies setObject:cookiesHeaders forKey:downloadInfo.remoteURLString];
                [allCookies writeToFile:cookiesFile atomically: YES];
                
                
#endif
                
            }
        }
    }
}

/**
 * The singleton cannot be copied to another zone
 */
- (id) copyWithZone: (NSZone*) zone
{
    return self;
}

/*
 * Returns the singleton only instance
 */
+ (HTTPInvoker*) getInstance {
    if (_httpInvokerInstance == nil) {
        @synchronized ([HTTPInvoker class]) {
            if (_httpInvokerInstance == nil) {
                _httpInvokerInstance = [[HTTPInvoker alloc] init];
            }
        }
    }
    
    return _httpInvokerInstance;
}

/**
 * Designated initialized. Initializes the singleton instance
 */
- (id) init {
    static BOOL initialized = NO;
    
    if ((initialized == NO) && (self = [super init])) {
        _activeDownloads = [[NSMutableDictionary alloc] initWithCapacity: 5];
        _nextDownloadProcessId = 1;
        initialized = YES;
        _pendingOperations = [[NSMutableDictionary alloc] init];
    }
    
    return self;
}

/*
 * Invokes a network operation
 */
- (NSInteger) invokeOperationToURL: (NSString*) aURLString withParameters: (NSString*) aParametersString
                        andHandler: (ServerResponse*) aHandler forClient: (HTTPInvoker*) aClient
                      storeCookies: (BOOL) aStoreCookiesFlag andUseStoredCookies: (BOOL) aUseStoredCookiesFlag {
    NSInteger result = -1;
    
    if (([aURLString length] > 0) && (aClient != nil)) {
#if (APP_ESTADO == TEST || APP_ESTADO == PRODUCCION || APP_ESTADO == PROD_LIGA_OCULTA)
#if (USE_HTTP_POST == 1)
        NSURL* url = [NSURL URLWithString: aURLString];
        NSMutableURLRequest* URLRequest = [NSMutableURLRequest requestWithURL: url cachePolicy: NSURLRequestReloadIgnoringLocalCacheData timeoutInterval: TIME_OUT_INTERVAL];
        [URLRequest setValue: HTTP_POST_CONTENT_TYPE forHTTPHeaderField: CONTENT_TYPE_HEADER_FIELD];
        
        [URLRequest setHTTPBody: [aParametersString dataUsingEncoding: NSISOLatin1StringEncoding]];
        
        NSLog(@"URL: %@", aURLString);
        NSLog(@"Parameters: %@", aParametersString);
        NSLog(@"1");
        [URLRequest setHTTPMethod: @"POST"];
        
        if([aParametersString isEqualToString:@"WAS"]){
            /*buscar numero de tarjeta*/
            [URLRequest addValue:_username forHTTPHeaderField:@"tarjeta"];
            [URLRequest addValue:@"n" forHTTPHeaderField:@"servicio"];
        }
        NSLog(@"2");
#else
        NSMutableString* urlAndParamsString = [NSMutableString stringWithString: aURLString];
        NSString* escapedParameters = [aParametersString stringByAddingPercentEscapesUsingEncoding: NSISOLatin1StringEncoding];
        NSLog(@"3");
        if ([escapedParameters length] > 0) {
            NSRange separatorRange = [aURLString rangeOfString: @"?"];
            
            if (separatorRange.location == NSNotFound) {
                [urlAndParamsString appendString: @"?"];
            } else {
                [urlAndParamsString appendString: PARAMETER_SEPARATOR];
            }
            
            [urlAndParamsString appendString: escapedParameters];
        }
        NSLog(@"4");
        NSURL* url = [NSURL URLWithString: urlAndParamsString];
        NSLog(@"5");
        NSMutableURLRequest* URLRequest = [NSMutableURLRequest requestWithURL: url cachePolicy: NSURLRequestReloadIgnoringLocalCacheData timeoutInterval: TIME_OUT_INTERVAL];
        [URLRequest setHTTPMethod: @"GET"];
#endif //(USE_HTTP_POST == 1)
        NSLog(@"6");
        if (aUseStoredCookiesFlag == YES) {
            [URLRequest setHTTPShouldHandleCookies: NO];
            NSLog(@"Entra a usar cookies");
            
            
            NSArray* galletas = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookies];
            
            if(galletas != nil && [galletas count]>0){
                
                NSData *data = [NSKeyedArchiver archivedDataWithRootObject:galletas ];
                NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
                [userDefaults setObject:data forKey:@"galletas"];
                NSLog(@"galletas sincronizado %@",[userDefaults synchronize]?@"YES":@"NO");
                userDefaults = [NSUserDefaults standardUserDefaults];
                data = [userDefaults objectForKey:@"galletas"];
                if(data){
                    galletas = [NSKeyedUnarchiver unarchiveObjectWithData:data];
                }
                
                NSLog(@"respaldo de galletas %@",galletas);
                
            }else{
                
                
                NSData *data;
                NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
                data = [userDefaults objectForKey:@"galletas"];
                if(data){
                    galletas = [NSKeyedUnarchiver unarchiveObjectWithData:data];
                    [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:[galletas objectAtIndex:0]];
                }
                NSLog(@"contenido del respaldo de galletas %@",galletas);
                
            }
            NSLog(@"contenido galletas  %@",galletas);
            NSHTTPCookie* galleta;
            NSMutableString* galletaCompleta = [NSMutableString stringWithString:@""];
            for (galleta in galletas){
                [galletaCompleta appendString:[galleta name]];
                [galletaCompleta appendString:@"="];
                [galletaCompleta appendString:[galleta value]];
                NSLog(@"la galleta que voy a enviar: %@",galletaCompleta);
                
            }
            NSString* cookiesFile = [PersistenceFilesPathsProvider getCookiesStorageFilePath];
            NSMutableDictionary *allcookies = [[NSMutableDictionary alloc] initWithContentsOfFile: cookiesFile];
            NSMutableDictionary* storedCookies = [allcookies objectForKey:aURLString];
            
            if (storedCookies == nil) {
                storedCookies = [[NSMutableDictionary alloc] init];
            }
            NSString* value=[storedCookies valueForKey:@"Cookie"];
            
            NSLog(@"cookievalue%@ ",value);
            [URLRequest setValue: value forHTTPHeaderField: @"Cookie"];
        }
        
        NSDictionary *diccionario = [URLRequest allHTTPHeaderFields];
        
        NSArray *arregloHeaders = [diccionario allKeys];
        NSString  *llave = nil;
        NSLog(@"--------*********----------********-------");
        NSLog(@"headers");
        for(llave in arregloHeaders){
            
            NSLog(@"llave: %@,valor: %@", llave,[diccionario valueForKey:llave]);
            
        }
        NSLog(@"--------*********----------********-------");
        
        
        NSURLConnection* URLConnection = [NSURLConnection connectionWithRequest: URLRequest delegate: self];
        NSLog(@"+ç+ç+ç+ç+ç+ç+ç+ç %@", [URLConnection currentRequest]);
        DownloadInformation* downloadInfo = [[DownloadInformation alloc] initWithDownloadId: _nextDownloadProcessId remoteURL: url remoteURLString: aURLString
                                                                                 connection: URLConnection handler: aHandler client: aClient andManageCookies: aStoreCookiesFlag];
        [_activeDownloads setObject: downloadInfo forKey: downloadInfo.connectionAddress];
        
        result = downloadInfo.downloadId;
#else
        result = _nextDownloadProcessId;
#endif //(SIMULAITON == 1)
        _nextDownloadProcessId++;
        
        if (_nextDownloadProcessId == INT_MAX) {
            _nextDownloadProcessId = 1;
        }
    }
    
    return result;
}

/*
 * Notifies the observer asociated to a downlaod that the download was cancelled
 */
- (void) notifyDownloadCancelled: (DownloadInformation*) aDownloadInformation {
    HTTPInvoker *client = aDownloadInformation.client;
    [client downloadCancelled: aDownloadInformation.downloadId];
}


/*
 * Notifies the observer asociated to a downlaod that the download finished correctly
 */
- (void) notifyDownloadFinished: (DownloadInformation*) aDownloadInformation {
    HTTPInvoker *client = aDownloadInformation.client;
    [aDownloadInformation parseData];
    [client downloadFinished: aDownloadInformation.downloadId];
}

/*
 * Notifies the observer asociated to a downlaod that the download finished in error
 */
- (void) notifyDownloadFinishedInError: (DownloadInformation*) aDownloadInformation {
    HTTPInvoker *client = aDownloadInformation.client;
    [client downloadError: aDownloadInformation.downloadId];
}


#if (APP_ESTADO == SIMULATION)
/*
 * Simulates a network operation
 */
- (void) simulateOperationId: (NSInteger) aDownloadId withResponse: (NSString*) aResponse
                  andHandler: (ServerResponse*) aHandler forClient: (HTTPInvoker*) aClient {
    NSLog(@"simulateOperationId");
    
    Respuesta* responseHandler=[((ServerResponse*)aHandler) responseHandler];
    responseHandler.jsonResponse = aResponse;
    [responseHandler resultadoDeLaConexion];
    //Finaliza
    NSLog(@"Fin");
    
    [aClient downloadFinished: aDownloadId];
}
#endif


/**
 * The download was cancelled by user. The server client that
 * requested this download is notified
 *
 * @param aDownloadId The download identification that was cancelled
 */
- (void) downloadCancelled: (NSInteger) aDownloadId {
    NSNumber* downloadId = [NSNumber numberWithInteger: aDownloadId];
    
    ServerDownloadInfo* downloadInfo = [_pendingOperations objectForKey: downloadId];
    [downloadInfo.client cancelledServer: self download: aDownloadId];
    
    [_pendingOperations removeObjectForKey: downloadId];
}

/**
 * The download finished beacuse of an error. The server client that
 * requested this download is notified
 *
 * @param aDownloadId The download identification that has finished because of an error
 */
- (void) downloadError: (NSInteger) aDownloadId {
    NSNumber* downloadId = [NSNumber numberWithInteger: aDownloadId];
    
    ServerDownloadInfo* downloadInfo = [_pendingOperations objectForKey: downloadId];
    [downloadInfo.client server: self download: aDownloadId finishedWithResponse: downloadInfo.serverResponse];
    
    //[downloadInfo.client erroredServer: self download: aDownloadId];
    
    [_pendingOperations removeObjectForKey: downloadId];
}

/**
 * The download has finished correctly. The informtion has already being parsed by the provider parser. The server client that
 * requested this download is notified
 *
 * @param aDownloadId The download identification that has finished
 */
- (void) downloadFinished: (NSInteger) aDownloadId {
    NSNumber* downloadId = [NSNumber numberWithInteger: aDownloadId];
    
    ServerDownloadInfo* downloadInfo = [_pendingOperations objectForKey: downloadId];
    [downloadInfo.client server: self download: aDownloadId finishedWithResponse: downloadInfo.serverResponse];
    
    [_pendingOperations removeObjectForKey: downloadId];
}

- (void) downloadDataFinished: (NSArray*) o {
    
    NSLog(@"dataFinished Server");
}

/** <--     --> **/
/** Web Seal **/
- (NSInteger) signOnWebSeal:(NSString *) tarjeta password: (NSString*) password forClient:(id<ServerClient>) client
{
    _username = [NSString stringWithFormat: @"%@ADMINF", tarjeta];
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWebSeal = [Server operationURLForOperationIndex: LOGIN_OPEN_WSEAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"username="];
    [parameters appendString: _username];
    [parameters appendString: @"&"];
    [parameters appendString: @"password="];
    [parameters appendString: password];
    [parameters appendString: @"&"];
    [parameters appendString: @"login-form-type=pwd"];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWebSeal withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESPONSE_LOGIN_WEBSEAL handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** Sign On **/
- (NSInteger) signOnWas: (NSString*) tarjeta password: (NSString*) password ipEnmascarada: (NSString*) ip forClient: (id<ServerClient>) client
{
    [Session getInstance].numeroDelUsuario = tarjeta;
    
    _username = [NSString stringWithFormat: @"%@ADMINF", tarjeta];
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: LOGIN_OPEN_WAS];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"username="];
    [parameters appendString: _username];
    [parameters appendString: @"&"];
    [parameters appendString: @"password="];
    [parameters appendString: password];
    [parameters appendString: @"&"];
    [parameters appendString: @"login-form-type=pwd"];
    [parameters appendString: @"&"];
    [parameters appendString: @"recepcionJSON=true"];
    [parameters appendString: @"&"];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"i_signon_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"i_signon_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"logon"       forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: _username forKey: @"username2"];
    [datosAplicativos setObject: @"N"      forKey: @"sValidaClaveOperaciones"];
    [datosAplicativos setObject: ip        forKey: @"ip"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    [parameters appendString:jsonString];
    
    NSString *urlParameters = parameters;
    
    NSString *jsonResponse = nil;
    
#if LOGIN_SIMULATION == LOGIN_T1
    jsonResponse = SIMULATE_RESPONSE_SIGNON_TOKEN_T1;
#elif LOGIN_SIMULATION == LOGIN_T3
    jsonResponse = SIMULATE_RESPONSE_SIGNON_TOKEN_T3;
#elif LOGIN_SIMULATION == LOGIN_T6
    jsonResponse = SIMULATE_RESPONSE_SIGNON_TOKEN_T6;
#elif LOGIN_SIMULATION == LOGIN_PSICIONGLOBAL
    jsonResponse = SIMULATE_RESPONSE_SIGNON_POSICION;
#endif
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: jsonResponse handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** Sign On 2 **/
- (NSInteger) signOnIS: (NSString*) usuario acceso: (NSString*) acceso numero: (NSString*) numero tipo: (NSString*) tipo forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: LOGIN_VALIDA_TOKEN];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"username="];
    [parameters appendString: _username];
    [parameters appendString: @"&"];
    [parameters appendString: @"password="];
    [parameters appendString: PASS_WEBSEAL];
    [parameters appendString: @"&"];
    [parameters appendString: @"login-form-type=pwd"];
    [parameters appendString: @"&"];
    [parameters appendString: @"recepcionJSON=true"];
    [parameters appendString: @"&"];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"i_signon_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"i_signon_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"logon2"      forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: @""     forKey: @"posicionTASA"];
    [datosAplicativos setObject: @""     forKey: @"digitoTASA"];
    [datosAplicativos setObject: numero  forKey: @"otp"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: SIGN_ON2_POSICION_GLOBAL_3 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}


/****************************/
/****consultaTipoServicio****/
/****************************/
- (NSInteger) consultaTipoServicio: (NSString*) acceso numero: (NSString*) uri numero: (NSString*) usuario numero: (NSString*) tipo forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: WT_CONSULTA_TIPO_SERVICO];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"consultaTipoServicio"  forKey: @"accion"];
    [cadenaJSON setObject: @"imd_ob_servicio_op"    forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_ob_servicio_pr"    forKey: @"proceso"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: @"D0023132"    forKey: @"acceso"];

    #if(APP_ESTADO == TEST)
        [datosAplicativos setObject: @"http://148.244.45.93/mexiconetblg/mxdydni/camilaProxy" forKey: @"uri"];
    #elif(APP_ESTADO == PRODUCCION)
        [datosAplicativos setObject: @"https://a1.bbvanet.com.mx/mexiconetni/mexiconetni/mexiconetblg/camilaProxy" forKey: @"uri"];
    #elif(APP_ESTADO == PROD_LIGA_OCULTA)
    [datosAplicativos setObject: @"https://a2.bbvanet.com.mx/mexiconetni/mexiconetni/mexiconetblg/camilaProxy" forKey: @"uri"];
    #endif
    [datosAplicativos setObject: @"ADMINF"      forKey: @"usuario"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: CONSULTA_TIPO_SERVICIO handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
        
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}



/****************************/
/****consultaContratosPatrimoniales****/
/****************************/
- (NSInteger) consultaContratosPatrimoniales: (NSString*) acceso numero: (NSString*) usuario forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: WT_CONSULTA_CONTRATOS_PATRIMONIALES];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"consultaContratosPatrimoniales"      forKey: @"accion"];
    [cadenaJSON setObject: @"imd_ob_consulta_posicion_global_op"  forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_ob_consulta_posicion_global_pr" forKey: @"proceso"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: _username forKey: @"acceso"];
    [datosAplicativos setObject: @"ADMINF"  forKey: @"usuario"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: CONSULTA_CONTRATOS_PATRIMONIALES handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/****************************/
/****consultaCapitales****/
/****************************/

- (NSInteger) wtconsultaCapitales: (NSString*) usuario acceso: (NSString*) numCont tipo: (NSString*) tipo forClient: (id<ServerClient>) client
{
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: WT_CONSULTA_CAPITALES];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"consultaCapitales"             forKey: @"accion"];
    [cadenaJSON setObject: @"imd_ob_consulta_capitales_op"  forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_ob_consulta_capitales_pr" forKey: @"proceso"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: tipo          forKey: @"tipo"];
    [datosAplicativos setObject: numCont    forKey: @"idContrato"];
    [datosAplicativos setObject: @"ADMINF"          forKey: @"usuario"];
    [datosAplicativos setObject: _username          forKey: @"acceso"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON_Capitales : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: SIGN_ON2_POSICION_GLOBAL_3 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/****************************/
/****realizaCompraVenta****/
/****************************/

- (NSInteger) wtrealizaCompraVenta:(NSString*) usuario acceso: (NSString*) param1 numero: (NSString*) param2 numero:(NSString*) param3 numero:(NSString*) param4 numero:(NSString*) param5 numero:(NSString*) param6 numero: (NSString*) param7 sim: (NSString*) sim forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: WT_REALIZACOMPRAVENTA];
    
    NSDateFormatter* formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy/MM/dd"];
    NSString *date = [formatter stringFromDate:[NSDate date]];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    
    [parameters appendString: @"cadenaJSON="];
    
    if([param1  isEqual: @"PE&OLES"]){
        param1 = @"PEÑOLES";
    }
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"realizaCompraVenta"  forKey: @"accion"];
    [cadenaJSON setObject: @"imd_ob_acciones_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_ob_acciones_pr" forKey: @"proceso"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: _username forKey: @"acceso"];
    [datosAplicativos setObject: @"00000000" forKey: @"claveOperaciones"];
    [datosAplicativos setObject: @"" forKey: @"digitoVerificador"];
    [datosAplicativos setObject: param1 forKey: @"emisora"];
    [datosAplicativos setObject: date forKey: @"fechaVigencia"];
    [datosAplicativos setObject: param7 forKey: @"id"];
    [datosAplicativos setObject: @"" forKey: @"otp"];
    [datosAplicativos setObject: param3 forKey: @"precioLimite"];
    [datosAplicativos setObject: param2 forKey: @"serie"];
    [datosAplicativos setObject: sim forKey: @"simulacion"];
    [datosAplicativos setObject: param4 forKey: @"tipoOperacion"];
    [datosAplicativos setObject: param5 forKey: @"titulos"];
    [datosAplicativos setObject: @"" forKey: @"tripletaTasa"];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: SIGN_ON2_POSICION_GLOBAL_3 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/****************************/
/****consultaDetalleInversion****/
/****************************/

- (NSInteger) wtconsultaDetalleInversion: (NSString*) usuario acceso: (NSString*) numCont tiempo: (NSString*) tiempo forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: WT_CONSULTA_POSICION_DETALLE_INVERSION];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"consultaDetalle"  forKey: @"accion"];
    [cadenaJSON setObject: @"imd_ob_detalle_inversion_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_ob_detalle_inversion_pr" forKey: @"proceso"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: _username forKey: @"acceso"];
    [datosAplicativos setObject: numCont forKey: @"idContrato"];
    [datosAplicativos setObject: tiempo forKey: @"periodo"];
    [datosAplicativos setObject: @"ADMINF" forKey: @"usuario"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: SIGN_ON2_POSICION_GLOBAL_3 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/****************************/
/****cancelaOrden****/
/****************************/
- (NSInteger) wtcancelaOrden: (NSString*) usuario acceso: (NSString*) param1 numero: (NSString*) param2 numero:(NSString*) param3 numero:(NSString*) param4 numero:(NSString*) numCont forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: WT_CANCELAORDENES];
    
    NSLog(@"LU_param3 %@",param3);
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"cancelaOrden"  forKey: @"accion"];
    [cadenaJSON setObject: @"imd_ob_cancela_orden_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_ob_consulta_capitales_pr" forKey: @"proceso"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: _username        forKey: @"acceso"];
    [datosAplicativos setObject: @"00000000"          forKey: @"claveOperaciones"];
    [datosAplicativos setObject: @""          forKey: @"digitoVerificador"];
    [datosAplicativos setObject: param1          forKey: @"empresa"];
    [datosAplicativos setObject: param3          forKey: @"fechaRegistro"];
    [datosAplicativos setObject: param2          forKey: @"folio"];
    [datosAplicativos setObject: numCont       forKey: @"idContrato"];
    [datosAplicativos setObject: param4         forKey: @"ordenesPendientes"];
    [datosAplicativos setObject: @""          forKey: @"otp"];
    [datosAplicativos setObject: @""          forKey: @"tripletaTasa"];
    [datosAplicativos setObject: @"ADMINF"          forKey: @"usuario"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: SIGN_ON2_POSICION_GLOBAL_3 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/****************************/
/****wtdetalleOrden****/
/****************************/
- (NSInteger) wtdetalleOrden: (NSString*) usuario acceso: (NSString*) param1 numero: (NSString*) param2 numero:(NSString*)param3 numero:(NSString*) numCont forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: WT_DETALLE_ORDEN];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"detalleOrden"  forKey: @"accion"];
    [cadenaJSON setObject: @"imd_ob_consulta_capitales_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_ob_consulta_capitales_pr" forKey: @"proceso"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: _username        forKey: @"acceso"];
    [datosAplicativos setObject: param1          forKey: @"empresa"];
    [datosAplicativos setObject: param3          forKey: @"fechaRegistro"];
    [datosAplicativos setObject: param2          forKey: @"folio"];
    [datosAplicativos setObject: numCont          forKey: @"idContrato"];
    [datosAplicativos setObject: @"ADMINF"          forKey: @"usuario"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: SIGN_ON2_POSICION_GLOBAL_3 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/****************************/
/****consultaPortafolio****/
/****************************/
- (NSInteger) wtconsultaPortafolio: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: WT_CONSULTA_PORTAFOLIO];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"consultaPortafolio"  forKey: @"accion"];
    [cadenaJSON setObject: @"imd_ob_resumen_saldos_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_ob_resumen_saldos_pr" forKey: @"proceso"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: _username          forKey: @"acceso"];
    [datosAplicativos setObject: @"PTMXP0000001"          forKey: @"idContratoPatrimonial"];
    [datosAplicativos setObject: @"D"          forKey: @"periodo"];
    [datosAplicativos setObject: @"ADMINF"          forKey: @"usuario"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: SIGN_ON2_POSICION_GLOBAL_3 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/****************************/
/****consultarPromociones****/
/****************************/
- (NSInteger) wtconsultarPromociones: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: WT_CONSULTA_PROMOCIONES];  //cambiar_promociones
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"consultarPromociones"  forKey: @"accion"];
    [cadenaJSON setObject: @"imd_consulta_promociones_posicion_global_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_promociones_posicion_global_pr" forKey: @"proceso"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: _username          forKey: @"acceso"];
    [datosAplicativos setObject: acceso          forKey: @"usuario"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: SIGN_ON2_POSICION_GLOBAL_3 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/****************************/
/****consultarPromociones****/
/****************************/
- (NSInteger) wtconsultarMKT: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: WT_CONSULTA_MKT];  //cambiar_promociones
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"consultaMKT"  forKey: @"accion"];
    [cadenaJSON setObject: @"imd_consultaMKT_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_prestamos_preformalizados_pr" forKey: @"proceso"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: _username          forKey: @"acceso"];
    [datosAplicativos setObject: @"ADMINF"          forKey: @"usuario"];
    [datosAplicativos setObject: @""           forKey: @"indRespuesta"];
    [datosAplicativos setObject: @""          forKey: @"indicador"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: SIGN_ON2_POSICION_GLOBAL_3 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** Singoff  WAS **/
- (NSInteger) signOffWas: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: LOGOUT_CLOSE_WAS];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_signoff_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_signoff_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"logout"         forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: @"BNET" forKey: @"canal"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response:  SIGNOFF handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** Singoff Web Servlet **/
- (NSInteger) signOffServlet:(NSString *)tarjeta forClient:(id<ServerClient>)client
{
    _username = [NSString stringWithFormat: @"%@ADMINF", tarjeta];
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWebSeal = [Server operationURLForOperationIndex: LOGOUT_CLOSE_SERVLET];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"username="];
    [parameters appendString: _username];
    [parameters appendString: @"&"];
    [parameters appendString: @"password="];
    [parameters appendString: PASS_WEBSEAL];
    [parameters appendString: @"&"];
    [parameters appendString: @"login-form-type=pwd"];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWebSeal withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESPONSE_LOGOUT_WEBSEAL handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}
////////////////////////////////////
/***********************************/
/**Cancela Titulo- Invertir Venta***/
/**********************************/
//usuario_global,acceso_usr_global
- (NSInteger) cancelaTituloInv:(NSString*) cuentaInv tittuloInv: (NSString*) tittuloInv cuentaDep:(NSString*) cuentaDep importeInversion:(NSString*) importeInversion fechaOperacion:(NSString*) fechaOperacion tipoCliente:(NSString*) tipoCliente acceso: (NSString*) usuario_global global: (NSString*) acceso_usr_global forClient: (id<ServerClient>) client{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex:  INV_REALIZAVENTA];
    
   // NSDateFormatter* formatter = [[NSDateFormatter alloc] init];
    //[formatter setDateFormat:@"yyyy/MM/dd"];
    //NSString *date = [formatter stringFromDate:[NSDate date]];
    //NSLog(@"%@",[formatter stringFromDate:[NSDate date]]);
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"cancelaTitulo"  forKey: @"accion"];
    [cadenaJSON setObject: @"imd_inversiones_a_plazo_venta_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_inversiones_a_plazo_venta_pr" forKey: @"proceso"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: @"00000000" forKey: @"claveOperaciones"];
    [datosAplicativos setObject: acceso_usr_global forKey: @"acceso"];
    [datosAplicativos setObject: usuario_global forKey: @"usuario"];
    [datosAplicativos setObject: @"" forKey: @"digitoVerificador"];
    [datosAplicativos setObject: cuentaDep forKey: @"ctaAbono"];
    [datosAplicativos setObject: cuentaInv forKey: @"cuenta"];
    [datosAplicativos setObject: @"" forKey: @"otp"];
    [datosAplicativos setObject: tittuloInv forKey: @"titulo"];
    [datosAplicativos setObject: @"" forKey: @"cuenta11"];
    [datosAplicativos setObject: importeInversion forKey: @"importe"];
    [datosAplicativos setObject: importeInversion forKey: @"importeInversion"];
    [datosAplicativos setObject: @"" forKey: @"interes"];
    [datosAplicativos setObject: tipoCliente forKey: @"tipoCliente"];
    [datosAplicativos setObject: @"" forKey: @"tripletaTasa"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", jsonString);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: SIGN_ON2_POSICION_GLOBAL_3 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}




////////////////////////////////////
/////////////////////////////////////

/** Singoff Web Seal **/
- (NSInteger) signOffWebSeal: (NSString*) tarjeta forClient:(id<ServerClient>) client
{
    _username = [NSString stringWithFormat: @"%@ADMINF", tarjeta];
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWebSeal = [Server operationURLForOperationIndex: LOGOUT_CLOSE_WSEAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"username="];
    [parameters appendString: _username];
    [parameters appendString: @"&"];
    [parameters appendString: @"password="];
    [parameters appendString: PASS_WEBSEAL];
    [parameters appendString: @"&"];
    [parameters appendString: @"login-form-type=pwd"];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWebSeal withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESPONSE_LOGOUT_WEBSEAL handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** Singoff Host **/
- (NSInteger) signOffHost:(NSString *) tarjeta forClient:(id<ServerClient>) client
{
    _username = [NSString stringWithFormat: @"%@ADMINF", tarjeta];
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWebSeal = [Server operationURLForOperationIndex: LOGOUT_CLOSE_HOST];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"username="];
    [parameters appendString: _username];
    [parameters appendString: @"&"];
    [parameters appendString: @"password="];
    [parameters appendString: PASS_WEBSEAL];
    [parameters appendString: @"&"];
    [parameters appendString: @"login-form-type=pwd"];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWebSeal withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESPONSE_LOGOUT_HOST handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** Catalogo de Bancos **/
- (NSInteger) catalogoBancos: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_CATALOGO_BANCOS];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_catalogo_bancos_op"               forKey: @"operacion"];
    [cadenaJSON setObject: @"imd_registro_cuentas_otros_bancos_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"catalogoBancos"                       forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    
    [cadenaJSON setObject:datosAplicativos forKey:@"datosAplicativos"];
    
    NSLog(@"__ JSON : %@",parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: CATALOGO_BANCOS handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** Reglas de Negocio **/
- (NSInteger) reglasNegocios: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client
{
    
    /* TODO ESTO ES INVENTADO PORQUE NO SABEMOS QUE VARIABLES HAY QUE PASAR EN LA PETICIÓN */
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    
    //    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_CATALOGO_BANCOS];
    
#if(APP_ESTADO == TEST || APP_ESTADO == SIMULATION)
    NSString *urlWas = @"https://148.244.45.93/mexiconetna2/mexiconetni/reglas_negocio_ipad.jsp?version=";
#elif (APP_ESTADO == PRODUCCION)
    NSString *urlWas = @"https://a1.bbvanet.com.mx/mexiconetni/mexiconetni/reglas_negocio_ipad.jsp?version=";
#elif (APP_ESTADO == PROD_LIGA_OCULTA)
    NSString *urlWas = @"https://a2.bbvanet.com.mx/mexiconetni/mexiconetni/reglas_negocio_ipad.jsp?version=";
#endif
    NSString *urlParameters = @"";
    
    NSLog(@"Recuperando reglas de negocio");
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: REGLAS_NEGOCIO handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

- (NSInteger) wtReglasNegocios: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client
{
    
    /* TODO ESTO ES INVENTADO PORQUE NO SABEMOS QUE VARIABLES HAY QUE PASAR EN LA PETICIÓN */
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    
    //    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_CATALOGO_BANCOS];
    
#if(APP_ESTADO == TEST || APP_ESTADO == SIMULATION)
    NSString *urlWas = @"https://148.244.45.93/mexiconetna2/mexiconetni/reglas_negocio_ipad.jsp?version=29";
#elif (APP_ESTADO == PRODUCCION)
    NSString *urlWas = @"https://a1.bbvanet.com.mx/mexiconetni/mexiconetni/reglas_negocio_ipad.jsp?version=29";
#elif (APP_ESTADO == PROD_LIGA_OCULTA)
    NSString *urlWas = @"https://a2.bbvanet.com.mx/mexiconetni/mexiconetni/reglas_negocio_ipad.jsp?version=29";
#endif
    NSString *urlParameters = @"";
    
    NSLog(@"Recuperando reglas de negocio");
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: REGLAS_NEGOCIO handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** Posicion Global **/
- (NSInteger) posicionGlobal: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client
{
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_posicionglobal_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_posicionglobal_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"posicionglobal"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: SIGN_ON2_POSICION_GLOBAL_3 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

- (NSInteger) movimientosCtasCheques:(NSString *)peticion forClient: (id<ServerClient>) client
{
    
    NSLog(@"Recuperando movimientos cuentas MXP");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    [parameters appendString: peticion.description];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: parameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
#if (APP_ESTADO == SIMULATION)
        if ([parameters rangeOfString:@"periodo = 0"].length > 0) {
            [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: MOVIMIENTOS_CTAS_PESOS_0 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
        }
        if ([parameters rangeOfString:@"periodo = 1"].length > 0) {
            [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: MOVIMIENTOS_CTAS_PESOS_1 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
        }
        if ([parameters rangeOfString:@"periodo = 2"].length > 0) {
            [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: MOVIMIENTOS_CTAS_PESOS_2 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
        }
#endif
    }
    
    ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
    
    NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
    
    [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    
    return downloadId;
}

- (NSInteger) movimientosCtasUSD:(NSArray *)peticion forClient:(id<ServerClient>)client
{
    NSLog(@"Recuperando movimientos cuentas USD");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    [parameters appendString: peticion.description];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: parameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
#if (APP_ESTADO == SIMULATION)
        if ([parameters rangeOfString:@"periodo = 0"].length > 0) {
            [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: MOVIMIENTOS_CTAS_DOLARES_0 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
        }
        if ([parameters rangeOfString:@"periodo = 1"].length > 0) {
            [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: MOVIMIENTOS_CTAS_DOLARES_1 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
        }
        if ([parameters rangeOfString:@"periodo = 2"].length > 0) {
            [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: MOVIMIENTOS_CTAS_DOLARES_2 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
        }
#endif
    }
    
    ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
    
    NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
    
    [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    
    return downloadId;
}

- (NSInteger) movimientosTDC:(NSArray *)peticion forClient:(id<ServerClient>)client
{
    NSLog(@"Recuperando movimientos cuentas TDC");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    [parameters appendString: peticion.description];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: parameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
#if (APP_ESTADO == SIMULATION)
        if ([parameters rangeOfString:@"periodo = 0"].length > 0) {
            [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: MOVIMIENTOS_TARJETAS_0 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
        }
        if ([parameters rangeOfString:@"periodo = 1"].length > 0) {
            [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: MOVIMIENTOS_TARJETAS_1 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
        }
        if ([parameters rangeOfString:@"periodo = 2"].length > 0) {
            [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: MOVIMIENTOS_TARJETAS_2 handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
        }
#endif
    }
    
    ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
    
    NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
    
    [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    
    return downloadId;
}

- (NSInteger) recuperaTasas:(NSArray *)peticion forClient:(id<ServerClient>)client
{
    NSLog(@"Recuperando Tasas ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    [parameters appendString: peticion.description];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: parameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: TASAS handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
    }
    
    ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
    
    NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
    
    [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    
    return downloadId;
}

- (NSInteger) registraTraspaso:(NSArray *)peticion forClient:(id<ServerClient>)client
{
    NSLog(@"Registrando Traspaso ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    [parameters appendString: peticion.description];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: parameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: TRANSFERIR_MIS_CUENTAS handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
    }
    
    ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
    
    NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
    
    [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    
    return downloadId;
}

- (NSInteger) pagoMinimoNoInteres:(NSString *)peticion forClient:(id<ServerClient>)client
{
    NSLog(@"Solicitando estado cuenta ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    [parameters appendString: peticion.description];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: parameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: PAGO_MINIMO_NO_INTERES handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
    }
    
    ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
    
    NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
    
    [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    
    return downloadId;
}

- (NSInteger) solicitaComision:(NSString *)peticion forClient:(id<ServerClient>)client
{
    NSLog(@"Solicitando comisión ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    [parameters appendString: peticion.description];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: parameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: COMISION handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
    }
    
    ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
    
    NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
    
    [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    
    return downloadId;
}

- (NSInteger) aplicaCompra:(NSArray*)peticion forClient:(id<ServerClient>)client
{
    NSLog(@"Aplicando compra ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    [parameters appendString: peticion.description];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: parameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: APLICA_COMPRA_INVERSION handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
    }
    
    ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
    
    NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
    
    [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    
    return downloadId;
}

#if (APP_ESTADO == SIMULATION)
/** Simulate Response **/
- (void) simulateServerResponseWithParams: (id) simulationParams
{
    SimulationParams* params = (SimulationParams*)simulationParams;
    
    NSData* data = [params.response dataUsingEncoding: NSISOLatin1StringEncoding allowLossyConversion: YES];
    
    NSString* response = [[NSString alloc] initWithData: data encoding: NSISOLatin1StringEncoding];
    
    NSLog(@"___ Respuesta Simulada : %@ ", response);
    
    [self simulateOperationId: params.downloadId withResponse: response andHandler: params.handler forClient: params.client];
}
#endif

/** consultaEstadoDeCuenta **/
- (NSInteger) consultaEstadoDeCuenta: (NSString*) usuario acceso: (NSString*) acceso numero: (NSString*) numero producto: (NSString*) producto formato: (NSString*) formato anio: (NSString*) anio mes: (NSString*) mes claveOperaciones: (NSString*) claveOperaciones OTP: (NSString*) OTP posicionTASA: (NSString*) posicionTASA valorPosicionTASA: (NSString*) valorPosicionTASA digitoVerficador: (NSString*) digitoVerficador valorDigitoVerficador: (NSString*) valorDigitoVerficador forClient: (id<ServerClient>) client
{
    NSLog(@"Recuperando Estados de cuentas ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_consulta_estado_cuenta_pdf_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_consulta_estado_cuenta_pdf_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"consultaEstadoDeCuenta"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: numero  forKey: @"numero"];
    [datosAplicativos setObject: producto  forKey: @"producto"];
    [datosAplicativos setObject: formato  forKey: @"formato"];
    [datosAplicativos setObject: anio  forKey: @"anio"];
    [datosAplicativos setObject: mes  forKey: @"mes"];
    [datosAplicativos setObject: claveOperaciones  forKey: @"claveOperaciones"];
    [datosAplicativos setObject: OTP  forKey: @"OTP"];
    [datosAplicativos setObject: posicionTASA  forKey: @"posicionTASA"];
    [datosAplicativos setObject: valorPosicionTASA  forKey: @"valorPosicionTASA"];
    [datosAplicativos setObject: digitoVerficador  forKey: @"digitoVerficador"];
    [datosAplicativos setObject: valorDigitoVerficador  forKey: @"valorDigitoVerficador"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: ESTADO_CUENTAS handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}


/** recuperaPeriodos **/
- (NSInteger) recuperaPeriodos: (NSString*) usuario acceso: (NSString*) acceso ident: (NSString*) ident forClient: (id<ServerClient>) client
{
    NSLog(@"Recuperando Periodos ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_consulta_estado_cuenta_pdf_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_consulta_estado_cuenta_pdf_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"consultaPeriodos"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: ident  forKey: @"id"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RECUPERA_PERIODOS handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** recuperaOperaciones Consulta Comprobantes **/
- (NSInteger) recuperaOperaciones:(NSString*) usuario acceso: (NSString*) acceso idPeriodo: (NSString*) idPeriodo tipoOperacion: (NSString*) tipoOperacion claveOperaciones: (NSString*) claveOperaciones otp: (NSString*) otp tipoEjecucion: (NSString*) tipoEjecucion  forClient: (id<ServerClient>) client
{
    NSLog(@"Consulta Comprobantes ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_consulta_comprobante_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_consulta_comprobante_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"confirma"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: idPeriodo  forKey: @"idPeriodo"];
    [datosAplicativos setObject: tipoOperacion  forKey: @"tipoOperacion"];
    [datosAplicativos setObject: claveOperaciones  forKey: @"claveOperaciones"];
    [datosAplicativos setObject: otp  forKey: @"otp"];
    [datosAplicativos setObject: tipoEjecucion  forKey: @"tipoEjecucion"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: MOSTRAR_COMPROBANTES handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** recuperaListasFrecuentes **/
- (NSInteger) recuperaListasFrecuentes: (NSString*) usuario acceso: (NSString*) acceso idAplicacion: (NSString*) idAplicacion forClient: (id<ServerClient>) client
{
    NSLog(@"Recuperando Lista Frecuentes ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_traspaso_tercero_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_listas_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"listarCuentasFrecuentes"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: idAplicacion  forKey: @"idAplicacion"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: LISTA_CUENTAS_FRECUENTES handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}


-(NSInteger) recuperaListasFrecuentesInterbancaria:(NSString *)usuario acceso:(NSString *)acceso idAplicacion:(NSString *)idAplicacion forClient:(id<ServerClient>)client
{
    
    
    NSLog(@"Recuperando Lista Frecuentes ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_transferencias_interbancarias_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_listas_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"listarCuentasFrecuentes"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: idAplicacion  forKey: @"idAplicacion"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: LISTA_CUENTAS_FRECUENTES handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
    
    
}


/** recuperaListasFrecuentes **/
- (NSInteger) recuperaListasPreregistradas: (NSString*) usuario acceso: (NSString*) acceso idAplicacion: (NSString*) idAplicacion forClient: (id<ServerClient>) client
{
    NSLog(@"Recuperando Lista Preregistradas ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_traspaso_tercero_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_listas_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"listarCuentasPreregistradas"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: idAplicacion  forKey: @"idAplicacion"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: LISTA_CUENTAS_PREREGISTRADAS handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}


/** recuperaListasFrecuentes **/
- (NSInteger) recuperaListasPreregistradasInterbancaria: (NSString*) usuario acceso: (NSString*) acceso idAplicacion: (NSString*) idAplicacion forClient: (id<ServerClient>) client
{
    NSLog(@"Recuperando Lista Preregistradas ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_transferencias_interbancarias_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_listas_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"listarCuentasPreregistradas"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: idAplicacion  forKey: @"idAplicacion"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: LISTA_CUENTAS_PREREGISTRADAS handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}



/** realizarTraspaso **/
- (NSInteger) realizarTraspaso: (NSString*) usuario acceso: (NSString*) acceso fechaOperacion: (NSString*) fechaOperacion idAsuntoCargo: (NSString*) idAsuntoCargo idAsuntoAbono: (NSString*) idAsuntoAbono nombreBeneficiario: (NSString*) nombreBeneficiario importe: (NSString*) importe rfc: (NSString*) rfc iva: (NSString*) iva nombreCorto: (NSString*) nombreCorto email: (NSString*) email claveOperacion: (NSString*) claveOperacion otp: (NSString*) otp tripletaTasa: (NSString*) tripletaTasa digitoVerificador: (NSString*) digitoVerificador periodo: (NSString*) periodo fechaInicio: (NSString*) fechaInicio fechaFin: (NSString*) fechaFin  repeticiones: (NSString*) repeticiones nombreCortoPeriodico: (NSString*) nombreCortoPeriodico  forClient: (id<ServerClient>) client
{
    NSLog(@"Realizar traspaso ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_traspaso_tercero_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_traspaso_tercero_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"realizarTraspaso" forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: fechaOperacion  forKey: @"fechaOperacion"];
    [datosAplicativos setObject: idAsuntoCargo  forKey: @"idAsuntoCargo"];
    [datosAplicativos setObject: idAsuntoAbono  forKey: @"idAsuntoAbono"];
    [datosAplicativos setObject: nombreBeneficiario  forKey: @"nombreBeneficiario"];
    [datosAplicativos setObject: importe  forKey: @"importe"];
    [datosAplicativos setObject: rfc  forKey: @"rfc"];
    [datosAplicativos setObject: iva  forKey: @"iva"];
    [datosAplicativos setObject: nombreCorto  forKey: @"nombreCorto"];
    [datosAplicativos setObject: email  forKey: @"email"];
    [datosAplicativos setObject: claveOperacion  forKey: @"claveOperacion"];
    [datosAplicativos setObject: otp  forKey: @"otp"];
    [datosAplicativos setObject: tripletaTasa   forKey: @"tripletaTasa "];
    [datosAplicativos setObject: digitoVerificador   forKey: @"digitoVerificador "];
    [datosAplicativos setObject: periodo  forKey: @"periodo"];
    [datosAplicativos setObject: fechaInicio  forKey: @"fechaInicio"];
    [datosAplicativos setObject: fechaFin  forKey: @"fechaFin"];
    [datosAplicativos setObject: repeticiones  forKey: @"repeticiones"];
    [datosAplicativos setObject: nombreCortoPeriodico  forKey: @"nombreCortoPeriodico"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESULTADO_TRASPASO handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}



- (NSInteger) realizarTraspasoInterbancaria3: (NSString*) usuario acceso: (NSString*) acceso standin: (NSString*) standin idCtaCargo: (NSString*) idCtaCargo idCtaBeneficiaria: (NSString*) idCtaBeneficiaria dia: (NSString*) dia mes: (NSString*) mes anio: (NSString*) anio fechaPosterior: (NSString*) fechaPosterior tipoRetiro: (NSString*) tipoRetiro importe: (NSString*) importe concepto: (NSString*) concepto referenciaNumerica: (NSString*) referenciaNumerica reqComprobanteFiscal: (NSString*) reqComprobanteFiscal RFC: (NSString*) RFC iva: (NSString*) iva indicaFrecuente: (NSString*) indicaFrecuente nombreCorto: (NSString*) nombreCorto  emailBeneficiario: (NSString*) emailBeneficiario claveOperaciones: (NSString*) claveOperaciones otp: (NSString*) otp tripletaTasa: (NSString*) tripletaTasa digitoVerificador: (NSString*) digitoVerificador nombreCortoRecurrente: (NSString*) nombreCortoRecurrente frecuencia: (NSString*) frecuencia fechaInicio: (NSString*) fechaInicio numRepeticiones: (NSString*) numRepeticiones fechaFin: (NSString*) fechaFin  forClient: (id<ServerClient>) client
{
    NSLog(@"Realizar traspaso ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_transferencias_interbancarias_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_transferencias_interbancarias_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"aplicaTI" forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso.description forKey: @"acceso"];
//	[datosAplicativos setObject: standin forKey: @"standin"];
	[datosAplicativos setObject: idCtaCargo forKey: @"idCtaCargo"];
	[datosAplicativos setObject: idCtaBeneficiaria forKey: @"idCtaBeneficiaria"];
	[datosAplicativos setObject: dia.description forKey: @"dia"];
	[datosAplicativos setObject: mes forKey: @"mes"];
	[datosAplicativos setObject: anio.description forKey: @"anio"];
	[datosAplicativos setObject: fechaPosterior forKey: @"fechaPosterior"];
	[datosAplicativos setObject: tipoRetiro forKey: @"tipoRetiro"];
	[datosAplicativos setObject: importe forKey: @"importe"];
	[datosAplicativos setObject: concepto forKey: @"concepto"];
	[datosAplicativos setObject: referenciaNumerica forKey: @"referenciaNumerica"];
	[datosAplicativos setObject: reqComprobanteFiscal forKey: @"reqComprobanteFiscal"];
	[datosAplicativos setObject: RFC forKey: @"RFC"];
	[datosAplicativos setObject: iva forKey: @"iva"];
	[datosAplicativos setObject: indicaFrecuente forKey: @"indicaFrecuente"];
	[datosAplicativos setObject: nombreCorto forKey: @"nombreCorto"];
	[datosAplicativos setObject: emailBeneficiario forKey: @"emailBeneficiario"];
	[datosAplicativos setObject: claveOperaciones forKey: @"claveOperaciones"];
    [datosAplicativos setObject: otp forKey: @"otp"];
    [datosAplicativos setObject: tripletaTasa forKey: @"tripletaTasa"];
    [datosAplicativos setObject: digitoVerificador forKey: @"digitoVerificador"];
    [datosAplicativos setObject: nombreCortoRecurrente forKey: @"nombreCortoRecurrente"];
    [datosAplicativos setObject: frecuencia forKey: @"frecuencia"];
    [datosAplicativos setObject: fechaInicio forKey: @"fechaInicio"];
    [datosAplicativos setObject: numRepeticiones forKey: @"numRepeticiones"];
    [datosAplicativos setObject: fechaFin forKey: @"fechaFin"];
    
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESULTADO_TRASPASO handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}
- (NSInteger) realizarTraspasoInterbancaria3TDCFrecuente: (NSString*) usuario acceso: (NSString*) acceso standin: (NSString*) standin idCtaCargo: (NSString*) idCtaCargo idCtaBeneficiaria: (NSString*) idCtaBeneficiaria dia: (NSString*) dia mes: (NSString*) mes anio: (NSString*) anio fechaPosterior: (NSString*) fechaPosterior tipoRetiro: (NSString*) tipoRetiro importe: (NSString*) importe concepto: (NSString*) concepto referenciaNumerica: (NSString*) referenciaNumerica reqComprobanteFiscal: (NSString*) reqComprobanteFiscal RFC: (NSString*) RFC iva: (NSString*) iva indicaFrecuente: (NSString*) indicaFrecuente nombreCorto: (NSString*) nombreCorto  emailBeneficiario: (NSString*) emailBeneficiario claveOperaciones: (NSString*) claveOperaciones otp: (NSString*) otp tripletaTasa: (NSString*) tripletaTasa digitoVerificador: (NSString*) digitoVerificador nombreCortoRecurrente: (NSString*) nombreCortoRecurrente frecuencia: (NSString*) frecuencia fechaInicio: (NSString*) fechaInicio numRepeticiones: (NSString*) numRepeticiones fechaFin: (NSString*) fechaFin  forClient: (id<ServerClient>) client
{
    NSLog(@"Realizar traspaso ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_transferencias_interbancarias_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_transferencias_interbancarias_tdc_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"aplicaTI" forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso.description forKey: @"acceso"];
    //	[datosAplicativos setObject: standin forKey: @"standin"];
    [datosAplicativos setObject: idCtaCargo forKey: @"idCtaCargo"];
    [datosAplicativos setObject: idCtaBeneficiaria forKey: @"idCtaBeneficiaria"];
    [datosAplicativos setObject: dia.description forKey: @"dia"];
    [datosAplicativos setObject: mes forKey: @"mes"];
    [datosAplicativos setObject: anio.description forKey: @"anio"];
    [datosAplicativos setObject: fechaPosterior forKey: @"fechaPosterior"];
    [datosAplicativos setObject: tipoRetiro forKey: @"tipoRetiro"];
    [datosAplicativos setObject: importe forKey: @"importe"];
    [datosAplicativos setObject: concepto forKey: @"concepto"];
    [datosAplicativos setObject: referenciaNumerica forKey: @"referenciaNumerica"];
    [datosAplicativos setObject: reqComprobanteFiscal forKey: @"reqComprobanteFiscal"];
    [datosAplicativos setObject: RFC forKey: @"RFC"];
    [datosAplicativos setObject: iva forKey: @"iva"];
    [datosAplicativos setObject: indicaFrecuente forKey: @"indicaFrecuente"];
    [datosAplicativos setObject: nombreCorto forKey: @"nombreCorto"];
    [datosAplicativos setObject: emailBeneficiario forKey: @"emailBeneficiario"];
    [datosAplicativos setObject: claveOperaciones forKey: @"claveOperaciones"];
    [datosAplicativos setObject: otp forKey: @"otp"];
    [datosAplicativos setObject: tripletaTasa forKey: @"tripletaTasa"];
    [datosAplicativos setObject: digitoVerificador forKey: @"digitoVerificador"];
    [datosAplicativos setObject: nombreCortoRecurrente forKey: @"nombreCortoRecurrente"];
    [datosAplicativos setObject: frecuencia forKey: @"frecuencia"];
    [datosAplicativos setObject: fechaInicio forKey: @"fechaInicio"];
    [datosAplicativos setObject: numRepeticiones forKey: @"numRepeticiones"];
    [datosAplicativos setObject: fechaFin forKey: @"fechaFin"];
    
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESULTADO_TRASPASO handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}


- (NSInteger) realizarTraspasoInterbancaria3TDC: (NSString*) usuario acceso: (NSString*) acceso standin: (NSString*) standin idCtaCargo: (NSString*) idCtaCargo idCtaBeneficiaria: (NSString*) idCtaBeneficiaria dia: (NSString*) dia mes: (NSString*) mes anio: (NSString*) anio fechaPosterior: (NSString*) fechaPosterior tipoRetiro: (NSString*) tipoRetiro importe: (NSString*) importe concepto: (NSString*) concepto referenciaNumerica: (NSString*) referenciaNumerica reqComprobanteFiscal: (NSString*) reqComprobanteFiscal RFC: (NSString*) RFC iva: (NSString*) iva indicaFrecuente: (NSString*) indicaFrecuente nombreCorto: (NSString*) nombreCorto  emailBeneficiario: (NSString*) emailBeneficiario claveOperaciones: (NSString*) claveOperaciones otp: (NSString*) otp tripletaTasa: (NSString*) tripletaTasa digitoVerificador: (NSString*) digitoVerificador nombreCortoRecurrente: (NSString*) nombreCortoRecurrente frecuencia: (NSString*) frecuencia fechaInicio: (NSString*) fechaInicio numRepeticiones: (NSString*) numRepeticiones fechaFin: (NSString*) fechaFin  forClient: (id<ServerClient>) client
{
    NSLog(@"Realizar traspaso ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_transferencias_interbancarias_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_transferencias_interbancarias_tdc_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"aplicaTI" forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso.description forKey: @"acceso"];
    //	[datosAplicativos setObject: standin forKey: @"standin"];
    [datosAplicativos setObject: idCtaCargo forKey: @"idCtaCargo"];
    [datosAplicativos setObject: idCtaBeneficiaria forKey: @"idCtaBeneficiaria"];
    [datosAplicativos setObject: dia.description forKey: @"dia"];
    [datosAplicativos setObject: mes forKey: @"mes"];
    [datosAplicativos setObject: anio.description forKey: @"anio"];
    [datosAplicativos setObject: fechaPosterior forKey: @"fechaPosterior"];
    [datosAplicativos setObject: tipoRetiro forKey: @"tipoRetiro"];
    [datosAplicativos setObject: importe forKey: @"importe"];
    [datosAplicativos setObject: concepto forKey: @"concepto"];
    [datosAplicativos setObject: referenciaNumerica forKey: @"referenciaNumerica"];
    [datosAplicativos setObject: reqComprobanteFiscal forKey: @"reqComprobanteFiscal"];
    [datosAplicativos setObject: RFC forKey: @"RFC"];
    [datosAplicativos setObject: iva forKey: @"iva"];
    [datosAplicativos setObject: indicaFrecuente forKey: @"indicaFrecuente"];
    [datosAplicativos setObject: nombreCorto forKey: @"nombreCorto"];
    [datosAplicativos setObject: emailBeneficiario forKey: @"emailBeneficiario"];
    [datosAplicativos setObject: claveOperaciones forKey: @"claveOperaciones"];
    [datosAplicativos setObject: otp forKey: @"otp"];
    [datosAplicativos setObject: tripletaTasa forKey: @"tripletaTasa"];
    [datosAplicativos setObject: digitoVerificador forKey: @"digitoVerificador"];
    [datosAplicativos setObject: nombreCortoRecurrente forKey: @"nombreCortoRecurrente"];
    [datosAplicativos setObject: frecuencia forKey: @"frecuencia"];
    [datosAplicativos setObject: fechaInicio forKey: @"fechaInicio"];
    [datosAplicativos setObject: numRepeticiones forKey: @"numRepeticiones"];
    [datosAplicativos setObject: fechaFin forKey: @"fechaFin"];
    
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESULTADO_TRASPASO handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** consultaBeneficiario **/
- (NSInteger) consultaBeneficiario: (NSString*) usuario acceso: (NSString*) acceso asunto: (NSString*) asunto celular: (NSString*) celular esCuentaExpress: (NSString*) esCuentaExpress forClient: (id<ServerClient>) client;
{
    NSLog(@"Consulta beneficiario ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_traspaso_tercero_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_registro_cuenta_tercero_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"consultaBeneficiario"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: asunto  forKey: @"asunto"];
    [datosAplicativos setObject: celular  forKey: @"celular"];
    [datosAplicativos setObject: esCuentaExpress  forKey: @"esCuentaExpress"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESULTADO_BENEFICIARIO handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
		
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}





/** cargaPreregistro transferencias terceros 4 pasos **/
- (NSInteger) getServerMode: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;
{
    NSLog(@"get Server Mode ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    
	
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    
    NSString  *resultadoServerTest = @"";
    
    #if (SIMULATION == 1)
    
    resultadoServerTest = @"{\"s_lit_idioma\":\"CAS\",\"respuesta\": { \"servidorMode\": \"simulacion\" }}";
    
    #else
    
    resultadoServerTest = @"{\"s_lit_idioma\":\"CAS\",\"respuesta\": { \"servidorMode\": \"test\" }}";
    
    #endif
    
    
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: resultadoServerTest handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];

#endif
        
		NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
		
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
		
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}






/** cargaPreregistro transferencias terceros 4 pasos **/
- (NSInteger) cargaPreregistro: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;
{
    NSLog(@"carga Preregistro  ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_traspaso_tercero_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_carga_preregistro_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"cargaPreregistro" forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESULTADO_CARGAPREREGISTRO handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
		
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}





/** cargaPreregistro transferencias interbancarias 4 pasos **/
- (NSInteger) cargaPreregistroInterbancaria: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client;
{
    NSLog(@"carga Preregistro  ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_traspaso_tercero_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_carga_preregistro_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"cargaPreregistro" forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    
	
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESULTADO_CARGAPREREGISTRO handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
		NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
		
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
		
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}







/** PREREGISTRO CUENTA TERCEROS **/
- (NSInteger) preregistrarCuenta:  (NSString*) usuario acceso: (NSString*) acceso asunto: (NSString*) asunto tipoRegistro: (NSString*) tipoRegistro nombreBeneficiario: (NSString*) nombreBeneficiario otp: (NSString*) otp tripletaTasa: (NSString*) tripletaTasa digitoVerificador: (NSString*) digitoVerificador indicadorClienteBnet: (NSString*) indicadorClienteBnet forClient: (id<ServerClient>) client;
{
    NSLog(@"Preregistrar Cuenta ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_traspaso_tercero_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_registro_cuenta_tercero_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"preregistrarCuenta" forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: asunto  forKey: @"asunto"];
    [datosAplicativos setObject: tipoRegistro  forKey: @"tipoRegistro"];
    
    [datosAplicativos setObject: nombreBeneficiario forKey: @"nombreBeneficiario"];
    [datosAplicativos setObject: otp  forKey: @"otp"];
    [datosAplicativos setObject: tripletaTasa  forKey: @"tripletaTasa"];
    [datosAplicativos setObject: digitoVerificador  forKey: @"digitoVerificador"];
    
    [datosAplicativos setObject: indicadorClienteBnet forKey: @"indicadorClienteBnet"];
    
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESULTADO_PREREGISTROTERCEROS handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
		
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}









/** PREREGISTRO CUENTA interbancarias **/
- (NSInteger) preregistrarCuentaInterbancarias:  (NSString*) usuario acceso: (NSString*) acceso claveOperaciones: (NSString*) claveOperaciones digitoVerificador: (NSString*) digitoVerificador idBanco: (NSString*) idBanco nombreBeneficiario: (NSString*) nombreBeneficiario numCtaDeposito: (NSString*) numCtaDeposito otp: (NSString*) otp tipoCredito: (NSString*) tipoCredito  tipoCuenta: (NSString*) tipoCuenta  tipoRegistro: (NSString*) tipoRegistro  tripletaTasa: (NSString*) tripletaTasa  forClient: (id<ServerClient>) client;

{
    NSLog(@"Preregistrar Cuenta ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_registro_cuentas_otros_bancos_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_registro_cuentas_otros_bancos_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"preregistrarCuenta" forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
	[datosAplicativos setObject: claveOperaciones  forKey: @"claveOperaciones"];
	[datosAplicativos setObject: tipoRegistro  forKey: @"tipoRegistro"];
    
    [datosAplicativos setObject: nombreBeneficiario forKey: @"nombreBeneficiario"];
    [datosAplicativos setObject: otp  forKey: @"otp"];
	[datosAplicativos setObject: tripletaTasa  forKey: @"tripletaTasa"];
	[datosAplicativos setObject: digitoVerificador  forKey: @"digitoVerificador"];
    
    [datosAplicativos setObject: idBanco forKey: @"idBanco"];
        [datosAplicativos setObject: numCtaDeposito forKey: @"numCtaDeposito"];
        [datosAplicativos setObject: tipoCredito forKey: @"tipoCredito"];
        [datosAplicativos setObject: tipoCuenta forKey: @"tipoCuenta"];
    
	
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (SIMULATION == 1)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: RESULTADO_PREREGISTROINTER handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
		NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
		
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
		
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}











/** permitirFrecuentes **/
- (NSInteger) permitirFrecuentes: (NSString*) usuario acceso: (NSString*) acceso idAplicacion: (NSString*) idAplicacion forClient: (id<ServerClient>) client
{
    NSLog(@"Permitir Frecuentes ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_traspaso_tercero_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_permitir_frecuentes_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"permitirFrecuentes"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: idAplicacion  forKey: @"idAplicacion"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: PERMITIR_FRECUENTES handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** envioEmail **/
- (NSInteger) envioEmail: (NSString*) operacion proceso: (NSString*) proceso usuario: (NSString*) usuario acceso: (NSString*) acceso emailBeneficiario: (NSString*) emailBeneficiario mensaje: (NSString*) mensaje copiaTitular: (NSString*) copiaTitular forClient: (id<ServerClient>) client
{
    NSLog(@"envioEmail ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: proceso forKey: @"proceso"];
    [cadenaJSON setObject: operacion forKey: @"operacion"];
    [cadenaJSON setObject: @"envioEmail"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: emailBeneficiario  forKey: @"emailBeneficiario"];
    [datosAplicativos setObject: mensaje  forKey: @"mensaje"];
    [datosAplicativos setObject: copiaTitular  forKey: @"copiaTitular"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: ENVIO_EMAIL handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

/** wtenvioEmail **/
- (NSInteger) wtenvioEmail: (NSString*) acceso emailBeneficiario: (NSString*) emailBeneficiario mensaje: (NSString*) mensaje copiaTitular: (NSString*) copiaTitular tipoEnvio: (NSString *) tipoEnvio forClient: (id<ServerClient>) client
{
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    
    //NSLog(@"___tipoEnvio : %@", tipoEnvio);
    NSString* valorTipo = @"1";
    //NSLog(@"___valorTipo : %@", valorTipo);
    if ([[NSString stringWithFormat:@"%@" ,tipoEnvio] isEqualToString:@"1"]) {
        [cadenaJSON setObject: @"imd_ob_consulta_capitales_pr" forKey: @"proceso"];
        [cadenaJSON setObject: @"imd_ob_cancela_orden_op" forKey: @"operacion"];
        [cadenaJSON setObject: @"envioEmail" forKey: @"accion"];
    } else {
        [cadenaJSON setObject: @"imd_ob_acciones_pr" forKey: @"proceso"];
        [cadenaJSON setObject: @"imd_ob_acciones_op" forKey: @"operacion"];
        [cadenaJSON setObject: @"envioEmail" forKey: @"accion"];
    }
    
       
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: @"ADMINF" forKey: @"usuario"];
    [datosAplicativos setObject: _username forKey: @"acceso"];
    [datosAplicativos setObject: emailBeneficiario  forKey: @"emailBeneficiario"];
    [datosAplicativos setObject: mensaje  forKey: @"mensaje"];
    [datosAplicativos setObject: copiaTitular  forKey: @"copiaTitular"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: ENVIO_EMAIL handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

- (NSInteger) wtListaCuentas: (NSString*) tarjeta numero: (NSString*) numCont forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_ob_traspaso_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_ob_traspaso_efectivo_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"listaCuentas"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: tarjeta forKey: @"acceso"];
    [datosAplicativos setObject: numCont  forKey: @"idContratoPatrimonial"];
    [datosAplicativos setObject: @"ADMINF"  forKey: @"usuario"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: ENVIO_EMAIL handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

- (NSInteger) wtDiaHabil: (NSString*) tarjeta forClient: (id<ServerClient>) client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_transferencias_interbancarias_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_transferencias_interbancarias_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"datosRegistroPago"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: tarjeta forKey: @"acceso"];
    [datosAplicativos setObject: @"ADMINF"  forKey: @"usuario"];
    [datosAplicativos setObject: @""  forKey: @"standin"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: ENVIO_EMAIL handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;

}

- (NSInteger) wtaplicaTraspaso:(NSString *)tarjeta numero:(NSString *)numCont idCuentaCargo:(NSString *)idCuentaCargo importe:(NSString *)importe forClient:(id<ServerClient>)client
{
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSDateFormatter* formatter_wt = [[NSDateFormatter alloc] init];
    [formatter_wt setDateFormat:@"dd/mm/yyyy"];
    NSString *date_wt = [formatter_wt stringFromDate:[NSDate date]];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_ob_traspaso_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_ob_traspaso_efectivo_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"aplicaTraspaso"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: tarjeta forKey: @"acceso"];
    [datosAplicativos setObject: @"00000000"  forKey: @"claveOperaciones"];
    [datosAplicativos setObject: date_wt  forKey: @"fechaOperacion"];
    [datosAplicativos setObject: numCont forKey: @"idCuentaAbono"];
    [datosAplicativos setObject: idCuentaCargo  forKey: @"idCuentaCargo"];
    [datosAplicativos setObject: importe  forKey: @"importe"];
    [datosAplicativos setObject: @"ADMINF" forKey: @"usuario"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: ENVIO_EMAIL handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

- (NSInteger) envioEmailInterbancario: (NSString*) operacion proceso: (NSString*) proceso acceso: (NSString*)acceso concepto: (NSString*)concepto copiaTitlar: (NSString*)copiaTitular emailBeneficiario: (NSString*)emailBeneficiario idCtaBeneficiaria: (NSString*)idCtaBeneficiaria idCtaCargo: (NSString*)idCtaCargo importe: (NSString*)importe mensaje: (NSString*)mensaje referenciaNumerica: (NSString*)referenciaNumerica tipoRetiro: (NSString*)tipoRetiro usuario: (NSString*)usuario fechaAplicacion:(NSString*)fechaAplicacion forClient: (id<ServerClient>) client;
{
    NSLog(@"envioEmail ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: proceso forKey: @"proceso"];
    [cadenaJSON setObject: operacion forKey: @"operacion"];
    [cadenaJSON setObject: @"enviaCorreo"        forKey: @"accion"];
    

    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    [datosAplicativos setObject: concepto  forKey: @"concepto"];
    [datosAplicativos setObject: copiaTitular  forKey: @"copiaTitular"];
    [datosAplicativos setObject: emailBeneficiario  forKey: @"emailBeneficiario"];
    [datosAplicativos setObject: idCtaBeneficiaria  forKey: @"idCtaBeneficiaria"];
    [datosAplicativos setObject: idCtaCargo  forKey: @"idCtaCargo"];
    [datosAplicativos setObject: importe  forKey: @"importe"];
    [datosAplicativos setObject: mensaje  forKey: @"mensaje"];
    [datosAplicativos setObject: referenciaNumerica  forKey: @"referenciaNumerica"];
    [datosAplicativos setObject: tipoRetiro forKey: @"tipoRetiro"];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: fechaAplicacion forKey: @"fechaAplicacion"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];

    NSLog(@"___ JSON _mar: %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: ENVIO_EMAIL handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

- (NSInteger) recuperaFestivos:(NSString *)peticion forClient:(id<ServerClient>)client
{
    NSLog(@"Recuperando festivos ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    [parameters appendString: peticion.description];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: parameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: FESTIVOS handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
    }
    
    ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
    
    NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
    
    [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    
    return downloadId;
}

- (NSInteger) aplicaVenta:(NSString *)aplicaVenta forClient:(id<ServerClient>)client
{
    NSLog(@"Recuperando aplica Venta ...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    [parameters appendString: aplicaVenta.description];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: parameters andHandler: responseHandler forClient: self storeCookies: NO andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: APLICA_VENTA handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
    }
    
    ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
    
    NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
    
    [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    
    return downloadId;}



/** recuperaListaTitulos **/
- (NSInteger) recuperaListaTitulos: (NSString*) usuario acceso: (NSString*) acceso forClient: (id<ServerClient>) client
{
    NSLog(@"Recuperar Lista Títulos...");
    
    ServerResponse* responseHandler = [[ServerResponse alloc] init];
    
    NSString* urlWas = [Server operationURLForOperationIndex: CONSULTA_POSICION_GLOBAL];
    
    
    NSMutableString *parameters = [NSMutableString stringWithString: @""];
    [parameters appendString: @"cadenaJSON="];
    
    NSMutableDictionary *cadenaJSON = [[NSMutableDictionary alloc] init];
    [cadenaJSON setObject: @"imd_inversiones_a_plazo_venta_pr" forKey: @"proceso"];
    [cadenaJSON setObject: @"imd_inversiones_a_plazo_venta_op" forKey: @"operacion"];
    [cadenaJSON setObject: @"listaTitulo"        forKey: @"accion"];
    
    NSMutableDictionary *datosAplicativos = [[NSMutableDictionary alloc] init];
    [datosAplicativos setObject: usuario forKey: @"usuario"];
    [datosAplicativos setObject: acceso  forKey: @"acceso"];
    
    [cadenaJSON setObject: datosAplicativos forKey: @"datosAplicativos"];
    
    NSLog(@"___ JSON : %@", parameters);
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: cadenaJSON options: NSJSONWritingPrettyPrinted error: &error];
    NSString *jsonString = nil;
    
    if (!jsonData) { NSLog(@"___ Hubo un error : %@", error); }
    else { jsonString = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding]; }
    
    [parameters appendString: jsonString];
    
    NSLog(@"___ Parametros : %@", parameters);
    
    NSString *urlParameters = parameters;
    
    NSInteger downloadId = [self invokeOperationToURL: urlWas withParameters: urlParameters andHandler: responseHandler forClient: self storeCookies: YES andUseStoredCookies: NO];
    
    if (downloadId >= 0) {
        
#if (APP_ESTADO == SIMULATION)
        [self performSelector: @selector(simulateServerResponseWithParams:) withObject: [SimulationParams simulationParamsWithDownloadId: downloadId response: LISTA_TITULOS handler: responseHandler andClient: self] afterDelay: SIMULATION_RESPONSE_TIME];
#endif
        
        NSNumber* downloadIdNumber = [NSNumber numberWithInteger: downloadId];
        
        ServerDownloadInfo* downloadInfo = [ServerDownloadInfo serverDownloadInfoWithServerResponse: responseHandler andClient: client];
        
        [_pendingOperations setObject: downloadInfo forKey: downloadIdNumber];
    }
    
    return downloadId;
}

@end