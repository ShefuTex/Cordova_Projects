package com.bancomer.btrader.persistence;

import com.bancomer.btrader.session.Server;

public class ServerResponse { 
	
	private Server.EstadoRespuesta estado = Server.EstadoRespuesta.Ok;
	private String mensaje = "";
	private String codigoError = "";
	private String jsonResultante = "";
	
	public Server.EstadoRespuesta getEstado() {
		return estado;
	}
	public void setEstado(Server.EstadoRespuesta estado) {
		this.estado = estado;
	}
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	public String getCodigoError() {
		return codigoError;
	}
	public void setCodigoError(String codigoError) {
		this.codigoError = codigoError;
	}
	public String getJsonResultante() {
		return jsonResultante;
	}
	public void setJsonResultante(String jsonResultante) {
		this.jsonResultante = jsonResultante;
	}

}
