/*
 * Copyright (c) 2010 BBVA. All Rights Reserved
 *
 * This software is the confidential and proprietary information of
 * BBVA ("Confidental Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with
 * the terms of the license agreement you entered into with BBVA.
 */


#import "PersistenceFilesPathsProvider.h"

/**
 * Defines persistence directory (special directory inside Documents directory)
 */
#define PERSISTENCE_DIRECTORY									@"Comprobantes"

/**
 * Defines the application's session file name (stored inside persistence directory)
 */
#define APPLICATION_SESSION_FILE_NAME							@"Invitado"

/**
 * Defines the cookies storage file name (stored inside persistence directory)
 */
#define COOKIES_STORAGE_FILE_NAME								@"Cookies"

/**
 * Defines the engagement storage file name (stored inside persistence directory)
 */
#define ENGAGEMENT_STORAGE_FILE_NAME							@"EstatusContratacion"

/**
 * Defines the App Status storage file name (stored inside persistence directory)
 */
#define APP_STATUS_STORAGE_FILE_NAME							@"EstatusAplicaciones"


/**
 * Private extension
 */
@interface PersistenceFilesPathsProvider()

/**
 * Returns the application's Documents directory path
 *
 * @return Application's Documents directory path
 */
+ (NSString*) getDocumentsDirPath;

@end


@implementation PersistenceFilesPathsProvider

/*
 * Creates application's directory structure
 */
+ (void) createDirectoryStructure {
	NSFileManager* fileManager = [NSFileManager defaultManager];
	
	NSString* auxDir = [[PersistenceFilesPathsProvider getDocumentsDirPath] stringByAppendingPathComponent: PERSISTENCE_DIRECTORY];
	
	if ([fileManager fileExistsAtPath: auxDir] == NO)
	{
		[fileManager createDirectoryAtPath: auxDir withIntermediateDirectories: YES attributes: nil error: nil];
	}
}

/*
 * Constructs and returns the application's session file path. This file is used
 * by Session singleton
 */
+ (NSString*) getApplicationSessionFilePath {
	return [[[PersistenceFilesPathsProvider getDocumentsDirPath] stringByAppendingPathComponent: PERSISTENCE_DIRECTORY]
			stringByAppendingPathComponent: APPLICATION_SESSION_FILE_NAME];
    /*return [[PersistenceFilesPathsProvider getDocumentsDirPath] stringByAppendingPathComponent: PERSISTENCE_DIRECTORY];*/
}


/*
 * Constructs and returs the cookies storage file path. This file is used by HTTPInvoker
 */
+ (NSString*) getCookiesStorageFilePath {
	return [[[PersistenceFilesPathsProvider getDocumentsDirPath] stringByAppendingPathComponent: PERSISTENCE_DIRECTORY]
			stringByAppendingPathComponent: COOKIES_STORAGE_FILE_NAME];
}

/*
 * Constructs and returs the engagement storage file path.
 */
+ (NSString*) getEngagementStorageFilePath {
	return [[[PersistenceFilesPathsProvider getDocumentsDirPath] stringByAppendingPathComponent: PERSISTENCE_DIRECTORY]
			stringByAppendingPathComponent: ENGAGEMENT_STORAGE_FILE_NAME];
}

/*
 * Constructs and returs the App States storage file path.
 */
+ (NSString*) getAppStatusStorageFilePath
{
    return [[[PersistenceFilesPathsProvider getDocumentsDirPath] stringByAppendingPathComponent: PERSISTENCE_DIRECTORY]
			stringByAppendingPathComponent: APP_STATUS_STORAGE_FILE_NAME];
}

/*
 * Returns the application's Documents directory path
 */
+ (NSString*) getDocumentsDirPath {
	NSArray* paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	
	return [paths objectAtIndex: 0];
}

@end
