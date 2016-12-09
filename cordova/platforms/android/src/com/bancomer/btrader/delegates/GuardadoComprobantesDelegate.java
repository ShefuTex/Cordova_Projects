package com.bancomer.btrader.delegates;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

public class GuardadoComprobantesDelegate extends NativeDelegate {
	
	public GuardadoComprobantesDelegate() {
		this.callbackContext = null;
	}

	public void recuperaEdosCuenta(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void recuperaComprobantes(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void recuperaImgComprobantes(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void recuperaImgEdosCuenta(JSONArray args) {
		this.callbackContext.success();
	}
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		
		if(action.equals("recuperaEdosCuenta")) {
			recuperaEdosCuenta(args);
		} else if(action.equals("recuperaComprobantes")) {
			recuperaComprobantes(args);
		} else if(action.equals("recuperaImgComprobantes")) {
			recuperaImgComprobantes(args);
		} else if(action.equals("recuperaImgEdosCuenta")) {
			recuperaImgEdosCuenta(args);
		} else {
			return super.execute(action, args, callbackContext);
		}
		
		return true;
	}
}
