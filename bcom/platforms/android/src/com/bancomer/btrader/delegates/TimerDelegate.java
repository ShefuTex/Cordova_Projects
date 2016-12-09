package com.bancomer.btrader.delegates;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;

import com.bancomer.btrader.BCom;
import com.bancomer.btrader.common.DoKeepAlive;
import com.bancomer.btrader.common.InactividadTimer;
import com.bancomer.btrader.common.OperacionTimer;
import com.bancomer.btrader.session.Server;

public class TimerDelegate extends NativeDelegate {
	/**
	 * Hora de conexión del servidor.
	 */
	private String horaConeccion;
	
	/**
	 * Timer de sesión.
	 */
	private OperacionTimer mOperacionTimer;
	
	/**
	 * Timer de inactividad.
	 */
	private InactividadTimer mInactividadTimer;
	
	/**
	 * Timer de Keep Alive.
	 */
	private DoKeepAlive netDoKeepAlive;
	
	/**
	 * Inicializa los timers.
	 */
	public void initTimer() {
		if(null == mOperacionTimer || null == mInactividadTimer || null == netDoKeepAlive) {
			mOperacionTimer = OperacionTimer.getInstance();
			Log.d("mOperacionTimer","mOperacionTimer");
			mInactividadTimer = InactividadTimer.getInstance();
			Log.d("mInactividadTimer","mInactividadTimer");
			netDoKeepAlive = DoKeepAlive.getInstance(); 
			Log.d("doKeepAlive","doKeepAlive");
		}
	}
	
	public void logout() {
		BCom.getInstance().logout();
	}
	
	/**
	 * Resets the inactivity timer.
	 */
	private void resetTimerInactividad(CallbackContext callbackContext) {
		Log.d("resetTimerInactividad","resetTimerInactividad");
		if(null != mInactividadTimer) {
			mInactividadTimer.reset(Server.LogoutTime.InactivityTime);
		}
		mInactividadTimer.setLogoutCallBackContext(callbackContext);
	}
	
	/**
	 * Resets the session timer after going in or out of WebTrader section.
	 * @param isWetrader Flag to indicate if the current section is WebTrader.
	 */
	private void resetTimerOperacion(CallbackContext callbackContext, boolean isWetrader) {
		Log.d("resetTimerOperacion","resetTimerOperacion");
		if(null != mOperacionTimer) {
			mOperacionTimer.reset(isWetrader ? Server.LogoutTime.WebtraderSessionTime : Server.LogoutTime.NormalSessionTime);
		}
		mOperacionTimer.setLogoutCallBackContext(callbackContext);
	}
	
	private void resetDoKeepAlive(CallbackContext callbackContext, boolean isWetrader) {
		Log.d("resetDoKeepAlive","resetDoKeepAlive");
		if(null != netDoKeepAlive) {
			netDoKeepAlive.reset(isWetrader ? Server.LogoutTime.WebtraderSessionTime : Server.LogoutTime.TimerKeepAlive);
		}
		netDoKeepAlive.setLogoutCallBackContext(callbackContext);
	}

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		Log.v(this.getClass().getSimpleName(), "Action: " + action);
		
		initTimer();
		
		if(action.equals("resetTimerInactividad")) {
			Log.d("resetTimerInactividad","resetTimerInactividad");
			resetTimerInactividad(callbackContext);
		} else if(action.equals("resetTimerOperacion")) {
			Log.d("resetTimerOperacion","resetTimerOperacion");
			resetTimerOperacion(callbackContext, args.getBoolean(0));
		}else if(action.equals("resetDoKeepAlive")) {
			Log.d("resetDoKeepAlive","resetDoKeepAlive");
			resetDoKeepAlive(callbackContext, args.getBoolean(0));
		}else {
			Log.e(this.getClass().getSimpleName(), "Not such action: " + action);
			this.callbackContext.error("Not such action: " + action);
		}
		
		return true;
	}
}