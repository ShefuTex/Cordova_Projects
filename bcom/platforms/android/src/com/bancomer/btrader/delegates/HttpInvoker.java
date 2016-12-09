package com.bancomer.btrader.delegates;

/**
 * Created by giovannivalenciagarcia on 08/12/16.
 */
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

import android.util.Log;
import android.view.KeyEvent;

import com.bancomer.btrader.BCom;
import com.bancomer.btrader.persistence.MySSLSocketFactory;
import com.bancomer.btrader.persistence.ServerResponse;
import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;
import com.bancomer.btrader.session.Session;
import com.bancomer.btrader.utils.Utilerias;

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
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.security.KeyStore;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import com.bancomer.btrader.R;

public class HttpInvoker {
    private static HttpInvoker laInstancia = null;
    private SharedBcomPreferences sbcp = null;
    private static DefaultHttpClient httpclient;
    private int peticionesFallidas = 0;
    private static Server.InstrumentoDeSeguridad instrumentoDeSeguridad;
    private static final boolean HAS_MXP_ACCOUNTS = true;
    private static final boolean HAS_USD_ACCOUNTS = true;
    private static final boolean HAS_CREDIT_CARDS = true;
    private static final String MXP_ACCOUNTS = "[{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000001\",\"saldo_disponible\":931686.44,\"divisa\":\"MXP\",\"alias\":\"CHEQUES\",\"ind_adicional\":\"no\",\"numero\":\"00740349001289232796\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":50000},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000002\",\"saldo_disponible\":757817.02,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740349002797036248\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000003\",\"saldo_disponible\":1067688.82,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740349002797043864\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000004\",\"saldo_disponible\":920512.24,\"divisa\":\"MXP\",\"alias\":\"PDF\",\"ind_adicional\":\"no\",\"numero\":\"00745417001134399544\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000005\",\"saldo_disponible\":113822.9,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00746362002900071048\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000006\",\"saldo_disponible\":135233915.22,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740010000178294828\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000007\",\"saldo_disponible\":68658.2,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740069000106834655\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000008\",\"saldo_disponible\":496838.94,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740357000102880008\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000009\",\"saldo_disponible\":990292817.07,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00743616000101448234\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000010\",\"saldo_disponible\":550330.46,\"divisa\":\"MXP\",\"alias\":\"CUENTA EJE\",\"ind_adicional\":\"no\",\"numero\":\"00743616000178527423\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000011\",\"saldo_disponible\":883637658.9,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00746362000178362440\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000012\",\"saldo_disponible\":1722171.8,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00741051002635628210\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000013\",\"saldo_disponible\":993048504.62,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00743616002700694533\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000014\",\"saldo_disponible\":1994774.68,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00743616002900018767\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000015\",\"saldo_disponible\":1989157.97,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00746362002900015156\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0}]";
    private static final String CREDIT_CARDS = "[{\"ind_mancomunada\":\"no\",\"saldofecha\":31994.95,\"id\":\"TCMXP0000001\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":0,\"numero\":4101810425430610,\"saldocorte\":15255.05,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":23141.07,\"id\":\"TCMXP0000002\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":1093.9,\"numero\":4101810586637417,\"saldocorte\":19277.31,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":-2678.98,\"id\":\"TCMXP0000003\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":150,\"numero\":4180900200001894,\"saldocorte\":433.02,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":-23733,\"id\":\"TCMXP0000004\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":537.5,\"numero\":4555000874916134,\"saldocorte\":7861.64,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":28946.15,\"id\":\"TCMXP0000005\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":2881.4,\"numero\":5224980106266168,\"saldocorte\":8581.15,\"tipo\":\"TC\"}]";
    private static final String USD_ACCOUNTS = "[{\"ind_mancomunada\":\"no\",\"id\":\"CHUSD0000001\",\"saldo_disponible\":209025.7,\"divisa\":\"USD\",\"alias\":\"\",\"ind_adicional\":\"no\",\"plaza\":\"MEXICO\",\"numero\":\"00740010000178611246\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHUSD0000002\",\"saldo_disponible\":1003614956.7,\"divisa\":\"USD\",\"alias\":\"0105009324\",\"ind_adicional\":\"no\",\"plaza\":\"MEXICO\",\"numero\":\"00743616000105009324\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CAUSD0000001\",\"saldo_disponible\":-54576.64,\"divisa\":\"USD\",\"alias\":\"\",\"ind_adicional\":\"no\",\"plaza\":\"HOUSTON\",\"numero\":\"00740001008000751116\",\"tipo\":\"CA\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CAUSD0000002\",\"saldo_disponible\":0,\"divisa\":\"USD\",\"alias\":\"\",\"ind_adicional\":\"no\",\"plaza\":\"HOUSTON\",\"numero\":\"00740001008000751132\",\"tipo\":\"CA\",\"saldo_salvobuencobro\":0}]";
    private static final String ACCOUNTS_JSON = "\"asuntos\":{\"lista_cuentas_mxp\":%s,\"lista_cuentas_usd\":%s,\"lista_tarjetascredito\":%s,\"lista_inversiones_usd\":null,\"lista_fondosinversion_mxp\":null,\"lista_cuentas_eur\":null,\"lista_tarjetaprepagada\":null,\"lista_inversiones_mxp\":null}";
    private static final String CURRENT_ACCOUNTS;
    private static final KeyEvent KEYCODE_BACK;

    static {
        instrumentoDeSeguridad = Server.InstrumentoDeSeguridad.DP270;
        CURRENT_ACCOUNTS = String.format("\"asuntos\":{\"lista_cuentas_mxp\":%s,\"lista_cuentas_usd\":%s,\"lista_tarjetascredito\":%s,\"lista_inversiones_usd\":null,\"lista_fondosinversion_mxp\":null,\"lista_cuentas_eur\":null,\"lista_tarjetaprepagada\":null,\"lista_inversiones_mxp\":null}", new Object[]{"[{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000001\",\"saldo_disponible\":931686.44,\"divisa\":\"MXP\",\"alias\":\"CHEQUES\",\"ind_adicional\":\"no\",\"numero\":\"00740349001289232796\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":50000},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000002\",\"saldo_disponible\":757817.02,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740349002797036248\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000003\",\"saldo_disponible\":1067688.82,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740349002797043864\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000004\",\"saldo_disponible\":920512.24,\"divisa\":\"MXP\",\"alias\":\"PDF\",\"ind_adicional\":\"no\",\"numero\":\"00745417001134399544\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"AHMXP0000005\",\"saldo_disponible\":113822.9,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00746362002900071048\",\"tipo\":\"AH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000006\",\"saldo_disponible\":135233915.22,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740010000178294828\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000007\",\"saldo_disponible\":68658.2,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740069000106834655\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000008\",\"saldo_disponible\":496838.94,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00740357000102880008\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000009\",\"saldo_disponible\":990292817.07,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00743616000101448234\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000010\",\"saldo_disponible\":550330.46,\"divisa\":\"MXP\",\"alias\":\"CUENTA EJE\",\"ind_adicional\":\"no\",\"numero\":\"00743616000178527423\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHMXP0000011\",\"saldo_disponible\":883637658.9,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00746362000178362440\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000012\",\"saldo_disponible\":1722171.8,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00741051002635628210\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000013\",\"saldo_disponible\":993048504.62,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00743616002700694533\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000014\",\"saldo_disponible\":1994774.68,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00743616002900018767\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"LIMXP0000015\",\"saldo_disponible\":1989157.97,\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"numero\":\"00746362002900015156\",\"tipo\":\"LI\",\"saldo_salvobuencobro\":0}]", "[{\"ind_mancomunada\":\"no\",\"id\":\"CHUSD0000001\",\"saldo_disponible\":209025.7,\"divisa\":\"USD\",\"alias\":\"\",\"ind_adicional\":\"no\",\"plaza\":\"MEXICO\",\"numero\":\"00740010000178611246\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CHUSD0000002\",\"saldo_disponible\":1003614956.7,\"divisa\":\"USD\",\"alias\":\"0105009324\",\"ind_adicional\":\"no\",\"plaza\":\"MEXICO\",\"numero\":\"00743616000105009324\",\"tipo\":\"CH\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CAUSD0000001\",\"saldo_disponible\":-54576.64,\"divisa\":\"USD\",\"alias\":\"\",\"ind_adicional\":\"no\",\"plaza\":\"HOUSTON\",\"numero\":\"00740001008000751116\",\"tipo\":\"CA\",\"saldo_salvobuencobro\":0},{\"ind_mancomunada\":\"no\",\"id\":\"CAUSD0000002\",\"saldo_disponible\":0,\"divisa\":\"USD\",\"alias\":\"\",\"ind_adicional\":\"no\",\"plaza\":\"HOUSTON\",\"numero\":\"00740001008000751132\",\"tipo\":\"CA\",\"saldo_salvobuencobro\":0}]", "[{\"ind_mancomunada\":\"no\",\"saldofecha\":31994.95,\"id\":\"TCMXP0000001\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":0,\"numero\":4101810425430610,\"saldocorte\":15255.05,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":23141.07,\"id\":\"TCMXP0000002\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":1093.9,\"numero\":4101810586637417,\"saldocorte\":19277.31,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":-2678.98,\"id\":\"TCMXP0000003\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":150,\"numero\":4180900200001894,\"saldocorte\":433.02,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":-23733,\"id\":\"TCMXP0000004\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":537.5,\"numero\":4555000874916134,\"saldocorte\":7861.64,\"tipo\":\"TC\"},{\"ind_mancomunada\":\"no\",\"saldofecha\":28946.15,\"id\":\"TCMXP0000005\",\"divisa\":\"MXP\",\"alias\":\"\",\"ind_adicional\":\"no\",\"pagominimo\":2881.4,\"numero\":5224980106266168,\"saldocorte\":8581.15,\"tipo\":\"TC\"}]"});
        KEYCODE_BACK = null;
    }

    private HttpInvoker() {
        this.sbcp = SharedBcomPreferences.getInstance();
    }

    public static synchronized HttpInvoker getInstance() {
        if(laInstancia == null) {
            laInstancia = new HttpInvoker();
        }

        return laInstancia;
    }

    public ServerResponse doNetWorkOperation(Server.ServerOperation operation, Hashtable<String, String> params) {
        ServerResponse serverResponse = null;

        //TODO se elimina error al quitar el SWITCH_TABLE
        // $SWITCH_TABLE$com$bancomer$btrader$session$Server$ServerOperation()[operation.ordinal()]
        switch(operation.ordinal()) {
            case 1:
                serverResponse = this.conectarWebSeal(params);
                break;
            case 2:
                serverResponse = this.signOnOne(params);
                break;
            case 3:
                serverResponse = this.singOnToken(params);
                break;
            case 4:
                serverResponse = this.singOff(params);
                break;
            case 5:
                serverResponse = this.catalogoBancos(params);
                break;
            case 6:
                serverResponse = this.reglasDeNegocio(params);
            case 7:
            case 28:
            case 47:
            case 50:
            case 51:
            case 52:
            case 55:
            default:
                break;
            case 8:
                serverResponse = this.posicionGlobal(params);
                break;
            case 9:
                serverResponse = this.movimientosCtasCheques(params);
                break;
            case 10:
                serverResponse = this.movimientosCtasUSD(params);
                break;
            case 11:
                serverResponse = this.movimientosTDC(params);
                break;
            case 12:
                serverResponse = this.recuperaPeriodos(params);
                break;
            case 13:
                serverResponse = this.consultaEstadoDeCuenta(params);
                break;
            case 14:
                serverResponse = this.recuperaOperaciones(params);
                break;
            case 15:
                serverResponse = this.aplicaCompraInversion(params);
                break;
            case 16:
                serverResponse = this.aplicaVentaInversion(params);
                break;
            case 17:
                serverResponse = this.recuperaListaTitulos(params);
                break;
            case 18:
                serverResponse = this.recuperaTasaInvertirConsultar(params);
                break;
            case 19:
                serverResponse = this.pagoMinimoNoInteres(params);
                break;
            case 20:
                serverResponse = this.solicitaComision(params);
                break;
            case 21:
                serverResponse = this.registraTraspasoMisCuentas(params);
                break;
            case 22:
                serverResponse = this.recuperaListasFrecuentesPreregistradasBBVA(params);
                break;
            case 23:
                serverResponse = this.consultaBeneficiarioCtaBBVA(params);
                break;
            case 24:
                serverResponse = this.preregistrarCuentaBBVA(params);
                break;
            case 25:
                serverResponse = this.cargaPreregistroCuentaBBVA(params);
                break;
            case 26:
                serverResponse = this.realizarTraspasoCuentaBBVA(params);
                break;
            case 27:
                serverResponse = this.envioEmail(params);
                break;
            case 29:
                serverResponse = this.realizarPermitirFrecuentes(params);
                break;
            case 30:
                serverResponse = this.mostrarAlertCancelarTraspaso(params);
                break;
            case 31:
                serverResponse = this.recuperaListasFrecuentesInterbancarias(params);
                break;
            case 32:
                serverResponse = this.recuperaFestivos(params);
                break;
            case 33:
                serverResponse = this.traspasoInterbancarias3(params);
                break;
            case 34:
                serverResponse = this.preregistrarCuentaInter(params);
                break;
            case 35:
                serverResponse = this.cargaPreregistroInterbancarias(params);
                break;
            case 36:
                serverResponse = this.getServerMode();
                break;
            case 37:
                serverResponse = this.consultaTipoServicio(params);
                break;
            case 38:
                serverResponse = this.consultaTipoServicio(params);
                break;
            case 39:
                serverResponse = this.consultaContratosPatrimoniales(params);
                break;
            case 40:
                serverResponse = this.consultaDetalleDeInversion(params);
                break;
            case 41:
                serverResponse = this.consultaCapitales(params);
                break;
            case 42:
                serverResponse = this.cancelaOrden(params);
                break;
            case 43:
                serverResponse = this.detalleOrden(params);
                break;
            case 44:
                serverResponse = this.envioCorreoCompraVenta(params);
                break;
            case 45:
                serverResponse = this.realizaCompraVenta(params);
                break;
            case 46:
                serverResponse = this.envioCorreoCancelacion(params);
                break;
            case 48:
                serverResponse = this.listaCuentasEfectivo(params);
                break;
            case 49:
                serverResponse = this.AplicaTraspasoEfectivo(params);
                break;
            case 53:
                serverResponse = this.signOffWas();
                break;
            case 54:
                serverResponse = this.signOffWebseal();
                break;
            case 56:
                serverResponse = this.internet(params);
        }

        return serverResponse;
    }

    public static DefaultHttpClient getHttpClient() {
        if(httpclient == null) {
            if(Server.ServerModes.TEST != Server.serverMode && Server.ServerModes.PRODUCCION != Server.serverMode) {
                httpclient = new DefaultHttpClient();
            } else {
                try {
                    KeyStore e = KeyStore.getInstance(KeyStore.getDefaultType());
                    e.load((InputStream)null, (char[])null);
                    MySSLSocketFactory sf = new MySSLSocketFactory(e);
                    sf.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
                    BasicHttpParams params = new BasicHttpParams();
                    HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
                    HttpProtocolParams.setContentCharset(params, "UTF-8");
                    SchemeRegistry registry = new SchemeRegistry();
                    registry.register(new Scheme("http", PlainSocketFactory.getSocketFactory(), 80));
                    registry.register(new Scheme("https", sf, 443));
                    ThreadSafeClientConnManager ccm = new ThreadSafeClientConnManager(params, registry);
                    httpclient = new DefaultHttpClient(ccm, params);
                } catch (Exception var5) {
                    Log.w("BCOM", "Error al crear getHttpclient");
                    var5.printStackTrace();
                }
            }
        }

        return httpclient;
    }

    private void logURl(HttpPost httppost, List<NameValuePair> nvpso) {
        String temp = httppost.getURI().toString() + "?";
        if(nvpso != null) {
            for(int i = 0; i < nvpso.size(); ++i) {
                NameValuePair nameValuePair = (NameValuePair)nvpso.get(i);
                temp = temp + nameValuePair.getName() + "=" + nameValuePair.getValue() + (i < nvpso.size() - 1?"&":"");
            }
        }

        Log.w("BCOM", "Requested url_1: " + temp);
    }

    private ServerResponse conectarWebSeal(Hashtable<String, String> params) {
        String usr = (String)params.get("tarjeta");
        String password = (String)params.get("pwd");
        Server.ServerModes var10000 = Server.serverMode;
        var10000 = Server.ServerModes.TEST;
        ServerResponse respuesta = new ServerResponse();
        DefaultHttpClient httpclient = getHttpClient();
        String str = null;

        //TODO cambio de id por R.String list :
        /*

        DEC: 2131034121 - HEX : 7F050009 - STR: internet_error_message
        DEC: 2131034122 - HEX : 7F05000A - STR: authetication_failed
        DEC: 2131034123 - HEX : 7F05000B - STR: this_account_has_been_temporarily_locked
        DEC: 2131034124 - HEX : 7F05000C - STR:has_expired
        DEC: 2131034125 - HEX : 7F05000D - STR: bancomer_trader
        DEC: 2131034126 - HEX : 7F05000E - STR: authetication_mechanism
        DEC: 2131034127 - HEX : 7F05000F - STR: conexion

        * */

        try {
            this.conectaBalanceador();
            String ex = Session.getUrlWebseal();
            HttpPost httppost = new HttpPost(ex + "pkmslogin.form");
            String usuarioInvoca = "ADMINF";
            ArrayList nvps = new ArrayList();
            nvps.add(new BasicNameValuePair("username", usr + usuarioInvoca));
            nvps.add(new BasicNameValuePair("password", password));
            nvps.add(new BasicNameValuePair("login-form-type", "pwd"));
            httppost.setEntity(new UrlEncodedFormEntity(nvps, "UTF-8"));
            this.logURl(httppost, nvps);
            HttpResponse response = httpclient.execute(httppost);
            int codigo_http = response.getStatusLine().getStatusCode();
            System.out.print("Mario_codigo:  " + codigo_http);
            if(codigo_http >= 400) {
                respuesta.setEstado(Server.EstadoRespuesta.Fail);
                respuesta.setCodigoError("HTTP:" + codigo_http);
                respuesta.setMensaje(response.getStatusLine().getReasonPhrase());
                respuesta.setJsonResultante(Utilerias.crearJsonError(String.valueOf(codigo_http), respuesta.getMensaje()));
                ++this.peticionesFallidas;
            } else {
                this.peticionesFallidas = 0;
                HttpEntity entity = response.getEntity();
                List cookies = httpclient.getCookieStore().getCookies();
                if(cookies.isEmpty()) {
                    Log.d("BCOM", "No cookies");
                } else {
                    this.sbcp.setPreferencia("numerogalletas", String.valueOf(cookies.size()));

                    for(int i = 0; i < cookies.size(); ++i) {
                        Log.d("BCOM", "cookie: " + ((Cookie)cookies.get(i)).toString());
                        Session.setCookiePSesionId(((Cookie)cookies.get(i)).getValue().toString());
                        Cookie cc = (Cookie)cookies.get(i);
                        this.sbcp.setPreferencia("galletanombre_" + i, cc.getName());
                        this.sbcp.setPreferencia("galletavalor_" + i, cc.getValue());
                        this.sbcp.setPreferencia("galletaversion_" + i, String.valueOf(cc.getVersion()));
                        this.sbcp.setPreferencia("galletadominio_" + i, cc.getDomain());
                        this.sbcp.setPreferencia("galletapath_" + i, cc.getPath());
                    }

                    Log.i("BCOM", "Galletas guardadas:" + cookies.size());
                }

                str = Utilerias.inputStreamToString(entity.getContent()).toString();
                Log.i("BCOM", "Mensaje http invoker obtenido: " + str);
                if(str.contains("success")) {
                    respuesta.setEstado(Server.EstadoRespuesta.Ok);
                    respuesta.setMensaje("Success");
                } else if(str.contains("Temporalmente movido")) {
                    respuesta.setEstado(Server.EstadoRespuesta.Ok);
                } else if(str.contains("BA clients must exit their browser to properly terminate their session.")) {
                    respuesta.setEstado(Server.EstadoRespuesta.Ok);
                } else if(str.contains("PKMS Administration: User Log Out")) {
                    respuesta.setEstado(Server.EstadoRespuesta.Ok);
                } else if(str.contains("has logged out")) {
                    respuesta.setEstado(Server.EstadoRespuesta.Ok);
                } else if(str.contains("{ \"respuesta\":{ \"finDeSesion\":\"true\" }}")) {
                    respuesta.setEstado(Server.EstadoRespuesta.Ok);
                } else if(str.contains("Authentication mechanism is not available")) {
                    //2131034126
                    BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.authetication_mechanism));
                    respuesta.setEstado(Server.EstadoRespuesta.Fail);
                } else if(str.contains("The user\'s account has expired.")) {
                    //2131034124
                    BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.has_expired));
                    respuesta.setEstado(Server.EstadoRespuesta.Fail);
                } else if(str.contains("This account has been temporarily locked out due to too many failed login attempts")) {
                    //2131034123
                    BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.this_account_has_been_temporarily_locked));
                    respuesta.setEstado(Server.EstadoRespuesta.Fail);
                } else if(str.contains("Authentication failed. You have used an invalid user name, password or client certificate")) {
                    //2131034122
                    BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.authetication_failed));
                    respuesta.setEstado(Server.EstadoRespuesta.Fail);
                } else if(str.length() == 0) {
                    //2131034127
                    BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.conexion));
                    respuesta.setEstado(Server.EstadoRespuesta.Fail);
                } else if(str.contains("Index BBVA Net")) {
                    //2131034126
                    BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.authetication_mechanism));
                    respuesta.setEstado(Server.EstadoRespuesta.Fail);
                } else {
                    //2131034126
                    BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.authetication_mechanism));
                    respuesta.setEstado(Server.EstadoRespuesta.Fail);
                }

                entity.consumeContent();
            }

            return respuesta;
        } catch (Exception var17) {
            //2131034121
            Log.e("BCOM", "excepcion conectawebSeal" + var17);
            BCom.getInstance().showInformationAlert(BCom.getInstance().getString(R.string.internet_error_message));
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            return respuesta;
        }
    }

    private void conectaBalanceador() {
        //TODO se elimina error al quitar el SWITCH_TABLE

        // $SWITCH_TABLE$com$bancomer$btrader$session$Server$ServerModes()[Server.serverMode.ordinal()]
        switch(Server.serverMode.ordinal()) {
            case 1:
                Session.setUrlWAS("https://www23.bbvanet.com.mx/mexiconet3/mexiconet3/");
                Session.setUrlWebseal("https://www23.bbvanet.com.mx/");
                this.sbcp.setPreferencia("WAS", Session.getUrlWAS());
                this.sbcp.setPreferencia("WEBSEAL", Session.getUrlWebseal());
                break;
            case 2:
                Session.setUrlWAS("https://148.244.45.93/mexiconetna2/mexiconetni/");
                Session.setUrlWebseal("https://148.244.45.93/");
                this.sbcp.setPreferencia("WAS", Session.getUrlWAS());
                this.sbcp.setPreferencia("WEBSEAL", Session.getUrlWebseal());
                break;
            case 3:
                try {
                    DefaultHttpClient ex = getHttpClient();
                    if(ex == null) {
                        Log.d("BCOM", "Es nullo el clienthttp");
                    }

                    HttpParams params = ex.getParams();
                    HttpClientParams.setRedirecting(params, false);
                    HttpGet method = new HttpGet("https://a1.bbvanet.com.mx/");
                    Log.w("BCOM", "Url del balanceador: https://a1.bbvanet.com.mx/");
                    HttpResponse resp = ex.execute(method);
                    int codigo_http = resp.getStatusLine().getStatusCode();
                    System.out.print("codigo_http: " + codigo_http);
                    if(codigo_http != 200) {
                        Log.w("BCOM", "Hubo un error en el balanceador");
                    } else {
                        String location = "https://a1.bbvanet.com.mx/mexiconetni/mexiconetni/";
                        System.out.println("LOCATION  " + location);
                        if(this.checarURLBalanceador(location)) {
                            Log.d("BCOM", "header location: " + location);
                            Session.setUrlWAS(location);
                            this.sbcp.setPreferencia("WAS", location);
                            int indice = location.indexOf("mx/");
                            Log.d("BCOM", "indice: " + indice);
                            String original = "https://a1.bbvanet.com.mx/";
                            Log.d("BCOM", "extracto: " + original);
                            Session.setUrlWebseal(original);
                            this.sbcp.setPreferencia("WEBSEAL", original);
                        }
                    }
                } catch (Exception var9) {
                    Log.e("BCOM", "Exeption en conectaBalanceador. " + var9.getMessage());
                }
        }

    }

    private boolean checarURLBalanceador(String url) {
        boolean resp = false;
        String[] aux = url.split("\\.");
        if(aux.length > 3 && aux[1].startsWith("bbvanet")) {
            resp = true;
        }

        Log.d("BCOM", "checarURLBalanceador: " + resp);
        return resp;
    }

    private ServerResponse signOnOne(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = null;
                ex = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"solicitaInstrumentoSeguridad\":{\"posicionTASA_usr\":\"\",\"alias_usr\":\"LEONARDO\",\"tiseguridad_usr\":\"%s\",\"tipoMensajeTASA\":\"\",\"usuario_usr\":\"ADMINF\",\"digitoTASA_usr\":\"\",\"cliente_usr\":\"D0026035\",\"acceso_usr\":4152312171293621},\"s_tipo_firma\":0,\"s_lit_idioma\":\"CAS\"}";
                String nvpso = String.format(ex, new Object[]{instrumentoDeSeguridad.getCodigoInstrumento()});
                respuesta.setJsonResultante(nvpso);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
            } else {
                HttpPost var13 = this.initPostRequest("LogonOperacionServlet");
                ArrayList var14 = new ArrayList();
                var14.add(new BasicNameValuePair("username", (String)params.get("username")));
                var14.add(new BasicNameValuePair("password", (String)params.get("password")));
                var14.add(new BasicNameValuePair("login-form-type", (String)params.get("login-form-type")));
                var14.add(new BasicNameValuePair("recepcionJSON", (String)params.get("recepcionJSON")));
                var14.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                var13.setEntity(new UrlEncodedFormEntity(var14, "UTF-8"));
                this.logURl(var13, var14);
                HttpResponse response = httpclient.execute(var13);
                int codigo_http = response.getStatusLine().getStatusCode();
                if(codigo_http >= 400) {
                    respuesta.setEstado(Server.EstadoRespuesta.Fail);
                    respuesta.setCodigoError("HTTP:" + codigo_http);
                    respuesta.setMensaje(response.getStatusLine().getReasonPhrase());
                    respuesta.setJsonResultante(Utilerias.crearJsonError(String.valueOf(codigo_http), respuesta.getMensaje()));
                    ++this.peticionesFallidas;
                } else {
                    this.peticionesFallidas = 0;
                    HttpEntity entity = response.getEntity();
                    List cookies = httpclient.getCookieStore().getCookies();
                    if(cookies.isEmpty()) {
                        Log.d("BCOM", "No cookies");
                    } else {
                        this.sbcp.setPreferencia("numerogalletas_2", String.valueOf(cookies.size()));

                        for(int isTAS = 0; isTAS < cookies.size(); ++isTAS) {
                            Log.d("BCOM", "cookie: " + ((Cookie)cookies.get(isTAS)).toString());
                            Session.setCookieJSesionId(((Cookie)cookies.get(isTAS)).getValue().toString());
                            Cookie cc = (Cookie)cookies.get(isTAS);
                            this.sbcp.setPreferencia("galletanombre_2_" + isTAS, cc.getName());
                            this.sbcp.setPreferencia("galletavalor_2_" + isTAS, cc.getValue());
                            this.sbcp.setPreferencia("galletaversion_2_" + isTAS, String.valueOf(cc.getVersion()));
                            this.sbcp.setPreferencia("galletadominio_2_" + isTAS, cc.getDomain());
                            this.sbcp.setPreferencia("galletapath_2_" + isTAS, cc.getPath());
                        }
                    }

                    InputStream var15 = entity.getContent();
                    respuesta.setJsonResultante(Utilerias.convertStreamToString(var15));
                    entity.consumeContent();
                    respuesta = this.validarRespuesta(respuesta);
                }
            }
        } catch (JSONException var11) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var12) {
            Log.w("BCOM", "error httpinvoker: " + var12.getLocalizedMessage());
            throw new RuntimeException(var12.getMessage());
        }

        if(Server.EstadoRespuesta.Ok == respuesta.getEstado()) {
            Session.getInstance().guardaValores(Server.PersistentJsonFile.FILE_SIGN_ON, respuesta.getJsonResultante());
        }

        return respuesta;
    }

    private ServerResponse singOnToken(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String e = "{ \"s_versionApl\": 1, \"s_Colectivo\": \"str\", \"s_lit_idioma2\": \"Es\", \"s_tipo_firma\": 0, \"posicionGlobal\": { \"acceso_usr\": 4152312171293605, \"fecha_sesionAnterior\": \"16/07/2014\", \"nivel_aut_usr\": 4, \"tiseguridad_usr\": \"T1\", \"esq_admon_usr\": \"T\", \"asuntos\": { \"lista_inversiones_usd\": null, \"lista_fondosinversion_mxp\": [ { \"codigo_fondo\": 2012, \"tipo\": \"\", \"num_contrato\": \"00740010002092397641\", \"numero\": \"00740010002092397641\", \"codigo_operacion_venta2\": \"RT02\", \"codigo_operacion_venta1\": \"RF02\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL 72 HRS\", \"precio_pactado\": 578.271989, \"descripcion_fondo\": \"BBVAUSA\", \"valor_financiero\": 64188.19, \"alias\": \"00740010002092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"      735\", \"id\": \"SIMXP0000001\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 111, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2193, \"tipo\": \"\", \"num_contrato\": \"00740010142092397641\", \"numero\": \"00740010142092397641\", \"codigo_operacion_venta2\": \"RT01\", \"codigo_operacion_venta1\": \"RF01\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL (48 HORAS)\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL (48 HORAS)\", \"precio_pactado\": 560.969855, \"descripcion_fondo\": \"DCP-1\", \"valor_financiero\": 132949.85, \"alias\": \"00740010142092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"       10\", \"id\": \"SIMXP0000002\", \"serie\": \"PV\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 237, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2199, \"tipo\": \"\", \"num_contrato\": \"00740010002092397641\", \"numero\": \"00740010002092397641\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": 550.177857, \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": 0, \"alias\": \"00740010002092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"       63\", \"id\": \"SIMXP0000003\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 0, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2012, \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RT02\", \"codigo_operacion_venta1\": \"RF02\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL 72 HRS\", \"precio_pactado\": 578.271989, \"descripcion_fondo\": \"BBVAUSA\", \"valor_financiero\": 307062.42, \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"      737\", \"id\": \"SIMXP0000004\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 531, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2193, \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RT01\", \"codigo_operacion_venta1\": \"RF01\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL (48 HORAS)\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL (48 HORAS)\", \"precio_pactado\": 560.969855, \"descripcion_fondo\": \"DCP-1\", \"valor_financiero\": 132949.85, \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"       12\", \"id\": \"SIMXP0000005\", \"serie\": \"PV\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 237, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2199, \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": 550.177857, \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": 132592.86, \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"       66\", \"id\": \"SIMXP0000006\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 241, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2093, \"tipo\": \"\", \"num_contrato\": \"00740010112092397706\", \"numero\": \"00740010112092397706\", \"codigo_operacion_venta2\": \"RTA2\", \"codigo_operacion_venta1\": \"RFA2\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"PREAVISO VTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO VTA PARC 72 HRS\", \"precio_pactado\": 571.96264, \"descripcion_fondo\": \"DIVER-P\", \"valor_financiero\": 0, \"alias\": \"00740010112092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"        7\", \"id\": \"SIMXP0000007\", \"serie\": \"PFAE2\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 0, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2141, \"tipo\": \"\", \"num_contrato\": \"00740010112092397706\", \"numero\": \"00740010112092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": 565.668673, \"descripcion_fondo\": \"BMERLIQ\", \"valor_financiero\": 0, \"alias\": \"00740010112092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"       29\", \"id\": \"SIMXP0000008\", \"serie\": \"PP\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 0, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2144, \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": 583.310454, \"descripcion_fondo\": \"F-PYME\", \"valor_financiero\": 0, \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"       69\", \"id\": \"SIMXP0000009\", \"serie\": \"B2\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 0, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2199, \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": 550.177857, \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": 119938.77, \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"       72\", \"id\": \"SIMXP0000010\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 218, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2298, \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": 598.603161, \"descripcion_fondo\": \"BMER18B\", \"valor_financiero\": 0, \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"       14\", \"id\": \"SIMXP0000011\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 0, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2299, \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002";
                e = String.format(e, new Object[]{CURRENT_ACCOUNTS});
                Log.d(this.getClass().getSimpleName(), CURRENT_ACCOUNTS);
                respuesta.setJsonResultante(e);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
            } else {
                HttpPost e1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("username", (String)params.get("username")));
                nvpso.add(new BasicNameValuePair("password", (String)params.get("password")));
                nvpso.add(new BasicNameValuePair("login-form-type", (String)params.get("login-form-type")));
                nvpso.add(new BasicNameValuePair("recepcionJSON", (String)params.get("recepcionJSON")));
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                e1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(e1, nvpso);
                this.verifyServerResponse(respuesta, e1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error singOnTwo: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        Session.getInstance().guardaValores(Server.PersistentJsonFile.FILE_SIGN_ON_2, respuesta.getJsonResultante());
        return respuesta;
    }

    private ServerResponse singOff(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String e = "{\"imd_signoff_op-data\":{\"codigo\":\"1\"}}";
                respuesta.setJsonResultante(e);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
            } else {
                HttpPost e1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                Log.d("BCOM", "Lista: " + nvpso.toString());
                e1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                Log.d("BCOM", "httpPost: " + e1.toString());
                this.logURl(e1, nvpso);
                this.verifyServerResponse(respuesta, e1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error singOff_1: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        Session.getInstance().guardaValores(Server.PersistentJsonFile.FILE_SIGN_OFF, respuesta.getJsonResultante());
        return respuesta;
    }

    private ServerResponse signOffWas() {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String e = "{\"imd_signoff_op-data\":{\"codigo\":\"1\"}}";
                respuesta.setJsonResultante(e);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
            } else {
                HttpPost var12 = this.initPostRequest("LogoutCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", "{}"));
                Log.d("BCOM", "Lista: " + nvpso.toString());
                var12.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                Log.d("BCOM", "httpPost: " + var12.toString());
                this.logURl(var12, nvpso);
                HttpResponse httpResponse = getHttpClient().execute(var12);
                int responseCode = httpResponse.getStatusLine().getStatusCode();
                Log.w("BCOM", "HTTP CODE_1 " + responseCode);
                if(responseCode >= 400) {
                    respuesta.setEstado(Server.EstadoRespuesta.Fail);
                    respuesta.setCodigoError("HTTP:" + responseCode);
                    //2131034121
                    respuesta.setMensaje(BCom.getInstance().getString(R.string.internet_error_message));
                    respuesta.setJsonResultante(Utilerias.crearJsonError(String.valueOf(responseCode), respuesta.getMensaje()));
                    ++this.peticionesFallidas;
                    if(3 == this.peticionesFallidas) {
                        this.peticionesFallidas = 0;
                        BCom.getInstance().logout();
                    }
                } else {
                    try {
                        this.peticionesFallidas = 0;
                        Log.w("BCOM", "Peticion HTTP correcta");
                        HttpEntity ex = httpResponse.getEntity();
                        InputStream isTAS = ex.getContent();
                        ex.consumeContent();
                        Log.w("BCOM", "Función para verificar la respuesta del JSON");
                        respuesta.setEstado(Server.EstadoRespuesta.Ok);
                    } catch (IOException var8) {
                        Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", var8);
                        throw new Exception(var8);
                    } catch (Exception var9) {
                        Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", var9);
                        throw new Exception(var9);
                    }
                }
            }
        } catch (JSONException var10) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
            System.out.print("Manda mensaje de respuesta error");
        } catch (Exception var11) {
            Log.e("BCOM", "error singOf_2:" + var11.getMessage());
            throw new RuntimeException(var11.getMessage());
        }

        return respuesta;
    }

    private ServerResponse signOffWebseal() {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String e = "{\"imd_signoff_op-data\":{\"codigo\":\"1\"}}";
                respuesta.setJsonResultante(e);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
            } else {
                HttpPost var12 = this.initPostRequestWebseal("pkmslogout.form");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", "{}"));
                Log.d("BCOM", "Lista: " + nvpso.toString());
                var12.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                Log.d("BCOM", "httpPost: " + var12.toString());
                this.logURl(var12, nvpso);
                HttpResponse httpResponse = getHttpClient().execute(var12);
                int responseCode = httpResponse.getStatusLine().getStatusCode();
                Log.w("BCOM", "HTTP CODE_2 " + responseCode);
                if(responseCode >= 400) {
                    respuesta.setEstado(Server.EstadoRespuesta.Fail);
                    respuesta.setCodigoError("HTTP:" + responseCode);
                    //2131034121
                    respuesta.setMensaje(BCom.getInstance().getString(R.string.internet_error_message));
                    respuesta.setJsonResultante(Utilerias.crearJsonError(String.valueOf(responseCode), respuesta.getMensaje()));
                    ++this.peticionesFallidas;
                    if(3 == this.peticionesFallidas) {
                        this.peticionesFallidas = 0;
                        BCom.getInstance().logout();
                    }
                } else {
                    try {
                        this.peticionesFallidas = 0;
                        Log.w("BCOM", "Peticion HTTP correcta");
                        HttpEntity ex = httpResponse.getEntity();
                        InputStream isTAS = ex.getContent();
                        ex.consumeContent();
                        Log.w("BCOM", "Funci—n para verificar la respuesta del JSON");
                        respuesta.setEstado(Server.EstadoRespuesta.Ok);
                    } catch (IOException var8) {
                        Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", var8);
                        throw new Exception(var8);
                    } catch (Exception var9) {
                        Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", var9);
                        throw new Exception(var9);
                    }
                }
            }
        } catch (JSONException var10) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var11) {
            Log.e("BCOM", "error singOff_3: " + var11.getMessage());
            throw new RuntimeException(var11.getMessage());
        }

        return respuesta;
    }

    private ServerResponse catalogoBancos(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String e = "{\"s_lit_idioma\":\"CAS\",\"respuesta\":{\"icListaBancos\":[{\"idBanco\":\"1\",\"claveSPEI\":\"40112\",\"cveCECOBAN\":\"0112\",\"nombreBanco\":\"BANCO MONEX\",\"cbe\":\"true\",\"cbeMD\":\"true\",\"cbeDS\":\"true\",\"tdd\":\"true\",\"tddMD\":\"true\",\"tddDS\":\"true\",\"tdc\":\"true\",\"ocr\":\"true\",\"sinApl\":\"true\"},{\"idBanco\":\"2\",\"claveSPEI\":\"37166\",\"cveCECOBAN\":\"7166\",\"nombreBanco\":\"BANCEFI\",\"cbe\":\"true\",\"cbeMD\":\"true\",\"cbeDS\":\"true\",\"tdd\":\"true\",\"tddMD\":\"true\",\"tddDS\":\"true\",\"tdc\":\"true\",\"ocr\":\"true\",\"sinApl\":\"true\"}]}}";
                respuesta.setJsonResultante(e);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
            } else {
                HttpPost e1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                e1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(e1, nvpso);
                this.verifyServerResponse(respuesta, e1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error catalogoBancos: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        Session.getInstance().guardaValores(Server.PersistentJsonFile.FILE_CAT_BAN, respuesta.getJsonResultante());
        return respuesta;
    }

    private ServerResponse reglasDeNegocio(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String e = "{\"version\": \"23\",\"usuario\": {\"fechaservidor\": \"26/01/2015\",\"horaservidor\": \"05:17:46\",\"bandCaptCompFisc\": \"true\"},\"aplicaciones\": {\"compraVentaAcciones\": {\"aplicaesquema\": \"si\",\"operacion\": {\"operaEnSabado\": \"No\",\"operaEnDomingo\": \"No\",\"operaEnDiasNohabiles\": \"Si\",\"perfiles\": {\"perfil\": [\"IF03\",\"IF05\",\"IF07\",\"IF11\",\"IF16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"08:30:00\",\"fin\": \"15:00:00\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"00:00:00\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"00:00:00\"}}}},\"estatusCancelacionAcciones\": {\"aplicaesquema\": \"si\",\"operacion\": {\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"perfiles\": {\"perfil\": [\"IF03\",\"IF05\",\"IF07\",\"IF11\",\"IF16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}},\"detalleInversion\": {\"aplicaesquema\": \"no\",\"operacion\": {\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"perfiles\": {\"perfil\": [\"IF03\",\"IF05\",\"IF07\",\"IF11\",\"IF16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}},\"accesoBrokerOnline\": {\"aplicaesquema\": \"no\",\"operacion\": {\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"perfiles\": {\"perfil\": [\"IF03\",\"IF05\",\"IF07\",\"IF11\",\"IF16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}},\"consultaEdoCtaPDF\": {\"aplicaesquema\": \"no\",\"perfiles\": [\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF08\",\"IF09\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"],\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}},\"reimpresionComprobantes\": {\"aplicaesquema\": \"no\",\"perfiles\": [\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF08\",\"IF09\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"],\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}},\"consultaDeTasas\": {\"perfiles\": [\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF08\",\"IF09\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"],\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"sabado\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"domingo\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"}}},\"compraInversiones\": { \"aplicaesquema\": \"si\",\"operacion\": {\"cargo\": {\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": \"IN\"},\"aplica_adicional\": \"si\",\"aplica_mancomunada\": \"no\",\"abono\": {\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"No\",\"maximoDiasDeProgramacion\": \"0\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"si\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"sabado\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"domingo\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"}}}}}},\"ventaInversiones\": {\"aplicaesquema\": \"si\",\"operacion\": {\"abono\": {\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"No\",\"maximoDiasDeProgramacion\": \"0\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"sabado\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"},\"domingo\": {\"inicio\": \"08:00:00\",\"fin\": \"20:00:00\"}}}}},\"entreMiscuentas\": {\"aplicaesquema\": \"si\",\"operacion\": {\"cargo\": [{\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": [\"LI\",\"AH\",\"CH\"]},\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"abono\": [{\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}},{\"aplicamoneda\": \"no\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": \"TC\"},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}},{\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": \"TP\"},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}]},{\"aplicamoneda\": \"no\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": \"TC\"},\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"abono\": {\"aplicamoneda\": \"si\",\"moneda\": \"MXP\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}},{\"aplicamoneda\": \"si\",\"moneda\": \"USD\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"abono\": [{\"aplicamoneda\": \"si\",\"moneda\": \"USD\",\"cuentas\": {\"cuenta\": [\"AH\",\"CH\",\"LI\"]},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}},{\"aplicamoneda\": \"si\",\"moneda\": \"USD\",\"cuentas\": {\"cuenta\": \"CA\"},\"operaMismoDia\": \"Si\",\"operaProgramadas\": \"Si\",\"maximoDiasDeProgramacion\": \"45\",\"operaEnSabado\": \"Si\",\"operaEnDomingo\": \"Si\",\"operaEnDiasNohabiles\": \"Si\",\"aplica_adicional\": \"no\",\"aplica_mancomunada\": \"no\",\"perfiles\": {\"perfil\": [\"IPB1\",\"IF11\",\"IF01\",\"IF02\",\"IF03\",\"IF04\",\"IF05\",\"IF06\",\"IF07\",\"IF13\",\"IF14\",\"IF15\",\"IF17\",\"IM05\",\"IM08\",\"IM12\",\"IM16\"]},\"horarioOperacion\": {\"lunesViernes\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"sabado\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"},\"domingo\": {\"inicio\": \"00:00:00\",\"fin\": \"23:59:59\"}}}]},{\"aplicamoneda\": \"si\",\"moneda\": \"USD\",\"cuentas\": {\"cuenta\": \"CA\"},\"aplica_adicional\": \"no\",\"aplica_m";
                respuesta.setJsonResultante(e);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
            } else {
                HttpPost e1 = this.initPostRequest("reglas_negocio_ipad.jsp");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("version", ""));
                e1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(e1, nvpso);
                this.verifyServerResponse(respuesta, e1);
            }

            return respuesta;
        } catch (Exception var5) {
            Log.e("BCOM", "error reglasDeNegocio: " + var5.getLocalizedMessage());
            throw new RuntimeException(var5.getMessage());
        }
    }

    private ServerResponse posicionGlobal(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{ \"s_versionApl\": 1, \"s_Colectivo\": \"str\", \"s_lit_idioma2\": \"Es\", \"s_tipo_firma\": 0, \"posicionGlobal\": { \"acceso_usr\": \"4152312171293605\", \"fecha_sesionAnterior\": \"16/07/2014\", \"nivel_aut_usr\": \"4\", \"tiseguridad_usr\": \"T1\", \"esq_admon_usr\": \"T\", \"asuntos\": { \"lista_inversiones_usd\": \"\", \"lista_fondosinversion_mxp\": [ { \"codigo_fondo\": \"2012\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397641\", \"numero\": \"00740010002092397641\", \"codigo_operacion_venta2\": \"RT02\", \"codigo_operacion_venta1\": \"RF02\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL 72 HRS\", \"precio_pactado\": \"578.271989\", \"descripcion_fondo\": \"BBVAUSA\", \"valor_financiero\": \"64188.19\", \"alias\": \"00740010002092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"735\", \"id\": \"SIMXP0000001\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"111\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2193\", \"tipo\": \"\", \"num_contrato\": \"00740010142092397641\", \"numero\": \"00740010142092397641\", \"codigo_operacion_venta2\": \"RT01\", \"codigo_operacion_venta1\": \"RF01\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL (48 HORAS)\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL (48 HORAS)\", \"precio_pactado\": \"560.969855\", \"descripcion_fondo\": \"DCP-1\", \"valor_financiero\": \"132949.85\", \"alias\": \"00740010142092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"10\", \"id\": \"SIMXP0000002\", \"serie\": \"PV\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"237\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2199\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397641\", \"numero\": \"00740010002092397641\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": \"550.177857\", \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": \"0\", \"alias\": \"00740010002092397641\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"63\", \"id\": \"SIMXP0000003\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"0\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2012\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RT02\", \"codigo_operacion_venta1\": \"RF02\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL 72 HRS\", \"precio_pactado\": \"578.271989\", \"descripcion_fondo\": \"BBVAUSA\", \"valor_financiero\": \"307062.42\", \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"737\", \"id\": \"SIMXP0000004\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"531\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2193\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RT01\", \"codigo_operacion_venta1\": \"RF01\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL (48 HORAS)\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL (48 HORAS)\", \"precio_pactado\": \"560.969855\", \"descripcion_fondo\": \"DCP-1\", \"valor_financiero\": \"132949.85\", \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"12\", \"id\": \"SIMXP0000005\", \"serie\": \"PV\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"237\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2199\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397684\", \"numero\": \"00740010002092397684\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": \"550.177857\", \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": \"132592.86\", \"alias\": \"00740010002092397684\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"66\", \"id\": \"SIMXP0000006\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"241\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2093\", \"tipo\": \"\", \"num_contrato\": \"00740010112092397706\", \"numero\": \"00740010112092397706\", \"codigo_operacion_venta2\": \"RTA2\", \"codigo_operacion_venta1\": \"RFA2\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"PREAVISO VTA TOTAL 72 HRS\", \"codigo_operacion_compra\": \"SE02\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO VTA PARC 72 HRS\", \"precio_pactado\": \"571.96264\", \"descripcion_fondo\": \"DIVER-P\", \"valor_financiero\": \"0\", \"alias\": \"00740010112092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA 72 HORAS\", \"numero_prospecto\": \"7\", \"id\": \"SIMXP0000007\", \"serie\": \"PFAE2\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"0\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2141\", \"tipo\": \"\", \"num_contrato\": \"00740010112092397706\", \"numero\": \"00740010112092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": \"565.668673\", \"descripcion_fondo\": \"BMERLIQ\", \"valor_financiero\": \"0\", \"alias\": \"00740010112092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"29\", \"id\": \"SIMXP0000008\", \"serie\": \"PP\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"0\", \"cupon\": \"0\", \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2144\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": \"583.310454\", \"descripcion_fondo\": \"F-PYME\", \"valor_financiero\": \"0\", \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"69\", \"id\": \"SIMXP0000009\", \"serie\": \"B2\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": \"0\", \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": \"2199\", \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTA0\", \"codigo_operacion_venta1\": \"RFA0\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": \"0.0\", \"descripcion_codigo_operacion_venta2\": \"PREAVISO TOTAL 24 HORAS\", \"codigo_operacion_compra\": \"SEOL\", \"descripcion_codigo_operacion_venta1\": \"PREAVISO 24 HORAS\", \"precio_pactado\": \"550.177857\", \"descripcion_fondo\": \"B+EDUCA\", \"valor_financiero\": \"119938.77\", \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA EN LINEA\", \"numero_prospecto\": \"72\", \"id\": \"SIMXP0000010\", \"serie\": \"M\", \"divisa\": \"\", \"saldo\": \"\", \"total_titulos\": 218, \"cupon\": 0, \"ind_adicional\": \"no\" }, { \"codigo_fondo\": 2298, \"tipo\": \"\", \"num_contrato\": \"00740010002092397706\", \"numero\": \"00740010002092397706\", \"codigo_operacion_venta2\": \"RTOL\", \"codigo_operacion_venta1\": \"RFOL\", \"ind_mancomunada\": \"no\", \"cuenta_asociada\": \"00740010110178294828\", \"titulos_no_disponibles\": 0.0, \"descripcion_codigo_operacion_venta2\": \"VENTA TOTAL EN LINEA\", \"codigo_operacion_compra\": \"SE01\", \"descripcion_codigo_operacion_venta1\": \"VENTA PARCIAL EN LINEA\", \"precio_pactado\": 598.603161, \"descripcion_fondo\": \"BMER18B\", \"valor_financiero\": 0, \"alias\": \"00740010002092397706\", \"descripcion_codigo_operacion_compra\": \"COMPRA (48 HORAS)\", \"numero_prospecto\": \"       14\", \"id\": \"SIMXP0000011\", \"serie\": \"B\", \"divisa\": \"\", \"saldo\": \"\", \"total_t";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error posicionGlobal: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        Session.getInstance().guardaValores(Server.PersistentJsonFile.FILE_POS_GL, respuesta.getJsonResultante());
        return respuesta;
    }

    public boolean doSignOutOfPreviousSession(String serverUrl, String cardNumber, CookieStore cookieStore) {
        if(Server.ServerModes.SIMULACION == Server.serverMode) {
            return true;
        } else {
            DefaultHttpClient httpClient = getHttpClient();
            HttpPost httpPost = new HttpPost(serverUrl);
            ArrayList nvpPost = new ArrayList();
            nvpPost.add(new BasicNameValuePair("tarjeta", cardNumber));
            nvpPost.add(new BasicNameValuePair("servicio", "n"));

            try {
                httpPost.setEntity(new UrlEncodedFormEntity(nvpPost));
            } catch (UnsupportedEncodingException var14) {
                Log.w(this.getClass().getSimpleName(), "Got UnsupportedEncodingException, failed to create the http client for the url: " + serverUrl, var14);
                return false;
            }

            httpClient.setCookieStore(cookieStore);

            try {
                HttpResponse ex = httpClient.execute(httpPost);
                HttpEntity httpEntity = ex.getEntity();
                InputStream is = httpEntity.getContent();
                String responseString = Utilerias.convertStreamToString(is);
                Log.d(this.getClass().getSimpleName(), responseString);
                is.close();
                ex = null;
                httpEntity.consumeContent();
                httpEntity = null;
                return true;
            } catch (ClientProtocolException var11) {
                Log.e(this.getClass().getSimpleName(), "Got ClientProtocolException while closing the session for the url: " + serverUrl, var11);
                return false;
            } catch (IOException var12) {
                Log.e(this.getClass().getSimpleName(), "Got IOException while closing the session for the url: " + serverUrl, var12);
                return false;
            } catch (Exception var13) {
                Log.e(this.getClass().getSimpleName(), "Got Exception while closing the session for the url: " + serverUrl, var13);
                return false;
            }
        }
    }

    private HttpPost initPostRequest(String operationUrl) {
        String urlBalanceador;
        String requestURL;
        if(Session.getUrlWAS() == null) {
            System.out.print("if");
            requestURL = "https://148.244.45.93/mexiconetna2/mexiconetni/";
            urlBalanceador = requestURL;
        } else {
            System.out.print("else");
            urlBalanceador = Session.getUrlWAS();
            System.out.print("urlBalanceador: " + urlBalanceador);
        }

        requestURL = urlBalanceador + operationUrl;
        Log.w("BCOM", "Requested url_2:" + requestURL);
        HttpPost httpPost = new HttpPost(requestURL);
        return httpPost;
    }

    private HttpPost initPostRequestWebseal(String operationUrl) {
        String urlBalanceador = Session.getUrlWebseal();
        Log.w("BCOM", "url " + urlBalanceador);
        String requestURL = urlBalanceador + operationUrl;
        Log.w("BCOM", "Requested url_3:" + requestURL);
        HttpPost httpPost = new HttpPost(requestURL);
        return httpPost;
    }

    private void verifyServerResponse(ServerResponse serverResponse, HttpPost postRequest) throws Exception {
        Log.w("BCOM", "Parametro 2 " + EntityUtils.toString(postRequest.getEntity()));
        Log.w("BCOM", "Parametro 1 " + serverResponse.toString());
        HttpResponse httpResponse = getHttpClient().execute(postRequest);
        int responseCode = httpResponse.getStatusLine().getStatusCode();
        Log.w("BCOM", "HTTP CODE_3 " + responseCode);
        if(responseCode >= 400) {
            serverResponse.setEstado(Server.EstadoRespuesta.Fail);
            serverResponse.setCodigoError("HTTP:" + responseCode);
            //TODO buscar el id 333
            BCom.getInstance().getString(R.string.conexion);
            //2131034121
            serverResponse.setMensaje(BCom.getInstance().getString(R.string.internet_error_message));
            serverResponse.setJsonResultante(Utilerias.crearJsonError(String.valueOf(responseCode), serverResponse.getMensaje()));
            ++this.peticionesFallidas;
            if(3 == this.peticionesFallidas) {
                this.peticionesFallidas = 0;
                BCom.getInstance().logout();
            }
        } else {
            try {
                this.peticionesFallidas = 0;
                Log.w("BCOM", "Peticion HTTP correcta");
                HttpEntity ex = httpResponse.getEntity();
                InputStream isTAS = ex.getContent();
                serverResponse.setJsonResultante(Utilerias.convertStreamToString(isTAS));
                ex.consumeContent();
                Log.w("BCOM", "Función para verificar la respuesta del JSON");
                this.validarRespuesta(serverResponse);
            } catch (IOException var7) {
                Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", var7);
                throw new Exception(var7);
            } catch (Exception var8) {
                Log.w(this.getClass().getSimpleName(), "Error while executing the method verifyServerResponse.", var8);
                throw new Exception(var8);
            }
        }

    }

    private ServerResponse validarRespuesta(ServerResponse respuesta) {
        if(respuesta == null) {
            respuesta = new ServerResponse();
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se recibe un objeto nulo para validacion");
        } else {
            try {
                JSONObject ex = new JSONObject(respuesta.getJsonResultante());
                if(ex.has("error")) {
                    Log.d("error", "IF");
                    respuesta.setEstado(Server.EstadoRespuesta.Fail);
                    respuesta.setMensaje(ex.getJSONObject("error").getString("mensaje"));
                    if(ex.getJSONObject("error").has("codigo")) {
                        respuesta.setCodigoError(ex.getJSONObject("error").getString("codigo"));
                    }
                } else if(ex.has("errorARQ")) {
                    Log.d("errorARQ", "ELSE IF");
                    respuesta.setEstado(Server.EstadoRespuesta.ARQ);
                    respuesta.setMensaje(ex.getJSONObject("msg").getString("mensaje"));
                } else {
                    Log.d("OK", "ELSE");
                    respuesta.setEstado(Server.EstadoRespuesta.Ok);
                }
            } catch (JSONException var3) {
                respuesta.setEstado(Server.EstadoRespuesta.ARQ);
                respuesta.setMensaje("Servicio temporalmente no disponible, le pedimos intente más tarde. Disculpe las molestias que esto le ocasiona.");
                System.out.print("Manda otro mensaje error");
            } catch (Exception var4) {
                Log.e("BCOM", "error: " + var4.getLocalizedMessage());
                throw new RuntimeException(var4.getMessage());
            }
        }

        return respuesta;
    }

    private ServerResponse movimientosCtasCheques(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.d(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = null;
                JSONObject nvpso = (new JSONObject((String)params.get("cadenaJSON"))).getJSONObject("datosAplicativos");
                int periodo = nvpso.getInt("periodo");
                switch(periodo) {
                    case 0:
                        ex = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3459,\"fecha\":\"06/12/2014\",\"abono\":3200.95,\"cargo\":\"\",\"observaciones\":\"BNET87696\",\"referencia\":\"0098076678\",\"concepto\":\"MXP-0098076678 INTERNET TRASPASO\"},{\"saldo\":6659.95,\"fecha\":\"08/12/2014\",\"abono\":2500.54,\"cargo\":\"\",\"observaciones\":\"BNET87697\",\"referencia\":\"0098076679\",\"concepto\":\"MXP-0098076679 ALQUILER TRASPASO\"},{\"saldo\":9160.49,\"fecha\":\"10/12/2014\",\"abono\":\"\",\"cargo\":800.25,\"observaciones\":\"BNET87698\",\"referencia\":\"0098076680\",\"concepto\":\"MXP-0098076680 INTERNET PAGO 1\"},{\"saldo\":8360.24,\"fecha\":\"12/12/2014\",\"abono\":\"\",\"cargo\":2523.66,\"observaciones\":\"BNET87699\",\"referencia\":\"0098076681\",\"concepto\":\"MXP-0098076681 INTERNET PAGO 2\"},{\"saldo\":5836.58,\"fecha\":\"12/12/2014\",\"abono\":1847,\"cargo\":\"\",\"observaciones\":\"BNET87700\",\"referencia\":\"0098076682\",\"concepto\":\"MXP-0098076682 INTERNET ABONO 1\"},{\"saldo\":7683.58,\"fecha\":\"13/12/2014\",\"abono\":\"\",\"cargo\":355,\"observaciones\":\"BNET87701\",\"referencia\":\"0098076683\",\"concepto\":\"MXP-0098076683 INTERNET PAGO 3\"},{\"saldo\":7328.58,\"fecha\":\"13/12/2014\",\"abono\":\"\",\"cargo\":1200,\"observaciones\":\"BNET87702\",\"referencia\":\"0098076684\",\"concepto\":\"MXP-0098076684 INTERNET PAGO 4\"},{\"saldo\":6128.58,\"fecha\":\"14/12/2014\",\"abono\":2000,\"cargo\":\"\",\"observaciones\":\"BNET87703\",\"referencia\":\"0098076685\",\"concepto\":\"MXP-0098076685 INTERNET ABONO 2\"},{\"saldo\":8128.58,\"fecha\":\"15/12/2014\",\"abono\":900,\"cargo\":\"\",\"observaciones\":\"BNET87704\",\"referencia\":\"0098076686\",\"concepto\":\"MXP-0098076686 INTERNET ABONO 3\"},{\"saldo\":9028.58,\"fecha\":\"15/12/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"BNET87705\",\"referencia\":\"0098076687\",\"concepto\":\"MXP-0098076687 INTERNET PAGO 5\"}]}}}";
                        break;
                    case 1:
                        ex = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3459,\"fecha\":\"12/11/2014\",\"abono\":3200.95,\"cargo\":\"\",\"observaciones\":\"BNET87696\",\"referencia\":\"0098076678\",\"concepto\":\"MXP-0098076678 INTERNET TRASPASO\"},{\"saldo\":6659.95,\"fecha\":\"14/11/2014\",\"abono\":2500.54,\"cargo\":\"\",\"observaciones\":\"BNET87697\",\"referencia\":\"0098076679\",\"concepto\":\"MXP-0098076679 ALQUILER TRASPASO\"},{\"saldo\":9160.49,\"fecha\":\"15/11/2014\",\"abono\":\"\",\"cargo\":800.25,\"observaciones\":\"BNET87698\",\"referencia\":\"0098076680\",\"concepto\":\"MXP-0098076680 INTERNET PAGO 1\"},{\"saldo\":8360.24,\"fecha\":\"18/11/2014\",\"abono\":\"\",\"cargo\":2523.66,\"observaciones\":\"BNET87699\",\"referencia\":\"0098076681\",\"concepto\":\"MXP-0098076681 INTERNET PAGO 2\"},{\"saldo\":5836.58,\"fecha\":\"18/11/2014\",\"abono\":1847,\"cargo\":\"\",\"observaciones\":\"BNET87700\",\"referencia\":\"0098076682\",\"concepto\":\"MXP-0098076682 INTERNET ABONO 1\"},{\"saldo\":7683.58,\"fecha\":\"19/11/2014\",\"abono\":\"\",\"cargo\":355,\"observaciones\":\"BNET87701\",\"referencia\":\"0098076683\",\"concepto\":\"MXP-0098076683 INTERNET PAGO 3\"},{\"saldo\":7328.58,\"fecha\":\"19/11/2014\",\"abono\":\"\",\"cargo\":1200,\"observaciones\":\"BNET87702\",\"referencia\":\"0098076684\",\"concepto\":\"MXP-0098076684 INTERNET PAGO 4\"},{\"saldo\":6128.58,\"fecha\":\"20/11/2014\",\"abono\":2000,\"cargo\":\"\",\"observaciones\":\"BNET87703\",\"referencia\":\"0098076685\",\"concepto\":\"MXP-0098076685 INTERNET ABONO 2\"},{\"saldo\":8128.58,\"fecha\":\"21/11/2014\",\"abono\":900,\"cargo\":\"\",\"observaciones\":\"BNET87704\",\"referencia\":\"0098076686\",\"concepto\":\"MXP-0098076686 INTERNET ABONO 3\"},{\"saldo\":9028.58,\"fecha\":\"21/11/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"BNET87705\",\"referencia\":\"0098076687\",\"concepto\":\"MXP-0098076687 INTERNET PAGO 5\"}]}}}";
                        break;
                    case 2:
                        ex = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3459,\"fecha\":\"12/10/2014\",\"abono\":3200.95,\"cargo\":\"\",\"observaciones\":\"BNET87696\",\"referencia\":\"0098076678\",\"concepto\":\"MXP-0098076678 INTERNET TRASPASO\"},{\"saldo\":6659.95,\"fecha\":\"14/10/2014\",\"abono\":2500.54,\"cargo\":\"\",\"observaciones\":\"BNET87697\",\"referencia\":\"0098076679\",\"concepto\":\"MXP-0098076679 ALQUILER TRASPASO\"},{\"saldo\":9160.49,\"fecha\":\"15/10/2014\",\"abono\":\"\",\"cargo\":800.25,\"observaciones\":\"BNET87698\",\"referencia\":\"0098076680\",\"concepto\":\"MXP-0098076680 INTERNET PAGO 1\"},{\"saldo\":8360.24,\"fecha\":\"18/10/2014\",\"abono\":\"\",\"cargo\":2523.66,\"observaciones\":\"BNET87699\",\"referencia\":\"0098076681\",\"concepto\":\"MXP-0098076681 INTERNET PAGO 2\"},{\"saldo\":5836.58,\"fecha\":\"18/10/2014\",\"abono\":1847,\"cargo\":\"\",\"observaciones\":\"BNET87700\",\"referencia\":\"0098076682\",\"concepto\":\"MXP-0098076682 INTERNET ABONO 1\"},{\"saldo\":7683.58,\"fecha\":\"19/10/2014\",\"abono\":\"\",\"cargo\":355,\"observaciones\":\"BNET87701\",\"referencia\":\"0098076683\",\"concepto\":\"MXP-0098076683 INTERNET PAGO 3\"},{\"saldo\":7328.58,\"fecha\":\"19/10/2014\",\"abono\":\"\",\"cargo\":1200,\"observaciones\":\"BNET87702\",\"referencia\":\"0098076684\",\"concepto\":\"MXP-0098076684 INTERNET PAGO 4\"},{\"saldo\":6128.58,\"fecha\":\"20/10/2014\",\"abono\":2000,\"cargo\":\"\",\"observaciones\":\"BNET87703\",\"referencia\":\"0098076685\",\"concepto\":\"MXP-0098076685 INTERNET ABONO 2\"},{\"saldo\":8128.58,\"fecha\":\"21/10/2014\",\"abono\":900,\"cargo\":\"\",\"observaciones\":\"BNET87704\",\"referencia\":\"0098076686\",\"concepto\":\"MXP-0098076686 INTERNET ABONO 3\"},{\"saldo\":9028.58,\"fecha\":\"21/10/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"BNET87705\",\"referencia\":\"0098076687\",\"concepto\":\"MXP-0098076687 INTERNET PAGO 5\"}]}}}";
                }

                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso1 = new ArrayList();
                nvpso1.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso1, "UTF-8"));
                this.logURl(ex1, nvpso1);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var6) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var7) {
            Log.e("BCOM", "error movimientosCtasCheques: " + var7.getLocalizedMessage());
            throw new RuntimeException(var7.getMessage());
        }

        return respuesta;
    }

    private ServerResponse movimientosCtasUSD(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = null;
                JSONObject nvpso = (new JSONObject((String)params.get("cadenaJSON"))).getJSONObject("datosAplicativos");
                int periodo = nvpso.getInt("periodo");
                switch(periodo) {
                    case 0:
                        ex = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"MEXICO\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3000,\"fecha\":\"06/12/2014\",\"abono\":200.95,\"cargo\":\"\",\"observaciones\":\"USD-BNET87696\",\"referencia\":\"USD-0098076678\",\"concepto\":\"USD-0098076678 INTERNET TRASPASO\"},{\"saldo\":3200.95,\"fecha\":\"08/12/2014\",\"abono\":500.54,\"cargo\":\"\",\"observaciones\":\"USD-BNET87697\",\"referencia\":\"USD-0098076679\",\"concepto\":\"USD-0098076679 ALQUILER TRASPASO\"},{\"saldo\":3701.49,\"fecha\":\"10/12/2014\",\"abono\":\"\",\"cargo\":1000,\"observaciones\":\"USD-BNET87698\",\"referencia\":\"USD-0098076680\",\"concepto\":\"USD-0098076680 INTERNET PAGO 1\"},{\"saldo\":2701.49,\"fecha\":\"12/12/2014\",\"abono\":\"\",\"cargo\":523.66,\"observaciones\":\"USD-BNET87699\",\"referencia\":\"USD-0098076681\",\"concepto\":\"USD-0098076681 INTERNET PAGO 2\"},{\"saldo\":2177.83,\"fecha\":\"12/12/2014\",\"abono\":2500,\"cargo\":\"\",\"observaciones\":\"USD-BNET87700\",\"referencia\":\"USD-0098076682\",\"concepto\":\"USD-0098076682 INTERNET ABONO 1\"},{\"saldo\":4677.83,\"fecha\":\"13/12/2014\",\"abono\":\"\",\"cargo\":1600,\"observaciones\":\"USD-BNET87701\",\"referencia\":\"USD-0098076683\",\"concepto\":\"USD-0098076683 INTERNET PAGO 3\"},{\"saldo\":3077.83,\"fecha\":\"13/12/2014\",\"abono\":\"\",\"cargo\":259.07,\"observaciones\":\"USD-BNET87702\",\"referencia\":\"USD-0098076684\",\"concepto\":\"USD-0098076684 INTERNET PAGO 4\"},{\"saldo\":2818.76,\"fecha\":\"24/12/2014\",\"abono\":3000,\"cargo\":\"\",\"observaciones\":\"USD-BNET87703\",\"referencia\":\"USD-0098076685\",\"concepto\":\"USD-0098076685 INTERNET ABONO 2\"},{\"saldo\":5818.76,\"fecha\":\"15/12/2014\",\"abono\":200,\"cargo\":\"\",\"observaciones\":\"USD-BNET87704\",\"referencia\":\"USD-0098076686\",\"concepto\":\"USD-0098076686 INTERNET ABONO 3\"},{\"saldo\":6018.76,\"fecha\":\"15/12/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"USD-BNET87705\",\"referencia\":\"USD-0098076687\",\"concepto\":\"USD-0098076687 INTERNET PAGO 5\"}]}}}";
                        break;
                    case 1:
                        ex = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"MEXICO\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3000,\"fecha\":\"12/11/2014\",\"abono\":200.95,\"cargo\":\"\",\"observaciones\":\"USD-BNET87696\",\"referencia\":\"USD-0098076678\",\"concepto\":\"USD-0098076678 INTERNET TRASPASO\"},{\"saldo\":3200.95,\"fecha\":\"14/11/2014\",\"abono\":500.54,\"cargo\":\"\",\"observaciones\":\"USD-BNET87697\",\"referencia\":\"USD-0098076679\",\"concepto\":\"USD-0098076679 ALQUILER TRASPASO\"},{\"saldo\":3701.49,\"fecha\":\"15/11/2014\",\"abono\":\"\",\"cargo\":1000,\"observaciones\":\"USD-BNET87698\",\"referencia\":\"USD-0098076680\",\"concepto\":\"USD-0098076680 INTERNET PAGO 1\"},{\"saldo\":2701.49,\"fecha\":\"18/11/2014\",\"abono\":\"\",\"cargo\":523.66,\"observaciones\":\"USD-BNET87699\",\"referencia\":\"USD-0098076681\",\"concepto\":\"USD-0098076681 INTERNET PAGO 2\"},{\"saldo\":2177.83,\"fecha\":\"18/11/2014\",\"abono\":2500,\"cargo\":\"\",\"observaciones\":\"USD-BNET87700\",\"referencia\":\"USD-0098076682\",\"concepto\":\"USD-0098076682 INTERNET ABONO 1\"},{\"saldo\":4677.83,\"fecha\":\"19/11/2014\",\"abono\":\"\",\"cargo\":1600,\"observaciones\":\"USD-BNET87701\",\"referencia\":\"USD-0098076683\",\"concepto\":\"USD-0098076683 INTERNET PAGO 3\"},{\"saldo\":3077.83,\"fecha\":\"19/11/2014\",\"abono\":\"\",\"cargo\":259.07,\"observaciones\":\"USD-BNET87702\",\"referencia\":\"USD-0098076684\",\"concepto\":\"USD-0098076684 INTERNET PAGO 4\"},{\"saldo\":2818.76,\"fecha\":\"20/11/2014\",\"abono\":3000,\"cargo\":\"\",\"observaciones\":\"USD-BNET87703\",\"referencia\":\"USD-0098076685\",\"concepto\":\"USD-0098076685 INTERNET ABONO 2\"},{\"saldo\":5818.76,\"fecha\":\"21/11/2014\",\"abono\":200,\"cargo\":\"\",\"observaciones\":\"USD-BNET87704\",\"referencia\":\"USD-0098076686\",\"concepto\":\"USD-0098076686 INTERNET ABONO 3\"},{\"saldo\":6018.76,\"fecha\":\"21/11/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"USD-BNET87705\",\"referencia\":\"USD-0098076687\",\"concepto\":\"USD-0098076687 INTERNET PAGO 5\"}]}}}";
                        break;
                    case 2:
                        ex = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"agencia\":\"MEXICO\",\"indicadoFueraDeHorario\":false,\"saldo_salvo_buen_cobro\":0,\"movimientos\":{\"ListaMovimientos\":[{\"saldo\":3000,\"fecha\":\"12/10/2014\",\"abono\":200.95,\"cargo\":\"\",\"observaciones\":\"USD-BNET87696\",\"referencia\":\"USD-0098076678\",\"concepto\":\"USD-0098076678 INTERNET TRASPASO\"},{\"saldo\":3200.95,\"fecha\":\"14/10/2014\",\"abono\":500.54,\"cargo\":\"\",\"observaciones\":\"USD-BNET87697\",\"referencia\":\"USD-0098076679\",\"concepto\":\"USD-0098076679 ALQUILER TRASPASO\"},{\"saldo\":3701.49,\"fecha\":\"15/10/2014\",\"abono\":\"\",\"cargo\":1000,\"observaciones\":\"USD-BNET87698\",\"referencia\":\"USD-0098076680\",\"concepto\":\"USD-0098076680 INTERNET PAGO 1\"},{\"saldo\":2701.49,\"fecha\":\"18/10/2014\",\"abono\":\"\",\"cargo\":523.66,\"observaciones\":\"USD-BNET87699\",\"referencia\":\"USD-0098076681\",\"concepto\":\"USD-0098076681 INTERNET PAGO 2\"},{\"saldo\":2177.83,\"fecha\":\"18/10/2014\",\"abono\":2500,\"cargo\":\"\",\"observaciones\":\"USD-BNET87700\",\"referencia\":\"USD-0098076682\",\"concepto\":\"USD-0098076682 INTERNET ABONO 1\"},{\"saldo\":4677.83,\"fecha\":\"19/10/2014\",\"abono\":\"\",\"cargo\":1600,\"observaciones\":\"USD-BNET87701\",\"referencia\":\"USD-0098076683\",\"concepto\":\"USD-0098076683 INTERNET PAGO 3\"},{\"saldo\":3077.83,\"fecha\":\"19/10/2014\",\"abono\":\"\",\"cargo\":259.07,\"observaciones\":\"USD-BNET87702\",\"referencia\":\"USD-0098076684\",\"concepto\":\"USD-0098076684 INTERNET PAGO 4\"},{\"saldo\":2818.76,\"fecha\":\"20/10/2014\",\"abono\":3000,\"cargo\":\"\",\"observaciones\":\"USD-BNET87703\",\"referencia\":\"USD-0098076685\",\"concepto\":\"USD-0098076685 INTERNET ABONO 2\"},{\"saldo\":5818.76,\"fecha\":\"21/10/2014\",\"abono\":200,\"cargo\":\"\",\"observaciones\":\"USD-BNET87704\",\"referencia\":\"USD-0098076686\",\"concepto\":\"USD-0098076686 INTERNET ABONO 3\"},{\"saldo\":6018.76,\"fecha\":\"21/10/2014\",\"abono\":\"\",\"cargo\":300,\"observaciones\":\"USD-BNET87705\",\"referencia\":\"USD-0098076687\",\"concepto\":\"USD-0098076687 INTERNET PAGO 5\"}]}}}";
                }

                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso1 = new ArrayList();
                nvpso1.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso1, "UTF-8"));
                this.logURl(ex1, nvpso1);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var6) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var7) {
            Log.e("BCOM", "error movimientosCtasUSD: " + var7.getLocalizedMessage());
            throw new RuntimeException(var7.getMessage());
        }

        return respuesta;
    }

    private ServerResponse movimientosTDC(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = null;
                JSONObject nvpso = (new JSONObject((String)params.get("cadenaJSON"))).getJSONObject("datosAplicativos");
                int periodo = nvpso.getInt("periodo");
                switch(periodo) {
                    case 0:
                        ex = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"numero_tarjeta\":\"4101810425430610\",\"indicadoFueraDeHorario\":false,\"movimientos\":{\"ListaMovimientos\":[{\"importe_operacion\":3000,\"fecha\":\"06/12/2014\",\"titulo\":\"USD-BNET87696\",\"referencia\":\"TDC-0098076678\",\"concepto\":\"TDC-0098076678 INGRESO TDC\"},{\"importe_operacion\":3000,\"fecha\":\"08/12/2014\",\"titulo\":\"TDC-BNET87697\",\"referencia\":\"TDC-0098076679\",\"concepto\":\"TDC-0098076679 INGRESO TDC\"},{\"importe_operacion\":-500,\"fecha\":\"10/12/2014\",\"titulo\":\"TDC-BNET87698\",\"referencia\":\"TDC-0098076680\",\"concepto\":\"TDC-0098076680 PAGO TDC\"},{\"importe_operacion\":2500,\"fecha\":\"12/12/2014\",\"titulo\":\"TDC-BNET87699\",\"referencia\":\"TDC-0098076681\",\"concepto\":\"TDC-0098076681 INGRESO TDC\"},{\"importe_operacion\":-300,\"fecha\":\"12/12/2014\",\"titulo\":\"TDC-BNET87700\",\"referencia\":\"TDC-0098076682\",\"concepto\":\"TDC-0098076682 TRASPASO TDC\"},{\"importe_operacion\":-3000,\"fecha\":\"13/12/2014\",\"titulo\":\"TDC-BNET87701\",\"referencia\":\"TDC-0098076683\",\"concepto\":\"TDC-0098076683 TRASPASO TDC\"},{\"importe_operacion\":1500,\"fecha\":\"14/12/2014\",\"titulo\":\"TDC-BNET87702\",\"referencia\":\"TDC-0098076684\",\"concepto\":\"TDC-0098076684 INGRESO TDC\"},{\"importe_operacion\":-30,\"fecha\":\"15/12/2014\",\"titulo\":\"TDC-BNET87703\",\"referencia\":\"TDC-0098076685\",\"concepto\":\"TDC-0098076685 TRASPASO TDC\"},{\"importe_operacion\":-600,\"fecha\":\"15/12/2014\",\"titulo\":\"TDC-BNET87704\",\"referencia\":\"TDC-0098076686\",\"concepto\":\"TDC-0098076686 TRASPASO TDC\"},{\"importe_operacion\":550,\"fecha\":\"15/12/2014\",\"titulo\":\"TDC-BNET87705\",\"referencia\":\"TDC-0098076687\",\"concepto\":\"TDC-0098076687 INGRESO TDC\"}]}}}";
                        break;
                    case 1:
                        ex = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"numero_tarjeta\":\"4101810425430610\",\"indicadoFueraDeHorario\":false,\"movimientos\":{\"ListaMovimientos\":[{\"importe_operacion\":3000,\"fecha\":\"12/11/2014\",\"titulo\":\"TDC-BNET87696\",\"referencia\":\"TDC-0098076678\",\"concepto\":\"TDC-0098076678 INGRESO TDC\"},{\"importe_operacion\":3000,\"fecha\":\"12/11/2014\",\"titulo\":\"TDC-BNET87697\",\"referencia\":\"TDC-0098076679\",\"concepto\":\"TDC-0098076679 INGRESO TDC\"},{\"importe_operacion\":-500,\"fecha\":\"13/11/2014\",\"titulo\":\"TDC-BNET87698\",\"referencia\":\"TDC-0098076680\",\"concepto\":\"TDC-0098076680 PAGO TDC\"},{\"importe_operacion\":2500,\"fecha\":\"14/11/2014\",\"titulo\":\"TDC-BNET87699\",\"referencia\":\"TDC-0098076681\",\"concepto\":\"TDC-0098076681 INGRESO TDC\"},{\"importe_operacion\":-300,\"fecha\":\"15/11/2014\",\"titulo\":\"TDC-BNET87700\",\"referencia\":\"TDC-0098076682\",\"concepto\":\"TDC-0098076682 TRASPASO TDC\"},{\"importe_operacion\":-3000,\"fecha\":\"15/11/2014\",\"titulo\":\"TDC-BNET87701\",\"referencia\":\"TDC-0098076683\",\"concepto\":\"TDC-0098076683 TRASPASO TDC\"},{\"importe_operacion\":1500,\"fecha\":\"17/11/2014\",\"titulo\":\"TDC-BNET87702\",\"referencia\":\"TDC-0098076684\",\"concepto\":\"TDC-0098076684 INGRESO TDC\"},{\"importe_operacion\":-30,\"fecha\":\"18/11/2014\",\"titulo\":\"TDC-BNET87703\",\"referencia\":\"TDC-0098076685\",\"concepto\":\"TDC-0098076685 TRASPASO TDC\"},{\"importe_operacion\":-600,\"fecha\":\"18/11/2014\",\"titulo\":\"TDC-BNET87704\",\"referencia\":\"TDC-0098076686\",\"concepto\":\"TDC-0098076686 TRASPASO TDC\"},{\"importe_operacion\":550,\"fecha\":\"18/11/2014\",\"titulo\":\"TDC-BNET87705\",\"referencia\":\"TDC-0098076687\",\"concepto\":\"TDC-0098076687 INGRESO TDC\"}]}}}";
                        break;
                    case 2:
                        ex = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"s_tipo_firma\":0,\"respuesta\":{\"numero_tarjeta\":\"4101810425430610\",\"indicadoFueraDeHorario\":false,\"movimientos\":{\"ListaMovimientos\":[{\"importe_operacion\":3000,\"fecha\":\"12/10/2014\",\"titulo\":\"TDC-BNET87696\",\"referencia\":\"TDC-0098076678\",\"concepto\":\"TDC-0098076678 INGRESO TDC\"},{\"importe_operacion\":3000,\"fecha\":\"12/10/2014\",\"titulo\":\"TDC-BNET87697\",\"referencia\":\"TDC-0098076679\",\"concepto\":\"TDC-0098076679 INGRESO TDC\"},{\"importe_operacion\":-500,\"fecha\":\"13/10/2014\",\"titulo\":\"TDC-BNET87698\",\"referencia\":\"TDC-0098076680\",\"concepto\":\"TDC-0098076680 PAGO TDC\"},{\"importe_operacion\":2500,\"fecha\":\"14/10/2014\",\"titulo\":\"TDC-BNET87699\",\"referencia\":\"TDC-0098076681\",\"concepto\":\"TDC-0098076681 INGRESO TDC\"},{\"importe_operacion\":-300,\"fecha\":\"15/10/2014\",\"titulo\":\"TDC-BNET87700\",\"referencia\":\"TDC-0098076682\",\"concepto\":\"TDC-0098076682 TRASPASO TDC\"},{\"importe_operacion\":-3000,\"fecha\":\"15/10/2014\",\"titulo\":\"TDC-BNET87701\",\"referencia\":\"TDC-0098076683\",\"concepto\":\"TDC-0098076683 TRASPASO TDC\"},{\"importe_operacion\":1500,\"fecha\":\"17/10/2014\",\"titulo\":\"TDC-BNET87702\",\"referencia\":\"TDC-0098076684\",\"concepto\":\"TDC-0098076684 INGRESO TDC\"},{\"importe_operacion\":-30,\"fecha\":\"18/10/2014\",\"titulo\":\"TDC-BNET87703\",\"referencia\":\"TDC-0098076685\",\"concepto\":\"TDC-0098076685 TRASPASO TDC\"},{\"importe_operacion\":-600,\"fecha\":\"18/10/2014\",\"titulo\":\"TDC-BNET87704\",\"referencia\":\"TDC-0098076686\",\"concepto\":\"TDC-0098076686 TRASPASO TDC\"},{\"importe_operacion\":550,\"fecha\":\"18/10/2014\",\"titulo\":\"TDC-BNET87705\",\"referencia\":\"TDC-0098076687\",\"concepto\":\"TDC-0098076687 INGRESO TDC\"}]}}}";
                }

                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso1 = new ArrayList();
                nvpso1.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso1, "UTF-8"));
                this.logURl(ex1, nvpso1);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var6) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var7) {
            Log.e("BCOM", "error movimientosTDC: " + var7.getLocalizedMessage());
            throw new RuntimeException(var7.getMessage());
        }

        return respuesta;
    }

    private ServerResponse recuperaPeriodos(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{ \"respuesta\": { \"producto\":\"AH\" ,\"numero\":\"00743606822800009784\" ,\"periodos\": { \"ListaPeriodos\":[ {\"mes\":\"01\",\"anio\":\"2014\"} ,{\"mes\":\"02\",\"anio\":\"2014\"} ,{\"mes\":\"03\",\"anio\":\"2014\"} ,{\"mes\":\"04\",\"anio\":\"2014\"} ,{\"mes\":\"05\",\"anio\":\"2014\"} ,{\"mes\":\"06\",\"anio\":\"2014\"} ,{\"mes\":\"07\",\"anio\":\"2014\"} ,{\"mes\":\"08\",\"anio\":\"2014\"} ,{\"mes\":\"09\",\"anio\":\"2014\"} ,{\"mes\":\"10\",\"anio\":\"2014\"} ,{\"mes\":\"11\",\"anio\":\"2014\"}] } } ,\"s_lit_idioma\":\"CAS\"}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaPeriodos: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse consultaEstadoDeCuenta(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"respuesta\":{\"fechaDeConsulta\":\"13/10/2011\",\"numero\":\"00743606822800009784\",\"periodoConsultado\":\"08/2011\",\"parametros\":{\"ListaParametros\":[{\"valorParametro\":\"BAN2O02\",\"nombreParametro\":\"OPERACION\"},{\"valorParametro\":\"es_ES\",\"nombreParametro\":\"LOCALE\"},{\"valorParametro\":\"GNHTTRW5B8URKZNDYNML9UZPRHUFHTWEUH7BSE\",\"nombreParametro\":\"PAR_INICIO.0\"},{\"valorParametro\":\"1\",\"nombreParametro\":\"PAR_INICIO.1\"},{\"valorParametro\":\"000040002\",\"nombreParametro\":\"sesionID\"}]},\"horaDeConsulta\":\"2:26:42 AM\",\"formatoConsultado\":\"pdf\",\"recursoWEB\":\"http://viewerjs.org/ViewerJS/#../demo/ohm2013.odp\"},\"s_lit_idioma\":\"CAS\"}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error consultaEstadoDeCuenta: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse recuperaOperaciones(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"\",\"respuesta\":{\t\"lcMovimientos\":[{\t\t\"folio\":\"33333\",\t\t\"horaOperacion\":\"10:37\",\t\t\"cuentaPrimaria\":\"0104956494\",\t\t\"usuario\":\"ADMINF\", \t\t\"cuentaAsociada\": \"0035241\",\t\t\"importe\":\"100\",\t\t\"Divisa\":\"MXP\",\t\t\"fechaOperacion\":\"2011-11-09\",\t\t\"referenciaOpcional\":\"\",\t\t\"funcionAsociada\":\"I380\",\t\t\"referencia2\":\"\",\t\t\"referencia1\":\"\",\t\t\"descripcionOperacion\":\"PAGO CIE FUNCION GLOBAL-GENERAL.\"\t},\t{\t\t\"folio\":\"2222\",\t\t\"horaOperacion\":\"11:37\",\t\t\"cuentaPrimaria\":\"0104956494\",\t\t\"usuario\":\"ADMINF\", \t\t\"cuentaAsociada\": \"0035241\",\t\t\"importe\":\"100\",\t\t\"Divisa\":\"MXP\",\t\t\"fechaOperacion\":\"2011-11-09\",\t\t\"referenciaOpcional\":\"\",\t\t\"funcionAsociada\":\"I380\",\t\t\"referencia2\":\"\",\t\t\"referencia1\":\"\",\t\t\"descripcionOperacion\":\"PAGO CIE.\"\t},\t{\t\t\"folio\":\"2323222\",\t\t\"horaOperacion\":\"12:37\",\t\t\"cuentaPrimaria\":\"0104956494\",\t\t\"usuario\":\"ADMINF\", \t\t\"cuentaAsociada\": \"0035241\",\t\t\"importe\":\"100\",\t\t\"Divisa\":\"MXP\",\t\t\"fechaOperacion\":\"2011-11-09\",\t\t\"referenciaOpcional\":\"\",\t\t\"funcionAsociada\":\"I380\",\t\t\"referencia2\":\"\",\t\t\"referencia1\":\"\",\t\t\"descripcionOperacion\":\"PAGO Cmp.\"\t}] }}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse aplicaCompraInversion(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse aplicaVentaInversion(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"CAS\",\"respuesta\":{\"folio\":\"005648005\",\"sello\":\"NKPS\",\"interesVto\":\"6\",\"sUrl\":\"url\",\"codigoCampania\":\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
                Log.w("BCOM", "Requested params: " + params.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse recuperaTasaInvertirConsultar(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"respuesta\": { \"tasa\": \"0.82\", \"interes\": \"0.14\", \"gat\": \"0.82\"}, \"s_lit_idioma\": \"CAS\"}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaPeriodos: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse registraTraspasoMisCuentas(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_versionApl\":1,\"s_Colectivo\":\"str\",\"s_lit_idioma2\":\"Es\",\"respuesta\":{\"tipoTraspaso\":\"tt\",\"horaOperacion\":\"10:37\",\"folioInternet\":\"12345\",\"listaMensajes\": [{\"mensaje\":\"mensaje1\", \"codigo\":\"codigo1\"},{\"mensaje\":\"mensaje2\", \"codigo\":\"codigo2\"} ],\"fechaOperacion\":\"2015-01-12\"},\"s_tipo_firma\":\"0\",\"s_lit_idioma\":\"CAS\"}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaPeriodos: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse pagoMinimoNoInteres(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"CAS\", \"respuesta\": {\"nombre_tarjetahabiente\": \"\", \"tipo_tarjeta\": \"\",\"numero_de_tarjeta\":\"\", \"fecha_pagar_antes_de\":\"\",\"saldo_nuevo\":\"\", \"pago_minimo\": \"\", \"pago_para_no_generar_intereses\": \"500\", \"limite_credito\": \"\", \"credito_disponible\": \"\", \"fecha_de_corte\": \"\", \"dias_trascurrido_en_el_ciclo\": \"\", \"saldo_promedio\":\"\", \"tasa_mensual\":\"\", \"monto_aclaracion\": \"\", \"id_titulo_monto_en_aclaracion\": \"\", \"monto_compras_diferidas\": \"\", \"listaTextosCENEFA\": {\"texto_cenefa\": \"\"}, \"saldo_vencido\": \"\", \"saldo_anterior\": \"\", \"pagos\": \"\", \"otros_abonos\": \"\", \"rendimiento\": \"\", \"compras\": \"\", \"otros_cargos\": \"\", \"disposicion_efectivo\": \"\", \"interes_sin_iva\": \"\", \"id_leyenda_intereses\": \"\", \"iva\": \"\", \"saldo_disponible\": \"\", \"ListaMovimientosTDC\": \"null\", \"puntos_nombre_del_programa\": \"\", \"puntos_saldo_anterior\": \"\", \"puntos_utilizados_transferidos\": \"\", \"puntos_vencidos\": \"\",\"puntos_saldo_nuevo\": \"\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaPeriodos: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse solicitaComision(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"CAS\", \"respuesta\": {\"comisionDisposicion\": \"20.55\", \"listaMensajes\": {\"codigoMensaje\": \"###\", \"mensaje\": \"Texto mensaje\"}}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaPeriodos: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse recuperaListasFrecuentesPreregistradasBBVA(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"\",\"respuesta\": {          \"listaTraspasos\":[  {   \"id\": \"FRTT000010\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456754545330003\",   \"tipoCuenta\": \"AH\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000020\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789018875455\",   \"tipoCuenta\": \"LI\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },{   \"id\": \"FRTT000032\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"87845412345664598\",   \"tipoCuenta\": \"CH\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000043\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789012989854\",   \"tipoCuenta\": \"TC\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },{   \"id\": \"FRTT000054\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"12345678909879871\",   \"tipoCuenta\": \"LI\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000065\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789018787545484\",   \"tipoCuenta\": \"TC\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  }]      }}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaListasFrecuentes: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse consultaBeneficiarioCtaBBVA(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": {  \"asunto\": \"2900001147\",  \"nombreBeneficiario\": \"MARIA\",  \"apellidoPaterno\": \"SAAVEDRA\",     \"apellidoMaterno\": \"GONZALEZ\" ,            \"indicadorClienteBnet\": \"1\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error consultaBeneficiarioCtaBBVA: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse preregistrarCuentaBBVA(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"CAS\", \"respuesta\": {\"folioInternetRegistro\": \"12345667AB\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error consultaBeneficiarioCtaBBVA: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse preregistrarCuentaInter(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"CAS\", \"respuesta\": {\"folioInternet\": \"12345667AB\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error preregistro interbancaria: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse cargaPreregistroCuentaBBVA(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": { \"idPreregistro\": \"RGTT000000\",  \"codigoBanco\": \"\" }}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error cargaPreregistroCuentaBBVA: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse cargaPreregistroInterbancarias(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": { \"idPreregistro\": \"RGTT000000\",  \"codigoBanco\": \"\" }}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error cargaPreregistro interbancarias: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse realizarTraspasoCuentaBBVA(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": {\"fechaOperacion\": \"111009\",\"fechaValor\":\"01-01-2011\",\"folioInternet\": \"12345678\",\"folioTelebanco\": \"12345678\",\"listaMensajes\":[{\"codigo\":\"CHUSD0000001\",\"mensaje\":\"Mensaje informativo 1\"}, {\"codigo\":\"CHUSD0000001\",\"mensaje\":\"Mensaje informativo 2\"}]}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error realizarTraspasoCuentaBBVA: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse mostrarAlertCancelarTraspaso(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            String ex = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": { \"opcion\": \"no\" }}";
            if(((String)params.get("boton")).equals("si")) {
                ex = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": { \"opcion\": \"si\" }}";
            }

            respuesta.setJsonResultante(ex);
            respuesta.setEstado(Server.EstadoRespuesta.Ok);
            Log.d(this.getClass().getName(), respuesta.toString());
            return respuesta;
        } catch (Exception var4) {
            Log.e("BCOM", "error mostrarAlertCancelarTraspaso: " + var4.getLocalizedMessage());
            throw new RuntimeException(var4.getMessage());
        }
    }

    private ServerResponse realizarPermitirFrecuentes(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"CAS\",\"respuesta\":{\"frecuentesPermitidos\":[{\"tipoTraspaso\":\"TT-CHUSDEUR\",\"hayLugarParaFrecuentes\":\"S\"},{\"tipoTraspaso\":\"TT-TPTC\",\"hayLugarParaFrecuentes\":\"S\"},{\"tipoTraspaso\":\"TT-CEXPRESS\",\"hayLugarParaFrecuentes\":\"S\"}]}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error permitir frecuentes: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse envioEmail(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"CAS\",\"respuesta\":{  \"exitoEnvioMailPagador\":\"true\",\"exitoEnvioMailBeneficiario\":\"true\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error envioEmail: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse recuperaListasFrecuentesInterbancarias(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"\",\"respuesta\": {          \"listaTraspasos\":[  {   \"id\": \"FRTT000010\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456754545330003\",   \"tipoCuenta\": \"AH\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000020\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789018875455\",   \"tipoCuenta\": \"LI\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },{   \"id\": \"FRTT000032\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"87845412345664598\",   \"tipoCuenta\": \"CH\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000043\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789012989854\",   \"tipoCuenta\": \"TC\",   \"divisa\": \"MXP\",   \"codBanco\": \"37166\",   \"nomCorto\": \"EDU\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },{   \"id\": \"FRTT000054\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"12345678909879871\",   \"tipoCuenta\": \"LI\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  },   {   \"id\": \"FRTT000065\",    \"nombreBeneficiario\": \"Eduardo P�rez L�pez\",   \"asuntoAbono\": \"123456789018787545484\",   \"tipoCuenta\": \"TC\",   \"divisa\": \"MXP\",   \"codBanco\": \"40112\",   \"nomCorto\": \"Edu\",   \"email\": \"\",   \"referencia\": \"\",   \"ind_ref\": \"\",   \"nomEmpresa\": \"\",\"tipoTraspaso\":\"\",\"tipoBeneficiario\":\"\",\"numeroCelular\":\"\",\"indicadorRup\":\"\",\"rup\":\"\",\"nombreBanco\":\"\",\"mensajeEspecial\":\"\",\"estatus\":\"\",\"requiereReferencia\":\"\",\"requiereConcepto\":\"\"  }]      }}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error envioEmail: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse recuperaFestivos(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"CAS\",\"respuesta\": {\"diasFestivos\": \"01-01,06-01,12-10,01-11,06-12,08-12,25-12\",\"fechaPosterior\":\"30/12/2014\",\"firmasConjuntas\":\"NO\",\"dia\": \"25\",\"mes\": \"12\",\"anio\": \"2014\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error envioEmail: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse traspasoInterbancarias3(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\":\"CAS\",\"respuesta\": {\"fechaOperacion\": \"111009\",\"fechaValor\":\"01-01-2011\",\"folioInternet\": \"12345678\",\"folioTelebanco\": \"12345678\",\"listaMensajes\":[{\"codigo\":\"CHUSD0000001\",\"mensaje\":\"Mensaje informativo 1\"}, {\"codigo\":\"CHUSD0000001\",\"mensaje\":\"Mensaje informativo 2\"}]}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error envioEmail: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse getServerMode() {
        ServerResponse respuesta = new ServerResponse();
        String serverModeAux = "";
        if(Server.ServerModes.SIMULACION == Server.serverMode) {
            serverModeAux = "SIMULACION";
        } else if(Server.ServerModes.TEST == Server.serverMode) {
            serverModeAux = "TEST";
        }

        String resp = "{\"serverMode\":\"" + serverModeAux + "\"}";
        respuesta.setJsonResultante(resp);
        respuesta.setEstado(Server.EstadoRespuesta.Ok);
        Log.d(this.getClass().getName(), respuesta.toString());
        return respuesta;
    }

    private ServerResponse recuperaListaTitulos(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();
        Log.v(this.getClass().getName(), params.toString());

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = " {\"s_lit_idioma\":\"CAS\",\"respuesta\":{  \"tipoCliente\":\"\",\"listaTitulos\":[{\"numeroCuenta\":\"00743445001344165802\",\"plazoReal\":\"D001\",\"importeInversion\":\"15002.1\",\"numeroInversion\":\"4258\",\"interesBrutoPagar\":\"0.54\",\"impuestosRetenidos\":\"0.24\",\t  \"tasaAplicada\":\"1.31\",\t  \"fechaVencimiento\":\"2014-12-24\",\t  \"instruccionPagoInteres\":\"2\",\t  \"instruccionPagoCapital\":\"2\"},{\"numeroCuenta\":\"00743445001344164278\",\t  \"plazoReal\":\"D002\",\t  \"importeInversion\":\"1231.1\",\t  \"numeroInversion\":\"1123\",\t  \"interesBrutoPagar\":\"0.12\",\t  \"impuestosRetenidos\":\"0.14\",\t  \"tasaAplicada\":\"3.31\",\t  \"fechaVencimiento\":\"2014-11-24\",\t  \"instruccionPagoInteres\":\"3\",\t  \"instruccionPagoCapital\":\"3\"},{\"numeroCuenta\":\"00743445001344174596\",\t\"plazoReal\":\"D001\",\"importeInversion\":\"3435.1\",\t  \"numeroInversion\":\"7665\",\t  \"interesBrutoPagar\":\"0.95\",\t  \"impuestosRetenidos\":\"0.01\",\t  \"tasaAplicada\":\"2.21\",\t  \"fechaVencimiento\":\"2014-12-01\",\t  \"instruccionPagoInteres\":\"4\",\t  \"instruccionPagoCapital\":\"4\"              },{            \t  \"numeroCuenta\":\"00743445001344365124\",\t  \"plazoReal\":\"D003\",\t  \"importeInversion\":\"4567.1\",\t  \"numeroInversion\":\"9787\",\t  \"interesBrutoPagar\":\"0.12\",\t  \"impuestosRetenidos\":\"0.09\",\t  \"tasaAplicada\":\"2.22\",\t  \"fechaVencimiento\":\"2014-12-12\",\t  \"instruccionPagoInteres\":\"1\",\t  \"instruccionPagoCapital\":\"1\"              }],\"listaCuentasPago\":[{\t  \"tipoCuenta\":\"CH\",\t  \"numeroCuenta\":\"00743445000450083933\",\t  \"saldoDisponible\":\"4099.45\"},{\t  \"tipoCuenta\":\"AH\",\t  \"numeroCuenta\":\"00743445000450083000\",\t  \"saldoDisponible\":\"199.342\"},{\t  \"tipoCuenta\":\"LI\",\t  \"numeroCuenta\":\"00743445000450083111\",\t  \"saldoDisponible\":\"123\"},{\t  \"tipoCuenta\":\"TC\",\t  \"numeroCuenta\":\"00743445000450083222\", \"saldoDisponible\":\"9876.32\"} ]}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaPeriodos: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse internet(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            HttpPost ex = this.initPostRequest("OperacionCBTFServlet");
            ArrayList nvpso = new ArrayList();
            nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
            ex.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
            this.logURl(ex, nvpso);
            this.verifyServerResponse(respuesta, ex);
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperacionesInternet: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse consultaTipoServicio(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse consultaContratosPatrimoniales(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse consultaDetalleDeInversion(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampana\":\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse consultaCapitales(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse cancelaOrden(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse detalleOrden(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse envioCorreoCompraVenta(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse realizaCompraVenta(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse envioCorreoCancelacion(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�a\":\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse listaCuentasEfectivo(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�:\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }

    private ServerResponse AplicaTraspasoEfectivo(Hashtable<String, String> params) {
        ServerResponse respuesta = new ServerResponse();

        try {
            if(Server.ServerModes.SIMULACION == Server.serverMode) {
                String ex = "{\"s_lit_idioma\": \"\",\"respuesta\": {\"numerInv\":\"DEMO-IN-0001\",\"tasaAplicada\":1.4,\"interesesAPagar\":1.63,\"impuestoRet\":0.69,\"saldoPostCgoChe\":100054686.94,\"saldoPostAboInv\": 109454686.94,\"gananciaAnualTotal\":\"1.41%\",\"folio\":\"005648005\",\"fechaVencimiento\":\"21/11/2014\",\"plazoReal\":\"21Dia(s)\",\"importeAlVencimiento\":\"2,001.00\",\"fechaActual\":\"31/10/2014-9:10:45AM\",\"sURL\":\"url\",\"codigoCampa�:\"DEMO-CODE\"}}";
                respuesta.setJsonResultante(ex);
                respuesta.setEstado(Server.EstadoRespuesta.Ok);
                Log.d(this.getClass().getName(), respuesta.toString());
            } else {
                HttpPost ex1 = this.initPostRequest("OperacionCBTFServlet");
                ArrayList nvpso = new ArrayList();
                nvpso.add(new BasicNameValuePair("cadenaJSON", (String)params.get("cadenaJSON")));
                ex1.setEntity(new UrlEncodedFormEntity(nvpso, "UTF-8"));
                this.logURl(ex1, nvpso);
                this.verifyServerResponse(respuesta, ex1);
            }
        } catch (JSONException var5) {
            respuesta.setEstado(Server.EstadoRespuesta.Fail);
            respuesta.setMensaje("Se encontro un error parseando la repsuesta a Json");
        } catch (Exception var6) {
            Log.e("BCOM", "error recuperaOperaciones: " + var6.getLocalizedMessage());
            throw new RuntimeException(var6.getMessage());
        }

        return respuesta;
    }
}

