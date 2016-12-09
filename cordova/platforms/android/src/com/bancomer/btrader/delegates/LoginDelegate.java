package com.bancomer.btrader.delegates;

import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.content.DialogInterface;
import android.content.DialogInterface.OnCancelListener;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;

import com.bancomer.btrader.BCom;
import com.bancomer.btrader.persistence.ServerResponse;
import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;
import com.bancomer.btrader.session.Server.EstadoRespuesta;
import com.bancomer.btrader.session.Server.PersistentJsonFile;
import com.bancomer.btrader.session.Server.ServerModes;
import com.bancomer.btrader.session.Server.ServerOperation;
import com.bancomer.btrader.session.Session;
import com.bancomer.btrader.utils.Utilerias;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.apache.http.client.CookieStore;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Hashtable;

import io.cordova.hellocordova.R;

//Todo se edito la ruta del R

public class LoginDelegate extends NativeDelegate {
	private static LoginDelegate theInstance = null;

	public static LoginDelegate getInstance() {
		return theInstance;
	}
	
	public LoginDelegate() {
		super();
		theInstance = this;
	}
	//Enserio esto es necesario ?
	public String hola()
	{
		String saludo ="Hola";
		return saludo;
		
	}

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		SharedBcomPreferences.appContext = this.cordova.getActivity();
		super.init();
	
		final String actionInv = action;
		final JSONArray argsInv = args;
		
		Log.v(this.getClass().getSimpleName(), args.toString());
		
		this.cordova.getThreadPool().execute( new Runnable() {
			
			@Override
			public void run() {
				 

				if(actionInv.equals("consultaDatosGuardados")) {
					loadOwnerCardNumber();
				} else if(actionInv.equals("showAlert")) { 
					showAlert(argsInv);
				} else if(actionInv.equals("seleccionDesbloquear")) {
					showBancomerWebPage();
				} else if(actionInv.equals("doNetworkOperation")) {
					banderaOperacion = Server.ServerOperation.CONECTAR_WEBSEAL;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals(Server.ServerOperation.LOGIN_ONE.name())) {
					banderaOperacion = Server.ServerOperation.LOGIN_ONE;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("logout")) {
					banderaOperacion = Server.ServerOperation.SING_OFF;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("seleccionDesbloquear")) {
					seleccionDesbloquear(argsInv);
				} else if(actionInv.equals("seleccionAutoSeguro")) {
					seleccionAutoSeguro(argsInv);
				} else if(actionInv.equals("seleccionBEstratega")) {
					seleccionBEstratega(argsInv);
				} else if(actionInv.equals("seleccionGeoLocalizacion")) {
					seleccionGeoLocalizacion(argsInv);
				} else if(actionInv.equals("limpiarMemoria")) {
					limpiarMemoria(argsInv);
				} else if (actionInv.equals("getServerMode")) {
					getServerMode();
				} else if(actionInv.equals("wtLogout")){
					banderaOperacion = Server.ServerOperation.SING_OFF;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("wtconsultaDetalleInversion")) {
					banderaOperacion = Server.ServerOperation.CONSULTA_DETALLE_INVERSION;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("wtconsultaCapitales")) {
					banderaOperacion = Server.ServerOperation.CONSULTA_CAPITALES;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("wtrealizaCompraVenta")) {
					banderaOperacion = Server.ServerOperation.REALIZAR_COMPRA_VENTA;
					doNetworkOperation(argsInv);					
				} else if(actionInv.equals("wtcancelaOrden")) {
					banderaOperacion = Server.ServerOperation.CANCELA_ORDEN;
					doNetworkOperation(argsInv);
				}else if(actionInv.equals("wtdetalleOrden")){
					banderaOperacion = Server.ServerOperation.DETALLE_ORDEN;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("wtenvioEmail")){
					banderaOperacion = Server.ServerOperation.ENVIO_CORREO_COMPRA_VENTA;
					doNetworkOperation(argsInv);
				} else if(actionInv.equals("wtaperturaFichero")){
					
					banderaOperacion = Server.ServerOperation.ENVIO_APERTURA_FICHERO;
					doNetworkOperation(argsInv);
				} else if (actionInv.equals("wtListaCuentas")){
					banderaOperacion = Server.ServerOperation.LISTA_CUENTAS_EFECTIVO;
					doNetworkOperation(argsInv);
				} else if (actionInv.equals("wtaplicaTraspaso")){
					banderaOperacion = Server.ServerOperation.APLICA_TRASPASO_EFECTIVO;
					doNetworkOperation(argsInv);	
				} else if (actionInv.equals("wtReglasValor")){
					banderaOperacion = Server.ServerOperation.REGLAS_VALOR;
					doNetworkOperation(argsInv);	
				}else if (actionInv.equals("versionServidor")){
					banderaOperacion = Server.ServerOperation.VERSION_SERVIDOR; 
					doNetworkOperation(argsInv);
					//servicioServidor();
				}
			}
			});
		
		return true;
	}

	@Override
	public void doNetworkOperation(JSONArray datos) {
		boolean wifi = Utilerias.hayInternet();
		if(wifi == true){
			Log.d("IF", "Con internet");
	
		switch (banderaOperacion) {
		case CONECTAR_WEBSEAL:
			boolean previousSessionClosedSuccessfully = closePreviousSession();
			
			if(!previousSessionClosedSuccessfully){
				callbackContext.error(Server.EMPTY_STRING);
				return;
			}
			
			try {
				int esInvitadoIndex = 2;
				BCom.getInstance().setInvitado(datos.getBoolean(esInvitadoIndex));
			} catch (JSONException ex) {
				Log.w(this.getClass().getSimpleName(), "Error al verificar si es invitado", ex);
				BCom.getInstance().setInvitado(false);
			}
			
			banderaOperacion = ServerOperation.CONECTAR_WEBSEAL;
			leerDatosOperacion(datos);
			operacionConectarWebSeal(banderaOperacion);
			break;
			
		case LOGIN_ONE:
			operacionLogginOne(banderaOperacion);
			break;

		case SING_OFF:
			banderaOperacion = ServerOperation.SING_OFF;
			//confirmarSignOff(banderaOperacion);
			crearParametrosSingOff();
			//Desconectar HOST
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.SING_OFF, paramTable));
			leerDatosResponse(getRespuesta());
			if(getRespuesta().getEstado() == EstadoRespuesta.Ok) {
				setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.SIGN_OFF_WAS, paramTable));
				leerDatosResponse(getRespuesta());
				if(getRespuesta().getEstado() == EstadoRespuesta.Ok) {
					setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.SIGN_OFF_WEBSEAL, paramTable));
					leerDatosResponse(getRespuesta());
					cleanPreviousSessionData();
					boolean calledFromTimer = (null == this.callbackContext);
					BCom.getInstance().resetApp(calledFromTimer);
				}
			} else {
				
			}
			break;
		case VERSION_SERVIDOR:
			String appEstado;
			if(Server.serverMode == Server.ServerModes.PRODUCCION){
				System.out.print("Entre a Produccion");
	             appEstado = "PRODUCCION";
	             PluginResult result = new PluginResult(PluginResult.Status.OK, appEstado);
	             //result.setKeepCallback(true); 
	             callbackContext.sendPluginResult(result);
			}else if(Server.serverMode == Server.ServerModes.TEST){
				System.out.print("Entre a TEST");
	             appEstado = "TEST";
	             PluginResult result = new PluginResult(PluginResult.Status.OK, appEstado);
	            // result.setKeepCallback(true); 
	             callbackContext.sendPluginResult(result);
				
			}else {
				System.out.print("Entre a SIMULACION");
	             appEstado = "TEST";
	             PluginResult result = new PluginResult(PluginResult.Status.OK, appEstado);
	             result.setKeepCallback(true); 
	             callbackContext.sendPluginResult(result);
			}
		break;
		case CONSULTA_DETALLE_INVERSION:
			banderaOperacion = ServerOperation.CONSULTA_DETALLE_INVERSION;
			leerDatosOperacionWT(datos);
			crearParametrosConsultaDetalleInversion(datos);
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.CONSULTA_DETALLE_INVERSION, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case REALIZAR_COMPRA_VENTA:
			banderaOperacion = ServerOperation.REALIZAR_COMPRA_VENTA;
			leerDatosOperacionWT(datos);
			crearParametrostrealizaCompraVenta();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.REALIZAR_COMPRA_VENTA, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case CONSULTA_CAPITALES:
			banderaOperacion = ServerOperation.CONSULTA_CAPITALES;
			leerDatosOperacionWT(datos);
			crearParametrosConsultaCapitales();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.CONSULTA_CAPITALES, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case CANCELA_ORDEN:
			banderaOperacion = ServerOperation.CANCELA_ORDEN;
			leerDatosOperacionWT(datos);
			crearParametrosancelaOrden();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.CANCELA_ORDEN, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case DETALLE_ORDEN:
			banderaOperacion = ServerOperation.DETALLE_ORDEN;
			leerDatosOperacionWT(datos);
			crearParametrosdetalleOrden();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.DETALLE_ORDEN, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case ENVIO_CORREO_COMPRA_VENTA:
			banderaOperacion = ServerOperation.ENVIO_CORREO_COMPRA_VENTA;
			leerDatosOperacionWT(datos);
			crearParametrosCorreoCompraVenta();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.ENVIO_CORREO_COMPRA_VENTA, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case ENVIO_APERTURA_FICHERO:
			banderaOperacion = ServerOperation.ENVIO_APERTURA_FICHERO;
			leerDatosOperacionWT(datos);
			System.out.print("datos_mario"+datos);
			crearParametrosAperturaFichero();
			//setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.ENVIO_APERTURA_FICHERO, paramTable));
			//leerDatosResponse(getRespuesta());
			break;
		case LISTA_CUENTAS_EFECTIVO:
			banderaOperacion = ServerOperation.LISTA_CUENTAS_EFECTIVO;
			leerDatosOperacionWT(datos);
			crearParametrosListaCuentasEfectivo();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.LISTA_CUENTAS_EFECTIVO, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case APLICA_TRASPASO_EFECTIVO:
			banderaOperacion = ServerOperation.APLICA_TRASPASO_EFECTIVO;
			leerDatosOperacionWT(datos);
			crearParametrosAplicaTraspasoEfectivo();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.APLICA_TRASPASO_EFECTIVO, paramTable));
			leerDatosResponse(getRespuesta());
			break;
		case REGLAS_VALOR:
			//banderaOperacion = ServerOperation.REGLAS_VALOR;
			paramTable.clear();
			setRespuesta(invoker.doNetWorkOperation(Server.ServerOperation.REGLAS_DE_NEGOCIO, paramTable));
			if(EstadoRespuesta.Ok == getRespuesta().getEstado()) {
				SharedBcomPreferences.getInstance().setPreferencia("tarjeta", numTarjeta);
				Log.v(this.getClass().getSimpleName(), "Tarjeta guardada: " + numTarjeta);
			}
			leerDatosResponse(getRespuesta());
			break;	
		default:
				
			return;
		}
		}
		else{
			Log.d("Else", "Sin internet");
			BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.conexion));
            PluginResult result = new PluginResult(PluginResult.Status.ERROR);
            result.setKeepCallback(true); 
            callbackContext.sendPluginResult(result);
            return;

		}
	}
	
	@Override
	public void leerDatosOperacion(JSONArray datos)  {
		if(paramTable == null)
			paramTable = new Hashtable<String, String>();
		else
			paramTable.clear();
		
		if(null == datos) {
			Log.w(this.getClass().getSimpleName(), "Params should not be null.");
			return;
		}
		
		try {
//			if(Server.ServerOperation.POSICION_GLOBAL == banderaOperacion) {
//				usuario = Server.USUARIO_INVOCAWEBSEAL;
//				acceso = datos.getString(0);
//			} else {
				numTarjeta = datos.getString(0);
				if(banderaOperacion == Server.ServerOperation.CONECTAR_WEBSEAL)
					password = datos.getString(1);
//			}
		} catch (JSONException e) {
			Log.w(this.getClass().getSimpleName(), Server.JSON_EXCEPTION, e);
		}
	}

	public void leerDatosOperacionWT(JSONArray datos)  {
		if(paramTable == null)
			paramTable = new Hashtable<String, String>();
		else
			paramTable.clear();
		if(null == datos) {
			Log.w(this.getClass().getSimpleName(), "Params should not be null.");
			return;
		}
		try {
				if(banderaOperacion == Server.ServerOperation.CONSULTA_DETALLE_INVERSION)
				{
					idPeriodo = datos.getString(2); 
					idContrato = datos.getString(1);
					
					paramTable.put("idPeriodo", idPeriodo);
					paramTable.put("idContrato", idContrato);
				}
				else if(banderaOperacion == Server.ServerOperation.CONSULTA_CAPITALES)
				{
					idContrato = datos.getString(1);
					tipo = datos.getString(2);
				}
				else if(banderaOperacion == Server.ServerOperation.CANCELA_ORDEN)
				{
					empresa = datos.getString(1);
					fechaRegistro = datos.getString(3);
					folio = datos.getString(2);
					ordenesPendientes = datos.getString(4);
					idContrato = datos.getString(5);
				}
				else if(banderaOperacion == Server.ServerOperation.REALIZAR_COMPRA_VENTA)
				{
					serie = datos.getString(2);
					precioLimite = datos.getString(3);
					fechaVigencia  = datos.getString(6);
					emisora = datos.getString(1);
					tipoOperacion = datos.getString(4);
					titulos = datos.getString(5);
					idContrato = datos.getString(7);
					sim = datos.getString(8);
				}
				else if(banderaOperacion == Server.ServerOperation.DETALLE_ORDEN)
				{
					empresa = datos.getString(1);
					folio = datos.getString(2);
					fechaRegistro = datos.getString(3);
				}
				else if(banderaOperacion == Server.ServerOperation.ENVIO_CORREO_COMPRA_VENTA)
				{                         
					emailBeneficiario = datos.getString(1);
					copiaTitular = datos.getString(2);
					mensaje = datos.getString(3);
					validaTipo = datos.getString(4);
					Log.d("correo",validaTipo);
					System.out.println("tipo: "+validaTipo);
				} 
				else if(banderaOperacion == Server.ServerOperation.ENVIO_APERTURA_FICHERO)
				{    
					UReLe = datos.getString(1);
					System.out.println("UReLe_mario"+UReLe);
				} 
				else if(banderaOperacion == Server.ServerOperation.LISTA_CUENTAS_EFECTIVO)
				{    
					idContratoPatrimonial = datos.getString(1);
				} 
				else if(banderaOperacion == Server.ServerOperation.APLICA_TRASPASO_EFECTIVO)
				{    
					idCuentaAbonoEfec = datos.getString(1);
					idCuentaCargoEfec = datos.getString(2);
					importeTransEfec = datos.getString(3);
				} 
				
		} catch (JSONException e) {
			Log.w(this.getClass().getSimpleName(), Server.JSON_EXCEPTION, e);
		}
	}
	
	
	public void operacionConectarWebSeal(Server.ServerOperation op) {
		
		ServerResponse respWebSeal = null;
		
		paramTable.put("tarjeta", numTarjeta);
		paramTable.put("pwd", password);
		
		if(ServerModes.SIMULACION == Server.serverMode) {
			respWebSeal = new ServerResponse();
			respWebSeal.setEstado(EstadoRespuesta.Ok);
		} else {
			respWebSeal = invoker.doNetWorkOperation(op, paramTable);
		}
		
		if(respWebSeal.getEstado() == Server.EstadoRespuesta.Ok) {
			banderaOperacion = Server.ServerOperation.LOGIN_ONE;
			doNetworkOperation(null);	// The paramTable is already loaded.
		} else {
			Log.w(this.getClass().getSimpleName(), "Error while trying to connect to WebSeal.");
			this.callbackContext.error(respWebSeal.getMensaje());

		}
	}
	
	public void operacionLogginOne(Server.ServerOperation op) {
		crearParametrosLog1();
		setRespuesta(invoker.doNetWorkOperation(op, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	public void confirmarSignOff(final Server.ServerOperation op) {
		if(null != callbackContext) {
			final AlertDialog.Builder builder = new Builder(BCom.getInstance());
			final LoginDelegate me = this; 
			
			DialogInterface.OnClickListener onClickListener = new DialogInterface.OnClickListener() {
				@Override
				public void onClick(DialogInterface dialog, int which) {
					if(DialogInterface.BUTTON_POSITIVE == which) {

						operacionSingOff(op);

							
					} else {
						me.callbackContext.error(Server.EMPTY_STRING);
					}
					dialog.dismiss();
				}
			};
			
			DialogInterface.OnCancelListener onCancelListener = new OnCancelListener() {
				@Override
				public void onCancel(DialogInterface dialog) {
					me.callbackContext.error(Server.EMPTY_STRING);
				}
			};
			
			builder
				.setCancelable(false)
				.setOnCancelListener(onCancelListener)
				.setTitle(BCom.getInstance().getString(R.string.alert_title_text))
				.setMessage(BCom.getInstance().getString(R.string.logout_confirm_logout))
				.setPositiveButton(BCom.getInstance().getString(R.string.alert_accept_button_text), onClickListener)
				.setNegativeButton(BCom.getInstance().getString(R.string.alert_cancel_button_text), onClickListener);
			
			BCom.getInstance().runOnUiThread(new Runnable() {
				@Override
				public void run() {
					builder.show();
				}
			});
		} else {
			operacionSingOff(op);
		}
	}
	
	public void operacionSingOff(Server.ServerOperation op){
		crearParametrosSingOff();
		setRespuesta(invoker.doNetWorkOperation(op, paramTable));
		
		if(getRespuesta().getEstado() == EstadoRespuesta.Fail && null != this.callbackContext) {
			leerDatosResponse(getRespuesta());
		} else {
			boolean calledFromTimer = (null == this.callbackContext);
			cleanPreviousSessionData();
			BCom.getInstance().resetApp(calledFromTimer);
		}
	}
	
	private void crearParametrosLog1(){
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "i_signon_pr");
			raiz.put("operacion", "i_signon_op");
			raiz.put("accion", "logon");
			
			JSONObject hijo = new JSONObject();
			hijo.put("username2", numTarjeta +  Server.USUARIO_INVOCAWEBSEAL);
			hijo.put("sValidaClaveOperaciones", "N");
			//hijo.put("ip", "148.244.45.93");
			hijo.put("ip", "");
			
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
	
	private void crearParametrosSingOff(){
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_signoff_pr");
			raiz.put("operacion", "imd_signoff_op");
			raiz.put("accion", "logout");
			
			JSONObject hijo = new JSONObject();
			hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL );
			hijo.put("acceso", numTarjeta);
			hijo.put("canal", Server.CANAL_BNET);
			
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

	//*****************************PETICIONES WEBTRADER*********************************************************************************
	//**********************************************************************************************************************************
	
	private void crearParametrosConsultaDetalleInversion(JSONArray args){
		/*{
			  "accion": "consultaDetalleInversion",
			  "operacion": "imd_ob_detalle_inv_patrimonial_op",
			  "datosAplicativos": {
			    "usuario": "ADMINF",
			    "idPeriodo": "D",
			    "acceso": "4555093000002499ADMINF",
			    "idContrato": "PTMXP0000001"
			  },
			  "proceso": "imd_ob_detalle_inv_patrimonial_pr"
			}*/
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_ob_detalle_inv_patrimonial_pr");
			raiz.put("operacion", "imd_ob_detalle_inv_patrimonial_op");
			raiz.put("accion", "consultaDetalleInversion");
			//raiz.put("accion", "");
			JSONObject hijo = new JSONObject();
			hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
			hijo.put("acceso", numTarjeta);
			hijo.put("idPeriodo", idPeriodo);
			hijo.put("idContrato", idContrato);
			
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
		
	private void crearParametrosConsultaCapitales(){
		/*{
			  "accion": "consultaCapitales",
			  "operacion": "imd_ob_consulta_capitales_op",
			  "datosAplicativos": {
			    "acceso": "4555093000002499ADMINF",
			    "usuario": "ADMINF",
			    "idContrato": "PTMXP0000001",
			    "tipo": "1"
			  },
			  "proceso": "imd_ob_consulta_capitales_pr"
			}*/
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_ob_consulta_capitales_pr");
			raiz.put("operacion", "imd_ob_consulta_capitales_op");
			raiz.put("accion", "consultaCapitales");
			
			JSONObject hijo = new JSONObject();
			hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
			hijo.put("acceso", numTarjeta);
			hijo.put("idContrato", idContrato);
			hijo.put("tipo", tipo);
			
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
	
	private void crearParametrosancelaOrden(){
		/*{
			  "accion": "cancelaOrden",
			  "operacion": "imd_ob_cancela_orden_op",
			  "proceso": "imd_ob_consulta_capitales_pr",
			  "datosAplicativos": {
			    "usuario": "ADMINF"
			    "acceso": "4555093000002499",
			    "claveOperaciones": "00000000",
			    "digitoVerificador": null,
			    "empresa": "BCM",
			    "fechaRegistro": "2014/12/03",
			    "folio": "500016",
			    "idContrato": "PTMXP0000001",
			    "ordenesPendientes": "100",
			    "otp": null,
			    "tripletaTasa": null,
		}*/
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_ob_consulta_capitales_pr");
			raiz.put("operacion", "imd_ob_cancela_orden_op");
			raiz.put("accion", "cancelaOrden");

			JSONObject hijo = new JSONObject();
			hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
			hijo.put("acceso", numTarjeta);
			hijo.put("claveOperaciones", "00000000");
			hijo.put("digitoVerificador", digitoVerificador);
			hijo.put("empresa", empresa);
			hijo.put("fechaRegistro", "");
			hijo.put("folio", folio);
			hijo.put("idContrato", idContrato);
			hijo.put("ordenesPendientes", ordenesPendientes);
			hijo.put("otp", otp);
			hijo.put("tripletaTasa", tripletaTasa);

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
	
	private void crearParametrosdetalleOrden(){
		/*{
			  "accion": "detalleOrden",
			  "operacion": "imd_ob_consulta_capitales_op",
			  "proceso": "imd_ob_consulta_capitales_pr",
			  "datosAplicativos": {
			    "usuario": "ADMINF"
			    "acceso": "4555093000002499",
			    "empresa": "BCM",
			    "fechaRegistro": "2014/12/03",
			    "folio": "500017",
			    "idContrato": "PTMXP0000001",
			  }
			}*/
		String res = "";
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_ob_consulta_capitales_pr");
			raiz.put("operacion", "imd_ob_consulta_capitales_op");
			raiz.put("accion", "detalleOrden");

			JSONObject hijo = new JSONObject();
			hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
			hijo.put("acceso", numTarjeta);
			hijo.put("empresa", empresa);
			hijo.put("fechaRegistro", fechaRegistro);
			hijo.put("folio", folio);
			hijo.put("idContrato", idContrato);

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
	
	private void crearParametrosCorreoCompraVenta(){
		/*    {
	    "proceso": imd_ob_acciones_pr,
	    "operacion": "imd_ob_acciones_op, 
	    "accion":"envioEmail,
	    datosAplicativos: {
	        "usuario": "ADMINF",
	        "acceso": 0017800035462625,
	        emailBeneficiario: a@email.com,
	        copiaTitular: true,
	        mensaje: mensaje
	    }
	}*/
		String res = "";
		try {
			int entero = Integer.parseInt(validaTipo);
			if(entero  == 1)
			{
				JSONObject raiz = new JSONObject();
				raiz.put("proceso", "imd_ob_consulta_capitales_pr");
				raiz.put("operacion", "imd_ob_cancela_orden_op");
				raiz.put("accion", "envioEmail");

				JSONObject hijo = new JSONObject();
				hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
				hijo.put("acceso", numTarjeta);
				hijo.put("emailBeneficiario", emailBeneficiario);
				hijo.put("copiaTitular", mensaje);
				hijo.put("mensaje", copiaTitular);

				raiz.put("datosAplicativos", hijo);

				res = raiz.toString();	
				
			}
			else{
				 JSONObject raiz = new JSONObject();
				raiz.put("proceso", "imd_ob_acciones_pr");
				raiz.put("operacion", "imd_ob_acciones_op");
				raiz.put("accion", "envioEmail");
	
				JSONObject hijo = new JSONObject();
				hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
				hijo.put("acceso", numTarjeta);
				hijo.put("emailBeneficiario", emailBeneficiario);
				hijo.put("copiaTitular", mensaje);
				hijo.put("mensaje", copiaTitular);
	
				raiz.put("datosAplicativos", hijo);
	
				res = raiz.toString();
			}
			
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
	
	private void crearParametrostrealizaCompraVenta(){
		/*{
			  "accion": "realizaCompraVenta",
			  "operacion": "imd_ob_acciones_op",
			  "datosAplicativos": {
			    "id": "PTMXP0000001",
			    "claveOperaciones": "00000000",
			    "serie": "A",
			    "precioLimite": "43.13",
			    "simulacion": "S",
			    "emisora": "ALFA",
			    "otp": "",
			    "tipoOperacion": "Venta",
			    "tripletaTasa": "",
			    "titulos": "10",
			    "fechaVigencia": "2014-11-28",
			    "digitoVerificador": "",
			    "acceso": "4555093000002325ADMINF",
			    "usuario": "ADMINF"
			  },
			  "proceso": "imd_ob_acciones_pr"
			}*/
		String res = "";
		String anio = fechaVigencia.substring(0,4);
		String mes = fechaVigencia.substring(4, 6);
		String dia = fechaVigencia.substring(6, 8);
		String fechaDiagonales = anio+"/"+mes+"/"+dia;
		
		
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_ob_acciones_pr");
			raiz.put("operacion", "imd_ob_acciones_op");
			raiz.put("accion", "realizaCompraVenta");

			JSONObject hijo = new JSONObject();
			hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
			hijo.put("acceso", numTarjeta);
			hijo.put("id", idContrato);
			hijo.put("claveOperaciones", "00000000");
			hijo.put("serie", serie);
			hijo.put("precioLimite", precioLimite);
			hijo.put("simulacion", sim);
			hijo.put("emisora", emisora);
			hijo.put("otp", otp);
			hijo.put("tipoOperacion", tipoOperacion);
			hijo.put("tripletaTasa", tripletaTasa);
			hijo.put("titulos", titulos);
			hijo.put("fechaVigencia", fechaDiagonales);
			hijo.put("digitoVerificador", digitoVerificador);

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

	private void crearParametrosAperturaFichero(){
		
System.out.println("crearParametrosAperturaFichero_mario");
        try
        {

            //Descarga de URL y conexion
            URL url = new URL(UReLe);
            System.out.println("URL_mario "+UReLe);
            
          //  HttpURLConnection c = (HttpURLConnection)url.openConnection();
            URLConnection urlCon = url.openConnection();
            System.out.println("Type_mario   "+urlCon.getContentType());
            //System.out.print("Type_mario"+c.getContentType());
        
            //c.setRequestMethod("GET");
          //  System.out.println("GET_mario");
            //c.setDoOutput(true);
            //c.connect();
            //(System.out.println("COnect_mario");
            File  ruta =  new  File("/storage/emulated/0/ComWT/");
            String[] archivos; 
        		if (ruta.isDirectory()){
        			archivos = ruta.list();
        			System.out.println("Archivo1"+ruta.getName());
        			System.out.println("Archivo2"+ruta.getPath());
        			System.out.println("Archivo3"+ruta.list());
        			System.out.println("Archivo3"+archivos.length);
        			if(ruta.list() != null){
        				for(int i=0; i<archivos.length; i++){
        					File archivo = new File(ruta, archivos[i]);
        					
        					archivo.delete();
        				}
        				if(ruta.exists()){
        					if(ruta.delete()){Log.d("Mario","se Borro directorio");}
        				}
        			}

        			
        		}
            //Creacion del fichero
        	File dir = new File(Environment.getExternalStorageDirectory(), "//ComWT//"); 
        	
        	if (!dir.exists()) {
        		
        		System.out.println("creando directorio: " + "ComWT");
        		dir.mkdir();
        	}

        	
        	System.out.println("Nombre del archivo_mario "+dir.getName());
            System.out.println("Camino_mario             "+dir.getPath());
            System.out.println("Camino absoluto_mario    "+dir.getAbsolutePath());
            int minuto, segndo;
            
            Calendar calendario = Calendar.getInstance();
            String nombre = calendario.get(calendario.YEAR)+""+ calendario.get(calendario.MONTH)+""+calendario.get(calendario.DATE)+""+ calendario.get(calendario.HOUR_OF_DAY)+""+calendario.get(calendario.MINUTE)+""+ calendario.get(calendario.SECOND);
            System.out.println("Nombre del archivo   "+nombre);
           // String nombre = Integer.toString(hora);
            String archivo = nombre+".pdf";
            System.out.println("Nombre del archivo:    "+archivo);
        	File file2= new File(dir, archivo);
     
            
        	//Guardado de archivo
            InputStream in = urlCon.getInputStream(); 
            OutputStream out = new FileOutputStream(file2,true);
            
            
            byte[] buf = new byte[1024];
            int leido = in.read(buf);
            
            while ( leido > 0) {
            	out.write(buf, 0, leido );
            	leido = in.read(buf);
            }

            in.close();
            out.close();
            String url2 = "/storage/emulated/0/ComWT/"+archivo;

            PluginResult result = new PluginResult(PluginResult.Status.OK, url2);
            result.setKeepCallback(true); 
            callbackContext.sendPluginResult(result);
             
        } catch (MalformedURLException e) {
        	System.out.print("catch_mario_1");
        	e.printStackTrace();
        } catch (IOException e) {
        	System.out.print("catch_mario_2");
        	e.printStackTrace();
        }

    }	
	
	private void crearParametrosListaCuentasEfectivo(){
		/*{
  			"accion": "listaCuentas",
  			"operacion": "imd_ob_traspaso_efectivo_op",
  			"proceso": "imd_ob_traspaso_pr",
  			"datosAplicativos": {
    		"acceso": "4555093000002374",
    		"idContratoPatrimonial": "PTMXP0000003",
    		"usuario": "ADMINF"
  			}}*/
	String res = "";
	try {
		JSONObject raiz = new JSONObject();
		raiz.put("proceso", "imd_ob_traspaso_pr");
		raiz.put("operacion", "imd_ob_traspaso_efectivo_op");
		raiz.put("accion", "listaCuentas");

		JSONObject hijo = new JSONObject();
		hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
		hijo.put("acceso", numTarjeta);
		hijo.put("idContratoPatrimonial", idContratoPatrimonial);

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
	
	
	
	public void crearParametrosAplicaTraspasoEfectivo(){
		
		/* {
  			"accion": "aplicaTraspaso",
  			"operacion": "imd_ob_traspaso_efectivo_op",
  			"proceso": "imd_ob_traspaso_pr",
  			"datosAplicativos": 
  			"acceso": "4555093000002374",
  			"claveOperaciones": "00000000",
  			"fechaOperacion": "23/02/2015",
  			"idCuentaAbono": "PTMXP0000003",
  			"idCuentaCargo": "AHMXP0000003",
  			"importe": 2000.0,
  			"usuario": "ADMINF"
			}}*/
		String res = "";
		SimpleDateFormat fechaActual = new SimpleDateFormat("dd/MM/yyyy"); 
		String currentDateandTime = fechaActual.format(new Date());
		
		try {
			JSONObject raiz = new JSONObject();
			raiz.put("proceso", "imd_ob_traspaso_pr");
			raiz.put("operacion", "imd_ob_traspaso_efectivo_op");
			raiz.put("accion", "aplicaTraspaso");

			JSONObject hijo = new JSONObject();
			hijo.put("usuario", Server.USUARIO_INVOCAWEBSEAL);
			hijo.put("acceso", numTarjeta);
			hijo.put("claveOperaciones", "00000000");	
			hijo.put("fechaOperacion",currentDateandTime);   //----------------------------------
			hijo.put("idCuentaAbono",idCuentaAbonoEfec );
			hijo.put("idCuentaCargo",idCuentaCargoEfec);
			hijo.put("importe",importeTransEfec);
			
			raiz.put("datosAplicativos", hijo);

			res = raiz.toString();

			if(paramTable == null)
				paramTable = new Hashtable<String, String>();
			else
				paramTable.clear();

			paramTable.put("cadenaJSON", res );

			}catch (JSONException je){
				Log.w(Server.TAG, "JSON error. " + je.getMessage());
			}catch (Exception e) {
				Log.w(Server.TAG, "Exception en crearJSONLog1. " + e.getMessage());
			}
	}
		    	
	//**********************************************************************************************************************************	
	

	
	
	public void seleccionDesbloquear(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void seleccionAutoSeguro(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void seleccionBEstratega(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void seleccionGeoLocalizacion(JSONArray args) {
		this.callbackContext.success();
	}
	
	@Override
	public void limpiarMemoria(JSONArray args) {
		this.callbackContext.success();
	}

	/**
	 * Loads the owner card number.
	 */
	public void loadOwnerCardNumber() {
		String signOnJson = null, result = null;
		JSONObject jsonObj = null, jsonAux = null;
		
		signOnJson = Session.getInstance().recuperaValores(PersistentJsonFile.FILE_SIGN_ON);
		Log.d("loadOwnerCardNumber",signOnJson);
		if(null == signOnJson) {
			this.callbackContext.error("");
			return;
		}
		
		try {
			jsonObj = new JSONObject(signOnJson);
			
			if(signOnJson.contains("solicitaInstrumentoSeguridad"))
				jsonAux = jsonObj.getJSONObject("solicitaInstrumentoSeguridad");
			else
				jsonAux = jsonObj.getJSONObject("posicionGlobal");
			
			result = jsonAux.getString("acceso_usr");			
		} catch (JSONException ex) {
			Log.w(this.getClass().getSimpleName(), "Error while retrieving the card number.", ex);
			this.callbackContext.error("");
			return;
		}
		
		this.callbackContext.success(result);
		return;
	}

	public void showAlert(JSONArray args) {
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

	private void showBancomerWebPage() {
		String bancomerUrl = "http://www.bancomer.com";
		Intent intent = new Intent(Intent.ACTION_VIEW);
		intent.setData(Uri.parse(bancomerUrl));
		BCom.getInstance().startActivity(intent);
		
	}

	//#region Close of previous session.
	/**
	 * Close all sessions if there was not closed normally.
	 * @return True if the signoff was successfull, false otherwise.
	 */
	private boolean closePreviousSession() {
		SharedBcomPreferences preferences = SharedBcomPreferences.getInstance();
		
		String cardNumber = preferences.getPreferencia(Server.CARD_NUMBER_PROPERTY_NAME);
		String countLogin1 = preferences.getPreferencia(Server.COOKIES_COUNT_PROPERTY_NAME);
		String countLogin2 = preferences.getPreferencia(Server.COOKIES_COUNT_PROPERTY_NAME2);
		
		CookieStore cookies = new DefaultHttpClient().getCookieStore();
		
		if(null == cardNumber || cardNumber.isEmpty()) {
			Log.v(this.getClass().getSimpleName(), "Card number empty, no previous session.");
			return true;
		}
		
		if(null != countLogin1 && !countLogin1.isEmpty())
			loadCookiesData(cookies, countLogin1, true);
		
		if(null != countLogin2 && !countLogin2.isEmpty())
			loadCookiesData(cookies, countLogin1, false);
		
		// Verifies that all the session get closed successfully.
		String wasUrl = preferences.getPreferencia(Server.WAS);
		String websealUrl = preferences.getPreferencia(Server.WEBSEAL);
		
		boolean ok = true;
		// Host returns 404
		ok = ok && invoker.doSignOutOfPreviousSession(wasUrl + Server.BURL_CERRARSESION, cardNumber, cookies);				// Host
		ok = ok && invoker.doSignOutOfPreviousSession(wasUrl + Server.BURL_DESCONECTAWAS, cardNumber, cookies);				// Was
		ok = ok && invoker.doSignOutOfPreviousSession(websealUrl + Server.BURL_DESCONECTAWEBSEAL, cardNumber, cookies);		// Webseal
		
		if(ok) {
			Log.v(this.getClass().getSimpleName(), "Previous session signoff successfull");
			cleanPreviousSessionData();
		} else {
			Log.d(this.getClass().getSimpleName(), "An error ocurred while closing the previous session");
		}
		
		return ok;
	}
	
	/**
	 * Loads the cookies from the specified SharedPreferences data
	 * @param cookieStore The cookies store to use.
	 * @param cookiesCountString The count of cookies.
	 * @param isFirstLoginData Flag to indicate id the cookies are loaded from the data stored in the first login.
	 */
	private void loadCookiesData(CookieStore cookieStore, String cookiesCountString, boolean isFirstLoginData) {
		if(null == cookieStore) {
			Log.d(this.getClass().getSimpleName(), "Got a null cookies store.");
			return;
		}
		
		int cookiesCount = 0;
		try {
			cookiesCount = Integer.parseInt(cookiesCountString);
		} catch(NumberFormatException nfEx) {
			Log.d(this.getClass().getSimpleName(), "Error while parsing the cookies count.", nfEx);
			cookiesCount = 0;
			return;
		}
		
		SharedBcomPreferences preferences = SharedBcomPreferences.getInstance();
		
		for(int i = 0; i < cookiesCount ; i++){
			String cookieName = "";
			String cookieValue = "";
			String cookieVersion = "";
			String cookieDomain = "";
			String cookiePath = "";
			
			if(isFirstLoginData) {																		// Loads the data from the first login.
				cookieName = preferences.getPreferencia(Server.COOKIE_NAME_PROPERTY_PREFIX + i);      
				cookieValue = preferences.getPreferencia(Server.COOKIE_VALUE_PROPERTY_PREFIX + i);    
				cookieVersion = preferences.getPreferencia(Server.COOKIE_VERSION_PROPERTY_PREFIX + i);
				cookieDomain = preferences.getPreferencia(Server.COOKIE_DOMAIN_PROPERTY_PREFIX + i);  
				cookiePath = preferences.getPreferencia(Server.COOKIE_PATH_PROPERTY_PREFIX + i);      
			} else {																					// Loads the data from the second login.
				cookieName = preferences.getPreferencia(Server.COOKIE_NAME2_PROPERTY_PREFIX + i);      
				cookieValue = preferences.getPreferencia(Server.COOKIE_VALUE2_PROPERTY_PREFIX + i);    
				cookieVersion = preferences.getPreferencia(Server.COOKIE_VERSION2_PROPERTY_PREFIX + i);
				cookieDomain = preferences.getPreferencia(Server.COOKIE_DOMAIN2_PROPERTY_PREFIX + i);  
				cookiePath = preferences.getPreferencia(Server.COOKIE_PATH2_PROPERTY_PREFIX + i); 
			}
			
			BasicClientCookie cookie = new BasicClientCookie(cookieName, cookieValue);
			cookie.setVersion( Integer.parseInt(cookieVersion));
			cookie.setDomain(cookieDomain);
			cookie.setPath(cookiePath);
			
			cookieStore.addCookie(cookie);
		}
	}
	
	/**
	 * Cleans the previous session data after a successfull signoff.
	 */
	private void cleanPreviousSessionData() {
		SharedBcomPreferences preferences = SharedBcomPreferences.getInstance();
		
		String countLogin1 = preferences.getPreferencia(Server.COOKIES_COUNT_PROPERTY_NAME);
		String countLogin2 = preferences.getPreferencia(Server.COOKIES_COUNT_PROPERTY_NAME2);
		
		int cookiesCount1 = 0, cookiesCount2 = 0;
		try {
			cookiesCount1 = Integer.parseInt(countLogin1);
		} catch(NumberFormatException nfEx) {
			Log.d(this.getClass().getSimpleName(), "Error while parsing the cookies count from first login.", nfEx);
			cookiesCount1 = 0;
		}
		
		try {
			cookiesCount2 = Integer.parseInt(countLogin2);
		} catch(NumberFormatException nfEx) {
			Log.d(this.getClass().getSimpleName(), "Error while parsing the cookies count from second login.", nfEx);
			cookiesCount2 = 0;
		}
		
		preferences.setPreferencia(Server.COOKIES_COUNT_PROPERTY_NAME, Server.EMPTY_STRING);
		preferences.setPreferencia(Server.COOKIES_COUNT_PROPERTY_NAME2, Server.EMPTY_STRING);
		preferences.setPreferencia(Server.CARD_NUMBER_PROPERTY_NAME, Server.EMPTY_STRING);
		
		for (int i = 0; i < cookiesCount1; i++) {
			preferences.setPreferencia(Server.COOKIE_NAME_PROPERTY_PREFIX + i, Server.EMPTY_STRING);
			preferences.setPreferencia(Server.COOKIE_VALUE_PROPERTY_PREFIX + i, Server.EMPTY_STRING);
			preferences.setPreferencia(Server.COOKIE_VERSION_PROPERTY_PREFIX + i, Server.EMPTY_STRING);
			preferences.setPreferencia(Server.COOKIE_DOMAIN_PROPERTY_PREFIX + i, Server.EMPTY_STRING);
			preferences.setPreferencia(Server.COOKIE_PATH_PROPERTY_PREFIX + i, Server.EMPTY_STRING);
		}
		
		for (int i = 0; i < cookiesCount2; i++) {
			preferences.setPreferencia(Server.COOKIE_NAME2_PROPERTY_PREFIX + i, Server.EMPTY_STRING);
			preferences.setPreferencia(Server.COOKIE_VALUE2_PROPERTY_PREFIX + i, Server.EMPTY_STRING);
			preferences.setPreferencia(Server.COOKIE_VERSION2_PROPERTY_PREFIX + i, Server.EMPTY_STRING);
			preferences.setPreferencia(Server.COOKIE_DOMAIN2_PROPERTY_PREFIX + i, Server.EMPTY_STRING);
			preferences.setPreferencia(Server.COOKIE_PATH2_PROPERTY_PREFIX + i, Server.EMPTY_STRING);
		}
	}
	
	
	public void getServerMode() {
		banderaOperacion = Server.ServerOperation.GET_SERVER_MODE;
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, null));
		leerDatosResponse(getRespuesta());
	}
	public void servicioServidor(){
		String appEstado;
		if(Server.serverMode == Server.ServerModes.PRODUCCION){
			System.out.print("Entre a Produccion");
             appEstado = "PRODUCCION";
             PluginResult result = new PluginResult(PluginResult.Status.OK, appEstado);
             //result.setKeepCallback(true); 
             callbackContext.sendPluginResult(result);
		}else if(Server.serverMode == Server.ServerModes.TEST){
			System.out.print("Entre a TEST");
             appEstado = "TEST";
             PluginResult result = new PluginResult(PluginResult.Status.OK, appEstado);
            // result.setKeepCallback(true); 
             callbackContext.sendPluginResult(result);
			
		}else {
			System.out.print("Entre a SIMULACION");
             appEstado = "TEST";
             PluginResult result = new PluginResult(PluginResult.Status.OK, appEstado);
             result.setKeepCallback(true); 
             callbackContext.sendPluginResult(result);
		}
		
	}
	//#endregion
}
