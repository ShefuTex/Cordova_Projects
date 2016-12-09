package com.bancomer.btrader.session;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import android.util.Log;

import com.bancomer.btrader.BCom;
import com.bancomer.btrader.session.Server.PersistentJsonFile;
import com.bancomer.btrader.utils.Utilerias;


public class Session {
	//#region Singleton.
	/**
	 * The singleton instance.
	 */
	private static Session theInstance = null;
	
	/**
	 * @return The instance of the class.
	 */
	public static Session getInstance() {
		if(null == theInstance)
			theInstance = new Session();
		return theInstance;
	}
	
	/**
	 * Makes the instance null to enable the GC to clean it.
	 */
	public static void dispose() {
		theInstance = null;
	}
	
	/**
	 * Private constructor to ensure Singleton instance.
	 */
	private Session() {
		
	}
	//#endregion

	//#region Class fields.
	private static String urlWebseal;
	private static String urlWAS;
	private static String cookiePSesionId;
	private static String cookieJSesionId;
	
//	private String valor;
//	private String campo;
//	private String operacion;
	//#endregion

	//#region Getters & Setters.
	public static String getUrlWebseal() {
		return urlWebseal;
	}

	public static void setUrlWebseal(String urlWebseal) {
		Session.urlWebseal = urlWebseal;
	}

	public static String getUrlWAS() {
		return urlWAS;
	}

	public static void setUrlWAS(String urlWAS) {
		Session.urlWAS = urlWAS;
	}

	public static String getCookiePSesionId() {
		return cookiePSesionId;
	}

	public static void setCookiePSesionId(String cookiePSesionId) {
		Session.cookiePSesionId = cookiePSesionId;
	}
	
	public static String getCookieJSesionId() {
		return cookieJSesionId;
	}

	public static void setCookieJSesionId(String cookiePSesionId) {
		Session.cookieJSesionId = cookiePSesionId;
	}
	//#endregion

	//#region File persistence.
	/**
	 * Stores the indicated content String as a file. 
	 * @param persistentFile The file where the content will be stored.
	 * @param content The content of the file.
	 * @return True if the file was stores successfully or false if an error occurred. 
	 */
	public boolean guardaValores(PersistentJsonFile persistentFile, String content) {
		if(BCom.getInstance().isInvitado())
			return true;
		
		boolean success = true;
		File file = new File(Utilerias.getAppConfigurationDir(), persistentFile.getFileName());
		OutputStream out = null;
		
		try {
			out = new BufferedOutputStream(new FileOutputStream(file));
			out.write(content.getBytes());
			success = true;
			Log.v(this.getClass().getSimpleName(), "File " + persistentFile.getFileName() + " saved successfully at location: " + file.getAbsolutePath());
		}catch(IOException ex) {
			Log.w(this.getClass().getSimpleName(), "Error while saving the file: " + persistentFile.getFileName(), ex);
			success = false;
		}
		finally {
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					Log.w(this.getClass().getSimpleName(), "Error while closing the file: " + persistentFile.getFileName(), e);
				}
			}
		}
		
		return success;
	}
	
	/**
	 * Reads the indicated file as a String. 
	 * @param persistentFile The file to read.
	 * @return The content of the file or null if an error occurred.
	 */
	public String recuperaValores(PersistentJsonFile persistentFile) {
		String result = null;
		StringBuilder sb = new StringBuilder();
		File file = new File(Utilerias.getAppConfigurationDir(), persistentFile.getFileName());
		
		InputStream input = null; 
		BufferedReader reader = null; 
		
		try {
			input = new BufferedInputStream(new FileInputStream(file));
			reader = new BufferedReader(new InputStreamReader(input));
			
			while ((result = reader.readLine()) != null) {
				sb.append(result).append("\n");
		    }
			
			result = sb.toString();
		} catch (FileNotFoundException fnfEx) {
			Log.w(this.getClass().getSimpleName(), "Error while opening the file: " + persistentFile.getFileName(), fnfEx);
			result = null;
		} catch (IOException ioEx) {
			Log.w(this.getClass().getSimpleName(), "Error while reading the file: " + persistentFile.getFileName(), ioEx);
			result = null;
		} finally {
			if(null != reader) {
				try {
					reader.close();
				} catch (IOException clseEx) {
					Log.w(this.getClass().getSimpleName(), "Error while closing the file: " + persistentFile.getFileName(), clseEx);
				}
			}
		}
		
	    return sb.toString();
	}
	//#endregion
}
