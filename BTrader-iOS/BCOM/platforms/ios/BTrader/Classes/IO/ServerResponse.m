/*
 * Copyright (c) 2010 BBVA. All Rights Reserved
 *
 * This software is the confidential and proprietary information of
 * BBVA ("Confidental Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with
 * the terms of the license agreement you entered into with BBVA.
 */


#import "ServerResponse.h"


@implementation ServerResponse

@synthesize status = _status;
@synthesize messageCode = _messageCode;
@synthesize messageText = _messageText;
@synthesize updateURL = _updateURL;
@synthesize responseHandler = _responseHandler;

/*
 * Designated initializer. Initializes the ServerResponse instance using the response handler provided
 */
- (id) initWithResponseHandler: (id<NSXMLParserDelegate>) aResponseHandler {
	if (self = [super init]) {
		_responseHandler = aResponseHandler;
	}
	
	return self;
}

-(id) init{
    if (self = [super init]) {
        _responseHandler = [[Respuesta alloc] init];
	}
    return self;
}

/*
 * Initializes the ServerResponse instance using the status, message code, message text and response handler provided
 */
- (id) initWithStatus: (NSInteger) aStatus messageCode: (NSString*) aMessageCode messageText: (NSString*) aMessageText
   andResponseHandler: (id<NSXMLParserDelegate>) aResponseHandler {
	self = [self initWithResponseHandler: aResponseHandler];
	
	if (self != nil) {
		_status = aStatus;
		_messageCode = [aMessageCode copy];
		_messageText = [aMessageText copy];
	}
	
	return self;
}
-(void) setData:(NSString *)aData{
	//_respuesta=aData;
}
/**
 * Parses the raw data. Forwards the information to the child handler and assumes the status is successfull
 *
 * @param aData The data received from the server to be parsed
 */
- (void) parseData: (NSData*) aData {

}

/**
 * Processes a server response. Analyzes the response header, and in case it is a successful response, delegates the 
 * content analysis to the response handler
 *
 * @parameters aParser The parser containing the server response, ready to start parsing
 */
/*
- (void) processParser: (Parser*) aParser {
}*/

/**
 * Informs whether the parsing handler uses raw data or a parser to analyze data. Queries its child for
 * its preference
 *
 * @return YES in case the parsing handler uses a parser to analyze data, NO if raw data is needed
 */
- (BOOL) usesParser {
	BOOL result = YES;
	
	if (_responseHandler != nil) {
//		result = [_responseHandler usesParser];
	}
	
	return result;
}

- (id) copyWithZone: (NSZone*) zone
{
    return self;
    
}

@end
