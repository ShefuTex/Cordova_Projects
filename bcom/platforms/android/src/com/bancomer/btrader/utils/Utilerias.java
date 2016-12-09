package com.bancomer.btrader.utils;

import android.content.Context;
import android.util.Base64;
import android.util.Log;

import com.bancomer.btrader.session.Server;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.URL;
import java.security.MessageDigest;
import java.util.Enumeration;
import java.util.Random;

//Todo se edito la ruta del R

public class Utilerias {
	private static char[][] tb1 = null;

	public static StringBuilder inputStreamToString(InputStream is) throws Exception {
		StringBuilder total = new StringBuilder();
		
		try {
			String line = "";
			BufferedReader rd = new BufferedReader(new InputStreamReader(is));

			while ((line = rd.readLine()) != null) {
				total.append(line);
			}
		} catch (Exception e) {
			Log.w(Server.TAG, "Advertencia en inputStreamToString" + e.getMessage());
		}
		
		return total;
	}
	
	public static String detectaIp() {
		String ip = "";
		try {
			for (Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces(); en.hasMoreElements();) {
				NetworkInterface ni = en.nextElement();
				for (Enumeration<InetAddress> enumIpAddr = ni.getInetAddresses(); enumIpAddr.hasMoreElements();) {
					InetAddress inetAddress = enumIpAddr.nextElement();
					if (!inetAddress.isLoopbackAddress()) {
						ip = inetAddress.getHostAddress().toString();
						if (ip.length() < 16) {
							if (ip.startsWith("127.") == false)
								break;
						}
					}
				}
			}
		} catch (SocketException ex) {
			Log.e(Server.TAG, "Error al obtener la IP:" + ex.getMessage());
		}
		Log.d(Server.TAG, "La Ip buena es:" + ip);
		return ip;
	}
	
	/**
	 * Este metodo se usa para la codificacion de la URL
	 * 
	 * @param ip
	 *            la url en formato String
	 * @return String Formateada
	 */
	public static String getIpMascara(String ip) {
		if (tb1 == null) {
			init();
		}
		String resip = "";

		String ip_mas = codificarIp(ip);
		String ip_md = getMD5_Base64(ip);

		if (ip_mas != null && ip_mas.length() > 0 && ip_md != null
				&& ip_md.length() > 0) {
			resip = ip_md + ip_mas;
			Log.d(Server.TAG, "MD5 + Mascara: " + resip);
		}

		return resip;
	}
	
	/**
	 * Metodo que ayuda a la codificacion de la IP
	 * 
	 * @param ip
	 *            la ip en formato String
	 * @return String codificada
	 */
	private static String codificarIp(String ip) {
		char[] arreglo = ip.toCharArray();
		String nuevaip = "";
		Random ran = new Random(7);

		for (int i = 0; i < arreglo.length; i++) {
			int rn = ran.nextInt(6);

			if (arreglo[i] == '.') {
				nuevaip += tb1[10][rn];
			} else if (arreglo[i] == '0') {
				nuevaip += tb1[9][rn];
			} else {
				nuevaip += tb1[Integer.valueOf(String.valueOf(arreglo[i])) - 1][rn];
			}
		}// fin del for

		return nuevaip;
	}
	
	/**
	 * Este metodo regresa la cadena de la IP en MD5 BASE64
	 * 
	 * @param input
	 *            la IP en String
	 * @return String
	 */
	public static String getMD5_Base64(String input) {
		MessageDigest digest = null;

		try {
			digest = MessageDigest.getInstance("MD5");
		} catch (Exception ex) {
			Log.e(Server.TAG, "Error al hacer MD5(digest). " + ex.getMessage());
			ex.printStackTrace();
		}

		if (digest == null)
			return input;

		try {
			digest.update(input.getBytes("UTF-8"));
		} catch (java.io.UnsupportedEncodingException ex) {
			Log.e(Server.TAG, "Error al hacer MD5. " + ex.getMessage());
			ex.printStackTrace();
		}
		byte[] rawData = digest.digest();

		String res = Base64.encodeToString(rawData, 0);
		res.trim();
		return res;
	}
	
	/*
	 * Inicializamos la tablita
	 */
	private static void init() {
		tb1 = new char[11][6];
		tb1[0][0] = 'Z';
		tb1[0][1] = 'Y';
		tb1[0][2] = 'V';
		tb1[0][3] = 'H';
		tb1[0][4] = '2';
		tb1[0][5] = '5';

		tb1[1][0] = '7';
		tb1[1][1] = 'A';
		tb1[1][2] = 'L';
		tb1[1][3] = 'b';
		tb1[1][4] = '3';
		tb1[1][5] = '6';

		tb1[2][0] = '0';
		tb1[2][1] = 'a';
		tb1[2][2] = 'N';
		tb1[2][3] = 'c';
		tb1[2][4] = 'h';
		tb1[2][5] = 's';

		tb1[3][0] = 'B';
		tb1[3][1] = 'C';
		tb1[3][2] = 'y';
		tb1[3][3] = 'd';
		tb1[3][4] = 'i';
		tb1[3][5] = 't';

		tb1[4][0] = 'W';
		tb1[4][1] = 'D';
		tb1[4][2] = 'z';
		tb1[4][3] = 'Q';
		tb1[4][4] = 'j';
		tb1[4][5] = 'u';

		tb1[5][0] = '8';
		tb1[5][1] = 'E';
		tb1[5][2] = 'M';
		tb1[5][3] = 'R';
		tb1[5][4] = 'k';
		tb1[5][5] = 'v';

		tb1[6][0] = '9';
		tb1[6][1] = 'p';
		tb1[6][2] = 'x';
		tb1[6][3] = 'S';
		tb1[6][4] = '1';
		tb1[6][5] = 'w';

		tb1[7][0] = 'X';
		tb1[7][1] = 'q';
		tb1[7][2] = 'O';
		tb1[7][3] = 'e';
		tb1[7][4] = 'I';
		tb1[7][5] = 'X';

		tb1[8][0] = 'm';
		tb1[8][1] = 'r';
		tb1[8][2] = 'P';
		tb1[8][3] = 'f';
		tb1[8][4] = 'J';
		tb1[8][5] = 'm';

		tb1[9][0] = 'n';
		tb1[9][1] = 'T';
		tb1[9][2] = 'F';
		tb1[9][3] = 'g';
		tb1[9][4] = 'K';
		tb1[9][5] = 'n';

		tb1[10][0] = 'o';
		tb1[10][1] = 'U';
		tb1[10][2] = 'G';
		tb1[10][3] = '1';
		tb1[10][4] = '4';
		tb1[10][5] = 'o';
	}
	
	public static boolean hayInternet() {
		boolean inter = false;
		String url = "https://www.google.com.mx";
	
		/* URL url = new URL(dir_web);
 		HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
 		Integer codigoRespuesta = Integer.toString(urlConnection.getResponseCode());
 		if(codigoRespuesta.equals("200")){//Vemos si es 200 OK y leemos el cuerpo del mensaje.
    	body = readStream(urlConnection.getInputStream());
 }*/
		try {

	
		URL url_google = new URL(url);
		HttpURLConnection urlConnection = (HttpURLConnection) url_google.openConnection();
		urlConnection.setConnectTimeout(5000); 
		String codigoRespuesta = Integer.toString(urlConnection.getResponseCode());

		if(codigoRespuesta.equals("200")){
			 inter = true;
			Log.d("Internet", "Si hay respuesta");
		}else{
			Log.d("Internet","No hay Internet");
			inter = false;
		}
		System.out.println(inter);


		} catch (java.net.SocketTimeoutException e) {
		Log.e("Internet", "TimeoutException no hay internet" + e.getMessage());
		inter = false;
		return inter;
		
		} catch (java.io.IOException e) {
		Log.e("Internet", "IOException Time Out no hay internet " + e.getMessage());
		inter = false;
		return inter;
		
		}

		return inter;
		}
	
	
	public static String convertStreamToString(InputStream is) throws Exception {
		DataInputStream din = new DataInputStream(is);
		StringBuffer sb = new StringBuffer();
		String in = null;

		try {
			String line = null;
			while ((line = din.readLine()) != null) {
				sb.append(line);
			}
		} catch (Exception ex) {
			Log.e(Server.TAG, "error :" + ex.getMessage());
		}
		in = sb.toString();
		
		return in;
	}

	public static String crearJsonError(String codigo, String mensaje)
	{
		String resp = "";
		
		if(codigo != null &&  mensaje != null)
		{
			try {
				JSONObject raiz = new JSONObject();
				raiz.put("mensaje", mensaje);
				raiz.put("codigo", codigo);
				
				JSONObject hijo = new JSONObject();
				hijo.put("error", raiz);
				
				resp = hijo.toString();
			} catch (Exception e) {
				Log.w(Server.TAG, Server.JSON_EXCEPTION);
			}
		}
		
		return resp;
	}
	
	
	/**
	 * Application context.
	 */
	public static Context applicationContext;
	
	//#region Storage methods.
	/**
	 * Flag to indicate if the external storage should be used.
	 */
	private static final boolean PREFEAR_EXTERNAL = false;
	
	/**
	 * The name of the application storage folder.
	 */
	public static final String APP_DIR_NAME = "BCom";
	
	/**
	 * The name of the folder for the configuration of the owner user.
	 */
	public static final String CONFIGURATION_DIR_NAME = "Configuracion";
	
	/**
	 * @return The Storage folder for the application.
	 */
	public static File getAppSrotageDir() {
		File systemDir = PREFEAR_EXTERNAL ? applicationContext.getExternalFilesDir(null) : applicationContext.getFilesDir();
		File appDir = new File(systemDir + File.separator + APP_DIR_NAME);
		
		if(!appDir.exists()) {
			if(!appDir.mkdirs()) {
				Log.w(Utilerias.class.getSimpleName(), "Error while creating the directories tree: " + appDir.toString());
			}
		}
		
		return appDir;
	}
	
	/**
	 * @return The Configuration folder for the application.
	 */
	public static File getAppConfigurationDir() {
		File configDir = new File(getAppSrotageDir() + File.separator + CONFIGURATION_DIR_NAME);
		
		if(!configDir.exists()) {
			if(!configDir.mkdirs()) {
				Log.w(Utilerias.class.getSimpleName(), "Error while creating the directories tree: " + configDir.toString());
			}
		}
		
		return configDir;
	}
	
	/**
	 * @param cardNumber The card number of the owner.
	 * @return The owner's storage folder in the application.
	 * @throws IllegalArgumentException If the card number is null or empty.
	 */
	public static File getOwnerSrotageDir(String cardNumber) throws IllegalArgumentException {
		if(null == cardNumber || cardNumber.trim().isEmpty()) {
			String error = "El n�mero de tarjeta no puede estar vacio.";
			IllegalArgumentException ex = new IllegalArgumentException(error);
			Log.e(Utilerias.class.getSimpleName(), error, ex);
			throw ex;
		}
		
		File appDir = new File(getAppSrotageDir() + File.separator + cardNumber);
		return appDir;
	}
	//#endregion
}
