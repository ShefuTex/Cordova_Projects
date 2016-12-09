package com.bancomer.btrader.delegates;

import java.util.Hashtable;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;

import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server.ServerOperation;

public class ConsultaInvertirDelegate extends NativeDelegate {
	public ConsultaInvertirDelegate() {
		this.callbackContext = null;
	}
	
	private void recuperaInstrumentoInv(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void recuperaPlazos(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void recuperaDatosConsulta(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void recuperaDatosBarra(JSONArray args) {
		this.callbackContext.success();
	}
	
	@Override
	protected void doNetworkOperation(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void networkResponse(JSONArray args) {
		this.callbackContext.success();
	}
	
	@Override
	public boolean execute(final String action, final JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		SharedBcomPreferences.appContext = this.cordova.getActivity();
		super.init();
		
		this.cordova.getThreadPool().execute(new Runnable() {
			
			@Override
			public void run() {
				if(action.equals("recuperaTasas")) {
					banderaOperacion = ServerOperation.RECUPERA_TASAS_CONSULTA_INVERTIR;
					recuperaTasas(args);
				} else {
					//return super.execute(action, args, callbackContext);
				}
				
			}
		});
		
		return true;
	}

	protected void recuperaTasas(JSONArray args) {
		paramTable = new Hashtable<String, String>();
		try {
			paramTable.put("cadenaJSON", args.getString(0).toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Log.i(this.getClass().getSimpleName(), "Recuperando Tasas - InvertirConsultar");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
		callbackContext.success();
	}
}
