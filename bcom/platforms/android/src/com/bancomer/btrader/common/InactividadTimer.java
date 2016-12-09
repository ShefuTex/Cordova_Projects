package com.bancomer.btrader.common;

import java.util.Timer;
import java.util.TimerTask;

import org.apache.cordova.CallbackContext;

import com.bancomer.btrader.BCom;
import com.bancomer.btrader.session.Server;

import android.util.Log;

public class InactividadTimer extends Timer {
	//#region Singleton.
	/**
	 * Singleton instance.
	 */
	private static InactividadTimer instance;
	
	/**
	 * @return Singleton instance.
	 */
	public static InactividadTimer getInstance() {
		if(null == instance)
			instance = new InactividadTimer();
		return instance;
	}
	
	/**
	 * Singleton constructor.
	 */
	private InactividadTimer() {
		super(TIMER_NAME);
		init(Server.LogoutTime.InactivityTime);
	}
	//#endregion

	//#region Properties.
	/**
	 * Timer name.
	 */
	private static final String TIMER_NAME = "InactividadTimer";
	
	/**
	 * The current timer task. This task is refreshed  every time the run method is called.
	 */
	private TimerTask currentTask;
	
	/**
	 * Callback context to inform of a logout.
	 */
	private CallbackContext logoutCallBackContext;
	//#endregion
	
	//#region Setters & Getters.
	/**
	 * @return Callback context to inform of a logout.
	 */
	public CallbackContext getLogoutCallbackContext() {
		return this.logoutCallBackContext;
	}
	
	/**
	 * @param logoutCallBackContext Callback context to inform of a logout.
	 */
	public void setLogoutCallBackContext(CallbackContext logoutCallBackContext) {
		this.logoutCallBackContext = logoutCallBackContext;
	}
	//#endregion
	
	//#region Timer behavior
	/**
	 * Initialize the timer
	 * @param logoutTime The time for the task schedule.
	 * @return Whether if the timer task was scheduled successfully or not.
	 */
	public boolean init(Server.LogoutTime logoutTime) {
		return this.run(logoutTime);
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
		
		currentTask = new TimerTask() {
			@Override
			public void run() {
				Log.v(InactividadTimer.class.getSimpleName(), "Logout");
				InactividadTimer.getInstance().getLogoutCallbackContext().success(Server.EMPTY_STRING);
				BCom.getInstance().logout();
			}
		}; 
		this.schedule(currentTask, logoutTime.getLogoutTimeMilis());
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
		
		if(null == currentTask) {
			Log.w(this.getClass().getSimpleName(), "Logout task not reseted, current task was null.");
			return false;
		}
		
		currentTask.cancel();
		return this.run(logoutTime);
	}
	
	/**
	 * Cancels the timer. 
	 */
	@Override
	public void cancel() {
		Log.v(this.getClass().getSimpleName(), "Timer canceled.");
		
		if(null == currentTask)
			Log.w(this.getClass().getSimpleName(), "Logout task not canceled, current task was null.");
		else
			currentTask.cancel();
	}
	//#endregion
}
