;
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

            switch (code) {

                case this.operationCode.SimulaCompraVenta:
                    this._simulaCompraVentaInversiones(params, callback);
                    break;
                case this.operationCode.CompraVentaInversiones:
                    this._compraVentaInversiones(params, callback);
                    break;
                case this.operationCode.ConsultaEstatusDeCapitales:
                    this._consultaEstatusDeCapitales(params, callback);
                    break;
                case this.operationCode.ConsultaDetalleOrdenCapitales:
                    this._consultaDetalleOrdenCapitales(params, callback);
                    break;
                case this.operationCode.CancelacionOrdenCapitales:
                    this._cancelacionOrdenCapitales(params, callback);
                    break;
                case this.operationCode.ConsultaCarteraDetalleInversion:
                    this._consultaCarteraDetalleInversion(params, callback);
                    break;
                case this.operationCode.EnvioComprobante:
                    this._enviarComprobante(params, callback);
                    break;
                case this.operationCode.GuardadoComprobante:
                    this._guardarComprobante(params, callback);
                    break;
                case this.operationCode.SolicitaCambioContrato:
                    this._solicitarCambioContrato(params, callback);
                    break;
                case this.operationCode.SolicitaCierreApp:
                    this._solicitarCierreApp();
                    break;
                case this.operationCode.AperturaFichero:
                    this._aperturaFichero(params, callback);
                    break;
                case this.operationCode.IrAPosicionGlobal:
                    this._irAPosicionGlobal();
                    break;
                case this.operationCode.TransferenciaEfectivo:
                    this._transferenciaEfectivo();
                    break;
                default:   
                    this._operationCodeUnknown(code, callback);    
            }
            
        },

        _callbackRandomly: function (operationCode, msg, params, response, callback) {
            var self = this;
            if (callback && typeof(callback) === "function") {
                setTimeout(
                    function () {
                        callback(response);
                    },
                    Math.floor((Math.random() * self.CALLBACK_TIMEOUT) + 1)
                );
            }
        },

        _operationCodeUnknown: function (code, callback) {
            var response = {
                "status": {
                    "ok": false,
                    "reason": "Operation code unknown"
                }
            };
            
            this._callbackRandomly(code, 'Operación no definida', {}, response, callback);
        },

        _solicitarCierreApp: function () {
            alert('BANCOMER.Server.BCOM -  SIMULACION DE SERVIDOR: Saliendo de la App ...');
        },

        _simulaCompraVentaInversiones: function (params, callback) {
            var response = {
                "status": {
                    "ok": true
                },
                "answer": {}
            };
            
            var percentage = 0.05;
            var num = Number(params.data5 ? params.data5 : '');
            var price = Number((params.data3 ? params.data3 : '0'));
            var commission = (price * num) * percentage;
            var vat = (price * num) * 0.21;
            var amount = (price * num) + commission + vat;


            response.answer = {
                "comision": commission.toString(),
                "elegibilidad": "NE",
                "emisora": (params.data1 ? params.data1 : ''),
                "fechavig": (params.data6 ? params.data6 : ''),
                "importe": amount.toString(),
                "iva": vat.toString(),
                "operacion": (params.data4 ? params.data4 : 'Compra'),
                "porcentaje": percentage.toString(),
                "precio": price.toString(),
                "serie": (params.data2 ? params.data2 : ''),
                "titulo": num.toString(),
                "id_testigo": (params.id_testigo ? params.id_testigo : '')
            };

            this._callbackRandomly(this.operationCode.SimulaCompraVenta, 'Simula Compra Venta Inversiones', params, response, callback);
        },

        _compraVentaInversiones: function (params, callback) {
            var response = {
                "status": {
                    "ok": true
                },
                "answer": {}
            };

            response.answer = {
                "folioInternet": "022006",
                "id_testigo": (params.id_testigo ? params.id_testigo : '')
            };

            this._callbackRandomly(this.operationCode.CompraVentaInversiones, 'Compra Venta Inversiones', params, response, callback);
        },

        _consultaEstatusDeCapitales: function (params, callback) {
            var response = {
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

            this._callbackRandomly(this.operationCode.ConsultaEstatusDeCapitales, 'Consulta Estatus De Capitales', params, response, callback);
        },

        _consultaDetalleOrdenCapitales: function (params, callback) {

            var response = {
                "status": {
                    "ok": true
                },
                "answer": {}
            };

            response.answer = {
                "hechos": [{
                    "fecha": "20121005",
                    "hora": "121559",
                    "tipo": "S",
                    "titulo": "150000"
                }, {
                    "fecha": "20121015",
                    "hora": "141545",
                    "tipo": "A",
                    "titulo": "250000"
                }, {
                    "fecha": "20121019",
                    "hora": "141936",
                    "tipo": "S",
                    "titulo": "350000"
                },{
                    "fecha": "20121006",
                    "hora": "121559",
                    "tipo": "S",
                    "titulo": "150000"
                }, {
                    "fecha": "20121017",
                    "hora": "141545",
                    "tipo": "A",
                    "titulo": "250000"
                }, {
                    "fecha": "20121018",
                    "hora": "141936",
                    "tipo": "S",
                    "titulo": "350000"
                },{
                    "fecha": "20121009",
                    "hora": "121559",
                    "tipo": "S",
                    "titulo": "150000"
                }, {
                    "fecha": "20121010",
                    "hora": "141545",
                    "tipo": "A",
                    "titulo": "250000"
                }, {
                    "fecha": "20121011",
                    "hora": "141936",
                    "tipo": "S",
                    "titulo": "350000"
                },{
                    "fecha": "20121002",
                    "hora": "121559",
                    "tipo": "S",
                    "titulo": "150000"
                }, {
                    "fecha": "20131015",
                    "hora": "141545",
                    "tipo": "A",
                    "titulo": "250000"
                }, {
                    "fecha": "20141019",
                    "hora": "141936",
                    "tipo": "S",
                    "titulo": "350000"
                },{
                    "fecha": "20151005",
                    "hora": "121559",
                    "tipo": "S",
                    "titulo": "150000"
                }, {
                    "fecha": "20161015",
                    "hora": "141545",
                    "tipo": "A",
                    "titulo": "250000"
                }, {
                    "fecha": "20171019",
                    "hora": "141936",
                    "tipo": "S",
                    "titulo": "350000"
                },{
                    "fecha": "20181005",
                    "hora": "121559",
                    "tipo": "S",
                    "titulo": "150000"
                }, {
                    "fecha": "20191015",
                    "hora": "141545",
                    "tipo": "A",
                    "titulo": "250000"
                }, {
                    "fecha": "20221019",
                    "hora": "141936",
                    "tipo": "S",
                    "titulo": "350000"
                },{
                    "fecha": "20321005",
                    "hora": "121559",
                    "tipo": "S",
                    "titulo": "150000"
                }, {
                    "fecha": "20121115",
                    "hora": "141545",
                    "tipo": "A",
                    "titulo": "250000"
                }, {
                    "fecha": "20121219",
                    "hora": "141936",
                    "tipo": "S",
                    "titulo": "350000"
                },{
                    "fecha": "20121015",
                    "hora": "121559",
                    "tipo": "S",
                    "titulo": "150000"
                }, {
                    "fecha": "20121025",
                    "hora": "141545",
                    "tipo": "A",
                    "titulo": "250000"
                }, {
                    "fecha": "20121014",
                    "hora": "141936",
                    "tipo": "S",
                    "titulo": "1"
                }]
            };
            response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
            
            this._callbackRandomly(this.operationCode.ConsultaDetalleOrdenCapitales, 'Consulta Detalle Orden Capitales', params, response, callback);
        },

        _cancelacionOrdenCapitales: function (params, callback) {
            var response = {
                "status": {
                    "ok": true
                },
                "answer": {}
            };

            response.answer = {
                "folioInternet": params.data2+params.data2,
                id_testigo: (params.id_testigo ? params.id_testigo : '')
            };

            this._callbackRandomly(this.operationCode.CancelacionOrdenCapitales, 'Cancelacion Orden Capitales', params, response, callback);
        },

        _consultaCarteraDetalleInversion: function (params, callback) {
            var response = {
                "status": {
                    "ok": true
                },
                "answer": {}
            };

            var dia_actual = [
                {
                    "emisora": "CORPTRC",
                    "precio": "30.24",
                    "serie": "ISHRS",
                    "titulos": "3871"
                }, {
                    "emisora": "BMERLIQ",
                    "precio": "31.743643",
                    "serie": "P",
                    "titulos": "398"
                }, {
                    "emisora": "AMX",
                    "precio": "16.94",
                    "serie": "L",
                    "titulos": "1600"
                }, {
                    "emisora": "DCP-1",
                    "precio": "11.780178",
                    "serie": "P",
                    "titulos": "122246"
                }, {
                    "emisora": "GUB-1",
                    "precio": "11.23061",
                    "serie": "P",
                    "titulos": "45841"
                }, {
                    "emisora": "B+BRV",
                    "precio": "31.338748",
                    "serie": "P",
                    "titulos": "189624"
                }, {
                    "emisora": "BMERIND",
                    "precio": "31.501035",
                    "serie": "P",
                    "titulos": "4148"
                }, {
                    "emisora": "BMERINF",
                    "precio": "32.447836",
                    "serie": "P",
                    "titulos": "4813"
                }, {
                    "emisora": "BMERPAT",
                    "precio": "31.501035",
                    "serie": "P",
                    "titulos": "5854"
                }];

            var mes_actual =[
                {
                    "emisora": "BBVAEUR",
                    "precio": "30.243083",
                    "serie": "P",
                    "titulos": "3871"
                }, {
                    "emisora": "BMERLIQ",
                    "precio": "31.743643",
                    "serie": "P",
                    "titulos": "398"
                }, {
                    "emisora": "DCP-1",
                    "precio": "11.780178",
                    "serie": "P",
                    "titulos": "122246"
                }, {
                    "emisora": "GUB-1",
                    "precio": "11.23061",
                    "serie": "P",
                    "titulos": "45841"
                }, {
                    "emisora": "B+BRV",
                    "precio": "31.338748",
                    "serie": "P",
                    "titulos": "189624"
                }, {
                    "emisora": "BMERIND",
                    "precio": "31.501035",
                    "serie": "P",
                    "titulos": "4148"
                }, {
                    "emisora": "BMERINF",
                    "precio": "32.447836",
                    "serie": "P",
                    "titulos": "4813"
                }, {
                    "emisora": "BMERPAT",
                    "precio": "31.501035",
                    "serie": "P",
                    "titulos": "5854"
                }, {
                    "emisora": "AMX",
                    "precio": "16.94",
                    "serie": "L",
                    "titulos": "1600"
                }, {
                    "emisora": "ASUR",
                    "precio": "110.82",
                    "serie": "B",
                    "titulos": "7000"
                }, {
                    "emisora": "BBVA",
                    "precio": "97.93",
                    "serie": "*",
                    "titulos": "150000"
                }, {
                    "emisora": "CEMEX",
                    "precio": "9.75",
                    "serie": "CPO",
                    "titulos": "52000"
                }, {
                    "emisora": "FEMSA",
                    "precio": "111.19",
                    "serie": "UBD",
                    "titulos": "4500"
                }, {
                    "emisora": "GEO",
                    "precio": "13.36",
                    "serie": "B",
                    "titulos": "1500"
                }, {
                    "emisora": "GFNORTE",
                    "precio": "67.27",
                    "serie": "O",
                    "titulos": "10000"
                }, {
                    "emisora": "BACOMER",
                    "precio": "99.99922",
                    "serie": "06",
                    "titulos": "18000"
                }, {
                    "emisora": "WALMEX",
                    "precio": "35.19",
                    "serie": "V",
                    "titulos": "10128"
                }, {
                    "emisora": "TLEVISA",
                    "precio": "60.74",
                    "serie": "CPO",
                    "titulos": "2500"
                }, {
                    "emisora": "PE#OLES",
                    "precio": "627.14",
                    "serie": "*",
                    "titulos": "126724"
                }, {
                    "emisora": "NAFTRAC",
                    "precio": "35.71769",
                    "serie": "02",
                    "titulos": "7900"
                }, {
                    "emisora": "NAFTRAC",
                    "precio": "26.52",
                    "serie": "06",
                    "titulos": "18000"
                }, {
                    "emisora": "LAB",
                    "precio": "99.99922",
                    "serie": "B",
                    "titulos": "15000"
                }, {
                    "emisora": "ICH",
                    "precio": "72.58",
                    "serie": "B",
                    "titulos": "100000"
                }, {
                    "emisora": "GMEXICO",
                    "precio": "39.12",
                    "serie": "B",
                    "titulos": "12031"
                }];

            switch (params.data1) {
                case 'M':
                    //Pendientes
                    response.answer.inversiones = mes_actual;
                    break;
                case 'D':
                    //Todas
                    response.answer.inversiones = dia_actual                    
                    break;
                default:
                    alert('BANCOMER.Server.BCOM - Consulta Cartera Detalle Inversion: Params.data1 incorrecto' + params.data1);
                    break;
            }

            response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
            
            this._callbackRandomly(this.operationCode.ConsultaCarteraDetalleInversion, 'Consulta Cartera Detalle Inversion', params, response, callback);
        },

        _enviarComprobante: function (params, callback) {

            var response = {
                "status": {
                    "ok": true
                },
                "answer": {}
            };

            response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
            
            this._callbackRandomly(this.operationCode.EnvioComprobante, 'Enviar Comprobante', params, response, callback);
        },

        _guardarComprobante: function (params, callback) {

            var response = {
                "status": {
                    "ok": true
                },
                "answer": {}
            };

            response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');

            this._callbackRandomly(this.operationCode.GuardadoComprobante, 'Guardar Comprobante', params, response, callback);
        },

        _solicitarCambioContrato: function (params, callback) {
            var response = {
                "status": {
                    "ok": true
                },
                "answer": {}
            };

            alert('SIMULACION DE SERVIDOR: Cambiando de cuenta ...');

            response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
            response.answer.cuentaNueva = '1';

            this._callbackRandomly(this.operationCode.SolicitaCambioContrato, 'Solicitar Cambio Contrato', params, response, callback);
        },

        _aperturaFichero: function (params, callback) {

            var response = {
                "status": {
                    "ok": true
                },
                "answer": {}
            };

            if (params && params.data1) {
                alert('BANCOMER.Server.BCOM - SIMULACION DE SERVIDOR - AperturaFichero: ' + params.data1);                    
            }else {
                alert('BANCOMER.Server.BCOM - SIMULACION DE SERVIDOR - AperturaFichero: No url file');                        
            }

            response.answer.id_testigo = (params.id_testigo ? params.id_testigo : '');
            
            this._callbackRandomly(this.operationCode.AperturaFichero, 'Apertura Fichero', params, response, callback);
        },

        _irAPosicionGlobal: function () {
            alert('BANCOMER.Server.BCOM - SIMULACION DE SERVIDOR: Ir a posición global ...');
        },

        _transferenciaEfectivo: function () {
            alert('BANCOMER.Server.BCOM - SIMULACION DE SERVIDOR: Transferencia efectivo ...');
        }
    };

    BANCOMER.Server = BANCOMER.Server || {};
    BANCOMER.Server.BCOM = bcomServer;

}());