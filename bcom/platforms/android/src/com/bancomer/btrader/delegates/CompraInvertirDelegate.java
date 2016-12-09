package com.bancomer.btrader.delegates;

import java.util.Hashtable;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.bancomer.btrader.BCom;
import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;

public class CompraInvertirDelegate extends NativeDelegate {
	public CompraInvertirDelegate() {
		this.callbackContext = null;
	}
	
	private void recuperaCuentaRetiro(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void recuperaContratosCuentasInv(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void recuperaInstrumentoInv(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void recuperaPlazos(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void recuperaInstrumentoPagoCap(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void recuperaInstrumentoPagoInt(JSONArray args) {
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
	
	private void aplicaCompra(JSONArray datos) {
		if(paramTable == null){
			paramTable = new Hashtable<String, String>();
		}else{
			paramTable.clear();
		}
		try {
			paramTable.put("proceso", datos.getString(0));
			paramTable.put("operacion", datos.getString(1));
			paramTable.put("accion", datos.getString(2));
			JSONObject datosAplicativos = datos.getJSONObject(3);
			paramTable.put("datosAplicativos", datosAplicativos.toString());
			
		} catch (JSONException e) {
			Log.e("ERROR", "Error "+e.toString());
			e.printStackTrace();
		}
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	public void muestraAlert(JSONArray args) {
		String title = null, message = null, positiveButtonText = null, negativeButtonText = null;
		
		if(args.length() < 3) {
			callbackContext.error("showAlert need al least 3 params.");
			return;
		}
		
		try {
			title = args.getString(0);
			message = args.getString(1);
			positiveButtonText = args.getString(2);
			
			if(args.length() > 3) {
				negativeButtonText = args.getString(3);
			} else {
				negativeButtonText = null;
			}
		} catch (JSONException ex) {
			Log.e(this.getClass().getSimpleName(), "showAlert need al least 3 params.", ex);
			callbackContext.error("showAlert need al least 3 params.");
			return;
		}
		
		BCom.getInstance().showAlert(this.callbackContext, title, message, positiveButtonText, negativeButtonText);
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
		
				if(action.equals("recuperaCuentaRetiro")) {
					recuperaCuentaRetiro(args);
				} else if(action.equals("muestraAlert")) { 
					muestraAlert(args);
				} else if(action.equals("recuperaContratosCuentasInv")) {
					recuperaContratosCuentasInv(args);
				} else if(action.equals("recuperaInstrumentoInv")) {
					recuperaInstrumentoInv(args);
				} else if(action.equals("recuperaPlazos")) {
					recuperaPlazos(args);
				} else if(action.equals("recuperaInstrumentoPagoCap")) {
					recuperaInstrumentoPagoCap(args);
				} else if(action.equals("recuperaInstrumentoPagoInt")) {
					recuperaInstrumentoPagoInt(args);
				} else if(action.equals("recuperaDatosConsulta")) {
					recuperaDatosConsulta(args);
				} else if(action.equals("recuperaDatosBarra")) {
					recuperaDatosBarra(args);
				} else if(action.equals("recuperaDatosOperaExitosa")) {
					recuperaDatosOperaExitosa(args);
				} else if(action.equals("GeneraPDF")) {
					GeneraPDF(args);
				} else if(action.equals("guardarImgPreviaRecortadC")) {
					guardarImgPreviaRecortadC(args);
				} else if(action.equals("guardarImgPreviaC")) {
					guardarImgPreviaC(args);
				} else if(action.equals("doNetworkOperation")) {
					doNetworkOperation(args);
				} else if(action.equals("networkResponse")) {
					networkResponse(args);
				} else if(action.equals("aplicaCompra")) {
					banderaOperacion = Server.ServerOperation.APLICA_COMPRA_INVERSION;
					aplicaCompra(args);
				} else {
//					return super.execute(action, args, callbackContext);
				}
			}
		});
		
		return true;
	}
}
