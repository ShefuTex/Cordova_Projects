/*
 * Copyright (c) 2010 BBVA. All Rights Reserved
 *
 * This software is the confidential and proprietary information of
 * BBVA ("Confidental Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with
 * the terms of the license agreement you entered into with BBVA.
 */


//#import "ParsingHandler.h"
//#import "BaseParser.h"
#import "Respuesta.h"


/**
 * Defines the operation successful status code
 */
#define OPERATION_SUCCESSFUL							0

/**
 * Defines the operation warning status code
 */
#define OPERATION_WARNING								1

/**
 * Defines the operation error status code
 */
#define OPERATION_ERROR									2

/**
 * Defines the operation successful status code, but asks for optional updating
 */
#define OPERATION_OPTIONAL_UPDATE						3

/**
 * Defines the session expired status code
 */
#define OPERATION_SESSION_EXPIRED						-100

/**
 * Defines the operation unknonw status code
 */
#define OPERATION_STATUS_UNKNOWN						-1000

 
/**
 * ServerResponse wraps the response from the server, containing attributes that define if the response has been successful
 * or not, and the data content if the response was successful
 *
 * @author <a href="mailto:info@movilok.com">Movilok Interactividad Movil S.L.</a>
 */
@interface ServerResponse : NSObject /*BaseParser*/{
@private
	/**
	 * Current response status
	 */
	NSInteger _status;
	
	/**
	 * Response error code
	 */
	NSString* _messageCode;
	
	/**
	 * Error message
	 */
	NSString* _messageText;
	
	/**
	 * URL for mandatory updating (the mandatory updating order is received as an error with code MBANK1111)
	 */
	NSString* _updateURL;
	

	/**
	 * Response handler, containing the data content of the response
	 */
	Respuesta *_responseHandler;
}

/**
 * Provides read-only access to the current response status
 */
@property (nonatomic, readonly) NSInteger status;

/**
 * Provides read-only access to the response error code
 */
@property (nonatomic, readonly, copy) NSString* messageCode;

/**
 * Provides read-only access to the error message
 */
@property (nonatomic, readonly, copy) NSString* messageText;

/**
 * Provides read-only access to the URL for mandatory updating
 */
@property (nonatomic, readonly, copy) NSString* updateURL;

//@property (nonatomic,retain) NSString* respuesta;
/**
 * Provides read-only access to the response handler
 */
@property (nonatomic, readonly) Respuesta *responseHandler;

-(void) setData:(NSString *)aData;

/**
 * Initializes the ServerResponse instance using the status, message code, message text and response handler provided
 *
 * @param aStatus The status to store
 * @param aMessageCode The message code to store
 * @param aMessageText The message text to store
 * @param aResponseHandler The response handler to store
 * @return The initialized ServerResponse instance
 */
- (id) initWithStatus: (NSInteger) aStatus messageCode: (NSString*) aMessageCode messageText: (NSString*) aMessageText
   andResponseHandler: (id<NSXMLParserDelegate>) aResponseHandler;

@end
