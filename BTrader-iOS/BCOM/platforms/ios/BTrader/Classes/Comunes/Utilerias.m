//
//  Utilerias.m
//  BCom
//
//  Created by ARTEMIO OLVERA MEDINA on 08/08/14.
//
//

#import "Utilerias.h"
#import <CommonCrypto/CommonDigest.h>
#import "NSData+Base64.h"

@implementation Utilerias

+(NSString*)getMD5_Base64:(NSString *)str{
    const char *cStr = [str UTF8String];
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    
    CC_MD5( cStr, strlen(cStr), result );
    
    NSData *nsd = [[NSData alloc] initWithBytes: result length:CC_MD5_DIGEST_LENGTH];
    NSString *base64String = [nsd base64EncodedString];
    NSLog(@"%@",base64String);
    
    return base64String;
}

@end
