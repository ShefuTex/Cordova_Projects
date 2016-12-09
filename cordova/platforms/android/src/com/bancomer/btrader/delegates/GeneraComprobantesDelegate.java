package com.bancomer.btrader.delegates;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.util.Hashtable;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.util.Base64;
import android.util.Log;

import com.bancomer.btrader.persistence.ServerResponse;
import com.bancomer.btrader.persistence.SharedBcomPreferences;
import com.bancomer.btrader.session.Server;
import com.bancomer.btrader.session.Server.EstadoRespuesta;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import pdfManage.*;
import android.app.Activity;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.view.Menu;
import android.widget.TextView;

public class GeneraComprobantesDelegate extends NativeDelegate {
	
	File systemDir = new File("/data/data/com.bancomer.bcom");
	
	public GeneraComprobantesDelegate() {
		this.callbackContext = null;
	}

	public void recuperaCuentasTDDPesos(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void recuperaCuentasDolares(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void recuperaCuentasTDCPesos(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void recuperaPeriodos(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void recuperaOperaciones(JSONArray datos) {
		if(paramTable == null){
			paramTable = new Hashtable<String, String>();
		}else{
			paramTable.clear();
		}
		try {
			
			JSONObject padre = new JSONObject();
			padre.put("proceso", datos.getString(0));
			padre.put("operacion", datos.getString(1));
			padre.put("accion", datos.getString(2));
			JSONObject datosAplicativos = datos.getJSONObject(3);
			padre.put("datosAplicativos", datosAplicativos);
			
			if(paramTable == null) { 
				paramTable = new Hashtable<String, String>();
			} else {
				paramTable.clear();
			}

			paramTable.put("cadenaJSON", padre.toString() );
			
		} catch (JSONException e) {
			Log.e("ERROR", "Error "+e.toString());
			e.printStackTrace();
		}
		
		setRespuesta(invoker.doNetWorkOperation(banderaOperacion, paramTable));
		leerDatosResponse(getRespuesta());
	}
	
	public void recuperaOpcionesDispositivo(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void guardarImgPreviaRecortadaC(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void guardarImgPreviaC(JSONArray args) {
		this.callbackContext.success();
	}
	
	@Override
	public void doNetworkOperation(JSONArray args) {
		this.callbackContext.success();
	}
	
	public void networkResponse(JSONArray args) {
		this.callbackContext.success();
	}
	
	private void saveImageFromBase64(JSONArray args) {

		try {
			String nombreImagen = args.getString(0);
			String folderName = args.getString(2);
			
			String imageData = args.getString(1);
			byte[] bytesEncoded = Base64.decode(imageData.getBytes(), Base64.DEFAULT);
			

			File appDir = new File(systemDir + File.separator + folderName);
			if (!appDir.exists()) {
				appDir.mkdirs();
			}

			File file = new File(appDir, nombreImagen + ".png");
			FileOutputStream out = new FileOutputStream(file);
			
			out.write(bytesEncoded);
			out.flush();
			out.close();
			
		/*	BufferedOutputStream bos = new BufferedOutputStream(out);
			bos.write(bytesEncoded);
			bos.flush();
			bos.close();
*/
		} catch (JSONException e) {
			Log.e("ERROR", "Error " + e.toString());
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			Log.e("ERROR", "Error " + e.toString());
			e.printStackTrace();
		} catch (IOException e) {
			Log.e("ERROR", "Error " + e.toString());
			e.printStackTrace();
		}
		
		ServerResponse respuesta = new ServerResponse();
		respuesta.setJsonResultante("");
		respuesta.setEstado(EstadoRespuesta.Ok);
		setRespuesta(respuesta);
		leerDatosResponse(getRespuesta());
	}
	
	public static void copyFile(File sourceFile, File destFile) throws IOException {
	    if(!destFile.exists()) {
	        destFile.createNewFile();
	    }
	 
	    FileChannel origen = null;
	    FileChannel destino = null;
	    try {
	        origen = new FileInputStream(sourceFile).getChannel();
	        destino = new FileOutputStream(destFile).getChannel();
	 
	        long count = 0;
	        long size = origen.size();              
	        while((count += destino.transferFrom(origen, count, size-count))<size);
	    }
	    finally {
	        if(origen != null) {
	            origen.close();
	        }
	        if(destino != null) {
	            destino.close();
	        }
	    }
	}
	
	public static void borrarDirectorio(File directorio) {
		File[] ficheros = directorio.listFiles();

		if (ficheros != null) {
			for (int x = 0; x < ficheros.length; x++) {
	
				if (ficheros[x].isDirectory()) {
					borrarDirectorio(ficheros[x]);
				}
				ficheros[x].delete();
			}
		}
	}
	
	private void comprobarRutaPDF(JSONArray args) {

		try {
			String archivo = args.getString(1);
			String folderName = args.getString(0);
			
			Log.i("INFO", "PDFfolderName: " + folderName);
			
			if (!archivo.endsWith(".pdf")) {
				archivo = archivo.concat(".pdf");
			}
			
			File rutaCorrecta = new File(systemDir + File.separator + folderName);
			File ficheroCorrecto = new File(rutaCorrecta + File.separator + archivo);
			File rutaPdf = new File("/storage/sdcard/BCOM");
			Log.e("ERROR", "rutaPdf.exists(): " + rutaPdf.exists());
			if (rutaPdf.exists()) {
				File pdf1 = new File("/storage/sdcard/" + folderName + File.separator + archivo);
				
				if (pdf1.exists()) {
					rutaCorrecta.mkdirs();
					copyFile(pdf1, ficheroCorrecto);
	
					borrarDirectorio(rutaPdf);
					rutaPdf.delete();
				} else {
					Log.e("ERROR", "pdf1 en sdcard no existe");
				}
			}
			
			/*else {
				File pdf1 = new File("/data/data/com.bancomer.com/" + folderName + File.separator + archivo);
				
				if (pdf1.exists()) {
					rutaCorrecta.mkdirs();
					copyFile(pdf1, ficheroCorrecto);
	
					borrarDirectorio(rutaPdf);
					rutaPdf.delete();
				} else {
					Log.e("ERROR", "pdf1 en data no existe");
				}
				
			}*/

		} catch (JSONException e) {
			Log.e("ERROR", "Error " + e.toString());
			e.printStackTrace();
		} catch (IOException e) {
			Log.e("ERROR", "Error " + e.toString());
			e.printStackTrace();
		}
		
		ServerResponse respuesta = new ServerResponse();
		respuesta.setJsonResultante("");
		respuesta.setEstado(EstadoRespuesta.Ok);
		setRespuesta(respuesta);
		leerDatosResponse(getRespuesta());
	}
	
	private void comprobarFichero(JSONArray args) {
		
		String existefichero = "0";
		try {
			JSONObject jsonObj = new JSONObject(args.getString(0));
			String acceso = jsonObj.getString("acceso");
			String usuario = jsonObj.getString("usuario");
			String extension = jsonObj.getString("extension");
			String nombreArchivo = jsonObj.getString("archivo");
			String directorio = jsonObj.getString("directorio");
			
			File filetocheck = new File(systemDir + File.separator + directorio
					+ File.separator + nombreArchivo + "." + extension);
			
			if (filetocheck.exists()) {
				existefichero = "1";
			}
			
		} catch (JSONException e) {
			Log.e("ERROR", "Error " + e.toString());
			e.printStackTrace();
		}
		
		String resp = "{\"existefichero\":\"" + existefichero + "\"}";
		
		ServerResponse respuesta = new ServerResponse();
		respuesta.setJsonResultante(resp);
		respuesta.setEstado(EstadoRespuesta.Ok);
		setRespuesta(respuesta);
		leerDatosResponse(getRespuesta());
	}

	
	@Override
	public boolean execute(final String action, final JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		SharedBcomPreferences.appContext = this.cordova.getActivity();
		super.init();
		
		
		this.cordova.getThreadPool().execute(new Runnable() {
			
			@Override
			public void run() {		
		
				if(action.equals("networkResponse")) {
					networkResponse(args);
				} else if(action.equals("doNetworkOperation")) {
					doNetworkOperation(args);
				} else if(action.equals("guardarImgPreviaC")) {
					guardarImgPreviaC(args);
				} else if(action.equals("guardarImgPreviaRecortadaC")) {
					guardarImgPreviaRecortadaC(args);
				} else if(action.equals("recuperaOpcionesDispositivo")) {
					recuperaOpcionesDispositivo(args);
				} else if(action.equals("recuperaOperaciones")) {
					banderaOperacion = Server.ServerOperation.RECUPERA_OPERACIONES;
					recuperaOperaciones(args);
				} else if(action.equals("recuperaPeriodos")) {
					recuperaPeriodos(args);
				} else if(action.equals("recuperaCuentasTDCPesos")) {
					recuperaCuentasTDCPesos(args);
				} else if(action.equals("recuperaCuentasDolares")) {
					recuperaCuentasDolares(args);
				} else if(action.equals("recuperaCuentasTDDPesos")) {
					recuperaCuentasTDDPesos(args);
				} else if(action.equals("saveImageFromBase64")) {	
					saveImageFromBase64(args);
				} else if(action.equals("comprobarFichero")) {	
					comprobarFichero(args);
				} else if(action.equals("comprobarRutaPDF")) {
					comprobarRutaPDF(args);
				} else if(action.equals("generarComprobantePDF")){
					generarComprobantePDF(args);
				}
			}
			
		});
		return true;
	}
	
	public void generarComprobantePDF(JSONArray args){
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String nombreImagen="";
		String ruta="";
		try {
			nombreImagen = args.getString(0);
			ruta = args.getString(1);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		   String pdfcontent = generatePDF(nombreImagen, ruta);	
	       outputToFile(nombreImagen+".pdf",pdfcontent,"ISO-8859-1", ruta);
		
	}
	private String generatePDF(String nombreImagen, String ruta) {
		PDFWriter mPDFWriter = new PDFWriter(PaperSize.FOLIO_WIDTH, PaperSize.FOLIO_HEIGHT);
		Bitmap xoiPNG = BitmapFactory.decodeFile(systemDir +"/"+ ruta + "/" + nombreImagen+".png");
		mPDFWriter.addImageKeepRatio(20,680,200,200, xoiPNG);
		int pageCount = mPDFWriter.getPageCount();
        for (int i = 0; i < pageCount; i++) {
        	mPDFWriter.setCurrentPage(i);
        	mPDFWriter.addText(10, 10, 8, Integer.toString(i + 1) + " / " + Integer.toString(pageCount));
        }
        
       String s = mPDFWriter.asString();
       return s;
	}

	private void outputToFile(String fileName, String pdfContent, String encoding, String ruta) {
        File newFile = new File(systemDir +"/"+ ruta +"/"+ fileName);
        try {
            newFile.createNewFile();
            try {
            	FileOutputStream pdfFile = new FileOutputStream(newFile);
            	pdfFile.write(pdfContent.getBytes(encoding));
                pdfFile.close();
            } catch(FileNotFoundException e) {
            	//
            }
        } catch(IOException e) {
        	//
        	System.err.println(e.getMessage());
        	
        	Log.e("errorescritura", e.getMessage());
        }
	}
}
