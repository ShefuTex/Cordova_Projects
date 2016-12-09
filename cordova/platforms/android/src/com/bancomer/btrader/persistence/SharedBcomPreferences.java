package com.bancomer.btrader.persistence;

import com.bancomer.btrader.session.Server;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

public class SharedBcomPreferences {

	private SharedPreferences sharedPreferences = null;
	public static Context appContext = null;

	private static SharedBcomPreferences laInstancia = null;

    private SharedBcomPreferences() {   	
    	sharedPreferences = appContext.getSharedPreferences(Server.SHARED_PREFERENCES_NAME, Context.MODE_PRIVATE);
    }
    
    private synchronized static void createInstance() {
        if (laInstancia == null) { 
        	laInstancia = new SharedBcomPreferences();
        }
    }
 
    public static SharedBcomPreferences getInstance() {
        if (laInstancia == null) createInstance();
        return laInstancia;
    }
	
    public String getPreferencia(String pref){
		String res = "";
		
		try {
			res = sharedPreferences.getString(pref, "");
		} catch (Exception e) {
			Log.e(Server.TAG, "Error en getPreferencia. " + e.getMessage());
		}
		
		return res;
	}
	
	public void setPreferencia(String nombre, String valor){	
		try {
			SharedPreferences.Editor editor = sharedPreferences.edit();
			editor.putString(nombre, valor);
			editor.commit();
			editor = null;
		} catch (Exception e) {
			Log.e(Server.TAG, "Erro al guardar la Preferencia. " + e.getMessage());
		}
	}
	
}
