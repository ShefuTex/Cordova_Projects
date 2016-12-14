;
(function () {
    var bcomServices = {
        request: {},
        CALLBACK_TIMEOUT: 10000,
        idTestigo: 0,

        OperationCode: {
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

        getIdTestigo: function () {
            bcomServices.idTestigo++;
            return bcomServices.idTestigo.toString();
        },

        setTimeout: function (code, params, callback) {
            var self = bcomServices;
            return setTimeout(function () {
                var idTestigo = params.id_testigo;
                if (self.request[idTestigo]) {
                    delete self.request[idTestigo];                       
                    var responseNOK = {
                        "status": {
                            "ok": false,
                            "reason": "BCOM service timeout"
                        },
                        "answer": {}
                    };
                    responseNOK.answer.id_testigo = idTestigo;
                    console.log('-> WEBTRADER - invocaServicioDesdeInfoBolsa - response timeOut', code, JSON.stringify(params), JSON.stringify(responseNOK));
                    callback(responseNOK);
                }
            }, self.CALLBACK_TIMEOUT);
        },

        invocaServicioDesdeInfoBolsa: function (code, params, callback) {
            var self = bcomServices;
            var idTestigo = self.getIdTestigo();
            var idTimeOut;

            params.id_testigo = idTestigo;

            if (callback){
                idTimeOut = self.setTimeout(code, params, callback);
                self.request[idTestigo] = idTimeOut;
            }

            console.log('-> WEBTRADER - invocaServicioDesdeInfoBolsa - request', code, JSON.stringify(params));
            BANCOMER.Server.BCOM.invocaServicioDesdeInfoBolsa(code, params, function (response) {
                self._callback(code, params, callback, response);
            });
        },

        _callback: function (code, params, callback, response) {
            var idTestigo = response.answer.id_testigo;
            params.id_testigo = idTestigo; 
 
            if (bcomServices.request[idTestigo]){
                clearInterval(bcomServices.request[idTestigo]);
                delete bcomServices.request[idTestigo];
                console.log('-> WEBTRADER - invocaServicioDesdeInfoBolsa - response', code, JSON.stringify(params), JSON.stringify(response));
                if (callback) {
                    callback(response);
                }    
            } else {
                console.log('-> WEBTRADER - invocaServicioDesdeInfoBolsa - response after timeOut (discarded)', code, JSON.stringify(params), JSON.stringify(response));
            }
                         
        }
    };

    BANCOMER.Services = BANCOMER.Services || {};
    BANCOMER.Services.BCOM = BANCOMER.Services.BCOM || {};
    BANCOMER.Services.BCOM = bcomServices;
}());