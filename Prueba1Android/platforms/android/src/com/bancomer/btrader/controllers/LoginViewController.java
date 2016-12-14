package com.bancomer.btrader.controllers;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import com.bancomer.btrader.delegates.NativeDelegate;

public class LoginViewController extends NativeDelegate {
//	private String numTarjeta;
//	private String password;
	
	public LoginViewController() {
		this.callbackContext = null;
	}
	
	public void asignarDatos(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void leerDatos(JSONArray args) {
		this.callbackContext.success();
	}

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		
		if(action.equals("asignarDatos")) {
			asignarDatos(args);
		} else if(action.equals("leerDatos")) {
			leerDatos(args);
		} else {
			return super.execute(action, args, callbackContext);
		}
		
		return true;
	}
	
	
}
