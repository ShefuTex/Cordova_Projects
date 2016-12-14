package com.bancomer.btrader.persistence;

public class PersistenceHelper {
	/**
	 * Enumeration with the list of the files that could be saved.
	 * @author <a href="mailto:jorge.morales@gonet.us">Jorge</a>
	 */
	public enum StoredFile {
		
		;
		
		/**
		 * Base URI for the files location.
		 */
		private static final String baseUri = "";
		
		/**
		 * The current file URI.
		 */
		private String fileUri;
		
		/**
		 * Initialize a new StoredFile enumeration element.
		 * @param fileName The name of the file.
		 */
		private StoredFile(String fileName) {
			this.fileUri = baseUri + fileName;
		}
		
		/**
		 * @return The file URI.
		 */
		public String getFileUri() {
			return fileUri;
		}
		
		/**
		 * Method to check if the selected file is saved into the device.
		 * @return Whether if the file exists or not.
		 */
		public boolean exists() {
			return false;
		}
	}
	
	//#region Singleton.
	/**
	 * Singleton instance.
	 */
	private static PersistenceHelper theInstance = null;
	
	/**
	 * Private constructor to ensure a singleton.
	 */
	private PersistenceHelper() {
	}
	
	/**
	 * @return The unique instance of the class.
	 */
	public static PersistenceHelper getInstance() {
		if(null == theInstance)
			theInstance = new PersistenceHelper();
		
		return theInstance;
	}
	
	/**
	 * Dispose the instance of the class.
	 */
	public static void dispose() {
		theInstance = null;
	}
	//#endregion
}
