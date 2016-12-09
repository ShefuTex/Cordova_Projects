package com.bancomer.btrader.delegates;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

public class WebTraderDelegate extends NativeDelegate {
	private boolean banderaUsoInfobolsa;
	private CallbackContext callbackContext;
	
	public WebTraderDelegate() {
		this.callbackContext = null;
	}
	
	public void recuperaContratosPatrimoniales(JSONArray args){
		this.callbackContext.success();
	}
	
	public void recuperaTipoServicio(JSONArray args){
		this.callbackContext.success();
	}
	
	public void recuperaConsultaTipoCapitales(JSONArray args){
		this.callbackContext.success();
	}
	
	public void recuperaConsultaCapitales(JSONArray args){
		this.callbackContext.success();
	}
	
	public void ejecutaCompraVenta(JSONArray args){
		this.callbackContext.success();
	}
	
	public void ejecutaCancelacion(JSONArray args){
		this.callbackContext.success();
	}
	
	@Override
	public void limpiarMemoria(JSONArray args){
		this.callbackContext.success();
	}
	
	@Override
	public void doNetworkOperation(JSONArray args){
		this.callbackContext.success();
	}
	
	public void networkResponse(JSONArray args){
		this.callbackContext.success();
	}
	
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		
		if(action.equals("recuperaContratosPatrimoniales")) {
			recuperaContratosPatrimoniales(args);
		} else if(action.equals("recuperaTipoServicio")) {
			recuperaTipoServicio(args);
		}else if(action.equals("recuperaConsultaTipoCapitales")){
			recuperaConsultaTipoCapitales(args);
		} else if(action.equals("recuperaConsultaCapitales")){
			recuperaConsultaCapitales(args);
		}else if(action.equals("ejecutaCompraVenta")){
			ejecutaCompraVenta(args);
		}else if(action.equals("ejecutaCancelacion")){
			ejecutaCancelacion(args);
		}else if(action.equals("limpiarMemoria")){
			limpiarMemoria(args);
		}else if(action.equals("doNetworkOperation")){
			doNetworkOperation(args);
		}else if(action.equals("networkResponse")){
			networkResponse(args);
		}else {
			return super.execute(action, args, callbackContext);
		}
		
		return true;
	}
}
