package com.bancomer.btrader.delegates;

import java.util.Hashtable;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;

public class EdoCuentaDelegate extends NativeDelegate {
	
	private String ACCION_CONSULTA_PERIODOS="consultaPeriodos";
	
	private String ACCION_CONSULTA_EDO_CUENTA="consultaEstadoDeCuenta";
	
	public EdoCuentaDelegate() {
		callbackContext = null;
	}

	public void recuperaCuentasTDDPesos(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void recuperaCuentasDolares(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void recuperaCuentasTDCPesos(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void recuperaPeriodos(JSONArray datos) {
		if(paramTable == null){
			paramTable = new Hashtable<String, String>();
		}else{
			paramTable.clear();
		}
		try {
			
			JSONObject padre = new JSONObject();
			padre.put("proceso", datos.getString(0));
			padre.put("operacion", datos.getString(1));
			padre.put("accion", ACCION_CONSULTA_PERIODOS);
			JSONObject datosAplicativos = datos.getJSONObject(2);
			padre.put("datosAplicativos", datosAplicativos);
			
			paramTable.put("cadenaJSON", padre.toString() );
					
		} catch (JSONException e) {
			Log.e("ERROR", "Error "+e.toString());
			e.printStackTrace();
		}
		
		/*if(paramTable == null){
			paramTable = new Hashtable<String, String>();
		}else{
			paramTable.clear();
		}
		try {
			
			JSONObject padre = new JSONObject();
			padre.put("proceso", datos.getString(0));
			padre.put("operacion", datos.getString(1));
			padre.put("accion", datos.getString(2));
			JSONObject datosAplicativos = datos.getJSONObject(3);
			padre.put("datosAplicativos", datosAplicativos);
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );*/
		
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	public void consultaEstadoDeCuenta(JSONArray datos) {
		if(paramTable == null){
			paramTable = new Hashtable<String, String>();
		}else{
			paramTable.clear();
		}
		try {
			
			
			/*
			paramTable.put("proceso", datos.getString(0));
			paramTable.put("operacion", datos.getString(1));
			paramTable.put("accion", ACCION_CONSULTA_EDO_CUENTA);
			JSONObject datosAplicativos = datos.getJSONObject(2);
			paramTable.put("datosAplicativos", datosAplicativos.toString());
			*/
			
			JSONObject padre = new JSONObject();
			padre.put("proceso", datos.getString(0));
			padre.put("operacion", datos.getString(1));
			padre.put("accion", ACCION_CONSULTA_EDO_CUENTA);
			
			JSONObject datosAplicativos = datos.getJSONObject(2);
			padre.put("datosAplicativos", datosAplicativos);
			
			paramTable.put("cadenaJSON", padre.toString() );
			
			
		} catch (JSONException e) {
			Log.e("ERROR", "Error "+e.toString());
			e.printStackTrace();
		}
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	public void recuperaDatosPDF(JSONArray args) {
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		this.callbackContext.success();
	}
	
	public void GeneraPDF(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void guardarImgPreviaRecortadE(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void guardarImgPreviaE(JSONArray args) {
		this.callbackContext.success();
	}
	
	@Override
	public void doNetworkOperation(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void networkResponse(JSONArray args) {
		this.callbackContext.success();
	}
	
	@Override
	public boolean execute(final String action, final JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		SharedBcomPreferences.appContext = this.cordova.getActivity();
		super.init();

		Log.v(this.getClass().getSimpleName(), args.toString());
		
		this.cordova.getThreadPool().execute(new Runnable() {
			
			@Override
			public void run() {
		
				if(action.equals("recuperaCuentasTDDPesos")) {
					recuperaCuentasTDDPesos(args);
				} else if(action.equals("recuperaCuentasDolares")) {
					recuperaCuentasDolares(args);
				} else if(action.equals("recuperaCuentasTDCPesos")) {
					recuperaCuentasTDCPesos(args);
				} else if(action.equals("recuperaPeriodos")) {
					banderaOperacion = Server.ServerOperation.RECUPERA_PERIODOS;
					recuperaPeriodos(args);
				} else if(action.equals("recuperaDatosPDF")) {
					recuperaDatosPDF(args);
				} else if(action.equals("GeneraPDF")) {
					GeneraPDF(args);
				} else if(action.equals("guardarImgPreviaRecortadE")) {
					guardarImgPreviaRecortadE(args);
				} else if(action.equals("guardarImgPreviaE")) {
					guardarImgPreviaE(args);
				} else if(action.equals("doNetworkOperation")) {
					doNetworkOperation(args);
				} else if(action.equals("networkResponse")) {
					networkResponse(args);
				} else if (action.equals("consultaEstadoDeCuenta")){
					banderaOperacion = Server.ServerOperation.CONSULTA_EDO_CUENTA;
					consultaEstadoDeCuenta(args);
				} else {
					//return super.execute(action, args, callbackContext);
				}
			}
		});
		
		return true;
	}
}
