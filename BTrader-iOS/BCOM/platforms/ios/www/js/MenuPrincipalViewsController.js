var viewsController = new BComViewsController();

function MenuPrincipalViewsController() { }

function mostrarMBComInicio(opcion, paso) {
	viewsController.mostrarPantallaPosicionG(opcion, paso);
}

function mostrarMBComWebTrader(opcion, paso) {
	viewsController.mostrarPantallaWebtrader(opcion, paso);
}

function mostrarMBComMisCuentas(opcion, paso) {
 	viewsController.mostrarPantallaMisCuenta(opcion, paso);
}

function mostrarMBComInvertir(opcion, paso) {
    console.log("opcion: "+ opcion + " paso: "+paso);
	if (opcion) {
	    $('#nav-bajo-invertir').children('a').removeClass('nb-selec');
	    $('#nav-bajo-invertir').children('a.' + opcion).addClass('nb-selec');
        
        if ('nb-comprar' == opcion) {
			if(paso) {
				     if ('1' == paso) { viewsController.mostrarPantallaInvertirCompra1(); }
				else if ('2' == paso) { viewsController.mostrarPantallaInvertirCompra2(); }
				else if ('3' == paso) { viewsController.mostrarPantallaInvertirCompra3(); }
				else if ('4' == paso) { viewsController.mostrarPantallaInvertirCompraRegresar(); }
			}
        } else if ('nb-vender' == opcion) {
            if (paso) {
				     if ('1' == paso) { viewsController.mostrarPantallaInvertirVenta1(); }
				else if ('2' == paso) { viewsController.mostrarPantallaInvertirVenta2(); }
				else if ('3' == paso) { viewsController.mostrarPantallaInvertirVenta3(); }
				else if ('4' == paso) { viewsController.mostrarPantallaInvertirVentaRegresar(); }
			}
        } else if ('nb-consultar' == opcion) {
            if (paso) {
				     if ('1' == paso) { viewsController.mostrarPantallaInvertirConsulta1(); }
				else if ('2' == paso) { viewsController.mostrarPantallaInvertirConsulta2(); }
				else if ('3' == paso) { viewsController.mostrarPantallaInvertirConsulta3(); }
			}
        } 
    }
}

function mostrarMBComTranferir(opcion, paso) {
        showLoadingLayer();
        window.setTimeout(function () {hideLoadingLayer();}, 2000);
        viewsController.mostrarPantallaTranferirMisCuentas(opcion, paso);
	
}

function mostrarMBComAdministrar(opcion, paso) {
    showLoadingLayer();
	 viewsController.mostrarPantallaAdministrarServicios(opcion, paso);
}

function displayBottomMenuOther(){
    document.getElementById('nav-cont').style.display="";
    document.getElementById('nav-transferir').style.display="none";
}

var menuPrincipalViewsController = new MenuPrincipalViewsController();
//module.exports = menuPrincipalViewsController;