/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.bancomer.btrader;

import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.util.Log;

import com.bancomer.btrader.common.InactividadTimer;
import com.bancomer.btrader.common.OperacionTimer;
import com.bancomer.btrader.delegates.LoginDelegate;
import com.bancomer.btrader.session.Server;
import com.bancomer.btrader.utils.Utilerias;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.Config;
import org.apache.cordova.CordovaActivity;
import org.json.JSONArray;
import org.json.JSONException;

import com.bancomer.btrader.R;

public class BCom extends CordovaActivity {
	private boolean activityPaused = false;
	private static final String EXIT_EXTRA_KEY = "exit_activity";
	public CallbackContext callbackContext;
	//#region Pseudo - Singleton.
	private static BCom theInstance = null;
	
	public static BCom getInstance() {
		return theInstance;
	}
	
	public static void setInstance(BCom newInstance) {
		theInstance = newInstance;
	}
	//#endregion
	
	private boolean invitado = false;
	
	public boolean isInvitado() {
		return invitado;
	}

	public void setInvitado(boolean invitado) {
		this.invitado = invitado;
	}
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	super.onCreate(savedInstanceState);
    	
    	if(null != getIntent() && null != getIntent().getExtras() && getIntent().getExtras().containsKey(EXIT_EXTRA_KEY)) {
    		this.finish();
    	} else {
	    	Log.v(this.getClass().getSimpleName(), "Creating an BCom Activity instance.");
	        
	        
			BCom.setInstance(this);
			//TODO remplase this.getContext(); por this.getApplication().getApplicationContext();

			Utilerias.applicationContext = this.getApplication().getApplicationContext();

			
			Log.v(this.getClass().getSimpleName(), "Reset App: elimina el cache.");
    		//super.clearCache();
    		Log.v(this.getClass().getSimpleName(), "Reset App: elimina el historial.");
    		//super.clearHistory();
    		
	        super.loadUrl(Config.getStartUrl());
	        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
    	}
    }
    
	@Override
	public void onConfigurationChanged(Configuration newConfig) {
	    super.onConfigurationChanged(newConfig);
	    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
	}
    
    @Override
    protected void onPause() {
    	
    	//boolean wifi = Utilerias.hayInternet();
    	Log.v(this.getClass().getSimpleName(), "Pausing the Activity instance.");
    	Log.v(this.getClass().getSimpleName(), "Mario");
        WifiManager wifiManager = (WifiManager) getSystemService(WIFI_SERVICE);
        WifiInfo wifiInfo = wifiManager.getConnectionInfo();
        String wifiInfo2 = wifiManager.getConnectionInfo().getSSID();
        Log.d("wifiInfo",wifiInfo2.toString());
    
        //boolean si_hay = Utilerias.hayInternet();
        
        //System.out.print("Si_mario:  "+si_hay);
        
        System.out.print("wifiInfo2: "+wifiInfo2);
        if(wifiInfo2.toString() == "<unknown ssid>")
        {
        	System.out.print("sin ssid");
        	//finish()
        	super.onPause();
        	
        	activityPaused = true;
        	runOnUiThread(new Runnable() {
    			@Override
    			public void run() {
    				BCom.getInstance().finish();
    			}
    		});
        }else{ 
        Log.d("wifiInfo",wifiInfo.toString());
    	onStart();
    	try {
    		
			LoginDelegate.getInstance().execute("wtLogout", new JSONArray(), callbackContext);
		} catch (JSONException jsonEx) {
			Log.e(this.getClass().getSimpleName(), "Error on automatic logout.", jsonEx);
			return;
		}
    	super.onPause();
    	
    	//finish();
    	activityPaused = true;
    	runOnUiThread(new Runnable() {
			@Override
			public void run() {
				BCom.getInstance().finish();
			}
		});
        }	
    }
    public static boolean checkWifiState(Context context){
    	System.out.print("Hola");
    	  try {
    	    WifiManager mWifiManager=(WifiManager)context.getSystemService(Context.WIFI_SERVICE);
    	    WifiInfo wifiInfo=mWifiManager.getConnectionInfo();
    	    if (!mWifiManager.isWifiEnabled() || wifiInfo.getSSID() == null) {
    	    	System.out.print("Hola");
    	      return false;
    	    }
    	    
    	    return true;
    	    
    	  }
    	 catch (  Exception e) {
    	    return false;
    	  }
    	}
    
    /**
     * Invokes a logout from the LoginDelegate class
     */
    public void logout() {
    	try {
			LoginDelegate.getInstance().execute("logout", new JSONArray(), null);
		} catch (JSONException jsonEx) {
			Log.e(this.getClass().getSimpleName(), "Error on automatic logout.", jsonEx);
			return;
		}
    }
    
    /**
     * Resets the application, stops the current timers and reload the login page.
     */
    public void resetApp() {
    	resetApp(false);
    }
    
    /**
     * Resets the application, stops the current timers and reload the login page, after that shows an alert dialog.
     * @param showMessage Flag to indicate if an alert should be set after the login page is shown.
     */
    public void resetApp(boolean showMessage) {
    	InactividadTimer.getInstance().cancel();
    	OperacionTimer.getInstance().cancel();  
    	
    	if(!activityPaused) {
    		Log.v(this.getClass().getSimpleName(), "Reset App: " + Config.getStartUrl());
    		
    		//super.loadUrl(Config.getStartUrl());
    		//super.loadUrl("file:///android_asset/www/index.html");
    		Intent inicio = new Intent();
    		inicio.setClass(BCom.this, SplashActivity.class);
    		startActivity(inicio);
    	}
    	
    	if(showMessage)
    		showInformationAlert(getString(R.string.logout_session_time_expired));
    }

	public void showAlert(final CallbackContext cordovaCallbackContext, final String title, final String message, final String positiveButtonText) {
	    showAlert(cordovaCallbackContext, title, message, positiveButtonText, null);
    }
	
	public void showAlert(final CallbackContext cordovaCallbackContext, final String title, final String message, final String positiveButtonText, final String negativeButtonText) {
		this.runOnUiThread(new Runnable() {	
			@Override
			public void run() {
				AlertDialog.Builder builder = new Builder(BCom.getInstance());
				builder
					.setTitle(title)
					.setMessage(message)
					.setPositiveButton(positiveButtonText, new DialogInterface.OnClickListener() {
						@Override
						public void onClick(DialogInterface dialog, int which) {
							cordovaCallbackContext.success(Server.EMPTY_STRING);
						}
					});
				
				if(null != negativeButtonText) {
					builder.setNegativeButton(negativeButtonText, new DialogInterface.OnClickListener() {
						@Override
						public void onClick(DialogInterface dialog, int which) {
							cordovaCallbackContext.success(Server.EMPTY_STRING);
						}
					});
				}
				
				builder.create().show();
			}
		});
	}

	public void showInformationAlert(final String message) {
		this.runOnUiThread(new Runnable() {	
			@Override
			public void run() {
				AlertDialog.Builder builder = new Builder(BCom.getInstance());
				builder
					.setTitle(BCom.getInstance().getString(R.string.alert_title_text))
					.setMessage(message)
					.setPositiveButton(BCom.getInstance().getString(R.string.alert_accept_button_text), new DialogInterface.OnClickListener() {
						@Override
						public void onClick(DialogInterface dialog, int which) {
							return;
						}
					});
				builder.create().show();
			}
		});
	}
}