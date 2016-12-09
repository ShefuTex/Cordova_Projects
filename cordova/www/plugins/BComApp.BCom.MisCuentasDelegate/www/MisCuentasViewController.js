cordova.define("BComApp.BCom.MisCuentasDelegate.MisCuentasViewController", function(require, exports, module) {
               
    var exec = require('cordova/exec');
               
/* VARIABLES ____________________________________________________ */
               
    var perShapeGradient = {
        x1 : 0,
        y1 : 0,
        x2 : 0,
        y2 : 1
    };
    var TIPO_TC="TC";
               
    var seriesWidthPadding = -0.7;
    var seriesInitialDisplacement = -0.13;
    var seriesFinalDisplacement = 1.13;
    var seriesDisplacementStep = (seriesFinalDisplacement - seriesInitialDisplacement) / 5;
    var unselectedBubbleOpacity = '0.6';
    var selectedBubbleOpacity = '1.0';
               
    /* Lee del objeto sessionStorage y parsea a JSON */
    if ((sessionStorage.jsonPosicion != null) && (sessionStorage.jsonPosicion.length > 0) && (typeof sessionStorage.jsonPosicion != "undefined")) {
        var pg = JSON.parse(sessionStorage.jsonPosicion);
    }
               
    var primeraBarraMostrada = 0;
    var ultimaBarraMostrada = 6;
               
    var banderaMXP = false;
    var banderaUSD = false;
    var banderaTDC = false;
    var banderaPagarTDC = false;
               
    // jQplot no puede manejar gradientes de colores para la representación de
    // gráficos de barras.
    var accountChartColors = [
       { linearGradient: perShapeGradient, stops: [[0, '#6eafe1'], [1, '#0170c3']]}, // Azul
       { linearGradient: perShapeGradient, stops: [[0, '#fcda8a'], [1, '#fabe30']]}, // Amarillo
       { linearGradient: perShapeGradient, stops: [[0, '#bfe08f'], [1, '#8bc633']]}, // Verde
       { linearGradient: perShapeGradient, stops: [[0, '#f9bb7b'], [1, '#f28b25']]}, // Rojo
       { linearGradient: perShapeGradient, stops: [[0, '#c3e5f4'], [1, '#86d3f1']]}, // Azul claro
       { linearGradient: perShapeGradient, stops: [[0, '#9cd8f2'], [1, '#66c1e2']]}  // Azul celeste
       ];
               
//    var accountChartColors = [ '#0170c3', '#fabe30', '#8bc633', '#f28b25','#86d3f1', '#66c1e2' ];

    var accountListSelected;
    var accountVisibles;
    var accountVisiblesXAxis;
    var saldosChartSeries = [ '01', '02', '03', '04', '05', '06', '07', '08', '09','10', '11', '12', '13', '14',
                             '15', '16', '17', '18', '19', '20', '21','22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ];
               
    var saldosChartData = [];
    var indiceCuentasBarras;
               
    // Colores para las barras del gr�fico de tarjetas de cr�dito
    var creditCardsChartColors = [
       { linearGradient: perShapeGradient, stops: [[0, '#6eafe1'], [1, '#0170c3']]},
       { linearGradient: perShapeGradient, stops: [[0, '#fcda8a'], [1, '#fabe30']]},
       { linearGradient: perShapeGradient, stops: [[0, '#ff8dc6'], [1, '#e81060']]}
       ];
               
//    var creditCardsChartColors = [ '#0170c3', '#fabe30', '#e81060' ];
               
    // colores para las lineas de las graficas
    var lineColors = [ '#0170c3', '#fabe30', '#8bc633', '#f28b25', '#86d3f1', '#66c1e2' ];
    var lineColor;
               
    // Colores de las burbujas
    var bubleColors = [ 'blueBubles', 'yellowBubles', 'greenBubles', 'orangeBubles', 'blueBubles', 'blueBubles' ];
               
    var creditCardsSeriesDisplacement = 0.059;
               
    var chartsGridLineColor = '#dde1e8';
    // Element at position zero is the color for unselected text.
    var accountsChartSelectedLegendColors = [ '#333333', '#0170c3', '#fabe30', '#8bc633', '#f28b25', '#86d3f1', '#66c1e2' ];
               
    // Lista de mov burbujas
    var listaMovBurbujas = [];
               
    var misCuentasTableIndex = 1;
               
    // Lista de cuentas:
    var cuentasTDDPesos;
    var cuentasDolares;
    var cuentasTDC;
               
    var msgSet = false;
    var ret = [];
               
    var accountVisiblesBalances;
    var creditCardVisibleCutBalance;
    var creditCardVisibleDateBalance;
    var chartDatas;
               
    var expresionRegular = new RegExp("[0-9]");
    var backSpaceKeyCode = 8;
    var texto = "";
               
    var respuesta;
               
    var mesMostrar;
               
    var periodo;
    var tablaDatos;
    var tableContent;
    var tablaActiva = "";
    var normalPlot;
    var tdcPlot;
    var accountsChart;
    var cuentasInicializadas = false;
    var iniciaGastos = false;
    var loading = false;
               
/* ______________________________________________________________ */
               
    function MisCuentasViewController() {
               this.respuesta;
    }
    
    function validate(val) {
        if (typeof val != "undefined") {
            return val;
        } else {
            return null;
        }
    }
               
    function hash(key, value) {
        this.key = key;
        this.value = value;
    }
               
    function DatosAplicativos(usuario, acceso, id, periodo) {
        this.usuario_usr = validate(usuario);
        this.acceso_usr = validate(acceso);
        this.id = validate(id);
        this.periodo = validate(periodo);
    }
               
    function ConsultaMovimientosPeticion(proceso, operacion, accion,
                                                    datosAplicativos) {
        this.proceso = validate(proceso);
        this.operacion = validate(operacion);
        this.accion = validate(accion);
        this.datosAplicativos = validate(datosAplicativos);
    }
               
    MisCuentasViewController.prototype.inicializarColoresBarras= function () {
           accountChartColors = [
                { linearGradient: perShapeGradient, stops: [[0, '#6eafe1'], [1, '#0170c3']]}, // Azul
                { linearGradient: perShapeGradient, stops: [[0, '#fcda8a'], [1, '#fabe30']]}, // Amarillo
                { linearGradient: perShapeGradient, stops: [[0, '#bfe08f'], [1, '#8bc633']]}, // Verde
                { linearGradient: perShapeGradient, stops: [[0, '#f9bb7b'], [1, '#f28b25']]}, // Rojo
                { linearGradient: perShapeGradient, stops: [[0, '#c3e5f4'], [1, '#86d3f1']]}, // Azul claro
                { linearGradient: perShapeGradient, stops: [[0, '#9cd8f2'], [1, '#66c1e2']]}  // Azul celeste
           ];
           
    }
           
    MisCuentasViewController.prototype.inicializarFlechas= function () {
           $("#flechaIzqON").attr("id", "flechaIzqOFF");
           $("#flechaIzqOFF").attr("onclick", "");
           $("#flechDerechaOFF").attr("id", "flechDerechaON");
           $("#flechDerechaON").attr("onclick", "misCuentasViewController.moverBarrasDrch()");
    }
           
    MisCuentasViewController.prototype.loadAccountsCharts= function (containerId) {
           
           console.log("chartDatas = " + chartDatas);
           misCuentasViewController.muestraGrafico(containerId, chartDatas);
           
    }
           
    MisCuentasViewController.prototype.loadCreditCardsChart= function (containerId) {
           
           misCuentasViewController.muestraGraficoTDC(containerId, chartDatas);
           
    }
           
    MisCuentasViewController.prototype.loadSaldosChart= function (containerId) {
           
           var currentWidth = (0 != window.innerWidth) ? window.innerWidth : window.parent.window.innerWidth;
           var currentImgFolder = '1024x600';
           var markerUrl = "";
           if (isIOS()) {
           
                if (1024 == currentWidth) {
                    currentImgFolder = 'normal';
                } else {
                    currentImgFolder = 'retina';
                }
           
                markerUrl = 'img/' + currentImgFolder + '/Ios_Btn_Grafica.png';
           } else {
           
                if (1024 == currentWidth)
                    currentImgFolder = '1024x600';
                else if (1280 == currentWidth)
                    currentImgFolder = '1280x800';
                else if (1920 == currentWidth)
                    currentImgFolder = '1920x1200';
           
                markerUrl = 'img/' + currentImgFolder + '/An_Btn_Grafica.png';
           }
           
           if (saldosChartData.length == 0) {
                $('#balanceSection').html('<p style="margin-top: 2cm; margin-left: 30px; text-align: center">No se cuenta con informaci&oacute;n para generar la gr&aacute;fica de Saldos</p>');
           } else {
           var saldosPlot = new Highcharts.Chart({
                         chart: {
                                 renderTo: containerId,
                                 type: 'line',
                                 width: 620,
                                 height: 250
                         },
                         title: {
                                 text: ''
                         },
                         subtitle: {
                                 text: ''
                         },
                         xAxis: {
                                 categories: saldosChartSeries
                         },
                         yAxis: {
                         gridLineDashStyle: 'shortdot',
                         gridLineColor: chartsGridLineColor,
                         title: {
                         text: ''
                         }
                         },
                         legend: {
                         enabled: false,
                         },
                         
                         series: [{
                                  name: mesMostrar,
                                  data: saldosChartData,
                                  color: lineColor,
                                  marker: {
                                  symbol: 'url(' + markerUrl + ')'
                                  }
                                  }],
                         tooltip: {
                         shared: false,
                         useHTML: true,
                         valueDecimals: 2,
                         borderRadius: 10,
                         borderWidth: 2,
                         borderColor: null,
                         formatter: function () {
                         return ('<div class="saldosCartTooltipTitle" style="color:' + this.series.color + ';">' + misCuentasViewController.formatForCurrency(this.y, false, $) + '</div>' +
                                 '<div class="saldosCartTooltipValue">' + this.x + '/' + this.series.name + '</div>');
                         }
                         },
                         exporting: {
                         enabled: false
                         },
                         credits: {
                         enabled: false
                         }
                         });
            }

    }
        

    MisCuentasViewController.prototype.formatForCurrency = function(amount, showDecimals, showCurrencySymbol) {
    		var amountStr = amount + '';
    		var isNegativo = false;
			if (amount < 0) {
				isNegativo = true;
				amountStr = amountStr.substring(1, amountStr.length);
			}
			
			
			var result = (amountStr).replace(
					/.(?=(?:[0-9]{3})+\b)/g, '$&,');
	
			var decimalIndex = result.indexOf('.');
			if (decimalIndex < 0)
				result += '.00';
			if (decimalIndex > (result.length - 3))
				result += '0';
	
			if (isNegativo)
				result = '-' + result;
	
			if (showCurrencySymbol)
				result = '$ ' + result;
	
			if (!showDecimals)
				result = result.split('.', 1)[0];
	
			return result;
	}
          
    MisCuentasViewController.prototype.changeAccountsChartLabelColor= function (index) {
           var accountLabelGroup = $('.highcharts-axis-labels.highcharts-xaxis-labels');
           
           // Reset the style.
           accountLabelGroup.children('text').css('fill',accountsChartSelectedLegendColors[0]);
           // Set the selected account label style.
           accountLabelGroup.children('text:nth-child(' + index + ')').css('fill',accountsChartSelectedLegendColors[index]);
    }
           
    MisCuentasViewController.prototype.onAccountSelectionChanged= function (index, isCreditCards) {
           _elementId = 'bubblesChart';
           _newColor = bubleColors[index];
           lineColor = lineColors[index];
               
           misCuentasTableIndex = 1;
               
           indiceCuentasBarras = accountVisibles[index].id;
           
           misCuentasViewController.inicializarGastos(indiceCuentasBarras);
               
           misCuentasViewController.changeBubblesChartColor(_newColor, _elementId);
           
           misCuentasViewController.changeAccountsChartLabelColor(++index);
           
           misCuentasViewController.setSelectedBubble(1);
           
           if (!isCreditCards) {
                $('#accountName').css('color', accountsChartSelectedLegendColors[index]);
           
                $('#accountName').text(isCreditCards ? accountListSelected[index - 1].name : accountVisibles[index - 1].name);
           
                $('#creditCardName').css('color', accountsChartSelectedLegendColors[index]);
           
                $('#creditCardName').text(isCreditCards ? accountListSelected[index - 1].name : accountVisibles[index - 1].name);
           
                $('#expenseDescription').css('color', accountsChartSelectedLegendColors[index]);
           }
           misCuentasViewController.actualizarDetallesCuentaSeleccionada(index-1);
           misCuentasViewController.mostrarFlechas(false);
    }
           
    MisCuentasViewController.prototype.changeBubblesChartColor= function (newColor, elementId) {
           $('#' + elementId).children('div').attr('class', newColor);
    }
           
    MisCuentasViewController.prototype.setSelectedBubble= function (index) {
           $('.chartBubble').children('div').children('div').css('opacity', unselectedBubbleOpacity);
           
           if (index < 6 && index > 0) {
                $('.chartBubble').children('div').children('div:nth-child(' + index + ')').css('opacity', selectedBubbleOpacity);
                misCuentasViewController.actDatosBurbuja(index);
           }
    }
    
    MisCuentasViewController.prototype.leerCuentasTDDPesos= function () {
           // cuentasTDDPesos = recuperaCuentasTDDPesos();
           cuentasTDDPesos = pg.posicionGlobal.asuntos.lista_cuentas_mxp;
    }
           
    MisCuentasViewController.prototype.pintarGraficaCuentasTDDPesos= function () {
           
           misCuentasViewController.leerCuentasTDDPesos();
           var cuentasPesos = cuentasTDDPesos;
           
           var listaCuentas = [];
           
           for ( var i = 0; i < cuentasPesos.length; i++) {
           if ((typeof cuentasPesos[i].alias == "undefined") || (cuentasPesos[i].alias == null) || (cuentasPesos[i].alias == "")) {
                cuentasPesos[i].alias = cuentasPesos[i].numero.substring(cuentasPesos[i].numero.length-10, cuentasPesos[i].numero.length);
           }
           listaCuentas.push({
                             id : cuentasPesos[i].id,
                             name : cuentasPesos[i].alias,
                             data : cuentasPesos[i].saldo_disponible,
                             pointPadding : seriesWidthPadding,
                             pointPlacement : (seriesInitialDisplacement + (seriesDisplacementStep * i))
                             });
           }
           
           return listaCuentas;
    }
    
    MisCuentasViewController.prototype.leerCuentasDolares= function () {
           // cuentasDolares = recuperaCuentasDolares();
           cuentasDolares = pg.posicionGlobal.asuntos.lista_cuentas_usd;
    }
    
    MisCuentasViewController.prototype.pintarGraficaCuentasDolares= function () {
           
           misCuentasViewController.leerCuentasDolares();
           var cuentasUSD = cuentasDolares;
           
           var listaCuentas = [];
           
           for ( var i = 0; i < cuentasUSD.length; i++) {
                if ((typeof cuentasUSD[i].alias == "undefined") || (cuentasUSD[i].alias == null) || (cuentasUSD[i].alias == "")) {
                    cuentasUSD[i].alias = cuentasUSD[i].numero.toString().slice(-10);
                }
           
                if (cuentasUSD[i].plaza == "MEXICO") {
                    listaCuentas.push({
                             id : cuentasUSD[i].id,
                             name : cuentasUSD[i].alias,
                             data : cuentasUSD[i].saldo_disponible,
                             pointPadding : seriesWidthPadding,
                             pointPlacement : (seriesInitialDisplacement + (seriesDisplacementStep * i))
                             });
                }
           }
           
           return listaCuentas;
    }
    
    MisCuentasViewController.prototype.leerCuentasTDCPesos= function () {
           
           // cuentasTDC = recuperaCuentasTDCPesos();
           cuentasTDC = pg.posicionGlobal.asuntos.lista_tarjetascredito;
           
           if ((typeof cuentasTDC != "undefined") && (cuentasTDC != null)
               && (cuentasTDC.length > 0)) {
           
                for (var i in cuentasTDC) {
                    var node = cuentasTDC[i];
                    if ((typeof cuentasTDC[i].alias == "undefined") || (cuentasTDC[i].alias == null) || ($.trim(cuentasTDC[i].alias) == "")) {
                        cuentasTDC[i].alias = misCuentasViewController.mostrarUltimos5Digitos(cuentasTDC[i].numero.toString());
                    }
                }
           
           }
           
    }
           
    MisCuentasViewController.prototype.mostrarUltimos5Digitos= function (numeroCuenta) {
           var numeroCuentaOculto = '';
           
           for (i = 0; i < numeroCuenta.length; i++) {
                if (i < numeroCuenta.length - 5) {
                    numeroCuentaOculto = '*****';
                } else {
                    numeroCuentaOculto += numeroCuenta.charAt(i);
                }
           }
           
           return numeroCuentaOculto;
    }
    
    MisCuentasViewController.prototype.setFlag= function (i) {
        switch (i) {
           case 1:
           // MEX
                banderaMXP = true;
                banderaUSD = false;
                banderaTDC = false;
           break;
           case 2:
           // USD
                banderaMXP = false;
                banderaUSD = true;
                banderaTDC = false;
           break;
           case 3:
           // TarCredit
                banderaMXP = false;
                banderaUSD = false;
                banderaTDC = true;
           break;
           }
    }
    
    MisCuentasViewController.prototype.accountsLinkClicked= function () {
           
           iniciaGastos = false;
           
           // 1: mex
           misCuentasViewController.setFlag(1);
           
           accountsChartSelectedLegendColors = [ '#333333', '#0170c3', '#fabe30',
                                                '#8bc633', '#f28b25', '#86d3f1', '#66c1e2' ];
           lineColors = [ '#0170c3', '#fabe30', '#8bc633', '#f28b25', '#86d3f1',
                         '#66c1e2' ];
           
           // Added
           $('.cargo').removeClass('selec');
           // end
           
           if ($('#accountTypeSection a:first-child').attr('class') == 'selec-nav')
                return;
           
           $('#accountTypeSection a:first-child').addClass('selec-nav');
           $('#accountTypeSection a:nth-child(3)').removeClass('selec-nav');
           $('#accountTypeSection a:nth-child(5)').removeClass('selec-nav');
           
           $('#normalAccountsSection').css('display', 'block');
           $('#dolaresAccountsSection').css('display', 'none');
           $('#creditCardsSection').css('display', 'none');
           
           $('#accountInfo').css('display', 'block');
           $('#cuentaDolaresInfo').css('display', 'none');
           $('#creditCardInfo').css('display', 'none');
           
           $('#payButton').css('display', 'none');
           
           $('#normalAccountsRange').val(0);
           
           accountListSelected = misCuentasViewController.pintarGraficaCuentasTDDPesos();
           
           if ((typeof accountListSelected != "undefined")
               && (accountListSelected.length > 0)) {
                misCuentasViewController.inicializarGastos(accountListSelected[0].id);
           }
           
           misCuentasViewController.inicializarColoresBarras();
           misCuentasViewController.mostrarFlechas(false);
           misCuentasViewController.inicializarFlechas();
           
           primeraBarraMostrada = 0;
           ultimaBarraMostrada = 6;
           
           misCuentasViewController.reorganizarBarras();
           
           misCuentasTableIndex = 1;
           misCuentasViewController.updateMisCuentasTable();
           
           misCuentasViewController.loadAccountsCharts('normalAccountsChartContainer');
           
           misCuentasViewController.onAccountSelectionChanged(0, false);
           misCuentasViewController.actualizarDetallesCuentaSeleccionada(0, 0);
           misCuentasViewController.changeAccountsChartLabelColor(1);
    }
    
    MisCuentasViewController.prototype.dolaresLinkClicked= function () {
           
           iniciaGastos = false;
           
           // 2: USD
           misCuentasViewController.setFlag(2);
           
           accountsChartSelectedLegendColors = [ '#333333', '#0170c3', '#fabe30',
                                                '#8bc633', '#f28b25', '#86d3f1', '#66c1e2' ];
           lineColors = [ '#0170c3', '#fabe30', '#8bc633', '#f28b25', '#86d3f1',
                         '#66c1e2' ];
           
           // Added
           $('.cargo').addClass('selec');
           // end
           if ($('#accountTypeSection a:last-child').attr('class') == 'selec-nav')
                return;
           
           $('#accountTypeSection a:nth-child(3)').addClass('selec-nav');
           $('#accountTypeSection a:first-child').removeClass('selec-nav');
           $('#accountTypeSection a:nth-child(5)').removeClass('selec-nav');
           
           $('#normalAccountsSection').css('display', 'none');
           $('#dolaresAccountsSection').css('display', 'block');
           $('#creditCardsSection').css('display', 'none');
           
           $('#accountInfo').css('display', 'none');
           $('#cuentaDolaresInfo').css('display', 'block');
           $('#creditCardInfo').css('display', 'none');
           
           $('#payButton').css('display', 'none');
           
           $('#dolaresAccountsRange').val(0);
           
           accountListSelected = misCuentasViewController.pintarGraficaCuentasDolares();
           
           if ((typeof accountListSelected != "undefined")
               && (accountListSelected.length > 0)) {
                misCuentasViewController.inicializarGastos(accountListSelected[0].id);
           }
           
           misCuentasViewController.inicializarColoresBarras();
           misCuentasViewController.mostrarFlechas(false);
           misCuentasViewController.inicializarFlechas();
           
           primeraBarraMostrada = 0;
           ultimaBarraMostrada = 6;
           
           misCuentasViewController.reorganizarBarras();
           
           misCuentasTableIndex = 1;
           misCuentasViewController.updateMisCuentasTable();
           
           misCuentasViewController.loadAccountsCharts('dolaresAccountsChartContainer');
           
           misCuentasViewController.onAccountSelectionChanged(0, false);
           misCuentasViewController.actualizarDetallesCuentaSeleccionada(0, 0);
           misCuentasViewController.changeAccountsChartLabelColor(1);
    }
    
    MisCuentasViewController.prototype.creditCardsLinkclicked= function () {
           
           iniciaGastos = false;
           
           // 3: TCred
           misCuentasViewController.setFlag(3);
           
           accountsChartSelectedLegendColors = [ '#333333', '#0170c3', '#fabe30',
                                                '#8bc633', '#f28b25', '#86d3f1', '#66c1e2' ];
           lineColors = [ '#0170c3', '#fabe30', '#8bc633', '#f28b25', '#86d3f1',
                         '#66c1e2' ];
           
           // Added
           $('.cargo').addClass('selec');
           // end
           if ($('#aTarjetaCredito').attr('class') == 'selec-nav')
                return;
           
           $('#aTarjetaCredito').addClass('selec-nav');
           $('#aCuentaPesos').removeClass('selec-nav');
           $('#aCuentaDolares').removeClass('selec-nav');
           
           $('#normalAccountsSection').css('display', 'none');
           $('#dolaresAccountsSection').css('display', 'none');
           $('#creditCardsSection').css('display', 'block');
           
           $('#accountInfo').css('display', 'none');
           $('#cuentaDolaresInfo').css('display', 'none');
           $('#creditCardInfo').css('display', 'block');
           
           $('#payButton').css('display', 'block');
           
           $('#creditCardsRange').val(0);
           
           misCuentasViewController.leerCuentasTDCPesos();
           accountListSelected = cuentasTDC;
           
           if ((typeof accountListSelected != "undefined")
               && (accountListSelected.length > 0)) {
                misCuentasViewController.inicializarGastos(accountListSelected[0].id);
           }
           
           misCuentasViewController.reorganizarBarras();
           
           misCuentasTableIndex = 1;
           misCuentasViewController.updateMisCuentasTable();
           
           misCuentasViewController.loadCreditCardsChart('creditCardsChartContainer');
           
           misCuentasViewController.onAccountSelectionChanged(0, true);
           misCuentasViewController.actualizarDetallesCuentaSeleccionada(0, 0);
           misCuentasViewController.changeAccountsChartLabelColor(1);
    }
    
    MisCuentasViewController.prototype.higherExpensesLinkclicked= function () {
           if ($('#infoTypeSection a:first-child').attr('class') == 'selec-nav')
                return;
           
           $('#infoTypeSection a:first-child').addClass('selec-nav');
           $('#infoTypeSection a:last-child').removeClass('selec-nav');
           
           misCuentasViewController.setSelectedBubble(1);
           
           $('#balanceSection').css('display', 'none');
           $('#higherExpensesSection').css('display', 'block');
    }
    
    MisCuentasViewController.prototype.balanceLinkclicked= function () {
           if ($('#infoTypeSection a:last-child').attr('class') == 'selec-nav')
                return;
           
           $('#infoTypeSection a:last-child').addClass('selec-nav');
           $('#infoTypeSection a:first-child').removeClass('selec-nav');
           
           $('#higherExpensesSection').css('display', 'none');
           $('#balanceSection').css('display', 'block');
           
    }
    
    MisCuentasViewController.prototype.mostrarBusquedaDeComprobantes= function (mostrar) {
           var numCuenta = $('#cboNUMCUENTA').val();
           var tipoOperacion = $('#cboTIPODEOPER').val();
           var numPeriodo = $('#cboNUMPERIODO').val();
           
           // Comprobamos que ningun combo tenga valor Selecciona seleccionado.
           if (numCuenta == -1 || tipoOperacion == -1 || numPeriodo == -1) {
                mostrarError('Informa todos los campos');
                return;
           }
           
           // Consultamos la tabla
           generaComprobantesDelegate.mostrarOpciones(numCuenta, tipoOperacion,
                                                      numPeriodo);
           
    }
    
    MisCuentasViewController.prototype.mostrarDetallesDeComprobante= function (folio) {
           generaComprobantesDelegate.mostrarComprobante(folio);
           
    }
    
    MisCuentasViewController.prototype.comprobantesRegresar= function () {
           if ('block' == $('#tabla-comprobantes-div').css('display')) {
                $('#contenedor2').css('display', 'none');
                $('#contenedor').css('display', 'block');
           } else {
                $('#detalles-comprobantes').css('display', 'none');
                $('#tabla-comprobantes-div').css('display', 'block');
           }
    }
    
    MisCuentasViewController.prototype.moveToPreviousMonth= function () {
           if (1 == misCuentasTableIndex)
                return;
           
           misCuentasTableIndex--;
           misCuentasViewController.updateMisCuentasTable();
           periodo = misCuentasTableIndex - 1;
           //meter if para la sombraMes

    }
    
    MisCuentasViewController.prototype.moveToNextMonth= function () {
           if (3 == misCuentasTableIndex)
                return;
           
           misCuentasTableIndex++;
           misCuentasViewController.updateMisCuentasTable();
           
           periodo = misCuentasTableIndex - 1;
         //meter if para la sombraMes
           
    }
    
    MisCuentasViewController.prototype.selectMisCuentasTable= function (index) {
    	console.log("Entro por aqui");
           misCuentasTableIndex = index;
           misCuentasViewController.updateMisCuentasTable();
           
           periodo = index - 1;
          // misCuentasViewController.generateData(indiceCuentasBarras, periodo); // genera y muestra la grafica
			// de puntos
           misCuentasViewController.loadSaldosChart('balanceSection');

    }
           
    MisCuentasViewController.prototype.actualizarTituloListaMovimientos= function () {
           
           if (banderaTDC) {
                if (misCuentasTableIndex == 1) {
                    $('.seccion2 .sec2-titulo').html('Al d&iacute;a');
                } else if (misCuentasTableIndex == 2) {
                    $('.seccion2 .sec2-titulo').html('Al corte');
                } else if (misCuentasTableIndex == 3) {
                    $('.seccion2 .sec2-titulo').html('Anterior');
                }
           
           } else {
                if (misCuentasTableIndex == 1) {
                    $('.seccion2 .sec2-titulo').html('Mes actual');
                } else if (misCuentasTableIndex == 2) {
                    $('.seccion2 .sec2-titulo').html('Mes anterior');
                } else if (misCuentasTableIndex == 3) {
                    $('.seccion2 .sec2-titulo').html('2 meses atr&aacute;s');
                }
           }
    }
    
    MisCuentasViewController.prototype.updateMisCuentasTable= function (id) {
           if (id == !null || id == "undefined" || id == "") {
                id = accountVisibles[0].id;
           }
           
           $('#sec2TableContainer').children('table').addClass('hidden');
           $('#sec2TableContainer').children('table:nth-child(' + misCuentasTableIndex + ')').removeClass('hidden');
           
           $('#sec2BulletsContainer').children('div').removeClass('selected');
           $('#sec2BulletsContainer').children('div:nth-child(' + misCuentasTableIndex + ')').addClass('selected');
           
           misCuentasViewController.actualizarTituloListaMovimientos();
           
           misCuentasViewController.leerMesesAnteriores(id);
    }
    
    MisCuentasViewController.prototype.getMonthByName= function (d) {
           var month = new Array();
           month[0] = "Ene";
           month[1] = "Feb";
           month[2] = "Mar";
           month[3] = "Abr";
           month[4] = "May";
           month[5] = "Jun";
           month[6] = "Jul";
           month[7] = "Ago";
           month[8] = "Sep";
           month[9] = "Oct";
           month[10] = "Nov";
           month[11] = "Dic";
           if (d.getMonth() > 0) {
                return month[d.getMonth() - 1];
           } else {
                var n = new Date();
                return month[n.getMonth()];
           }
           
    }
    
    MisCuentasViewController.prototype.parseDateBubbles= function (date) {
           
           var d = date.split(/[\/-]/g);
           if ((typeof d != "undefined") && (d.length > 0)) {
                var day = d[0];
                var month = d[1];
                var year = d[2];
                var dat = new Date();
                dat.setMonth(month);
                month = misCuentasViewController.getMonthByName(dat);
           
                return day + "/" + month + "/" + year;
           } else {
                return date;
           }
    }
           
    MisCuentasViewController.prototype.parseDate= function (date) {
           
           var d = date.split(/[\/-]/g);
           if ((typeof d != "undefined") && (d.length > 0)) {
                var day = d[0];
                var month = d[1];
                var year = d[2];
                var dat = new Date();
                dat.setMonth(month);
                month = misCuentasViewController.getMonthByName(dat);
           
                return day + "/" + month;
           } else {
                return date;
           }
    }
    
    MisCuentasViewController.prototype.leerMesesAnteriores= function (id) {
           
           tablaDatos = [];
           periodo = misCuentasTableIndex - 1;
           tableContent = '';
           
           if (banderaMXP) {
           // Controlamos que la lista no sea vacía sino mostramos mensaje
                if ((typeof accountListSelected != "undefined")
                        && (accountListSelected.length > 0)) {
                    if (typeof id == "undefined")
                        id = indiceCuentasBarras;
                        var datosAplic = new DatosAplicativos(sessionStorage.username,
                                                 pg.posicionGlobal.acceso_usr, id, periodo);
                        var peticion = new ConsultaMovimientosPeticion("imd_consulta_movimientos_pr", "imd_consulta_movimientos_op", "movimientosCta",
                                                          datosAplic);
           
                        misCuentasViewController.ConsultaMovimientosCtasCheques(peticion);
           
                }
           
           } else if (banderaUSD) {
           
                if ((typeof accountListSelected != "undefined")
                        && (accountListSelected.length > 0)) {
                    if (typeof id == "undefined")
                        id = indiceCuentasBarras;
                        var datosAplic = new DatosAplicativos(sessionStorage.username,
                                                 pg.posicionGlobal.acceso_usr, id, periodo);
                        var peticion = new ConsultaMovimientosPeticion("imd_consulta_movimientos_pr", "imd_consulta_movimientos_op", "movimientosCta", datosAplic);
           $(document).ready(function () {
                        misCuentasViewController.ConsultaMovimientosCtasCheques(peticion);
                             });

                }
           
           } else if (banderaTDC) {
                if ((typeof accountListSelected != "undefined")
                    && (accountListSelected.length > 0)) {
                    if (typeof id == "undefined")
                        id = indiceCuentasBarras;
                        var datosAplic = new DatosAplicativos(sessionStorage.username,
                                                 pg.posicionGlobal.acceso_usr, id, periodo);
                        var peticion = new ConsultaMovimientosPeticion("imd_consulta_movimientos_pr", "imd_consulta_movimientos_op", "movimientosCta",datosAplic);
           $(document).ready(function () {
                        misCuentasViewController.ConsultaMovimientosTarjetasCredito(peticion);
                             });
           
           console.log("tablaDatosTDC " + tablaDatos);
                }
           
           }
           
    }

//    MisCuentasViewController.prototype.payButton= function () {
//           // var array = [false,true];
//           // parent.document.getElementById('contentFrame').src =
//           // 'transferirMisCtasCCheqTDCInicio.html?arreglo='+array;
//           
//           window.alert("Aun no se tiene el modulo de transferencia entre mis cuentas");
//    }
    
    MisCuentasViewController.prototype.validateCve= function (sObj, keyCode, idInput) {
           var cve = sObj.value.charAt(sObj.value.length - 1);
           if (sObj.value.length > 8
               || (!cve.match(expresionRegular) && keyCode != backSpaceKeyCode)) {
                document.getElementById(idInput).value = sObj.value.substring(0,
                                                                         sObj.value.length - 1);
                document.getElementById(idInput).value = texto;
                return false;
           } else {
                misCuentasViewController.ocultarTexto(sObj.value, idInput);
           }
    }
           
    MisCuentasViewController.prototype.ocultarTexto= function (sObj, idInput) {
           var string = "";
           texto = ""
           
           if (sObj.length > 0 && sObj.length <= 8) {
                for ( var i = 0; i <= sObj.length - 1; i++) {
                    string = string + "*";
                }
                texto = string;
                document.getElementById(idInput).value = string;
           }
    }
    
    MisCuentasViewController.prototype.mostrarFlechas= function (init) {
           if (accountListSelected != null) {
                if (init && accountListSelected.length > 6) {
                    $('#flechas').show();
                } else if (accountListSelected.length <= 6) {
                    $('#flechas').hide();
                } else {
                    $('#flechas').show();
                }
           }
           
    }
    
    MisCuentasViewController.prototype.moverBarrasIzq= function () {
           
           var i;
           var colorBarrasFinal = accountChartColors[accountChartColors.length - 1];
           var colorLeyendaFinal = accountsChartSelectedLegendColors[accountsChartSelectedLegendColors.length - 1];
           var colorLineaFinal = lineColors[lineColors.length - 1];
           var colorBurbujaFinal = bubleColors[bubleColors.length - 1];
           
           for (i = accountChartColors.length - 1; i > 0; i--) {
                accountChartColors[i] = accountChartColors[i - 1];
                lineColors[i] = lineColors[i - 1];
                bubleColors[i] = bubleColors[i - 1];
           }
           
           for (i = accountsChartSelectedLegendColors.length - 1; i > 1; i--) {
                accountsChartSelectedLegendColors[i] = accountsChartSelectedLegendColors[i - 1];
           }
           
           accountChartColors[0] = colorBarrasFinal;
           lineColors[0] = colorLineaFinal;
           bubleColors[0] = colorBurbujaFinal;
           accountsChartSelectedLegendColors[1] = colorLeyendaFinal;
           
           ultimaBarraMostrada--;
           primeraBarraMostrada--;
           if (ultimaBarraMostrada == 6) {
                $("#flechaIzqON").attr("id", "flechaIzqOFF");
                $("#flechaIzqOFF").attr("onclick", "");
           } if ((accountListSelected.length - 1) == ultimaBarraMostrada) {
                $("#flechDerechaOFF").attr("id", "flechDerechaON");
                $("#flechDerechaON").attr("onclick", "misCuentasViewController.moverBarrasDrch()");
           }
           
           misCuentasViewController.reorganizarBarras();
           misCuentasViewController.actualizarDetallesCuentaSeleccionada(0, 0);
           misCuentasViewController.changeAccountsChartLabelColor(1);
           lineColor = lineColors[0];

    }
    
    MisCuentasViewController.prototype.moverBarrasDrch= function () {
           
           var i;
           var colorBarrasInicial = accountChartColors[0];
           var colorLeyendaInicial = accountsChartSelectedLegendColors[1];
           var colorLineaInicial = lineColors[0];
           var colorBurbujaInicial = bubleColors[0];
           
           for (i = 0; i < accountChartColors.length - 1; i++) {
                accountChartColors[i] = accountChartColors[i + 1];
                lineColors[i] = lineColors[i + 1];
                bubleColors[i] = bubleColors[i + 1];
           }
           
           for (i = 1; i < accountChartColors.length - 1; i++) {
                accountsChartSelectedLegendColors[i] = accountsChartSelectedLegendColors[i + 1];
           }
           
           accountChartColors[accountChartColors.length - 1] = colorBarrasInicial;
           lineColors[lineColors.length - 1] = colorLineaInicial;
           bubleColors[bubleColors.length - 1] = colorBurbujaInicial;
           accountsChartSelectedLegendColors[accountsChartSelectedLegendColors.length - 1] = colorLeyendaInicial;
           
           ultimaBarraMostrada++;
           primeraBarraMostrada++;
           if (accountListSelected.length == ultimaBarraMostrada) {
                $("#flechDerechaON").attr("id", "flechDerechaOFF");
                $("#flechDerechaOFF").attr("onclick", "");
           } if (ultimaBarraMostrada == 7) {
                $("#flechaIzqOFF").attr("id", "flechaIzqON");
                $("#flechaIzqON").attr("onclick", "misCuentasViewController.moverBarrasIzq()");
           }
           
           misCuentasViewController.reorganizarBarras();
           misCuentasViewController.actualizarDetallesCuentaSeleccionada(0, 0);
           misCuentasViewController.changeAccountsChartLabelColor(1);
           lineColor = lineColors[0];

    }
    
    MisCuentasViewController.prototype.reorganizarBarras= function () {
           
           accountVisibles = accountListSelected.slice(primeraBarraMostrada,
                                                       ultimaBarraMostrada);
           
           var i;
           for (i = 0; i < accountVisibles.length; i++) {
                accountVisibles[i].pointPlacement = (seriesInitialDisplacement + (seriesDisplacementStep * i));
           }
           
           $('.rango').attr('max', accountVisibles.length - 1);
           
           misCuentasViewController.ajustaSkrollBar();
    }
           
    MisCuentasViewController.prototype.ajustaSkrollBar= function () {
           
           var factor = 6 - accountVisibles.length;
           var width;
           var left;
           var size;
           
           if (!isIOS()) {
           size = screen.width;
           } else {
           size = screen.height;
           }
               
            /* size = 1024 -> iPad normal */
            /* size = 2048 -> iPad retina */
               
           switch (factor) {
               case 0: // 6 cuentas visibles
                   if (size == 1024) {
                       width = 83.5;
                       left = 21.5;
                   } else {
                       width = 78;
                       left = 15;
                   }
               break;
               case 1: // 5 cuentas visibles
                   if (size == 1024) {
                       width = 83.5;
                       left = 19;
                   } else {
                       width = 77;
                       left = 17.5;
                   }
               break;
               case 2: // 4 cuentas visibles
                   if (size == 1024) {
                       width = 73;
                       left = 18.5;
                   } else {
                       width = 70;
                       left = 19;
                   }
               break;
               case 3: // 3 cuentas visibles
                   if (size == 1024) {
                       width = 65;
                       left = 22;
                   } else {
                       width = 66;
                       left = 23;
                   }
               break;
               case 4: // 2 cuentas visibles
                   if (size == 1024) {
                       width = 49;
                       left = 40;
                   } else {
                       width = 50;
                       left = 30;
                   }
               break;
               case 5: // 1 cuenta visibles
                   if (size == 1024) {
                       width = 0;
                       left = 53;
                   } else {
                       width = 0;
                       left = 55;
                   }
               break;
           }
           
           if (banderaMXP) {
               $('#normalAccountsRange').attr('max', accountVisibles.length - 1);
               $('#normalAccountsRange').width(width + "%");
               $('#normalAccountsRange').css("margin-left", left + "%");
               $('#normalAccountsRange').val(0);
               misCuentasViewController.inicializarValoresEjeX();
               misCuentasViewController.loadAccountsCharts('normalAccountsChartContainer');
           } else if (banderaUSD) {
               $('#dolaresAccountsRange').attr('max', accountVisibles.length - 1);
               $('#dolaresAccountsRange').width(width + "%");
               $('#dolaresAccountsRange').css("margin-left", left + "%");
               $('#dolaresAccountsRange').val(0);                    misCuentasViewController.inicializarValoresEjeX();
               misCuentasViewController.loadAccountsCharts('dolaresAccountsChartContainer');
           } else if (banderaTDC) {
               $('#creditCardsRange').attr('max', accountVisibles.length - 1);
               $('#creditCardsRange').width(width + "%");
               $('#creditCardsRange').css("margin-left", left + "%");
               $('#creditCardsRange').val(0);
               misCuentasViewController.inicializarValoresEjeX();
               misCuentasViewController.loadCreditCardsChart('creditCardsChartContainer');
           }
    }
           
    MisCuentasViewController.prototype.inicializarValoresEjeX= function () {
           
           $("#creditCardsRange").attr("max", accountListSelected.length - 1);
           accountVisiblesXAxis = [];
           accountVisiblesBalances = [];
           creditCardVisibleCutBalance = [];
           creditCardVisibleDateBalance = [];
           chartDatas = [];
           var color = null;
           var i;
           if (!banderaTDC) {
                for (i = 0; i < accountVisibles.length; i++) {
                    accountVisiblesXAxis.push(accountVisibles[i].name);
                    accountVisiblesBalances.push(accountVisibles[i].data);
                    chartDatas.push(accountVisibles[i].data);
                }
           } else {
                for (i = 0; i < accountVisibles.length; i++) {
                    accountVisiblesXAxis.push(accountVisibles[i].alias);
                    creditCardVisibleCutBalance.push(accountVisibles[i].saldofecha);
                    creditCardVisibleDateBalance.push({ y: accountVisibles[i].saldocorte, color: accountChartColors[i] });
                }
                chartDatas.push({name: 'Saldo al corte ', data: creditCardVisibleDateBalance}, {name: 'Saldo a fecha', data: creditCardVisibleCutBalance, color: creditCardsChartColors[2]});
           }
           
    }
    
    MisCuentasViewController.prototype.ocultaSeccion= function (remSeccion) {
           if (remSeccion.length > 0) {
                $("#" + remSeccion.pop()).remove();
                misCuentasViewController.ocultaSeccion(remSeccion);
           } else {
                $("#accountTypeSection > a").last().addClass("lastItem");
                $('#accountTypeSection a:first-child').addClass('selec-nav');
           }
    }
           
    MisCuentasViewController.prototype.validaSeccionesRec= function (secciones) {
           if (secciones.length > 0) {
                var seccion = secciones.pop();
                if ((typeof seccion.value == "undefined") || (seccion.value == null)|| (seccion.value.length <= 0)) {
                    misCuentasViewController.ocultaSeccion(seccion.key);
                }
                misCuentasViewController.validaSeccionesRec(secciones);
           }
    }
           
    MisCuentasViewController.prototype.initFlags= function (cmx, cusd, ctc) {
           if (cmx.length > 0) {
                banderaMXP = true;
           } else if (cusd.length > 0) {
                banderaUSD = true;
           } else if (ctc.length > 0) {
                banderaTDC = true;
           }
    }
    
    MisCuentasViewController.prototype.getFlagsInicio = function () {
           if (banderaMXP) {
           return "banderaMXP";
           }
           if (!banderaMXP && banderaUSD) {
           return "banderaUSD";
           }
           if (!banderaMXP && !banderaUSD && banderaTDC) {
           return "banderaTDC";
           }
    }
           
    MisCuentasViewController.prototype.setSelectedPane= function (cmx, cusd, ctc) {
           if (cmx.length > 0) {
                $("#normalAccountsSection").show();
                $("#dolaresAccountsSection").hide();
                $("#creditCardsSection").hide();
           } else if (cusd.length > 0) {
                $("#dolaresAccountsSection").show();
                $("#normalAccountsSection").hide();
                $("#creditCardsSection").hide();
           } else if (ctc.length > 0) {
                $("#creditCardsSection").show();
                $("#normalAccountsSection").hide();
                $("#dolaresAccountsSection").hide();
           }
    }
           
    MisCuentasViewController.prototype.validaSecciones= function () {
           misCuentasViewController.leerCuentasTDDPesos();
           var cmx = cuentasTDDPesos;
           
           misCuentasViewController.leerCuentasDolares();
           var cusd = cuentasDolares;
           
           misCuentasViewController.leerCuentasTDCPesos();
           var ctc = cuentasTDC;
           
           var lista = [];
           lista.push(new hash([ "aCuentaPesos", "accSep1" ], cmx));
           lista.push(new hash([ "aCuentaDolares", "accSep1" ], cusd));
           lista.push(new hash([ "aTarjetaCredito", "accSep2" ], ctc));
           
           misCuentasViewController.validaSeccionesRec(lista);
           misCuentasViewController.initFlags(cmx, cusd, ctc);
           misCuentasViewController.setSelectedPane(cmx, cusd, ctc);
    }
    
    MisCuentasViewController.prototype.parseImporte= function (val) {
           var str = val.toString();
           var max = "9999999999999999.99";
           var regex = /^(\d+)\.(\d+)?$/;
           if (regex.test(str)) {
                // Si tiene punto decimal
           
                // Parte entera
                var entera = (regex).exec(str)[1];
                // Parte decimal
                var decimal = (regex).exec(str)[2];
           
                if ((str.length > 19) || (entera.length > 16) || (decimal > 2)) {
                    // Si no cumple el tamaño
                    var eLen = entera.length;
                    if (eLen > 16) {
           
                        // Si la parte entera es mayor devolvemos el valor maximo
                        // mostrable
                        return max;
                    } else {
                        // Si la parte decimal es la que se descontrola ajustamos a 2
                        // decimales
                        // Se calculan los decimales así debido a que se supera la
                        // precision
                        if (typeof decimal == "undefined") {
                            return parseFloat(entera).toFixed(2);
                        } else {
                            var dec = "0." + decimal;
                            var decparsed = parseFloat(dec).toFixed(2);
                            decparsed = decparsed.replace(".", "");
                            return (parseFloat(entera) + "." + parseFloat(decparsed));
                        }
                    }
                } else {
                    // Si cumple el tamaño
                    if (typeof decimal == "undefined") {
                        return parseFloat(entera).toFixed(2);
                    } else {
                        var dec = "0." + decimal;
                        var decparsed = parseFloat(dec).toFixed(2);
                        decparsed = decparsed.replace(".", "");
                        return (parseFloat(entera) + "." + parseFloat(decparsed));
                    }
                }
           } else {
                // Sera completamente entero
                if (str.length > 16) {
           
                // Si el valor excede el tamaño devolvemos el maximo valor mostrable
                    return max;
                } else {
                    // Si el valor no excede el máximo devolvemos el valor con los
                    // decimales requeridos
                    return parseFloat(str).toFixed(2);
                }
           }
    }
           
    MisCuentasViewController.prototype.applyImpMask= function (val) {
           if ($.isNumeric(val)) {
                var v = misCuentasViewController.parseImporte(val);
                var rx = /(\d+)(\d{3})/;
                return String(v).replace(/^\d+/, function(w) {
                        while (rx.test(w)) {
                            w = w.replace(rx, '$1,$2');
                        }
                    return "$ " + w;
                });
           } else {
                // Si no es un numero ret del resultado
                return val;
           }
    }
           
    MisCuentasViewController.prototype.leerGastos= function (id) {
           
           if ((typeof periodo == "undefined") || (periodo == null)) {
               periodo = 0;
           }
               
           var list = [];
           
           var datosAplic = new DatosAplicativos(sessionStorage.username,
                                                 pg.posicionGlobal.acceso_usr, id, periodo);
           
           if (banderaMXP || banderaUSD) {
                var peticion = new ConsultaMovimientosPeticion(
                                                          "imd_consulta_movimientos_pr", "imd_consulta_movimientos_op",
                                                          "movimientosCta", datosAplic);
           
           
                misCuentasViewController.ConsultaMovimientosCtasCheques(peticion);
           
           } else if (banderaTDC) {
                var peticion = new ConsultaMovimientosPeticion(
                                                          "imd_movimientos_tdc_pr", "imd_movimientos_tdc_op",
                                                          "movimientos", datosAplic);
           
                misCuentasViewController.ConsultaMovimientosTarjetasCredito(peticion);

           }
           
    }
    
    MisCuentasViewController.prototype.ordenarGastos= function (listaGastos) {
           var aux;
           console.log("Ordenando gastos ...");
//           console.log(listaGastos);
           if (listaGastos.length > 0) {
                if (banderaMXP || banderaUSD) {
                    for ( var i = 0; i < listaGastos.length - 1; ++i) {
                        for ( var j = 0; j < listaGastos.length - i - 1; ++j) {
                            if (Math.abs(parseFloat(listaGastos[j + 1].cargo)) > Math.abs(parseFloat(listaGastos[j].cargo))) {
                                aux = listaGastos[j + 1];
                                listaGastos[j + 1] = listaGastos[j];
                                listaGastos[j] = aux;
                            }
                        }
                    }
                } else {
                    for ( var i = 0; i < listaGastos.length - 1; ++i) {
                        for ( var j = 0; j < listaGastos.length - i - 1; ++j) {
                            if (Math.abs(parseFloat(listaGastos[j + 1].importe_operacion)) > Math.abs(parseFloat(listaGastos[j].importe_operacion))) {
                                aux = listaGastos[j + 1];
                                listaGastos[j + 1] = listaGastos[j];
                                listaGastos[j] = aux;
                            }
                        }
                    }
                }
           }
           
           console.log("Gastos ordenados ...");
//           console.log(listaGastos);
    }
    
    MisCuentasViewController.prototype.ocultarBurbujasVacias= function () {
           var lista = $('.chartBubble').children('div').children('div');
           if (lista.length > 0) {
                for ( var i = 0; i < lista.length; ++i) {
                    if ($(lista[i]).children('span').html() == "") {
                        $(lista[i]).hide();
                    } else {
                        $(lista[i]).show();
                    }
                }
           }
           
    }
    
    MisCuentasViewController.prototype.resetBurbujas= function () {
           var lista = $('.chartBubble').children('div').children('div');
           if (lista.length > 0) {
                for ( var i = 0; i < lista.length; ++i) {
                    $(lista[i]).children('span').html("");
                }
           }
           
    }
           
    MisCuentasViewController.prototype.resetDatosBurbuja= function () {
           var list = $('.gastos-table tr').children('td');
           // Desc
           $(list[1]).html("");
           // Importe
           $(list[3]).html("");
           // Fecha
           $(list[5]).html("");
    }
    
    MisCuentasViewController.prototype.bubblesMsg= function (set) {
           if (msgSet && !set) {
                $('#higherExpensesSection > #msg').remove();
                $(".detalle-gastos").show();
                $(".chartBubble").show();
                msgSet = false;
           } else if (!msgSet && set) {
                $('#higherExpensesSection').append(
                                              "<div id='msg' style='color:#0170c3;text-align:center; padding-top: 20%;'>No se cuenta con informaci&oacute;n a mostrar del mes actual</div>");
                $(".chartBubble").hide();
                $(".detalle-gastos").hide();
                msgSet = true;
           }
    }
           
    MisCuentasViewController.prototype.inicializarGastos= function (id) {
               if (cuentasInicializadas) {
                   misCuentasViewController.leerGastos(id);
               }
               if (!loading) {
                    parent.showLoadingLayer();
                    loading = true;
               }
               misCuentasViewController.resetBurbujas();
               misCuentasViewController.resetDatosBurbuja();
               misCuentasViewController.ocultarBurbujasVacias();
               misCuentasViewController.resetPanelInfo();
         window.setTimeout(function () {
            parent.hideLoadingLayer(); loading = false;
           var gastos = ret;
           console.log("Inicializando gastos ...");
           for (var g in gastos) {
           console.log(gastos[g].observaciones);
           }
           // resets
//           misCuentasViewController.resetBurbujas();
//           misCuentasViewController.resetDatosBurbuja();
           
           misCuentasViewController.ordenarGastos(gastos);
           listaMovBurbujas = gastos;
           if (banderaMXP || banderaUSD) {
                if ((typeof gastos != "undefined") && (gastos != null) && (gastos.length > 0)) {
                    for ( var g in gastos) {
                        // console.log(g);
                        // console.log(gastos);
           
                        misCuentasViewController.bubblesMsg(false);
                        var cargoact = misCuentasViewController.applyImpMask(gastos[g].cargo);
                        // console.log(cargoact);
                        var cont = parseInt(g);
                        cont++;
                        $('.chartBubble').children('div').children('div:nth-child(' + cont + ')').children('span').html(cargoact);
                    }
                    misCuentasViewController.setSelectedBubble(1);
                    misCuentasViewController.actDatosBurbuja(1);
                } else {
                    misCuentasViewController.bubblesMsg(true);
                }
           } else if (banderaTDC) {
                if ((typeof gastos != "undefined") && (gastos != null) && (gastos.length > 0)) {
                    misCuentasViewController.bubblesMsg(false);
                    for ( var g in gastos) {
                        if (parseFloat(gastos[g].importe_operacion) > 0) {
                            var cargoact = misCuentasViewController.applyImpMask(gastos[g].importe_operacion);
                        } else {
                            var cargoact = misCuentasViewController.applyImpMask(Math.abs(gastos[g].importe_operacion));
                        }
                        var cont = parseInt(g);
                        cont++;
                        $('.chartBubble').children('div').children('div:nth-child(' + cont + ')').children('span').html(cargoact);
                    }
                    misCuentasViewController.setSelectedBubble(1);
                    misCuentasViewController.actDatosBurbuja(1);
                } else {
                    misCuentasViewController.bubblesMsg(true);
                }
            }
           
            misCuentasViewController.ocultarBurbujasVacias();
         }, 3000);
    }
    
    MisCuentasViewController.prototype.actDatosBurbuja= function (id) {
           
           if (listaMovBurbujas.length > 0) {
                // Se decrementa para el index del array
                if (parseInt(id) > 0)
                    id--;
           
                var list = $('.gastos-table tr').children('td');
                // Desc
                $(list[1]).html(listaMovBurbujas[id].concepto);
           // Importe
                if (banderaMXP || banderaUSD) {
                    var cargoact = misCuentasViewController.applyImpMask(listaMovBurbujas[id].cargo);
                    $(list[3]).html(cargoact);
                } else {
                    if (parseFloat(listaMovBurbujas[id].importe_operacion) > 0) {
                        var cargoact = misCuentasViewController.applyImpMask(listaMovBurbujas[id].importe_operacion);
                    } else {
                    var cargoact = misCuentasViewController.applyImpMask(Math.abs(listaMovBurbujas[id].importe_operacion));
                    }
                    $(list[3]).html(cargoact);
                }
           
                // Fecha
                $(list[5]).html(misCuentasViewController.parseDateBubbles(listaMovBurbujas[id].fecha));
           }
               
    }
    
    MisCuentasViewController.prototype.resetPanelInfo= function () {
        var list = $('.gastos-table tr').children('td');
        $(list[3]).html("");
        $(list[5]).html("");
    }
               
    MisCuentasViewController.prototype.initDate= function () {
           var fecha = new Date();
           var meses = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre",
                        "Diciembre" ];
           
           $("#date").html(
                           fecha.getDate() + " " + meses[fecha.getMonth()] + " "
                           + fecha.getFullYear());
    }
    
    MisCuentasViewController.prototype.initListaCuentas= function () {
           console.log("initListaCuentas - banderaMXP = " + banderaMXP);
           console.log("initListaCuentas - banderaUSD = " + banderaUSD);
           console.log("initListaCuentas - banderaTDC = " + banderaTDC);
           if (banderaMXP) {
                accountListSelected = misCuentasViewController.pintarGraficaCuentasTDDPesos();
                if ((typeof accountListSelected != "undefined") && (accountListSelected.length > 0)) {
                    misCuentasViewController.inicializarGastos(accountListSelected[0].id);
                }
                accountVisibles = accountListSelected.slice(primeraBarraMostrada,ultimaBarraMostrada);
                if ((typeof accountVisibles != "undefined")	&& (accountVisibles.length > 0))
                        indiceCuentasBarras = accountVisibles[0].id;
                misCuentasViewController.inicializarValoresEjeX();
                misCuentasViewController.loadAccountsCharts('normalAccountsChartContainer');
           
           } else if (banderaUSD) {
                accountListSelected = misCuentasViewController.pintarGraficaCuentasDolares();
                if ((typeof accountListSelected != "undefined") && (accountListSelected.length > 0)) {
                    misCuentasViewController.inicializarGastos(accountListSelected[0].id);
                }
                accountVisibles = accountListSelected.slice(primeraBarraMostrada,
                                                       ultimaBarraMostrada);
                if ((typeof accountVisibles != "undefined") && (accountVisibles.length > 0))
                    indiceCuentasBarras = accountVisibles[0].id;
                misCuentasViewController.inicializarValoresEjeX();
                misCuentasViewController.loadAccountsCharts('dolaresAccountsChartContainer');
           
           } else if (banderaTDC) {
                accountListSelected = misCuentasViewController.leerCuentasTDCPesos();
                if ((typeof accountListSelected != "undefined") && (accountListSelected.length > 0)) {
                    misCuentasViewController.inicializarGastos(accountListSelected[0].id);
                }
                accountVisibles = accountListSelected.slice(primeraBarraMostrada, ultimaBarraMostrada);
                if ((typeof accountVisibles != "undefined") && (accountVisibles.length > 0))
                    indiceCuentasBarras = accountVisibles[0].id;
                misCuentasViewController.inicializarValoresEjeX();
                misCuentasViewController.loadCreditCardsChart('creditCardsChartContainer');
           }
           cuentasInicializadas = true;
           misCuentasViewController.ajustaSkrollBar();
    }
    
    MisCuentasViewController.prototype.generateData= function () {
           
           saldosChartData = [];
           var listaMov = tablaDatos;
           
           if ((typeof listaMov != "undefined") && (listaMov != null)
               && (listaMov.length > 0)) {
           
                var fecha = new Date();
                var primeraVez = true;
                var diaMes = 1;
                if (!banderaTDC) {
                    var importe = parseFloat(0);
                } else {
                    if (periodo == 0) {
                        var importe = parseFloat(0);
                    } else if (periodo == 1) {
                        var importe =  sessionStorage.importeAlDia;
                    } else if (periodo == 2) {
                        var importe =  sessionStorage.importeAlCorte;
                    }
                }
                var finMes;
                var diaMov;
                var meses = [ "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO",
                        "SEP", "OCT", "NOV", "DIC" ];
               
                var mes = parseInt(listaMov[0].fecha.substring(3, 5));
                var ano = parseInt(listaMov[0].fecha.substring(6, 10));

                if (periodo != 0) {
                    switch (mes) {
           
                        case 1:
                            finMes = 31;
                            mesMostrar = "ENE";
                            break;
                        case 2:
                            if ((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0))) {
                                finMes = 29;
                            } else {
                                finMes = 28;
                            }
                            mesMostrar = "FEB";
                            break;
           
                        case 3:
                            finMes = 31;
                            mesMostrar = "MAR";
                            break;
                        case 4:
                            finMes = 30;
                            mesMostrar = "ABR";
                            break;
                        case 5:
                            finMes = 31;
                            mesMostrar = "MAY";
                            break;
                        case 6:
                            finMes = 30;
                            mesMostrar = "JUN";
                            break;
                        case 7:
                            finMes = 31;
                            mesMostrar = "JUL";
                            break;
                        case 8:
                            finMes = 31;
                            mesMostrar = "AGO";
                            break;
                        case 9:
                            finMes = 30;
                            mesMostrar = "SEP";
                            break;
                        case 10:
                            finMes = 31;
                            mesMostrar = "OCT";
                            break;
                        case 11:
                            finMes = 30;
                            mesMostrar = "NOV";
                            break;
                        case 12:
                            finMes = 31;
                            mesMostrar = "DIC";
                            break;
           
                    }
                } else {
                    mesMostrar = meses[fecha.getMonth()];
                    finMes = fecha.getDate();
                }
           
           for (var i = 0; i < listaMov.length; i++) {
 
                diaMov = parseInt(listaMov[i].fecha.substring(0, 2));
           
                if (diaMov > diaMes) {
                    while (diaMov > diaMes) {
                        if (banderaTDC) {
                            saldosChartData.push(parseFloat(importe));
                        } else {
                            saldosChartData.push(parseFloat(importe));
                        }
           
                        diaMes++;
                    }
                    primeraVez = true;
                }
           
                if (diaMov == diaMes) {
                    if ((primeraVez) && (banderaTDC)) {
                        importe = parseFloat(importe);
                        console.log("Importe inicial = " + importe);
                        primeraVez = false;
                    } else if ((primeraVez) && (!banderaTDC)) {
                        importe = parseFloat(importe);
                        // console.log("Importe: " + importe);
                        primeraVez = false;
                    }
           
                    if (banderaTDC) {
                        if ((typeof listaMov[i].importe_operacion != "undefined")
                                && (listaMov[i].importe_operacion != "")
                                && (listaMov[i].importe_operacion != null)) {
                            importe += parseFloat(listaMov[i].importe_operacion);
                       } else {
                            importe += parseFloat(0);
                       }
                    } else if (banderaUSD || banderaMXP) {
                        if ((typeof listaMov[i].abono != "undefined")
                                && (listaMov[i].abono != "")
                                && (listaMov[i].abono != null)) {
                            importe += parseFloat(listaMov[i].abono);
                        } else {
                            importe += parseFloat(0);                        }
                        if ((typeof listaMov[i].cargo != "undefined")
                                && (listaMov[i].cargo != "")
                                && (listaMov[i].cargo != null)) {
                            importe -= parseFloat(listaMov[i].cargo);
                        } else {
                            importe += parseFloat(0);
                        }
                    }
           
                }
           
           }
           
           if (diaMov <= finMes) {
                while (diaMov <= finMes) {
                    saldosChartData.push(parseFloat(importe));
                    diaMov++;
                }
           }
           
        }
        
        if(banderaTDC && (periodo == 0)) {
               sessionStorage.importeAlDia = importe;
               console.log("Importe al d’a = " + sessionStorage.importeAlDia);
        } else if (banderaTDC && (periodo == 1)) {
               sessionStorage.importeAlCorte = importe;
               console.log("Importe al corte = " + sessionStorage.importeAlCorte);
        }
               
        misCuentasViewController.loadSaldosChart('balanceSection');
               
               if (sessionStorage.banderaRegresarPagar) {
               sessionStorage.removeItem('banderaRegresarPagar');
               }
    }
    
    MisCuentasViewController.prototype.actualizarDetallesCuentaSeleccionada= function (index, periodo) {
           
               tablaActiva = $('#sec2TableContainer table').not('.hidden');
               if (sessionStorage.banderaRegresarPagar) {
                   banderaMXP = false;
               }
               console.log("actualizarDetallesCuentaSeleccionada - banderaMXP = " + banderaMXP);
               console.log("actualizarDetallesCuentaSeleccionada - banderaUSD = " + banderaUSD);
               console.log("actualizarDetallesCuentaSeleccionada - banderaTDC = " + banderaTDC);
           
           var cuentas;
           var aliasCuenta;
               
           if ((typeof periodo == "undefined") || (periodo == null)) {
               periodo = 0;
           }
               
           if (banderaMXP) {
                $("#accountName").html(accountVisiblesXAxis[index]).css('color', accountsChartSelectedLegendColors[index + 1]);
                $(".saldo-cuenta > span").html(misCuentasViewController.applyImpMask(accountVisibles[index].data));
                if ((typeof accountVisibles != "undefined") && (accountVisibles.length > 0)) {
                    misCuentasViewController.updateMisCuentasTable(accountVisibles[index].id);
                    misCuentasViewController.inicializarGastos(accountVisibles[index].id);
                }
           } else if (banderaUSD) {
                $("#cuentaDolaresInfo #accountName").html(accountVisiblesXAxis[index]).css('color', accountsChartSelectedLegendColors[index + 1]);
                $(".saldo-cuenta > span").html(misCuentasViewController.applyImpMask(accountVisibles[index].data));
                if ((typeof accountVisibles != "undefined") && (accountVisibles.length > 0)) {
                    misCuentasViewController.updateMisCuentasTable(accountVisibles[index].id);
                    misCuentasViewController.inicializarGastos(accountVisibles[index].id);
                }
           } else if (banderaTDC) {
                var cuentas = accountVisibles;
           
                $(".credit-card-balance > span").text(misCuentasViewController.applyImpMask(cuentas[index].saldofecha));
                $(".credit-card-balance-at-cut > span:nth-of-type(2)").html(misCuentasViewController.applyImpMask(cuentas[index].saldocorte));
                $(".credit-card-minimum-payment > span:nth-of-type(2)").html(misCuentasViewController.applyImpMask(cuentas[index].pagominimo));
                $('#creditCardName').text(accountVisiblesXAxis[index]);
                $('#creditCardName').css('color',accountsChartSelectedLegendColors[index+1]);
                $('#expenseDescription').css('color',accountsChartSelectedLegendColors[index+1]);
           
                if ((typeof accountVisibles != "undefined") && (accountVisibles.length > 0)) {
                    misCuentasViewController.updateMisCuentasTable(accountVisibles[index].id);
                    misCuentasViewController.inicializarGastos(accountVisibles[index].id);
                }
           }
           
           if (index == 0) {
                misCuentasViewController.changeAccountsChartLabelColor(1);
           }
           sessionStorage.cuentaSeleccionadaId = accountVisibles[index].id;
           misCuentasViewController.changeBubblesChartColor(bubleColors[index], 'bubblesChart');
           misCuentasViewController.setSelectedBubble(1);
           
    }
    
    MisCuentasViewController.prototype.showcompartir= function () {
           
           if ($('.sub-min-comprobante').css('display') == 'none') {
                $('.sub-min-comprobante').css('display', 'block');
           } else {
                $('.sub-min-comprobante').css('display', 'none');
           }
    }
    MisCuentasViewController.prototype.generarComprobanteDesdeDiv= function (divId) {
           
           // PDF CONFIGURATION
           var pdfFilename = "test.pdf";
           
           var leftmargin = 150;
           var topmargin = 10;
           
           var bbvalogo = "data:image/jpeg;base64,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";
           var bbvalogowidth = 160;
           var bbvalogoheight = 28;
           
           // PDF GENERATION
           var doc = new jsPDF('p', 'pt', 'a4');
           
           doc.addImage(bbvalogo, 'JPEG', leftmargin, topmargin, bbvalogowidth,
                        bbvalogoheight);
           
           var options = {
                format : 'PNG'
           };
           
           doc.addHTML($("div#" + divId + ""), leftmargin, 2 * topmargin
                       + bbvalogoheight, options, function() {
                       
                       // In browsers
                       // doc.save();
                       
                       // In devices
                       var pdfOutput = doc.output();
                       
                       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(
                                                                                        fileSystem) {
                                                console.log(fileSystem.name);
                                                console.log(fileSystem.root.name);
                                                console.log(fileSystem.root.fullPath);
                                                
                                                fileSystem.root.getFile(pdfFilename, {
                                                                        create : true
                                                                        }, function(entry) {
                                                                        var fileEntry = entry;
                                                                        console.log(entry);
                                                                        
                                                                        entry.createWriter(function(writer) {
                                                                                           writer.onwrite = function(evt) {
                                                                                           console.log("write success");
                                                                                           };
                                                                                           
                                                                                           console.log("writing to file");
                                                                                           var data = pdfOutput;
                                                                                           var buffer = new ArrayBuffer(data.length);
                                                                                           var array = new Uint8Array(buffer);
                                                                                           
                                                                                           for ( var i = 0; i < data.length; i++) {
                                                                                           array[i] = data.charCodeAt(i);
                                                                                           }
                                                                                           writer.write(buffer);
                                                                                           }, function(error) {
                                                                                           console.log(error);
                                                                                           });
                                                                        }, function(error) {
                                                                        console.log(error);
                                                                        });
                                                }, function(event) {
                                                console.log(evt.target.error.code);
                                                });
                       });
    }
    
    
    MisCuentasViewController.prototype.ConsultaMovimientosCtasCheques= function (peticion) {
           if ((typeof peticion != "undefined") && (peticion != null)) {
                if (banderaMXP) {
                    exec(function (jsonResponse) { parent.hideLoadingLayer(); misCuentasViewController.returnRespuesta(jsonResponse); },
                            function (errorMessage) { parent.hideLoadingLayer(); console.log("Error en petición - ", errorMessage); },
                            "MisCuentasDelegate",
                            "recuperaCuentasTDDPesos",
                            [peticion]
                            );
                } else if (banderaUSD) {
                    exec(function (jsonResponse) { parent.hideLoadingLayer(); misCuentasViewController.returnRespuesta(jsonResponse); },
                            function (errorMessage) { parent.hideLoadingLayer(); console.log("Error en petición - ", errorMessage); },
                            "MisCuentasDelegate",
                            "recuperaCuentasDolares",
                            [peticion]
                            );
                }
           }
    }
    
    MisCuentasViewController.prototype.ConsultaMovimientosTarjetasCredito= function (peticion) {
           if ((typeof peticion != "undefined") && (peticion != null)) {
           exec(function (jsonResponse) { parent.hideLoadingLayer(); misCuentasViewController.returnRespuesta(jsonResponse); },
                   function (errorMessage) { parent.hideLoadingLayer(); console.log("Error en petición - ", errorMessage); },
                   "MisCuentasDelegate",
                   "recuperaCuentasTDCPesos",
                   [peticion]
                   );
           }
    }
           
    MisCuentasViewController.prototype.returnRespuesta= function (jsonResponse) {
           console.log("ENTRA EN RETURN RESPUESTA");
           this.respuesta = JSON.parse(jsonResponse).respuesta;
           ret = [];
           var list = [];
           tablaDatos = [];
           tablaDatos = list = misCuentasViewController.ordenaPorFecha(this.respuesta.movimientos.ListaMovimientos);
           tableContent = "";
           if (banderaMXP || banderaUSD) {
                console.log("CUENTAS MXP || USD");
                if ((typeof list != "undefined") && (list != null) && (list.length > 0)) {
                    for (var mov in list) {
                        if ((list[mov].cargo != "") && (list[mov].cargo != null)) {
                            ret.push(list[mov]);
                        }
                    }
                }
                if ((typeof tablaDatos != "undefined") && (tablaDatos != null) && (tablaDatos.length > 0)) {
                        console.log("tablaDatos != undefined && tablaDatos.length > 0");
                        for (index = tablaDatos.length-1; index >= 0; index--) {
//                            console.log("tablaDatos[" + index + "] = " + tablaDatos[index]);
                            if ((typeof tablaDatos[index].abono != "undefined")
                                    && (tablaDatos[index].abono != null)
                                    && (tablaDatos[index].abono != "")) {
                                    tableContent += "<tr><th>" + tablaDatos[index].concepto
                                    + "<span>" + misCuentasViewController.parseDate(tablaDatos[index].fecha)
                                    + "</span></th>" + "<td> $ " + misCuentasViewController.parseImporte(tablaDatos[index].abono)
                                    + "</td></tr>";
                            } else if ((typeof tablaDatos[index].cargo != "undefined")
                                       && (tablaDatos[index].cargo != null)
                                       && (tablaDatos[index].cargo != "")) {
                                    tableContent += "<tr><th>" + tablaDatos[index].concepto
                                    + "<span>" + misCuentasViewController.parseDate(tablaDatos[index].fecha)
                                    + "</span></th><td>- $ "
                                    + misCuentasViewController.parseImporte(tablaDatos[index].cargo) + "</td></tr>";
                            }
           
                        }
           
                } else {
                    tableContent += "<tr><td style='padding-top: 30%;'><div style='text-align:center'>No se cuenta con informaci&oacute;n disponible</div></td></tr>";
                }
            } else { // (banderaMXP || banderaUSD)
                console.log("CUENTAS TDC");
                if ((typeof list != "undefined") && (list != null) && (list.length > 0)) {
                    for (var mov in list) {
                        if ((list[mov].importe_operacion != "") && (list[mov].importe_operacion != null) && (parseFloat(list[mov].importe_operacion) < 0)) {
                            ret.push(list[mov]);
                        }
                    }
                }
           
                if ((typeof tablaDatos != "undefined") && (tablaDatos != null) && (tablaDatos.length > 0)) {
                    console.log("tablaDatos != undefined && tablaDatos.length > 0");
                    for (index = tablaDatos.length-1; index >= 0; index--) {
                        if ((typeof tablaDatos[index].importe_operacion != "undefined")
                                && (tablaDatos[index].importe_operacion != null)
                                && (tablaDatos[index].importe_operacion != "")) {
                            if (parseFloat(tablaDatos[index].importe_operacion) > 0) {
                                tableContent += "<tr><th>" + tablaDatos[index].concepto
                                + "<span>" + misCuentasViewController.parseDate(tablaDatos[index].fecha)
                                + "</span></th>" + "<td>"
                                + misCuentasViewController.parseImporte(tablaDatos[index].importe_operacion)
                                + "</td></tr>";
                            } else {
                                tableContent += "<tr><th>" + tablaDatos[index].concepto
                                + "<span>" + misCuentasViewController.parseDate(tablaDatos[index].fecha)
                                + "</span></th>" + "<td style='color:#e81060'>"
                                + misCuentasViewController.parseImporte(tablaDatos[index].importe_operacion)
                                + "</td></tr>";
                            }
                        }
           
                    }
                } else {
                    tableContent += "<tr><td style='padding-top: 30%;'><div style='text-align:center'>No se cuenta con informaci&oacute;n disponible</div></td></tr>";
                }
           }
           
           tablaActiva = $('#sec2TableContainer table').not('.hidden');
           
                tablaActiva.children().remove();
                tablaActiva.append(tableContent);
           if (!iniciaGastos) {
                misCuentasViewController.inicializarGastos(accountVisibles[0].id);
                iniciaGastos = true;
           }
           
//           console.log("tablaDatos");
//           for (var t in tablaDatos) {
//           console.log(tablaDatos[t]);
//           }
//           console.log(tableContent);
//           console.log("tablaActiva = " + tablaActiva);
           console.log("<<<< tablaDatos >>>>");
           parent.hideLoadingLayer();
           misCuentasViewController.generateData();
    }
 
    MisCuentasViewController.prototype.ordenaPorFecha= function (listaMovimientos) {
               if ((typeof listaMovimientos != "undefined") && (listaMovimientos != null)) {
                   for (var h = 0; h < listaMovimientos.length -1; h++) {
                       for (var i = 0; i < listaMovimientos.length -1; i++) {
                   
                       if (((typeof listaMovimientos[i].fecha == "undefined") || (listaMovimientos[i].fecha == null) || (listaMovimientos[i].fecha == "")) && (periodo == 0)) {
                            var fecha = new Date();
                            listaMovimientos[i].fecha = fecha.getDate() + "/" + fecha.getMonth()+1 + "/" + fecha.getFullYear();
                       }
                   
                       if (((typeof listaMovimientos[i+1].fecha == "undefined") || (listaMovimientos[i+1].fecha == null) || (listaMovimientos[i+1].fecha == "")) && (periodo == 0)) {
                            var fecha = new Date();
                            listaMovimientos[i+1].fecha = fecha.getDate() + "/" + fecha.getMonth()+1 + "/" + fecha.getFullYear();
                       }
                   
                           var dia1 = listaMovimientos[i].fecha.split("/")[0];
                           var dia2 = listaMovimientos[i+1].fecha.split("/")[0];
                   
                           if (dia1 > dia2) {
                               var aux = listaMovimientos[i+1];
                               listaMovimientos[i+1] = listaMovimientos[i];
                               listaMovimientos[i] = aux;
                           }                   
                       }
                   }
               }
               
               return listaMovimientos;
    }
           
    MisCuentasViewController.prototype.muestraGrafico= function (containerId, chartDatas) {
           
           var intervalo = 1;
           for (var i = 0; i < Math.min.apply(null, chartDatas).toString().length-1; i++) {
           intervalo *= 10;
           }
           
           Highcharts.setOptions({
                                 lang: {
                                    numericSymbols: null
                                 }
           });
           
           accountsChart = new Highcharts.Chart({
                chart: {
                        renderTo: containerId,
                        height: 175,
                        type: 'column'
                },
                tooltip: {
                          enabled: false
                },
                exporting: {
                            enabled: false
                },
                title: {
                        text: ''
                },
                subtitle: {
                           text: ''
                },
                xAxis: {
                        categories: accountVisiblesXAxis
                },
                yAxis: {
                        min: 0,
                        gridLineDashStyle: 'solid',
                        gridLineColor: '#ececec',
                        endOnTick: true,
                        title: {
                                text: ''
                        }
                },
                plotOptions: {
                        column: {
                            events: {
                                legendItemClick: function () {
                                             return false;
                                }
                            }
                        },
                        series: {
                            colorByPoint: true,
                            colors: accountChartColors,
                            enableMouseTracking: true,
                            events: {
                                click: function (event) {
                                	console.log("peinate guapo");
                                            if (banderaMXP) {
                                            	console.log("CONSOLE LOG 1:" + banderaMXP);
                                                document.getElementById('normalAccountsRange').value = event.point.x;
                                            } else if (banderaUSD) {
                                            	console.log("CONSOLE LOG 2:" + banderaUSD);
                                                document.getElementById('dolaresAccountsRange').value = event.point.x;
                                            }
                                            //console.log("CONSOLE LOG ONACCOUNTSELECTIONCHANGED 1:" + event.point.x);
                                            misCuentasViewController.onAccountSelectionChanged(event.point.x, false);
//                                            console.log("CONSOLE LOG ONACCOUNTSELECTIONCHANGED 2:" + event.point.x);

                                }
                            }
                        }
                },
                series: [{data: chartDatas}],
                legend: {
                        itemMarginTop: -10,
                        symbolHeight: 0,
                        symbolWidth: 0,
                        itemStyle: {
                                color: "#333333",
                                cursor: "auto",
                                fontSize: "11px",
                                fontWeight: 'normal'
                        },
                        itemHoverStyle: {},
                        x: 10,
                        itemDistance: 33.33
                },
                credits: {
                        enabled: false
                }
           });
                                    
           // Overrides the on hover behavior for the legend items.
           $.each(accountsChart.series, function (i, series) {
                    series.legendGroup.element.onmouseover = null;
           });
    }
           
    MisCuentasViewController.prototype.muestraGraficoTDC = function (containerId, chartDatas) {
           
           var intervalo = 1;
           for (var i = 0; ((i < Math.min.apply(null, creditCardVisibleDateBalance).toString().length-1) && (i < Math.min.apply(null, creditCardVisibleCutBalance).toString().length-1)); i++) {
           intervalo *= 10;
           }
           
           Highcharts.setOptions({
                                 lang: {
                                    numericSymbols: null
                                 }
           });
           
           accountsChart = new Highcharts.Chart({
                chart: {
                        renderTo: containerId,
                        height: 175,
                        type: 'column'
                },
                tooltip: {
                        enabled: false
                },
                colors: creditCardsChartColors,
                exporting: {
                            enabled: false
                },
                title: {
                        text: ''
                },
                subtitle: {
                           text: ''
                },
                xAxis: {
                        categories: accountVisiblesXAxis
                },
                yAxis: {
                        gridLineDashStyle: 'solid',
                        gridLineColor: '#ececec',
                        endOnTick: true,
                        title: {
                            text: ''
                        }
                },
                plotOptions: {
                    column: {
                        events: {
                            legendItemClick: function () {
                                          return false;
                            }
                        },
                        pointPadding: 0
                    },
                    series: {
                        colors: creditCardsChartColors,
                        enableMouseTracking: true,
                        events: {
                            click: function (event) {
                                          document.getElementById('creditCardsRange').value = event.point.x;
                                          misCuentasViewController.onAccountSelectionChanged(event.point.x, true);
                            }
                        }
                    }
                },
                series: chartDatas,
                legend: {
                    itemMarginTop: -10,
                    symbolHeight: 0,
                    symbolWidth: 0,
                    itemStyle: {
                                color: "#333333",
                                cursor: "auto",
                                fontSize: "11px",
                                fontWeight: 'normal'
                    },
                    itemHoverStyle: {},
                    x: 10,
                    itemDistance: 230
                },
                credits: {
                    enabled: false
                }
           });
           
           // Overrides the on hover behavior for the legend items.
           $.each(accountsChart.series, function (i, series) {
                  series.legendGroup.element.onmouseover = null;
           });
           
           
    }
    
   MisCuentasViewController.prototype.MuestraPantallaResultado = function (jsonResponse){
   console.log("MuestraPantallaResultado "+jsonResponse);
    var folio = JSON.parse(jsonResponse).respuesta.folioInternet;
    var mensaje = JSON.parse(jsonResponse).respuesta.listaMensajes.mensaje;
    var origen = sessionStorage.idOrigen;
    var destino = sessionStorage.idDestino;
    var importe = sessionStorage.importe;
    var fecha = sessionStorage.fecha;
    var hora = JSON.parse(jsonResponse).respuesta.horaOperacion;
    
                              
               var frame = parent.document.getElementById('contentFrame');
               if(sessionStorage.tipoCuentaOrigen == TIPO_TC){               
                    frame.src = 'transferirMisCuentasResultado.html?origen='+origen+'&destino='+destino+'&importe='+importe+'&fecha='+fecha+'&hora='+hora+'&folio='+folio+'&mensaje='+mensaje+'&comision='+JSON.parse(sessionStorage.comision).respuesta.comisionDisposicion;
               }else{
                    frame.src = 'transferirMisCuentasResultado.html?origen='+origen+'&destino='+destino+'&importe='+importe+'&fecha='+fecha+'&hora='+hora+'&folio='+folio+'&mensaje='+mensaje;
               
               }
               
//   document.location = 'transferirMisCuentasResultado.html?origen='+QueryString.origen+'&destino='+QueryString.destino+'&importe='+QueryString.importe+'&fecha='+QueryString.fecha+'&folio='+folio+'&comision=12.223';
   
   }
               
               MisCuentasViewController.prototype.QueryString = function () {
               // This function is anonymous, is executed immediately and
               // the return value is assigned to QueryString!
               var query_string = {};
               var query = window.location.search.substring(1);
               var vars = query.split("&");
               for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               // If first entry with this name
               if (typeof query_string[pair[0]] === "undefined") {
               query_string[pair[0]] = pair[1];
               // If second entry with this name
               } else if (typeof query_string[pair[0]] === "string") {
               var arr = [ query_string[pair[0]], pair[1] ];
               query_string[pair[0]] = arr;
               // If third or later entry with this name
               } else {
               query_string[pair[0]].push(pair[1]);
               }
               } 
               return query_string;
               } ();
               
   MisCuentasViewController.prototype.pagoMinimoNoInteres = function (proceso, operacion, accion, datosAplicativos) {
                   exec(function (jsonResponse) { sessionStorage.pagoMinimo = jsonResponse; },
                           function (errorMessage) { /*compraInvertirDelegate.muestraAlert("Aviso", JSON.parse(errorMessage).error.mensaje, "Aceptar");*/ },
                           "MisCuentasDelegate",
                           "pagoMinimoNoInteres",
                           [proceso, operacion, accion, datosAplicativos]
                           );
   }
               
   MisCuentasViewController.prototype.solicitaComision = function (proceso, operacion, accion, datosAplicativos, callbackSuccess) {
               exec(function (jsonResponse) { callbackSuccess(jsonResponse);},
                       function (errorMessage) { parent.loginDelegate.showAlert("Aviso", JSON.parse(errorMessage).error.mensaje, "Aceptar"); },
                       "TransferirDelegate",
                       "solicitaComision",
                       [proceso, operacion, accion, datosAplicativos]
                       )
   }
               
               MisCuentasViewController.prototype.payButton = function () {
               
               parent.document.getElementById('contentFrame').src = 'transferirMisCuentasIngresa.html?banderaPagarTDC=true&idOrigen=$idDestino=' + sessionStorage.cuentaSeleccionadaId;
                    parent.baseViewController.validaLocation('isTransfer', 'nb-miscuentas', '');
               }
               
               
       		MisCuentasViewController.prototype.aPosicionGlobal = function () {
    			parent.baseViewController.validaLocation("","","");
    		}
    var misCuentasViewController = new MisCuentasViewController();
    module.exports = misCuentasViewController;
});

/* _______________ TERMINA PHONEGAP ______________________ */

/* _______________ EMPIEZA JS _________________ */

function alertDismissed() {
    // hacer algo
}

function mostrarError(mensaje) {
    navigator.notification.alert(mensaje, // mensaje (message)
                                 alertDismissed, // función 'callback' (alertCallback)
                                 "ERROR", // titulo (title)
                                 'Cerrar' // nombre del botón (buttonName)
                                 );
}

function key(e) {
    return e ? e.which : event.keyCode;
}

function confirmar() {
    $('#loading').css('display', 'block');
}

function isIOS() {
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
}

function compartir() {
    if ($('.sub-min-comprobante').css('display') == 'none') {
        $('.sub-min-comprobante').css('display', 'block');
    } else {
        $('.sub-min-comprobante').css('display', 'none');
    }
}

function ConsultaMovimientosCtasChequesRespuesta(numeroCuenta, saldoDisp,
                                                 indicador, movimientos) {
    this.numero_cuenta = validate(numeroCuenta);
    this.saldo_disponible = validate(saldoDisp);
    this.indicadorFueraDeHorarios = validate(indicador);
    this.movimientos = validate(movimientos);
}

function ConsultaMovimientosTarjetasCreditoRespuesta(saldoDisponible,
                                                     indicadorFdr, saldoALaFecha, numTarjeta, indicadorFueraDeHorario,
                                                     movimientos) {
    this.saldo_disponible = validate(saldoDisponible);
    this.indicador_fdr = validate(indicadorFdr);
    this.saldo_a_la_fecha = validate(saldoALaFecha);
    this.numTarjeta = validate(numTarjeta);
    this.indicadorFueraDeHorario = validate(indicadorFueraDeHorario);
    this.movimientos = validate(movimientos);
}

function setSelectedBubble(index) {
	$('.chartBubble').children('div').children('div').css('opacity',
			unselectedBubbleOpacity);

	if (index < 6 && index > 0) {
		$('.chartBubble').children('div').children(
				'div:nth-child(' + index + ')').css('opacity',
				selectedBubbleOpacity);
		actDatosBurbuja(index);
	}
}
