

package com.bancomer.btrader.common;

import java.util.Hashtable;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.bancomer.btrader.delegates.NativeDelegate;
import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;


public class KeepAliveServicio extends NativeDelegate{

	public KeepAliveServicio(){
		callbackContext = null;
	}
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		//SharedBcomPreferences.appContext = this.cordova.getActivity();
		super.init();
		
		final String actionInv = action;
		final JSONArray argsInv = args;
		
	//	this.cordova.getThreadPool().execute(new Runnable() {
			
			//@Override
			//public void run() {
 if(actionInv.equals("wtConsultaContratosPatrimoniales")) {
					banderaOperacion = Server.ServerOperation.CONSULTA_CONTRATOS_PATRIMONIALES;
					doNetworkOperation(argsInv);
					}
			//	}
		//});
		
		return true;
	}
	
	@Override
	protected void doNetworkOperation(JSONArray datos) {
		//leerDatosOperacion(datos);
		
		parametrosContratosPatrimoniales();
		setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.CONSULTA_CONTRATOS_PATRIMONIALES, paramTable));
		leerDatosResponse(getRespuesta());
		
		
	}
	
	

	
	
	
	private void parametrosContratosPatrimoniales(){
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_ob_consulta_posicion_global_pr");
			raiz.put("operacion", "imd_ob_consulta_posicion_global_op");
			raiz.put("accion", "consultaContratosPatrimoniales");
			
			JSONObject hijo = new JSONObject();

			hijo.put("usuario", "ADMINF" );
			hijo.put("acceso", numTarjeta + Server.USUARIO_INVOCAWEBSEAL);
			
			raiz.put("datosAplicativos", hijo);
			
			res = raiz.toString();
			
			
			
	
			Log.d("RAIZ_TOKEN",raiz.toString());
			
			Log.d("Usuario_TOKEN",Server.USUARIO_INVOCAWEBSEAL);
			
			
			
			if(paramTable == null)
				paramTable = new Hashtable<String, String>();
			else
				paramTable.clear();
			
			paramTable.put("cadenaJSON", res );
			
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en crearJSONLog1. " + e.getMessage());
		}
	}	
}


