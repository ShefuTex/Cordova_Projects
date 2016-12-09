package com.bancomer.btrader.delegates;

import java.util.Hashtable;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;

import com.bancomer.btrader.BCom;
import com.bancomer.btrader.persistence.ServerResponse;
import com.bancomer.btrader.session.Server;
import com.bancomer.btrader.session.Server.EstadoRespuesta;

public class NativeDelegate extends CordovaPlugin{
	private int procesosActivos;
	protected CallbackContext callbackContext;
	protected PluginResult pluginResult = null;
	
	protected HttpInvoker invoker = null;
	protected Hashtable<String, String> paramTable = null;
	
	protected Server.ServerOperation banderaOperacion = null;
	protected ServerResponse respuesta = null;
	
	protected static String numTarjeta = "";
	protected String password = "";
	protected int banderaAplicacion = 0;
	protected int banderaInvitado = 0;
	protected String userName2 = "";
	protected String proceso = "";
	protected String operacion = "";
	protected String accion = "";
	protected String usuario = "";
	protected String acceso = "";
	
	
	//WEBTRADER
	protected String idPeriodo = ""; 
	protected String idContrato = "";
	protected String tipo = "";
	protected String claveOperaciones = "";
	protected String serie = ""; 
	protected String digitoVerificador = "";
	protected String precioLimite = "";
	protected String empresa = "";
	protected String simulacion = "";
	protected String fechaRegistro = "";
	protected String emisora = "";
	protected String folio = "";
	protected String otp = "";
	protected String tipoOperacion = "";
	protected String ordenesPendientes = "";
	protected String tripletaTasa = "";
	protected String titulos = "";
	protected String tripleTasa = "";
	protected String fechaVigencia = "";
	protected String emailBeneficiario = "";
	protected String copiaTitular = "";
	protected String mensaje = "";
	protected String validaTipo = "";
	protected String sim = "";
	protected String UReLe = "";
	protected String idContratoPatrimonial = "";
	protected String idCuentaAbonoEfec = "";
	protected String idCuentaCargoEfec  = "";
	protected String importeTransEfec = "";
	
	public NativeDelegate() {
		super();
		this.callbackContext = null;
	}
	
	public void init(){
		invoker = HttpInvoker.getInstance();
	}
	
	protected void leerDatosOperacion(JSONArray datos){}
	
	protected void leerDatosResponse(ServerResponse respuesta){
		Log.d("RESPONSE STATUS", respuesta.getEstado().name());
		
		if(callbackContext != null){			
			if(respuesta.getEstado() == EstadoRespuesta.Ok) {
				Log.d("RESPONSE DATA", respuesta.getJsonResultante());
				pluginResult = new PluginResult(Status.OK, respuesta.getJsonResultante());

			}else if(respuesta.getEstado() == EstadoRespuesta.ARQ){
				Log.d("RESPONSE MESSAGE", respuesta.getMensaje());
				Log.d("RESPONSE DATA", respuesta.getJsonResultante());
				pluginResult = new PluginResult(Status.ERROR,respuesta.getJsonResultante());
				callbackContext.sendPluginResult(pluginResult);
				if(respuesta.getCodigoError().startsWith("HTTP:"))
					pluginResult = new PluginResult(Status.IO_EXCEPTION, respuesta.getMensaje() + "|" + respuesta.getCodigoError());
				else
					pluginResult = new PluginResult(Status.ERROR, respuesta.getMensaje() + "|" + respuesta.getCodigoError());
			} else if (respuesta.getEstado() == EstadoRespuesta.Fail) {
				Log.d("RESPONSE MESSAGE", respuesta.getMensaje());
				Log.d("RESPONSE DATA", respuesta.getJsonResultante());
				if(respuesta.getMensaje().contains("Ocurrió un Error en su Conexión")){
					pluginResult = new PluginResult(Status.ERROR,respuesta.getJsonResultante());
					callbackContext.sendPluginResult(pluginResult);
					if(respuesta.getCodigoError().startsWith("HTTP:"))
						pluginResult = new PluginResult(Status.IO_EXCEPTION, respuesta.getMensaje() + "|" + respuesta.getCodigoError());
					else{
						pluginResult = new PluginResult(Status.ERROR, respuesta.getMensaje() + "|" + respuesta.getCodigoError());
					}
				}else{
				BCom.getInstance().showInformationAlert(respuesta.getMensaje());
				pluginResult = new PluginResult(Status.ERROR,respuesta.getJsonResultante());
				callbackContext.sendPluginResult(pluginResult);
				if(respuesta.getCodigoError().startsWith("HTTP:"))
					pluginResult = new PluginResult(Status.IO_EXCEPTION, respuesta.getMensaje() + "|" + respuesta.getCodigoError());
				else
					pluginResult = new PluginResult(Status.ERROR, respuesta.getMensaje() + "|" + respuesta.getCodigoError());
				}
				}
			
			callbackContext.sendPluginResult(pluginResult);
		}
	}
	
	protected void doNetworkOperation(JSONArray datos){}
	
	protected void doNetworkResponse(){}
	
	public void setRespuesta(ServerResponse respuesta) {
		this.respuesta = respuesta;
	}
	
	public ServerResponse getRespuesta() {
		return respuesta;
	}
	
	public void limpiarMemoria(JSONArray args) {
		
	}
	
	public void reconocerProcesosActivos(JSONArray args) {
		
	}

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		
		if(action.equals("limpiarMemoria")) {
			limpiarMemoria(args);
		} else if(action.equals("reconocerProcesosActivos")) {
			reconocerProcesosActivos(args);
		} else {
			return super.execute(action, args, callbackContext);
		}
		
		return true;
	}
	
	public void pararHilos(){
		this.cordova.getThreadPool().shutdownNow();
	}
	
}
