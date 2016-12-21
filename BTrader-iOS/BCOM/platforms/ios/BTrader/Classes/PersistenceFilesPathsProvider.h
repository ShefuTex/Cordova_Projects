/*
 * Copyright (c) 2010 BBVA. All Rights Reserved
 *
 * This software is the confidential and proprietary information of
 * BBVA ("Confidental Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with
 * the terms of the license agreement you entered into with BBVA.
 */



/**
 * Provides static functions to access persistence files paths. Persistence files are stored in
 * application's Documents directory
 *
 * @author <a href="mailto:info@movilok.com">Movilok Interactividad Movil S.L.</a>
 */
@interface PersistenceFilesPathsProvider : NSObject {

}

/**
 * Creates application's directory structure
 */
+ (void) createDirectoryStructure;

/**
 * Constructs and returns the application's session file path. This file is used
 * by Session singleton
 *
 * @return The application's session file path
 */
+ (NSString*) getApplicationSessionFilePath;

/**
 * Constructs and returs the cookies storage file path. This file is used by HTTPInvoker
 *
 * @return The cookies storage file path
 */
+ (NSString*) getCookiesStorageFilePath;

/*
 * Constructs and returs the engagement storage file path.
 *
 * @return The engagement storage file path
 */
+ (NSString*) getEngagementStorageFilePath;

/*
 * Constructs and returs the App States storage file path.
 *
 * @return The App Status storage file path
 */
+ (NSString*) getAppStatusStorageFilePath;

+ (NSString*) getDocumentsDirPath;

@end
