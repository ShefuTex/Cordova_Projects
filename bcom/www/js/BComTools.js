var currentWidth = 0;
var needToReload = false;

function isIOS() {
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
}

function getOSVersion() {
    var userAgent = navigator.userAgent;
    var indice = userAgent.indexOf('OS ');
    var so = userAgent.substring(indice + 3, indice + 4);
    var version = parseInt(so);

    return version;
}

function loadDeviceCSS() {
    // Resolucion
	var filePath = getQueryVariable('resolution');
	

    if ('' != filePath) {
        filePath = 'css/' + filePath + '.css';
        needToReload = true;
    } else {
        filePath = selectAppropiateResolution();
    }

    // Reload
    if (needToReload) {
        document.getElementById("mainCss").removeAttribute("href");
        document.getElementById("mainCss").setAttribute("href", filePath);
    }

    // Ajuste iOS
    if (isIOS() && getOSVersion() >= 7) {
        document.body.style.marginTop = "20px";
        marTop = document.body.style.marginTop;
        document.body.style.fontFamily = "helvetica neue";
    }
    else if (isIOS()) { document.body.style.fontFamily = "helvetica"; }
}

function selectAppropiateResolution() {
	var filePath = '';
	var minWidth = 0;
    
	if (0 != currentWidth) {
		needToReload = false;
		return '';
	}
	var altura = screen.height*window.devicePixelRatio;
	var anchura = screen.width*window.devicePixelRatio;
	var total = anchura + altura;
	
	currentWidth = (0 != window.innerWidth) ? window.innerWidth : window.parent.window.innerWidth;
	minWidth = currentWidth;
	var currentHeight = 0;
	currentHeight = (0 != window.innerHeight) ? window.innerHeight : window.parent.window.innerHeight;
	if (null === currentHeight)
	    currentHeight = 0;

    if (isIOS()) {
		if (minWidth == 1024) {
			filePath = 'css/normal.css';
			needToReload = true;
		} else if (minWidth == 2048) {
			filePath = 'css/retina.css';
			needToReload = true;
		} else {
		    filePath = 'css/normal.css';
			needToReload = true;
		}
	} else {
		if(minWidth < 1280){
			var botonEnviar = document.getElementById('entrar');
			botonEnviar.disabled = true;
			//alert("Por el momento esta resolución no esta habilitada ");
			parent.loginDelegate.showAlert("Aviso\n", "Por el momento esta resolución no esta habilitada.", constants.ALERT_BUTTON_OK);
			//parent.loginDelegate.showAlert("Aviso\n", "Por el momento esta resolución no esta habilitada.", constants.ALERT_BUTTON_OK);
			//this.showAlert("Aviso\n", constants.RESOLUCION, constants.ALERT_BUTTON_OK);
		}
        if (currentHeight <= 601 && minWidth == 962 ) {
        	if(currentHeight <= 553){
                filePath = 'css/962x553.css';
                needToReload = true;	
        	}else {
                filePath = 'css/962x601.css';
                needToReload = true;
        		}
        } else if (currentHeight <= 600 && minWidth == 1024 ) {
             if (currentHeight <= 552){
                 filePath = 'css/1024x552.css';
                 needToReload = true;
             }else{
                 filePath = 'css/1024x600.css';
                 needToReload = true; 
             }

        } else if (currentHeight <= 800) {
        	if(currentHeight <= 752){
                filePath = 'css/1280x752.css';
                needToReload = true;
        	}else{
            filePath = 'css/1280x800.css';
            needToReload = true;
             } 
        } else if (currentHeight <= 1200) {
            filePath = 'css/1920x1200.css';
            needToReload = true;
        } else {
            filePath = 'css/1024x600.css';
            needToReload = true;
        }
	}
	
	return filePath;
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    
	for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    
	return ('');
}

function showScreenResolutions() { }

function showParentScreenResolutions(context) { }

function formatDate(date) {
    var dia, mes, anio;
   
    if (date.length > 0) {
        dia  = date.substring(0,2);
        mes  = date.substring(3,5);
        anio = date.substring(6,10);
        
             if (parseInt(mes) == 1)  { mes = 'Ene'; }
        else if (parseInt(mes) == 2)  { mes = 'Feb'; }
        else if (parseInt(mes) == 3)  { mes = 'Mar'; }
        else if (parseInt(mes) == 4)  { mes = 'Abr'; }
        else if (parseInt(mes) == 5)  { mes = 'May'; }
        else if (parseInt(mes) == 6)  { mes = 'Jun'; }
        else if (parseInt(mes) == 7)  { mes = 'Jul'; }
        else if (parseInt(mes) == 8)  { mes = 'Ago'; }
        else if (parseInt(mes) == 9)  { mes = 'Sep'; }
        else if (parseInt(mes) == 10) { mes = 'Oct'; }
        else if (parseInt(mes) == 11) { mes = 'Nov'; }
        else if (parseInt(mes) == 12) { mes = 'Dic'; }
        
        return dia + '/' + mes + '/' + anio;
    }
    
    return '';
}

function formatTime(time) {
    var hora, min, ampm = '';
    
    if (time.length > 0) {
        hora = time.substring(0,2);
        min  = time.substring(3,5);
        
        if (parseInt(hora) == 24) {
            hora = '00';
            ampm = 'AM';
        } else if (parseInt(hora) == 12) {
            ampm = 'PM'
        } else if (parseInt(hora) > 12) {
            ampm = 'PM';
            hora = (parseInt(hora) - 12) + '';
        } else {
            ampm = 'AM';
        }
        
        return hora + ':' + min + ' ' + ampm;
    }
    
    return '';
}

var swipeInitialized = false;

function initializeSwipeEvents() {
    var supportTouch    = true;
    var scrollEvent     = "touchmove scroll";
    var touchStartEvent = supportTouch ? "touchstart" : "mousedown";
    var touchStopEvent  = supportTouch ? "touchend" : "mouseup";
    var touchMoveEvent  = supportTouch ? "touchmove" : "mousemove";

    if (swipeInitialized) { return; }

    $.event.special.swipeleftright = { setup: 
		function () {
            var thisObject = this;
            var $this = $(thisObject);

            $this.bind(touchStartEvent, 
				function (event) {
                	var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
                		start = { time: (new Date).getTime(), coords: [data.pageX, data.pageY], origin: $(event.target) }, stop;

	                function moveHandler(event) {
		                if (!start) { return; }

	                    var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
							stop = { time: (new Date).getTime(), coords: [data.pageX, data.pageY] };

	                    // prevent scrolling
	                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) { /*event.preventDefault();*/ }
					}

	                $this.bind(touchMoveEvent, moveHandler).one(touchStopEvent, 
						function (event) {
							$this.unbind(touchMoveEvent, moveHandler);

                    		if (start && stop) {
		                        if (stop.time - start.time < 500 && Math.abs(start.coords[0] - stop.coords[0]) > 15 && Math.abs(start.coords[1] - stop.coords[1]) < 20) {
			                        start.origin.trigger("swipeleftright").trigger(start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight");
					            }	
							}

                    		start = stop = undefined;
                		}
					);
				}
			);
        }
    };

    $.event.special.swipeupdown = { setup:
		function () {
            var thisObject = this;
            var $this = $(thisObject);

            $this.bind(touchStartEvent, 
				function (event) {
					var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
						start = { time: (new Date).getTime(), coords: [data.pageX, data.pageY], origin: $(event.target) }, stop;
						
                	function moveHandler(event) {
	                    if (!start) { return; }

    	                var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
							stop = { time: (new Date).getTime(), coords: [data.pageX, data.pageY] };

    	                // prevent scrolling
	                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) { /*event.preventDefault();*/ }
                	}

	                $this.bind(touchMoveEvent, moveHandler).one(touchStopEvent, 
						function (event) {
    	                	$this.unbind(touchMoveEvent, moveHandler);

							if (start && stop) {
								if (stop.time - start.time < 500 && Math.abs(start.coords[1] - stop.coords[1]) > 15 && Math.abs(start.coords[0] - stop.coords[0]) < 20) {
									start.origin.trigger("swipeupdown").trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
								}
							}
		
							start = stop = undefined;
						}
					);
				}
			);
        }
    };

    $.each( { swipedown: "swipeupdown", swipeup: "swipeupdown", swiperight: "swipeleftright", swipeleft: "swipeleftright" }, 
		function (event, sourceEvent) {
			$.event.special[event] = { setup: function () { $(this).bind(sourceEvent, $.noop); } 
		};
    });

    swipeInitialized = true;
}

function bindSwipeEvent(swipeDirection, elementToBind, callbackFunction) {
    if ('swipeup' != swipeDirection && 'swipedown' != swipeDirection && 'swipeleft' != swipeDirection && 'swiperight' != swipeDirection) {
        alert('Swipe in ' + swipeDirection + ' direction is not supported.');
        return;
    }
    
    initializeSwipeEvents();

    $('#' + elementToBind).on(swipeDirection, callbackFunction);
}

// Unused.
//function validateOnlyNumbers(idName, maxLength){
//	var inputNumeric = document.getElementById(idName);
//	var numero = String(inputNumeric.value);
	
//	if (!/^[0-9]+$/.test(numero))  { inputNumeric.value = numero.substring(0, numero.length-1); }
//	if (numero.length > maxLength) { inputNumeric.value = numero.substring(0, maxLength); }
//}

/* Validador para cantidades de dinero */
function AmmountValidator() {

}

AmmountValidator.prototype = {
    constructor: AmmountValidator,

    validateInput: function (elementId) {
        var keyCode = event.keyCode;
        var nextChar = String.fromCharCode(keyCode);
        var futureValue = document.getElementById(elementId).value + nextChar;
        
        if (48 == keyCode && 1 == futureValue.length) { // Avoid 0 as first digit.
            return;
        } if (46 == keyCode && -1 == futureValue.substring(0, futureValue.length - 1).indexOf('.')) { // Insert a period only if the string does not have one.
            //document.getElementById(elementId).value = futureValue;
        } else { // Test the future result.
            var regex = /^\d+(\.\d{1,2})?$/;

            if (regex.test(futureValue))
                document.getElementById(elementId).value = futureValue;
        }
    }
}

/* Validador para numero de cuenta */
function AccountNumberValidator() {
    this.inputBackup = '';
    this.timeOut = null;
}

AccountNumberValidator.prototype = {
    constructor: AccountNumberValidator,

    displayKeyInfo: function (eventName) { },

    isDigit: function (keyCode) {
        if (47 < keyCode && keyCode < 58)
            return true;
        else
            return false;
    },

    isReturnKey: function (keyCode) {
        return (8 == keyCode);
    },

    hideAccountNumber: function (elementId, maxLength, callerEvent) {
       	var me = this;
    	if(isIOS()){
    	var keyCode = event.keyCode;
        

        if ('onkeyup' == callerEvent && this.isReturnKey(keyCode) && this.popDigit(elementId)) {
            if (null != this.timeOut)
                clearTimeout(this.timeOut);

            document.getElementById(elementId).value = this.getMaskedText(elementId);
        } else if ('onkeypress' == callerEvent && this.isDigit(keyCode) && this.pushDigit(elementId, keyCode, maxLength)) {
            if (null != this.timeOut)
                clearTimeout(this.timeOut);

            document.getElementById(elementId).value = this.getPreMaskedText(elementId);

            this.timeOut = setTimeout(function () {
                document.getElementById(elementId).value = me.getMaskedText(elementId);
            }, 800);
        } else {
            return false;
        }
        }else{
        	var valor = event.srcElement.value.slice(-1);
        	var elemento = document.getElementById(elementId);
        	if(valor>=0 && valor <=9){
        	if (null != this.timeOut)
                clearTimeout(this.timeOut);
        	
        	elemento.value = this.getPreMaskedText(elementId);
            this.timeOut = setTimeout(function () {
            	elemento.value = me.getMaskedText(elementId);
            }, 800);
        } else {
            return false;
        }
        }
        
    },

    pushDigit: function (elementId, keyCode, maxLength) {
        if (this.inputBackup.length == maxLength) {
            return false;
        } else {
            var char = String.fromCharCode(keyCode);
            this.inputBackup += ('' + char);
            return true;
        }
    },

    popDigit: function (elementId) {
        if (0 == this.inputBackup.length) {
            return false;
        } else {
            this.inputBackup = this.inputBackup.substring(0, this.inputBackup.length - 1);
            return true;
        }
    },

    getMaskedText: function (elementId) {
        var result = '';
        var index = 0;

        while (index < this.inputBackup.length && index < 11) {
            result += '*';
            index++;
        }

        if (this.inputBackup.length > 11) {
            result += this.inputBackup.substring(11, this.inputBackup.length);
        }

        return result;
    },
    
    getText: function (elementId){
    	return this.inputBackup;
    },

    getPreMaskedText: function (elementId) {
        var result = '';
        if(isIOS()){
        if (this.inputBackup.length <= 11) {
            for (var index = 0; index < (this.inputBackup.length - 1) ; index++) {
                result += '*';
            }
            result += this.inputBackup.substring(this.inputBackup.length - 1, this.inputBackup.length);
        } else {
            result = '***********' + this.inputBackup.substring(11, this.inputBackup.length);
        }
    }else{
    	if (this.inputBackup.length <= 11) {
            for (var index = 0; index <= (this.inputBackup.length) ; index++) {
                result += '*';
            }
            result += this.inputBackup.substring(this.inputBackup.length - 1, this.inputBackup.length);
        } else {
            result = '***********' + this.inputBackup.substring(11, this.inputBackup.length);
        
    }}

        return result;
    },

    getBackupData: function () {
    	if(isIOS()){
        return this.inputBackup;
    	}else
    		return document.getElementById("inputTarjeta").value;
    },

    setData: function (accountNumber) {
        this.inputBackup = accountNumber;
    }
}

/* Validador para numeros de contrasenia y tokens */
function NumericInputValidator() {
    this.inputBackup = '';
    this.timeOut = null;
    this.isAlphanumeric = false;
}

NumericInputValidator.prototype = {
    constructor: NumericInputValidator,

    displayKeyInfo: function (eventName) { },

    isDigit: function (keyCode) {
        return (47 < keyCode && keyCode < 58);
    },

    isAlpha: function (keyCode) {
        return ((96 < keyCode && keyCode < 123) || (64 < keyCode && keyCode < 91));
    },

    isValidKey: function (keyCode) {
        if (this.isAlphanumeric) {
            return (this.isDigit(keyCode) || this.isAlpha(keyCode));
        } else {
            return this.isDigit(keyCode);
        }
    },

    isReturnKey: function (keyCode) {
        return (8 == keyCode);
    },

    hideInputNumber: function (elementId, maxLength, callerEvent) {
        var keyCode = event.keyCode;
        var me = this;

        if ('onkeyup' == callerEvent && this.isReturnKey(keyCode) && this.popDigit(elementId)) {
            document.getElementById(elementId).value = this.getMaskedText(elementId);
        } else if ('onkeypress' == callerEvent && this.isValidKey(keyCode) && this.pushDigit(elementId, keyCode, maxLength)) {
            document.getElementById(elementId).value = this.getMaskedText(elementId);
        } else {
            return false;
        }
    },
    
    hideInputNumberNew: function (elementId, maxLength, callerEvent, unHideElementId) {
        var keyCode = event.keyCode;
        var me = this;
        var charTipped = String.fromCharCode(keyCode);
        if ('onkeyup' == callerEvent && this.isReturnKey(keyCode) && this.popDigit(elementId)) {
            document.getElementById(elementId).value = this.getMaskedText(elementId);
        } else if ('onkeypress' == callerEvent && this.isValidKey(keyCode) && this.pushDigit(elementId, keyCode, maxLength)) {
            document.getElementById(elementId).value = this.getMaskedText(elementId);
        } else {
            return false;
        }
        document.getElementById(unHideElementId).value = document.getElementById(unHideElementId).value + charTipped;
    },
    
    pushDigit: function (elementId, keyCode, maxLength) {
        if (this.inputBackup.length == maxLength) {
            return false;
        } else {
            var char = String.fromCharCode(keyCode);
            this.inputBackup += ('' + char);
            return true;
        }
    },

    popDigit: function (elementId) {
        if (0 == this.inputBackup.length) {
            return false;
        } else {
            this.inputBackup = this.inputBackup.substring(0, this.inputBackup.length - 1);
            return true;
        }
    },

    getMaskedText: function (elementId) {
        var result = '';
        var index = 0;

        while (index < this.inputBackup.length && index < 11) {
            result += '*';
            index++;
        }

        if (this.inputBackup.length > 11) {
            result += this.inputBackup.substring(11, this.inputBackup.length);
        }

        return result;
    },

    getBackupData: function () {
    	if(isIOS()){
        return this.inputBackup;
    	}
    	else return document.getElementById("password").value;
    },
    
    getBackupDataToken: function () {
    	if(isIOS()){
        return this.inputBackup;
    	}
    	else return document.getElementById("inputToken").value;
    },

    setData: function (data) {
        this.inputBackup = data;
    }
}

/* Valida que solo se ingeresen d�gitos. */
function OnlyNumbersValidator() {

}

OnlyNumbersValidator.prototype = {
    constructor: OnlyNumbersValidator,
    
    /* Valida solo la entrada de numeros. */
    validate: function () {
        var keyCode = event.keyCode;
        if (keyCode < 48 || keyCode > 57)
            return false;
    },

    /* Valida la entrada de numeros y la longitud del valor. */
    validateWithLength: function (source, maxLength) {
        var keyCode = event.keyCode;
        var actualLength = source.value.length;
        if (keyCode < 47 || keyCode > 57 || actualLength >= maxLength)
            return false;
    }
}

function isNullOrUndefined(param) {
    
    return (undefined === param || null === param);
    
}

function obtieneParametros(){
    var url = document.location.href;
    if(url.indexOf('?')>0)
    {
        var cadenaVariables = url.split('?')[1];
        var array = cadenaVariables.split('&');
        var get = {};

        for(var i = 0, l = array.length; i < l; i++){
            var tmp = array[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}

function maskAccountNumber (accountNumber) {
    var result = '';
    
    accountNumber = '' +  + accountNumber;
    
    if (accountNumber.length > 5) {
        result = '*****' + accountNumber.substring(accountNumber.length - 5 , accountNumber.length);
    }
    
    return result;
}


function showLoadingLayer() {
    var loadingIndicator = document.createElement('div');
    var loadingImg = document.createElement('div');

    loadingIndicator.setAttribute('id', 'loadingLayer');
    loadingIndicator.setAttribute('class', 'baseviewcontroller-loading-layer');
    loadingImg.setAttribute('class', 'baseviewcontroller-loading-spinner');
    
    loadingIndicator.appendChild(loadingImg);
    if (document.body != undefined) {
        document.body.appendChild(loadingIndicator);
    } else if (parent.document.body != undefined) {
        parent.document.body.appendChild(loadingIndicator);
    }
    
    
    if (document.getElementById('loadingLayer') != undefined) {
        document.getElementById('loadingLayer').style.visibility="visible"; 
    } else if (parent.document.getElementById('loadingLayer') != undefined) {
        parent.document.getElementById('loadingLayer').style.visibility="visible";
    }
    

}

function hideLoadingLayer() {
    var loadingLayer = document.getElementById('loadingLayer');
    if (undefined !== loadingLayer && null !== loadingLayer) {
        loadingLayer.style.visibility="hidden";
        document.body.removeChild(loadingLayer);
    }
    
    loadingLayer = parent.document.getElementById('loadingLayer');
    if (undefined !== loadingLayer && null !== loadingLayer) {
        loadingLayer.style.visibility="hidden";
        parent.document.body.removeChild(loadingLayer);
    }
    
    
}


/** Formatea el importe de acuerdo al formato utilizado para las peticiones (es decir, con los dígitos y el punto decimal) */
function formatearImporteParaPeticion(importeFormateado) {
    var importeSinFormatear = "";
    
    // En este bucle elimino todo lo que no sean números ni el punto
    for (var i = 0; i < importeFormateado.length; i++) {
        var asciiCode = importeFormateado.charAt(i).charCodeAt(0);
        
        if ((asciiCode > 47 && asciiCode < 58) || (asciiCode == 46)) {
            importeSinFormatear = importeSinFormatear + importeFormateado.charAt(i);
        }
    }
    
    return importeSinFormatear;
}

/** Quita de un importe todo lo que no sean dígitos (normalmente comas, punto y símbolo de la moneda) */
function desformatearImporte(importeFormateado) {
    var importeSinFormatear = "";
    
    // En este bucle elimino todo lo que no sean números
    for (var i = 0; i < importeFormateado.length; i++) {
        var asciiCode = importeFormateado.charAt(i).charCodeAt(0);
        
        if (asciiCode > 47 && asciiCode < 58) {
            importeSinFormatear = importeSinFormatear + importeFormateado.charAt(i);
        }
    }
    
    // En este bucle elimino todos los ceros a la izquierda que pueda haber
    while ((importeSinFormatear.length > 1) && (importeSinFormatear.charAt(0) == '0')) {
        importeSinFormatear = importeSinFormatear.substring(1);
    }
    
    return importeSinFormatear;
}

/** Da al importe el formato $X,XXX,XXX,XXX.XX */
function formatearImporte(importeDeEntrada, longitudEfectiva) {
    var importeFormateado = importeDeEntrada;
    var moneda = '$';
    
    if (longitudEfectiva == 0) {
        importeFormateado = moneda + '0.00';
    } else if (longitudEfectiva == 1) {
        importeFormateado = moneda + '0.0' + importeDeEntrada;
    } else if (longitudEfectiva == 2) {
        importeFormateado = moneda + '0.' + importeDeEntrada;
    } else {
        var numComas = parseInt((longitudEfectiva - 3) / 3);
        var indiceInicio = 0;
        
        importeFormateado = moneda;
        for (var i = 0; i < numComas; i++) {
            importeFormateado = importeFormateado + importeDeEntrada.substring(indiceInicio, longitudEfectiva - 3*(numComas-i) - 2) + ',';
            indiceInicio = longitudEfectiva - 3*(numComas-i) - 2;
        }
        
        importeFormateado = importeFormateado + importeDeEntrada.substring(indiceInicio, longitudEfectiva-2) + '.' + importeDeEntrada.substring(longitudEfectiva-2);
    }
    
    return importeFormateado;
}

/** Da formato al importe que se debe mostrar cuando se ha pulsado la tecla de borrado */
function formatearImporteAlBorrar(e, importeHTML) {
    var esValido;
    
    key = e.keyCode ? e.keyCode : e.which;
    
    if (key == 8) {
        esValido = true;
        
        var importeDeEntrada = importeHTML.value;
        
        importeDeEntrada = desformatearImporte(importeDeEntrada);
        
        var importeFormateado = formatearImporte(importeDeEntrada, importeDeEntrada.length-1);
        
        importeHTML.value = importeFormateado;
        
    } else {
        esValido = false;
    }
    
    return esValido;
}

/** Da formato al importe que se debe mostrar cuando se ha introducido un dígito */
function formatearImporteAlEscribir(e, importeHTML) {
    
    var importeDeEntrada = importeHTML.value;
    var importeValido;
    
    key = e.keyCode ? e.keyCode : e.which;
    importeValido = esImporteValido(key, importeHTML);
    
    if (importeValido) {
        importeDeEntrada = desformatearImporte(importeDeEntrada);
        
        var importeFormateado = formatearImporte(importeDeEntrada, importeDeEntrada.length+1);
        
        importeHTML.value = importeFormateado;
    }
    
    return importeValido;
}

/** Da formato al importe cuando se han borrado todos los dígitos (esta función no conseguía hacerla el método llamado desde onKeyDown) */
function formatearImporteVacio(e, importeHTML) {
    if (importeHTML.value == "$0.0") {
        importeHTML.value = "$0.00";
    }
}

/** Comprueba si se desea introducir un importe válido */
function esImporteValido(key, importe) {
    var esValido;
    
    if (key == 8) {
        esValido = true;
        
    } else if (key > 47 && key < 58) {
        
        if ((importe.value == "") && (key == 48)) {
            esValido = false;
        } else {
            if (desformatearImporte(importe.value).length < 18) {
                // Puedo meter el nuevo dígito
                esValido = true;
            } else {
                // Ya he alcanzado el máximo de dígitos permitidos
                esValido = false;
            }
        }
        
    } else {
        esValido = false;
    }
    
    return esValido;
}




function validateRFC(rfc, benef){
    var beneficiario = removeAccents(benef);
    var resultado = false;
    
    var regexRFC = new RegExp("^[A-Za-z]{4}([0-9]{2})(1[0-2]|0[1-9])([0-3][0-9])([ -]?)([A-Za-z0-9]{3})$");
    resultado = regexRFC.test(rfc);
    
    if (resultado){
        var nombre = beneficiario.split(" ")[0];
        var apellidoPaterno = beneficiario.split(" ")[ (beneficiario.split(" ").length -2) ];
        var apellidoMaterno = beneficiario.split(" ")[ (beneficiario.split(" ").length -1) ];
        
        var validaApellidoPaterno = ((rfc.toLowerCase()).indexOf( apellidoPaterno.substring(0,2).toLowerCase() ) == 0) ;
        var validaApellidoMaterno = ((rfc.toLowerCase().substring(2,3)).indexOf( apellidoMaterno.substring(0,1).toLowerCase() ) == 0) ;
        var validaNombre = ((rfc.toLowerCase().substring(3,4)).indexOf( nombre.substring(0,1).toLowerCase() ) == 0) ;
        
        resultado = validaApellidoPaterno && validaApellidoMaterno && validaNombre;
    }
    
    return resultado;
    
}


function removeAccents(strAccents){
    strAccents = strAccents.split('');
    strAccentsOut = new Array();
    strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = ['A','A','A','A','A','A','a','a','a','a','a','a','O','O','O','O','O','O','O','o','o','o','o','o','o','E','E','E','E','e','e','e','e','e','C','c','D','I','I','I','I','i','i','i','i','U','U','U','U','u','u','u','u','N','n','S','s','Y','y','y','Z','z'];
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut[accents.indexOf(strAccents[y])];
        }
        else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}

var keyTimeOut = null;

function ocultar(valor) {
	//var timeOut = null;
	var numeros = "0123456789";
	var value = valor.value;
	var valores = "";
	var hidden = document.getElementById("inputTarjeta").value;
	
	if (numeros.indexOf(valor.value.charAt(valor.value.length - 1).toString()) != -1 && hidden.length<16) {

		if (valor.value.length-1 == hidden.length) {
			hidden = hidden.concat(valor.value
					.charAt(value.length - 1));
		} else {
			while (valor.value.length < hidden.length && hidden.length!=0) {
				hidden = hidden
						.substr(0, hidden.length - 1);
			}
			if (valor.value.length-1 == hidden.length) 
			hidden = hidden.concat(valor.value
					.charAt(value.length - 1));
		}

		for (var i = 0; i < valor.value.length; i++) {
			if (i < 11) {
				valores += "*";
				
			} else if (i < 16) {
				valores = valores.concat(valor.value
						.charAt(i));
			}
		}
		document.getElementById("inputTarjeta").value = hidden;
		return valor.value = valores;

		
	} else {
		while (valor.value.length < hidden.length && hidden.length!=0) {
			hidden = hidden.substr(0, hidden.length - 1);
		}
		for (var i = 0; i < hidden.length; i++) {
			if (i < 11) {
				valores += "*";
			} else if (i < 16) {
				valores = valores.concat(hidden.charAt(i));
			}
		}
		document.getElementById("inputTarjeta").value = hidden;
		return valor.value = valores;
	}

}

function ocultarPassword(valor2) {
	//var timeOut = null;
	var numeros2 = "0123456789abcdefghijklkmnopqrstuvwxyz";
	var value2 = valor2.value;
	var valores2 = "";
	var hidden2 = document.getElementById("password").value;
	//Length check 
	if (numeros2.indexOf(value2.charAt(value2.length - 1).toString()) != -1 && hidden2.length<10) {

		if (valor2.value.length > hidden2.length ) {
			hidden2 = hidden2.concat(value2
					.charAt(value2.length - 1));
		} else {
			while (valor2.value.length < hidden2.length && hidden2.length!=0) {
				hidden2 = hidden2
						.substr(0, hidden2.length - 1);
			}
			hidden2 = hidden2.concat(value2
					.charAt(value2.length - 1));
		}

		for (var i = 0; i < value2.length; i++) {
			if (i < 10) {
				valores2 += "*";
			}
		}
		valor2.value = valores2;
		document.getElementById("password").value = hidden2;
									
	} else {
		while (valor2.value.length < hidden2.length && hidden2.length!=0) {
			hidden2 = hidden2.substr(0, hidden2.length - 1);
		}
		for (var i = 0; i < hidden2.length; i++) {
			if (i < 10) {
				valores2 += "*";
			} 
		}
		document.getElementById("password").value = hidden2;
		return valor2.value = valores2;
	}

}

function ocultarToken(valor3) {
	var numeros3 = "0123456789";
	var value3 = valor3.value;
	var valores3 = "";
	var hidden3 = document.getElementById("inputToken").value;
	if (numeros3.indexOf(value3.charAt(value3.length - 1).toString()) != -1 && hidden3.length<8) {

		if (valor3.value.length > hidden3.length ) {
			hidden3 = hidden3.concat(value3
					.charAt(value3.length - 1));
		} else {
			while (valor3.value.length < hidden3.length && hidden3.length!=0) {
				hidden3 = hidden3
						.substr(0, hidden3.length - 1);
			}
			hidden3 = hidden3.concat(value3
					.charAt(value3.length - 1));
		}

		for (var i = 0; i < value3.length; i++) {
			if (i < 8) {
				valores3 += "*";
			}
		}
		valor3.value = valores3;
		document.getElementById("inputToken").value = hidden3;
									
	} else {
		while (valor3.value.length < hidden3.length && hidden3.length!=0) {
			hidden3 = hidden3.substr(0, hidden3.length - 1);
		}
		for (var i = 0; i < hidden3.length; i++) {
			if (i < 8) {
				valores3 += "*";
			} 
		}
		document.getElementById("inputToken").value = hidden3;
		return valor3.value = valores3;
	}
}

function getResolution() {
	var filePath = '';
	var minWidth = 0;

	var widthAct = (0 != window.innerWidth) ? window.innerWidth
			: window.parent.window.innerWidth;
	minWidth = widthAct;

	var heightAct = 0;
	heightAct = (0 != window.innerHeight) ? window.innerHeight
			: window.parent.window.innerHeight;
	if (null === heightAct)
		heightAct = 0;

	if (heightAct == 601) {
		filePath = '962x601';
    } else if(heightAct <= 600) {
        filePath = '1024x600';
    } else if (heightAct <= 800) {
		filePath = '1280x800';
	} else if (heightAct <= 1200) {
		filePath = '1920x1200';
	} else {
		filePath = '1024x600';
	}

	return filePath;
}

function formatearImporteCtaBBVA(importeHTML) {

	var importe = importeHTML.value;

	var ffinal = "";
	var cad = "$0.00";

	//  Quitamos los caracteres no permitidos
	for (i = 0; i < importe.length; i++) {
		if (ffinal.length == 0) {
			if (isNumber(importe.charAt(i)) && importe.charAt(i) != "0") {
				ffinal = ffinal + importe.charAt(i);
			}
		} else {
			if (isNumber(importe.charAt(i))) {
				ffinal = ffinal + importe.charAt(i);
			}
		}
	}

	if (ffinal.length == 0) {
		ffinal = cad;
	} else if (ffinal.length == 1) {
		ffinal = "$0.0" + ffinal;
	} else if (ffinal.length == 2) {
		ffinal = "$0." + ffinal;
	} else {
		// AÃ±adimos ',' y '.'
		var decimales = ffinal.substring(ffinal.length - 2, ffinal.length);
		var ent = ffinal.substring(0, ffinal.length - 2);
		var ffinal = "";

		while (ent.length > 3) {
			ffinal = "," + ent.charAt(ent.length - 3)
					+ ent.charAt(ent.length - 2) + ent.charAt(ent.length - 1)
					+ ffinal;
			ent = ent.substring(0, ent.length - 3);
		}

		ffinal = ent + ffinal;
		ffinal = "$" + ffinal + "." + decimales;
	}

	importeHTML.value = ffinal;

	return true;
}

function isNumber(num) {
	var RegExPattern = /^\d{1}$/;
	if ((num.match(RegExPattern))) {
		return true;
	}
	return false;
}

function comprobarInvitado(){
	var tr1 = document.getElementById('tr1');
	var tr2 = document.getElementById('tr2');
	if(sessionStorage.esInvitado=='true'){
		tr1.style.display='none';
		tr2.style.display='none';
	}
}