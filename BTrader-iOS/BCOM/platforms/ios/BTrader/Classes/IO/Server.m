#import "Server.h"
#import "ServerResponse.h"
#import "Constantes.h"

    /* Defines the simulator response delay (in seconds) */
#define SIMULATION_RESPONSE_TIME									1.0f

@interface Server()

+ (NSString*) baseURL;

+ (NSString*) operationURLForOperationIndex: (NSUInteger) anOperationIndex;

+ (NSString*) operationCodeForOperationIndex: (NSUInteger) anOperationIndex;

+ (void) initOperationCodes;

+ (NSString*) constructURLParamsForOperation: (NSUInteger) anOperation usingOperationParams: (NSString*) anOperationParameters;

    #if (APP_ESTADO == 0)
- (void) simulateServerResponseWithParams: (id) aSimulationParams;
    #endif

@end


@implementation Server

static Server* _serverInstance = nil;

#if (APP_ESTADO ==  SIMULATION)
//static NSString* _baseURL = @"";
#endif

    #if (PROVIDER == GONET)
static NSString* _baseURL = @"http://127.0.0.1:8080";
    #elif (USE_DEVELOPMENT_SERVER > 0)
        #if(APP_ESTADO == TEST || APP_ESTADO ==  SIMULATION)
            static NSString* _baseURL = @"https://148.244.45.93/mexiconetna2/mexiconetni";
        #elif (APP_ESTADO == PRODUCCION)
            static NSString* _baseURL = @"https://a1.bbvanet.com.mx/mexiconetni/mexiconetni";
        #elif (APP_ESTADO == PROD_LIGA_OCULTA)
            static NSString* _baseURL = @"https://a2.bbvanet.com.mx/mexiconetni/mexiconetni";
        #endif
    #else
static NSString* _baseURL = @"";
    #endif

static NSArray* _operationsURLs = nil;
static NSArray* _operationCodes = nil;


@synthesize urlBase = _urlBase;


+ (id) allocWithZone: (NSZone*) zone
{
    @synchronized([Server class]) {
		if (_serverInstance == nil) {
			_serverInstance = [super allocWithZone: zone];
			return _serverInstance;
		}
	}
	
	return nil;
}

+ (NSString*) urlCorta
{
	NSString *url;

    #if(PROVIDER ==GONET)
        #if(APP_ESTADO == TEST || APP_ESTADO == SIMULATION)
            temporal=@"https://148.244.45.93";
        #elif (APP_ESTADO == PRODUCCION)
            temporal = @"https://a1.bbvanet.com.mx";
        #elif (APP_ESTADO == PROD_LIGA_OCULTA)
            temporal = @"https://a2.bbvanet.com.mx";
        #endif
    #else
        #if(APP_ESTADO == TEST || APP_ESTADO == SIMULATION)
            url=@"https://148.244.45.93";
        #elif (APP_ESTADO == PRODUCCION)
            url = @"https://a1.bbvanet.com.mx";
        #elif (APP_ESTADO == PROD_LIGA_OCULTA)
            url = @"https://a2.bbvanet.com.mx";
        #endif
    #endif
    
	return url;
}


+ (NSString*) baseURL
{
	return _baseURL;
}

+ (void) setBaseUrl: (NSString *) url
{
        #if (PROVIDER == GONET)
    _baseURL = @"http://127.0.0.1:8080";
        #elif (USE_DEVELOPMENT_SERVER > 0 || APP_ESTADO == TEST || APP_ESTADO == SIMULATION)
            _baseURL = @"https://148.244.45.93/mexiconetna2/mexiconetni";
        #elif (USE_DEVELOPMENT_SERVER > 0 || APP_ESTADO == PRODUCCION)
            _baseURL = @"https://a1.bbvanet.com.mx/mexiconetni/mexiconetni";
        #elif (USE_DEVELOPMENT_SERVER > 0 || APP_ESTADO == PROD_LIGA_OCULTA)
            _baseURL = @"https://a2.bbvanet.com.mx/mexiconetni/mexiconetni";
        #else
    _baseURL = url;
        #endif
}

- (void) cancelPendingOperations
{
	NSArray* downloadsIdArray = [_pendingOperations allKeys];
	
	for (NSNumber* downloadId in downloadsIdArray) {
		[_httpInvoker cancelDownload: [downloadId integerValue]];
	}
	
	[_pendingOperations removeAllObjects];
}


- (id) copyWithZone: (NSZone*) zone
{
    return self;
}

+ (Server*) getInstance
{
	if (_serverInstance == nil) {
		@synchronized ([Server class]) {
			if (_serverInstance == nil) {
				_serverInstance = [[Server alloc] init];
			}
		}
	}
	
    NSLog(@"* SERVIDOR - = %i", PROVIDER);

	return _serverInstance;
}

- (id) init
{
	static BOOL initialized = NO;
	
	if (initialized == NO) {
		if (self = [super init]) {
			_httpInvoker = [HTTPInvoker getInstance];
			_pendingOperations = [[NSMutableDictionary alloc] init];
			
			initialized = YES;
		}
	}
	
	return self;
}


+ (void) initOperationCodes
{
	_operationCodes = [[NSArray alloc] initWithObjects: @"00", @"01", @"02", @"03", @"04", @"05", @"06", @"07", @"08", @"09",
                                                        @"10", @"11", @"12", @"13", @"14", @"15", @"16", @"17", @"18", @"19",
                                                        @"20", nil];
}


+ (void) initOperationsURLs
{
    NSString* urlCorta = [Server urlCorta];
    
        #if (PROVIDER == GONET)
	_operationsURLs = [[NSArray alloc] initWithObjects:
					   [urlCorta stringByAppendingString: @"/pkmslogin.form"],                                              //0
					   [_baseURL stringByAppendingString: @"/LogonOperacionServlet"],										//1
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],                                        //2
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],                                        //3
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],										//4
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],								    	//5
                       [urlCorta stringByAppendingString: @"/pkmslogout.form"],                                             //6
                       [_baseURL stringByAppendingString: @"/isignoff_movil.jsp"],                                          //7
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //8 WT_Consulta Tipo Servicio
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //9 WT_Consulta Contratos Pat
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //10 WT_Consulta Capital
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //11 WT_Realiza Compra Venta
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],   //12 WT_Cancela Ordenes
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //13 WT_CONSULTA_ESTATUS_ORDENES_CAPITALES
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //14 WT_CONSULTA_POSICION_DETALLE_INVERSION
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //15 WT_CONSULTA_PORTAFOLIO
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //16 WT_CONSULTA_PROMOCIONES
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //17 WT_CONSULTA_MKT
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //18 WT_DETALLE_ORDEN
                       [_baseURL stringByAppendingString: @"/LogoutCBTFServlet"],       //19 LogoutCBTFServlet
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //20 INV_REALIZAVENTA
					   nil];

        #elif (USE_DEVELOPMENT_SERVER == 0)
	_operationsURLs = [[NSArray alloc] initWithObjects:
					   [urlCorta stringByAppendingString: @"/pkmslogin.form"],                                              //0
					   [_baseURL stringByAppendingString: @"/LogonOperacionServlet"],										//1
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],                                        //2
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],                                        //3
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],										//4
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],								    	//5
                       [urlCorta stringByAppendingString: @"/pkmslogout.form"],                                             //6
                       [_baseURL stringByAppendingString: @"/isignoff_movil.jsp"],                                          //7
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //8 WT_Consulta Tipo Servicio
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //9 WT_Consulta Contratos Pat
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //10 WT_Consulta Capital
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //11 WT_Realiza Compra Venta
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],   //12 WT_Cancela Ordenes
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //13 WT_CONSULTA_ESTATUS_ORDENES_CAPITALES
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //14 WT_CONSULTA_POSICION_DETALLE_INVERSION
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //15 WT_CONSULTA_PORTAFOLIO
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //16 WT_CONSULTA_PROMOCIONES
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //17 WT_CONSULTA_MKT
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //18 WT_DETALLE_ORDEN
                       [_baseURL stringByAppendingString: @"/LogoutCBTFServlet"],       //19 LogoutCBTFServlet
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //20 INV_REALIZAVENTA
					   nil];
        #else
    _operationsURLs = [[NSArray alloc] initWithObjects:
					   [urlCorta stringByAppendingString: @"/pkmslogin.form"],                                              //0
					   [_baseURL stringByAppendingString: @"/LogonOperacionServlet"],										//1
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],                                        //2
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],                                        //3
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],										//4
					   [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],								    	//5
                       [urlCorta stringByAppendingString: @"/pkmslogout.form"],                                             //6
                       [_baseURL stringByAppendingString: @"/isignoff_movil.jsp"],                                          //7
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //8 WT_Consulta Tipo Servicio
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //9 WT_Consulta Contratos Pat
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //10 WT_Consulta Capital
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //11 WT_Realiza Compra Venta
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],   //12 WT_Cancela Ordenes
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //13 WT_CONSULTA_ESTATUS_ORDENES_CAPITALES
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //14 WT_CONSULTA_POSICION_DETALLE_INVERSION
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //15 WT_CONSULTA_PORTAFOLIO
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //16 WT_CONSULTA_PROMOCIONES
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //17 WT_CONSULTA_MKT
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //18 WT_DETALLE_ORDEN
                       [_baseURL stringByAppendingString: @"/LogoutCBTFServlet"],       //19 LogoutCBTFServlet
                       [_baseURL stringByAppendingString: @"/OperacionCBTFServlet"],    //20 INV_REALIZAVENTA
					   nil];
        #endif
}

+ (NSString*) operationCodeForOperationIndex: (NSUInteger) anOperationIndex
{
	NSString* result = nil;
	
	if (_operationCodes == nil) {
		[Server initOperationCodes];
	}
	
	if (anOperationIndex < [_operationCodes count]) {
		result = [_operationCodes objectAtIndex: anOperationIndex];
	}
	
	return result;
}

+ (NSString*) operationURLForOperationIndex: (NSUInteger) anOperationIndex
{
	NSString* url = nil;
	
	if (_operationsURLs == nil) {
		[Server initOperationsURLs];
	}
	
	if (anOperationIndex < [_operationsURLs count]) {
		url = [_operationsURLs objectAtIndex: anOperationIndex];
	}
	
    NSLog(@"* URL DE CONEXION : %@", url);
    
	return url;
}

@end