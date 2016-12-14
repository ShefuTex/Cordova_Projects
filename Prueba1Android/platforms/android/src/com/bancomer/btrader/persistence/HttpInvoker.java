package com.bancomer.btrader.persistence;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.security.KeyStore;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Scanner;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CookieStore;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.params.HttpClientParams;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.tsccm.ThreadSafeClientConnManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;
import android.view.KeyEvent;

import com.bancomer.btrader.R;
import com.bancomer.btrader.BCom;
import com.bancomer.btrader.session.Server;
import com.bancomer.btrader.session.Session;
import com.bancomer.btrader.session.Server.EstadoRespuesta;
import com.bancomer.btrader.session.Server.InstrumentoDeSeguridad;
import com.bancomer.btrader.session.Server.PersistentJsonFile;
import com.bancomer.btrader.session.Server.ServerModes;
import com.bancomer.btrader.utils.Utilerias;

public class HttpInvoker {

	private static HttpInvoker laInstancia = null;
	private SharedBcomPreferences sbcp = null;
	private static DefaultHttpClient httpclient;
	private int peticionesFallidas = 0;

	private static InstrumentoDeSeguridad instrumentoDeSeguridad = InstrumentoDeSeguridad.DP270;
	
//	private static String TRAMA_INSTRUMENTO = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"posicionGlobal\":{\"acceso_usr\":4152312171293621,\"hora_sesionAnterior\":\"12:07\",\"indicador_fondosinversion\":0,\"indCreditosHipotecarios\":false,\"email_usr\":\" \",\"esq_admon_usr\":\"T\",\"indMsjInformativo\":3,\"clienteMorosoAliasCuentaAdeudo\":\"\",\"clienteMorosoMontoAdeudoComision\":0,\"usuario_usr\":\"ADMINF\",\"nivel_aut_usr\":4,\"indOperacionesRapidas\":false,\"clienteMorosoMontoAdeudoIva\":0,\"tiseguridad_usr\":\"%s\",\"clienteMorosoCuentaAdeudo\":\"\",\"alias_usr\":\"LEONARDO\",\"esquema_seg_usr\":0,\"indMostrarEncuesta\":true,\"cliente_usr\":\"D0026035\",\"indicadorPromocion\":\" \",\"indCreditosAlConsumo\":false,\"indicador_inversiones_usd\":0,\"indMMDTokenAcceso\":false,\"pideFolioLDA\":\"\",\"id_operacion\":40045,\"func_max_usr\":9,\"tipoCampania\":\"\",\"fecha_sesionAnterior\":\"15/07/2014\",\"perfil_usr\":\"IF05\",\"clienteMorosoMontoAdeudoTotal\":0,\"nombre_usr\":\"LOMELI SERRANO LEONARDO\",\"asuntos\":{\"lista_inversiones_usd\":null,\"lista_fondosinversion_mxp\":null,\"lista_cuentas_mxp\":[{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000001\",\"saldo_disponible\":4999999762297,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00746362000178396167\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0}],\"lista_tarjetascredito\":null,\"lista_cuentas_eur\":null,\"lista_tarjetaprepagada\":null,\"lista_cuentas_usd\":null,\"lista_inversiones_mxp\":null},\"clienteMorosoEstado\":\"A1\",\"listaEsquemas\":[{\"claveOperacion\":false,\"descripcion\":\"Consulta Estados de Cuenta PDF\",\"claveDos\":false,\"IS\":true,\"operacion\":\"CEC\"},{\"claveOperacion\":false,\"descripcion\":\"Inhibicion Estados de Cuenta\",\"claveDos\":false,\"IS\":false,\"operacion\":\"IEC\"},{\"claveOperacion\":false,\"descripcion\":\"Traspaso Cuenta propias\",\"claveDos\":false,\"IS\":false,\"operacion\":\"TCP\"},{\"claveOperacion\":false,\"descripcion\":\"Traspaso Otros Bancos\",\"claveDos\":false,\"IS\":true,\"operacion\":\"TOB\"},{\"claveOperacion\":false,\"descripcion\":\"Traspaso Terceros Bancomer\",\"claveDos\":false,\"IS\":true,\"operacion\":\"TTB\"},{\"claveOperacion\":false,\"descripcion\":\"Compra Venta Divisas\",\"claveDos\":false,\"IS\":false,\"operacion\":\"CVD\"},{\"claveOperacion\":false,\"descripcion\":\"Pre Registro Cuentas\",\"claveDos\":false,\"IS\":true,\"operacion\":\"PRC\"},{\"claveOperacion\":false,\"descripcion\":\"Compra Tiempo Aire\",\"claveDos\":false,\"IS\":true,\"operacion\":\"CTA\"},{\"claveOperacion\":false,\"descripcion\":\"Cancelar Operaciones Programadas\",\"claveDos\":false,\"IS\":false,\"operacion\":\"COP\"},{\"claveOperacion\":false,\"descripcion\":\"Compra/Venta de Acciones\",\"claveDos\":false,\"IS\":false,\"operacion\":\"OBA\"},{\"claveOperacion\":false,\"descripcion\":\"Traspaso de Efectivo\",\"claveDos\":false,\"IS\":false,\"operacion\":\"OBE\"},{\"claveOperacion\":false,\"descripcion\":\"Cancelaci�n de Ordenes de Capitales\",\"claveDos\":false,\"IS\":false,\"operacion\":\"OBC\"},{\"claveOperacion\":false,\"descripcion\":\"Compra/Venta de Fondos Comunes � Fondos de Deuda\",\"claveDos\":false,\"IS\":false,\"operacion\":\"OBF\"},{\"claveOperacion\":false,\"descripcion\":\"Inversi�n a plazo fijo\",\"claveDos\":false,\"IS\":false,\"operacion\":\"INV\"},{\"claveOperacion\":false,\"descripcion\":\"Compra/Venta de Fondos de Inversi�n\",\"claveDos\":false,\"IS\":false,\"operacion\":\"FIN\"},{\"claveOperacion\":false,\"descripcion\":\"Primera Compra de Fondos de Inversi�n\",\"claveDos\":false,\"IS\":true,\"operacion\":\"PFI\"},{\"claveOperacion\":false,\"descripcion\":\"Tarjeta de Cr�dito\",\"claveDos\":false,\"IS\":false,\"operacion\":\"TDC\"},{\"claveOperacion\":false,\"descripcion\":\"Pago de Servicios\",\"claveDos\":false,\"IS\":true,\"operacion\":\"CIE\"},{\"claveOperacion\":false,\"descripcion\":\"Re-impresi�n de comprobantes\",\"claveDos\":false,\"IS\":true,\"operacion\":\"RIC\"},{\"claveOperacion\":false,\"descripcion\":\"Seguridad - cambio de claves, correo y pregunta/respuesta secreta\",\"claveDos\":false,\"IS\":true,\"operacion\":\"SEG\"},{\"claveOperacion\":false,\"descripcion\":\"Cancelacion Operaciones Periodicas\",\"claveDos\":false,\"IS\":false,\"operacion\":\"OPP\"},{\"claveOperacion\":false,\"descripcion\":\"Aclaracion Alta Cuenta con o sin chequera\",\"claveDos\":false,\"IS\":false,\"operacion\":\"AAC\"},{\"claveOperacion\":false,\"descripcion\":\"Aclaracion Alta tarjeta de credito\",\"claveDos\":false,\"IS\":false,\"operacion\":\"AAT\"},{\"claveOperacion\":false,\"descripcion\":\"Cancelar aclaracion Tarjeta de credito\",\"claveDos\":false,\"IS\":false,\"operacion\":\"ACT\"},{\"claveOperacion\":false,\"descripcion\":\"Protecci�n de Cheques\",\"claveDos\":false,\"IS\":false,\"operacion\":\"PCH\"},{\"claveOperacion\":false,\"descripcion\":\"Consulta y Mantenimiento de Frecuentes\",\"claveDos\":false,\"IS\":false,\"operacion\":\"CMF\"},{\"claveOperacion\":false,\"descripcion\":\"Rendimiento Patrimonial y Prestamo Hipotecario\",\"claveDos\":false,\"IS\":false,\"operacion\":\"HIP\"},{\"claveOperacion\":false,\"descripcion\":\"Limites de Montos de Operacion\",\"claveDos\":false,\"IS\":true,\"operacion\":\"LMO\"},{\"claveOperacion\":false,\"descripcion\":\"Prestamos el Crediton\",\"claveDos\":false,\"IS\":true,\"operacion\":\"CRE\"},{\"claveOperacion\":false,\"descripcion\":\"Domiciliaciones Alta\",\"claveDos\":false,\"IS\":true,\"operacion\":\"DMA\"},{\"claveOperacion\":false,\"descripcion\":\"Domiciliaciones Baja\",\"claveDos\":false,\"IS\":true,\"operacion\":\"DMB\"},{\"claveOperacion\":false,\"descripcion\":\"Inversion Libre Patrimonial\",\"claveDos\":false,\"IS\":true,\"operacion\":\"ILP\"},{\"claveOperacion\":false,\"descripcion\":\"Efectivo movil realiza Operacion\",\"claveDos\":false,\"IS\":true,\"operacion\":\"EMO\"},{\"claveOperacion\":false,\"descripcion\":\"Efectivo movil realiza Cancelacion\",\"claveDos\":false,\"IS\":false,\"operacion\":\"EMC\"},{\"claveOperacion\":false,\"descripcion\":\"MiniSitio para Pagos GDF\",\"claveDos\":false,\"IS\":true,\"operacion\":\"GDF\"},{\"claveOperacion\":false,\"descripcion\":\"MiniSitio para Pagos SAT\",\"claveDos\":false,\"IS\":true,\"operacion\":\"SAT\"},{\"claveOperacion\":false,\"descripcion\":\"MiniSitio para Pago SAT Referenciado\",\"claveDos\":false,\"IS\":true,\"operacion\":\"PSR\"},{\"claveOperacion\":false,\"descripcion\":\"Cancelaci�n de Pago SAT Referenciado\",\"claveDos\":false,\"IS\":true,\"operacion\":\"CSR\"},{\"claveOperacion\":false,\"descripcion\":\"MiniSitio Para pago SAR\",\"claveDos\":false,\"IS\":false,\"operacion\":\"SAR\"},{\"claveOperacion\":false,\"descripcion\":\"MiniSitio para Pago de Cheque en Linea\",\"claveDos\":false,\"IS\":true,\"operacion\":\"CHL\"},{\"claveOperacion\":false,\"descripcion\":\"Garantia de Alertamiento Alta/Baja\",\"claveDos\":false,\"IS\":true,\"operacion\":\"GAB\"},{\"claveOperacion\":false,\"descripcion\":\"Vida Bancomer Redencion de Puntos\",\"claveDos\":false,\"IS\":false,\"operacion\":\"VBP\"},{\"claveOperacion\":false,\"descripcion\":\"Dinero Movil - Alta Pre-registro\",\"claveDos\":false,\"IS\":true,\"operacion\":\"DMR\"},{\"claveOperacion\":false,\"descripcion\":\"Pago de Honorarios - Efectuar Pago\",\"claveDos\":false,\"IS\":true,\"operacion\":\"PHP\"},{\"claveOperacion\":false,\"descripcion\":\"Eliminar Operaciones Rapidas\",\"claveDos\":false,\"IS\":true,\"operacion\":\"EOR\"},{\"claveOperacion\":false,\"descripcion\":\"Enrolamiento SPEI M�vil - Alta, Baja y Modificaci�n\",\"claveDos\":false,\"IS\":true,\"operacion\":\"ESM\"},{\"claveOperacion\":true,\"descripcion\":\"Cambia el estatus del lote\",\"claveDos\":false,\"IS\":true,\"operacion\":\"EGB\"},{\"claveOperacion\":false,\"descripcion\":\"Modifica los datos generales y operaciones de un lote\",\"claveDos\":false,\"IS\":true,\"operacion\":\"CGB\"},{\"claveOperacion\":false,\"descripcion\":\"Alta de lotes\",\"claveDos\":false,\"IS\":true,\"operacion\":\"AGB\"},{\"claveOperacion\":false,\"descripcion\":\"Agrega modifica o elimina registros de un lote\",\"claveDos\":false,\"IS\":true,\"operacion\":\"MGB\"},{\"claveOperacion\":true,\"descripcion\":\"Pago de Tarjeta comercial\",\"claveDos\":false,\"IS\":false,\"operacion\":\"PTC\"},{\"claveOperacion\":true,\"descripcion\":\"Disposicion de Tarjeta comercial\",\"claveDos\":false,\"IS\":false,\"operacion\":\"DTC\"}],\"pidePrioridad\":\"\",\"indOperacionesPeriodicas\":true,\"clienteMorosoTipoMensaje\":0,\"pideDescripcion\":\"\"},\"s_lit_idioma\":\"CAS\"}";
//	private static String TRAMA_POSICION_GLOBAL = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"solicitaInstrumentoSeguridad\":{\"posicionTASA_usr\":\"\",\"alias_usr\":\"LEONARDO\",\"tiseguridad_usr\":\"%s\",\"tipoMensajeTASA\":\"\",\"usuario_usr\":\"ADMINF\",\"digitoTASA_usr\":\"\",\"cliente_usr\":\"D0026035\",\"acceso_usr\":4152312171293621},\"s_tipo_firma\":0,\"s_lit_idioma\":\"CAS\"}";

	private static final boolean HAS_MXP_ACCOUNTS = true;
	private static final boolean HAS_USD_ACCOUNTS = true;
	private static final boolean HAS_CREDIT_CARDS = true;
	
	private static final String MXP_ACCOUNTS = "[{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000001\",\"saldo_disponible\":931686.44,\"divisa\":\"MXP\",\"alias\":\"CHEQUES\",\"ind_adicional\":\"no\",\"numero\":\"00740349001289232796\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":50000},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000002\",\"saldo_disponible\":757817.02,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740349002797036248\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000003\",\"saldo_disponible\":1067688.82,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740349002797043864\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000004\",\"saldo_disponible\":920512.24,\"divisa\":\"MXP\",\"alias\":\"PDF\",\"ind_adicional\":\"no\",\"numero\":\"00745417001134399544\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000005\",\"saldo_disponible\":113822.9,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00746362002900071048\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000006\",\"saldo_disponible\":135233915.22,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740010000178294828\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000007\",\"saldo_disponible\":68658.2,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740069000106834655\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000008\",\"saldo_disponible\":496838.94,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740357000102880008\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000009\",\"saldo_disponible\":990292817.07,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00743616000101448234\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000010\",\"saldo_disponible\":550330.46,\"divisa\":\"MXP\",\"alias\":\"CUENTA EJE\",\"ind_adicional\":\"no\",\"numero\":\"00743616000178527423\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000011\",\"saldo_disponible\":883637658.9,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00746362000178362440\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000012\",\"saldo_disponible\":1722171.8,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00741051002635628210\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000013\",\"saldo_disponible\":993048504.62,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00743616002700694533\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000014\",\"saldo_disponible\":1994774.68,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00743616002900018767\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000015\",\"saldo_disponible\":1989157.97,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00746362002900015156\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0}]";
	private static final String CREDIT_CARDS = "[{\"ind_mancomunada\":\"no\",\"saldofecha\":31994.95,\"id\":\"TCMXP0000001\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":0,\"numero\":4101810425430610,\"saldocorte\":15255.05,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":23141.07,\"id\":\"TCMXP0000002\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":1093.9,\"numero\":4101810586637417,\"saldocorte\":19277.31,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":-2678.98,\"id\":\"TCMXP0000003\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":150,\"numero\":4180900200001894,\"saldocorte\":433.02,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":-23733,\"id\":\"TCMXP0000004\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":537.5,\"numero\":4555000874916134,\"saldocorte\":7861.64,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":28946.15,\"id\":\"TCMXP0000005\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":2881.4,\"numero\":5224980106266168,\"saldocorte\":8581.15,\"tipo\":\"TC\"}]";
	private static final String USD_ACCOUNTS = "[{\"ind_mancomunada\":\"no\",\"id\":\"CHUSD0000001\",\"saldo_disponible\":209025.7,\"divisa\":\"USD\",\"alias\":\"\",\"ind_adicional\":\"no\",\"plaza\":\"MEXICO\",\"numero\":\"00740010000178611246\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHUSD0000002\",\"saldo_disponible\":1003614956.7,\"divisa\":\"USD\",\"alias\":\"0105009324\",\"ind_adicional\":\"no\",\"plaza\":\"MEXICO\",\"numero\":\"00743616000105009324\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CAUSD0000001\",\"saldo_disponible\":-54576.64,\"divisa\":\"USD\",\"alias\":\"\",\"ind_adicional\":\"no\",\"plaza\":\"HOUSTON\",\"numero\":\"00740001008000751116\",\"tipo\":\"CA\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CAUSD0000002\",\"saldo_disponible\":0,\"divisa\":\"USD\",\"alias\":\"\",\"ind_adicional\":\"no\",\"plaza\":\"HOUSTON\",\"numero\":\"00740001008000751132\",\"tipo\":\"CA\",\"saldo_salvobuencobro\":0}]";
	private static final String ACCOUNTS_JSON = "\"asuntos\":{\"lista_cuentas_mxp\":%s,\"lista_cuentas_usd\":%s,\"lista_tarjetascredito\":%s,\"lista_inversiones_usd\":null,\"lista_fondosinversion_mxp\":null,\"lista_cuentas_eur\":null,\"lista_tarjetaprepagada\":null,\"lista_inversiones_mxp\":null}";
	private static final String CURRENT_ACCOUNTS = String.format(ACCOUNTS_JSON, 
																 HAS_MXP_ACCOUNTS ? MXP_ACCOUNTS : "null",
																 HAS_USD_ACCOUNTS ? USD_ACCOUNTS : "null",
																 HAS_CREDIT_CARDS ? CREDIT_CARDS : "null");
	private static final KeyEvent KEYCODE_BACK = null;
	
	
    private HttpInvoker() {   	
    	sbcp = SharedBcomPreferences.getInstance();
    }
    
    public synchronized static HttpInvoker getInstance() {
        if (laInstancia == null) {
			laInstancia = new HttpInvoker();
		}
        
        return laInstancia;
    }
        
    public ServerResponse doNetWorkOperation(Server.ServerOperation operation, Hashtable<String, String> params) {
    	ServerResponse serverResponse = null;
    	
    	switch (operation) {
		case CONECTAR_WEBSEAL:
			serverResponse = conectarWebSeal(params);
			break;
			
		case LOGIN_ONE:
			serverResponse = signOnOne(params);
			break;
			
		case LOGIN_TWO:
			serverResponse = singOnToken(params);
			break;
			
		case SING_OFF:
			serverResponse = singOff(params);
			break;
			
		case CATALOGO_BANCOS:
			serverResponse = catalogoBancos(params);
			break;
			
		case REGLAS_DE_NEGOCIO:
			serverResponse = reglasDeNegocio(params);
			break;
			
		case POSICION_GLOBAL:
			serverResponse = posicionGlobal(params);
			break;
		case MOVIMIENTOS_CTAS_CHEQUES:
			serverResponse = movimientosCtasCheques(params);
			break;
		case MOVIMIENTOS_CTAS_USD:
			serverResponse = movimientosCtasUSD(params);
			break;
		case MOVIMIENTOS_TDC:
			serverResponse = movimientosTDC(params);
			break;
		case RECUPERA_PERIODOS:
			serverResponse = recuperaPeriodos(params);
			break;
		case CONSULTA_EDO_CUENTA:
			serverResponse = consultaEstadoDeCuenta(params);
			break;
		case RECUPERA_OPERACIONES:
			serverResponse = recuperaOperaciones(params);
			break;
		case APLICA_COMPRA_INVERSION:
			serverResponse = aplicaCompraInversion(params);
			break;
		case APLICA_VENTA_INVERSION:
			serverResponse = aplicaVentaInversion(params);
			break;
		case RECUPERA_LISTA_TITULOS:
			serverResponse = recuperaListaTitulos(params);
			break;
		case RECUPERA_TASAS_CONSULTA_INVERTIR:
			serverResponse = recuperaTasaInvertirConsultar(params);
			break;
		case REGISTRA_TRASPASO_MIS_CUENTAS:
			serverResponse = registraTraspasoMisCuentas(params);
			break;
		case PAGO_MINIMO_NO_INTERES:
			serverResponse = pagoMinimoNoInteres(params);
			break;
		case SOLICITA_COMISION:
			serverResponse = solicitaComision(params);
			break;			
		case RECUPERA_CUENTAS_BBVA_FRECUENTES_PREREGISTRADAS:
			serverResponse = recuperaListasFrecuentesPreregistradasBBVA(params);
			break;
		case CONSULTA_BENEFICIARIO_CTA_BBVA:
			serverResponse = consultaBeneficiarioCtaBBVA(params);
			break;
		case PREREGISTRAR_CUENTA_BBVA:
			serverResponse = preregistrarCuentaBBVA(params);
			break;
			
		case PREREGISTRAR_CUENTA_INTER:
			serverResponse = preregistrarCuentaInter(params);
			break;
			
		case CARGA_PREREGISTRO_CUENTA_BBVA:
			serverResponse = cargaPreregistroCuentaBBVA(params);
			break;
			
		case CARGA_PREREGISTRO_CUENTA_INTER:
			serverResponse = cargaPreregistroInterbancarias(params);
			break;
			
			
		case REALIZAR_TRASPASO_CUENTA_BBVA:
			serverResponse = realizarTraspasoCuentaBBVA(params);
			break;
			
		case SHOW_ALERT:
			serverResponse = mostrarAlertCancelarTraspaso(params);
			break;
			
		case PERMITIR_FRECUENTES:
			serverResponse = realizarPermitirFrecuentes(params);
			break;
			
			
		case ENVIO_EMAIL:
			serverResponse = envioEmail(params);
			break;
		case LISTAS_FRECUENTES_PREREGISTRADAS_INTERBANCARIAS:
			serverResponse = recuperaListasFrecuentesInterbancarias(params);
			break;
		case RECUPERA_FESTIVOS:
			serverResponse = recuperaFestivos(params);
			break;
		case TRASPASO_INTERBANCARIAS:
			serverResponse = traspasoInterbancarias3(params);
			break;
		case GET_SERVER_MODE:
			serverResponse = getServerMode();
			break;
			
		case CONSULTA_TIPO_SERVICIO:
			serverResponse = consultaTipoServicio(params);
			break;
		case WT_CONSULTA_TIPO_SERVICIO:
			serverResponse = consultaTipoServicio(params);
			break;
		case CONSULTA_CONTRATOS_PATRIMONIALES:
			serverResponse = consultaContratosPatrimoniales(params);
			break;
		case CONSULTA_DETALLE_INVERSION:
			serverResponse = consultaDetalleDeInversion(params);
			break;
		case CONSULTA_CAPITALES:
			serverResponse = consultaCapitales(params);
			break;
		case CANCELA_ORDEN:
			serverResponse = cancelaOrden(params);
			break;
		case DETALLE_ORDEN:
			serverResponse = detalleOrden(params);
			break;
		case ENVIO_CORREO_COMPRA_VENTA:
			serverResponse = envioCorreoCompraVenta(params);
			break;		//*********************************************************
		case REALIZAR_COMPRA_VENTA:
			serverResponse = realizaCompraVenta(params);
			break;
		case ENVIO_CORREO_CANCELACION:
			serverResponse = envioCorreoCancelacion(params);
			break;
		case LISTA_CUENTAS_EFECTIVO:
			serverResponse = listaCuentasEfectivo(params);
			break;
		case APLICA_TRASPASO_EFECTIVO:
			serverResponse = AplicaTraspasoEfectivo(params);
			break;
		case SIGN_OFF_WAS:
			serverResponse =  signOffWas();
			break;
		
		case SIGN_OFF_WEBSEAL:
			serverResponse = signOffWebseal();
			break;
		case INTERNET:
			serverResponse = internet(params);
			break;
		case ESTADO_DE_CUENTA:
			serverResponse = estadoDeCuenta(params);
			break;
		default:
			break;
		}
    	
    	return serverResponse;
    }

	public static DefaultHttpClient getHttpClient() {
		if(httpclient == null){
			if (ServerModes.TEST == Server.serverMode || ServerModes.PRODUCCION == Server.serverMode) {
				try {
			        KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
			        trustStore.load(null, null);

			        SSLSocketFactory sf = new MySSLSocketFactory(trustStore);
			        sf.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);

			        HttpParams params = new BasicHttpParams();
			        HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
			        HttpProtocolParams.setContentCharset(params, HTTP.UTF_8);

			        SchemeRegistry registry = new SchemeRegistry();
			        registry.register(new Scheme("http", PlainSocketFactory.getSocketFactory(), 80));
			        registry.register(new Scheme("https", sf, 443));

			        ClientConnectionManager ccm = new ThreadSafeClientConnManager(params, registry);

			        httpclient =  new DefaultHttpClient(ccm, params);
			    } catch (Exception e) {
			    	Log.w(Server.TAG, "Error al crear getHttpclient");
			    	e.printStackTrace();
			    }			
			}else{
				httpclient = new DefaultHttpClient();
			}
		}
		
		return httpclient;
	}
    
    private void logURl(HttpPost httppost, List<NameValuePair> nvpso ){
		String temp = httppost.getURI().toString() + "?";
		
		if(nvpso != null){
			for (int i = 0; i < nvpso.size(); i++) {
				NameValuePair nameValuePair = nvpso.get(i);
				temp += (nameValuePair.getName() + "=" + nameValuePair.getValue() + (i< nvpso.size() -1 ? "&" : "")  );
			}
		}
		Log.w(Server.TAG, "Requested url_1: " + temp);
	}
    
    private ServerResponse conectarWebSeal(Hashtable<String, String> params){
    	String usr = params.get("tarjeta");
    	String password = params.get("pwd");
    	
    	if(Server.serverMode == Server.ServerModes.TEST) {
    	//	password = "password00";
    	}
    	
    	ServerResponse respuesta = new ServerResponse();
    	
    	if ( Server.WEBSEAL_ACTIVO ) {
    		DefaultHttpClient httpclient = getHttpClient();
    		String str = null;
    		
    		try {
    			this.conectaBalanceador();
    			String urlBalanceador = Session.getUrlWebseal();
    			HttpPost httppost = new HttpPost(urlBalanceador + Server.BURL_WEBSEAL);
    			String usuarioInvoca = Server.USUARIO_INVOCAWEBSEAL;
    		
    			List<NameValuePair> nvps = new ArrayList<NameValuePair>();
    			nvps.add(new BasicNameValuePair("username", usr+ usuarioInvoca));
    			nvps.add(new BasicNameValuePair("password", password));
    			nvps.add(new BasicNameValuePair("login-form-type", "pwd"));
    			httppost.setEntity(new UrlEncodedFormEntity(nvps, HTTP.UTF_8));
    			
    			logURl(httppost, nvps);
    			HttpResponse response = httpclient.execute(httppost);
    			int codigo_http = response.getStatusLine().getStatusCode();
				System.out.print("Mario_codigo:  "+codigo_http);
				if (codigo_http >= 400){
					respuesta.setEstado(EstadoRespuesta.Fail);
					respuesta.setCodigoError( "HTTP:" + codigo_http );
					respuesta.setMensaje( response.getStatusLine().getReasonPhrase());
					respuesta.setJsonResultante(Utilerias.crearJsonError( String.valueOf(codigo_http) , respuesta.getMensaje()));
					peticionesFallidas++;
				}else{
					peticionesFallidas = 0;
					HttpEntity entity = response.getEntity();
	    			List<Cookie> cookies = httpclient.getCookieStore().getCookies();
	    			
	    			if (cookies.isEmpty()) {
						Log.d(Server.TAG, "No cookies");
					} else {
	    				sbcp.setPreferencia(Server.COOKIES_COUNT_PROPERTY_NAME, String.valueOf(cookies.size()));
	    				for (int i = 0; i < cookies.size(); i++) {
	    					Log.d(Server.TAG, "cookie: " + cookies.get(i).toString() );
	    					Session.setCookiePSesionId(cookies.get(i).getValue().toString());
	    					
	    					org.apache.http.cookie.Cookie cc = cookies.get(i);
	    					
	    					sbcp.setPreferencia(Server.COOKIE_NAME_PROPERTY_PREFIX + i , cc.getName() );
	    					sbcp.setPreferencia(Server.COOKIE_VALUE_PROPERTY_PREFIX + i , cc.getValue() );
	    					sbcp.setPreferencia(Server.COOKIE_VERSION_PROPERTY_PREFIX + i , String.valueOf(cc.getVersion()) );
	    					sbcp.setPreferencia(Server.COOKIE_DOMAIN_PROPERTY_PREFIX + i , cc.getDomain() );
	    					sbcp.setPreferencia(Server.COOKIE_PATH_PROPERTY_PREFIX + i , cc.getPath() );
	    				}
	    				Log.i(Server.TAG, "Galletas guardadas:"+ cookies.size());
	    			}
	    			
	    			str = Utilerias.inputStreamToString(entity.getContent()).toString();
	    			Log.i(Server.TAG ,"Mensaje http invoker obtenido: " + str);

	    			if (str.contains("success")){
	    				respuesta.setEstado(Server.EstadoRespuesta.Ok);
	    				respuesta.setMensaje("Success"); 
	    			}else if(str.contains("Temporalmente movido")){
	    				respuesta.setEstado(Server.EstadoRespuesta.Ok);
	    			}else if(str.contains("BA clients must exit their browser to properly terminate their session.") ){
	    				respuesta.setEstado(Server.EstadoRespuesta.Ok);
	    			}else if(str.contains("PKMS Administration: User Log Out") ){
	    				respuesta.setEstado(Server.EstadoRespuesta.Ok);
	    			}else if(str.contains("has logged out")){
	    				respuesta.setEstado(Server.EstadoRespuesta.Ok);
	    			}else if(str.contains("{ \"respuesta\":{ \"finDeSesion\":\"true\" }}") ){
	    				respuesta.setEstado(Server.EstadoRespuesta.Ok);
	    			}else if ( str.contains("Authentication mechanism is not available") ) {
	    				//respuesta.setMensaje("Por el momento el servicio no está disponible");
	    				BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.authetication_mechanism));
	    				respuesta.setEstado(Server.EstadoRespuesta.Fail);
	    			} else if( str.contains("The user's account has expired.") ){
	    			
	    				//respuesta.setMensaje("Por su seguridad, su cuenta se ha bloqueado.");
	    				BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.has_expired));
	    				respuesta.setEstado( Server.EstadoRespuesta.Fail);
	    			} else if( str.contains("This account has been temporarily locked out due to too many failed login attempts") ){
	    				
	    				//respuesta.setMensaje(" Apreciable cliente: por seguridad su cuenta ha sido bloqueada");
	    				BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.this_account_has_been_temporarily_locked));
	    				respuesta.setEstado( Server.EstadoRespuesta.Fail );
	    			} else if( str.contains("Authentication failed. You have used an invalid user name, password or client certificate")){
	    				
	    				BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.authetication_failed));
	    				//respuesta.setMensaje("Apreciable cliente: es necesario introducir la clave de acceso o el número de tarjeta correctamente");
	    				respuesta.setEstado( Server.EstadoRespuesta.Fail );
	    			}else if(str.toString() == ""){
	    				BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.conexion));
	    				respuesta.setEstado(Server.EstadoRespuesta.Fail);
	    			}else if(str.contains("Index BBVA Net")){
		    				BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.authetication_mechanism));
		    				respuesta.setEstado(Server.EstadoRespuesta.Fail);
	    			}else{
	    				
	    				BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.authetication_mechanism));
	    				respuesta.setEstado(Server.EstadoRespuesta.Fail);
	    			}

	    			entity.consumeContent();
				}
    		} catch (Exception ex) {
    			Log.e(Server.TAG, "excepcion conectawebSeal" + ex);
    			BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.internet_error_message));
    			respuesta.setEstado(Server.EstadoRespuesta.Fail);
    			return respuesta;
    			/*if(ex.getMessage().contains("clave")){
    				respuesta.setEstado( Server.EstadoRespuesta.Fail );
    				respuesta.setMensaje("clave");
    				
    			} else{
    			
    				respuesta.setEstado( Server.EstadoRespuesta.Fail );
    				respuesta.setMensaje("conexion");
    			}*/
    			
    		}
		} else {
			respuesta.setEstado(EstadoRespuesta.Ok);
			
			Session.setUrlWAS("https://148.244.45.93/mexiconetna2/mexiconetni/");
	    	Session.setUrlWebseal("https://148.244.45.93/");
	    			    	
	    	sbcp.setPreferencia(Server.WAS, Session.getUrlWAS());
	    	sbcp.setPreferencia(Server.WEBSEAL, Session.getUrlWebseal());
		}
		
		return respuesta;
    }
    
    private void conectaBalanceador() {
    	switch (Server.serverMode) {
		case SIMULACION:
			Session.setUrlWAS("https://www23.bbvanet.com.mx/mexiconet3/mexiconet3/");
	    	Session.setUrlWebseal("https://www23.bbvanet.com.mx/");
	    	
	    	sbcp.setPreferencia(Server.WAS, Session.getUrlWAS());
	    	sbcp.setPreferencia(Server.WEBSEAL, Session.getUrlWebseal());
			break;
		case TEST:
			//Session.setUrlWAS("https://test.bbvanet.com.mx/mexiconet2/mexiconet2/");
    		//Session.setUrlWebseal("https://test.bbvanet.com.mx/");
			Session.setUrlWAS("https://148.244.45.93/mexiconetna2/mexiconetni/");
    		Session.setUrlWebseal("https://148.244.45.93/");
	    			    	
	    	sbcp.setPreferencia(Server.WAS, Session.getUrlWAS());
	    	sbcp.setPreferencia(Server.WEBSEAL, Session.getUrlWebseal());
			break;
		case PRODUCCION:
			try {
				DefaultHttpClient client = getHttpClient();
	        	if(client == null){
	        		Log.d( Server.TAG, "Es nullo el clienthttp");
	        	}
		    	HttpParams params = client.getParams();
		    	HttpClientParams.setRedirecting(params, false);
		    	HttpGet method = new HttpGet( Server.URL_BALANCEADORPROD);
		    	Log.w(Server.TAG, "Url del balanceador: " + Server.URL_BALANCEADORPROD );
		    	HttpResponse resp = client.execute(method);
		    	int codigo_http = resp.getStatusLine().getStatusCode();
				System.out.print("codigo_http: "+codigo_http);
				if (codigo_http != 200){
					Log.w(Server.TAG, "Hubo un error en el balanceador");
				}else{
					//String location = resp.getLastHeader("Location").getValue();
					String location="https://a1.bbvanet.com.mx/mexiconetni/mexiconetni/";
			    	System.out.println("LOCATION  "+ location);
			    	
			    	if(checarURLBalanceador( location ) ){
			    		Log.d(Server.TAG, "header location: " + location);
			    		Session.setUrlWAS(location);
				    	sbcp.setPreferencia("WAS", location);

			    	      int indice = location.indexOf("mx/");
			    		//Session.setUrlWebseal(location.substring(0,indice+3));
			    	      
			    	      Log.d(Server.TAG, "indice: " + indice);
				        
				        //String original = location.substring(0,indice+3);
				        
				        String original="https://a1.bbvanet.com.mx/";
				        Log.d(Server.TAG, "extracto: " + original);
				        Session.setUrlWebseal(original);
				        sbcp.setPreferencia("WEBSEAL", original );
			    	}	
				}
			} catch (Exception ex) {
				Log.e(Server.TAG, "Exeption en conectaBalanceador. "  +ex.getMessage());
			}
			break;

		default:
			break;
		}
	}
	
	private boolean checarURLBalanceador(String url){
		boolean resp = false;
		String []aux = url.split("\\."); 
		
		if(aux.length > 3){
			if(aux[1].startsWith("bbvanet")) {
				resp =  true;
			}
		}
		Log.d(Server.TAG, "checarURLBalanceador: " + resp);
		return resp;
	}

	private ServerResponse signOnOne(Hashtable<String, String> params){
		ServerResponse respuesta = new ServerResponse();	

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {
				String preformatedResponse = null;
				// Usuario sin instrumento se seguridad.
				//preformatedResponse = "{\"s_versionApl\": 1,\"s_Colectivo\": \"str\",\"s_lit_idioma2\": \"Es\",\"s_tipo_firma\": 0,\"posicionGlobal\": {\"acceso_usr\": 4152312171293621,\"hora_sesionAnterior\": \"12:07\",\"indicador_fondosinversion\": 0,\"indCreditosHipotecarios\": false,\"email_usr\": \" \",\"esq_admon_usr\": \"T\",\"indMsjInformativo\": 3,\"clienteMorosoAliasCuentaAdeudo\": \"\",\"clienteMorosoMontoAdeudoComision\": 0,\"usuario_usr\": \"ADMINF\",\"nivel_aut_usr\": 4,\"indOperacionesRapidas\": false,\"clienteMorosoMontoAdeudoIva\": 0,\"tiseguridad_usr\": \"%s\",\"clienteMorosoCuentaAdeudo\": \"\",\"alias_usr\": \"LEONARDO\",\"esquema_seg_usr\": 0,\"indMostrarEncuesta\": true,\"cliente_usr\": \"D0026035\",\"indicadorPromocion\": \" \",\"indCreditosAlConsumo\": false,\"indicador_inversiones_usd\": 0,\"indMMDTokenAcceso\": false,\"pideFolioLDA\": \"\",\"id_operacion\": 40045,\"func_max_usr\": 9,\"tipoCampania\": \"\",\"fecha_sesionAnterior\": \"15/07/2014\",\"perfil_usr\": \"IF05\",\"clienteMorosoMontoAdeudoTotal\": 0,\"nombre_usr\": \"LOMELI SERRANO LEONARDO\",\"asuntos\": {\"lista_inversiones_usd\": null,\"lista_fondosinversion_mxp\": null,\"lista_cuentas_mxp\": [{\"ind_mancomunada\": \"no\",\"id\": \"CHMXP0000001\",\"saldo_disponible\": 4999999762297.00,\"divisa\": \"MXP\",\"alias\": \"\",\"ind_adicional\": \"no\",\"numero\": \"00746362000178396167\",\"tipo\": \"CH\",\"saldo_salvobuencobro\": 0.00}],\"lista_tarjetascredito\": null,\"lista_cuentas_eur\": null,\"lista_tarjetaprepagada\": null,\"lista_cuentas_usd\": null,\"lista_inversiones_mxp\": null},\"clienteMorosoEstado\": \"A1\",\"listaEsquemas\": [{\"claveOperacion\": false,\"descripcion\": \"Consulta Estados de Cuenta PDF\",\"claveDos\": false,\"IS\": true,\"operacion\": \"CEC\"},{\"claveOperacion\": false,\"descripcion\": \"Inhibicion Estados de Cuenta\",\"claveDos\": false,\"IS\": false,\"operacion\": \"IEC\"},{\"claveOperacion\": false,\"descripcion\": \"Traspaso Cuenta propias\",\"claveDos\": false,\"IS\": false,\"operacion\": \"TCP\"},{\"claveOperacion\": false,\"descripcion\": \"Traspaso Otros Bancos\",\"claveDos\": false,\"IS\": true,\"operacion\": \"TOB\"},{\"claveOperacion\": false,\"descripcion\": \"Traspaso Terceros Bancomer\",\"claveDos\": false,\"IS\": true,\"operacion\": \"TTB\"},{\"claveOperacion\": false,\"descripcion\": \"Compra Venta Divisas\",\"claveDos\": false,\"IS\": false,\"operacion\": \"CVD\"},{\"claveOperacion\": false,\"descripcion\": \"Pre Registro Cuentas\",\"claveDos\": false,\"IS\": true,\"operacion\": \"PRC\"},{\"claveOperacion\": false,\"descripcion\": \"Compra Tiempo Aire\",\"claveDos\": false,\"IS\": true,\"operacion\": \"CTA\"},{\"claveOperacion\": false,\"descripcion\": \"Cancelar Operaciones Programadas\",\"claveDos\": false,\"IS\": false,\"operacion\": \"COP\"},{\"claveOperacion\": false,\"descripcion\": \"Compra/Venta de Acciones\",\"claveDos\": false,\"IS\": false,\"operacion\": \"OBA\"},{\"claveOperacion\": false,\"descripcion\": \"Traspaso de Efectivo\",\"claveDos\": false,\"IS\": false,\"operacion\": \"OBE\"},{\"claveOperacion\": false,\"descripcion\": \"Cancelaci�n de Ordenes de Capitales\",\"claveDos\": false,\"IS\": false,\"operacion\": \"OBC\"},{\"claveOperacion\": false,\"descripcion\": \"Compra/Venta de Fondos Comunes � Fondos de Deuda\",\"claveDos\": false,\"IS\": false,\"operacion\": \"OBF\"},{\"claveOperacion\": false,\"descripcion\": \"Inversi�n a plazo fijo\",\"claveDos\": false,\"IS\": false,\"operacion\": \"INV\"},{\"claveOperacion\": false,\"descripcion\": \"Compra/Venta de Fondos de Inversi�n\",\"claveDos\": false,\"IS\": false,\"operacion\": \"FIN\"},{\"claveOperacion\": false,\"descripcion\": \"Primera Compra de Fondos de Inversi�n\",\"claveDos\": false,\"IS\": true,\"operacion\": \"PFI\"},{\"claveOperacion\": false,\"descripcion\": \"Tarjeta de Cr�dito\",\"claveDos\": false,\"IS\": false,\"operacion\": \"TDC\"},{\"claveOperacion\": false,\"descripcion\": \"Pago de Servicios\",\"claveDos\": false,\"IS\": true,\"operacion\": \"CIE\"},{\"claveOperacion\": false,\"descripcion\": \"Re-impresi�n de comprobantes\",\"claveDos\": false,\"IS\": true,\"operacion\": \"RIC\"},{\"claveOperacion\": false,\"descripcion\": \"Seguridad - cambio de claves, correo y pregunta/respuesta secreta\",\"claveDos\": false,\"IS\": true,\"operacion\": \"SEG\"},{\"claveOperacion\": false,\"descripcion\": \"Cancelacion Operaciones Periodicas\",\"claveDos\": false,\"IS\": false,\"operacion\": \"OPP\"},{\"claveOperacion\": false,\"descripcion\": \"Aclaracion Alta Cuenta con o sin chequera\",\"claveDos\": false,\"IS\": false,\"operacion\": \"AAC\"},{\"claveOperacion\": false,\"descripcion\": \"Aclaracion Alta tarjeta de credito\",\"claveDos\": false,\"IS\": false,\"operacion\": \"AAT\"},{\"claveOperacion\": false,\"descripcion\": \"Cancelar aclaracion Tarjeta de credito\",\"claveDos\": false,\"IS\": false,\"operacion\": \"ACT\"},{\"claveOperacion\": false,\"descripcion\": \"Protecci�n de Cheques\",\"claveDos\": false,\"IS\": false,\"operacion\": \"PCH\"},{\"claveOperacion\": false,\"descripcion\": \"Consulta y Mantenimiento de Frecuentes\",\"claveDos\": false,\"IS\": false,\"operacion\": \"CMF\"},{\"claveOperacion\": false,\"descripcion\": \"Rendimiento Patrimonial y Prestamo Hipotecario\",\"claveDos\": false,\"IS\": false,\"operacion\": \"HIP\"},{\"claveOperacion\": false,\"descripcion\": \"Limites de Montos de Operacion\",\"claveDos\": false,\"IS\": true,\"operacion\": \"LMO\"},{\"claveOperacion\": false,\"descripcion\": \"Prestamos el Crediton\",\"claveDos\": false,\"IS\": true,\"operacion\": \"CRE\"},{\"claveOperacion\": false,\"descripcion\": \"Domiciliaciones Alta\",\"claveDos\": false,\"IS\": true,\"operacion\": \"DMA\"},{\"claveOperacion\": false,\"descripcion\": \"Domiciliaciones Baja\",\"claveDos\": false,\"IS\": true,\"operacion\": \"DMB\"},{\"claveOperacion\": false,\"descripcion\": \"Inversion Libre Patrimonial\",\"claveDos\": false,\"IS\": true,\"operacion\": \"ILP\"},{\"claveOperacion\": false,\"descripcion\": \"Efectivo movil realiza Operacion\",\"claveDos\": false,\"IS\": true,\"operacion\": \"EMO\"},{\"claveOperacion\": false,\"descripcion\": \"Efectivo movil realiza Cancelacion\",\"claveDos\": false,\"IS\": false,\"operacion\": \"EMC\"},{\"claveOperacion\": false,\"descripcion\": \"MiniSitio para Pagos GDF\",\"claveDos\": false,\"IS\": true,\"operacion\": \"GDF\"},{\"claveOperacion\": false,\"descripcion\": \"MiniSitio para Pagos SAT\",\"claveDos\": false,\"IS\": true,\"operacion\": \"SAT\"},{\"claveOperacion\": false,\"descripcion\": \"MiniSitio para Pago SAT Referenciado\",\"claveDos\": false,\"IS\": true,\"operacion\": \"PSR\"},{\"claveOperacion\": false,\"descripcion\": \"Cancelaci�n de Pago SAT Referenciado\",\"claveDos\": false,\"IS\": true,\"operacion\": \"CSR\"},{\"claveOperacion\": false,\"descripcion\": \"MiniSitio Para pago SAR\",\"claveDos\": false,\"IS\": false,\"operacion\": \"SAR\"},{\"claveOperacion\": false,\"descripcion\": \"MiniSitio para Pago de Cheque en Linea\",\"claveDos\": false,\"IS\": true,\"operacion\": \"CHL\"},{\"claveOperacion\": false,\"descripcion\": \"Garantia de Alertamiento Alta/Baja\",\"claveDos\": false,\"IS\": true,\"operacion\": \"GAB\"},{\"claveOperacion\": false,\"descripcion\": \"Vida Bancomer Redencion de Puntos\",\"claveDos\": false,\"IS\": false,\"operacion\": \"VBP\"},{\"claveOperacion\": false,\"descripcion\": \"Dinero Movil - Alta Pre-registro\",\"claveDos\": false,\"IS\": true,\"operacion\": \"DMR\"},{\"claveOperacion\": false,\"descripcion\": \"Pago de Honorarios - Efectuar Pago\",\"claveDos\": false,\"IS\": true,\"operacion\": \"PHP\"},{\"claveOperacion\": false,\"descripcion\": \"Eliminar Operaciones Rapidas\",\"claveDos\": false,\"IS\": true,\"operacion\": \"EOR\"},{\"claveOperacion\": false,\"descripcion\": \"Enrolamiento SPEI M�vil - Alta, Baja y Modificaci�n\",\"claveDos\": false,\"IS\": true,\"operacion\": \"ESM\"},{\"claveOperacion\": true,\"descripcion\": \"Cambia el estatus del lote\",\"claveDos\": false,\"IS\": true,\"operacion\": \"EGB\"},{\"claveOperacion\": false,\"descripcion\": \"Modifica los datos generales y operaciones de un lote\",\"claveDos\": false,\"IS\": true,\"operacion\": \"CGB\"},{\"claveOperacion\": false,\"descripcion\": \"Alta de lotes\",\"claveDos\": false,\"IS\": true,\"operacion\": \"AGB\"},{\"claveOperacion\": false,\"descripcion\": \"Agrega modifica o elimina registros de un lote\",\"claveDos\": false,\"IS\": true,\"operacion\": \"MGB\"},{\"claveOperacion\": true,\"descripcion\": \"Pago de Tarjeta comercial\",\"claveDos\": false,\"IS\": false,\"operacion\": \"PTC\"},{\"claveOperacion\": true,\"descripcion\": \"Disposicion de Tarjeta comercial\",\"claveDos\": false,\"IS\": false,\"operacion\": \"DTC\"}],\"pidePrioridad\": \"\",\"indOperacionesPeriodicas\": true,\"clienteMorosoTipoMensaje\": 0,\"pideDescripcion\": \"\"},\"s_lit_idioma\": \"CAS\"}";
				// Usuario con instrumento de seguridad.
				preformatedResponse = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"solicitaInstrumentoSeguridad\":{\"posicionTASA_usr\":\"\",\"alias_usr\":\"LEONARDO\",\"tiseguridad_usr\":\"%s\",\"tipoMensajeTASA\":\"\",\"usuario_usr\":\"ADMINF\",\"digitoTASA_usr\":\"\",\"cliente_usr\":\"D0026035\",\"acceso_usr\":4152312171293621},\"s_tipo_firma\":0,\"s_lit_idioma\":\"CAS\"}";
				
				String resp =  String.format(preformatedResponse, instrumentoDeSeguridad.getCodigoInstrumento());

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
			} else {
			    HttpPost httpPost = initPostRequest(Server.BURL_SIGNON);
			   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("username", params.get("username")));
				nvpso.add(new BasicNameValuePair("password", params.get("password")));
				nvpso.add(new BasicNameValuePair("login-form-type", params.get("login-form-type")));
				nvpso.add(new BasicNameValuePair("recepcionJSON", params.get("recepcionJSON")));
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);				
				/***INICIO JQH***
				verifyServerResponse(respuesta, httpPost);
				

				/***********/
				HttpResponse response = httpclient.execute(httpPost);
				int codigo_http = response.getStatusLine().getStatusCode();

				if (codigo_http >= 400){
					respuesta.setEstado(EstadoRespuesta.Fail);
					respuesta.setCodigoError( "HTTP:" + codigo_http );
					respuesta.setMensaje( response.getStatusLine().getReasonPhrase());
					respuesta.setJsonResultante(Utilerias.crearJsonError( String.valueOf(codigo_http) , respuesta.getMensaje()));
					peticionesFallidas++;
				}else{
					peticionesFallidas = 0;
					HttpEntity entity = response.getEntity();
					List<Cookie> cookies = httpclient.getCookieStore().getCookies();

					if (cookies.isEmpty()) {
						Log.d(Server.TAG, "No cookies");
					} else {
						sbcp.setPreferencia(Server.COOKIES_COUNT_PROPERTY_NAME2, String.valueOf(cookies.size()));

						for (int i = 0; i < cookies.size(); i++) {
							Log.d(Server.TAG, "cookie: " + cookies.get(i).toString() );
							Session.setCookieJSesionId(cookies.get(i).getValue().toString());

							org.apache.http.cookie.Cookie cc = cookies.get(i);

							sbcp.setPreferencia(Server.COOKIE_NAME2_PROPERTY_PREFIX + i , cc.getName() );
							sbcp.setPreferencia(Server.COOKIE_VALUE2_PROPERTY_PREFIX + i , cc.getValue() );
							sbcp.setPreferencia(Server.COOKIE_VERSION2_PROPERTY_PREFIX + i , String.valueOf(cc.getVersion()) );
							sbcp.setPreferencia(Server.COOKIE_DOMAIN2_PROPERTY_PREFIX + i , cc.getDomain() );
							sbcp.setPreferencia(Server.COOKIE_PATH2_PROPERTY_PREFIX + i , cc.getPath() );
						}
					}
					InputStream isTAS = entity.getContent();
					respuesta.setJsonResultante(Utilerias.convertStreamToString(isTAS));
					entity.consumeContent();

					respuesta = validarRespuesta(respuesta);
				}
				/****FIN JQH******/
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.w(Server.TAG, "error httpinvoker: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		if(Server.EstadoRespuesta.Ok == respuesta.getEstado()) {
			Session.getInstance().guardaValores(PersistentJsonFile.FILE_SIGN_ON, respuesta.getJsonResultante());
		}
		
		return respuesta;
	}

	private ServerResponse singOnToken(Hashtable<String, String> params){
		ServerResponse respuesta = new ServerResponse();
		
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {//Respuesta Simulada
				//String resp = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"posicionGlobal\":{\"acceso_usr\":4152312171293605,\"hora_sesionAnterior\":\"18:53\",\"indicador_fondosinversion\":1,\"indCreditosHipotecarios\":true,\"email_usr\":\"luis4@mail.com\",\"esq_admon_usr\":\"T\",\"indMsjInformativo\":3,\"clienteMorosoAliasCuentaAdeudo\":\"\",\"clienteMorosoMontoAdeudoComision\":0,\"usuario_usr\":\"ADMINF\",\"nivel_aut_usr\":4,\"indOperacionesRapidas\":true,\"clienteMorosoMontoAdeudoIva\":0,\"tiseguridad_usr\":\"T1\",\"clienteMorosoCuentaAdeudo\":\"\",\"alias_usr\":\"BEATA\",\"esquema_seg_usr\":0,\"indMostrarEncuesta\":false,\"cliente_usr\":\"D0023132\",\"indicadorPromocion\":\"131122L087AO\",\"indCreditosAlConsumo\":true,\"indicador_inversiones_usd\":1,\"indMMDTokenAcceso\":false,\"pideFolioLDA\":\"\",\"id_operacion\":60177,\"func_max_usr\":9,\"tipoCampania\":\"\",\"fecha_sesionAnterior\":\"15/07/2014\",\"perfil_usr\":\"IF03\",\"clienteMorosoMontoAdeudoTotal\":0,\"nombre_usr\":\"KOZUT  BEATA\",\"asuntos\":{\"lista_inversiones_usd\":[{\"saldo\":25000,\"numero\":\"00740001008000751132\",\"ind_mancomunada\":\"no\",\"ind_adicional\":\"no\",\"tipo\":\"CA\",\"alias\":\"\",\"plaza\":\"HOUSTON\",\"id\":\"CAUSD0000001\"}],\"lista_fondosinversion_mxp\":[{\"codigo_fondo\":2012,\"tipo\":\"\",\"num_contrato\":\"00740010002092397641\",\"numero\":\"00740010002092397641\",\"codigo_operacion_venta2\":\"RT02\",\"codigo_operacion_venta1\":\"RF02\",\"ind_mancomunada\":\"no\",\"cuenta_asociada\":\"00740010110178294828\",\"titulos_no_disponibles\":0,\"descripcion_codigo_operacion_venta2\":\"VENTA TOTAL 72 HRS\",\"codigo_operacion_compra\":\"SE02\",\"descripcion_codigo_operacion_venta1\":\"VENTA PARCIAL 72 HRS\",\"precio_pactado\":578.271989,\"descripcion_fondo\":\"BBVAUSA\",\"valor_financiero\":64188.19,\"alias\":\"00740010002092397641\",\"descripcion_codigo_operacion_compra\":\"COMPRA 72 HORAS\",\"numero_prospecto\":\"      735\",\"id\":\"SIMXP0000001\",\"serie\":\"B\",\"divisa\":\"\",\"saldo\":\"\",\"total_titulos\":111,\"cupon\":0,\"ind_adicional\":\"no\"},{\"codigo_fondo\":2193,\"tipo\":\"\",\"num_contrato\":\"00740010142092397641\",\"numero\":\"00740010142092397641\",\"codigo_operacion_venta2\":\"RT01\",\"codigo_operacion_venta1\":\"RF01\",\"ind_mancomunada\":\"no\",\"cuenta_asociada\":\"00740010110178294828\",\"titulos_no_disponibles\":0,\"descripcion_codigo_operacion_venta2\":\"VENTA TOTAL (48 HORAS)\",\"codigo_operacion_compra\":\"SE01\",\"descripcion_codigo_operacion_venta1\":\"VENTA PARCIAL (48 HORAS)\",\"precio_pactado\":560.969855,\"descripcion_fondo\":\"DCP-1\",\"valor_financiero\":132949.85,\"alias\":\"00740010142092397641\",\"descripcion_codigo_operacion_compra\":\"COMPRA (48 HORAS)\",\"numero_prospecto\":\"       10\",\"id\":\"SIMXP0000002\",\"serie\":\"PV\",\"divisa\":\"\",\"saldo\":\"\",\"total_titulos\":237,\"cupon\":0,\"ind_adicional\":\"no\"},{\"codigo_fondo\":2199,\"tipo\":\"\",\"num_contrato\":\"00740010002092397641\",\"numero\":\"00740010002092397641\",\"codigo_operacion_venta2\":\"RTA0\",\"codigo_operacion_venta1\":\"RFA0\",\"ind_mancomunada\":\"no\",\"cuenta_asociada\":\"00740010110178294828\",\"titulos_no_disponibles\":0,\"descripcion_codigo_operacion_venta2\":\"PREAVISO TOTAL 24 HORAS\",\"codigo_operacion_compra\":\"SEOL\",\"descripcion_codigo_operacion_venta1\":\"PREAVISO 24 HORAS\",\"precio_pactado\":550.177857,\"descripcion_fondo\":\"B+EDUCA\",\"valor_financiero\":0,\"alias\":\"00740010002092397641\",\"descripcion_codigo_operacion_compra\":\"COMPRA EN LINEA\",\"numero_prospecto\":\"       63\",\"id\":\"SIMXP0000003\",\"serie\":\"M\",\"divisa\":\"\",\"saldo\":\"\",\"total_titulos\":0,\"cupon\":0,\"ind_adicional\":\"no\"},{\"codigo_fondo\":2012,\"tipo\":\"\",\"num_contrato\":\"00740010002092397668\",\"numero\":\"00740010002092397668\",\"codigo_operacion_venta2\":\"RT02\",\"codigo_operacion_venta1\":\"RF02\",\"ind_mancomunada\":\"no\",\"cuenta_asociada\":\"00740010110178294828\",\"titulos_no_disponibles\":0,\"descripcion_codigo_operacion_venta2\":\"VENTA TOTAL 72 HRS\",\"codigo_operacion_compra\":\"SE02\",\"descripcion_codigo_operacion_venta1\":\"VENTA PARCIAL 72 HRS\",\"precio_pactado\":578.271989,\"descripcion_fondo\":\"BBVAUSA\",\"valor_financiero\":179264.31,\"alias\":\"00740010002092397668\",\"descripcion_codigo_operacion_compra\":\"COMPRA 72 HORAS\",\"numero_prospecto\":\"      736\",\"id\":\"SIMXP0000004\",\"serie\":\"B\",\"divisa\":\"\",\"saldo\":\"\",\"total_titulos\":310,\"cupon\":0,\"ind_adicional\":\"no\"},{\"codigo_fondo\":2193,\"tipo\":\"\",\"num_contrato\":\"00740010102092397668\",\"numero\":\"00740010102092397668\",\"codigo_operacion_venta2\":\"RT01\",\"codigo_operacion_venta1\":\"RF01\",\"ind_mancomunada\":\"no\",\"cuenta_asociada\":\"00740010110178294828\",\"titulos_no_disponibles\":0,\"descripcion_codigo_operacion_venta2\":\"VENTA TOTAL (48 HORAS)\",\"codigo_operacion_compra\":\"SE01\",\"descripcion_codigo_operacion_venta1\":\"VENTA PARCIAL (48 HORAS)\",\"precio_pactado\":560.969855,\"descripcion_fondo\":\"DCP-1\",\"valor_financiero\":132949.85,\"alias\":\"00740010102092397668\",\"descripcion_codigo_operacion_compra\":\"COMPRA (48 HORAS)\",\"numero_prospecto\":\"       11\",\"id\":\"SIMXP0000005\",\"serie\":\"PV\",\"divisa\":\"\",\"saldo\":\"\",\"total_titulos\":237,\"cupon\":0,\"ind_adicional\":\"no\"},{\"codigo_fondo\":2199,\"tipo\":\"\",\"num_contrato\":\"00740010002092397668\",\"numero\":\"00740010002092397668\",\"codigo_operacion_venta2\":\"RTA0\",\"codigo_operacion_venta1\":\"RFA0\",\"ind_mancomunada\":\"no\",\"cuenta_asociada\":\"00740010110178294828\",\"titulos_no_disponibles\":0,\"descripcion_codigo_operacion_venta2\":\"PREAVISO TOTAL 24 HORAS\",\"codigo_operacion_compra\":\"SEOL\",\"descripcion_codigo_operacion_venta1\":\"PREAVISO 24 HORAS\",\"precio_pactado\":550.177857,\"descripcion_fondo\":\"B+EDUCA\",\"valor_financiero\":132592.86,\"alias\":\"00740010002092397668\",\"descripcion_codigo_operacion_compra\":\"COMPRA EN LINEA\",\"numero_prospecto\":\"       64\",\"id\":\"SIMXP0000006\",\"serie\":\"M\",\"divisa\":\"\",\"saldo\":\"\",\"total_titulos\":241,\"cupon\":0,\"ind_adicional\":\"no\"},{\"codigo_fondo\":2012,\"tipo\":\"\",\"num_contrato\":\"00740010002092397684\",\"numero\":\"00740010002092397684\",\"codigo_operacion_venta2\":\"RT02\",\"codigo_operacion_venta1\":\"RF02\",\"ind_mancomunada\":\"no\",\"cuenta_asociada\":\"00740010110178294828\",\"titulos_no_disponibles\":0,\"descripcion_codigo_operacion_venta2\":\"VENTA TOTAL 72 HRS\",\"codigo_operacion_compra\":\"SE02\",\"descripcion_codigo_operacion_venta1\":\"VENTA PARCIAL 72 HRS\",\"precio_pactado\":578.271989,\"descripcion_fondo\":\"BBVAUSA\",\"valor_financiero\":307062.42,\"alias\":\"00740010002092397684\",\"descripcion_codigo_operacion_compra\":\"COMPRA 72 HORAS\",\"numero_prospecto\":\"      737\",\"id\":\"SIMXP0000007\",\"serie\":\"B\",\"divisa\":\"\",\"saldo\":\"\",\"total_titulos\":531,\"cupon\":0,\"ind_adicional\":\"no\"},{\"codigo_fondo\":2193,\"tipo\":\"\",\"num_contrato\":\"00740010002092397684\",\"numero\":\"00740010002092397684\",\"codigo_operacion_venta2\":\"RT01\",\"codigo_operacion_venta1\":\"RF01\",\"ind_mancomunada\":\"no\",\"cuenta_asociada\":\"00740010110178294828\",\"titulos_no_disponibles\":0,\"descripcion_codigo_operacion_venta2\":\"VENTA TOTAL (48 HORAS)\",\"codigo_operacion_compra\":\"SE01\",\"descripcion_codigo_operacion_venta1\":\"VENTA PARCIAL (48 HORAS)\",\"precio_pactado\":560.969855,\"descripcion_fondo\":\"DCP-1\",\"valor_financiero\":132949.85,\"alias\":\"00740010002092397684\",\"descripcion_codigo_operacion_compra\":\"COMPRA (48 HORAS)\",\"numero_prospecto\":\"       12\",\"id\":\"SIMXP0000008\",\"serie\":\"PV\",\"divisa\":\"\",\"saldo\":\"\",\"total_titulos\":237,\"cupon\":0,\"ind_adicional\":\"no\"},{\"codigo_fondo\":2199,\"tipo\":\"\",\"num_contrato\":\"00740010002092397684\",\"numero\":\"00740010002092397684\",\"codigo_operacion_venta2\":\"RTA0\",\"codigo_operacion_venta1\":\"RFA0\",\"ind_mancomunada\":\"no\",\"cuenta_asociada\":\"00740010110178294828\",\"titulos_no_disponibles\":0,\"descripcion_codigo_operacion_venta2\":\"PREAVISO TOTAL 24 HORAS\",\"codigo_operacion_compra\":\"SEOL\",\"descripcion_codigo_operacion_venta1\":\"PREAVISO 24 HORAS\",\"precio_pactado\":550.177857,\"descripcion_fondo\":\"B+EDUCA\",\"valor_financiero\":132592.86,\"alias\":\"00740010002092397684\",\"descripcion_codigo_operacion_compra\":\"COMPRA EN LINEA\",\"numero_prospecto\":\"       66\",\"id\":\"SIMXP0000009\",\"serie\":\"M\",\"divisa\":\"\",\"saldo\":\"\",\"total_titulos\":241,\"cupon\":0,\"ind_adicional\":\"no\"},{\"codigo_fondo\":2093,\"tipo\":\"\",\"num_contrato\":\"00740010112092397706\",\"numero\":\"00740010112092397706\",\"codigo_operacion_venta2\":\"RTA2\",\"codigo_operacion_venta1\":\"RFA2\",\"ind_mancomunada\":\"no\",\"cuenta_asociada\":\"00740010110178294828\",\"titulos_no_disponibles\":0,\"descripcion_codigo_operacion_venta2\":\"PREAVISO VTA TOTAL 72 HRS\",\"codigo_operacion_compra\":\"SE02\",\"descripcion_codigo_operacion_venta1\":\"PREAVISO VTA PARC 72 HRS\",\"precio_pactado\":571.96264,\"descripcion_fondo\":\"DIVER-P\",\"valor_financiero\":0,\"alias\":\"00740010112092397706\",\"descripcion_codigo_operacion_compra\":\"COMPRA 72 HORAS\",\"numero_prospecto\":\"        7\",\"id\":\"SIMXP0000010\",\"serie\":\"PFAE2\",\"divisa\":\"\",\"saldo\":\"\",\"total_titulos\":0,\"cupon\":0,\"ind_adicional\":\"no\"},{\"codigo_fondo\":2141,\"tipo\":\"\",\"num_contrato\":\"00740010112092397706\",\"numero\":\"00740010112092397706\",\"codigo_operacion_venta2\":\"RTOL\",\"codigo_operacion_venta1\":\"RFOL\",\"ind_mancomunada\":\"no\",\"cuenta_asociada\":\"00740010110178294828\",\"titulos_no_disponibles\":0,\"descripcion_codigo_operacion_venta2\":\"VENTA TOTAL EN LINEA\",\"codigo_operacion_compra\":\"SEOL\",\"descripcion_codigo_operacion_venta1\":\"VENTA PARCIAL EN LINEA\",\"precio_pactado\":565.668673,\"descripcion_fondo\":\"BMERLIQ\",\"valor_financiero\":0,\"alias\":\"00740
				String resp = "{ \"s_versionApl\": 1, \"s_Colectivo\": \"str\", \"s_lit_idioma2\": \"Es\", \"s_tipo_firma\": 0, \"posicionGlobal\": { \"acceso_usr\": 4152312171293605, \"fecha_sesionAnterior\": \"16/07/2014\", \"nivel_aut_usr\": 4, \"tiseguridad_usr\": \"T1\", \"esq_admon_usr\": \"T\", \"asuntos\": { \"lista_inversiones_usd\": null, \"lista_fondosinversion_mxp\": [ { \"codigo_fondo\": 2012, \"tipo\": \"\", \"num_contrato\": \"00740010002092397641\", \"numero\": \"00740010002092397641\", \"codigo_operacion_venta2\": \"RT02\", \"codigo_operacion_venta1\": \"RF02\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL 72 HRS\", \"precio_pactado\": 578.271989, \"descripcion_fondo\": \"BBVAUSA\", \"valor_financiero\": 64188.19, \"alias\": \"00740010002092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"      735\", \"id\": \"SIMXP0000001\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 111, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2193, \"tipo\": \"\", \"num_contrato\": \"00740010142092397641\", \"numero\": \"00740010142092397641\", \"codigo_operacion_venta2\": \"RT01\", \"codigo_operacion_venta1\": \"RF01\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL (48 HORAS)\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL (48 HORAS)\", \"precio_pactado\": 560.969855, \"descripcion_fondo\": \"DCP-1\", \"valor_financiero\": 132949.85, \"alias\": \"00740010142092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"       10\", \"id\": \"SIMXP0000002\", \"serie\": \"PV\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 237, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2199, \"tipo\": \"\", \"num_contrato\": \"00740010002092397641\", \"numero\": \"00740010002092397641\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": 550.177857, \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": 0, \"alias\": \"00740010002092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"       63\", \"id\": \"SIMXP0000003\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 0, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2012, \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RT02\", \"codigo_operacion_venta1\": \"RF02\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL 72 HRS\", \"precio_pactado\": 578.271989, \"descripcion_fondo\": \"BBVAUSA\", \"valor_financiero\": 307062.42, \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"      737\", \"id\": \"SIMXP0000004\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 531, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2193, \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RT01\", \"codigo_operacion_venta1\": \"RF01\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL (48 HORAS)\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL (48 HORAS)\", \"precio_pactado\": 560.969855, \"descripcion_fondo\": \"DCP-1\", \"valor_financiero\": 132949.85, \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"       12\", \"id\": \"SIMXP0000005\", \"serie\": \"PV\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 237, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2199, \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": 550.177857, \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": 132592.86, \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"       66\", \"id\": \"SIMXP0000006\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 241, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2093, \"tipo\": \"\", \"num_contrato\": \"00740010112092397706\", \"numero\": \"00740010112092397706\", \"codigo_operacion_venta2\": \"RTA2\", \"codigo_operacion_venta1\": \"RFA2\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"PREAVISO VTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO VTA PARC 72 HRS\", \"precio_pactado\": 571.96264, \"descripcion_fondo\": \"DIVER-P\", \"valor_financiero\": 0, \"alias\": \"00740010112092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"        7\", \"id\": \"SIMXP0000007\", \"serie\": \"PFAE2\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 0, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2141, \"tipo\": \"\", \"num_contrato\": \"00740010112092397706\", \"numero\": \"00740010112092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": 565.668673, \"descripcion_fondo\": \"BMERLIQ\", \"valor_financiero\": 0, \"alias\": \"00740010112092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"       29\", \"id\": \"SIMXP0000008\", \"serie\": \"PP\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 0, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2144, \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": 583.310454, \"descripcion_fondo\": \"F-PYME\", \"valor_financiero\": 0, \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"       69\", \"id\": \"SIMXP0000009\", \"serie\": \"B2\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 0, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2199, \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": 550.177857, \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": 119938.77, \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"       72\", \"id\": \"SIMXP0000010\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 218, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2298, \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": 598.603161, \"descripcion_fondo\": \"BMER18B\", \"valor_financiero\": 0, \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"       14\", \"id\": \"SIMXP0000011\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 0, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2299, \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002";
				resp = String.format(resp, CURRENT_ACCOUNTS);
				Log.d(this.getClass().getSimpleName(), CURRENT_ACCOUNTS);
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
			} else {
			    HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
			   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("username", params.get("username")));
				nvpso.add(new BasicNameValuePair("password", params.get("password")));
				//nvpso.add(new BasicNameValuePair("password", "password00"));
				nvpso.add(new BasicNameValuePair("login-form-type", params.get("login-form-type")));
				nvpso.add(new BasicNameValuePair("recepcionJSON", params.get("recepcionJSON")));
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				//JQH
				verifyServerResponse(respuesta, httpPost);
				
				/***** JQH
				HttpResponse response = httpclient.execute(httpPost);
				int codigo_http = response.getStatusLine().getStatusCode();

				if (codigo_http >= 400){
					respuesta.setEstado(EstadoRespuesta.Fail);
					respuesta.setCodigoError( "HTTP:" + codigo_http );
					respuesta.setMensaje( response.getStatusLine().getReasonPhrase());
					respuesta.setJsonResultante(Utilerias.crearJsonError( String.valueOf(codigo_http) , respuesta.getMensaje()));
					peticionesFallidas++;
				}else{
					peticionesFallidas = 0;
					HttpEntity entity = response.getEntity();
					List<Cookie> cookies = httpclient.getCookieStore().getCookies();

					if (cookies.isEmpty()) {
						Log.d(Server.TAG, "No cookies");
					} else {
						sbcp.setPreferencia(Server.COOKIES_COUNT_PROPERTY_NAME2, String.valueOf(cookies.size()));

						for (int i = 0; i < cookies.size(); i++) {
							Log.d(Server.TAG, "cookie: " + cookies.get(i).toString() );
							Session.setCookieJSesionId(cookies.get(i).getValue().toString());

							org.apache.http.cookie.Cookie cc = cookies.get(i);

							sbcp.setPreferencia(Server.COOKIE_NAME2_PROPERTY_PREFIX + i , cc.getName() );
							sbcp.setPreferencia(Server.COOKIE_VALUE2_PROPERTY_PREFIX + i , cc.getValue() );
							sbcp.setPreferencia(Server.COOKIE_VERSION2_PROPERTY_PREFIX + i , String.valueOf(cc.getVersion()) );
							sbcp.setPreferencia(Server.COOKIE_DOMAIN2_PROPERTY_PREFIX + i , cc.getDomain() );
							sbcp.setPreferencia(Server.COOKIE_PATH2_PROPERTY_PREFIX + i , cc.getPath() );
						}
					}
					InputStream isTAS = entity.getContent();
					respuesta.setJsonResultante(Utilerias.convertStreamToString(isTAS));
					entity.consumeContent();

					respuesta = validarRespuesta(respuesta);
				}
				****/
			} 
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch(Exception e)
		{
			Log.e(Server.TAG, "error singOnTwo: " + e.getLocalizedMessage() );
			throw new RuntimeException(e.getMessage());
		}

		Session.getInstance().guardaValores(Server.PersistentJsonFile.FILE_SIGN_ON_2, respuesta.getJsonResultante());
		
		return respuesta;
	}
	
	private ServerResponse singOff(Hashtable<String, String> params){
		ServerResponse respuesta = new ServerResponse();
		
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {//Respuesta Simulada
				String resp = "{\"imd_signoff_op-data\":{\"codigo\":\"1\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
			   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				Log.d(Server.TAG, "Lista: "+ nvpso.toString());
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				Log.d(Server.TAG, "httpPost: "+ httpPost.toString());
				logURl(httpPost, nvpso);
				
				verifyServerResponse(respuesta, httpPost);
			} 
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch(Exception e)
		{
			Log.e(Server.TAG, "error singOff_1: " + e.getLocalizedMessage() );
			throw new RuntimeException(e.getMessage());
		}
		
		Session.getInstance().guardaValores(Server.PersistentJsonFile.FILE_SIGN_OFF, respuesta.getJsonResultante());

		return respuesta;
	}
	
	private ServerResponse signOffWas(){
		/* https://148.244.45.93/mexiconetna2/mexiconetni/LogoutCBTFServlet */
		
		ServerResponse respuesta = new ServerResponse();
		
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {//Respuesta Simulada
				String resp = "{\"imd_signoff_op-data\":{\"codigo\":\"1\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_SIGNOFF_WAS);
			   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", "{}"));
				Log.d(Server.TAG, "Lista: "+ nvpso.toString());
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				Log.d(Server.TAG, "httpPost: "+ httpPost.toString());
				logURl(httpPost, nvpso);
				
				
				HttpResponse httpResponse = getHttpClient().execute(httpPost);
				int responseCode = httpResponse.getStatusLine().getStatusCode();
				Log.w(Server.TAG, "HTTP CODE_1 " + responseCode);
				if (responseCode >= 400) {
					respuesta.setEstado(EstadoRespuesta.Fail);
					respuesta.setCodigoError("HTTP:" + responseCode);
					respuesta.setMensaje(BCom.getInstance().getString(R.string.internet_error_message));
					respuesta.setJsonResultante(Utilerias.crearJsonError( String.valueOf(responseCode) , respuesta.getMensaje()));
					peticionesFallidas++;
					
					if(Server.MAX_HTTP_FAILED_INTENTS == peticionesFallidas) {
						peticionesFallidas = 0;
						BCom.getInstance().logout();
					}
				} else {
					try {
						peticionesFallidas = 0;
						Log.w(Server.TAG, "Peticion HTTP correcta");
						HttpEntity entity = httpResponse.getEntity();
						InputStream isTAS = entity.getContent();
						//respuesta.setJsonResultante(Utilerias.convertStreamToString(isTAS));
						entity.consumeContent();
						Log.w(Server.TAG, "Función para verificar la respuesta del JSON");
						respuesta.setEstado(EstadoRespuesta.Ok);
					} catch(IOException ioEx) {
						Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", ioEx);
						throw new Exception(ioEx);
					} catch (Exception ex) {
						Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", ex);
						throw new Exception(ex);
					}
				}
				
				//verifyServerResponse(respuesta, httpPost);
				//respuesta.setEstado(EstadoRespuesta.Ok);
			} 
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
			System.out.print("Manda mensaje de respuesta error");
		} catch(Exception e)
		{
			Log.e(Server.TAG, "error singOf_2:"  + e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
		
		//Session.getInstance().guardaValores(Server.PersistentJsonFile.FILE_SIGN_OFF, respuesta.getJsonResultante());

		return respuesta;
	}
	
	private ServerResponse signOffWebseal(){
		/*https://148.244.45.93/pkmslogout.form*/
		ServerResponse respuesta = new ServerResponse();
		
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {//Respuesta Simulada
				String resp = "{\"imd_signoff_op-data\":{\"codigo\":\"1\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
			} else {
				HttpPost httpPost = initPostRequestWebseal(Server.BURL_SIGNOFF_WEBSEAL);
			   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", "{}"));
				Log.d(Server.TAG, "Lista: "+ nvpso.toString());
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				Log.d(Server.TAG, "httpPost: "+ httpPost.toString());
				logURl(httpPost, nvpso);
				
				
				HttpResponse httpResponse = getHttpClient().execute(httpPost);
				int responseCode = httpResponse.getStatusLine().getStatusCode();
				Log.w(Server.TAG, "HTTP CODE_2 " + responseCode);
				if (responseCode >= 400) {
					respuesta.setEstado(EstadoRespuesta.Fail);
					respuesta.setCodigoError("HTTP:" + responseCode);
					respuesta.setMensaje(BCom.getInstance().getString(R.string.internet_error_message));
					respuesta.setJsonResultante(Utilerias.crearJsonError( String.valueOf(responseCode) , respuesta.getMensaje()));
					peticionesFallidas++;
					
					if(Server.MAX_HTTP_FAILED_INTENTS == peticionesFallidas) {
						peticionesFallidas = 0;
						BCom.getInstance().logout();
					}
				} else {
					try {
						peticionesFallidas = 0;
						Log.w(Server.TAG, "Peticion HTTP correcta");
						HttpEntity entity = httpResponse.getEntity();
						InputStream isTAS = entity.getContent();
						//respuesta.setJsonResultante(Utilerias.convertStreamToString(isTAS));
						entity.consumeContent();
						Log.w(Server.TAG, "Funci—n para verificar la respuesta del JSON");
						respuesta.setEstado(EstadoRespuesta.Ok);
					} catch(IOException ioEx) {
						Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", ioEx);
						throw new Exception(ioEx);
					} catch (Exception ex) {
						Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", ex);
						throw new Exception(ex);
					}
				}
				
				//verifyServerResponse(respuesta, httpPost);
			} 
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch(Exception e)
		{
			Log.e(Server.TAG, "error singOff_3: " + e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
		
		//Session.getInstance().guardaValores(Server.PersistentJsonFile.FILE_SIGN_OFF, respuesta.getJsonResultante());

		return respuesta;
	}
	
	private ServerResponse catalogoBancos(Hashtable<String, String> params){
		ServerResponse respuesta = new ServerResponse();

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {//Respuesta Simulada
				String resp = "{\"s_lit_idioma\":\"CAS\",\"respuesta\":{\"icListaBancos\":[{\"idBanco\":\"1\",\"claveSPEI\":\"40112\",\"cveCECOBAN\":\"0112\",\"nombreBanco\":\"BANCO MONEX\",\"cbe\":\"true\",\"cbeMD\":\"true\",\"cbeDS\":\"true\",\"tdd\":\"true\",\"tddMD\":\"true\",\"tddDS\":\"true\",\"tdc\":\"true\",\"ocr\":\"true\",\"sinApl\":\"true\"},{\"idBanco\":\"2\",\"claveSPEI\":\"37166\",\"cveCECOBAN\":\"7166\",\"nombreBanco\":\"BANCEFI\",\"cbe\":\"true\",\"cbeMD\":\"true\",\"cbeDS\":\"true\",\"tdd\":\"true\",\"tddMD\":\"true\",\"tddDS\":\"true\",\"tdc\":\"true\",\"ocr\":\"true\",\"sinApl\":\"true\"}]}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
			   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}  
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch(Exception e)
		{
			Log.e(Server.TAG, "error catalogoBancos: " + e.getLocalizedMessage() );
			throw new RuntimeException(e.getMessage());
		}

		Session.getInstance().guardaValores(Server.PersistentJsonFile.FILE_CAT_BAN, respuesta.getJsonResultante());
		
		return respuesta;
	}
	
	private ServerResponse reglasDeNegocio(Hashtable<String, String> params){
		ServerResponse respuesta = new ServerResponse();

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {//Respuesta Simulada
				String resp = "{\"version\": \"23\",\"usuario\": {\"fechaservidor\": \"26/01/2015\",\"horaservidor\": \"05:17:46\",\"bandCaptCompFisc\": \"true\"},\"aplicaciones\": {\"compraVentaAcciones\": {\"aplicaesquema\": \"si\",\"operacion\": {\"operaEnSabado\": \"No\",\"operaEnDomingo\": \"No\",\"operaEnDiasNohabiles\": \"Si\",\"perfiles\": {\"perfil\": [\"IF03\",\"IF05\",\"IF07\",\"IF11\",\"IF16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"08:30:00\",\"fin\": \"15:00:00\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"00:00:00\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"00:00:00\"}}}},\"estatusCancelacionAcciones\": {\"aplicaesquema\": \"si\",\"operacion\": {\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"perfiles\": {\"perfil\": [\"IF03\",\"IF05\",\"IF07\",\"IF11\",\"IF16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}},\"detalleInversion\": {\"aplicaesquema\": \"no\",\"operacion\": {\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"perfiles\": {\"perfil\": [\"IF03\",\"IF05\",\"IF07\",\"IF11\",\"IF16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}},\"accesoBrokerOnline\": {\"aplicaesquema\": \"no\",\"operacion\": {\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"perfiles\": {\"perfil\": [\"IF03\",\"IF05\",\"IF07\",\"IF11\",\"IF16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}},\"consultaEdoCtaPDF\": {\"aplicaesquema\": \"no\",\"perfiles\": [\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF08\",\"IF09\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"],\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}},\"reimpresionComprobantes\": {\"aplicaesquema\": \"no\",\"perfiles\": [\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF08\",\"IF09\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"],\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}},\"consultaDeTasas\": {\"perfiles\": [\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF08\",\"IF09\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"],\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"sabado\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"domingo\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"}}},\"compraInversiones\": { \"aplicaesquema\": \"si\",\"operacion\": {\"cargo\": {\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": \"IN\"},\"aplica_adicional\": \"si\",\"aplica_mancomunada\": \"no\",\"abono\": {\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"No\",\"maximoDiasDeProgramacion\": \"0\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"si\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"sabado\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"domingo\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"}}}}}},\"ventaInversiones\": {\"aplicaesquema\": \"si\",\"operacion\": {\"abono\": {\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"No\",\"maximoDiasDeProgramacion\": \"0\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"sabado\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"domingo\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"}}}}},\"entreMiscuentas\": {\"aplicaesquema\": \"si\",\"operacion\": {\"cargo\": [{\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": [\"LI\",\"AH\",\"CH\"]},\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"abono\": [{\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}},{\"aplicamoneda\": \"no\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": \"TC\"},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}},{\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": \"TP\"},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}]},{\"aplicamoneda\": \"no\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": \"TC\"},\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"abono\": {\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}},{\"aplicamoneda\": \"si\",\"moneda\": \"USD\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"abono\": [{\"aplicamoneda\": \"si\",\"moneda\": \"USD\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}},{\"aplicamoneda\": \"si\",\"moneda\": \"USD\",\"cuentas\": {\"cuenta\": \"CA\"},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}]},{\"aplicamoneda\": \"si\",\"moneda\": \"USD\",\"cuentas\": {\"cuenta\": \"CA\"},\"aplica_adicional\": \"no\",\"aplica_m";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_REGLAS_NEGOCIO);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				//nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				nvpso.add(new BasicNameValuePair("version",""));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}  
		} catch(Exception e) {
			Log.e(Server.TAG, "error reglasDeNegocio: " + e.getLocalizedMessage() );
			throw new RuntimeException(e.getMessage());
		}
		
		return respuesta;
	}
	
	private ServerResponse posicionGlobal(Hashtable<String, String> params){
		ServerResponse respuesta = new ServerResponse();

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{ \"s_versionApl\": 1, \"s_Colectivo\": \"str\", \"s_lit_idioma2\": \"Es\", \"s_tipo_firma\": 0, \"posicionGlobal\": { \"acceso_usr\": \"4152312171293605\", \"fecha_sesionAnterior\": \"16/07/2014\", \"nivel_aut_usr\": \"4\", \"tiseguridad_usr\": \"T1\", \"esq_admon_usr\": \"T\", \"asuntos\": { \"lista_inversiones_usd\": \"\", \"lista_fondosinversion_mxp\": [ { \"codigo_fondo\": \"2012\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397641\", \"numero\": \"00740010002092397641\", \"codigo_operacion_venta2\": \"RT02\", \"codigo_operacion_venta1\": \"RF02\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL 72 HRS\", \"precio_pactado\": \"578.271989\", \"descripcion_fondo\": \"BBVAUSA\", \"valor_financiero\": \"64188.19\", \"alias\": \"00740010002092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"735\", \"id\": \"SIMXP0000001\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"111\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2193\", \"tipo\": \"\", \"num_contrato\": \"00740010142092397641\", \"numero\": \"00740010142092397641\", \"codigo_operacion_venta2\": \"RT01\", \"codigo_operacion_venta1\": \"RF01\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL (48 HORAS)\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL (48 HORAS)\", \"precio_pactado\": \"560.969855\", \"descripcion_fondo\": \"DCP-1\", \"valor_financiero\": \"132949.85\", \"alias\": \"00740010142092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"10\", \"id\": \"SIMXP0000002\", \"serie\": \"PV\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"237\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2199\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397641\", \"numero\": \"00740010002092397641\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": \"550.177857\", \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": \"0\", \"alias\": \"00740010002092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"63\", \"id\": \"SIMXP0000003\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"0\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2012\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RT02\", \"codigo_operacion_venta1\": \"RF02\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL 72 HRS\", \"precio_pactado\": \"578.271989\", \"descripcion_fondo\": \"BBVAUSA\", \"valor_financiero\": \"307062.42\", \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"737\", \"id\": \"SIMXP0000004\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"531\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2193\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RT01\", \"codigo_operacion_venta1\": \"RF01\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL (48 HORAS)\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL (48 HORAS)\", \"precio_pactado\": \"560.969855\", \"descripcion_fondo\": \"DCP-1\", \"valor_financiero\": \"132949.85\", \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"12\", \"id\": \"SIMXP0000005\", \"serie\": \"PV\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"237\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2199\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": \"550.177857\", \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": \"132592.86\", \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"66\", \"id\": \"SIMXP0000006\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"241\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2093\", \"tipo\": \"\", \"num_contrato\": \"00740010112092397706\", \"numero\": \"00740010112092397706\", \"codigo_operacion_venta2\": \"RTA2\", \"codigo_operacion_venta1\": \"RFA2\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"PREAVISO VTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO VTA PARC 72 HRS\", \"precio_pactado\": \"571.96264\", \"descripcion_fondo\": \"DIVER-P\", \"valor_financiero\": \"0\", \"alias\": \"00740010112092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"7\", \"id\": \"SIMXP0000007\", \"serie\": \"PFAE2\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"0\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2141\", \"tipo\": \"\", \"num_contrato\": \"00740010112092397706\", \"numero\": \"00740010112092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": \"565.668673\", \"descripcion_fondo\": \"BMERLIQ\", \"valor_financiero\": \"0\", \"alias\": \"00740010112092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"29\", \"id\": \"SIMXP0000008\", \"serie\": \"PP\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"0\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2144\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": \"583.310454\", \"descripcion_fondo\": \"F-PYME\", \"valor_financiero\": \"0\", \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"69\", \"id\": \"SIMXP0000009\", \"serie\": \"B2\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"0\", \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2199\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": \"550.177857\", \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": \"119938.77\", \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"72\", \"id\": \"SIMXP0000010\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 218, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2298, \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": 598.603161, \"descripcion_fondo\": \"BMER18B\", \"valor_financiero\": 0, \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"       14\", \"id\": \"SIMXP0000011\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_t";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error posicionGlobal: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		Session.getInstance().guardaValores(Server.PersistentJsonFile.FILE_POS_GL, respuesta.getJsonResultante());
		
		return respuesta;
	}
	
	/**
	 * Perform the signoff for the specified url.
	 * @param serverUrl The server url.
	 * @param cardNumber The card number of the user.
	 * @param cookieStore The cookies store for the http client
	 * @return True if the signoff was successfull, false otherwise.
	 */
	public boolean doSignOutOfPreviousSession(String serverUrl, String cardNumber, CookieStore cookieStore) {
		if(ServerModes.SIMULACION == Server.serverMode) {
			return true;
		}
		
		DefaultHttpClient httpClient = HttpInvoker.getHttpClient();
		HttpPost httpPost = new HttpPost(serverUrl);
		
		List<NameValuePair> nvpPost = new ArrayList<NameValuePair>();
		nvpPost.add(new BasicNameValuePair("tarjeta", cardNumber));
		nvpPost.add(new BasicNameValuePair("servicio", "n"));
		
		try {
			httpPost.setEntity(new UrlEncodedFormEntity(nvpPost));
		} catch (UnsupportedEncodingException ueEx) {
			Log.w(this.getClass().getSimpleName(), "Got UnsupportedEncodingException, failed to create the http client for the url: " + serverUrl, ueEx);
			return false;
		}
		
		httpClient.setCookieStore(cookieStore);
		
		try {
			HttpResponse httpResponse = httpClient.execute(httpPost);
			HttpEntity httpEntity = httpResponse.getEntity();
			InputStream is = httpEntity.getContent();
			
			String responseString = Utilerias.convertStreamToString(is);
			Log.d(this.getClass().getSimpleName(), responseString);
			
			is.close();
			
			httpResponse = null;
			httpEntity.consumeContent();
			httpEntity = null;
		} catch(ClientProtocolException cpEx) {
			Log.e(this.getClass().getSimpleName(), "Got ClientProtocolException while closing the session for the url: " + serverUrl, cpEx);
			return false;
		} catch(IOException ioEx) {
			Log.e(this.getClass().getSimpleName(), "Got IOException while closing the session for the url: " + serverUrl, ioEx);
			return false;
		} catch(Exception ex) {
			Log.e(this.getClass().getSimpleName(), "Got Exception while closing the session for the url: " + serverUrl, ex);
			return false;
		}
		
		return true;
	}
	

	private HttpPost initPostRequest(String operationUrl) {
		String urlBalanceador;
		if (Session.getUrlWAS() == null ){
			System.out.print("if");
			String urlBalanceador2 ="https://148.244.45.93/mexiconetna2/mexiconetni/";
			urlBalanceador = urlBalanceador2;
		}else {
			System.out.print("else");
			urlBalanceador = Session.getUrlWAS();
			System.out.print("urlBalanceador: "+urlBalanceador);
		}
		
		String requestURL = urlBalanceador + operationUrl;
		Log.w(Server.TAG, "Requested url_2:" + requestURL);
	    HttpPost httpPost = new HttpPost(requestURL);
	    
	    return httpPost;
	}
	private HttpPost initPostRequestWebseal(String operationUrl) {
		String urlBalanceador = Session.getUrlWebseal();
		Log.w(Server.TAG, "url " + urlBalanceador);
		String requestURL = urlBalanceador + operationUrl;
		Log.w(Server.TAG, "Requested url_3:" + requestURL);
	    HttpPost httpPost = new HttpPost(requestURL);
	    
	    return httpPost;
	}
	
	private void verifyServerResponse(ServerResponse serverResponse, HttpPost postRequest) throws Exception {
		Log.w(Server.TAG, "Parametro 2 " +EntityUtils.toString(postRequest.getEntity()));
		Log.w(Server.TAG, "Parametro 1 " + serverResponse.toString());

		HttpResponse httpResponse = getHttpClient().execute(postRequest);
		int responseCode = httpResponse.getStatusLine().getStatusCode();
		Log.w(Server.TAG, "HTTP CODE_3 " + responseCode);
		if (responseCode >= 400) {
			serverResponse.setEstado(EstadoRespuesta.Fail);
			serverResponse.setCodigoError("HTTP:" + responseCode);
			serverResponse.setMensaje(BCom.getInstance().getString(R.string.internet_error_message));
			serverResponse.setJsonResultante(Utilerias.crearJsonError( String.valueOf(responseCode) , serverResponse.getMensaje()));
			peticionesFallidas++;
			
			if(Server.MAX_HTTP_FAILED_INTENTS == peticionesFallidas) {
				peticionesFallidas = 0;
				BCom.getInstance().logout();
			}
		} else {
			try {
				peticionesFallidas = 0;
				Log.w(Server.TAG, "Peticion HTTP correcta");
				HttpEntity entity = httpResponse.getEntity();
				InputStream isTAS = entity.getContent();
				serverResponse.setJsonResultante(Utilerias.convertStreamToString(isTAS));
				entity.consumeContent();
				Log.w(Server.TAG, "Función para verificar la respuesta del JSON");
				serverResponse = validarRespuesta(serverResponse);
			} catch(IOException ioEx) {
				Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", ioEx);
				throw new Exception(ioEx);
			} catch (Exception ex) {
				Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", ex);
				throw new Exception(ex);
			}
		}
	}
	
	private ServerResponse validarRespuesta(ServerResponse respuesta){
		if(respuesta == null){
			respuesta = new ServerResponse();
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.NULL_EXCEPTION);
		} else{
			try {
				JSONObject json = new JSONObject(respuesta.getJsonResultante());
				if(json.has("error") ){
					Log.d("error","IF");
					respuesta.setEstado(EstadoRespuesta.Fail);
					respuesta.setMensaje( json.getJSONObject("error").getString("mensaje"));
					if(json.getJSONObject("error").has("codigo"))
					respuesta.setCodigoError( json.getJSONObject("error").getString("codigo"));
				} else if(json.has("errorARQ")){
					Log.d("errorARQ","ELSE IF");
					respuesta.setEstado(EstadoRespuesta.ARQ);
					respuesta.setMensaje( json.getJSONObject("msg").getString("mensaje"));
				} else {
					Log.d("OK","ELSE");
					respuesta.setEstado(EstadoRespuesta.Ok);
				}
			} catch (JSONException e) {
				respuesta.setEstado(EstadoRespuesta.ARQ);
				respuesta.setMensaje(Server.JSON_ARQ);
				System.out.print("Manda otro mensaje error");
			}
			catch (Exception ex) {
				Log.e(Server.TAG, "error: " + ex.getLocalizedMessage() );
				throw new RuntimeException(ex.getMessage());
			}
		}

		return respuesta;
	}
	//#endregion
		   
    private ServerResponse movimientosCtasCheques(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		Log.d(this.getClass().getName(), params.toString());
		try {
			
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = null;
				JSONObject jsonDatosAplicativos = (new JSONObject(params.get("cadenaJSON"))).getJSONObject("datosAplicativos");
				int periodo = jsonDatosAplicativos.getInt("periodo");
				switch (periodo) {
					case 0:
						 resp = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3459,\"fecha\":\"06/12/2014\",\"abono\":3200.95,\"cargo\":\"\",\"observaciones\":\"BNET87696\",\"referencia\":\"0098076678\",\"concepto\":\"MXP-0098076678 INTERNET TRASPASO\"}," +
								  "{\"saldo\":6659.95,\"fecha\":\"08/12/2014\",\"abono\":2500.54,\"cargo\":\"\",\"observaciones\":\"BNET87697\",\"referencia\":\"0098076679\",\"concepto\":\"MXP-0098076679 ALQUILER TRASPASO\"}," +
								  "{\"saldo\":9160.49,\"fecha\":\"10/12/2014\",\"abono\":\"\",\"cargo\":800.25,\"observaciones\":\"BNET87698\",\"referencia\":\"0098076680\",\"concepto\":\"MXP-0098076680 INTERNET PAGO 1\"}," +
								  "{\"saldo\":8360.24,\"fecha\":\"12/12/2014\",\"abono\":\"\",\"cargo\":2523.66,\"observaciones\":\"BNET87699\",\"referencia\":\"0098076681\",\"concepto\":\"MXP-0098076681 INTERNET PAGO 2\"}," +
								  "{\"saldo\":5836.58,\"fecha\":\"12/12/2014\",\"abono\":1847,\"cargo\":\"\",\"observaciones\":\"BNET87700\",\"referencia\":\"0098076682\",\"concepto\":\"MXP-0098076682 INTERNET ABONO 1\"}," +
								  "{\"saldo\":7683.58,\"fecha\":\"13/12/2014\",\"abono\":\"\",\"cargo\":355,\"observaciones\":\"BNET87701\",\"referencia\":\"0098076683\",\"concepto\":\"MXP-0098076683 INTERNET PAGO 3\"}," +
								  "{\"saldo\":7328.58,\"fecha\":\"13/12/2014\",\"abono\":\"\",\"cargo\":1200,\"observaciones\":\"BNET87702\",\"referencia\":\"0098076684\",\"concepto\":\"MXP-0098076684 INTERNET PAGO 4\"}," +
								  "{\"saldo\":6128.58,\"fecha\":\"14/12/2014\",\"abono\":2000,\"cargo\":\"\",\"observaciones\":\"BNET87703\",\"referencia\":\"0098076685\",\"concepto\":\"MXP-0098076685 INTERNET ABONO 2\"}," +
								  "{\"saldo\":8128.58,\"fecha\":\"15/12/2014\",\"abono\":900,\"cargo\":\"\",\"observaciones\":\"BNET87704\",\"referencia\":\"0098076686\",\"concepto\":\"MXP-0098076686 INTERNET ABONO 3\"}," +
								  "{\"saldo\":9028.58,\"fecha\":\"15/12/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"BNET87705\",\"referencia\":\"0098076687\",\"concepto\":\"MXP-0098076687 INTERNET PAGO 5\"}]}}}";
						
						break;
					case 1:
						resp = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3459,\"fecha\":\"12/11/2014\",\"abono\":3200.95,\"cargo\":\"\",\"observaciones\":\"BNET87696\",\"referencia\":\"0098076678\",\"concepto\":\"MXP-0098076678 INTERNET TRASPASO\"},{\"saldo\":6659.95,\"fecha\":\"14/11/2014\",\"abono\":2500.54,\"cargo\":\"\",\"observaciones\":\"BNET87697\",\"referencia\":\"0098076679\",\"concepto\":\"MXP-0098076679 ALQUILER TRASPASO\"},{\"saldo\":9160.49,\"fecha\":\"15/11/2014\",\"abono\":\"\",\"cargo\":800.25,\"observaciones\":\"BNET87698\",\"referencia\":\"0098076680\",\"concepto\":\"MXP-0098076680 INTERNET PAGO 1\"},{\"saldo\":8360.24,\"fecha\":\"18/11/2014\",\"abono\":\"\",\"cargo\":2523.66,\"observaciones\":\"BNET87699\",\"referencia\":\"0098076681\",\"concepto\":\"MXP-0098076681 INTERNET PAGO 2\"},{\"saldo\":5836.58,\"fecha\":\"18/11/2014\",\"abono\":1847,\"cargo\":\"\",\"observaciones\":\"BNET87700\",\"referencia\":\"0098076682\",\"concepto\":\"MXP-0098076682 INTERNET ABONO 1\"},{\"saldo\":7683.58,\"fecha\":\"19/11/2014\",\"abono\":\"\",\"cargo\":355,\"observaciones\":\"BNET87701\",\"referencia\":\"0098076683\",\"concepto\":\"MXP-0098076683 INTERNET PAGO 3\"},{\"saldo\":7328.58,\"fecha\":\"19/11/2014\",\"abono\":\"\",\"cargo\":1200,\"observaciones\":\"BNET87702\",\"referencia\":\"0098076684\",\"concepto\":\"MXP-0098076684 INTERNET PAGO 4\"},{\"saldo\":6128.58,\"fecha\":\"20/11/2014\",\"abono\":2000,\"cargo\":\"\",\"observaciones\":\"BNET87703\",\"referencia\":\"0098076685\",\"concepto\":\"MXP-0098076685 INTERNET ABONO 2\"},{\"saldo\":8128.58,\"fecha\":\"21/11/2014\",\"abono\":900,\"cargo\":\"\",\"observaciones\":\"BNET87704\",\"referencia\":\"0098076686\",\"concepto\":\"MXP-0098076686 INTERNET ABONO 3\"},{\"saldo\":9028.58,\"fecha\":\"21/11/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"BNET87705\",\"referencia\":\"0098076687\",\"concepto\":\"MXP-0098076687 INTERNET PAGO 5\"}]}}}";
						break;
					case 2:
						resp = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3459,\"fecha\":\"12/10/2014\",\"abono\":3200.95,\"cargo\":\"\",\"observaciones\":\"BNET87696\",\"referencia\":\"0098076678\",\"concepto\":\"MXP-0098076678 INTERNET TRASPASO\"},{\"saldo\":6659.95,\"fecha\":\"14/10/2014\",\"abono\":2500.54,\"cargo\":\"\",\"observaciones\":\"BNET87697\",\"referencia\":\"0098076679\",\"concepto\":\"MXP-0098076679 ALQUILER TRASPASO\"},{\"saldo\":9160.49,\"fecha\":\"15/10/2014\",\"abono\":\"\",\"cargo\":800.25,\"observaciones\":\"BNET87698\",\"referencia\":\"0098076680\",\"concepto\":\"MXP-0098076680 INTERNET PAGO 1\"},{\"saldo\":8360.24,\"fecha\":\"18/10/2014\",\"abono\":\"\",\"cargo\":2523.66,\"observaciones\":\"BNET87699\",\"referencia\":\"0098076681\",\"concepto\":\"MXP-0098076681 INTERNET PAGO 2\"},{\"saldo\":5836.58,\"fecha\":\"18/10/2014\",\"abono\":1847,\"cargo\":\"\",\"observaciones\":\"BNET87700\",\"referencia\":\"0098076682\",\"concepto\":\"MXP-0098076682 INTERNET ABONO 1\"},{\"saldo\":7683.58,\"fecha\":\"19/10/2014\",\"abono\":\"\",\"cargo\":355,\"observaciones\":\"BNET87701\",\"referencia\":\"0098076683\",\"concepto\":\"MXP-0098076683 INTERNET PAGO 3\"},{\"saldo\":7328.58,\"fecha\":\"19/10/2014\",\"abono\":\"\",\"cargo\":1200,\"observaciones\":\"BNET87702\",\"referencia\":\"0098076684\",\"concepto\":\"MXP-0098076684 INTERNET PAGO 4\"},{\"saldo\":6128.58,\"fecha\":\"20/10/2014\",\"abono\":2000,\"cargo\":\"\",\"observaciones\":\"BNET87703\",\"referencia\":\"0098076685\",\"concepto\":\"MXP-0098076685 INTERNET ABONO 2\"},{\"saldo\":8128.58,\"fecha\":\"21/10/2014\",\"abono\":900,\"cargo\":\"\",\"observaciones\":\"BNET87704\",\"referencia\":\"0098076686\",\"concepto\":\"MXP-0098076686 INTERNET ABONO 3\"},{\"saldo\":9028.58,\"fecha\":\"21/10/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"BNET87705\",\"referencia\":\"0098076687\",\"concepto\":\"MXP-0098076687 INTERNET PAGO 5\"}]}}}";
						break;
					default:
						break;
				}
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error movimientosCtasCheques: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}

	private ServerResponse movimientosCtasUSD(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();

		try {
			
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = null;
				JSONObject jsonDatosAplicativos = (new JSONObject(params.get("cadenaJSON"))).getJSONObject("datosAplicativos");
				int periodo = jsonDatosAplicativos.getInt("periodo");
				switch (periodo) {
					case 0:
					 resp = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"MEXICO\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3000,\"fecha\":\"06/12/2014\",\"abono\":200.95,\"cargo\":\"\",\"observaciones\":\"USD-BNET87696\",\"referencia\":\"USD-0098076678\",\"concepto\":\"USD-0098076678 INTERNET TRASPASO\"}," +
							  "{\"saldo\":3200.95,\"fecha\":\"08/12/2014\",\"abono\":500.54,\"cargo\":\"\",\"observaciones\":\"USD-BNET87697\",\"referencia\":\"USD-0098076679\",\"concepto\":\"USD-0098076679 ALQUILER TRASPASO\"}," +
							  "{\"saldo\":3701.49,\"fecha\":\"10/12/2014\",\"abono\":\"\",\"cargo\":1000,\"observaciones\":\"USD-BNET87698\",\"referencia\":\"USD-0098076680\",\"concepto\":\"USD-0098076680 INTERNET PAGO 1\"}," +
							  "{\"saldo\":2701.49,\"fecha\":\"12/12/2014\",\"abono\":\"\",\"cargo\":523.66,\"observaciones\":\"USD-BNET87699\",\"referencia\":\"USD-0098076681\",\"concepto\":\"USD-0098076681 INTERNET PAGO 2\"}," +
							  "{\"saldo\":2177.83,\"fecha\":\"12/12/2014\",\"abono\":2500,\"cargo\":\"\",\"observaciones\":\"USD-BNET87700\",\"referencia\":\"USD-0098076682\",\"concepto\":\"USD-0098076682 INTERNET ABONO 1\"}," +
							  "{\"saldo\":4677.83,\"fecha\":\"13/12/2014\",\"abono\":\"\",\"cargo\":1600,\"observaciones\":\"USD-BNET87701\",\"referencia\":\"USD-0098076683\",\"concepto\":\"USD-0098076683 INTERNET PAGO 3\"}," +
							  "{\"saldo\":3077.83,\"fecha\":\"13/12/2014\",\"abono\":\"\",\"cargo\":259.07,\"observaciones\":\"USD-BNET87702\",\"referencia\":\"USD-0098076684\",\"concepto\":\"USD-0098076684 INTERNET PAGO 4\"}," +
							  "{\"saldo\":2818.76,\"fecha\":\"24/12/2014\",\"abono\":3000,\"cargo\":\"\",\"observaciones\":\"USD-BNET87703\",\"referencia\":\"USD-0098076685\",\"concepto\":\"USD-0098076685 INTERNET ABONO 2\"}," +
							  "{\"saldo\":5818.76,\"fecha\":\"15/12/2014\",\"abono\":200,\"cargo\":\"\",\"observaciones\":\"USD-BNET87704\",\"referencia\":\"USD-0098076686\",\"concepto\":\"USD-0098076686 INTERNET ABONO 3\"}," +
							  "{\"saldo\":6018.76,\"fecha\":\"15/12/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"USD-BNET87705\",\"referencia\":\"USD-0098076687\",\"concepto\":\"USD-0098076687 INTERNET PAGO 5\"}]}}}";
					 break;
					case 1:
						resp = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"MEXICO\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3000,\"fecha\":\"12/11/2014\",\"abono\":200.95,\"cargo\":\"\",\"observaciones\":\"USD-BNET87696\",\"referencia\":\"USD-0098076678\",\"concepto\":\"USD-0098076678 INTERNET TRASPASO\"},{\"saldo\":3200.95,\"fecha\":\"14/11/2014\",\"abono\":500.54,\"cargo\":\"\",\"observaciones\":\"USD-BNET87697\",\"referencia\":\"USD-0098076679\",\"concepto\":\"USD-0098076679 ALQUILER TRASPASO\"},{\"saldo\":3701.49,\"fecha\":\"15/11/2014\",\"abono\":\"\",\"cargo\":1000,\"observaciones\":\"USD-BNET87698\",\"referencia\":\"USD-0098076680\",\"concepto\":\"USD-0098076680 INTERNET PAGO 1\"},{\"saldo\":2701.49,\"fecha\":\"18/11/2014\",\"abono\":\"\",\"cargo\":523.66,\"observaciones\":\"USD-BNET87699\",\"referencia\":\"USD-0098076681\",\"concepto\":\"USD-0098076681 INTERNET PAGO 2\"},{\"saldo\":2177.83,\"fecha\":\"18/11/2014\",\"abono\":2500,\"cargo\":\"\",\"observaciones\":\"USD-BNET87700\",\"referencia\":\"USD-0098076682\",\"concepto\":\"USD-0098076682 INTERNET ABONO 1\"},{\"saldo\":4677.83,\"fecha\":\"19/11/2014\",\"abono\":\"\",\"cargo\":1600,\"observaciones\":\"USD-BNET87701\",\"referencia\":\"USD-0098076683\",\"concepto\":\"USD-0098076683 INTERNET PAGO 3\"},{\"saldo\":3077.83,\"fecha\":\"19/11/2014\",\"abono\":\"\",\"cargo\":259.07,\"observaciones\":\"USD-BNET87702\",\"referencia\":\"USD-0098076684\",\"concepto\":\"USD-0098076684 INTERNET PAGO 4\"},{\"saldo\":2818.76,\"fecha\":\"20/11/2014\",\"abono\":3000,\"cargo\":\"\",\"observaciones\":\"USD-BNET87703\",\"referencia\":\"USD-0098076685\",\"concepto\":\"USD-0098076685 INTERNET ABONO 2\"},{\"saldo\":5818.76,\"fecha\":\"21/11/2014\",\"abono\":200,\"cargo\":\"\",\"observaciones\":\"USD-BNET87704\",\"referencia\":\"USD-0098076686\",\"concepto\":\"USD-0098076686 INTERNET ABONO 3\"},{\"saldo\":6018.76,\"fecha\":\"21/11/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"USD-BNET87705\",\"referencia\":\"USD-0098076687\",\"concepto\":\"USD-0098076687 INTERNET PAGO 5\"}]}}}";
						break;
					case 2:
						resp = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"MEXICO\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3000,\"fecha\":\"12/10/2014\",\"abono\":200.95,\"cargo\":\"\",\"observaciones\":\"USD-BNET87696\",\"referencia\":\"USD-0098076678\",\"concepto\":\"USD-0098076678 INTERNET TRASPASO\"},{\"saldo\":3200.95,\"fecha\":\"14/10/2014\",\"abono\":500.54,\"cargo\":\"\",\"observaciones\":\"USD-BNET87697\",\"referencia\":\"USD-0098076679\",\"concepto\":\"USD-0098076679 ALQUILER TRASPASO\"},{\"saldo\":3701.49,\"fecha\":\"15/10/2014\",\"abono\":\"\",\"cargo\":1000,\"observaciones\":\"USD-BNET87698\",\"referencia\":\"USD-0098076680\",\"concepto\":\"USD-0098076680 INTERNET PAGO 1\"},{\"saldo\":2701.49,\"fecha\":\"18/10/2014\",\"abono\":\"\",\"cargo\":523.66,\"observaciones\":\"USD-BNET87699\",\"referencia\":\"USD-0098076681\",\"concepto\":\"USD-0098076681 INTERNET PAGO 2\"},{\"saldo\":2177.83,\"fecha\":\"18/10/2014\",\"abono\":2500,\"cargo\":\"\",\"observaciones\":\"USD-BNET87700\",\"referencia\":\"USD-0098076682\",\"concepto\":\"USD-0098076682 INTERNET ABONO 1\"},{\"saldo\":4677.83,\"fecha\":\"19/10/2014\",\"abono\":\"\",\"cargo\":1600,\"observaciones\":\"USD-BNET87701\",\"referencia\":\"USD-0098076683\",\"concepto\":\"USD-0098076683 INTERNET PAGO 3\"},{\"saldo\":3077.83,\"fecha\":\"19/10/2014\",\"abono\":\"\",\"cargo\":259.07,\"observaciones\":\"USD-BNET87702\",\"referencia\":\"USD-0098076684\",\"concepto\":\"USD-0098076684 INTERNET PAGO 4\"},{\"saldo\":2818.76,\"fecha\":\"20/10/2014\",\"abono\":3000,\"cargo\":\"\",\"observaciones\":\"USD-BNET87703\",\"referencia\":\"USD-0098076685\",\"concepto\":\"USD-0098076685 INTERNET ABONO 2\"},{\"saldo\":5818.76,\"fecha\":\"21/10/2014\",\"abono\":200,\"cargo\":\"\",\"observaciones\":\"USD-BNET87704\",\"referencia\":\"USD-0098076686\",\"concepto\":\"USD-0098076686 INTERNET ABONO 3\"},{\"saldo\":6018.76,\"fecha\":\"21/10/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"USD-BNET87705\",\"referencia\":\"USD-0098076687\",\"concepto\":\"USD-0098076687 INTERNET PAGO 5\"}]}}}";
						break;
					default:
						break;
				}
				 
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error movimientosCtasUSD: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}
    
    private ServerResponse movimientosTDC(Hashtable<String, String> params) {
    	ServerResponse respuesta = new ServerResponse();

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = null;
				JSONObject jsonDatosAplicativos = (new JSONObject(params.get("cadenaJSON"))).getJSONObject("datosAplicativos");
				int periodo = jsonDatosAplicativos.getInt("periodo");
				switch (periodo) {
					case 0:
						resp = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"numero_tarjeta\":\"4101810425430610\",\"indicadoFueraDeHorario\":false,\"movimientos\":{\"ListaMovimientos\":[{\"importe_operacion\":3000,\"fecha\":\"06/12/2014\",\"titulo\":\"USD-BNET87696\",\"referencia\":\"TDC-0098076678\",\"concepto\":\"TDC-0098076678 INGRESO TDC\"}," +
						  "{\"importe_operacion\":3000,\"fecha\":\"08/12/2014\",\"titulo\":\"TDC-BNET87697\",\"referencia\":\"TDC-0098076679\",\"concepto\":\"TDC-0098076679 INGRESO TDC\"}," +
						  "{\"importe_operacion\":-500,\"fecha\":\"10/12/2014\",\"titulo\":\"TDC-BNET87698\",\"referencia\":\"TDC-0098076680\",\"concepto\":\"TDC-0098076680 PAGO TDC\"}," +
						  "{\"importe_operacion\":2500,\"fecha\":\"12/12/2014\",\"titulo\":\"TDC-BNET87699\",\"referencia\":\"TDC-0098076681\",\"concepto\":\"TDC-0098076681 INGRESO TDC\"}," +
						  "{\"importe_operacion\":-300,\"fecha\":\"12/12/2014\",\"titulo\":\"TDC-BNET87700\",\"referencia\":\"TDC-0098076682\",\"concepto\":\"TDC-0098076682 TRASPASO TDC\"}," +
						  "{\"importe_operacion\":-3000,\"fecha\":\"13/12/2014\",\"titulo\":\"TDC-BNET87701\",\"referencia\":\"TDC-0098076683\",\"concepto\":\"TDC-0098076683 TRASPASO TDC\"}," +
						  "{\"importe_operacion\":1500,\"fecha\":\"14/12/2014\",\"titulo\":\"TDC-BNET87702\",\"referencia\":\"TDC-0098076684\",\"concepto\":\"TDC-0098076684 INGRESO TDC\"}," +
						  "{\"importe_operacion\":-30,\"fecha\":\"15/12/2014\",\"titulo\":\"TDC-BNET87703\",\"referencia\":\"TDC-0098076685\",\"concepto\":\"TDC-0098076685 TRASPASO TDC\"}," +
						  "{\"importe_operacion\":-600,\"fecha\":\"15/12/2014\",\"titulo\":\"TDC-BNET87704\",\"referencia\":\"TDC-0098076686\",\"concepto\":\"TDC-0098076686 TRASPASO TDC\"}," +
						  "{\"importe_operacion\":550,\"fecha\":\"15/12/2014\",\"titulo\":\"TDC-BNET87705\",\"referencia\":\"TDC-0098076687\",\"concepto\":\"TDC-0098076687 INGRESO TDC\"}]}}}";
						break;
					case 1:
						resp = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"numero_tarjeta\":\"4101810425430610\",\"indicadoFueraDeHorario\":false,\"movimientos\":{\"ListaMovimientos\":[{\"importe_operacion\":3000,\"fecha\":\"12/11/2014\",\"titulo\":\"TDC-BNET87696\",\"referencia\":\"TDC-0098076678\",\"concepto\":\"TDC-0098076678 INGRESO TDC\"},{\"importe_operacion\":3000,\"fecha\":\"12/11/2014\",\"titulo\":\"TDC-BNET87697\",\"referencia\":\"TDC-0098076679\",\"concepto\":\"TDC-0098076679 INGRESO TDC\"},{\"importe_operacion\":-500,\"fecha\":\"13/11/2014\",\"titulo\":\"TDC-BNET87698\",\"referencia\":\"TDC-0098076680\",\"concepto\":\"TDC-0098076680 PAGO TDC\"},{\"importe_operacion\":2500,\"fecha\":\"14/11/2014\",\"titulo\":\"TDC-BNET87699\",\"referencia\":\"TDC-0098076681\",\"concepto\":\"TDC-0098076681 INGRESO TDC\"},{\"importe_operacion\":-300,\"fecha\":\"15/11/2014\",\"titulo\":\"TDC-BNET87700\",\"referencia\":\"TDC-0098076682\",\"concepto\":\"TDC-0098076682 TRASPASO TDC\"},{\"importe_operacion\":-3000,\"fecha\":\"15/11/2014\",\"titulo\":\"TDC-BNET87701\",\"referencia\":\"TDC-0098076683\",\"concepto\":\"TDC-0098076683 TRASPASO TDC\"},{\"importe_operacion\":1500,\"fecha\":\"17/11/2014\",\"titulo\":\"TDC-BNET87702\",\"referencia\":\"TDC-0098076684\",\"concepto\":\"TDC-0098076684 INGRESO TDC\"},{\"importe_operacion\":-30,\"fecha\":\"18/11/2014\",\"titulo\":\"TDC-BNET87703\",\"referencia\":\"TDC-0098076685\",\"concepto\":\"TDC-0098076685 TRASPASO TDC\"},{\"importe_operacion\":-600,\"fecha\":\"18/11/2014\",\"titulo\":\"TDC-BNET87704\",\"referencia\":\"TDC-0098076686\",\"concepto\":\"TDC-0098076686 TRASPASO TDC\"},{\"importe_operacion\":550,\"fecha\":\"18/11/2014\",\"titulo\":\"TDC-BNET87705\",\"referencia\":\"TDC-0098076687\",\"concepto\":\"TDC-0098076687 INGRESO TDC\"}]}}}";
						break;
					case 2:
						resp = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"numero_tarjeta\":\"4101810425430610\",\"indicadoFueraDeHorario\":false,\"movimientos\":{\"ListaMovimientos\":[{\"importe_operacion\":3000,\"fecha\":\"12/10/2014\",\"titulo\":\"TDC-BNET87696\",\"referencia\":\"TDC-0098076678\",\"concepto\":\"TDC-0098076678 INGRESO TDC\"},{\"importe_operacion\":3000,\"fecha\":\"12/10/2014\",\"titulo\":\"TDC-BNET87697\",\"referencia\":\"TDC-0098076679\",\"concepto\":\"TDC-0098076679 INGRESO TDC\"},{\"importe_operacion\":-500,\"fecha\":\"13/10/2014\",\"titulo\":\"TDC-BNET87698\",\"referencia\":\"TDC-0098076680\",\"concepto\":\"TDC-0098076680 PAGO TDC\"},{\"importe_operacion\":2500,\"fecha\":\"14/10/2014\",\"titulo\":\"TDC-BNET87699\",\"referencia\":\"TDC-0098076681\",\"concepto\":\"TDC-0098076681 INGRESO TDC\"},{\"importe_operacion\":-300,\"fecha\":\"15/10/2014\",\"titulo\":\"TDC-BNET87700\",\"referencia\":\"TDC-0098076682\",\"concepto\":\"TDC-0098076682 TRASPASO TDC\"},{\"importe_operacion\":-3000,\"fecha\":\"15/10/2014\",\"titulo\":\"TDC-BNET87701\",\"referencia\":\"TDC-0098076683\",\"concepto\":\"TDC-0098076683 TRASPASO TDC\"},{\"importe_operacion\":1500,\"fecha\":\"17/10/2014\",\"titulo\":\"TDC-BNET87702\",\"referencia\":\"TDC-0098076684\",\"concepto\":\"TDC-0098076684 INGRESO TDC\"},{\"importe_operacion\":-30,\"fecha\":\"18/10/2014\",\"titulo\":\"TDC-BNET87703\",\"referencia\":\"TDC-0098076685\",\"concepto\":\"TDC-0098076685 TRASPASO TDC\"},{\"importe_operacion\":-600,\"fecha\":\"18/10/2014\",\"titulo\":\"TDC-BNET87704\",\"referencia\":\"TDC-0098076686\",\"concepto\":\"TDC-0098076686 TRASPASO TDC\"},{\"importe_operacion\":550,\"fecha\":\"18/10/2014\",\"titulo\":\"TDC-BNET87705\",\"referencia\":\"TDC-0098076687\",\"concepto\":\"TDC-0098076687 INGRESO TDC\"}]}}}";
						break;
					default:
						break;
				}
						
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error movimientosTDC: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}
    
    private ServerResponse recuperaPeriodos(Hashtable<String, String> params) {
    	ServerResponse respuesta = new ServerResponse();

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{ \"respuesta\": { \"producto\":\"AH\" ,\"numero\":\"00743606822800009784\" ,\"periodos\": { \"ListaPeriodos\":[ {\"mes\":\"01\",\"anio\":\"2014\"} ,{\"mes\":\"02\",\"anio\":\"2014\"} ,{\"mes\":\"03\",\"anio\":\"2014\"} ,{\"mes\":\"04\",\"anio\":\"2014\"} ,{\"mes\":\"05\",\"anio\":\"2014\"} ,{\"mes\":\"06\",\"anio\":\"2014\"} ,{\"mes\":\"07\",\"anio\":\"2014\"} ,{\"mes\":\"08\",\"anio\":\"2014\"} ,{\"mes\":\"09\",\"anio\":\"2014\"} ,{\"mes\":\"10\",\"anio\":\"2014\"} ,{\"mes\":\"11\",\"anio\":\"2014\"}] } } ,\"s_lit_idioma\":\"CAS\"}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaPeriodos: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}
    
    private ServerResponse consultaEstadoDeCuenta(Hashtable<String, String> params) {
    	ServerResponse respuesta = new ServerResponse();

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"respuesta\":{\"fechaDeConsulta\":\"13/10/2011\",\"numero\":\"00743606822800009784\",\"periodoConsultado\":\"08/2011\",\"parametros\":{\"ListaParametros\":[{\"valorParametro\":\"BAN2O02\",\"nombreParametro\":\"OPERACION\"},{\"valorParametro\":\"es_ES\",\"nombreParametro\":\"LOCALE\"},{\"valorParametro\":\"GNHTTRW5B8URKZNDYNML9UZPRHUFHTWEUH7BSE\",\"nombreParametro\":\"PAR_INICIO.0\"},{\"valorParametro\":\"1\",\"nombreParametro\":\"PAR_INICIO.1\"},{\"valorParametro\":\"000040002\",\"nombreParametro\":\"sesionID\"}]},\"horaDeConsulta\":\"2:26:42 AM\",\"formatoConsultado\":\"pdf\",\"recursoWEB\":\"http://viewerjs.org/ViewerJS/#../demo/ohm2013.odp\"},\"s_lit_idioma\":\"CAS\"}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error consultaEstadoDeCuenta: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}    
    
    
/*ESTADO DE CUENTA*/
    private ServerResponse estadoDeCuenta(Hashtable<String, String> params) {
    	ServerResponse respuesta = new ServerResponse();

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"respuesta\":{\"fechaDeConsulta\":\"13/10/2011\",\"numero\":\"00743606822800009784\",\"periodoConsultado\":\"08/2011\",\"parametros\":{\"ListaParametros\":[{\"valorParametro\":\"BAN2O02\",\"nombreParametro\":\"OPERACION\"},{\"valorParametro\":\"es_ES\",\"nombreParametro\":\"LOCALE\"},{\"valorParametro\":\"GNHTTRW5B8URKZNDYNML9UZPRHUFHTWEUH7BSE\",\"nombreParametro\":\"PAR_INICIO.0\"},{\"valorParametro\":\"1\",\"nombreParametro\":\"PAR_INICIO.1\"},{\"valorParametro\":\"000040002\",\"nombreParametro\":\"sesionID\"}]},\"horaDeConsulta\":\"2:26:42 AM\",\"formatoConsultado\":\"pdf\",\"recursoWEB\":\"http://viewerjs.org/ViewerJS/#../demo/ohm2013.odp\"},\"s_lit_idioma\":\"CAS\"}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CUENTA);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error EstadoDeCuenta: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	} 
    
    
    /*ESTADO DE CUETNA*/
    private ServerResponse recuperaOperaciones(Hashtable<String, String> params) {
    	ServerResponse respuesta = new ServerResponse();

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\":\"\",\"respuesta\":{	\"lcMovimientos\":[{		\"folio\":\"33333\",		\"horaOperacion\":\"10:37\",		\"cuentaPrimaria\":\"0104956494\",		\"usuario\":\"ADMINF\", 		\"cuentaAsociada\": \"0035241\",		\"importe\":\"100\",		\"Divisa\":\"MXP\",		\"fechaOperacion\":\"2011-11-09\",		\"referenciaOpcional\":\"\",		\"funcionAsociada\":\"I380\",		\"referencia2\":\"\",		\"referencia1\":\"\",		\"descripcionOperacion\":\"PAGO CIE FUNCION GLOBAL-GENERAL.\"	},	{		\"folio\":\"2222\",		\"horaOperacion\":\"11:37\",		\"cuentaPrimaria\":\"0104956494\",		\"usuario\":\"ADMINF\", 		\"cuentaAsociada\": \"0035241\",		\"importe\":\"100\",		\"Divisa\":\"MXP\",		\"fechaOperacion\":\"2011-11-09\",		\"referenciaOpcional\":\"\",		\"funcionAsociada\":\"I380\",		\"referencia2\":\"\",		\"referencia1\":\"\",		\"descripcionOperacion\":\"PAGO CIE.\"	},	{		\"folio\":\"2323222\",		\"horaOperacion\":\"12:37\",		\"cuentaPrimaria\":\"0104956494\",		\"usuario\":\"ADMINF\", 		\"cuentaAsociada\": \"0035241\",		\"importe\":\"100\",		\"Divisa\":\"MXP\",		\"fechaOperacion\":\"2011-11-09\",		\"referenciaOpcional\":\"\",		\"funcionAsociada\":\"I380\",		\"referencia2\":\"\",		\"referencia1\":\"\",		\"descripcionOperacion\":\"PAGO Cmp.\"	}] }}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}

    private ServerResponse aplicaCompraInversion(Hashtable<String, String> params) {
    	ServerResponse respuesta = new ServerResponse();

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}

    private ServerResponse aplicaVentaInversion(Hashtable<String, String> params) {
    	ServerResponse respuesta = new ServerResponse();

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\":\"CAS\",\"respuesta\":{\"folio\":\"005648005\",\"sello\":\"NKPS\",\"interesVto\":\"6\",\"sUrl\":\"url\",\"codigoCampania\":\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
				Log.w(Server.TAG, "Requested params: " + params.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				//nvpso.add(new BasicNameValuePair("cadenaJSON", "{\"proceso\":\"imd_inversiones_a_plazo_venta_pr\",\"accion\":\"cancelaTitulo\",\"operacion\":\"imd_inversiones_a_plazo_venta_op\",\"datosAplicativos\":{\"importe\":\"2000.00\",\"tipoCliente\":\"AZUL\",\"titulo\":\"3\",\"usuario\":\"ADMINF\",\"claveOperaciones\":\"00000000\",\"importeInversion\":\"2000.00\",\"digitoVerificador\":\"\",\"acceso\":4152312171293605,\"otp\":\"\",\"cuenta\":\"00743606822800009784-IN\",\"tripletaTasa\":\"\",\"ctaAbono\":\"00743606822800009784-AH\",\"interes\":\"}}"));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}
    
	private ServerResponse recuperaTasaInvertirConsultar(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"respuesta\": { \"tasa\": \"0.82\", \"interes\": \"0.14\", \"gat\": \"0.82\"}, \"s_lit_idioma\": \"CAS\"}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaPeriodos: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}

	private ServerResponse registraTraspasoMisCuentas(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"respuesta\":{\"tipoTraspaso\":\"tt\",\"horaOperacion\":\"10:37\",\"folioInternet\":\"12345\",\"listaMensajes\": [{\"mensaje\":\"mensaje1\", \"codigo\":\"codigo1\"},{\"mensaje\":\"mensaje2\", \"codigo\":\"codigo2\"} ],\"fechaOperacion\":\"2015-01-12\"},\"s_tipo_firma\":\"0\",\"s_lit_idioma\":\"CAS\"}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaPeriodos: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	 
	private ServerResponse pagoMinimoNoInteres(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"CAS\", \"respuesta\": {\"nombre_tarjetahabiente\": \"\", \"tipo_tarjeta\": \"\",\"numero_de_tarjeta\":\"\", \"fecha_pagar_antes_de\":\"\",\"saldo_nuevo\":\"\", \"pago_minimo\": \"\", \"pago_para_no_generar_intereses\": \"500\", \"limite_credito\": \"\", \"credito_disponible\": \"\", \"fecha_de_corte\": \"\", \"dias_trascurrido_en_el_ciclo\": \"\", \"saldo_promedio\":\"\", \"tasa_mensual\":\"\", \"monto_aclaracion\": \"\", \"id_titulo_monto_en_aclaracion\": \"\", \"monto_compras_diferidas\": \"\", \"listaTextosCENEFA\": {\"texto_cenefa\": \"\"}, \"saldo_vencido\": \"\", \"saldo_anterior\": \"\", \"pagos\": \"\", \"otros_abonos\": \"\", \"rendimiento\": \"\", \"compras\": \"\", \"otros_cargos\": \"\", \"disposicion_efectivo\": \"\", \"interes_sin_iva\": \"\", \"id_leyenda_intereses\": \"\", \"iva\": \"\", \"saldo_disponible\": \"\", \"ListaMovimientosTDC\": \"null\", \"puntos_nombre_del_programa\": \"\", \"puntos_saldo_anterior\": \"\", \"puntos_utilizados_transferidos\": \"\", \"puntos_vencidos\": \"\",\"puntos_saldo_nuevo\": \"\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaPeriodos: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}


	private ServerResponse solicitaComision(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"CAS\", \"respuesta\": {\"comisionDisposicion\": \"20.55\", \"listaMensajes\": {\"codigoMensaje\": \"###\", \"mensaje\": \"Texto mensaje\"}}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaPeriodos: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}
	
	private ServerResponse recuperaListasFrecuentesPreregistradasBBVA(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\":\"\",\"respuesta\": {          \"listaTraspasos\":[  {   \"id\": \"FRTT000010\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456754545330003\",   \"tipoCuenta\": \"AH\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000020\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789018875455\",   \"tipoCuenta\": \"LI\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },{   \"id\": \"FRTT000032\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"87845412345664598\",   \"tipoCuenta\": \"CH\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000043\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789012989854\",   \"tipoCuenta\": \"TC\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },{   \"id\": \"FRTT000054\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"12345678909879871\",   \"tipoCuenta\": \"LI\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000065\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789018787545484\",   \"tipoCuenta\": \"TC\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  }]      }}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaListasFrecuentes: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	
	private ServerResponse consultaBeneficiarioCtaBBVA(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": {  \"asunto\": \"2900001147\",  \"nombreBeneficiario\": \"MARIA\",  \"apellidoPaterno\": \"SAAVEDRA\",     \"apellidoMaterno\": \"GONZALEZ\" ,            \"indicadorClienteBnet\": \"1\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error consultaBeneficiarioCtaBBVA: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	
	private ServerResponse preregistrarCuentaBBVA(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\":\"CAS\", \"respuesta\": {\"folioInternetRegistro\": \"12345667AB\"}}";

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error consultaBeneficiarioCtaBBVA: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	
	
	private ServerResponse preregistrarCuentaInter(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\":\"CAS\", \"respuesta\": {\"folioInternet\": \"12345667AB\"}}";

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error preregistro interbancaria: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}

	private ServerResponse cargaPreregistroCuentaBBVA(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": { \"idPreregistro\": \"RGTT000000\",  \"codigoBanco\": \"\" }}";

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error cargaPreregistroCuentaBBVA: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	
	
	
	private ServerResponse cargaPreregistroInterbancarias(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": { \"idPreregistro\": \"RGTT000000\",  \"codigoBanco\": \"\" }}";

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error cargaPreregistro interbancarias: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	
	
	


	
	
	
	
	

	private ServerResponse realizarTraspasoCuentaBBVA(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": {\"fechaOperacion\": \"111009\",\"fechaValor\":\"01-01-2011\",\"folioInternet\": \"12345678\",\"folioTelebanco\": \"12345678\",\"listaMensajes\":[{\"codigo\":\"CHUSD0000001\",\"mensaje\":\"Mensaje informativo 1\"}, {\"codigo\":\"CHUSD0000001\",\"mensaje\":\"Mensaje informativo 2\"}]}}";

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error realizarTraspasoCuentaBBVA: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	
	
	private ServerResponse mostrarAlertCancelarTraspaso( Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			
			String resp = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": { \"opcion\": \"no\" }}";
			
			if (params.get("boton").equals("si")){
			
			 resp = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": { \"opcion\": \"si\" }}";
			 
			}

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());


		} catch (Exception ex) {
			Log.e(Server.TAG, "error mostrarAlertCancelarTraspaso: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	
	
	
	
	
	private ServerResponse realizarPermitirFrecuentes(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\":\"CAS\",\"respuesta\":{\"frecuentesPermitidos\":[{\"tipoTraspaso\":\"TT-CHUSDEUR\",\"hayLugarParaFrecuentes\":\"S\"},{\"tipoTraspaso\":\"TT-TPTC\",\"hayLugarParaFrecuentes\":\"S\"},{\"tipoTraspaso\":\"TT-CEXPRESS\",\"hayLugarParaFrecuentes\":\"S\"}]}}";

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error permitir frecuentes: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	
	private ServerResponse envioEmail(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\":\"CAS\",\"respuesta\":{  \"exitoEnvioMailPagador\":\"true\",\"exitoEnvioMailBeneficiario\":\"true\"}}";

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error envioEmail: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	
	private ServerResponse recuperaListasFrecuentesInterbancarias(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				
				String resp = "{\"s_lit_idioma\":\"\",\"respuesta\": {          \"listaTraspasos\":[  {   \"id\": \"FRTT000010\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456754545330003\",   \"tipoCuenta\": \"AH\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000020\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789018875455\",   \"tipoCuenta\": \"LI\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },{   \"id\": \"FRTT000032\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"87845412345664598\",   \"tipoCuenta\": \"CH\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000043\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789012989854\",   \"tipoCuenta\": \"TC\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },{   \"id\": \"FRTT000054\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"12345678909879871\",   \"tipoCuenta\": \"LI\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000065\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789018787545484\",   \"tipoCuenta\": \"TC\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  }]      }}";

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error envioEmail: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	
	private ServerResponse recuperaFestivos(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				
				String resp = "{\"s_lit_idioma\": \"CAS\",\"respuesta\": {\"diasFestivos\": \"01-01,06-01,12-10,01-11,06-12,08-12,25-12\",\"fechaPosterior\":\"30/12/2014\",\"firmasConjuntas\":\"NO\",\"dia\": \"25\",\"mes\": \"12\",\"anio\": \"2014\"}}";

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error envioEmail: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}
	
	
	
	private ServerResponse traspasoInterbancarias3(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				
				String resp = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": {\"fechaOperacion\": \"111009\",\"fechaValor\":\"01-01-2011\",\"folioInternet\": \"12345678\",\"folioTelebanco\": \"12345678\",\"listaMensajes\":[{\"codigo\":\"CHUSD0000001\",\"mensaje\":\"Mensaje informativo 1\"}, {\"codigo\":\"CHUSD0000001\",\"mensaje\":\"Mensaje informativo 2\"}]}}";

				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error envioEmail: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
	}
	
	private ServerResponse getServerMode() {
		ServerResponse respuesta = new ServerResponse();

		String serverModeAux = "";
		if (ServerModes.SIMULACION == Server.serverMode) {
			serverModeAux = "SIMULACION";
		} else if (ServerModes.TEST == Server.serverMode) {
			serverModeAux = "TEST";
		}

		String resp = "{\"serverMode\":\"" + serverModeAux + "\"}";

		respuesta.setJsonResultante(resp);
		respuesta.setEstado(EstadoRespuesta.Ok);
		Log.d(this.getClass().getName(), respuesta.toString());

		return respuesta;
	}
	
	
	private ServerResponse recuperaListaTitulos(Hashtable<String, String> params) {
   		ServerResponse respuesta = new ServerResponse();
   		
   		Log.v(this.getClass().getName(), params.toString());

		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = " {\"s_lit_idioma\":\"CAS\",\"respuesta\":{  \"tipoCliente\":\"\",\"listaTitulos\":[{\"numeroCuenta\":\"00743445001344165802\",\"plazoReal\":\"D001\",\"importeInversion\":\"15002.1\",\"numeroInversion\":\"4258\",\"interesBrutoPagar\":\"0.54\",\"impuestosRetenidos\":\"0.24\",	  \"tasaAplicada\":\"1.31\",	  \"fechaVencimiento\":\"2014-12-24\",	  \"instruccionPagoInteres\":\"2\",	  \"instruccionPagoCapital\":\"2\"},{\"numeroCuenta\":\"00743445001344164278\",	  \"plazoReal\":\"D002\",	  \"importeInversion\":\"1231.1\",	  \"numeroInversion\":\"1123\",	  \"interesBrutoPagar\":\"0.12\",	  \"impuestosRetenidos\":\"0.14\",	  \"tasaAplicada\":\"3.31\",	  \"fechaVencimiento\":\"2014-11-24\",	  \"instruccionPagoInteres\":\"3\",	  \"instruccionPagoCapital\":\"3\"},{\"numeroCuenta\":\"00743445001344174596\",	\"plazoReal\":\"D001\",\"importeInversion\":\"3435.1\",	  \"numeroInversion\":\"7665\",	  \"interesBrutoPagar\":\"0.95\",	  \"impuestosRetenidos\":\"0.01\",	  \"tasaAplicada\":\"2.21\",	  \"fechaVencimiento\":\"2014-12-01\",	  \"instruccionPagoInteres\":\"4\",	  \"instruccionPagoCapital\":\"4\"              },{            	  \"numeroCuenta\":\"00743445001344365124\",	  \"plazoReal\":\"D003\",	  \"importeInversion\":\"4567.1\",	  \"numeroInversion\":\"9787\",	  \"interesBrutoPagar\":\"0.12\",	  \"impuestosRetenidos\":\"0.09\",	  \"tasaAplicada\":\"2.22\",	  \"fechaVencimiento\":\"2014-12-12\",	  \"instruccionPagoInteres\":\"1\",	  \"instruccionPagoCapital\":\"1\"              }],\"listaCuentasPago\":[{	  \"tipoCuenta\":\"CH\",	  \"numeroCuenta\":\"00743445000450083933\",	  \"saldoDisponible\":\"4099.45\"},{	  \"tipoCuenta\":\"AH\",	  \"numeroCuenta\":\"00743445000450083000\",	  \"saldoDisponible\":\"199.342\"},{	  \"tipoCuenta\":\"LI\",	  \"numeroCuenta\":\"00743445000450083111\",	  \"saldoDisponible\":\"123\"},{	  \"tipoCuenta\":\"TC\",	  \"numeroCuenta\":\"00743445000450083222\", \"saldoDisponible\":\"9876.32\"} ]}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				   
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaPeriodos: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		
		return respuesta;
   	}
	
	//************************************************************************************************************************************************
	// ******************************************INTEGRACION WEB TRADER*******************************************************************************
	/*INTERNET*/
	
	private ServerResponse internet(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		
		try {

				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			
		} catch (JSONException jse) {
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG,"error recuperaOperacionesInternet: " + ex.getLocalizedMessage());
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
	
	
	private ServerResponse consultaTipoServicio(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);
				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));
				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch (JSONException jse) {
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG,"error recuperaOperaciones: " + ex.getLocalizedMessage());
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
	
	private ServerResponse consultaContratosPatrimoniales(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);

				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));

				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
	
	private ServerResponse consultaDetalleDeInversion(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampana\":\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);

				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));

				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
	
	private ServerResponse consultaCapitales(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);

				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));

				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
	
	private ServerResponse cancelaOrden(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);

				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));

				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
	
	private ServerResponse detalleOrden(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);

				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));

				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
	
	private ServerResponse envioCorreoCompraVenta(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);

				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));

				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
		
	private ServerResponse realizaCompraVenta(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);

				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));

				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
	

	
	private ServerResponse envioCorreoCancelacion(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);

				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));

				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
	
		private ServerResponse listaCuentasEfectivo(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�:\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);

				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));

				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
	
	private ServerResponse AplicaTraspasoEfectivo(Hashtable<String, String> params) {
		ServerResponse respuesta = new ServerResponse();
		try {
			if (ServerModes.SIMULACION == Server.serverMode) {// Respuesta simulada 
				String resp = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�:\"DEMO-CODE\"}}";
				respuesta.setJsonResultante(resp);
				respuesta.setEstado(EstadoRespuesta.Ok);
				Log.d(this.getClass().getName(), respuesta.toString());
			} else {
				HttpPost httpPost = initPostRequest(Server.BURL_CBTF);

				List<NameValuePair> nvpso = new ArrayList<NameValuePair>();
				nvpso.add(new BasicNameValuePair("cadenaJSON", params.get("cadenaJSON")));
				httpPost.setEntity(new UrlEncodedFormEntity(nvpso, HTTP.UTF_8));

				logURl(httpPost, nvpso);
				verifyServerResponse(respuesta, httpPost);
			}
		} catch(JSONException jse){
			respuesta.setEstado(EstadoRespuesta.Fail);
			respuesta.setMensaje(Server.JSON_EXCEPTION);
		} catch (Exception ex) {
			Log.e(Server.TAG, "error recuperaOperaciones: " + ex.getLocalizedMessage() );
			throw new RuntimeException(ex.getMessage());
		}
		return respuesta;
	}
	

	//***************************************************************************************************************************************	
	
}
