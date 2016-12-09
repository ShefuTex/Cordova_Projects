
var numeroTarjeta;
var contrasenia;

function leerDatos() {
    	console.log("leerDatos");
        this.numeroTarjeta = document.getElementById("inputTarjeta").value;
        this.contrasenia   = document.getElementById("password").value;
    }

function botonEntrarLogin() {
        	console.log("botonEntrarLogin");
            this.leerDatos();

            if (this.validaDatos()) {
                this.doNetworkOperation();
            }
        }

function validaDatos() {
                  if (this.numeroTarjeta.length < 16) { this.showAlert("Aviso\n", constants.CARD_ERROR_NUMBER, constants.ALERT_BUTTON_OK); }
                else if (this.contrasenia.length < 8)    { this.showAlert("Aviso\n", constants.PASSWORD_ERROR_NUMBER, constants.ALERT_BUTTON_OK); }
                else if (this.numeroTarjeta.length == 16 && this.contrasenia.length >= 8) { return true; }

                return false;
            }
function seleccionDesbloquear() {
        exec(
             function(jsonResponse) { /** Operación Succes **/ },
             function(jsonResponse) { /** Operación Error **/  },
             "LoginDelegate",
             "seleccionDesbloquear",
             []
        );
    }
function backClicked() {
        if (this.loginSecundarioVisible) {
            var ayudaToken = document.getElementById('ayudaToken');
            var loginDiv = document.getElementById('loginSecundario');

            if (!isNullOrUndefined(ayudaToken)) {
                $('#ayudaToken').remove();
            } else if(null != loginDiv) {
                loginDiv.id = "loginPrincipal";
                this.loginSecundarioVisible = false;
            }
        } else {
            navigator.app.exitApp();

        }
    }
function doNetworkOperation() {
    	console.log("doNetworkOperation");
        parent.showLoadingLayer();
        sessionStorage.nvaSesion = 0;
        exec(
             function (jsonResponse) {

            	 parent.hideLoadingLayer();
            	 loginDelegate.doNetworkResponse(jsonResponse);
            	 loginDelegate.versionServidor();
            	 sessionStorage.tam=0;
            },
             function (errorMessage) {
            	console.log("doNetworkOperation: Err");
                parent.hideLoadingLayer();
                loginDelegate.cleanFields();
                if(errorMessage.length == 93537 || errorMessage.length == 81856)
                {
                	console.log("if_mario");
                }else{
                	console.log("else_mario");
                	//parent.loginDelegate.showAlert("Aviso\n", "Erro de conexión.", constants.ALERT_BUTTON_OK);
                   loginDelegate.wtLogout();
                }
             },
             "LoginDelegate",
             "doNetworkOperation",
             [accountNumberValidator.getBackupData(), passwordInputValidator.getBackupData(), sessionStorage.esInvitado]
        );
    }

 function versionServidor(){
        	console.log("versionServidor");
            parent.showLoadingLayer();
            exec(
                function (jsonResponse) {

                	 parent.hideLoadingLayer();
    		 sessionStorage.version = jsonResponse;
    		 console.log("sessionStorage.version"+sessionStorage.version);
                },
                function (errorMessage) {

                		 //parent.hideLoadingLayer();
                },
                "LoginDelegate",
                "versionServidor",
                 []
            );
        }

 function doNetworkResponse(jsonResponse) {
            parent.hideLoadingLayer();

            var jsonObject = JSON.parse(jsonResponse);
            this.cleanFields();

            if (isNullOrUndefined(jsonObject.posicionGlobal)) {
                sessionStorage.username       = jsonObject.solicitaInstrumentoSeguridad.usuario_usr; // WAS user.
                sessionStorage.userCardNumber = jsonObject.solicitaInstrumentoSeguridad.acceso_usr;  // User card number.
                sessionStorage.jsonToken      = jsonResponse;
                sessionStorage.invitadoNumber = this.numeroTarjeta;


                var loginDiv = document.getElementById("loginPrincipal");

                loginDiv.id = "loginSecundario";
                this.loginSecundarioVisible = true;

                tokenViewController.asignaNombreUsuario(jsonObject.solicitaInstrumentoSeguridad.alias_usr);
                tokenViewController.asignaTextoAyuda(jsonObject.solicitaInstrumentoSeguridad.tiseguridad_usr);

                parent.hideLoadingLayer();

            } else {
                sessionStorage.username       = jsonObject.posicionGlobal.usuario_usr; // WAS user.
                sessionStorage.userCardNumber = jsonObject.posicionGlobal.acceso_usr;  // User card number.
                sessionStorage.jsonPosicion   = jsonResponse;

                this.loginSecundarioVisible = false;

                tokenViewController.downloadBanksCatalog();
            }
        }

 function consultaDatosGuardados () {
                exec(
                     function (result) { loginDelegate.mostrarInvitado(); loginDelegate.asignarDatos(result); },
                     function (result) { /** No hay datos guardados **/ },
                     "LoginDelegate",
                     "consultaDatosGuardados",
                     []
                );
            }
  asignarDatos: function (numeroTarjeta) {
                    accountNumberValidator.setData(numeroTarjeta);

                    var input = document.getElementById('inputTarjeta');

                    input.value = accountNumberValidator.getText();

                    var input2 = document.getElementById('inputTarjetaAux');
                    input2.setAttribute('readonly', 'readonly');
                    input2.value = accountNumberValidator.getMaskedText();
                }