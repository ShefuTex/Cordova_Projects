package com.bancomer.btrader.delegates;

import java.util.Hashtable;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;

public class TokenDelegate extends NativeDelegate{
	private String digitoTASA = "";
	private String posicionTASA = "";
	private String otp = "";
	
	public TokenDelegate() {
		this.callbackContext = null;
	}
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		SharedBcomPreferences.appContext = this.cordova.getActivity();
		super.init();
		
		final String actionInv = action;
		final JSONArray argsInv = args;
		
		this.cordova.getThreadPool().execute(new Runnable() {
			
			@Override
			public void run() {
				if(actionInv.equals("OP_TOKEN")) {
					banderaOperacion = Server.ServerOperation.LOGIN_TWO;
					doNetworkOperation(argsInv);
				} 
			}
		});
		
		return true;
	}
	
	@Override
	protected void doNetworkOperation(JSONArray datos) {
		leerDatosOperacion(datos);
		
		switch (banderaOperacion) {
		case LOGIN_TWO:
			crearParametrosLog2();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.LOGIN_TWO, paramTable));
			leerDatosResponse(getRespuesta());
			break;
			
		default:
			break;
		}
	}
	
	@Override
	protected void leerDatosOperacion(JSONArray datos) {
		try {
			if(banderaOperacion == Server.ServerOperation.LOGIN_TWO){
				password = datos.getString(1);
				
				if(datos.length() > 3){
					digitoTASA = datos.getString(2);
					posicionTASA = datos.getString(3);
				}else
					otp = datos.getString(2);
			} 
		} catch (Exception e) {
			Log.w(Server.TAG, Server.JSON_EXCEPTION);
		}
	}
	
	private void crearParametrosLog2(){
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "i_signon_pr");
			raiz.put("operacion", "i_signon_op");
			raiz.put("accion", "logon2");
			
			JSONObject hijo = new JSONObject();
			hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
			hijo.put("acceso", numTarjeta);
			hijo.put("posicionTASA", posicionTASA);
			hijo.put("digitoTASA", digitoTASA);
			hijo.put("otp", otp);
			
			raiz.put("datosAplicativos", hijo);
			
			res = raiz.toString();
			
			if(paramTable == null)
				paramTable = new Hashtable<String, String>();
			else
				paramTable.clear();
			
			paramTable.put("username", numTarjeta + Server.USUARIO_INVOCAWEBSEAL );
			paramTable.put("password", password );
			paramTable.put("login-form-type", "pwd");
			paramTable.put("recepcionJSON", "true" );
			paramTable.put("cadenaJSON", res );
			
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en crearJSONLog1. " + e.getMessage());
		}
	}
	
}
