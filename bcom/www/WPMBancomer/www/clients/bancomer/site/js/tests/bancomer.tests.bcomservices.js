;
(function() {
	var bcomServicesTests = {

		currentTime: moment(),

		operationCode: {
			SimulaCompraVentaInversiones: "2",
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

		_printConsoleLog: function(code, begin) {
			var prefix = (begin === 1) ? '[Inicio] ' : '[Fin] ';
			var msg = '';
			switch (code) {

				case this.operationCode.SimulaCompraVentaInversiones:
					msg = 'Operación ' + code + ' (Simula Compra/Venta)';
					break;

				case this.operationCode.CompraVentaInversiones:
					msg = 'Operación ' + code + ' (Compra/Venta)';
					break;

				case this.operationCode.ConsultaEstatusDeCapitales:
					msg = 'Operación ' + code + ' (Consulta Estatus Capitales)';
					break;

				case this.operationCode.ConsultaDetalleOrdenCapitales:
					msg = 'Operación ' + code + ' (Consulta Detalle Orden Capitales)';
					break;

				case this.operationCode.CancelacionOrdenCapitales:
					msg = 'Operación ' + code + ' (Cancelación Orden Capitales)';
					break;

				case this.operationCode.ConsultaCarteraDetalleInversion:
					msg = 'Operación ' + code + ' (Consulta Cartera Detalle Inversión)';
					break;

				case this.operationCode.EnvioComprobante:
					msg = 'Operación ' + code + ' (Envio Mail Comprobante)';
					break;

				case this.operationCode.GuardadoComprobante:
					msg = 'Operación ' + code + ' (Guardado Comprobante)';
					break;

				case this.operationCode.SolicitaCambioContrato:
					msg = 'Operación ' + code + ' (Solicita Cambio Contrato)';
					break;

				case this.operationCode.SolicitaCierreApp:
					msg = 'Operación ' + code + ' (Solicita Cierre App)';
					break;
					
				case this.operationCode.AperturaFichero:
					msg = 'Operación ' + code + ' (Apertura  Fichero)';
					break;
				case this.operationCode.IrAPosicionGlobal:
					msg = 'Operación ' + code + ' (Ir a posición global)';
					break;
				case this.operationCode.TransferenciaEfectivo:
					msg = 'Operación ' + code + ' (Transferencia efectivo)';
					break;
			}

			console.log(prefix + msg);
		},

		_launchTestSimulaCompraventaInversiones: function() {
			var params = {
				"data1": "HCITY",
				"data2": "*",
				"data3": "100.45",
				"data4": "Compra",
				"data5": "2000",
				"data6": "20140123",
				"id_testigo": "11"
			};

			this._printConsoleLog('2', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('2', params, function(response) {
				console.log('[Response]', JSON.stringify(response));
			});

			this._printConsoleLog('2', 2);
		},

		_launchTestCompraventaInversiones: function() {

			var params = {
				"data1": "GMODELO",
				"data2": "C",
				"data3": "0",
				"data4": "Compra",
				"data5": "1000",
				"data6": "20120126",
				"id_testigo": "11"
			};

			this._printConsoleLog('3', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('3', params, function(response) {
				console.log('[Response]', JSON.stringify(response));
			});

			this._printConsoleLog('3', 2);
		},

		_launchTest_ConsultaEstatusDeCapitales: function() {

			var params = {
				"data1": "1",
				"id_testigo": "11"
			};

			this._printConsoleLog('4', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('4', params, function(response) {
				console.log('[Response]', JSON.stringify(response));
			});
			this._printConsoleLog('4', 2);
		},

		_launchTest_ConsultaDetalleOrdenCapitales: function() {

			var params = {
				"data1": "BCM",
				"data2": "500001",
				"data3": "20120126",
				"id_testigo": "11"
			};

			this._printConsoleLog('5', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('5', params, function(response) {
				console.log('[Response]', JSON.stringify(response));
			});
			this._printConsoleLog('5', 2);
		},

		_launchTest_CancelacionOrdenCapitales: function() {

			var params = {
				"data1": "BCM",
				"data2": "500001",
				"data3": "20120126",
				"data4": "145700",
				"data5": "",
				"id_testigo": "11"
			};

			this._printConsoleLog('6', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('6', params, function(response) {
				console.log('[Response]', JSON.stringify(response));
			});
			this._printConsoleLog('6', 2);
		},

		_launchTest_ConsultaCarteraDetalleInversion: function() {

			var params = {
				"data1": "D",
				"id_testigo": "9"
			};

			this._printConsoleLog('7', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('7', params, function(response) {
				console.log('[Response]', JSON.stringify(response));
			});
			this._printConsoleLog('7', 2);
		},

		_launchTest_EnvioMailComprobante: function() {

			var params = {
				"emisora": "TERRA 13",
				"operacion": "Compra",
				"importe": "86680",
				"precio": "21.4600",
				"titulos": "12",
				"fechaVigencia": "20120126",
				"comision": "433.4",
				"iva": "69.34",
				"porcentajeComision": "0.5",
				"folioInternet": "500002",
				"fechaOperacion": "20120126095515",
				"accionComprobante": "1",
				"id_testigo": "11"
			};

			this._printConsoleLog('8', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('8', params, function(response) {
				console.log('[Response]', JSON.stringify(response));
			});
			this._printConsoleLog('8', 2);
		},

		_launchTest_GuardadoComprobante: function() {

			var params = {
				"emisora": "TERRA 13",
				"operacion": "Compra",
				"importe": "86680",
				"precio": "21.4600",
				"titulos": "12",
				"fechaVigencia": "20120126",
				"comision": "433.4",
				"iva": "69.34",
				"porcentajeComision": "0.5",
				"folioInternet": "500002",
				"fechaOperacion": "20120126095515",
				"accionComprobante": "1",
				"id_testigo": "11"
			};

			this._printConsoleLog('9', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('9', params, function(response) {
				console.log('[Response]', JSON.stringify(response));
			});
			this._printConsoleLog('9', 2);
		},

		_launchTest_SolicitaCambioContrato: function() {
			var params = {
				"id_testigo": "11"
			};

			this._printConsoleLog('10', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('10', params, function(response) {
				console.log('[Response]', JSON.stringify(response));
			});
			this._printConsoleLog('10', 2);
		},

		_launchTest_SolicitaCierreApp: function() {
			var params = {
				
			};

			this._printConsoleLog('11', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('11', params);
			console.log('[Response]', 'No procede');
			this._printConsoleLog('11', 2);
		},

		_launchTest_AperturaFichero: function() {

			var params = {
				"data1": "http://ifbdpsb.infobolsa.es/pdfs/BANCOMER/ANALISIS/MERC-REPORTES/00011496_00011496.PDF",
				"id_testigo": "11"
			};

			this._printConsoleLog('12', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('12', params, function(response) {
				console.log('[Response]', JSON.stringify(response));
			});
			this._printConsoleLog('12', 2);
		},

		_launchTest_IrAPosicionGlobal: function() {

			var params = {
				"id_testigo": "11"
			};

			this._printConsoleLog('13', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('13', params);
			console.log('[Response]', 'No procede');
			this._printConsoleLog('13', 2);
		},

		_launchTest_TransferenciaEfectiva: function() {

			var params = {
				"id_testigo": "11"
			};

			this._printConsoleLog('14', 1);
			console.log('[Request]', JSON.stringify(params));
			BANCOMER.Services.BCOM.invocaServicioDesdeInfoBolsa('14', params);
			console.log('[Response]', 'No procede');
			this._printConsoleLog('14', 2);
		},

		_simulateStreaming: function(mv, time) {
			var last = '1';
			var D420 = Math.floor((Math.random() * Number('5000'))).toString();
			var D250 = (Math.floor(Math.random() * 11) - 10).toString();
			var trend = Math.floor((Math.random() * 2)).toString();
			var data = {"type":"RT","MV":mv,"C":"","V":[{"D":"D3002","V": ('H' + time)},{"D":"D420","V":D420},{"D":"D240","V":"76.2"},{"D":"D250","V":D250},{"D":"D70","V": time},{"D":"D710","V":"74454"},{"D":"D642","V":trend}],"T":"16"};
			IFB.Services.StreamingCallbacks.realTime(data, IFB.Services.Streaming.CONNECTION.actualFrame);
		},

		_launchTest_Streaming: function (mv){
			var self = this; 


			var idInterval =  setInterval(function () {
				time = self.currentTime.format('HHmmss');
				self._simulateStreaming(mv, time);
				self.currentTime = self.currentTime.add('minutes',1);
			}, 1000);

			setTimeout(function () {
				clearTimeout(idInterval);
				IFB.Services.Streaming.CONNECTION.changeFrame();
				IFB.Services.Streaming.CONNECTION.trigger('RealTime_Reconnected', IFB.Services.Streaming.CONNECTION);
			}, 10000);

		},

		launch: function() {

			this._launchTestSimulaCompraventaInversiones();

			this._launchTestCompraventaInversiones();

			this._launchTest_ConsultaEstatusDeCapitales();

			this._launchTest_ConsultaDetalleOrdenCapitales();

			this._launchTest_CancelacionOrdenCapitales();

			this._launchTest_ConsultaCarteraDetalleInversion();

			this._launchTest_EnvioMailComprobante();

			this._launchTest_GuardadoComprobante();

			this._launchTest_SolicitaCambioContrato();

			this._launchTest_SolicitaCierreApp();

			this._launchTest_AperturaFichero();

			this._launchTest_IrAPosicionGlobal();

			this._launchTest_TransferenciaEfectiva();
		}
	};

	BANCOMER.Tests = BANCOMER.Tests || {};
	BANCOMER.Tests.BCOMServices = BANCOMER.Tests.BCOMServices || {};
	BANCOMER.Tests.BCOMServices = bcomServicesTests;

}());