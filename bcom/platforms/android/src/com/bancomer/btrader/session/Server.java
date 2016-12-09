package com.bancomer.btrader.session;

public final class Server {
	/**
	 * Private constructor to avoid any instance of this class.
	 */
	private Server() { }

	/**
	 * Enum of the possible logout times.
	 * @author <a href="mailto:jorge.morales@gonet.us">Jorge</a> 
	 */
	public enum LogoutTime {
		/**
		 * Time for an automated logout due to inactivity
		 */
		InactivityTime(60 * 60 * 1000),			// 05 minutes.
//		InactivityTime(30 * 60 * 1000),			// 05 minutes.
		
		/**
		 * Time for an automated logout while the application is not displaying the WebTrader section.
		 */
//		NormalSessionTime(15 * 60 * 1000),		// 15 minutes.
		//NormalSessionTime(60 * 60 * 1000),		// 60 minutes. Modificaci�n Incidencia 74.
		NormalSessionTime(58 * 60 * 1000),		// 3 minutes.
		
		/**
		 * Time for an automated logout while the application is displaying the WebTrader section.
		 */
		WebtraderSessionTime(58 * 60 * 1000),	// 55 minutes.
		
		//LogoutWarningTime(50 * 60 * 1000);		// 05 minutes.
		LogoutWarningTime(5 * 60 * 1000),		// 2 minutes.
		
		TimerKeepAlive(10 * 60 * 1000);		// 2 minutes.
		
		/**
		 * Miliseconds to elapse before forced logout.
		 */
		private long logoutTimeMilis;
		
		/**
		 * @return Miliseconds to elapse before forced logout.
		 */
		public long getLogoutTimeMilis() {
			return logoutTimeMilis;
		}
		
		/**
		 * @param logoutTimeMilis Miliseconds to elapse before forced logout.
		 */
		LogoutTime(long logoutTimeMilis) {
			this.logoutTimeMilis = logoutTimeMilis;
		}
	}
	
	/**
	 * Available operations with the server.
	 * @author <a href="mailto:jorge.morales@gonet.us">Jorge</a>
	 */
	public enum ServerOperation {
		/**
		 * Operation to conect with the WebSeal.
		 */
		CONECTAR_WEBSEAL,
		
		/**
		 * Login operation for clients without token.
		 */
		LOGIN_ONE,
		
		/**
		 * Login operation for client with token.
		 */
		LOGIN_TWO,
		
		/**
		 * Logout operation.
		 */
		SING_OFF,
		
		/**
		 * Banks catalog download operation.
		 */
		CATALOGO_BANCOS,
		
		/**
		 * Business rules download operation.
		 */
		REGLAS_DE_NEGOCIO,
		
		/**
		 * 
		 */
		/**
		 * Business rules download operation.
		 */
		REGLAS_DE_NEGOCIO_EFECTIVO,
		
		/**
		 * 
		 */
		POSICION_GLOBAL,
		
		/**
		 * Recupera movimientos, cuentas MXP
		 */
		MOVIMIENTOS_CTAS_CHEQUES,
		
		/**
		 * Recupera movimientos, cuentas USD
		 */
		MOVIMIENTOS_CTAS_USD,
		
		/**
		 * Recupera movimientos, cuentas TDC
		 */
		MOVIMIENTOS_TDC,

		/**
		 * Recupera periodos, consulta estado cuenta
		 */
		RECUPERA_PERIODOS,

		/**
		 * Consulta estado, consulta estado cuenta
		 */
		CONSULTA_EDO_CUENTA,

		/**
		 * Consulta comprobantes, recupera operaciones
		 */
		RECUPERA_OPERACIONES,

		/**
		 * Invertir Compra, aplica compra inversión
		 */
		APLICA_COMPRA_INVERSION,
		
		/**
		 * Invertir Venta, aplica venta inversión
		 */
		APLICA_VENTA_INVERSION,
		/**
		 * Invertir Venta, recupera lista de titulos
		 */
		RECUPERA_LISTA_TITULOS,
		
		/**
		 * Recupera las tasas para Invertir-Consulta
		 */
		RECUPERA_TASAS_CONSULTA_INVERTIR,

		/**
		 * Pago mínimo no interes
		 */
		PAGO_MINIMO_NO_INTERES,

		/**
		 * Solicita comisión
		 */
		SOLICITA_COMISION, 
		
		/**
		 * Registra traspaso
		 */
		REGISTRA_TRASPASO_MIS_CUENTAS,
	
		
		
		/**
		 * Recupera las cuentas bbva frecuentes/preregistradas.
		 */
		RECUPERA_CUENTAS_BBVA_FRECUENTES_PREREGISTRADAS,
		
		/**
		 * Consulta Beneficiario.
		 */
		CONSULTA_BENEFICIARIO_CTA_BBVA, 
		
		/**
		 * Preregistrar cuenta.
		 */
		PREREGISTRAR_CUENTA_BBVA, 
		
		/**
		 * Carga preregistro cuenta.
		 */
		CARGA_PREREGISTRO_CUENTA_BBVA, 
		
		/**
		 * Realiza traspaso cuenta.
		 */
		REALIZAR_TRASPASO_CUENTA_BBVA, 
		
		/**
		 * Envio email.
		 */
		ENVIO_EMAIL, 
		
		/**
		 * Realiza traspaso terceros 3 pasos.
		 */
		REALIZAR_TRASPASO_CUENTA_BBVA_3,
		
		/**
		 * permitir frecuentes
		 */
		PERMITIR_FRECUENTES,
		
		/**alert para cancelar traspaso**/
		SHOW_ALERT,

		/**
		 * Listas frecuentes/preregistradas interbancarias.
		 */
		LISTAS_FRECUENTES_PREREGISTRADAS_INTERBANCARIAS, 
		
		/**
		 * Recupera festivos.
		 */
		RECUPERA_FESTIVOS, 
		
		/**
		 * Traspaso interbancarias.
		 */
		TRASPASO_INTERBANCARIAS,
		
		/**
		 * Preregistrar cuenta interbancaria.
		 */
		PREREGISTRAR_CUENTA_INTER,

		/**
		 * Carga preregistro cuenta interbancaria.
		 */
		CARGA_PREREGISTRO_CUENTA_INTER,
		
		/**
		 * Get server mode.
		 */
		GET_SERVER_MODE,
		
		/**
		 * WEBTRADER *******************************************
		 */
		WT_CONSULTA_TIPO_SERVICIO, 
		
		CONSULTA_TIPO_SERVICIO, 
		
		CONSULTA_CONTRATOS_PATRIMONIALES, 
		
		CONSULTA_DETALLE_INVERSION, 
		
		CONSULTA_CAPITALES, 
		
		CANCELA_ORDEN, 
		
		DETALLE_ORDEN,
		
		ENVIO_CORREO_COMPRA_VENTA, 

		REALIZAR_COMPRA_VENTA, 
		
		ENVIO_CORREO_CANCELACION,
		
		ENVIO_APERTURA_FICHERO,
		
		LISTA_CUENTAS_EFECTIVO,
		
		APLICA_TRASPASO_EFECTIVO,
		
		REGLAS_VALOR,
		
		WTDIA_HABIL,
		
		DOKEEPALIVE,
		
		SIGN_OFF_WAS,
		
		SIGN_OFF_WEBSEAL,
		
		VERSION_SERVIDOR,
		
		INTERNET
		
		
	}
	
	public static final String SHARED_PREFERENCES_NAME = "BcomSharedPreferences";
	
	public static final String CAMPO_USER_NAME = "";
	
	public static final String TAG = "BCOM";
	public static final String JSON_ARQ = "Servicio temporalmente no disponible, le pedimos intente más tarde. Disculpe las molestias que esto le ocasiona.";
	public static final String JSON_EXCEPTION = "Se encontro un error parseando la repsuesta a Json";
	public static final String NULL_EXCEPTION = "Se recibe un objeto nulo para validacion";
	public static final String GENERAL_EXCEPTION = "Se obtuvo una excepcion general";
	
	public static final String WAS = "WAS";
	public static final String WEBSEAL = "WEBSEAL";
	
	public static final String ESTADO_OK = "success";
	public static final String ESTADO_FAIL = "fail";
	
	public enum EstadoRespuesta{Ok, Fail,ARQ}
	
	//#region Persistence JSON files.
	/**
	 * Enumeration of the available presistent JSON files.
	 * @author <a href="mailto:jorge.morales@gonet.us">Jorge</a>
	 */
	public enum PersistentJsonFile {
		/**
		 * File name for the sign on response file name
		 */
		FILE_SIGN_ON("SignOnJSON.json"),
		
		/**
		 * File name for the sign on 2 response file name
		 */
		FILE_SIGN_ON_2("SigOn2JSON.json"),
		
		/**
		 * File name for the sign off response file name
		 */
		FILE_SIGN_OFF("SigOffJSON.json"),
		
		/**
		 * File name for the bank catalog response file name
		 */
		FILE_CAT_BAN("CatBanJSON.json"),
		
		/**
		 * File name for the global position response file name
		 */
		FILE_POS_GL("PosGloJSON.json");
		
		/**
		 * The file name.
		 */
		private String fileName = null;
		
		/**
		 * @return The file name.
		 */
		public String getFileName() {
			return this.fileName;
		}
		
		/**
		 * Private constructor.
		 * @param fileName The file name.
		 */
		private PersistentJsonFile(String fileName) {
			this.fileName = fileName;
		}
	}
	//#endregion
	
	//#region Constantes del Server.
	public enum ServerModes {
		SIMULACION,
		TEST,
		PRODUCCION
	}

	public static ServerModes serverMode = ServerModes.TEST
			;


	public static final boolean WEBSEAL_ACTIVO = true;
	public static final String URL_BALANCEADOR = "https://a1.bbvanet.com.mx/";
	public static final String URL_BALANCEADORPROD = "https://a1.bbvanet.com.mx/";
	public static final String BURL_SIGNON = "LogonOperacionServlet";
	public static final String BURL_CBTF = "OperacionCBTFServlet";
	public static final String BURL_WEBSEAL = "pkmslogin.form";
	public static final String BURL_REGLAS_NEGOCIO = "reglas_negocio_ipad.jsp";
	public static final String BURL_SIGNOFF_WAS="LogoutCBTFServlet";
	public static final String BURL_SIGNOFF_WEBSEAL="pkmslogout.form";
	
	public static final String BURL_CERRARSESION = "isignoff_movil.jsp";
	public static final String BURL_DESCONECTAWAS = "LogoutCBTFServlet";
	public static final String BURL_DESCONECTAWEBSEAL = "pkmslogout.form";
	
	public static final String USUARIO_INVOCAWEBSEAL = "ADMINF";
	public static final String CANAL_BNET = "BNET";
	//#endregion

	//#region Cookies storage.
	public static final String COOKIES_COUNT_PROPERTY_NAME = "numerogalletas";
	public static final String COOKIES_COUNT_PROPERTY_NAME2 = "numerogalletas_2";
	
	public static final String CARD_NUMBER_PROPERTY_NAME = "tarjeta";
	
	public static final String COOKIE_NAME_PROPERTY_PREFIX = "galletanombre_";
	public static final String COOKIE_VALUE_PROPERTY_PREFIX = "galletavalor_";
	public static final String COOKIE_VERSION_PROPERTY_PREFIX = "galletaversion_";
	public static final String COOKIE_DOMAIN_PROPERTY_PREFIX = "galletadominio_";
	public static final String COOKIE_PATH_PROPERTY_PREFIX = "galletapath_";
	
	public static final String COOKIE_NAME2_PROPERTY_PREFIX = "galletanombre_2_";
	public static final String COOKIE_VALUE2_PROPERTY_PREFIX = "galletavalor_2_";
	public static final String COOKIE_VERSION2_PROPERTY_PREFIX = "galletaversion_2_";
	public static final String COOKIE_DOMAIN2_PROPERTY_PREFIX = "galletadominio_2_";
	public static final String COOKIE_PATH2_PROPERTY_PREFIX = "galletapath_2_";
	//#endregion//
	
	/**
	 * Empty String to avoid creating new empty Strings. 
	 */
	public static final String EMPTY_STRING = "";
	
	public static final int MAX_HTTP_FAILED_INTENTS = 3;
	
	public enum InstrumentoDeSeguridad {
		SOFTTOKEN("S1"),
		DP270("T3"),
		OCRA("T6");
		
		private String codigoInstrumento = null;
		
		public String getCodigoInstrumento() {
			return this.codigoInstrumento;
		}
		
		private InstrumentoDeSeguridad(String codigoInstrumento) {
			this.codigoInstrumento = codigoInstrumento;
		}
	}
	
}
