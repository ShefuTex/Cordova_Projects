package com.bancomer.btrader.delegates;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;

import com.bancomer.bcom.BCom;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.File;
public class AdministrarDelegate extends CordovaPlugin {
	
	private File systemDir = new File("/data/data/com.bancomer.bcom");  //Utilerias.applicationContext.getFilesDir();
	private File appDir = new File(systemDir + File.separator + "BCOM"); //Utilerias.APP_DIR_NAME);
	
	public CallbackContext callbackContext;
	private int check;
	private String packageName = "com.BCOM";
//	private File externalPath = Environment.getExternalStorageDirectory();
	private File directorio= new File("/storage/emulated/0/Android/data/com.BCOM");
	private boolean isInvitado=false;
	String numCuenta="5555555555";
	
	String cuentaPadre="";
	//externalPath.getPath()+"/Android/data"+packageName
	public AdministrarDelegate() {
		this.callbackContext = null;
	}
	
	public void doComprobantes(JSONArray args){
		check=1;
		File dir;
		try {
				dir = new File(appDir+"/"+args.getString(0));
			
		if(dir.exists()){			
		File[] archivos = dir.listFiles();	
		if(archivos.length>0){
			for(int i=0;i<archivos.length;i ++){
				if(archivos[i].getName().compareTo("Invitados")==0){
					File dirInvitados= new File(dir+"/"+"Invitados");
					File[] carpetasInv = dirInvitados.listFiles();
						for(int j=0; j< carpetasInv.length; j ++){
							if(carpetasInv[j].isDirectory()){
								File dirinvi= new File(dirInvitados+"/"+ carpetasInv[j].getName());
								File []archivosinvi= dirinvi.listFiles();
									if(archivosinvi.length>0){
										for(int a=0; a< archivosinvi.length;a++){
											archivosinvi[a].delete(); //se eliminan archivos de invitados
										}
									}
									carpetasInv[j].delete(); // se elimina carpetas invitados
							}
						}
					}
				archivos[i].delete(); // se eliminan los archivos del due�o
				dir.delete(); //se elimina carpeta due�o completa 
				}
			validarEliminacion(dir, check);
			}else{
				//en caso de que no existen archivos en la carpeta
				AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
				alertDialogB.setTitle("Aviso");
				alertDialogB.setMessage("No existe informaci�n a eliminar.");
				alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
	                @Override
					public void onClick(DialogInterface dialog,int id) { 
	 
	                }
	              });
				AlertDialog alertDialog = alertDialogB.create();
		         alertDialog.show();
			}
		}else {
			//en caso de que no existe el directorio
			AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
			alertDialogB.setTitle("Aviso");
			alertDialogB.setMessage("No existe informaci�n a eliminar.");
			alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
                @Override
				public void onClick(DialogInterface dialog,int id) { 
 
                }
              });
			AlertDialog alertDialog = alertDialogB.create();
	         alertDialog.show();	       
		}
		this.callbackContext.success();
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	
	public void doComprobantesDueno(JSONArray args){
		check=2;
		File dir;
		
		
			try {
				dir = new File(appDir+"/"+args.getString(0));
			
		if(dir.exists()){
		File[] archivos = dir.listFiles();
		if(archivos.length>0){
			for(int i=0;i<archivos.length;i ++){
				if(archivos[i].isFile()){
						archivos[i].delete();
					}
				}
				validarEliminacion(dir, check);
		}else if( archivos.length==1 && archivos[0].isDirectory()){
			//cuando no hay archivos del due�o solamente
				AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
				alertDialogB.setTitle("Aviso");
				alertDialogB.setMessage("No existe informaci�n a eliminar.");
				alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
		            @Override
					public void onClick(DialogInterface dialog,int id) { 

		            }
		          });
				AlertDialog alertDialog = alertDialogB.create();
		         alertDialog.show();
		}else{
			//se encuentra la carpeta due�o vacia 
			AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
			alertDialogB.setTitle("Aviso");
			alertDialogB.setMessage("No existe informaci�n a eliminar.");
			alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
	            @Override
				public void onClick(DialogInterface dialog,int id) { 

	            }
	          });
			AlertDialog alertDialog = alertDialogB.create();
	         alertDialog.show();
		}
	}else {
		//cuando no existe el directorio
		AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
		alertDialogB.setTitle("Aviso");
		alertDialogB.setMessage("No existe informaci�n a eliminar.");
		alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
            @Override
			public void onClick(DialogInterface dialog,int id) { 

            }
          });
		AlertDialog alertDialog = alertDialogB.create();
         alertDialog.show();
	}
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		//this.callbackContext.success();
	}
	
	public void doComprobantesInvitados(JSONArray args){
		check=3;
		
	
		String cuentaInvitado="";
		File dirInv;

		try {
			dirInv = new File(appDir+"/"+args.getString(0));
			
			
		cuentaInvitado=args.getString(0).substring(0, 16);
			if (isInvitado){
				cuentaPadre=cuentaInvitado;
				check=4;
			}
			
		
	 	if(dirInv.exists()){
		File[] archivosinvitados = dirInv.listFiles();
		if(archivosinvitados.length>0){
		for(int x=0;x<archivosinvitados.length;x ++){
			if (((isInvitado) /*&&  (archivosinvitados[x].isDirectory()) && ((archivosinvitados[x].getName().compareTo(cuentaInvitado))==0)*/)  
					|| ((!isInvitado) && (archivosinvitados[x].isDirectory()))) {
				File direcinvi= new File(dirInv+"/"+ archivosinvitados[x].getName());
				File []archivosinvitad= direcinvi.listFiles();
				if (archivosinvitad != null) {
					for(int a=0; a< archivosinvitad.length;a++){
						archivosinvitad[a].delete();
						}
				}
				 archivosinvitados[x].delete(); // para eliminar las subcarpetas
				}							
			}
			dirInv.delete(); //para eliminar la carpeta "invitados"
			validarEliminacion(dirInv, check);
		}else{
			//no existen archivos
			AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
			alertDialogB.setTitle("Aviso");
			alertDialogB.setMessage("No existe informaci�n a eliminar.");
			alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
                @Override
				public void onClick(DialogInterface dialog,int id) { 
 
                }
              });
			AlertDialog alertDialog = alertDialogB.create();
	         alertDialog.show();
		}
		}else{
			//no existe el directorio
			AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
			alertDialogB.setTitle("Aviso");
			alertDialogB.setMessage("No existe informaci�n a eliminar.");
			alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
                @Override
				public void onClick(DialogInterface dialog,int id) { 
 
                }
              });
			AlertDialog alertDialog = alertDialogB.create();
	         alertDialog.show();
		}
		//this.callbackContext.success();
	 	
	 	
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
	
	public void doComprobantesDI(JSONArray args){
		check=4;
//		String numCuenta= "5555555555"; // numero tarjeta q se obtendra desde session
		File dir=new File(directorio+"/"+numCuenta);
		if(dir.exists()){
		File[] archivos = dir.listFiles();
		if(archivos.length>0){
			for(int x=0; x< archivos.length; x++){
				if(archivos[x].isFile()){
					//eliminacion archivos due�o
					archivos[x].delete();						
				}else if(archivos[x].isDirectory()){
					File dirInv= new File(dir+"/"+archivos[x].getName());
					File[] archivosInv = dirInv.listFiles();
					if(archivosInv.length>0){
					for(int i=0;i < archivosInv.length; i ++){
						File carpInv= new File(dirInv+"/"+ archivosInv[i].getName());
						File[] archivoscarpInv = carpInv.listFiles();
						for(int y=0; y< archivoscarpInv.length; y++){
							//eliminacion archivos invitados
							archivoscarpInv[y].delete();
							}
							carpInv.delete();
							}
						validarEliminacion(dir,check);
						}else {
							//en caso de q no haya "n" carpetas de invitados
							AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
							alertDialogB.setTitle("Aviso");
							alertDialogB.setMessage("No existe informaci�n a eliminar.");
							alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
				                @Override
								public void onClick(DialogInterface dialog,int id) { 
				 
				                }
				              });
							AlertDialog alertDialog = alertDialogB.create();
					         alertDialog.show();
					         
					         break;
						}
					}
				}
			//validarEliminacion(dir,check);
			}else{
				//si no existe informacion dentro de la carpeta Due�o
				AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
				alertDialogB.setTitle("Aviso");
				alertDialogB.setMessage("No existe informaci�n a eliminar.");
				alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
	                @Override
					public void onClick(DialogInterface dialog,int id) { 
	 
	                }
	              });
				AlertDialog alertDialog = alertDialogB.create();
		         alertDialog.show();
			}
		}else{
			//si no existe el directorio
			AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
			alertDialogB.setTitle("Aviso");
			alertDialogB.setMessage("No existe informaci�n a eliminar.");
			alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
                @Override
				public void onClick(DialogInterface dialog,int id) { 
 
                }
              });
			AlertDialog alertDialog = alertDialogB.create();
	         alertDialog.show();
		}
		//this.callbackContext.success();
	}
	
	public void ejecutaBorradoDueno(JSONArray args){

		File dir;
		dataCuenta = args;	
			try {
				dir = new File(appDir+"/"+args.getString(0));
				
		if(dir.exists()){			
			File[] archivos = dir.listFiles();
			if(archivos.length>0){
			for(int x=0; x<archivos.length; x++){
				if((archivos.length==1 && archivos[x].getName().compareTo("Invitados")==0)||(archivos.length==0)){
					AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
					alertDialogB.setTitle("Aviso");
					alertDialogB.setMessage("No existe informaci�n a eliminar.");
					alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
		                @Override
						public void onClick(DialogInterface dialog,int id) { 
		 
		                }
		              });
					AlertDialog alertDialog = alertDialogB.create();
			         alertDialog.show();
			         break;
				}else{
					AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(cordova.getActivity());         
			        alertDialogBuilder.setTitle("Aviso");
			        alertDialogBuilder.setMessage("Al oprimir Aceptar eliminar�s tus comprobantes guardados.");
			        alertDialogBuilder.setPositiveButton("Cancelar",new DialogInterface.OnClickListener() {
			            @Override
						public void onClick(DialogInterface dialog,int id) {
			            	dialog.cancel();
			            	
			            }

			          });
			        alertDialogBuilder.setNegativeButton("Aceptar",new DialogInterface.OnClickListener() {
			            @Override
						public void onClick(DialogInterface dialog,int id) {
			            	
			            	dialog.dismiss();
			            	doComprobantesDueno(dataCuenta);
			            }
			        });
			     AlertDialog alertDialog = alertDialogBuilder.create();
			     alertDialog.show();
			     break;
				}
			}
			}else{
				AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
				alertDialogB.setTitle("Aviso");
				alertDialogB.setMessage("No existe informaci�n a eliminar.");
				alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
	                @Override
					public void onClick(DialogInterface dialog,int id) { 
	 
	                }
	              });
				AlertDialog alertDialog = alertDialogB.create();
		         alertDialog.show();
			}
			
		}else {
			AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
			alertDialogB.setTitle("Aviso");
			alertDialogB.setMessage("No existe informaci�n a eliminar.");
			alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
                @Override
				public void onClick(DialogInterface dialog,int id) { 
 
                }
              });
			AlertDialog alertDialog = alertDialogB.create();
	         alertDialog.show();
			
		}
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
	//	this.callbackContext.success();
	}
	JSONArray dataCuenta;
	public void ejecutaBorrado(JSONArray args){
		dataCuenta = args;
		File dir;
		try {
			dir = new File(appDir+"/"+args.getString(0));
		
		if(dir.exists()){
			File[] archivos = dir.listFiles();
			if(archivos.length>0){
				AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(cordova.getActivity());         
		        alertDialogBuilder.setTitle("Aviso");
		        alertDialogBuilder.setMessage("Al oprimir Aceptar eliminar�s el n�mero de tarjeta y los comprobantes guardados.");
		        alertDialogBuilder.setPositiveButton("Cancelar",new DialogInterface.OnClickListener() {
		            @Override
					public void onClick(DialogInterface dialog,int id) {
		            	dialog.cancel();
		            	
		            }

		          });
		        alertDialogBuilder.setNegativeButton("Aceptar",new DialogInterface.OnClickListener() {
		            @Override
					public void onClick(DialogInterface dialog,int id) {
		            	
		             dialog.dismiss();
		            doComprobantes(dataCuenta);
		            }
		        });
		        AlertDialog alertDialog = alertDialogBuilder.create();
		        alertDialog.show();    
			}else{
			AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
			alertDialogB.setTitle("Aviso");
			alertDialogB.setMessage("No existe informaci�n a eliminar.");
			alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
                @Override
				public void onClick(DialogInterface dialog,int id) { 
 
                }
              });
			AlertDialog alertDialog = alertDialogB.create();
	         alertDialog.show();
			}  
		}else{
			
			AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
			alertDialogB.setTitle("Aviso");
			alertDialogB.setMessage("No existe informaci�n a eliminar.");
			alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
                @Override
				public void onClick(DialogInterface dialog,int id) { 
 
                }
              });
			AlertDialog alertDialog = alertDialogB.create();
	         alertDialog.show();
		//this.callbackContext.success();
		}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
	
	public void ejecutaBorradoInvitados(JSONArray args){
		
		File dir;
		dataCuenta = args;
		try {
			dir = new File(appDir+"/"+args.getString(0));
		//File dir = new File(directorio+"/"+numCuenta+"/Invitados");
					
	
		
			
			
			
		cuentaPadre=args.getString(0).substring(0, 16);
					
		if(dir.exists()){
			File[] archivos = dir.listFiles();
			
			
			int longitud= archivos.length;
			boolean borradoInvitadoPadre=false;
			
			
			for (int i=0;i<longitud;i++){
				
				if (archivos[i].isDirectory() && (archivos[i].getName().compareTo(cuentaPadre)==0) ){
					
					borradoInvitadoPadre=true;
				}
			}
		
			
			
			
			
			
			if((borradoInvitadoPadre) || archivos.length>0){
				AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(cordova.getActivity());         
		        alertDialogBuilder.setTitle("Aviso");
		        if(isInvitado && borradoInvitadoPadre){
		        	alertDialogBuilder.setMessage("Al oprimir Aceptar eliminar�s los comprobantes guardados.");
		        }
		        else {
		        	String invitadosStr = "";
		        	if(!isInvitado) {
		        		invitadosStr = " de tus invitados";
		        	}
		        	alertDialogBuilder.setMessage("Al oprimir Aceptar eliminar�s los comprobantes guardados" + invitadosStr + ".");
		        }
		        
		        alertDialogBuilder.setPositiveButton("Cancelar",new DialogInterface.OnClickListener() {
		            @Override
					public void onClick(DialogInterface dialog,int id) {
		            	dialog.cancel();
		            	
		            }

		          });
		        alertDialogBuilder.setNegativeButton("Aceptar",new DialogInterface.OnClickListener() {
		            @Override
					public void onClick(DialogInterface dialog,int id) {          	
		             dialog.dismiss();
		            doComprobantesInvitados(dataCuenta);
		            }
		        });
		        AlertDialog alertDialog = alertDialogBuilder.create();
		        alertDialog.show();
			}else{
				AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
				alertDialogB.setTitle("Aviso");
				alertDialogB.setMessage("No existe informaci�n a eliminar.");
				alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
	                @Override
					public void onClick(DialogInterface dialog,int id) { 
	 
	                }
	              });
				AlertDialog alertDialog = alertDialogB.create();
		         alertDialog.show();
			}
		}else{
		AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
		alertDialogB.setTitle("Aviso");
		alertDialogB.setMessage("No existe informaci�n a eliminar.");
		alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
            @Override
			public void onClick(DialogInterface dialog,int id) { 

            }
          });
		AlertDialog alertDialog = alertDialogB.create();
         alertDialog.show();
	 
		//this.callbackContext.success();
		}
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	}
	
	public void ejecutaBorradoComprobantes(JSONArray args){
		//metodo cuando se tienen seleccionadas las dos opciones
		File dir=new File(directorio+"/"+numCuenta);
		File dirInvitados = new File(directorio+"/"+numCuenta+"/Invitados");
		if(dir.exists()|| dirInvitados.exists()){
			File[] archivos = dir.listFiles();
			File[] archivosInv = dirInvitados.listFiles();
			if(archivos.length>0 || archivosInv.length>0){
				AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(cordova.getActivity());         
		        alertDialogBuilder.setTitle("Aviso");
		        alertDialogBuilder.setMessage("Al oprimir Aceptar eliminar�s todos los comprobantes.");
		        alertDialogBuilder.setPositiveButton("Cancelar",new DialogInterface.OnClickListener() {
		            @Override
					public void onClick(DialogInterface dialog,int id) {
		            	dialog.cancel();
		            	
		            }

		          });
		        alertDialogBuilder.setNegativeButton("Aceptar",new DialogInterface.OnClickListener() {
		            @Override
					public void onClick(DialogInterface dialog,int id) { 
		            doComprobantesDI(new JSONArray());	
		             dialog.dismiss(); 
		            }
		        });
		        AlertDialog alertDialog = alertDialogBuilder.create();
		        alertDialog.show();
			}else{
				AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
				alertDialogB.setTitle("Aviso");
				alertDialogB.setMessage("No existe informaci�n a eliminar.");
				alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
		            @Override
					public void onClick(DialogInterface dialog,int id) { 

		            }
		          });
				AlertDialog alertDialog = alertDialogB.create();
		         alertDialog.show();
			}
				
		}else{
			AlertDialog.Builder alertDialogB = new AlertDialog.Builder(cordova.getActivity());
			alertDialogB.setTitle("Aviso");
			alertDialogB.setMessage("No existe informaci�n a eliminar.");
			alertDialogB.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
	            @Override
				public void onClick(DialogInterface dialog,int id) { 

	            }
	          });
			AlertDialog alertDialog = alertDialogB.create();
	         alertDialog.show();
		}
	}
	
	public void activaBanderaInvitado(JSONArray args){
		isInvitado=true;
		this.callbackContext.success();
	}
	
	public void seleccionaComponentesPropios(JSONArray args){		
		this.callbackContext.success();
	}
	
	public void seleccionaComponentesOtros(JSONArray args){
		this.callbackContext.success();
	}
	
	public synchronized  void muestraAlerta(final CallbackContext callbackContext){				
					AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(cordova.getActivity());         
					         alertDialogBuilder.setTitle("Aviso");
					         alertDialogBuilder.setMessage("Debe de seleccionar m�nimo una opci�n.");
					         alertDialogBuilder.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
						           @Override
								public void onClick(DialogInterface dialog,int id) { 
						 
						               }
						              });
									AlertDialog alertDialog = alertDialogBuilder.create();
							        alertDialog.show();
				}
	
	public void validarEliminacion(File path,int check){
		AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(cordova.getActivity());
		alertDialogBuilder.setTitle("Aviso");
		boolean exit=true;
		if(check==1){			
			if(!path.exists()){
				//esto valida que no existan elementos en el paquete
				alertDialogBuilder.setMessage("La sesi�n se cerrar� para terminar la operaci�n solicitada.");
			}else{
				exit=false;
				alertDialogBuilder.setMessage("No se pudo eliminar la informaci�n.");
			}
		}else if(check==2){
			File[] archivos = path.listFiles();
			if((archivos.length==1 && archivos[0].isDirectory())|| (archivos.length==0)){
				alertDialogBuilder.setMessage("Tus comprobantes guardados han sido eliminados.");
			}else{
				alertDialogBuilder.setMessage("No se pudo eliminar la informaci�n.");
			}			
		}else if(check==3){
			File[]archivos=path.listFiles();			
			if(archivos == null || archivos.length==0){
				if(isInvitado)
					alertDialogBuilder.setMessage("Tus comprobantes guardados han sido eliminados");
				else
					alertDialogBuilder.setMessage("Los comprobantes de tus invitados han sido eliminados.");
			}else {
				alertDialogBuilder.setMessage("No se pudo eliminar la informaci�n.");
			}
		}else if(check==4){
			File[] archivos = path.listFiles();
			
			int longitud= 0;
			if (archivos != null) {
				longitud= archivos.length;
			}
			boolean borradoInvitado=true;
			
			
			for (int i=0;i<longitud;i++){
				
				if (archivos[i].isDirectory() && (archivos[i].getName().compareTo(cuentaPadre)==0) ){
					
					borradoInvitado=false;
				}
			}
			
			if(borradoInvitado){
				//esto valida q no exista en la carpeta de invitados la cuenta Padre				
				alertDialogBuilder.setMessage("Todos tus comprobantes han sido eliminados.");
				
			}else{
				alertDialogBuilder.setMessage("No se pudo eliminar la informaci�n.");
			}
		}
		if(check==1 && exit){
			alertDialogBuilder.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
            @Override
			public void onClick(DialogInterface dialog,int id) { 
            	// enviar a login.  
            	Intent intent = new Intent(cordova.getActivity(),BCom.class);
            	intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            	cordova.getActivity().startActivity(intent);
//            	BCom.getMe().finish();
            	BCom.getInstance().finish();
            }
          });
		AlertDialog alertDialog = alertDialogBuilder.create();
         alertDialog.show();
		}else{
			alertDialogBuilder.setNeutralButton("Aceptar",new DialogInterface.OnClickListener() {
	            @Override
				public void onClick(DialogInterface dialog,int id) { 

	            }
	          });
			AlertDialog alertDialog = alertDialogBuilder.create();
	         alertDialog.show();
		}
	}
					         
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		
		if(action.equals("doComprobantes")) {
			this.doComprobantes(args);
		} else if(action.equals("doComprobantesInvitados")) {
			doComprobantesInvitados(args);
		}else if(action.equals("ejecutaBorradoDueno")){
			ejecutaBorradoDueno(args);
		}else if(action.equals("ejecutaBorrado")){
			ejecutaBorrado(args);
		} else if(action.equals("ejecutaBorradoInvitados")){
			ejecutaBorradoInvitados(args);
		} else if(action.equals("seleccionaComponentesPropios")){
			seleccionaComponentesPropios(args);
		} else if(action.equals("seleccionaComponentesOtros")){
			seleccionaComponentesOtros(args);
		}else if(action.equals("ejecutaBorradoComprobantes")){
			ejecutaBorradoComprobantes(args);
		}else if(action.equals("activaBanderaInvitado")){
			activaBanderaInvitado(args);
		}else if(action.equals("muestraAlerta")){
			muestraAlerta(callbackContext);
			return true;
		}else {
			return super.execute(action, args, callbackContext);
		}
		
		return true;
	}
}
