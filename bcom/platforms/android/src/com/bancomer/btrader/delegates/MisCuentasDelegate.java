package com.bancomer.btrader.delegates;

import java.util.Hashtable;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;

public class MisCuentasDelegate extends NativeDelegate {

	public MisCuentasDelegate() {
		callbackContext = null;
	}

	public void recuperaCuentasTDDPesos(JSONArray args) {
		paramTable = new Hashtable<String, String>();
		try {
			paramTable.put("cadenaJSON", args.getString(0).toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Log.i(this.getClass().getSimpleName(), "Recuperando movimientos cuentas MXP");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
		//callbackContext.success();
	}
	
	public void recuperaCuentasDolares(JSONArray args) {
		paramTable = new Hashtable<String, String>();
		try {
			paramTable.put("cadenaJSON", args.getString(0).toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Log.i(this.getClass().getSimpleName(), "Recuperando movimientos cuentas USD");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
		//callbackContext.success();
	}
	
	public void recuperaCuentasTDCPesos(JSONArray args) {
		paramTable = new Hashtable<String, String>();
		try {
			paramTable.put("cadenaJSON", args.getString(0).toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Log.i(this.getClass().getSimpleName(), "Recuperando movimientos TDC");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
		//callbackContext.success();
	}
	
	public void networkResponse(JSONArray args) {
		callbackContext.success();
	}
	
	@Override
	public boolean execute(final String action, final JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		SharedBcomPreferences.appContext = this.cordova.getActivity();
		super.init();
		
		this.cordova.getThreadPool().execute(new Runnable() {
			
			@Override
			public void run() {
				if(action.equals("recuperaCuentasTDDPesos")) {
					banderaOperacion = Server.ServerOperation.MOVIMIENTOS_CTAS_CHEQUES;
					recuperaCuentasTDDPesos(args);
				} else if(action.equals("recuperaCuentasDolares")) {
					banderaOperacion = Server.ServerOperation.MOVIMIENTOS_CTAS_USD;
					recuperaCuentasDolares(args);
				} else if(action.equals("recuperaCuentasTDCPesos")) {
					banderaOperacion = Server.ServerOperation.MOVIMIENTOS_TDC;
					recuperaCuentasTDCPesos(args);
				} else if(action.equals("doNetworkOperation")) {
					doNetworkOperation(args);
				} else if(action.equals("networkResponse")) {
					networkResponse(args);
				}else if(action.equals("pagoMinimoNoInteres")){
					banderaOperacion = Server.ServerOperation.PAGO_MINIMO_NO_INTERES;
					pagoMinimoNoInteres(args);
				}else {
					//return super.execute(action, args, callbackContext);
				}
				
			}
		});
		
		return true;
	}

	public void pagoMinimoNoInteres(JSONArray datos) {
		if(paramTable == null){
			paramTable = new Hashtable<String, String>();
		}else{
			paramTable.clear();
		}
		try {
			paramTable.put("cadenaJSON", datos.getString(0));	
			
		} catch (JSONException e) {
			Log.e("ERROR", "Error "+e.toString());
			e.printStackTrace();
		}
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}	
	
	@Override
	protected void doNetworkOperation(JSONArray args) {
		Log.i("doNetWorkOperation => JSONArray args = " + args, null);
		
		switch (banderaOperacion) {
		case MOVIMIENTOS_CTAS_CHEQUES:
			setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case MOVIMIENTOS_CTAS_USD:
			setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case MOVIMIENTOS_TDC:
			setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
			leerDatosResponse(getRespuesta());
		default:
			break;
		}
		
		callbackContext.success();
	}
}
