package com.bancomer.btrader.delegates;

import java.util.Hashtable;
import java.util.Iterator;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.content.DialogInterface;
import android.content.DialogInterface.OnCancelListener;
import android.util.Log;
import android.widget.Toast;

import com.bancomer.btrader.R;
import com.bancomer.btrader.BCom;
import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;

import android.util.Log;

public class TransferirDelegate extends NativeDelegate {
	
	public TransferirDelegate() {
		this.callbackContext = null;
	}
	
	public void recuperaCuentasTarRetiro(JSONArray args){
		this.callbackContext.success();
	}
	
	public void recuperaCuentasTarDeposito(JSONArray args){
		this.callbackContext.success();
	}
	
	public void recuperaCuentasTarFrecBBVA(JSONArray args){
		this.callbackContext.success();
	}
	
	public void recuperaCuentasTarFrecOBan(JSONArray args){
		this.callbackContext.success();
	}
	
	@Override
	public void doNetworkOperation(JSONArray args){
		this.callbackContext.success();
	}
	
	public void networkResponse(JSONArray args){
		this.callbackContext.success();
	}
	
	public void GeneraPDF(JSONArray args){
		this.callbackContext.success();
	}
	
	public void guardarImgPreviaRecortadC(JSONArray args){
		this.callbackContext.success();
	}
	
	public void guardarImgPreviaC(JSONArray args){
		this.callbackContext.success();
	}
	
	public void recuperaPagos(JSONArray args){
		this.callbackContext.success();
	}
	
	public void recuperaSaldos(JSONArray args){
		this.callbackContext.success();
	}
	
	public void ejecutaGuardaCuentaNueva(JSONArray args){
		this.callbackContext.success();
	}
	
	public void mostrarOpciones(JSONArray args) {
		Toast.makeText(BCom.getInstance(), "Hola", Toast.LENGTH_LONG).show();
		this.callbackContext.success();
	}
	public void recuperarListasFrecuentesInterbancaria(JSONArray args){
		this.callbackContext.success();
	}
	
	public void registraTraspaso(JSONArray datos) {
		if(paramTable == null){
			paramTable = new Hashtable<String, String>();
		}else{
			paramTable.clear();
		}
		try {
			JSONObject padre = new JSONObject();
			
			padre.put("proceso", datos.getString(1));
			padre.put("operacion", datos.getString(0));
			padre.put("accion", datos.getString(2));
			JSONObject datosAplicativos = datos.getJSONObject(3);
			padre.put("datosAplicativos", datosAplicativos);

			paramTable.put("cadenaJSON", padre.toString());	
			
		} catch (JSONException e) {
			Log.e("ERROR", "Error "+e.toString());
			e.printStackTrace();
		}
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}	
	
	public void solicitaComision(JSONArray datos) {
		if(paramTable == null){
			paramTable = new Hashtable<String, String>();
		}else{
			paramTable.clear();
		}
		try {
			JSONObject padre = new JSONObject();
			
			padre.put("proceso", datos.getString(0));
			padre.put("operacion", datos.getString(1));
			padre.put("accion", datos.getString(2));
			JSONObject datosAplicativos = datos.getJSONObject(3);
			padre.put("datosAplicativos", datosAplicativos);

			paramTable.put("cadenaJSON", padre.toString());	
			
		} catch (JSONException e) {
			Log.e("ERROR", "Error "+e.toString());
			e.printStackTrace();
		}
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	public void recuperarListasPreregistradasInterbancaria(JSONArray args){
		this.callbackContext.success();
	}
	
	public void recuperaListasFrecuentesPreregistradasBBVA(JSONArray args, String accion){

		try {
			JSONObject padre = new JSONObject();
			padre.put("proceso", "imd_traspaso_tercero_pr");
			padre.put("operacion", "imd_listas_op");
			padre.put("accion", accion);
			JSONObject datosAplicativos = args.getJSONObject(0);
			padre.put("datosAplicativos", datosAplicativos);
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en recuperaListasFrecuentesPreregistradasBBVA. " + e.getMessage());
		}

		banderaOperacion = Server.ServerOperation.RECUPERA_CUENTAS_BBVA_FRECUENTES_PREREGISTRADAS;
		SharedBcomPreferences.appContext = this.cordova.getActivity();
		super.init();
		
	//	final String action = accion;
	//	final JSONArray args = args;
		Log.i(this.getClass().getSimpleName(), "Recuperando lista frecuentes/prerregistradas");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	public void consultaBeneficiario(JSONArray args){
		
		try {
			String opExpress = "imd_registro_cuenta_exp_tercero_op";
			String operacion = "imd_registro_cuenta_tercero_op";
			if (args != null && args.getJSONObject(0) != null
					&& "Y".equals(args.getJSONObject(0).get("esCuentaExpress"))) {
				operacion = opExpress;
			}
			
			JSONObject padre = new JSONObject();
			padre.put("proceso", "imd_traspaso_tercero_pr");
			padre.put("operacion", operacion);
			padre.put("accion", "consultaBeneficiario");
			padre.put("datosAplicativos", args.getJSONObject(0));
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en consultaBeneficiario. " + e.getMessage());
		}

		banderaOperacion = Server.ServerOperation.CONSULTA_BENEFICIARIO_CTA_BBVA;
		
		

		
		Log.i(this.getClass().getSimpleName(), "Recuperando beneficiario");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	public void preregistrarCuenta(JSONArray args){
		
		try {
			JSONObject padre = new JSONObject();
			padre.put("proceso", "imd_traspaso_tercero_pr");
			padre.put("operacion", "imd_registro_cuenta_tercero_op");
			padre.put("accion", "preregistrarCuenta");
			padre.put("datosAplicativos", args.getJSONObject(0));
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en preregistrarCuenta. " + e.getMessage());
		}

		banderaOperacion = Server.ServerOperation.PREREGISTRAR_CUENTA_BBVA;
		
		Log.i(this.getClass().getSimpleName(), "Preregistrar cuenta");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	
	public void preregistrarCuentaInterbancaria(JSONArray args){
		
		try {
			JSONObject padre = new JSONObject();
			padre.put("proceso", "imd_registro_cuentas_otros_bancos_pr");
			padre.put("operacion", "imd_registro_cuentas_otros_bancos_op");
			padre.put("accion", "preregistrarCuenta");
			padre.put("datosAplicativos", args.getJSONObject(0));
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en preregistrarCuenta. " + e.getMessage());
		}

		banderaOperacion = Server.ServerOperation.PREREGISTRAR_CUENTA_INTER;
		
		Log.i(this.getClass().getSimpleName(), "Preregistrar cuenta interbancaria");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	
	public void cargaPreregistro(JSONArray args){
		
		try {
			JSONObject padre = new JSONObject();
			padre.put("proceso", "imd_traspaso_tercero_pr");
			padre.put("operacion", "imd_carga_preregistro_op");
			padre.put("accion", "cargaPreregistro");
			padre.put("datosAplicativos", args);
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en preregistrarCuenta. " + e.getMessage());
		}

		banderaOperacion = Server.ServerOperation.CARGA_PREREGISTRO_CUENTA_BBVA;
		
		Log.i(this.getClass().getSimpleName(), "Carga preregistro");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	
	
	public void cargaPreregistroInterbancaria(JSONArray args){
		
		try {
			JSONObject padre = new JSONObject();
			padre.put("proceso", "imd_transferencias_interbancarias_pr");
			padre.put("operacion", "imd_carga_preregistro_op");
			padre.put("accion", "cargaPreregistro");
			padre.put("datosAplicativos", args.getJSONObject(0));
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en preregistrarCuenta interbancaria. " + e.getMessage());
		}

		banderaOperacion = Server.ServerOperation.CARGA_PREREGISTRO_CUENTA_INTER;
		
		Log.i(this.getClass().getSimpleName(), "Carga preregistro interbancaria");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	
	
	
	
	
	
	
	
	
	
	public void realizarTraspaso(JSONArray args){
		
		try {
			JSONObject padre = new JSONObject();
			padre.put("proceso", "imd_traspaso_tercero_pr");
			padre.put("operacion", "imd_traspaso_tercero_op");
			padre.put("accion", "realizarTraspaso");
			padre.put("datosAplicativos", args.getJSONObject(0));
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en realizarTraspaso. " + e.getMessage());
		}

		banderaOperacion = Server.ServerOperation.REALIZAR_TRASPASO_CUENTA_BBVA;
		
		Log.i(this.getClass().getSimpleName(), "Realizar traspaso");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	
	
	
	public void showAlert(JSONArray args){
		

		Log.i(this.getClass().getSimpleName(), "entra showAlert cancelar traspaso");


		
		try {
			JSONObject padre = new JSONObject();
			padre.put("datosAplicativos", args);

			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			//paramTable.put("cadenaJSON", padre.toString() );
			
			Log.i(this.getClass().getSimpleName(), args.toString());

			Log.i(this.getClass().getSimpleName(), padre.toString());

			
			
			 
			//JSONArray datosAplicativos =(JSONArray) padre.get("datosAplicativos");
			
     String titulo="",mensaje="",botonsi="",botonno="";


     
     
	JSONObject elem;
	
	for (int i=0;i<args.length();i++){
	
	  elem=args.getJSONObject(i);

		 titulo=(String) elem.getString("tittle");

		 mensaje=(String) elem.getString("message");

		 botonsi=(String) elem.getString("button");

		 botonno=(String) elem.getString("button2");

	
	}
	
	paramTable.put("boton", "no");
	banderaOperacion = Server.ServerOperation.SHOW_ALERT;


	
	 final AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(BCom.getInstance());



			alertDialogBuilder.setTitle(titulo);

 
			// set dialog message
			alertDialogBuilder
	
				.setMessage(mensaje)

				.setCancelable(false)
		
				.setPositiveButton(botonsi,new DialogInterface.OnClickListener() {

					public void onClick(DialogInterface dialog,int id) {
						
						// if this button is clicked, close
			
					
						paramTable.put("boton", "si");
						dialog.dismiss();
						

						
						Log.i(this.getClass().getSimpleName(), "showAlert cancelar traspaso si");
						Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
						
						setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
						leerDatosResponse(getRespuesta());
						

					}
				  })

				  
				.setNegativeButton(botonno,new DialogInterface.OnClickListener() {

					public void onClick(DialogInterface dialog,int id) {
						

						paramTable.put("boton", "no");

						dialog.cancel();
						
						banderaOperacion = Server.ServerOperation.SHOW_ALERT;
						
						Log.i(this.getClass().getSimpleName(), "showAlert cancelar traspaso no");
						Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
						
						setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
						leerDatosResponse(getRespuesta());
						
					}
				});

			
			BCom.getInstance().runOnUiThread(new Runnable() {
				@Override
				public void run() {
					// create alert dialog
					AlertDialog alertDialog = alertDialogBuilder.create();
	 
					// show it
					alertDialog.show();
					
				}
			});
			
			

			
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en showAlert. " + e.getMessage());
		}
		

	}
	
	
public void envioMail(JSONArray args){
		
		try {
			JSONObject padre = new JSONObject();
			padre.put("operacion","imd_traspaso_tercero_op");
			padre.put("proceso", "imd_traspaso_tercero_pr");
			padre.put("accion", "envioEmail");
			padre.put("datosAplicativos", args.getJSONObject(0));
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en envioMail. " + e.getMessage());
		}

		banderaOperacion = Server.ServerOperation.ENVIO_EMAIL;
		
		Log.i(this.getClass().getSimpleName(), "Envio email");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	public void enviaCorreo(JSONArray args){
		
		try {
			JSONObject padre = new JSONObject();
			padre.put("operacion", "imd_transferencias_interbancarias_op");
			padre.put("proceso", "imd_transferencias_interbancarias_pr");
			padre.put("accion", "enviaCorreo");
			padre.put("datosAplicativos", args.getJSONObject(0));
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en envioMail. " + e.getMessage());
		}

		banderaOperacion = Server.ServerOperation.ENVIO_EMAIL;
		
		Log.i(this.getClass().getSimpleName(), "Envia correo");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	public void permitirFrecuentes(JSONArray args){
		
		try {
			JSONObject padre = new JSONObject();
			padre.put("proceso", "imd_traspaso_tercero_pr");
			padre.put("operacion", "imd_permitir_frecuentes_op");
			padre.put("accion", "permitirFrecuentes");
			padre.put("datosAplicativos", args.getJSONObject(0));
			
		
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en permitir Frecuentes. " + e.getMessage());
		}

		banderaOperacion = Server.ServerOperation.PERMITIR_FRECUENTES;
		
		Log.i(this.getClass().getSimpleName(), "permitir frecuentes");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	public void recuperaListasFrecuentesPreregistradasInterbancaria(JSONArray args, String accion){
		
		try {
			JSONObject padre = new JSONObject();
			padre.put("proceso", "imd_transferencias_interbancarias_pr");
			padre.put("operacion", "imd_listas_op");
			padre.put("accion", accion);
			padre.put("datosAplicativos", args.getJSONObject(0));
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en recuperaListasFrecuentesPreregistradasInterbancaria. " + e.getMessage());
		}

		SharedBcomPreferences.appContext = this.cordova.getActivity();
		super.init();
		
		banderaOperacion = Server.ServerOperation.LISTAS_FRECUENTES_PREREGISTRADAS_INTERBANCARIAS;
		
		Log.i(this.getClass().getSimpleName(), "Recuperando lista frecuentes/prerregistradas interbancarias");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	
	public void recuperaFestivos(JSONArray args){
		try{
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", args.getJSONObject(0).toString());	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en recuperaFestivos " + e.getMessage());
		}
		banderaOperacion = Server.ServerOperation.RECUPERA_FESTIVOS;
		
		Log.i(this.getClass().getSimpleName(), "Recupera festivos");
		Log.i(this.getClass().getSimpleName(), "banderaOperacion = " + banderaOperacion);
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	public void realizarTraspasoInterbancaria3(JSONArray args) {
		try{
		JSONObject padre = new JSONObject();
		padre.put("proceso", args.getJSONObject(0).get("proceso"));
		padre.put("operacion", args.getJSONObject(0).get("operacion"));
		padre.put("accion", args.getJSONObject(0).get("accion"));
		padre.put("datosAplicativos", args.getJSONObject(0).get("datosAplicativos"));
		
		if(paramTable == null) { 
			paramTable = new Hashtable<String, String>();
		} else {
			paramTable.clear();
		}

		paramTable.put("cadenaJSON", padre.toString() );	
		}catch (JSONException je){
			Log.w(Server.TAG, "JSON error. " + je.getMessage());
		} 
		catch (Exception e) {
			Log.w(Server.TAG, "Exception en realizarTraspasoInterbancaria3 " + e.getMessage());
		}

		SharedBcomPreferences.appContext = this.cordova.getActivity();
		super.init();

		banderaOperacion = Server.ServerOperation.TRASPASO_INTERBANCARIAS;

		Log.i(this.getClass().getSimpleName(), "banderaOperacion = "
				+ banderaOperacion);

		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	@Override
	public boolean execute(final String action, final JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		super.callbackContext = callbackContext;

		Log.i("callbackContext", String.valueOf(callbackContext));
		super.init();

		this.cordova.getThreadPool().execute(new Runnable() {

			@Override
			public void run() {

				if (action.equals("recuperaCuentasTarRetiro")) {
					recuperaCuentasTarRetiro(args);
				} else if (action.equals("recuperaCuentasTarDeposito")) {
					recuperaCuentasTarDeposito(args);
				} else if (action.equals("recuperaCuentasTarFrecBBVA")) {
					recuperaCuentasTarFrecBBVA(args);
				} else if (action.equals("recuperaCuentasTarFrecOBan")) {
					recuperaCuentasTarFrecOBan(args);
				} else if (action.equals("doNetworkOperation")) {
					doNetworkOperation(args);
				} else if (action.equals("networkResponse")) {
					networkResponse(args);
				} else if (action.equals("generaPDF")) {
					GeneraPDF(args);
				} else if (action.equals("guardarImgPreviaRecortadC")) {
					guardarImgPreviaRecortadC(args);
				} else if (action.equals("guardarImgPreviaC")) {
					guardarImgPreviaC(args);
				} else if (action.equals("recuperaPagos")) {
					recuperaPagos(args);
				} else if (action.equals("recuperaSaldos")) {
					recuperaSaldos(args);
				} else if (action.equals("ejecutaGuardaCuentaNueva")) {
					ejecutaGuardaCuentaNueva(args);
				} else if (action.equals("mostrarOpciones")) {
					mostrarOpciones(args);
				} else if (action.equals("recuperaListasFrecuentes")) {
					recuperaListasFrecuentesPreregistradasBBVA(args,
							"listarCuentasFrecuentes");
				} else if (action.equals("recuperaListasPreregistradas")) {
					recuperaListasFrecuentesPreregistradasBBVA(args,
							"listarCuentasPreregistradas");
				} else if (action.equals("consultaBeneficiario")) {
					consultaBeneficiario(args);
				} else if (action.equals("preregistrarCuenta")) {
					preregistrarCuenta(args);
				} else if (action.equals("preregistrarCuentaInterbancaria")) {
					preregistrarCuentaInterbancaria(args);
				} else if (action.equals("cargaPreregistro")) {
					cargaPreregistro(args);
				} else if (action.equals("cargaPreregistroInterbancaria")) {
					cargaPreregistroInterbancaria(args);
				} else if (action.equals("realizarTraspaso")) {
					realizarTraspaso(args);
				} else if (action.equals("showAlert")) {
					showAlert(args);
				} else if (action.equals("permitirFrecuentes")) {
					permitirFrecuentes(args);
				} else if (action.equals("envioEmail")) {
					envioMail(args);
				} else if (action.equals("enviaCorreo")) {
					enviaCorreo(args);
				} else if (action.equals("registraTraspaso")) {
					banderaOperacion = Server.ServerOperation.REGISTRA_TRASPASO_MIS_CUENTAS;
					registraTraspaso(args);
				} else if (action.equals("solicitaComision")) {
					banderaOperacion = Server.ServerOperation.SOLICITA_COMISION;
					solicitaComision(args);
				} else if (action
						.equals("recuperaListasFrecuentesInterbancaria")) {
					recuperaListasFrecuentesPreregistradasInterbancaria(args,
							"listarCuentasFrecuentes");
				} else if (action
						.equals("recuperaListasPreregistradasInterbancaria")) {
					recuperaListasFrecuentesPreregistradasInterbancaria(args,
							"listarCuentasPreregistradas");
				} else if (action.equals("recuperaFestivos")) {
					recuperaFestivos(args);
				} else if (action.equals("realizarTraspasoInterbancaria3")) {
					realizarTraspasoInterbancaria3(args);
				} else {
					// return super.execute(action, args, callbackContext);
				}

			}

		});

		return true;
	}
}