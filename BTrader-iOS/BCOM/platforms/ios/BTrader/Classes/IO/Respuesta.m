//
//  Respuesta.m
//  BancaPrivada
//

#import "Respuesta.h"

#define CODIGO_TAG              @"codigo"
#define MENSAJE_TAG             @"mensaje"
#define ERROR_TAG               @"error"
#define ERROR_ARQ               @"errorARQ"
#define MENSAJE_ARQ             @"msg"

@implementation Respuesta

- (id) init
{
    self = [super init];
    
    if (self) {
        _jsonResponse = nil;
        _isCorrect = NO;
        _mensaje = @"Por favor active sus datos Móviles o conéctese a una red WIFI";
        _codigo = @"";
    }
    
    return self;
}

- (void) resultadoDeLaConexion{
    NSData *data = [_jsonResponse dataUsingEncoding:NSUTF8StringEncoding];
    NSError *error;
    
    NSDictionary *dictionary = [NSJSONSerialization JSONObjectWithData: data options: kNilOptions error: &error];
    
    if (error) {
        NSLog(@"LENGHT _jsonResponse %lu",(unsigned long)[_jsonResponse length]);
        if ([[_jsonResponse lowercaseString] rangeOfString:@"success"].location != NSNotFound) {
            _isCorrect = YES;
        } else if ([_jsonResponse rangeOfString:@"{ \"respuesta\":{ \"finDeSesion\":\"true\" }}"].location != NSNotFound) {
            _isCorrect = YES;
        } else if ([_jsonResponse rangeOfString:@"finDeSesion"].location != NSNotFound) {
            _isCorrect = YES;
        } else if ([_jsonResponse rangeOfString:@"has logged out"].location != NSNotFound) {
            _isCorrect = YES;
        }  /*else if ([_jsonResponse rangeOfString:@"true"].location != NSNotFound) {
            _isCorrect = YES;
        }*/ else if ([_jsonResponse rangeOfString:@"has logged out"].location != NSNotFound) {
            _isCorrect = YES;
        }else if ([_jsonResponse rangeOfString:@"PKMS Administration: User Log Out"].location != NSNotFound) {
            _isCorrect = YES;
        }else if ([_jsonResponse rangeOfString:@"BA clients must exit their browser to properly terminate their session."].location != NSNotFound) {
            _isCorrect = YES;
        }
        else if ([_jsonResponse rangeOfString:@"El usuario se ha desconectado de forma correcta."].location != NSNotFound) {
            _isCorrect = YES;
        }else if ([_jsonResponse rangeOfString:@"Es necesario introducir la clave de acceso correctamente"].location != NSNotFound){
            _mensaje = @"Apreciable cliente: es necesario introducir la clave de acceso o el número de tarjeta correctamente";
            _codigo  = @"";
            _isCorrect = NO;
            _valido = @"NO";
        }/*else if (data){
            _mensaje = @"Apreciable cliente: favor de revisar su conexión a internet";
            _codigo  = @"";
            _isCorrect = NO;
        }//This account has been temporarily locked out due to too many failed login attempts*/
        else if ([_jsonResponse rangeOfString:@"This account has been temporarily locked out due to too many failed login attempts"].location != NSNotFound){
            _mensaje = @"Apreciable cliente: por seguridad su cuenta ha sido bloqueada";
            _codigo  = @"";
            _isCorrect = NO;
        }//This account has been temporarily locked out due to too many failed login attempts
        else if ([_jsonResponse rangeOfString:@"Authentication mechanism is not available"].location != NSNotFound){
            _mensaje = @"Por el momento el servicio no está disponible";
            _codigo  = @"";
            _isCorrect = NO;
        } else if ([_jsonResponse rangeOfString:@"The user's account has expired."].location != NSNotFound){
            _mensaje = @"Por su seguridad, su cuenta se ha bloqueado.";
            _codigo  = @"";
            _isCorrect = NO;
        } else if ([_jsonResponse rangeOfString:@"Authentication failed. You have used an invalid user name, password or client certificate"].location != NSNotFound){
            _mensaje = @"Apreciable cliente: es necesario introducir la clave de acceso o el número de tarjeta correctamente";
            _codigo  = @"";
            _isCorrect = NO;
            _valido = @"NO";
        }else if ([_jsonResponse length] == 0){
            _mensaje = @"Apreciable cliente: Usuario invalido";
            _codigo  = @"";
            _isCorrect = NO;
        } else {

            _mensaje = @"Para poder usar BTrader debes tener tu token activado; favor de activarlo desde BMóvil o llamar a línea Bancomer";
            _codigo  = @"";
            _isCorrect = NO;
        }
    } else {
        NSString *errorTAG = [dictionary objectForKey:ERROR_TAG];
        NSString *errorARQ = [dictionary objectForKey:ERROR_ARQ];
        
        if (errorTAG) {
            NSDictionary *errorDictionary = [dictionary objectForKey:ERROR_TAG];
            _mensaje = [errorDictionary objectForKey:MENSAJE_TAG];
            _codigo = [errorDictionary objectForKey:CODIGO_TAG];
            _isCorrect = NO;
        }else if(errorARQ) {
            NSDictionary *errorDictionary = [dictionary objectForKey:ERROR_ARQ];
            _mensaje = [errorDictionary objectForKey:MENSAJE_ARQ];
            _codigo = @"";
            _isCorrect = NO;
        }else{
            _isCorrect = YES;
        }
    }
}

@end
