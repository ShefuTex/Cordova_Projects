package com.bancomer.btrader.delegates;

import java.util.Hashtable;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;

public class PosicionGlobalDelegate extends NativeDelegate {
	
	public PosicionGlobalDelegate() {
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
				if(actionInv.equals("leerPublicidad")) {
//					leerPublicidad(argsInv);
				} else if(actionInv.equals("OP_CATALOGO_BANCOS")) {
					banderaOperacion = Server.ServerOperation.CATALOGO_BANCOS;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("updatePosicionGlobal")) {
					banderaOperacion = Server.ServerOperation.POSICION_GLOBAL;
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
		case POSICION_GLOBAL:
			crearParametrosPosicionGlobal();
			setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		default:
			break;
		}
	}
	
	@Override
	protected void leerDatosOperacion(JSONArray datos) {
		if(paramTable == null)
			paramTable = new Hashtable<String, String>();
		
		paramTable.clear();
		
		try {
			if(datos != null){
				if( banderaOperacion == Server.ServerOperation.POSICION_GLOBAL){
					usuario = datos.getString(0);
					acceso = datos.getString(1);
					Log.d(this.getClass().getSimpleName(), "usuario: " + usuario);
					Log.d(this.getClass().getSimpleName(), "acceso: " + acceso);
				}
			}
		} catch (Exception e) {
			Log.w(Server.TAG, Server.JSON_EXCEPTION);
		}
	}
	
//	public void leerPublicidad(JSONArray args) {
//		this.callbackContext.success();
//	}
	
//	private void crearParametrosBancos(){
//		String res = "";
//		try {
//			JSONObject raiz = new JSONObject();
//			raiz.put("proceso", proceso);
//			raiz.put("operacion", operacion);
//			raiz.put("accion", "catalogoBancos");
//			
//			JSONObject hijo = new JSONObject();
//			hijo.put("usuario", usuario);
//			hijo.put("acceso", acceso);
//			
//			raiz.put("datosAplicativos", hijo);
//			
//			res = raiz.toString();
//			
//			if(paramTable == null)
//				paramTable = new Hashtable<String, String>();
//			else
//				paramTable.clear();
//
//			paramTable.put("cadenaJSON", res );	
//		}catch (JSONException je){
//			Log.w(Server.TAG, "JSON error. " + je.getMessage());
//		} 
//		catch (Exception e) {
//			Log.w(Server.TAG, "Exception en crearParametrosBancos. " + e.getMessage());
//		}
//	}

	private void crearParametrosPosicionGlobal(){
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_posicionglobal_pr");
			raiz.put("operacion", "imd_posicionglobal_op");
			raiz.put("accion", "posicionglobal");
			
			JSONObject hijo = new JSONObject();
			hijo.put("usuario", usuario);
			hijo.put("acceso", acceso);
			
			raiz.put("datosAplicativos", hijo);
			
			res = raiz.toString();
			
			if(paramTable == null)
				paramTable = new Hashtable<String, String>();
			else
				paramTable.clear();

			paramTable.put("cadenaJSON", res );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en crearParametrosBancos. " + e.getMessage());
		}
	}

}
