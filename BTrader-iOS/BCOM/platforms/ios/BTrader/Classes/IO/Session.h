/**
    Session.h
    BCom

    Created by ARTEMIO OLVERA MEDINA on 11/08/14.
**/

#import <Foundation/Foundation.h>

enum {
    PosGloJSONType = 1,
    CatBanJSONType = 2,
    SigOffJSONType = 3,
    SignOnJSONType = 4,
    SigOn2JSONType = 5
};

typedef NSUInteger JsonType;

@interface Session : NSObject

@property (nonatomic, strong) NSString *numeroDelUsuario;

+ (Session *) getInstance;

- (BOOL) escribirJson: (NSString*) json deTipo: (JsonType) jsonType;

- (NSString*) leerJson: (JsonType) jsonType;

- (void) guardarNumeroTarjeta;

- (NSString*) usuarioAdmin;

@end