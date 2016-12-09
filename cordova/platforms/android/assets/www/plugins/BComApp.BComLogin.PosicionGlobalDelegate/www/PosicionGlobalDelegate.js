cordova.define("BComApp.BComLogin.PosicionGlobalDelegate.PosicionGlobalDelegate", function(require, exports, module) {

// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

function PosicionGlobalDelegate() {
    // Advertise constants.
    this.ADVERTISE_MAX_INDEX = 3;
    this.ADVERTISE_MIN_INDEX = 1;
    this.ADVERTISE_TIMEOUT_MILIS = 10000;   // 10 Seconds.

    // Advertise variables
    this.advertiseTimeout = null;
    this.imageIndex = 1;
    
    // Accounts constants
    this.MXP_ACCOUNTS_KEY = 'mxpAccounts';
    this.USD_ACCOUNTS_KEY = 'usdAccounts';
    this.CREDIT_CARDS_KEY = 'creditCards';

    // Accounts variables
    this.accountsArray = new Array();
    this.numeroCuentas = 0;
               
    // Content Frame BaseViewController
    this.context;
}

PosicionGlobalDelegate.prototype = {
               
    constructor: PosicionGlobalDelegate,
    
    initializePage: function () {
        context = document.getElementById('contentFrame').contentWindow.document;
        
               
        this.resetAdvertiseTimeout();
        this.mostrarPGCuentasCliente();
        
        sessionStorage.isLogin = 1;
      /*  
        // Probando BACK-Button
        document.addEventListener("backbutton", onBackKeyDown, false);
        function onBackKeyDown(e) {
          e.preventDefault();
          alert("Boton fisico  volver PULSADO");
        }
        */
    },

    moveToPreviousImage: function () {
        if (this.ADVERTISE_MIN_INDEX === this.imageIndex) { this.imageIndex = this.ADVERTISE_MAX_INDEX; }
        else { this.imageIndex--; }

        this.updateAdvertiseImage();
        this.resetAdvertiseTimeout();
    },

    moveToNextImage: function () {
        if (this.ADVERTISE_MAX_INDEX === this.imageIndex) { this.imageIndex = this.ADVERTISE_MIN_INDEX; }
        else { this.imageIndex++; }
        
        this.updateAdvertiseImage();
        this.resetAdvertiseTimeout();
    },

    selectAdvertiseImage: function (index) {
        this.imageIndex = index;
        this.updateAdvertiseImage();
        this.resetAdvertiseTimeout();
    },

    updateAdvertiseImage: function () {
        $("#img-publicidad", context).removeClass();
        $("#img-publicidad", context).addClass('posicionglobal-publicidad-image' + this.imageIndex);

        $('#bullet-container', context).children('div').removeClass('selected');
        $('#bullet-container', context).children('div:nth-child(' + this.imageIndex + ')').addClass('selected');
    },

    onAdvertiseImageClick: function () {
        alert('Advertise image ' + this.imageIndex + ' clicked.');
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
        
        this.numeroCuentas = 0;

        if (!isNullOrUndefined(cuentasMXP)) { this.numeroCuentas++; }
        if (!isNullOrUndefined(cuentasUSD) && cuentasUSD.length != 0) { this.numeroCuentas++; }
        if (!isNullOrUndefined(cuentasTDC)) { this.numeroCuentas++; }
        
        if (!isNullOrUndefined(cuentasMXP)) {
            this.showTipoCuenta(cuentasMXP, constants.CUENTA_PESOS);
            this.showCuentas(cuentasMXP, 'article-Pesos', 'div-Pesos');
            context.getElementById("cuentas-pesos").setAttribute('style', '');
        }
        
        if (!isNullOrUndefined(cuentasUSD) && cuentasUSD.length != 0) {
            this.showTipoCuenta(cuentasUSD, constants.CUENTA_DOLARES);
            this.showCuentas(cuentasUSD, 'article-Dolares', 'div-Dolares');
            context.getElementById("cuentas-dolares").setAttribute('style', '');
        }
        
        if (!isNullOrUndefined(cuentasTDC)) {
            this.showTipoCuenta(cuentasTDC, constants.TARJETA_CREDITO);
            this.showCuentas(cuentasTDC, 'article-Credito', 'div-Credito');
            context.getElementById("cuentas-credito").setAttribute('style', '');
        }
        
        this.accountsArray[this.MXP_ACCOUNTS_KEY] = false;
        this.accountsArray[this.USD_ACCOUNTS_KEY] = false;
        this.accountsArray[this.CREDIT_CARDS_KEY] = false;
        
             if (!isNullOrUndefined(cuentasMXP)) this.accountsArray[this.MXP_ACCOUNTS_KEY] = true;
        else if (!isNullOrUndefined(cuentasUSD)) this.accountsArray[this.USD_ACCOUNTS_KEY] = true;
        else if (!isNullOrUndefined(cuentasTDC)) this.accountsArray[this.CREDIT_CARDS_KEY] = true;
        
        this.updateAccounts();
    },
               
    showTipoCuenta: function(cuenta, tipo) {
        var amountTotal = 0.0;
        var contenedor_cuenta;
        var info_cantidad;
        var info_cuenta;
        
        for (var i in cuenta) {
            if (tipo == constants.TARJETA_CREDITO) { amountTotal = amountTotal + parseFloat(cuenta[i].saldocorte); }
            else { amountTotal = amountTotal + parseFloat(cuenta[i].saldo_disponible); }
        }
        
        var info_tipo = context.getElementById("posicionglobal-info-cuentas");
        
        contenedor_cuenta = document.createElement('div');
        contenedor_cuenta.setAttribute('class', 'posicionglobal-contenedor-cuenta');
        
        info_cuenta = document.createElement('div');
        info_cuenta.setAttribute('class', 'posicionglobal-texto-cuenta');
        info_cuenta.innerHTML = tipo;
        
        info_cantidad = document.createElement('div');
        if (tipo == constants.TARJETA_CREDITO) { info_cantidad.setAttribute('class', 'posicionglobal-texto-cantidad rosa'); }
        else { info_cantidad.setAttribute('class', 'posicionglobal-texto-cantidad'); }
        info_cantidad.innerHTML = accounting.formatMoney(amountTotal, "$ ", 2, ",", ".");
        //info_cantidad.innerHTML = '$ 999,999,999,999,999.99';
        
        contenedor_cuenta.appendChild(info_cuenta);
        contenedor_cuenta.appendChild(info_cantidad);
        info_tipo.appendChild(contenedor_cuenta);
        info_tipo.innerHTML += '<br>';
    },
    
    showCuentas: function(cuentas, article, checkbox) {
        var article_tipo = context.getElementById(article);
        var class_table = 'datos-tabla3';
               
        if (article == 'article-Credito') { class_table = 'datos-tabla4'; }

        if (this.numeroCuentas == 3) { article_tipo.setAttribute('class', 'small'); }
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
                var accountName = '';
               
                var tipo;
                if (article == 'article-Dolares') { tipo = cuentas[i].plaza; }
                else { tipo  = cuentas[i].tipo }

                switch (tipo) {
	                case "AH": tipo = "Cuen/ Sin cheq";     break;
	                case "CH": tipo = "Cuen/ Con cheq";     break;
	                case "LI": tipo = "Libret\xf3n";           break;
	                case "TC": tipo = "TDC"; break;
	               // case "TC": tipo = "Tarjeta de Cr\xe9dito"; break;
	            }
                
                var saldo;
                if (article == 'article-Credito') { saldo = cuentas[i].saldocorte; }
                else { saldo  = cuentas[i].saldo_disponible; }
               
                if (isNullOrUndefined(alias) || alias == '') { accountName = maskAccountNumber(cuenta); }
                else { accountName = alias; }
               
                tabla_cuenta.innerHTML +=
                    '<tr style="border-bottom:1px solid #E6E6E6">' +
                        '<td>' + accountName +
                            '<span>' + tipo + '</span>' +
                        '</td>' +
                        '<td>' + accounting.formatMoney(saldo, "$ ", 2, ",", ".") + '</td>' +
                    '</tr>';
                
                article_tipo.appendChild(tabla_cuenta);
            }
        }
    },
               
    onlyOneChecked: function (checked) {
        if (this.numeroCuentas == 3) {
            context.getElementById('div-Pesos').checked  = false;
            context.getElementById('div-Dolares').checked = false;
            context.getElementById('div-Credito').checked = false;

            context.getElementById(checked).checked = true;
        }
    },

    resetAdvertiseTimeout: function () {
        if (null != this.advertiseTimeout) { clearTimeout(this.advertiseTimeout); }

        this.advertiseTimeout = setTimeout(function () { posicionGlobalDelegate.moveToNextImage(); }, this.ADVERTISE_TIMEOUT_MILIS);
    },

    selectAccountsTable: function (key) {
             if (1 === this.numeroCuentas) { return; }
      //  else if (2 === this.numeroCuentas) { this.accountsArray[key] = !this.accountsArray[key]; }
        else if (3 === this.numeroCuentas || 2 === this.numeroCuentas) {
            if (this.accountsArray[key]) { this.accountsArray[key] = !this.accountsArray[key]; }
            else {
                this.accountsArray[this.MXP_ACCOUNTS_KEY] = false;
                this.accountsArray[this.USD_ACCOUNTS_KEY] = false;
                this.accountsArray[this.CREDIT_CARDS_KEY] = false;

                this.accountsArray[key] = true;
            }
        }

        this.updateAccounts();
    },

    updateAccounts: function() {
        this.updateAccountClasses(this.MXP_ACCOUNTS_KEY);
        this.updateAccountClasses(this.USD_ACCOUNTS_KEY);
        this.updateAccountClasses(this.CREDIT_CARDS_KEY);
    },

    updateAccountClasses: function (key) {
        var element = $('#' + key, context);
        
        element.removeClass('checked');
        
        if (this.accountsArray[key]) { element.addClass('checked'); }
    },
               
    updatePosicionGlobal: function () {
        parent.showLoadingLayer();
        exec(
            function (jsonResponse) { parent.hideLoadingLayer(); posicionGlobalDelegate.savePosicionGlobal(jsonResponse); },
            function (errorMessage) { parent.hideLoadingLayer(); posicionGlobalDelegate.savePosicionGlobal(errorMessage); },
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
    }
    
}

var posicionGlobalDelegate = new PosicionGlobalDelegate();
module.exports = posicionGlobalDelegate;

// __________ Termina Phongegap __________

});
