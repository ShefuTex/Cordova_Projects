/**
 * odt7
 * Javascript Invertir Venta
*/

var reglasDeNegocio;



/*********************** INICIO Funciones Invertir Venta ***********************/

/**
 * Recupera reglas de negocio
 */
function cargarReglasDeNegocio(){
	    
    var cargos = JSON.parse(sessionStorage.jsonReglasNegocio).aplicaciones.entreMiscuentas.operacion.cargo;
    
    reglasDeNegocio = [];
    var cuentasDeAbonoAux2;
    var operaMismoDia;
	var operaProgramadas;
	var maximoDiasDeProgramacion;
	var operaEnSabado;
    var operaEnDomingo;
    var operaEnDiasNoHabiles;

    for ( var i = 0; i < cargos.length; i++) {
        var cuentasDeAbono = [];
        // Se leen las cuentas permitidas como cuenta origen
        
        if(cargos[i].moneda == DIVISA_MXP){
          var cuentasDeCargo = cargos[i].cuentas.cuenta;
            
                // Se leen las cuentas permitidas como cuenta destino
                    var cuentasDeabonoAux = cargos[i].abono;
            
                    if(Object.prototype.toString.call(cuentasDeabonoAux) === '[object Array]'){
                    
                        for(var l = 0; l < cuentasDeabonoAux.length;l++){
                            
                            operaMismoDia = cuentasDeabonoAux[l].operaMismoDia;
                            operaProgramadas = cuentasDeabonoAux[l].operaProgramadas;
                            maximoDiasDeProgramacion = cuentasDeabonoAux[l].maximoDiasDeProgramacion;
                            operaEnSabado = cuentasDeabonoAux[l].operaEnSabado;
                            operaEnDomingo = cuentasDeabonoAux[l].operaEnDomingo
                            operaEnDiasNoHabiles = cuentasDeabonoAux[l].operaEnDiasNohabiles;

                            
                            cuentasDeAbonoAux2 = cuentasDeabonoAux[l].cuentas;
                            
                            if(Object.prototype.toString.call(cuentasDeAbonoAux2.cuenta) === '[object Array]' ){
                               
                               for(var m = 0; m < cuentasDeAbonoAux2.cuenta.length;m++){
                                   
                                   if(cuentasDeAbonoAux2.cuenta[m] == TIPO_TC || cuentasDeAbonoAux2.cuenta[m] == TIPO_AH|| cuentasDeAbonoAux2.cuenta[m] == TIPO_LI || cuentasDeAbonoAux2.cuenta[m] == TIPO_CH){
                               
                                      cuentasDeAbono.push(cuentasDeAbonoAux2.cuenta[m]);
                                   }
                               }
                            }else{
                                if(cuentasDeAbonoAux2.cuenta == TIPO_TC || cuentasDeAbonoAux2.cuenta == TIPO_AH || cuentasDeAbonoAux2.cuenta == TIPO_LI || cuentasDeAbonoAux2.cuenta == TIPO_CH){
                                   cuentasDeAbono.push(cuentasDeAbonoAux2.cuenta);
                                }
                            }
                        
                        }
                    }else if(Object.prototype.toString.call(cuentasDeabonoAux.cuentas.cuenta) === '[object Array]'){
                        
                        operaMismoDia = cuentasDeabonoAux.operaMismoDia;
                        operaProgramadas = cuentasDeabonoAux.operaProgramadas;
                        maximoDiasDeProgramacion = cuentasDeabonoAux.maximoDiasDeProgramacion;
                        operaEnSabado = cuentasDeabonoAux.operaEnSabado;
                        operaEnDomingo = cuentasDeabonoAux.operaEnDomingo
                        operaEnDiasNoHabiles = cuentasDeabonoAux.operaEnDiasNohabiles;
                        
                        for(var n = 0; n < cuentasDeabonoAux.cuentas.cuenta.length;n++){
                            
                            if(cuentasDeabonoAux.cuentas.cuenta[n] == TIPO_TC || cuentasDeabonoAux.cuentas.cuenta[n] == TIPO_AH || cuentasDeabonoAux.cuentas.cuenta[n] == TIPO_LI || cuentasDeabonoAux.cuentas.cuenta[n] == TIPO_CH){
                              cuentasDeAbono.push(cuentasDeabonoAux.cuentas.cuenta[n]);
                            }
                        }
                        
                    }else{
                        if(cuentasDeabonoAux.cuentas.cuenta == TIPO_TC || cuentasDeabonoAux.cuentas.cuenta == TIPO_AH || cuentasDeabonoAux.cuentas.cuenta == TIPO_LI || cuentasDeabonoAux.cuentas.cuenta == TIPO_CH){
                           cuentasDeAbono.push(cuentasDeabonoAux.cuentas.cuenta);
                        }
                    }
                    
                    // Se generan las nuevas reglas de negocio de esta iteración
                    if ((typeof cuentasDeCargo == 'string') && (typeof cuentasDeAbono == 'string')) {
                        var nuevaRN = new ReglaNegocio(cuentasDeCargo, cuentasDeAbono);
                        reglasDeNegocio.push(nuevaRN);
                        
                    } else if ((typeof cuentasDeCargo == 'string') && (Object.prototype.toString.call(cuentasDeAbono) === '[object Array]')) {
                        for ( var k = 0; k < cuentasDeAbono.length; k++) {
                            if(cuentasDeCargo == TIPO_TC || cuentasDeCargo == TIPO_AH || cuentasDeCargo == TIPO_CH || cuentasDeCargo == TIPO_LI){
                                var nuevaRN = new ReglaNegocio(cuentasDeCargo, cuentasDeAbono[k], operaMismoDia,operaProgramadas,maximoDiasDeProgramacion,operaEnSabado,operaEnDomingo,operaEnDiasNoHabiles);
                                reglasDeNegocio.push(nuevaRN);
                            }
                        }
                        
                    } else if ((Object.prototype.toString.call(cuentasDeCargo) === '[object Array]') && (typeof cuentasDeAbono == 'string')) {
                        for ( var j = 0; j < cuentasDeCargo.length; j++) {
                            var nuevaRN = new ReglaNegocio(cuentasDeCargo[j], cuentasDeAbono);
                            reglasDeNegocio.push(nuevaRN);
                        }
                        
                    } else {
                        for ( var j = 0; j < cuentasDeCargo.length; j++) {
                            if(cuentasDeCargo[j] == TIPO_TC || cuentasDeCargo[j] == TIPO_AH || cuentasDeCargo[j] == TIPO_CH || cuentasDeCargo[j] == TIPO_LI){
                                for ( var k = 0; k < cuentasDeAbono.length; k++) {
                                    var nuevaRN = new ReglaNegocio(cuentasDeCargo[j], cuentasDeAbono[k],operaMismoDia,operaProgramadas,maximoDiasDeProgramacion,operaEnSabado,operaEnDomingo,operaEnDiasNoHabiles);
                                    reglasDeNegocio.push(nuevaRN);
                                }
                            }
                        }
                    }
                }
            }
    
    console.log(reglasDeNegocio);
    sessionStorage.reglasCalendario = JSON.stringify(reglasDeNegocio);
	
    sessionStorage.operacion="G";
    sessionStorage.bandRegresar="false";
}
















/*********************** FIN Funciones Invertir Venta ***********************/