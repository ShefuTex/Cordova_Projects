package com.bancomer.btrader.controllers;

import java.util.Hashtable;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.bancomer.btrader.delegates.NativeDelegate;
import com.bancomer.btrader.persistence.ServerResponse;
import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;
import com.bancomer.btrader.session.Server.EstadoRespuesta;

public class TokenViewController extends NativeDelegate{
	private String digitoTASA = "";
	private String posicionTASA = "";
	private String otp = "";

	public TokenViewController(){
		callbackContext = null;
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
				if(actionInv.equals("doNetworkOperation")) {
					banderaOperacion = Server.ServerOperation.LOGIN_TWO;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("downloadBanksCatalog")) {
					banderaOperacion = Server.ServerOperation.CATALOGO_BANCOS;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("downloadBusinessRules")) {
					banderaOperacion = Server.ServerOperation.REGLAS_DE_NEGOCIO;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("wtConsultaTipoServicio")) {
					banderaOperacion = Server.ServerOperation.WT_CONSULTA_TIPO_SERVICIO;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("wtConsultaContratosPatrimoniales")) {
					banderaOperacion = Server.ServerOperation.CONSULTA_CONTRATOS_PATRIMONIALES;
					doNetworkOperation(argsInv);
				}else if(actionInv.equals("wtDiaHabil")) {
					banderaOperacion = Server.ServerOperation.WTDIA_HABIL;
					doNetworkOperation(argsInv);
				}
				
				/*
				 * - (void) wtDiaHabil:(CDVInvokedUrlCommand *)command
{
    [super doNetworkOperation:command];
    
    NSString *usuario = [self.argumentos objectAtIndex: 0];
    
    [self.httpInvoker wtDiaHabil:usuario forClient:self];
}
				 */
			}
		});
		
		return true;
	}
	
	@Override
	protected void doNetworkOperation(JSONArray datos) {
		leerDatosOperacion(datos);
		
		switch (banderaOperacion) {
		case LOGIN_TWO:
			crearParametrosLog2();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.LOGIN_TWO, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case CATALOGO_BANCOS:
			crearParametrosCatalogoBancos();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.CATALOGO_BANCOS, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case REGLAS_DE_NEGOCIO:
			paramTable.clear();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.REGLAS_DE_NEGOCIO, paramTable));
			if(EstadoRespuesta.Ok == getRespuesta().getEstado()) {
				SharedBcomPreferences.getInstance().setPreferencia("tarjeta", numTarjeta);
				Log.v(this.getClass().getSimpleName(), "Tarjeta guardada: " + numTarjeta);
			}
			leerDatosResponse(getRespuesta());
			break;
		case WT_CONSULTA_TIPO_SERVICIO:
			parametrosConsultaServicio();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.WT_CONSULTA_TIPO_SERVICIO, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case CONSULTA_CONTRATOS_PATRIMONIALES:
			parametrosContratosPatrimoniales();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.CONSULTA_CONTRATOS_PATRIMONIALES, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case WTDIA_HABIL:
			parametrosRecuperaFestivos();
			
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.RECUPERA_FESTIVOS, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		}
	}
	
	
	@Override
	protected void leerDatosOperacion(JSONArray datos) {
		try {
			if(banderaOperacion == Server.ServerOperation.LOGIN_TWO){
				//JQH //password = datos.getString(1);
				
				if(datos.length() > 4){//JQH //3){
					digitoTASA = datos.getString(2);
					posicionTASA = datos.getString(3);
				}else
					otp = datos.getString(0);
			} 
		} catch (Exception e) {
			Log.w(Server.TAG, Server.JSON_EXCEPTION);
		}
	}
	
	public void parametrosRecuperaFestivos() {
		/*
		 *    var datApl = {
        usuario: usuario_global,
        acceso: acceso_usr_global,
        standin: true
    }
    
    var peticionFestivos = {
        proceso: "imd_transferencias_interbancarias_pr",
        operacion: "imd_transferencias_interbancarias_op",
        accion: "datosRegistroPago",
        datosAplicativos: datApl
    }
		 */
		
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_transferencias_interbancarias_pr");
			raiz.put("operacion", "imd_transferencias_interbancarias_op");
			raiz.put("accion", "datosRegistroPago");
			
			JSONObject hijo = new JSONObject();
			hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
			hijo.put("acceso", numTarjeta);
			hijo.put("standin", "true");
			
			raiz.put("datosAplicativos", hijo);
			
			res = raiz.toString();
		
			Log.v(this.getClass().getSimpleName(), "JSON Dias Festivos: " +res);
			
			
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
	
	private void crearParametrosLog2(){
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "i_signon_pr");
			raiz.put("operacion", "i_signon_op");
			raiz.put("accion", "logon2");
			
			JSONObject hijo = new JSONObject();
			hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
			hijo.put("acceso", numTarjeta);
			hijo.put("posicionTASA", posicionTASA);
			hijo.put("digitoTASA", digitoTASA);
			hijo.put("otp", otp);
			
			raiz.put("datosAplicativos", hijo);
			
			res = raiz.toString();
			
			if(paramTable == null)
				paramTable = new Hashtable<String, String>();
			else
				paramTable.clear();
			
			paramTable.put("username", numTarjeta + Server.USUARIO_INVOCAWEBSEAL );
			paramTable.put("password", password );
			paramTable.put("login-form-type", "pwd");
			paramTable.put("recepcionJSON", "true" );
			paramTable.put("cadenaJSON", res );
			
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en crearJSONLog1. " + e.getMessage());
		}
	}
	
	private void crearParametrosCatalogoBancos(){
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_registro_cuentas_otros_bancos_pr");
			raiz.put("operacion", "imd_catalogo_bancos_op");
			raiz.put("accion", "catalogoBancos");
			raiz.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
			raiz.put("acceso", numTarjeta);
			
			res = raiz.toString();
			
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

	private void parametrosConsultaServicio(){
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_ob_servicio_pr");
			raiz.put("operacion", "imd_ob_servicio_op");
			raiz.put("accion", "consultaTipoServicio");
			
			JSONObject hijo = new JSONObject();

			hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
			//hijo.put("uri", "http://148.244.45.93/mexiconetblg/mxdydni/camilaProxy");
			hijo.put("uri", "https://a1.bbvanet.com.mx/mexiconetni/mexiconetni/mexiconetblg/camilaProxy");
			hijo.put("acceso", "D0023132");
			
			raiz.put("datosAplicativos", hijo);
			
			res = raiz.toString();
			
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
	
	
	private void parametrosContratosPatrimoniales(){
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_ob_consulta_posicion_global_pr");
			raiz.put("operacion", "imd_ob_consulta_posicion_global_op");
			raiz.put("accion", "consultaContratosPatrimoniales");
			
			JSONObject hijo = new JSONObject();

			hijo.put("usuario", "ADMINF" );
			hijo.put("acceso", numTarjeta+Server.USUARIO_INVOCAWEBSEAL);
			
			raiz.put("datosAplicativos", hijo);
			
			res = raiz.toString();
			
			
			
			Log.d("RESTOKEN",res);
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
