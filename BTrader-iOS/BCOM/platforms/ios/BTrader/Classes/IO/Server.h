#import "HTTPInvoker.h"

#define APP_ESTADO                                                      TEST


#define SIMULATION                                                      0
#define TEST                                                            1
#define PROD_LIGA_OCULTA                                                2
#define PRODUCCION                                                      3

    /* Contraseña de Webseal */
#define PASS_WEBSEAL                                                    @"password00"

    /* Defines Gonet infrastructure */
#define GONET															0
    /* Defines Bancomer infrastructure */
#define BANCOMER														1
    /* Defines current operation provider */
#define PROVIDER														BANCOMER

/* Operacione */
#define USE_DEVELOPMENT_SERVER										    1

#define LOGIN_OPEN_WSEAL                                                0
#define LOGIN_OPEN_WAS                                                  1
#define LOGIN_VALIDA_TOKEN                                              2
#define CONSULTA_CATALOGO_BANCOS                                        3
#define CONSULTA_POSICION_GLOBAL                                        4
#define LOGOUT_CLOSE_WAS                                                5
#define LOGOUT_CLOSE_WSEAL                                              6
#define LOGOUT_CLOSE_HOST                                               7
#define WT_CONSULTA_TIPO_SERVICO                                        8
#define WT_CONSULTA_CONTRATOS_PATRIMONIALES                             9
#define WT_CONSULTA_CAPITALES                                           10
#define WT_REALIZACOMPRAVENTA                                           11
#define WT_CANCELAORDENES                                               12
#define WT_CONSULTA_ESTATUS_ORDENES_CAPITALES                           13
#define WT_CONSULTA_POSICION_DETALLE_INVERSION                          14
#define WT_CONSULTA_PORTAFOLIO                                          15
#define WT_CONSULTA_PROMOCIONES                                         16
#define WT_CONSULTA_MKT                                                 17
#define WT_DETALLE_ORDEN                                                18
#define LOGOUT_CLOSE_SERVLET                                            19
#define INV_REALIZAVENTA                                                20


@class ServerResponse;

@class Server;

@interface Server : NSObject <HTTPInvokerClient>
{
	NSString *_urlBase;

    @private
	
    HTTPInvoker* _httpInvoker;

	NSMutableDictionary* _pendingOperations;
}

@property (nonatomic,readwrite,retain) NSString *urlBase;

+ (void) initOperationsURLs;

+ (Server*) getInstance;

+ (NSString*) urlCorta;

+ (void) setBaseUrl: (NSString *) url;

- (void) cancelPendingOperations;

+ (NSString*) operationURLForOperationIndex: (NSUInteger) anOperationIndex;



@end
