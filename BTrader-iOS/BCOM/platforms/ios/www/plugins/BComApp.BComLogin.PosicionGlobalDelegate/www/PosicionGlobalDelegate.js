cordova.define("BComApp.BComLogin.PosicionGlobalDelegate.PosicionGlobalDelegate", function(require, exports, module) {

// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

function PosicionGlobalDelegate() {
        
    // Accounts constants
    this.MXP_ACCOUNTS_KEY = 'mxpAccounts';
    this.USD_ACCOUNTS_KEY = 'usdAccounts';
    this.CREDIT_CARDS_KEY = 'creditCards';
    this.PAT_ACCOUNTS_KEY = 'patAccounts';

    // Accounts variables
    this.accountsArray = new Array();
    this.numeroCuentas = 0;
               
    // Content Frame BaseViewController
    this.context;
               
    this.cuentasPesosTotal=0;
    this.cuentasDolaresTotal=0;
    this.cuentasCreditosTotal=0;
    this.cuentasPatrimonialesTotal = 0;
               
    this.cuentasPatrimoniales = [];
    this.primeraPeticion = true;
}

PosicionGlobalDelegate.prototype = {
               
    constructor: PosicionGlobalDelegate,
    
    initializePage: function () {
        context = document.getElementById('contentFrame').contentWindow.document;
               
        parent.document.getElementById("imgMenu").style.visibility="hidden";
        
        if (((typeof sessionStorage.lstCtasPatFull != "undefined") && (sessionStorage.lstCtasPatFull != null)) && ((typeof JSON.parse(sessionStorage.lstCtasPatFull) != "undefined") || (JSON.parse(sessionStorage.lstCtasPatFull) != null) || (JSON.parse(sessionStorage.lstCtasPatFull) != ""))) {
               this.cuentasPatrimoniales = JSON.parse(sessionStorage.lstCtasPatFull);
        }
               
        this.mostrarPromociones();
               
        this.mostrarPGCuentasCliente();
        
        sessionStorage.isLogin = 1;
    },

    mostrarPGCuentasCliente: function () {
        var jsonResponse = sessionStorage.jsonPosicion;
        var jsonObject = JSON.parse(jsonResponse);
        
        var cuentasMXP = jsonObject.posicionGlobal.asuntos.lista_cuentas_mxp;
        var jsonCuentasUSD = jsonObject.posicionGlobal.asuntos.lista_cuentas_usd;
        var cuentasUSD = [];
        for (var i in jsonCuentasUSD) {
               if (jsonCuentasUSD[i].plaza == "MEXICO") {
                   cuentasUSD.push(jsonCuentasUSD[i]);
               }
        }
               
        var cuentasTDC = jsonObject.posicionGlobal.asuntos.lista_tarjetascredito;
               
        var cuentasPat = [];
        var jsonCuentasPat;
               
        if (((typeof sessionStorage.lstCtasPatFull != "undefined") && (sessionStorage.lstCtasPatFull != null)) && ((typeof JSON.parse(sessionStorage.lstCtasPatFull) != "undefined") || (JSON.parse(sessionStorage.lstCtasPatFull) != null) || (JSON.parse(sessionStorage.lstCtasPatFull) != ""))) {
            jsonCuentasPat = JSON.parse(sessionStorage.lstCtasPatFull);
        }
               
        if ((typeof jsonCuentasPat != "undefined") && (jsonCuentasPat != null)) {
            for (var i in jsonCuentasPat) {
                if ((typeof jsonCuentasPat[i] != "undefined") && (jsonCuentasPat[i] != null)) {
                   cuentasPat.push(jsonCuentasPat[i]);
                }
            }
        }
        
        this.numeroCuentas = 0;
               
        var existenCuentasMXP = false;
        var existenCuentasUSD = false;
        var existenCuentasTDC = false;
        var existenCuentasPat = false;
               
        if (!isNullOrUndefined(cuentasMXP)) {
            if (cuentasMXP.length > 0) {
                existenCuentasMXP = true;
            }
        }

        if (!isNullOrUndefined(cuentasUSD)) {
            if (cuentasUSD.length > 0) {
                existenCuentasUSD = true;
            }
        }

        if (!isNullOrUndefined(cuentasTDC)) {
            if (cuentasTDC.length > 0) {
                existenCuentasTDC = true;
            }
        }
               
        if (!isNullOrUndefined(cuentasPat)) {
            if (cuentasPat.length > 0) {
               existenCuentasPat = true;
            }
        }

        if (existenCuentasMXP) { this.numeroCuentas++; }
        if (existenCuentasUSD) { this.numeroCuentas++; }
        if (existenCuentasTDC) { this.numeroCuentas++; }
        if (existenCuentasPat) { this.numeroCuentas++; }
        
        if (existenCuentasMXP) {
            this.showTipoCuenta(cuentasMXP, constants.CUENTA_PESOS);
            this.showCuentas(cuentasMXP, 'article-Pesos', 'div-Pesos');
             
            context.getElementById("cuentas-pesos").setAttribute('style', '');
          

               cuentasPesosTotal=cuentasMXP.length;
  
               
        }
               
        if (existenCuentasUSD) {
            this.showTipoCuenta(cuentasUSD, constants.CUENTA_DOLARES);
            this.showCuentas(cuentasUSD, 'article-Dolares', 'div-Dolares');
            context.getElementById("cuentas-dolares").setAttribute('style', '');
             //  alert("show dolares");
               cuentasDolaresTotal=cuentasUSD.length;
               //alert("llega a total dolares");

               
               
        } else {
            context.getElementById("cuentas-dolares").style.display = "none";
        }
        
        if (existenCuentasTDC) {
            this.showTipoCuenta(cuentasTDC, constants.TARJETA_CREDITO);

            cuentasCreditosTotal=cuentasTDC.length;
           
            this.showCuentas(cuentasTDC, 'article-Credito', 'div-Credito');
            

            context.getElementById("cuentas-credito").setAttribute('style', '');
        }
               
        if (existenCuentasPat) {
               
            this.showTipoCuenta(cuentasPat, constants.CUENTAS_PATRIMONIALES);
               
            cuentasPatrimonialesTotal = cuentasPat.length;
               
            this.showCuentas(cuentasPat, 'article-Patrimonial', 'div-Patrimonial');
               
            context.getElementById("cuentas-patrimonial").setAttribute('style', '');
               
        }
        
        this.accountsArray[this.MXP_ACCOUNTS_KEY] = false;
        this.accountsArray[this.USD_ACCOUNTS_KEY] = false;
        this.accountsArray[this.CREDIT_CARDS_KEY] = false;
        this.accountsArray[this.PAT_ACCOUNTS_KEY] = false;
        
             if (existenCuentasMXP) this.accountsArray[this.MXP_ACCOUNTS_KEY] = true;
        else if (existenCuentasUSD) this.accountsArray[this.USD_ACCOUNTS_KEY] = true;
        else if (existenCuentasTDC) this.accountsArray[this.CREDIT_CARDS_KEY] = true;
        else if (existenCuentasPat) this.accountsArray[this.PAT_ACCOUNTS_KEY] = true;
        
        this.updateAccounts();
    },
               
    showTipoCuenta: function(cuenta, tipo) {
        var amountTotal = 0.0;
        var contenedor_cuenta;
        var info_cantidad;
        var info_cuenta;
               
        var iFrame = document.getElementById('contentFrame');
        var contenido = iFrame.contentWindow.document || iFrame.contentDocument;
               
        if (tipo == "Cuentas en Pesos") {
            info_cantidad = contenido.getElementById("totalAmmountMXP");
        } else if (tipo == "Cuentas en D&oacutelares") {
            info_cantidad = contenido.getElementById("totalAmmountUSD");
        }
          
        if ((tipo != "Cuentas Patrimoniales") && (tipo != "Tarjeta de Cr&eacutedito")){
               
            for (var i in cuenta) {
                if (tipo == constants.TARJETA_CREDITO) { amountTotal = amountTotal + parseFloat(cuenta[i].saldofecha); }
                else { amountTotal = amountTotal + parseFloat(cuenta[i].saldo_disponible); }
            }
        
            info_cantidad.innerHTML = accounting.formatMoney(amountTotal, "$ ", 2, ",", ".");
        
        }
    },
    
    showCuentas: function(cuentas, article, checkbox) {
        var article_tipo = context.getElementById(article);
        var class_table = 'datos-tabla3';
               
        if (article == 'article-Credito') { class_table = 'datos-tabla4'; }

        if (this.numeroCuentas == 4) { article_tipo.setAttribute('class', 'xs-small'); }
        else if (this.numeroCuentas == 3) { article_tipo.setAttribute('class', 'small'); }
        else if (this.numeroCuentas == 2) { article_tipo.setAttribute('class', 'medium'); }
        else { article_tipo.setAttribute('class', 'large'); }
        
        if (cuentas.length > 0) {
            var tabla_cuenta;
            
            tabla_cuenta = context.createElement('table');
            tabla_cuenta.setAttribute('width', '100%');
            tabla_cuenta.setAttribute('cellpadding', '0');
            tabla_cuenta.setAttribute('cellspacing', '0');
            tabla_cuenta.setAttribute('class', class_table);
        
            for (var i in cuentas) {
                var alias  = cuentas[i].alias;
                var cuenta = cuentas[i].numero;
                var idContrato = cuentas[i].id;
                var accountName = '';
               
                var tipo;
                if (article == 'article-Dolares') { tipo = cuentas[i].plaza; }
                else if (article == 'article-Patrimonial') { tipo = "&nbsp;"; }
                else { tipo  = cuentas[i].tipo }

                switch (tipo) {
                    case "AH": tipo = "Cuen/ Sin cheq";     break;
                    case "CH": tipo = "Cuen/ Con cheq";     break;
                    case "LI": tipo = "Libretón";           break;
                    case "TC": tipo = "TDC";                break;
                    default: tipo = tipo;                   break;
                }
               
                var saldo;
                if (article == 'article-Credito') { saldo = cuentas[i].saldofecha; }
                else { saldo  = cuentas[i].saldo_disponible; }
               
                if (isNullOrUndefined(alias) || alias == '') {
                    //accountName = maskAccountNumber(cuenta);
                    accountName = cuenta.toString().substring(cuenta.length-10);

                }
                else {
                    accountName = alias;
                }
               
                if (article != 'article-Patrimonial') {
                    tabla_cuenta.innerHTML +=
                        '<tr style="border-bottom:1px solid #E6E6E6">' +
                            '<td>' + accountName + '</td>' +
                            '<td>' + tipo + '</td>' +
                            '<td>' + accounting.formatMoney(saldo, "$ ", 2, ",", ".") + '</td></tr>';
                } else {
                    tabla_cuenta.innerHTML +=
                        '<tr style="border-bottom:1px solid #E6E6E6">' +
                        '<td>' + accountName + '</td>' +
                        '<td>' + tipo + '</td>' +
                        '<td class="saldo-patrimonial" data-idContrato="' + idContrato +'"></td></tr>';
                }
               
                article_tipo.appendChild(tabla_cuenta);
            }
        }
    },
               
    onlyOneChecked: function (checked) {
        if (this.numeroCuentas == 4) {
            context.getElementById('div-Pesos').checked  = false;
            context.getElementById('div-Dolares').checked = false;
            context.getElementById('div-Credito').checked = false;
            context.getElementById('div-Patrimonial').checked = false;

            context.getElementById(checked).checked = true;

        }
    },

    selectAccountsTable: function (key) {
             if (1 === this.numeroCuentas) { return; }
        else if (2 === this.numeroCuentas) { this.accountsArray[key] = !this.accountsArray[key]; }
        else if (3 === this.numeroCuentas) {
            if (this.accountsArray[key]) { this.accountsArray[key] = !this.accountsArray[key]; }
            else {
                this.accountsArray[this.MXP_ACCOUNTS_KEY] = false;
                this.accountsArray[this.USD_ACCOUNTS_KEY] = false;
                this.accountsArray[this.CREDIT_CARDS_KEY] = false;

                this.accountsArray[key] = true;
            }
        } else if (4 == this.numeroCuentas) {
            if (this.accountsArray[key]) { this.accountsArray[key] = !this.accountsArray[key]; }
            else {
               this.accountsArray[this.MXP_ACCOUNTS_KEY] = false;
               this.accountsArray[this.USD_ACCOUNTS_KEY] = false;
               this.accountsArray[this.CREDIT_CARDS_KEY] = false;
               this.accountsArray[this.PAT_ACCOUNTS_KEY] = false;
               
               this.accountsArray[key] = true;
            }
        }

        this.updateAccounts();
    },

    updateAccounts: function() {
        this.updateAccountClasses(this.MXP_ACCOUNTS_KEY);
        this.updateAccountClasses(this.USD_ACCOUNTS_KEY);
        this.updateAccountClasses(this.CREDIT_CARDS_KEY);
        this.updateAccountClasses(this.PAT_ACCOUNTS_KEY);
    },

    updateAccountClasses: function (key) {
        var element = $('#' + key, context);
               
        var altura=0;
               
  
        
        element.removeClass('checked');
        
        if (this.accountsArray[key]) {
               
               element.addClass('checked');
               
               if (key=='mxpAccounts'){
  
                context.getElementById("cuentas-dolares").style.height="100%";
                context.getElementById("cuentas-credito").style.height="100%";
                context.getElementById("cuentas-patrimonial").style.height="100%";
              
               
               }else if (key=='usdAccounts'){
         
               context.getElementById("cuentas-pesos").style.height="100%";
               context.getElementById("cuentas-credito").style.height="100%";
               context.getElementById("cuentas-patrimonial").style.height="100%";
               
               } else if (key == 'patAccounts') {
               
               context.getElementById("cuentas-pesos").style.height="100%";
               context.getElementById("cuentas-credito").style.height="100%";
               context.getElementById("cuentas-dolares").style.height="100%";
               
               }else{
               
               context.getElementById("cuentas-pesos").style.height="100%";
               context.getElementById("cuentas-dolares").style.height="100%";
               context.getElementById("cuentas-patrimonial").style.height="100%";

               }
                              
               this.accountsArray[this.MXP_ACCOUNTS_KEY] = false;
               this.accountsArray[this.USD_ACCOUNTS_KEY] = false;
               this.accountsArray[this.CREDIT_CARDS_KEY] = false;
               this.accountsArray[this.PAT_ACCOUNTS_KEY] = false;
               
        } else  {
         
               
               if (key=='mxpAccounts'){
               context.getElementById("cuentas-pesos").style.height="100%";

               }
               
               if (key=='usdAccounts'){
               context.getElementById("cuentas-dolares").style.height="100%";

               }
               
               if (key=='creditCards'){
               context.getElementById("cuentas-credito").style.height="100%";

               }
               
               if (key=='patAccounts'){
               context.getElementById("cuentas-patrimonial").style.height="100%";
               
               }
               
        }

               
    },
               
    updatePosicionGlobal: function () {
        showLoadingLayer();
        exec(
            function (jsonResponse) { hideLoadingLayer(); posicionGlobalDelegate.savePosicionGlobal(jsonResponse); },
            function (errorMessage) { hideLoadingLayer(); posicionGlobalDelegate.savePosicionGlobal(errorMessage); },
            "PosicionGlobalDelegate",
            "updatePosicionGlobal",
            [sessionStorage.username, sessionStorage.userCardNumber]
        );
    },
               
    savePosicionGlobal: function (jsonResponse) {
        var jsonObject = JSON.parse(jsonResponse);
               
        if (!isNullOrUndefined(jsonObject.posicionGlobal)) {
            sessionStorage.jsonPosicion   = jsonResponse;
            sessionStorage.username       = jsonObject.posicionGlobal.usuario_usr;  // WAS user.
            sessionStorage.userCardNumber = jsonObject.posicionGlobal.acceso_usr;   // User card number.
        }
               
        mostrarMBComInicio('', '');
    },
               
    mostrarPromociones: function () {

        var iFrame = document.getElementById('contentFrame');
        var contenido = iFrame.contentWindow.document || iFrame.contentDocument;
        var sliderPromos = contenido.getElementById('contenedor-slider-promos');
        var promociones;
        var promocionesAMostrar = 0;
               
        if ((typeof sessionStorage.jsonPromociones != "undefined") && (sessionStorage.jsonPromociones != null)) {
            promociones = JSON.parse(sessionStorage.jsonPromociones);
        }
               
        if ((typeof promociones != "undefined") && (promociones != null) && (promociones != "")) {
               
            for (var i in promociones) {
               
               console.log('promoción', promociones[i]);
               if ((typeof promociones[i] != "undefined") && (promociones[i] != null) && (promociones[i] != "")) {
                   var idPromo = promociones[i].idPromocion.substring(0,4);
                   var clase = null;
                   var promoDesc = null;
             
                   if ((idPromo == "0130") || (idPromo == "0060") || (idPromo == "0377")) {
               
                       promocionesAMostrar++;
               
                       switch (idPromo) {
                            case "0130":
                                    clase = "promoIlc";
                                    promoDesc = "Incremento Línea de Crédito";
                                break;
                            case "0060":
                                    clase = "promoPpi";
                                    promoDesc = "Préstamo de hasta&nbsp;";
                                break;
                            case "0377":
                                    clase = "promoEfi";
                                    promoDesc = "Disposición Efectivo Inmediato";
                                break;
                       }
                       
                       var tempDiv = contenido.createElement('div');
                       
                       tempDiv.className = clase;
                       tempDiv.id = promociones[i].idPromocion;
                       
                       var tempDivDesc = contenido.createElement('div');
                       tempDivDesc.className = "promo-desc";
                       tempDivDesc.innerHTML = promoDesc;
                       
                       var tempDivImporte = contenido.createElement('div');
                       tempDivImporte.className = "promo-importe";
                       var tempImp = promociones[i].importe.toString();
                       if (tempImp.indexOf(".") == -1) tempImp += ".00";
                       
                       var textImporte = "<span>" + formatearImporte(desformatearImporte(tempImp), desformatearImporte(tempImp).length) + "</span>";
                       
                       if (clase != "promoPpi") textImporte = "hasta " + textImporte;
                       
                       tempDivImporte.innerHTML = textImporte;
                       
                       tempDiv.appendChild(tempDivDesc);
                       tempDiv.appendChild(tempDivImporte);
                       sliderPromos.appendChild(tempDiv);
                   }
               }
            }
            
            if (promocionesAMostrar > 0) {
               contenido.getElementById("contenedorPromociones").style.display = "block";
            }
        }
    },
               
    getCuentasTraspasoEfectivo: function () {
        console.log("Recuperando Cuentas para Traspaso de Efectivo ...");
               
        if (this.primeraPeticion) {
            sessionStorage.cuentasTraspasoEfectivo = "{\"listaCuentas\":[";
            parent.showLoadingLayer();
            this.primeraPeticion = false;
        }
            
        if (sessionStorage.existenDatosCuentasTE === "false") {
            if (this.cuentasPatrimoniales.length > 0) {
               
                var cuenta = this.cuentasPatrimoniales[0];
                this.cuentasPatrimoniales.splice(0,1);
               
                if ((typeof cuenta != "undefined") && (cuenta != null) && (cuenta != "")) {
                   
                   exec(
                        function (jsonResponse) {
                        
                            var lista = JSON.parse(jsonResponse).respuesta.listaCuentas;
                        
                            for (var i in lista) {
                        
                                var posicionPT = lista[i].idCuenta.indexOf('PT');
                                var jsonLista = JSON.stringify(lista[i]);
                                if ( posicionPT == 0) {
                        
                                    sessionStorage.cuentasTraspasoEfectivo += jsonLista + ",";
                                }
                        
                            }
                        
                            posicionGlobalDelegate.getCuentasTraspasoEfectivo();
                        },
                        function (errorMessage) {
                            sessionStorage.cuentasTraspasoEfectivo = "";
                            this.primeraPeticion = true;
                            sessionStorage.existenDatosCuentasTE = false;
                            parent.hideLoadingLayer();
                            console.log('Error', errorMessage);
                        },
                        "PosicionGlobalDelegate",
                        "getCuentasTraspasoEfectivo",
                        [sessionStorage.username, sessionStorage.userCardNumber, cuenta.id]
                   );
                }
               
            } else {
                sessionStorage.existenDatosCuentasTE = true;
                sessionStorage.cuentasTraspasoEfectivo = sessionStorage.cuentasTraspasoEfectivo.slice(0,-1);
                sessionStorage.cuentasTraspasoEfectivo += "]}";
                posicionGlobalDelegate.muestraListadoPatrimonial();
            }
        } else {
            posicionGlobalDelegate.muestraListadoPatrimonial();
        }
    },
               
    muestraListadoPatrimonial: function () {

        var listado = JSON.parse(sessionStorage.cuentasTraspasoEfectivo).listaCuentas;
        console.log('listado', listado);
               
        var iFrame = document.getElementById('contentFrame');
        var contenido = iFrame.contentWindow.document || iFrame.contentDocument;
        var tdImportes = contenido.getElementsByClassName('saldo-patrimonial');

        for (var i in listado) {
            tdImportes[i].innerHTML = formatearImporte(desformatearImporte(listado[i].saldo), desformatearImporte(listado[i].saldo).length);
        }
               
        parent.hideLoadingLayer();
               
        posicionGlobalDelegate.selectAccountsTable('patAccounts');
    },
    
    promosBack: function (element, event) {
        console.log('promosBack - element', element);
        console.log('promosBack - event', event);
    },
               
    promosForward: function (element, event) {
        console.log('promosForward - element', element);
        console.log('promosForward - event', event);
    }
    
}

var posicionGlobalDelegate = new PosicionGlobalDelegate();
module.exports = posicionGlobalDelegate;

// __________ Termina Phongegap __________

});
