package com.bancomer.btrader.common;

import android.util.Log;

import com.bancomer.btrader.BCom;
import com.bancomer.btrader.session.Server;
import com.bancomer.btrader.session.Server.LogoutTime;

import org.apache.cordova.CallbackContext;

import java.util.Timer;
import java.util.TimerTask;

import com.bancomer.btrader.R;

//Todo se edito la ruta del R

public class OperacionTimer extends Timer {
	//#region Singleton.
	/**
	 * Singleton instance.
	 */
	private static OperacionTimer instance;
	
	/**
	 * @return Singleton instance.
	 */
	public static OperacionTimer getInstance() {
		if(null == instance)
			instance = new OperacionTimer();
		return instance;
	}
	
	/**
	 * Singleton constructor.
	 */
	private OperacionTimer() {
		super(TIMER_NAME);
		init(Server.LogoutTime.NormalSessionTime);
	}
	//#endregion
	
	//#region Properties.
	/**
	 * Timer name.
	 */
	private static final String TIMER_NAME = "OperacionTimer";
	
	/**
	 * The current timer task.
	 */
	private TimerTask logoutTask = null;
	
	/**
	 * Callback context to inform of a logout.
	 */
	private CallbackContext logoutCallBackContext;
	
	/**
	 * Flag to indicate if the warning to prevent the user about the logout has been shown.
	 */
	private boolean logoutWarningShowed = false;
	//#endregion
	
	//#region Setters & Getters.
	/**
	 * @return Callback context to inform of a logout.
	 */
	public CallbackContext getlogoutCallbackContext() {
		return this.logoutCallBackContext;
	}
	
	/**
	 * @param logoutCallBackContext Callback context to inform of a logout.
	 */
	public void setLogoutCallBackContext(CallbackContext logoutCallBackContext) {
		this.logoutCallBackContext = logoutCallBackContext;
	}
	
	/**
	 * @return Flag to indicate if the warning to prevent the user about the logout has been shown.
	 */
	public boolean isLogoutWarningShowed() {
		return this.logoutWarningShowed;
	}
	
	/**
	 * @param logoutWarningShowed Flag to indicate if the warning to prevent the user about the logout has been shown.
	 */
	public void setLogoutWarningShowed(boolean logoutWarningShowed) {
		this.logoutWarningShowed = logoutWarningShowed;
	}
	//#endregion
	
	//#region Timer behavior
	/**
	 * Initialize the timer
	 * @param logoutTime The time for the task schedule.
	 * @return Whether if the timer task was scheduled successfully or not.
	 */
	public boolean init(Server.LogoutTime logoutTime) {
		return run(logoutTime);
	}
	
	/**
	 * Run a new TimerTask whit the specified schedule time. 
	 * @param logoutTime The time for the task schedule.
	 * @return Whether if the timer task was scheduled successfully or not.
	 */
	public boolean run(Server.LogoutTime logoutTime) {
		if(null == logoutTime) {
			Log.w(this.getClass().getSimpleName(), "Timer not schedlued, logout time was null.");
			return false;
		}
		
		this.logoutWarningShowed = false;
		
		Log.v(this.getClass().getSimpleName(), "" + logoutTime.getLogoutTimeMilis());
		logoutTask = new TimerTask() {
			@Override
			public void run() {
				Log.v(OperacionTimer.class.getSimpleName(), "Logout");
				OperacionTimer timer = OperacionTimer.getInstance();
				if(!timer.isLogoutWarningShowed()) {
					timer.reset(LogoutTime.LogoutWarningTime);
					timer.setLogoutWarningShowed(true);
					timer.showLogoutWarning();
				} else {
					timer.getlogoutCallbackContext().success(Server.EMPTY_STRING);
					BCom.getInstance().logout();
				}
			}
		}; 
		this.schedule(logoutTask, logoutTime.getLogoutTimeMilis());
		
		Log.v(this.getClass().getSimpleName(), "Timer reseted successfully.");
		return true;
	}

	/**
	 * Cancels the current scheduled task and schedule a new one.
	 * @param logoutTime The time for the task schedule.
	 * @return Whether if the timer task was scheduled successfully or not.
	 */
	public boolean reset(Server.LogoutTime logoutTime) {
		if(null == logoutTime) {
			Log.w(this.getClass().getSimpleName(), "Logout task not reseted, logout time was null.");
			return false;
		}
		
		logoutTask.cancel();
		return this.run(logoutTime);
	}

	/**
	 * Cancels the timer. 
	 */
	@Override
	public void cancel() {
		Log.v(this.getClass().getSimpleName(), "Timer canceled.");
		
		if(null == logoutTask)
			Log.w(this.getClass().getSimpleName(), "Logout task not canceled, current task was null.");
		else
			logoutTask.cancel();
	}
	//#endregion
	
	/**
	 * Shows a warning alert to inform the user that the session will be closed in 5 minutes.
	 */
	public void showLogoutWarning() {
		this.reset(LogoutTime.LogoutWarningTime);
		BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.logout_session_time_warning));
		this.logoutWarningShowed = true;
	}
		
}
