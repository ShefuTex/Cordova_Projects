package com.bancomer.btrader;

import com.bancomer.btrader.R;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;

public class SplashActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.splash_layout);
		
		// Habilita en el dispositvo fisico el degug de js con chrome
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
		   if (0 != (getApplicationInfo().flags &= ApplicationInfo.FLAG_DEBUGGABLE)){ 
			   WebView.setWebContentsDebuggingEnabled(true);
		   }
		}
		
		initialize();
	}
	
	/**
	 * Initialize the Application.
	 * <br/>
	 * Note: In future here will be the update of the web elements. 
	 */
	private void initialize() {
		//TODO Change the content of this method for the needed code of the update.
		//#region Async Task.
		
		AsyncTask<Void, Void, Void> delayTask = new AsyncTask<Void, Void, Void>() {
			private final static long SPLASH_DELAY = 3000;
			
			@Override
		    protected Void doInBackground(Void... params) {
				Log.v(SplashActivity.class.getSimpleName(), "Waiting 3 seconds.");
		        try {
		        	Thread.sleep(SPLASH_DELAY);
		        	Log.v(SplashActivity.class.getSimpleName(), "3 seconds elapsed.");
		        } catch (InterruptedException ex) {
		        	Log.e(this.getClass().getSimpleName(), "Error in splash delay task", ex);
		        }
		        
		        return null;
		    }       

			@Override
			protected void onPostExecute(Void result) {
				showLogin();
			}
		};
		//#endregion
		
		delayTask.execute();
	}
	
	/**
	 * Shows the Phonegap Activity, starting with the Login.
	 */
	private void showLogin() {
		Intent intent = new Intent(this, BCom.class);
		//intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
		//intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
		intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
		startActivity(intent);
		
		// Avoids to return to this activity on back button clicked.
		this.finish();
	}

} 