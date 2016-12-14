var lista ="";

/** Da formato al importe que se debe mostrar cuando se ha pulsado la tecla de borrado */
function formatearImporteAlBorrar(e, importeHTML) {
    var esValido;
    
    key = e.keyCode ? e.keyCode : e.which;
    
    if (key == 8) {
        console.log("he pulsado el backspace");
        esValido = true;
        
        var importeDeEntrada = importeHTML.value;
        console.log("importe de entrada: " + importeDeEntrada);
        
        importeDeEntrada = desformatearImporte(importeDeEntrada);
        console.log("importe sin formatear: " + importeDeEntrada);
        
        var importeFormateado = formatearImporte(importeDeEntrada, importeDeEntrada.length-1);
        console.log("importe formateado: " + importeFormateado);
        
        importeHTML.value = importeFormateado;
        
    } else {
        esValido = false;
    }
    
    return esValido;
}

/** Da formato al importe que se debe mostrar cuando se ha introducido un dígito */
function formatearImporteAlEscribir(e, importeHTML) {
    
    var importeDeEntrada = importeHTML.value;
    var importeValido;
    
    var pantallaImporte=importeHTML.className;
   /* var limiteTMisCuentas=false;
    
    if (pantallaImporte.localeCompare("transferir-miscuentas-input-importe")==0){
        limiteTMisCuentas=true;
    }
     */
    key = e.keyCode ? e.keyCode : e.which;
   // importeValido = esImporteValido(key, importeHTML, limiteTMisCuentas);
    importeValido = esImporteValido(key, importeHTML);
    console.log("importe de entrada: " + importeDeEntrada);
    
    if (importeValido) {
        importeDeEntrada = desformatearImporte(importeDeEntrada);
        console.log("importe sin formatear: " + importeDeEntrada);
        
        var importeFormateado = formatearImporte(importeDeEntrada, importeDeEntrada.length+1);
        console.log("importe formateado: " + importeFormateado);
        
        importeHTML.value = importeFormateado;
    }
    
    return importeValido;
}

/** Quita de un importe todo lo que no sean dígitos (normalmente comas, punto y símbolo de la moneda) */
function desformatearImporte(importeFormateado) {
    var importeSinFormatear = "";
    
    // En este bucle elimino todo lo que no sean números
    for (var i = 0; i < importeFormateado.length; i++) {
        var asciiCode = importeFormateado.charAt(i).charCodeAt(0);
        
        if (asciiCode > 47 && asciiCode < 58) {
            importeSinFormatear = importeSinFormatear + importeFormateado.charAt(i);
        }
    }
    
    // En este bucle elimino todos los ceros a la izquierda que pueda haber
    while ((importeSinFormatear.length > 1) && (importeSinFormatear.charAt(0) == '0')) {
        importeSinFormatear = importeSinFormatear.substring(1);
    }
    
    return importeSinFormatear;
}


/** Da al importe el formato $X,XXX,XXX,XXX.XX */
function formatearImporte(importeDeEntrada, longitudEfectiva) {
    var importeFormateado = importeDeEntrada;
    var moneda = '$';
    
    if (longitudEfectiva == 0) {
        importeFormateado = moneda + '0.00';
    } else if (longitudEfectiva == 1) {
        importeFormateado = moneda + '0.0' + importeDeEntrada;
    } else if (longitudEfectiva == 2) {
        importeFormateado = moneda + '0.' + importeDeEntrada;
    } else {
        var numComas = parseInt((longitudEfectiva - 3) / 3);
        var indiceInicio = 0;
        
        importeFormateado = moneda;
        for (var i = 0; i < numComas; i++) {
            importeFormateado = importeFormateado + importeDeEntrada.substring(indiceInicio, longitudEfectiva - 3*(numComas-i) - 2) + ',';
            indiceInicio = longitudEfectiva - 3*(numComas-i) - 2;
        }
        
        importeFormateado = importeFormateado + importeDeEntrada.substring(indiceInicio, longitudEfectiva-2) + '.' + importeDeEntrada.substring(longitudEfectiva-2);
    }
    
    return importeFormateado;
}

/** Da formato al importe cuando se han borrado todos los dígitos (esta función no conseguía hacerla el método llamado desde onKeyDown) */
function formatearImporteVacio(e, importeHTML) {
    if (importeHTML.value == "$0.0") {
        importeHTML.value = "";
    }
}

/** Comprueba si se desea introducir un importe válido */
//function esImporteValido(key, importe, limiteMisCuentas) {
function esImporteValido(key, importe) {
    var esValido;
    
    if (key == 8) {
        console.log("he pulsado el backspace");
        esValido = true;
        
    } else if (key > 47 && key < 58) {
        console.log("he metido un digito");
        
        if ((importe.value == "") && (key == 48)) {
            console.log("estoy intentando meter un 0 a la izquierda");
            esValido = false;
        } else {
            if ((desformatearImporte(importe.value).length < 17)) {
                //si vengo por transferencia a mis cuentas debe ser un digito menos el importe
               /* if (desformatearImporte(importe.value).length == 17 && limiteMisCuentas){
                    
                    esValido = false;
                }else{
                    // Puedo meter el nuevo dígito
                    esValido = true;
                }*/
                esValido = true;
            }
            else {
                // Ya he alcanzado el máximo de dígitos permitidos
                esValido = false;
            }
        }
        
    } else {
        esValido = false;
    }
    
    return esValido;
}

/** Formatea el importe de acuerdo al formato utilizado para las peticiones (es decir, con los dígitos y el punto decimal) */
function formatearImporteParaPeticion(importeFormateado) {
    var importeSinFormatear = "";
    
    // En este bucle elimino todo lo que no sean números ni el punto
    for (var i = 0; i < importeFormateado.length; i++) {
        var asciiCode = importeFormateado.charAt(i).charCodeAt(0);
        
        if ((asciiCode > 47 && asciiCode < 58) || (asciiCode == 46)) {
            importeSinFormatear = importeSinFormatear + importeFormateado.charAt(i);
        }
    }
    
//    console.log("importe para peticion: " + importeSinFormatear);
    
    return importeSinFormatear;
}

/** Quita de un importe todo lo que no sean dígitos (normalmente comas, punto y símbolo de la moneda) */
function desformatearImporte(importeFormateado) {
    var importeSinFormatear = "";
    
    // En este bucle elimino todo lo que no sean números
    for (var i = 0; i < importeFormateado.length; i++) {
        var asciiCode = importeFormateado.charAt(i).charCodeAt(0);
        
        if (asciiCode > 47 && asciiCode < 58) {
            importeSinFormatear = importeSinFormatear + importeFormateado.charAt(i);
        }
    }
    
    // En este bucle elimino todos los ceros a la izquierda que pueda haber
    while ((importeSinFormatear.length > 1) && (importeSinFormatear.charAt(0) == '0')) {
        importeSinFormatear = importeSinFormatear.substring(1);
    }
    
    return importeSinFormatear;
}


function FechaActual() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd
	} 
	if(mm<10){
		mm='0'+mm
	} 
	var fecha = dd+'/'+mm+'/'+yyyy;
	return fecha;
}

function CurrencyFormat(number){
   var decimalplaces = 2;
   var decimalcharacter = ".";
   var thousandseparater = ",";
   number = parseFloat(number);
   var sign = number < 0 ? "-" : "";
   var formatted = new String(number.toFixed(decimalplaces));
   if( decimalcharacter.length && decimalcharacter != "." ) { formatted = formatted.replace(/\./,decimalcharacter); }
   var integer = "";
   var fraction = "";
   var strnumber = new String(formatted);
   var dotpos = decimalcharacter.length ? strnumber.indexOf(decimalcharacter) : -1;
   if( dotpos > -1 )
   {
      if( dotpos ) { integer = strnumber.substr(0,dotpos); }
      fraction = strnumber.substr(dotpos+1);
   }
   else { integer = strnumber; }
   if( integer ) { integer = String(Math.abs(integer)); }
   while( fraction.length < decimalplaces ) { fraction += "0"; }
   temparray = new Array();
   while( integer.length > 3 )
   {
      temparray.unshift(integer.substr(-3));
      integer = integer.substr(0,integer.length-3);
   }
   temparray.unshift(integer);
   integer = temparray.join(thousandseparater);
   return sign + integer + decimalcharacter + fraction;
}

function lstPat(identificador, lstDatos) {
	tam = lstDatos.length;
	lista = "";
  $('#wt_txImporte').attr("disabled", true);
  $('#btnOperacion').attr("disabled", true);
	console.log("Tamaño: "+tam);
	lista += "<table id=\"wt_listaC\"><tbody>";					
	var miId="";	
	for(var i=0; i < tam; i++) {
		elem = lstDatos[i];
		cutaSel= elem.cuenta.slice(-10);
		console.log("ID: "+elem.id);
		miId = "tablaA"+i;
		/*lista += "ID: " + elem.id + " Divisa: " +	elem.divisas + " Número: " +  + " Número: " + elem.num_asunto;
		lista += "<br />";*/
		lista += "<tr id=" + miId + " onclick=\"consultaCuentas(\'"+elem.id+"\', \'"+cutaSel+"\', \'"+elem.divisas+"\', \'"+i+"\', \'"+tam+"\' )\"><td id='estilo"+i+"'><div id=\"wt_contenedorCta\"><div id=\"wt_cuentaC\">Contrato Patrimonial</div><div id=\"wt_divisaC\">"+elem.divisas+"</div></div><div id=\"wt_contenedorCta\"><!--div id=\"wt_montoS\">&nbsp;</div--><div id=\"wt_ctaPat\">"+cutaSel+"</div></div></td></tr>"
	}
	lista += "</tbody></table>";

	document.getElementById(identificador).innerHTML = lista;
	
/*	$(miId).css(background:#FDF5D8; color: #666666;);*/

}

//lstPat("contenedorPat", ctasPat);

//lista = "";



function consultaCuentas(idCta, ctaSel, divisaSel, i,tam){
	var objCtasMXP = JSON.parse(sessionStorage.jsonPosicion).posicionGlobal.asuntos.lista_cuentas_mxp;
    console.log(objCtasMXP);

	console.log("Cuentas MXP: "+ objCtasMXP);
	
	//getElementById("lbContrato").text=ctaSel;

    $("#trans1").hide();
	$("#lbContrato").text(ctaSel);
    var rowCount = $('#wt_listaC').length;
    
    console.log("Tam Table_1: "+ rowCount);
    console.log("Tam Table_2: "+ tam);
    for(var z=0; z<=tam;z++ ){
        var id = "#estilo"+z;
        console.log("idXX: "+id);
        if(i == z){
 
            $(id).attr("class","wt_select");
        }else{
            $(id).removeClass("wt_select");
        
        }

    }

	var resCtas;

	console.log ("Cuentas Transferencia Efectivo: "+ idCta);
	parent.loginDelegate.wtListaCuentas(idCta, function (resCuentas, resOK) {
		if (resOK == "OK") {
      console.log("RespuestaCtas: "+ resCuentas);
		  resCtas = JSON.parse(resCuentas).respuesta.listaCuentas;
		  console.log("resCtas: "+ resCtas);
		  pintaLstCtas("wt_contenedorMXP", resCtas, objCtasMXP, idCta, ctaSel, divisaSel);
    }
	});

	
}



function pintaLstCtas(identificador, lstDatos, lstCtasMXP, idSel, ctaSel, divisaSel) {
	
	$("#wt_contenedorMXP").removeClass("wt_contenedorMXPE");
	$("#wt_contenedorMXP").addClass("wt_contenedorMXPActivo");
	
	try {
		tamDat = lstDatos.length;
		console.log("Tamaño Datos: "+ tamDat);
	} catch (err) { console.log("Error consulta");}
	
	try {
		tamCtasMXP = lstCtasMXP.length;
		console.log(" Tamaño MXP: "+ tamCtasMXP);
	} catch (err) { console.log("Error ctas MXP");}

	lista="";
	lista += "<table id=\"wt_listaD\"><tbody>";

	var idMXP     = "";
	var ctaMXP    = "";
	var divisaMXP = "";
	var montoMXP  = "";
	var tipoMXP   = "";
	var idPat     = idSel;
	var ctaPat    = ctaSel;
	var divisaPat = divisaSel;
	var montoPat  = "";
	var tipoPat   = "Patrimonial";

	var miId2="";
	var miId3="";
	for(var i=0; i < tamDat; i++) {
		miId2 = "tablaD"+i;
		miId3 = "tablaE"+i;
		elem = lstDatos[i];
		
		console.log("PTMX: " + elem.idCuenta.substring(0,4));
		if(elem.idCuenta.substring(0,4) == "PTMX") {
			console.log("ID: "+ elem.idCuenta);
			console.log(" Cuenta: "+ ctaSel);
			console.log(" Divisa: "+ divisaSel);
			console.log(" Tipo: " + "Patrimonial");
			console.log(" Monto: "+ CurrencyFormat(elem.saldo));
			montoPat = CurrencyFormat(elem.saldo);
		} else {
			console.log("tamCtasMXP: "+tamCtasMXP);
			for(var y=0; y < tamCtasMXP; y++) {
				elemMXP = lstCtasMXP[y];
				console.log ("ID: " + elemMXP.id + " ID: " + elem.idCuenta);
				if(elemMXP.id == elem.idCuenta){
					console.log("ID: "+ elem.idCuenta);
					cuenta = elemMXP.alias == "" ? elemMXP.numero.slice(-10) : elemMXP.alias
					console.log("Cuenta: "+ cuenta);
					console.log("Divisa: "+ elemMXP.divisa);
					tipoCta = elemMXP.tipo == "AH" ? "Ahorro" : (elemMXP.tipo == "CH" ? "Cheques" : (elemMXP.tipo == "Li" ? "Libreton" : ""));
					console.log("Tipo: " + tipoCta);
					console.log("Monto: "+ CurrencyFormat(elem.saldo));
					idMXP=elem.idCuenta;
					ctaMXP=elemMXP.alias == "" ? elemMXP.numero.slice(-10) : elemMXP.alias;
					divisaMXP=elemMXP.divisa;
					tipoMXP = elemMXP.tipo == "AH" ? "Ahorro" : (elemMXP.tipo == "CH" ? "Cheques" : (elemMXP.tipo == "Li" ? "Libreton" : ""));
					montoMXP = CurrencyFormat(elem.saldo);
					console.log("ID: "+ idMXP);
					console.log("Cuenta: "+ ctaMXP);
					console.log("Divisa: "+ divisaMXP);
					console.log("Tipo: " + tipoMXP);
					console.log("Monto: "+ montoMXP);
					break;
				}
			}
		}
	}
	
	lista += "<tr id=" + miId2 + " onclick=\"llenaOperacion(\'"+idPat+"\', \'"+ctaPat+"\', \'"+tipoMXP+"\', \'"+idMXP+"\', \'"+ctaMXP+"\', \'0\')\"><td id='selecB0'>";
	
/*	lista += "<div id=\"wt_contenedorCta\"><div id=\"cuentaA\">"+ctaPat+"</div><div id=\"wt_tipoCtaA\">"+tipoPat+"</div><div id=\"wt_divisaA\">"+divisaPat+"</div></div><div id=\"wt_contenedorCta\"><div id=\"wt_montoS\">$</div><div id=\"wt_montoC\">"+montoPat+"</div></div>";*/
	/*Se agrego aqui*/
	lista += "<div id=\"wt_contenedorCta\"><div id=\"wt_tipoCtaA\">"+tipoPat+"</div><div id=\"wt_cuentaA\">"+ctaPat+"</div></div><div id=\"wt_contenedorCta\"><!--div id=\"wt_montoS\">$</div--><div id=\"wt_montoC\"> $ "+montoPat+"</div></div>";
	lista += "</td></tr>";

	lista += "<tr id=" + miId3 + " onclick=\"llenaOperacion(\'"+idMXP+"\', \'"+ctaMXP+"\', \'"+tipoPat+"\', \'"+idPat+"\', \'"+ctaPat+"\', \'1\')\"><td id='selecB1'>";
	
/* lista += "<div id=\"wt_contenedorCta\"><div id=\"wt_cuentaA\">"+ctaMXP+"</div><div id=\"wt_tipoCtaA\">"+tipoMXP+"</div><div id=\"divisaA\">"+divisaMXP+"</div></div><div id=\"wt_contenedorCta\"><div id=\"wt_montoS\">$</div><div id=\"wt_montoC\">"+montoMXP+"</div></div>"; */
	/*Se agrego aqui*/
	lista += "<div id=\"wt_contenedorCta\"><div id=\"wt_tipoCtaA\">"+tipoMXP+"</div><div id=\"wt_cuentaA\">"+ctaMXP+"</div></div><div id=\"wt_contenedorCta\"><!--div id=\"wt_montoS\">$</div--><div id=\"wt_montoC\"> $ "+montoMXP+"</div></div>";
	lista += "</td></tr>";

	lista += "</tbody></table>";
	document.getElementById(identificador).innerHTML = lista;

}

function llenaOperacion(idSel, ctaSel, tipoCta, idOp, ctaOp,i) {
	console.log("idSel: "+ idSel);
	console.log("ctaSel: "+ ctaSel);
	console.log("idOp: "+ idOp);
	console.log("CtaOp: "+ ctaOp);
    if(i == 0){
        $("#selecB0").attr("class","wt_select");
        $("#selecB1").removeClass("wt_select");
    } else {
        $("#selecB1").attr("class","wt_select");
        $("#selecB0").removeClass("wt_select");
    }
    
   $("#trans2").hide();
   $("#idCuentaCargo").val(idSel);
   $("#CuentaCargo").val(ctaSel);

   $("#idCuentaAbono").val(idOp);
   $("#CuentaAbono").val(ctaOp);
   $("#hFecha").val(FechaActual());

   $("#lbCtaRetiro").text(ctaSel);
   $("#lbCtaDestino").text(ctaOp);

   var txtCuenta = "Cuenta "+tipoCta+": ";
   $("#lbOper").text(txtCuenta);
   $("#lbCtaOper").text(ctaOp);
   $("#lbfecha").text(FechaActual());


   $("#lbFechOp").text(FechaActual());

   $('#wt_txImporte').attr("disabled", false);
   $('#btnOperacion').attr("disabled", false);
    console.log("AQUI ENTRO A LA 3RA OPCION");
    $("#wt_contenedor").removeClass("wt_contenedorE");
	$("#wt_contenedor").addClass("wt_contenedorActivo");

}

function ejecutaOperacion(){
    
	console.log("id Cargo: "+$("#idCuentaCargo").val());
	console.log("id Abono: "+$("#idCuentaAbono").val());
	console.log("id Fecha: "+$("#hFecha").val());

	var importe = formatearImporteParaPeticion($("#wt_txImporte").val());
	console.log("Importe: "+ importe);
	var ctaAbono = $("#idCuentaAbono").val();
	var ctaCargo = $("#idCuentaCargo").val();
	var fecha = $("#hFecha").val();
	var folio = "";

	if (importe >= 0.02) {
		parent.loginDelegate.wtaplicaTraspaso(ctaAbono, ctaCargo, importe, function (respuesta, resOK) {
      if (resOK == "OK") {
  			console.log("ejecutaOperacion: "+ respuesta);
  			folio = JSON.parse(respuesta).respuesta.folioInternet;
  			console.log("folioInternet: "+folio);

  			if (folio != "") {
  				$("#lbImporte").text(importe);
     				$("#lbFolio").text(folio);
     				$("#wt_Comprobante").show();
     				$("#wt").hide();
            $("#btnCerrar").hide();
            $("#wt_btnRegresar").show();
  			}
      }
		});
	} else {
		parent.loginDelegate.showAlert("Aviso\n", "Por favor introduce una cantidad mayor a 0.02.", "Aceptar");
	}

}
function regresar() {
	$("#wt").show();
	$("#wt_Comprobante").hide();
  $("#btnCerrar").show();
  $("#wt_btnRegresar").hide();
  $("#wt_listaD").remove();
  document.getElementById("wt_txImporte").value = "";
  $("#wt_contenedorMXP").addClass("wt_contenedorMXPE");
  $("#wt_contenedorMXP").removeClass("wt_contenedorMXPActivo");
  $("#wt_contenedor").addClass("wt_contenedorE");
  $("#wt_contenedor").removeClass("wt_contenedorActivo");
  
  $("#lbCtaOper").text("");
  $("#lbOper").text("");
  $("#trans1").show();
  $("#trans2").show();
}


function formatearImporteCtaBBVA(importeHTML) {

	var importe = importeHTML.value;
	
	// 16 enteros y 2 decimales.
	var maxLength = 18;
	var dolar = "$";

	if (getAndroidVersion() == "4.0.4") {
		dolar = "";
	}

	var ffinal = "";
	var cad = dolar + "0.00";

	//  Quitamos los caracteres no permitidos
	for (i = 0; i < importe.length; i++) {
		if (ffinal.length == 0) {
			if (isNumber(importe.charAt(i)) && importe.charAt(i) != "0") {
				ffinal = ffinal + importe.charAt(i);
			}
		} else {
			if (isNumber(importe.charAt(i))) {
				ffinal = ffinal + importe.charAt(i);
			}
		}
	}

	if (ffinal.length == 0) {
		ffinal = cad;
	} else if (ffinal.length == 1) {
		ffinal = dolar + "0.0" + ffinal;
	} else if (ffinal.length == 2) {
		ffinal = dolar + "0." + ffinal;
	} else {
		// AÃ±adimos ',' y '.'
		ffinal = ffinal.substring(0, maxLength);
		var decimales = ffinal.substring(ffinal.length - 2, ffinal.length);
		var ent = ffinal.substring(0, ffinal.length - 2);
		var ffinal = "";

		while (ent.length > 3) {
			ffinal = "," + ent.charAt(ent.length - 3)
					+ ent.charAt(ent.length - 2) + ent.charAt(ent.length - 1)
					+ ffinal;
			ent = ent.substring(0, ent.length - 3);
		}

		ffinal = ent + ffinal;
		ffinal = dolar + ffinal + "." + decimales;
	}

	importeHTML.value = ffinal;

	return true;
}


function isNumber(num) {
	var RegExPattern = /^\d{1}$/;
	if ((num.match(RegExPattern))) {
		return true;
	}
	return false;
}


function getAndroidVersion() {
	return parent.device.version;
}