package com.bancomer.btrader.controllers;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import com.bancomer.btrader.delegates.NativeDelegate;

public class SeleccionCuentaViewController extends NativeDelegate {
private CallbackContext callbackContext;
	
	public SeleccionCuentaViewController() {
		this.callbackContext = null;
	}
	
	public void inicio(){
		this.callbackContext.success();
	}
	
	private void cargaListaSeleccionComponent(){
		this.callbackContext.success();
	}
	
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		
		if(action.equals("inicio")) {
			inicio();
		} else if(action.equals("cargaListaSeleccionComponent")) {
			cargaListaSeleccionComponent();
		} else {
			return super.execute(action, args, callbackContext);
		}
		
		return true;
	}
}
