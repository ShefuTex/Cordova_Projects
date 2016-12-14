package com.bancomer.btrader.delegates;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

public class BaseGraficasDelegate extends NativeDelegate {
	public BaseGraficasDelegate() {
		callbackContext = null;
	}
	
	@Override
	public void doNetworkOperation(JSONArray args) {
		callbackContext.success();
	}
	
	public void networkResponse(JSONArray args) {
		callbackContext.success();
	}
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		
		if(action.equals("doNetworkOperation")) {
			doNetworkOperation(args);
		} else if(action.equals("networkResponse")) {
			networkResponse(args);
		} else {
			return super.execute(action, args, callbackContext);
		}
		
		return true;
	}
}
