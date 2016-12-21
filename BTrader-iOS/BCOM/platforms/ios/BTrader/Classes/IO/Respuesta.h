//
//  Respuesta.h
//  BancaPrivada
//

#import <Foundation/Foundation.h>

@interface Respuesta : NSObject

@property (nonatomic, strong) NSString *jsonResponse;
@property (nonatomic, strong) NSString *mensaje;
@property (nonatomic, strong) NSString *codigo;
@property (nonatomic) BOOL isCorrect;
@property (nonatomic, strong) NSString *valido;

- (void) resultadoDeLaConexion;

@end
