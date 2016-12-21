/* -------------------------- JavaScript --------------------------*/
//Variables agregadas seg�n D310 0017
var MisCtasCCheqMquince = false;
var MisCtasCCheqTDC = false;
var MisCtasTDCCCheq = false;
var CtasBBVACCheqNuevaCta = false;
var CtasBBVACCheqFrecuente = false;
var otrosBancosCCheqNuevaCta = false;
var otrosBancosCCheqDebito = false;
var otrosBancosCCheqCredito = false;
//

var banderaMisCuentas = false;
var banderaCuentasBBVA = false;
var banderaOtrosBancos = false;

function accionArrastrar(valor){
  if (valor == "con-cheq") {
    conCheq();
  }else if (valor == "ahorradito" ) {
  }else if(valor == "mi-quince"){  	
    miQuince();
  }else if(valor == "tdc"){
    TDC();
  }else if(valor == "mis-cuentas-navcta-bbva"){
    ctasBBVACCheqNuevaCta();
  }else if(valor == 'frecuentes'){
    ctasBBVACCheqFrecuente();
  }else if(valor == 'otrosbancos-nuevaCta'){
	  otrosBancosNvaCta();
  }else if(valor == 'debito'){
	  otrosBancosDebito();
  }
  else if(valor == 'credito'){
	  otrosBancosCredito();
  }
  
  

}

//funciones agregadas
function miQuince(){
  MisCtasCCheqMquince = true;
  MisCtasCCheqTDC = false;
  MisCtasTDCCCheq = false;
  CtasBBVACCheqNuevaCta = false;
  CtasBBVACCheqFrecuente = false;
  otrosBancosCCheqNuevaCta = false;
  otrosBancosCCheqDebito = false;
  otrosBancosCCheqCredito = false;
  verificaValores();
}

function TDC(){
  MisCtasCCheqTDC = true;
  MisCtasCCheqMquince = false;
  MisCtasTDCCCheq = false;
  CtasBBVACCheqNuevaCta = false;
  CtasBBVACCheqFrecuente = false;
  otrosBancosCCheqNuevaCta = false;
  otrosBancosCCheqDebito = false;
  otrosBancosCCheqCredito = false;
  verificaValores();
}

function conCheq(){
  MisCtasTDCCCheq = true;
  MisCtasCCheqMquince = false;
  MisCtasCCheqTDC = false;
  CtasBBVACCheqNuevaCta = false;
  CtasBBVACCheqFrecuente = false;
  otrosBancosCCheqNuevaCta = false;
  otrosBancosCCheqDebito = false;
  otrosBancosCCheqCredito = false;
  verificaValores();
}

function ctasBBVACCheqNuevaCta(){
  CtasBBVACCheqNuevaCta = true;
  MisCtasTDCCCheq = false;
  MisCtasCCheqMquince = false;
  MisCtasCCheqTDC = false;
  CtasBBVACCheqFrecuente = false;
  otrosBancosCCheqNuevaCta = false;
  otrosBancosCCheqDebito = false;
  otrosBancosCCheqCredito = false;
  verificaValores();
}

function ctasBBVACCheqFrecuente(){
  CtasBBVACCheqNuevaCta = false;
  MisCtasTDCCCheq = false;
  MisCtasCCheqMquince = false;
  MisCtasCCheqTDC = false;
  CtasBBVACCheqFrecuente = true;
  otrosBancosCCheqNuevaCta = false;
  otrosBancosCCheqDebito = false;
  otrosBancosCCheqCredito = false;
  verificaValores();
}

function otrosBancosNvaCta(){
	CtasBBVACCheqNuevaCta = false;
	MisCtasTDCCCheq = false;
	MisCtasCCheqMquince = false;
	MisCtasCCheqTDC = false;
	CtasBBVACCheqFrecuente = false;
	otrosBancosCCheqNuevaCta = true;
	otrosBancosCCheqDebito = false;
	otrosBancosCCheqCredito = false;
	verificaValores();
}

function otrosBancosDebito(){
	CtasBBVACCheqNuevaCta = false;
	MisCtasTDCCCheq = false;
	MisCtasCCheqMquince = false;
	MisCtasCCheqTDC = false;
	CtasBBVACCheqFrecuente = false;
	otrosBancosCCheqNuevaCta = false;
	otrosBancosCCheqDebito = true;
	otrosBancosCCheqCredito = false;
	verificaValores();
}

function otrosBancosCredito(){
	CtasBBVACCheqNuevaCta = false;
	MisCtasTDCCCheq = false;
	MisCtasCCheqMquince = false;
	MisCtasCCheqTDC = false;
	CtasBBVACCheqFrecuente = false;
	otrosBancosCCheqNuevaCta = false;
	otrosBancosCCheqDebito = false;
	otrosBancosCCheqCredito = true;
	verificaValores();
}


var array;
function verificaValores(){
  array = [MisCtasCCheqMquince, MisCtasCCheqTDC, MisCtasTDCCCheq, CtasBBVACCheqNuevaCta, CtasBBVACCheqFrecuente, otrosBancosCCheqNuevaCta, otrosBancosCCheqDebito, otrosBancosCCheqCredito];
  if(MisCtasCCheqMquince){
    parent.document.getElementById('contentFrame').src = 'transferirMisCtasCCheqMquinceInicio.html?arreglo='+array; //Correcto
  }else if(MisCtasCCheqTDC){
	  parent.document.getElementById('contentFrame').src = 'transferirMisCtasCCheqTDCInicio.html?arreglo='+array; //Correcto

  }else if(MisCtasTDCCCheq){
	  parent.document.getElementById('contentFrame').src = 'transferirMisCtasTDCCCheqInicio.html?arreglo='+array; //Correcto

  }else if(CtasBBVACCheqNuevaCta){
	  parent.document.getElementById('contentFrame').src = 'transferirCtasBBVACCheqNuevaCtaInicio.html?arreglo='+array; //Correcto
  }else if(CtasBBVACCheqFrecuente){
      parent.document.getElementById('contentFrame').src = 'transferirCtasBBVACCheqFrecuenteInicio.html?arreglo='+array; //Correcto

  }else if(otrosBancosCCheqNuevaCta){
	  parent.document.getElementById('contentFrame').src = 'transferirOtrosBancosCCheqNuevaCtaInicio.html?arreglo='+array; //Correcto

  }else if(otrosBancosCCheqDebito){
	  parent.document.getElementById('contentFrame').src = 'transferirOtrosBancosCCheqDebitoInicio.html?arreglo='+array; //Correcto

  }else if(otrosBancosCCheqCredito){
	  parent.document.getElementById('contentFrame').src = 'transferirOtrosBancosCCheqCreditoInicio.html?arreglo='+array; //Correcto

  }
  
}

function confirmar(array) {
    if (array[0] == "true") {
        console.log('array[0] = true');
        parent.document.getElementById('contentFrame').src = 'transferirMisCtasCCheqMquinceTermino.html?arreglo='+array; //Correcto
    } else if (array[1] == "true") {
    	parent.document.getElementById('contentFrame').src = 'transferirMisCtasCCheqTDCTermino.html?arreglo='+array; //Correcto

    } else if (array[2] == "true") {
    	parent.document.getElementById('contentFrame').src = 'transferirMisCtasTDCCCheqTermino.html?arreglo='+array; //Correcto

    } else if (array[3] == "true") {
        parent.document.getElementById('contentFrame').src = 'transferirCtasBBVACCheqNuevaCtaAprobacion.html?arreglo='+array; //Correcto

    } else if (array[4] == "true") {
        console.log('array[4] = true');
        parent.document.getElementById('contentFrame').src = 'transferirCtasBBVACCheqFrecuenteTermino.html?arreglo='+array; //Correcto

    } else if (array[5] == "true") {
        parent.document.getElementById('contentFrame').src = 'transferirOtrosBancosCCheqNuevaCtaTermino.html?arreglo='+array; //Correcto

    } else if (array[6] == "true") {
        console.log('array[6] = true');
        parent.document.getElementById('contentFrame').src = 'transferirOtrosBancosCCheqDebitoTermino.html?arreglo='+array; //Correcto

    } else if (array[7] == "true") {
        console.log('array[7] = true');
        parent.document.getElementById('contentFrame').src = 'transferirOtrosBancosCCheqCreditoTermino.html?arreglo='+array; //Correcto

    }  
}


  function confirmarTres(array){
      if (array[3] == "true") {
    	  parent.document.getElementById('contentFrame').src = 'transferirCtasBBVACCheqNuevaCtaTermino.html?arreglo='+array; //Correcto

    }
      if (array[5] == "true") {
    	  parent.document.getElementById('contentFrame').src = 'transferirOtrosBancosCCheqNuevaCtaAprobacion.html?arreglo='+array; //Correcto

      }
	
	
  }

  function corregir(array){
    if (array[3] =="true" ) {
    	parent.document.getElementById('contentFrame').src = 'transferirCtasBBVACCheqNuevaCtaAprobacionCorregir.html?arreglo='+array; //Correcto

    }else if(array[5] == "true"){
    	parent.document.getElementById('contentFrame').src = 'transferirOtrosBancosCCheqNuevaCtaAprobacionCorregir.html?arreglo='+array; //Correcto
    }
    
  }

  function continuar(array){
	if(array[0]=="true"){
      parent.document.getElementById('contentFrame').src = 'transferirMisCtasCCheqMquinceAprobacion.html?arreglo='+array; //Correcto
	}else if(array[1]=="true"){
      var btnsChecked = document.getElementsByName('RadioGroup');
      for(var i = 0; i < btnsChecked.length; i++){
        if(i < 3 && btnsChecked.item(i).checked == true){
        	parent.document.getElementById('contentFrame').src = 'transferirMisCtasCCheqTDCAprobacion.html?arreglo='+array; //Correcto

        }else if(btnsChecked.item(3).checked == true && document.getElementById('rbcantidad').value > 0){

        	parent.document.getElementById('contentFrame').src = 'transferirMisCtasCCheqTDCAprobacion.html?arreglo='+array; //Correcto

        }
      }
    }else if(array[2]=="true"){
    	parent.document.getElementById('contentFrame').src = 'transferirMisCtasTDCCCheqAprobacion.html?arreglo='+array; //Correcto

    }else if(array[3]=="true"){
      if(document.getElementById('cta-tarjeta-deposito').value >= 16 && document.getElementById('input-ctas-bbva2').value > 0){
    	  parent.document.getElementById('contentFrame').src = 'transferirCtasBBVACCheqNuevaCtaConfirmacion.html?arreglo='+array; //Correcto

      }
    }else if(array[4]=="true"){

    	parent.document.getElementById('contentFrame').src = 'transferirCtasBBVACCheqFrecuenteAprobacion.html?arreglo='+array; //Correcto

    }else if(array[5]=="true"){

    	parent.document.getElementById('contentFrame').src = 'transferirOtrosBancosCCheqNuevaCtaConfirmacion.html?arreglo='+array; //Correcto
    }
	else if(array[6]=="true"){

		parent.document.getElementById('contentFrame').src = 'transferirOtrosBancosCCheqDebitoAprobacion.html?arreglo='+array; //Correcto

    }else if(array[7]=="true"){

    	parent.document.getElementById('contentFrame').src = 'transferirOtrosBancosCCheqCreditoAprobacion.html?arreglo='+array; //Correcto

    }
  }

  
 function comprobante(array){
    if(array[0]=="true" || array[1]=="true" || array[2]=="true"){
    	$('body', window.parent.document).append( "<div id='comprobanteFrame' onclick='$(\"#comprobanteFrame\").remove();'><div id='imagenComprobante'></div></div>" );
    }else if(array[3] == "true" || array[4] == "true"){
    	$('body', window.parent.document).append( "<div id='comprobanteFrame' onclick='$(\"#comprobanteFrame\").remove();'><div id='imagenComprobante'></div></div>" );
    }else if(array[5] == "true" || array[6] == "true" || array[7] == "true"){
    	$('body', window.parent.document).append( "<div id='comprobanteFrame' onclick='$(\"#comprobanteFrame\").remove();'><div id='imagenComprobante'></div></div>" );
    }
  }

  function inicio(url){
      parent.baseViewController.validaLocation('', '', '');
  }

  function getVarsUrl(){
      var url= document.location.search.replace("?", "");
      var arrUrl = url.split("&");
      var urlObj={};
      for(var i=0; i<arrUrl.length; i++){
          var x= arrUrl[i].split("=");
          urlObj[x[0]]=decodeURIComponent(x[1]);
      }
      return urlObj;
  }

  function validaTarjeta(array){
	  var keyCode = event.keyCode;
      if (keyCode < 48 || keyCode > 57){
          return false;
          
      }else if(document.getElementById('cta-tarjeta-deposito').value.length == 15){
    	  
    	    var misVariablesGet = getVarsUrl();
    	    var bandRegresar = misVariablesGet.bandRegresar;
    	    var idOrigen = misVariablesGet.idOrigen;
    	    var idDestino=misVariablesGet.idDestino;
    	    var impOper=document.getElementById('importe-ctas-bbva').value;
            var idTipo=document.getElementById('cboTIPOCUENTA').value;
    	    var reglasNegocio = JSON.parse(sessionStorage.jsonReglasNegocio);
    	    var fecOper = reglasNegocio.usuario.fechaservidor;
            var tarjetaDep = document.getElementById('cta-tarjeta-deposito').value;
          
    	    var parametros = "&bandRegresar=false&idOrigen="+idOrigen+"&idDestino="+idDestino+"&impOper="+impOper+"&idTipo="+idTipo+"&fecOper="+fecOper+"&tarjetaDep="+tarjetaDep+"&inicioSig=true";
    	  
    	    console.log("validaTarjeta parametros "+parametros);
    	  
    	    parent.document.getElementById('contentFrame').src = 'transferirCtasBBVACCheqNuevaCtaInicioSig.html?arreglo='+array+parametros; //Correcto
 
      }
  }

 function key(e) {
    return e ? e.which : event.keyCode;
 }
  
 function recargaVistasTransferir(section) {
     parent.baseViewController.validaLocation('isTransfer', section, '');
}

function loadBancosOrigen() {
	    console.log("INICIO loadBancosOrigen");
		var selectCombo = $('#cboBancosDestino');
		
		selectCombo.empty();
		selectCombo.append('<option value=0 selected=true>HSBC</option>');
		selectCombo.append('<option value=1>HSBC</option>');
		selectCombo.append('<option value=2>SANTANDER</option>');
		selectCombo.append('<option value=3>BANAMEX</option>');
		
	    console.log("FIN loadBancosOrigen");
}