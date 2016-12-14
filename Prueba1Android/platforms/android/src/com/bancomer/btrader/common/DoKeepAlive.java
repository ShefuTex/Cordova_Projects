package com.bancomer.btrader.common;

import java.util.Timer;
import java.util.TimerTask;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;

import com.bancomer.btrader.R;
import com.bancomer.btrader.BCom;
import com.bancomer.btrader.common.KeepAliveServicio;
import com.bancomer.btrader.controllers.TokenViewController;
import com.bancomer.btrader.session.Server;
import com.bancomer.btrader.session.Server.LogoutTime;

public class DoKeepAlive extends Timer{
	private static DoKeepAlive instance;
	private TimerTask logoutTask = null;
	private boolean logoutWarningShowed = false;
	private CallbackContext logoutCallBackContext;
	private TimerTask currentTask;
	
	
	private static final String TIMER_NAME = "DoKeepAlive";

	
	public CallbackContext getlogoutCallbackContext() {
		return this.logoutCallBackContext;
	}
	
	public void setLogoutCallBackContext(CallbackContext logoutCallBackContext) {
		this.logoutCallBackContext = logoutCallBackContext;
	}
	
	public boolean isLogoutWarningShowed() {
		return this.logoutWarningShowed;
	}
	
	public void setLogoutWarningShowed(boolean logoutWarningShowed) {
		this.logoutWarningShowed = logoutWarningShowed;
	}
	
	public void showLogoutWarning() {
		this.reset(LogoutTime.LogoutWarningTime);
		BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.logout_session_time_warning));
		this.logoutWarningShowed = true;
	}
	
	private DoKeepAlive() {
		super(TIMER_NAME);
		init(Server.LogoutTime.TimerKeepAlive);
	}

	
	public static DoKeepAlive getInstance() {
		if(null == instance)
			instance = new DoKeepAlive();
		return instance;
	}
	
	public boolean reset(Server.LogoutTime logoutTime) {
		if(null == logoutTime) {
			Log.w(this.getClass().getSimpleName(), "Logout task not reseted, logout time was null.");
			return false;
		}
		
		logoutTask.cancel();
		return this.run(logoutTime);
	}
	
	public boolean init(Server.LogoutTime logoutTime) {
		return run(logoutTime);
	}
	
	public boolean run(Server.LogoutTime logoutTime) {
		if(null == logoutTime) {
			Log.w(this.getClass().getSimpleName(), "Timer not schedlued, logout time was null.");
			return false;
		}
		
		this.logoutWarningShowed = false;
		
		Log.v(this.getClass().getSimpleName(), "" + logoutTime.getLogoutTimeMilis());
		logoutTask = new TimerTask() {
			KeepAliveServicio keepAliveServicio = new KeepAliveServicio();
			@Override
			public void run() {
				Log.v(DoKeepAlive.class.getSimpleName(), "Logout");
				DoKeepAlive timer = DoKeepAlive.getInstance();
				timer.reset(LogoutTime.TimerKeepAlive);
				Log.d("DoKeepAlive","LU_ESTOY_DOKEEP");
				//TokenViewController netDo = new TokenViewController();
				
				Log.d("LU_ESTOY_DOKEEP","LU_ESTOY_DOKEEP");
				JSONArray args = null;
				//TokenViewController keepAliveServicio = new TokenViewController();
				
				try {
					keepAliveServicio.execute("wtConsultaContratosPatrimoniales", args, logoutCallBackContext);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				/*CallbackContext callBack = CallbackContext.this;
				callBack.getCallbackId();*/
				//keepAliveServicio.execute0()
				//keepAliveServicio.ejecutaServicio();
				Log.d("Objeto","Crea Objeto");
		
				//doNetworkOperation("wtConsultaContratosPatrimoniales");
				/*if(!timer.isLogoutWarningShowed()) {
					timer.reset(LogoutTime.TimerKeepAlive);
					timer.setLogoutWarningShowed(true);
					timer.showLogoutWarning();
				} else {
					timer.getlogoutCallbackContext().success(Server.EMPTY_STRING);
					BCom.getInstance().logout();
				}*/
			}
		}; 
		this.schedule(logoutTask, logoutTime.getLogoutTimeMilis());
		
		Log.v(this.getClass().getSimpleName(), "Timer reseted successfully.");
		return true;
	}
	
	
	
	public void cancel() {
		Log.v(this.getClass().getSimpleName(), "Timer canceled.");
		
		if(null == currentTask)
			Log.w(this.getClass().getSimpleName(), "Logout task not canceled, current task was null.");
		else
			currentTask.cancel();
	}
	//#endregion

}
