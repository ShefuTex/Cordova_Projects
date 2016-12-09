package com.bancomer.btrader.delegates;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

public class MenuDelegate extends NativeDelegate {

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		// TODO Auto-generated method stub
		return super.execute(action, args, callbackContext);
	}
	
	@Override
	protected void doNetworkOperation(JSONArray datos) {
		// TODO Auto-generated method stub
		super.doNetworkOperation(datos);
	}
	
	@Override
	protected void leerDatosOperacion(JSONArray datos) {
		// TODO Auto-generated method stub
		super.leerDatosOperacion(datos);
	}
	
	@Override
	protected void leerDatosResponse(
			com.bancomer.btrader.persistence.ServerResponse respuesta) {
		// TODO Auto-generated method stub
		super.leerDatosResponse(respuesta);
	}

}
