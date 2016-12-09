package com.bancomer.btrader.delegates;

import java.util.Hashtable;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;

import android.util.Log;

public class VentaInvertirDelegate extends NativeDelegate {
	
	String titulosProceso = "imd_inversiones_a_plazo_venta_pr";
	String titulosOperacion = "imd_inversiones_a_plazo_venta_op";
	String titulosAccion = "listaTitulo";
	
	public VentaInvertirDelegate() {
		this.callbackContext = null;
	}

	private void recuperaCuentaDeposito(JSONArray args) {
		this.callbackContext.success();
	}
	
	/**
	 * M�todo para recuperar lista de t�tulos de inversi�n
	 * 
	 * @param datos
	 */
	private void recuperaListaTitulos(JSONArray datos) {
		if(paramTable == null){
			paramTable = new Hashtable<String, String>();
		}else{
			paramTable.clear();
		}
		try {
			JSONObject datosAplicativos = datos.getJSONObject(0);
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_inversiones_a_plazo_venta_pr");
			raiz.put("operacion", "imd_inversiones_a_plazo_venta_op");
			raiz.put("accion", "listaTitulo");
			raiz.put("datosAplicativos", datosAplicativos);
			
			String res = raiz.toString();
			paramTable.put("cadenaJSON", res);
			
		} catch (JSONException e) {
			Log.e("ERROR", "Error "+e.toString());
			e.printStackTrace();
		}
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	/**
	 * M�todo para aplicar venta de inversi�n
	 * 
	 * @param datos
	 */
	private void aplicaVentaInv(JSONArray datos) {
		if(paramTable == null){
			paramTable = new Hashtable<String, String>();
		}else{
			paramTable.clear();
		}
		try {
//			paramTable.put("proceso", datos.getString(0));
//			paramTable.put("operacion", datos.getString(1));
//			paramTable.put("accion", datos.getString(2));
//			JSONObject datosAplicativos = datos.getJSONObject(3);
//			paramTable.put("datosAplicativos", datosAplicativos.toString());
		
			paramTable.put("cadenaJSON", datos.getString(0).toString());
			
		} catch (JSONException e) {
			Log.e("ERROR", "Error "+e.toString());
			e.printStackTrace();
		}
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	private void recuperaContratosCuentasInv(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void recuperaDatosConsulta(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void recuperaDatosBarra(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void recuperaDatosOperaExitosa(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void GeneraPDF(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void guardarImgPreviaRecortadC(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void guardarImgPreviaC(JSONArray args) {
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
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		SharedBcomPreferences.appContext = this.cordova.getActivity();
		super.init();
		
		final String actionInv = action;
		final JSONArray argsInv = args;
		
		this.cordova.getThreadPool().execute(new Runnable() {
			
			@Override
			public void run() {
		
		if(actionInv.equals("recuperaCuentaDeposito")) {
			recuperaCuentaDeposito(argsInv);
		} else if(actionInv.equals("recuperaListaTitulos")) {
			banderaOperacion = Server.ServerOperation.RECUPERA_LISTA_TITULOS;
			recuperaListaTitulos(argsInv);
		} else if(actionInv.equals("aplicaVenta")) {
			banderaOperacion = Server.ServerOperation.APLICA_VENTA_INVERSION;
			aplicaVentaInv(argsInv);	
		} else if(actionInv.equals("recuperaContratosCuentasInv")) {
			recuperaContratosCuentasInv(argsInv);
		} else if(actionInv.equals("recuperaDatosConsulta")) {
			recuperaDatosConsulta(argsInv);
		} else if(actionInv.equals("recuperaDatosBarra")) {
			recuperaDatosBarra(argsInv);
		} else if(actionInv.equals("recuperaDatosOperaExitosa")) {
			recuperaDatosOperaExitosa(argsInv);
		} else if(actionInv.equals("GeneraPDF")) {
			GeneraPDF(argsInv);
		} else if(actionInv.equals("guardarImgPreviaRecortadC")) {
			guardarImgPreviaRecortadC(argsInv);
		} else if(actionInv.equals("guardarImgPreviaC")) {
			guardarImgPreviaC(argsInv);
		} else if(actionInv.equals("doNetworkOperation")) {
			doNetworkOperation(argsInv);
		} else if(actionInv.equals("networkResponse")) {
			networkResponse(argsInv);
		} else {
			//return super.execute(actionInv, argsInv, callbackContext);
		}
		}
		});
		return true;
	}
		
}
