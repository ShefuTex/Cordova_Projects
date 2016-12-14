;
var noPetision=0;
var cambioContrato=1;
var data1="";
var desdeContrato=0;
var envioCancelar =0;
var envioCont =0;
var bandera =0;
var fueOKD=true;
var fueOKM=true;
(function () {
 var bcomServer = {
 
    CALLBACK_TIMEOUT: 0,
 
    operationCode: {
        SimulaCompraVenta: "2",
        CompraVentaInversiones: "3",
        ConsultaEstatusDeCapitales: "4",
        ConsultaDetalleOrdenCapitales: "5",
        CancelacionOrdenCapitales: "6",
        ConsultaCarteraDetalleInversion: "7",
        EnvioComprobante: "8",
        GuardadoComprobante: "9",
        SolicitaCambioContrato: "10",
        SolicitaCierreApp: "11",
        AperturaFichero: "12",
        IrAPosicionGlobal: "13",
        TransferenciaEfectivo: "14"
    },
 
    invocaServicioDesdeInfoBolsa: function (code, params, callback) {
 
    var self=this;
 
    switch (code) {
 
        case this.operationCode.SimulaCompraVenta:
        if(bandera == 0){
            bandera = 1;
            parent.loginDelegate.wtrealizaCompraVenta(params.data1, params.data2, params.data3, params.data4, params.data5, params.data6,"S", function () {
                if (sessionStorage.okCV == 'false'){
                    self._operationCodeUnknown(params, callback);
                    bandera = 0;
                }else{
                    self._simulaCompraVentaInversiones(params, callback);
                    bandera = 0;
                }
 
                /*sessionStorage.elegibilidad = "NE";
                sessionStorage.importeComision = 1.07;
                sessionStorage.porcentajeComision = 0.25;
                sessionStorage.iva = 0.17;
                sessionStorage.importe = 431.3;
                bandera = 0;
                self._simulaCompraVentaInversiones(params, callback);*/
 
            });
        }
    break;
    case this.operationCode.CompraVentaInversiones:
    parent.loginDelegate.wtrealizaCompraVenta(params.data1, params.data2, params.data3, params.data4, params.data5, params.data6,"N", function () {
 
        //sessionStorage.folioInternet = "0040020013";
        if (sessionStorage.okCV == 'false'){
            self._operationCodeUnknown(params, callback);
        }
        self._compraVentaInversiones(params, callback);
        envioCont = 0;
        envioCancelar = 0;
    });
 
    break;
    case this.operationCode.ConsultaEstatusDeCapitales:
    var estatus=(params.data1)?params.data1:"4";
    parent.loginDelegate.wtconsultaCapitales(estatus, function () {
        if (sessionStorage.okCap == 'false'){
            self._operationCodeUnknown(params, callback);
        }else
            self._consultaEstatusDeCapitales(params, callback);
    });
 
    break;
    case this.operationCode.ConsultaDetalleOrdenCapitales:
        if(bandera == 0){
            bandera = 1;
        fecha = params.data3.substring(0,4)+"/"+params.data3.substring(4,6)+"/"+params.data3.substring(6,8);
        parent.loginDelegate.wtdetalleOrden(params.data1, params.data2, fecha, params.data3, function () {
            if(sessionStorage.okDO == 'false'){
                self._operationCodeUnknown(params, callback);
                bandera = 0;
            }else{
                self._consultaDetalleOrdenCapitales(params, callback);
                bandera = 0;
            }
        });
    }
    break;
    case this.operationCode.CancelacionOrdenCapitales:
        if(bandera == 0){
            bandera = 1;
 
            parent.loginDelegate.wtcancelaOrden(params.data1, params.data2, params.data3,params.data4, function () {
                if(sessionStorage.okCO == 'false'){
                    self._operationCodeUnknown(params, callback);
                    bandera = 0;
                }else{
                    envioCancelar = 1;
                    envioCont = 0;
                    bandera = 0;
                    self._cancelacionOrdenCapitales(params, callback);
                }
            });
        }
    break;
    case this.operationCode.ConsultaCarteraDetalleInversion:

        $('body').click(function(event) {

            if($(event.target).is('.icoRefresh')) {

                noPetision=0;

            }if($(event.target).is('.ifb-select')) {

                noPetision=0;

            }if($(event.target).is('#homeBtn')) {

                noPetision=0;

                cambioContrato=1;

            }if($(event.target).is('.contBottom .bottomLeft .bottomLeftBox #investmentDetailHeader .icoOpenBox')) {

                 noPetision=1;

                 cambioContrato=2;

            }if($(event.target).is('#investmentDetail_positionTable .top .topBox .title .icoOpenBox')) {

                 if (cambioContrato == "2")

                    cambioContrato=3;

            }if($(event.target).is('#investmentDetail_orderBookTable .middle .middleBox .title .icoOpenBox')) {

                 if (cambioContrato == "2")

                    cambioContrato=4;

            }if($(event.target).is('#investmentDetail_positionTable .middle .middleBox .title .icoCloseBox')) {

                 if (cambioContrato == "3")

                    cambioContrato=2;

            }if($(event.target).is('#investmentDetail_orderBookTable .middle .middleBox .title .icoCloseBox')) {

                 if (cambioContrato == "4")

                    cambioContrato=2;

            }if($(event.target).is('#menuBtnAccounts a')) {

                 }

                 

        });

 

        if(noPetision == 0) {

            parent.loginDelegate.wtconsultaDetalleInversion(params.data1, function() {

                if(params.data1 == "D") {

                    if (sessionStorage.ok == 'false'){

                        sessionStorage.lstDetalleD = sessionStorage.errorDetalle;

                        fueOKD=false;

                    } else {

                        sessionStorage.lstDetalleD = sessionStorage.lstDetalle;

                        fueOKD=true;

                    }

                    data1="D";

                }

                if(params.data1 == "M") {

                    if (sessionStorage.ok == 'false'){

                        sessionStorage.lstDetalleM = sessionStorage.errorDetalle;

                        fueOKM=false;

                    } else {

                        sessionStorage.lstDetalleM = sessionStorage.lstDetalle;

                        fueOKM=true;

                    }

                    data1="M";

                }

                                                 

                if (sessionStorage.ok == 'false'){

                    self._consultaCarteraDetalleInversion(params, callback);

                    self._operationCodeUnknown(params, callback);

                } else {

                    self._consultaCarteraDetalleInversion(params, callback);

                }

                noPetision++;

        });

    } else {

        if ((sessionStorage.lstDetalleD) && (params.data1 == "D")) {

            if (fueOKD == true) {

                sessionStorage.lstDetalle = sessionStorage.lstDetalleD;

                self._consultaCarteraDetalleInversion(params, callback);

            } else {

                sessionStorage.errorDetalle = sessionStorage.lstDetalleD;

                self._consultaCarteraDetalleInversion(params, callback);

                self._operationCodeUnknown(params, callback);

        }

    }

    if ((sessionStorage.lstDetalleM) && (params.data1 == "M")) {

        if (fueOKM == true) {

            sessionStorage.lstDetalle = sessionStorage.lstDetalleM;

            self._consultaCarteraDetalleInversion(params, callback);

        } else {

            sessionStorage.errorDetalle = sessionStorage.lstDetalleM;

            self._operationCodeUnknown(params, callback);

        }

    }

 }

 break;


    case this.operationCode.EnvioComprobante:
            if(envioCont == 0){
                $("#envioCorreo").css('zIndex',9999);
                $("#envioCorreo").dialog("open");
 
                self._enviarComprobante(params, callback);
            }else{ }
        envioCont = 1;
 
    break;
 
    case this.operationCode.GuardadoComprobante:
        this._guardarComprobante(params, callback);
    break;
 
    case this.operationCode.SolicitaCambioContrato:
        sessionStorage.testigo = params.id_testigo;
        popupLstCtas(function () {      });
        desdeContrato=1;
        self._solicitarCambioContrato(params, callback);
    break;
 
    case this.operationCode.SolicitaCierreApp:
 
        parent.loginDelegate.wtLogout();
 
    break;
 
    case this.operationCode.AperturaFichero:
    	
    	var ua = navigator.userAgent;
    	console.log("ua_mario"+ua);
    	var version = getAndroidVersion(); //"4.2.1"
    	console.log("version_ "+ version);
    	
    function getAndroidVersion(ua) {
        ua = (ua || navigator.userAgent).toLowerCase(); 
        var match = ua.match(/android\s([0-9\.]*)/);
        return match ? match[1] : false;
    };
    
        if (params.data1) {
            parent.loginDelegate.wtaperturaFichero("ec_temp",params.data1,"temp_ec", function() {
            	var ua = navigator.userAgent;
            	console.log("ua_mario"+ua);
            	var version = getAndroidVersion(); //"4.2.1"
            	console.log("version_ "+ version);
            	if(version > "4.2.2"){
            		var src = "../../../../../js/pdfjs/web/viewer.html?file=" + sessionStorage.localPdfPath;
            		 $("#objectPDF").attr('style','overflow-y:hidden !important; width:100% !important; height:479px !important');
 
            	}else{
            		var src = "../../../../../js/pdfjs/web/viewer.html?file="+params.data1;
            		var currentHeight = 0;
            		currentHeight = (0 != window.innerHeight) ? window.innerHeight : window.parent.window.innerHeight;
            		if(currentHeight <= 600){
            			$("#objectPDF").attr('style','overflow-y:hidden !important; width:100% !important; height:350px !important');	
            		}else{
            			$("#objectPDF").attr('style','overflow-y:hidden !important; width:100% !important; height:479px !important');
            		}
            		 
            		
            	}
            	 //console.log(#objectPDF);
                console.log("src_mario: "+src);
                $("#objectPDF").attr("src", src);
                $("#dialogPDF").dialog("open");
                $("#divPDF").show();
                self._aperturaFichero(params, callback);
            });

        }else {
            alert('SIMULACION DE SERVIDOR: AperturaFichero: No url file');
            self._aperturaFichero(params, callback);
        }
    break;
 
    case this.operationCode.IrAPosicionGlobal:
        /////////BANCARIA
        //parent.baseViewController.validaLocation('', '', '');
        /////////BTRADER
         parent.loginDelegate.wtLogout();
    break;
 
    case this.operationCode.TransferenciaEfectivo:
        var version_RG = JSON.parse(sessionStorage.jsonReglasNegocio).version;
        if(version_RG == 29){
            parent.loginDelegate.wtReglasValor(function(mensaje,esOK){
                if(esOK == 'OKH'){
                    traspasoEfe(function () {
                        self._transferenciaEfectivo(params,callback);
                    });
                }
            });
        }
    break;
    default:
        this._operationCodeUnknown(code, callback);
    }
 
},
 
 _operationCodeUnknown: function (params,code, callback) {
    var response  = null;
    response = {
        "status": {
            "ok": false,
            "reason": sessionStorage.errorDetalle
        }
    };
    if (callback) {
        callback(response);
    }
 
    if((cambioContrato == 2) && (desdeContrato == 1)) {
        $('#investmentDetail_orderBookTable .middle .middleBox .title .icoRefresh').click();
        desdeContrato=0;
    }
 },
 
 _solicitarCierreApp: function () {
    alert('SIMULACION DE SERVIDOR: Saliendo de la App ...');
 },
 
_irAPosicionGlobal: function () {
    alert('SIMULACION DE SERVIDOR: Ir a posición global ...');
 },
 
 _simulaCompraVentaInversiones: function (params, callback) {
    var response = {
        "status": {
            "ok": true
        },
        "answer": {}
    };
 
 
    response.answer = {
        "comision": sessionStorage.importeComision,
        "elegibilidad": sessionStorage.elegibilidad,
        "emisora": (params.data1 ? params.data1 : ''),
        "fechavig": (params.data6 ? params.data6 : ''),
        "importe": sessionStorage.importe,
        "iva": sessionStorage.iva,
        "operacion": (params.data4 ? params.data4 : 'Compra'),
        "porcentaje": sessionStorage.porcentajeComision,
        "precio": (params.data3 ? params.data3 : '0'),
        "serie": (params.data2 ? params.data2 : ''),
        "titulo": (params.data5 ? params.data5 : ''),
        "id_testigo": (params.id_testigo ? params.id_testigo : '')
    };
    if (callback) {
        callback(response);
    }
 },
 
 _compraVentaInversiones: function (params, callback) {
    var response = {
            "status": {
            "ok": true
        },
        "answer": {}
    };
 
    response.answer = {
        "folioInternet": sessionStorage.folioInternet ,
        "id_testigo": (params.id_testigo ? params.id_testigo : '')
    };
 
    if (callback) {
        callback(response);
    }
 },
 
 _consultaEstatusDeCapitales: function (params, callback) {
 
    try {
        var objJSON = JSON.parse(sessionStorage.lstCap);
        if (objJSON) {
            var lstCap = [];
            for (elem in objJSON) {
                lstCap.push(objJSON[elem]);
            }
  
            salida = lstCap;
  
            var response = {
                "status": {
                    "ok": true
                },
                "answer": {}
            };
  
  
            switch (params.data1) {
                case "1":
                    //Pendientes
                    response.answer.ordenes = salida;
                break;
                case "2":
                    //Canceladas
                    response.answer.ordenes = salida;
                break;
                case "3":
                    //Asignadas
                    response.answer.ordenes = salida;
                break;
                case "4":
                default:
                    //Todas
                    response.answer.ordenes = salida;
                break;
            }
        } else {
            var response = {
                "status": {
                    "ok": true
                },
                "answer": {
                    "ordenes":[],
                    "id_testigo":(params.id_testigo ? params.id_testigo : '')
                }
            };
        }response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
  
        if (callback) {
            callback(response);
        }
     
    } catch (e) {
        var response = {
            "status": {
                "ok": true
            },
            "answer": {
                "ordenes":[],
                "id_testigo":(params.id_testigo ? params.id_testigo : '')
            }
        };
        if (callback) {
            callback(response);
        }
     }
 
    /*var response = {
        "status": {
            "ok": true
        },
        "answer": {}
    };
 
    var pendientes = {
        "ordenes": [{
             "asignados": "4000",
             "emisora": "CORPTRC",
             "empresa": "CORPTRCISHRS",
             "estado": "pe",
             "fechareg": "20120126",
             "folio": "500002",
             "operacion": "V",
             "pendientes": "1000",
             "precio": "35690.62",
             "serie": "ISHRS",
             "solicitados": "5000"
        },{
             "asignados": "4300",
             "emisora": "GMODELO",
             "empresa": "BCM",
             "estado": "m",
             "fechareg": "20120126",
             "folio": "500001",
             "operacion": "C",
             "pendientes": "145700",
             "precio": "0.0",
             "serie": "C",
             "solicitados": "150000"
        },{
             "asignados": "4300",
             "emisora": "WALMEX",
             "empresa": "BCM",
             "estado": "pe",
             "fechareg": "20120606",
             "folio": "500008",
             "operacion": "C",
             "pendientes": "145700",
             "precio": "0.0",
             "serie": "V",
             "solicitados": "150000"
        }]
    };
    var asignadas = {
        "ordenes": [{
             "asignados": "4300",
             "emisora": "WALMEX",
             "empresa": "BCM",
             "estado": "e",
             "fechareg": "20120126",
             "folio": "500007",
             "operacion": "C",
             "pendientes": "145700",
             "precio": "0.0",
             "serie": "V",
             "solicitados": "150000"
        }]
    };
 
    var canceladas = {
        "ordenes": [{
             "asignados": "0",
             "emisora": "GMODELO",
             "empresa": "BCM",
             "estado": "c",
             "fechareg": "20120126",
             "folio": "500006",
             "operacion": "C",
             "pendientes": "0",
             "precio": "0.0",
             "serie": "C",
             "solicitados": "150000"
        }, {
             "asignados": "0",
             "emisora": "WALMEX",
             "empresa": "BCM",
             "estado": "c",
             "fechareg": "20120126",
             "folio": "500069",
             "operacion": "C",
             "pendientes": "0",
             "precio": "0.0",
             "serie": "V",
             "solicitados": "150000"
        }]
    };
 
    switch (params.data1) {
        case "1":
            //Pendientes
            response.answer = pendientes;
        break;
        case "2":
            //Canceladas
            response.answer = canceladas;
        break;
        case "3":
            //Asignadas
            response.answer = asignadas;
        break;
        case "4":
            //Todas
            response.answer.ordenes = [];
            response.answer.ordenes = _.union(pendientes.ordenes, canceladas.ordenes, asignadas.ordenes);
        break;
        default:
            alert('BANCOMER.Server.BCOM - Consulta Estatus De Capitales: Param data1 incorrecto ' + params.data1);
        break;
    }
    response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
 
    if (callback) {
        callback(response);
    }*/
 
 },
 
 _consultaDetalleOrdenCapitales: function (params, callback) {
 
    try {
        var objJSON = JSON.parse(sessionStorage.lstTit);
    } catch (e) {
 }
 if (objJSON) {
 
    var lstTit = [];
    for (elem in objJSON) {
        lstTit.push(objJSON[elem]);
    }
 salida = lstTit;
 }
 
 var response = {
    "status": {
        "ok": true
    },
    "answer": {}
};
 
 response.answer.hechos = salida;
 response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
 
 if (callback) {
 callback(response);
 }
 
 },
 
 _cancelacionOrdenCapitales: function (params, callback) {
 
    var response = {
        "status": {
            "ok": true
        },
        "answer": {}
     };
  
     response.answer = {
        "folioInternet": sessionStorage.folioInternetCancela,
        id_testigo: (params.id_testigo ? params.id_testigo : '')
     };
 
    /*var response = {
        "status": {
            "ok": true
        },
        "answer": {}
    };
 
    response.answer = {
        "folioInternet": params.data2+params.data2,
        id_testigo: (params.id_testigo ? params.id_testigo : '')
    };*/
 
    if (callback) {
        callback(response);
    }
 },
 
 _consultaCarteraDetalleInversion: function (params, callback) {
 
    if (sessionStorage.ok == 'true'){
        var objJSON = JSON.parse(sessionStorage.lstDetalle);
        if (objJSON) {
            var lstDetalle = [];
            for (elem in objJSON) {
                lstDetalle.push(objJSON[elem]);
                if(objJSON[elem].emisora == "Efectvo"){
                    lstDetalle.pop();
                 }   
            }
            salida = lstDetalle;
        }
 
        var response = {
            "status": {
                "ok": true
            },
            "answer": {}
        };
 
        response.answer.inversiones = salida;
        response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
 
        if (callback) {
            callback(response);
        }
        data1 = params.data1;
 
        }
         else {
            var response =  {
                "status": {
                    "ok": true
            },
                "answer": {
                    "inversiones":[],
                    "id_testigo":(params.id_testigo ? params.id_testigo : '')
            }
        };
        if (callback) {
            callback(response);
        }
    }
    if((cambioContrato == 2) && (desdeContrato == 1)) {
        $('#investmentDetail_orderBookTable .middle .middleBox .title .icoRefresh').click();
        desdeContrato=0;
    }
 },
 
 _enviarComprobante: function (params, callback) {
 
    var response = {
        "status": {
            "ok": true
        },
        "answer": {}
    };
 
    response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
 
    if (callback) {
        callback(response);
    }
 },
 
 _guardarComprobante: function (params, callback) {
 
    generaComprobante (params.emisora, params.operacion, params.importe, params.precio, params.titulos, params.fechaVigencia, params.comision, params.iva, params.porcentajeComision, params.folioInternet, params.fechaOperacion, params.accionComprobante);
        var response = {
            "status": {
                "ok": true
            },
            "answer": {}
    };
 
    response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
    if (callback) {
        callback(response);
    }
 },
 
 _solicitarCambioContrato: function (params,callback) {
    var response = {
        "status": {
            "ok": true
        },
        "answer": {}
    };

    var ctaPatSel = sessionStorage.cuentaPatrimonial;
    sessionStorage.ctaPatSel = ctaPatSel;
    response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
    response.answer.cuentaNueva = 1;
 
    if (callback) {
        callback(response);
    }
 },
 
 _aperturaFichero: function (params, callback) {
 
    var response = {
        "status": {
            "ok": true
        },
        "answer": {}
    };
 
    response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
 
    if (callback) {
        callback(response);
    }
 },
 
 _transferenciaEfectivo: function (params, callback) {
    if (callback) {
            callback(response);
        }
    },
 };
 
 BANCOMER.Server = BANCOMER.Server || {};
 BANCOMER.Server.BCOM = bcomServer;
 
 }());