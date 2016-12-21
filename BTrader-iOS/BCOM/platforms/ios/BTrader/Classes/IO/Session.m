/**
    Session.m
    BCom

    Created by ARTEMIO OLVERA MEDINA on 11/08/14.
**/

#import "Session.h"
#import "PersistenceFilesPathsProvider.h"

#define PosGloJSON @"PosGloJSON"
#define CatBanJSON @"CatBanJSON"
#define SigOffJSON @"SigOffJSON"
#define SignOnJSON @"SignOnJSON"
#define SigOn2JSON @"SigOn2JSON"

#define PERSISTANCE_NUMERO_TARJETA_KEY @"numeroTarjeta"

@implementation Session

+ (Session *) getInstance
{
    static Session *sharedInstance = nil;
    static dispatch_once_t onceToken;
    
    dispatch_once(&onceToken, ^{ sharedInstance = [[Session alloc] init]; });
    
    return sharedInstance;
}

+ (id) allocWithZone: (NSZone *) zone
{
    static Session *sharedInstance = nil;
    static dispatch_once_t onceToken;
    
    dispatch_once(&onceToken, ^{ sharedInstance = [super allocWithZone:zone]; });
    
    return sharedInstance;
}

- (id) init
{
    self = [super init];
    
    if (self) { [self leerNumeroTarjeta]; }
    
    return self;
}

- (BOOL) escribirJson: (NSString*) json deTipo: (JsonType) jsonType
{
    NSString* appSessionFilePath = [PersistenceFilesPathsProvider getApplicationSessionFilePath];
    NSMutableDictionary *dictionary = [self readFile];
    
    switch (jsonType) {
        
        case SignOnJSONType : [dictionary setObject: json forKey: SignOnJSON];
            break;
        
        case SigOn2JSONType : [dictionary setObject: json forKey: SigOn2JSON];
        break;
        
        case SigOffJSONType : [dictionary setObject: json forKey: SigOffJSON];
        break;
        
        case PosGloJSONType : [dictionary setObject: json forKey: PosGloJSON];
            break;
        
        case CatBanJSONType : [dictionary setObject: json forKey: CatBanJSON];
            break;
        
        default:
            break;
    }
    
    [dictionary writeToFile: appSessionFilePath atomically: YES];
    
    return YES;
}

- (NSString*) leerJson: (JsonType) jsonType
{
    NSString *jsonString = nil;
    NSMutableDictionary *dictionary = [self readFile];
    
    switch (jsonType) {
        
        case SignOnJSONType: jsonString = [dictionary objectForKey: SignOnJSON];
            break;
        
        case SigOn2JSONType: jsonString = [dictionary objectForKey: SigOn2JSON];
            break;
        
        case SigOffJSONType: jsonString = [dictionary objectForKey: SigOffJSON];
            break;
        
        case PosGloJSONType: jsonString = [dictionary objectForKey: PosGloJSON];
            break;
        
        case CatBanJSONType: jsonString = [dictionary objectForKey: CatBanJSON];
            break;
        
        default:
            break;
    }
    
    return jsonString;
}

- (NSMutableDictionary*) readFile
{
    [PersistenceFilesPathsProvider createDirectoryStructure];
    
    NSString* appSessionFilePath = [PersistenceFilesPathsProvider getApplicationSessionFilePath];
    
    NSMutableDictionary *dictionary =[[NSMutableDictionary alloc] initWithContentsOfFile:appSessionFilePath];
    
    if (!dictionary) { dictionary = [[NSMutableDictionary alloc] init]; }

    return dictionary;
}

- (void) guardarNumeroTarjeta
{
    NSString* appSessionFilePath = [PersistenceFilesPathsProvider getApplicationSessionFilePath];
    
    NSMutableDictionary *dictionary = [self readFile];
    
    [dictionary setObject: _numeroDelUsuario forKey: PERSISTANCE_NUMERO_TARJETA_KEY];
    
    [dictionary writeToFile: appSessionFilePath atomically: YES];
}

- (void) leerNumeroTarjeta
{
    NSMutableDictionary *dictionary = [self readFile];
    _numeroDelUsuario = [dictionary objectForKey: PERSISTANCE_NUMERO_TARJETA_KEY];
}

- (NSString*) numeroDelUsuario
{
    if (!_numeroDelUsuario) { [self leerNumeroTarjeta]; }
    
    return _numeroDelUsuario;
}


- (NSString*) usuarioAdmin
{
    NSMutableDictionary *dictionary = [self readFile];
    return [dictionary objectForKey: PERSISTANCE_NUMERO_TARJETA_KEY];
}


@end
