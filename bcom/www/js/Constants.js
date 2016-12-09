function Constants() {
    
    this.CARD_ERROR_NUMBER = 'Tu usuario debe ser de 16 d\xedgitos, por favor verifica e intenta de nuevo';
    
    this.PASSWORD_ERROR_NUMBER = 'El n\xfamero debe ser de 8 d\xedgitos, por favor verifica e intenta de nuevo';
    
    this.ALERT_BUTTON_OK = 'Aceptar';
    
    this.TOKEN_ERROR_EMPTY = 'Digita el n\xfamero desplegado en tu dispositivo digital de acceso seguro';
    
    this.TOKEN_HELP_DP270 = 'C\xf3digo de 8 posiciones que aparece en el dispositivo de Acceso Seguro (Enci\xe9ndelo y presiona el bot\xf3n 1)';
    
    this.TOKEN_ERROR_DP270 = 'C\xf3digo de 8 posiciones que aparece en el dispositivo de Acceso Seguro (Enci\xe9ndelo, presiona el bot\xf3n 2 y captura en el dispositivo los \xfaltimos 5 d\xedgitos de la cuenta o tarjeta)';
    
    this.TOKEN_HELP_OCRA = 'C\xf3digo de 8 posiciones que aparece en el dispositivo de Acceso Seguro (Enci\xe9ndelo, presiona el bot\xf3n C\xf3digo)';
   
    this.TOKEN_ERROR_OCRA = 'C\xf3digo de 8 posiciones que aparece en el dispositivo de Acceso Seguro (Enci\xe9ndelo, presiona el bot\xf3n Registro, captura en el dispositivo los \xfaltimos 5 n\xfameros de la cuenta o tarjeta a registrar y presiona el bot\xf3n OK)';
    
    this.TOKEN_HELP_SOFT = 'Desde tu Bancomer m\xf3vil, ingresa a "Token m\xf3vil" y selecciona "Generar c\xf3digo de seguridad".';
    
    this.TOKEN_ERROR_SOFT = 'Desde tu Bancomer m\xf3vil, ingresa a "Token m\xf3vil", selecciona "Registrar cuenta/tarjeta/celular", captura los \xfaltimos 5 d\xedgitos de la cuenta, tarjeta o celular a registrar y oprime continuar';
    
    this.CUENTA_PESOS = 'Cuentas en Pesos';
    
    this.CUENTA_DOLARES = 'Cuentas en D\xf3lares';
    
    this.TARJETA_CREDITO = 'Tarjeta de Cr\xe9dito';

    this.MESSAGE_CONFIRM_LOGOUT = 'Confirma que desea cerrar la sesi\xf3n?';
    
    this.TOKEN_LENGTH_ERROR = "El n\xfamero debe ser de 8 d\xedgitos, por favor verifica e intenta de nuevo.";
    
    this.RESOLUCION = "Por el momento esta resolución no esta habilitada.";

    this.TOKEN_LENGTH = 8;
}

Constants.prototype = {
    constructor: Constants
}

var constants = new Constants();