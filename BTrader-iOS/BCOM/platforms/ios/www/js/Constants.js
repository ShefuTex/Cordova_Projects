function Constants() {
    
    this.CARD_ERROR_NUMBER = 'Tu usuario debe ser de 16 d\xEDgitos, por favor verifica e intenta de nuevo';
    
    this.PASSWORD_ERROR_NUMBER = 'El n\xFAmero debe ser de 8 a 10 d\xEDgitos, por favor verifica e intenta de nuevo';
    
    this.ALERT_BUTTON_OK = 'Aceptar';
    
    this.TOKEN_ERROR_EMPTY = 'Digita el n\xFAmero desplegado en tu dispositivo digital de acceso seguro';
    
    this.TOKEN_HELP_DP270 = 'C&oacutedigo de 8 posiciones que aparece en el dispositivo Acceso Seguro (Enci&eacutendelo y presiona el bot&oacuten 1)';
    
    this.TOKEN_ERROR_DP270 = 'C&oacutedigo de 8 posiciones que aparece en el dispositivo Acceso Seguro (Enci&eacutendelo, presiona el bot&oacuten 2 y captura en el dispositivo los &uacuteltimos 5 d&iacutegitos de la cuenta o tarjeta)';
    
    this.TOKEN_HELP_OCRA = 'C&oacutedigo de 8 posiciones que aparece en el dispositivo Acceso Seguro (Enci&eacutendelo, presiona el bot&oacuten C&oacutedigo)';
   
    this.TOKEN_ERROR_OCRA = 'C&oacutedigo de 8 posiciones que aparece en el dispositivo Acceso Seguro (Enci&eacutendelo, presiona el bot&oacuten Registro, captura en el dispositivo los &uacuteltimos 5 n&uacutemeros de la cuenta o tarjeta a registrar y presiona el bot&oacuten OK)';
    
    this.TOKEN_HELP_SOFT = 'Desde tu Bancomer m&oacutevil, ingresa a "Token m&oacutevil" y selecciona "Generar c&oacutedigo de seguridad".';
    
    this.TOKEN_ERROR_SOFT = 'Desde tu Bancomer m&oacutevil, ingresa a "Token m&oacutevil", selecciona "Registrar cuenta/tarjeta/celular", captura los &uacuteltimos 5 d&iacutegitos de la cuenta, tarjeta o celular a registrar y oprime continuar';
    
    this.CUENTA_PESOS = 'Cuentas en Pesos';
    
    this.CUENTA_DOLARES = 'Cuentas en D&oacutelares';
    
    this.TARJETA_CREDITO = 'Tarjeta de Cr&eacutedito';
    
    this.CUENTAS_PATRIMONIALES = 'Cuentas Patrimoniales';

    this.MESSAGE_CONFIRM_LOGOUT = 'Confirma que desea cerrar la sesión?';

    this.TOKEN_LENGTH = 8;
    
    this.TOKEN_LENGTH_ERROR = 'El n\xFAmero debe ser de 8 d\xEDgitos, por favor verifica e intenta de nuevo.';
}

Constants.prototype = {
    constructor: Constants
}

var constants = new Constants();