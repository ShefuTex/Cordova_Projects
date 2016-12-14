function popupLstCtas() {
    
    var objJSON = JSON.parse(sessionStorage.lstCtasPat);
    var lstCtas = [];
    for (elem in objJSON) {
        lstCtas.push(objJSON[elem]);
    
    }
    
    $('html').addClass('overlay');
    var activePopup = $('#example-popup');
    $(activePopup).addClass('visible');
    
    var otro = sessionStorage.cuentaPatrimonial;
    var tablaCont="<div class=\"popup-body\">	<!--span class=\"popup-exit\"></span-->";
    tablaCont+=" <div class=\"popup-content\">";
    tablaCont+=" <table class=\"lista_cuentas-lst\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">";
    tablaCont+=" <thead>";
    tablaCont+=" <tr>";
    tablaCont+=" <th>Contrato de Operación</th>";
    tablaCont+=" </tr>";
    tablaCont+=" </thead>";
    tablaCont+=" <tbody>";

    for (var i = 0; i < lstCtas.length; i++) {
        if(otro == lstCtas[i].id){
            tablaCont+=" <td><a id=\"abajo\" class=\"otro\" hrf=\"#\"onclick='claveID(\""+lstCtas[i].id+"\", callback)'>"+lstCtas[i].cuenta.slice(10)+"</a></td>";
            tablaCont+=" </tr>";
        }
        else{
            tablaCont+=" <tr class=\"lista_cuentas-lst-ren td a\">";
            tablaCont+=" <td><a id=\"abajo\" hrf=\"#\"onclick='claveID(\""+lstCtas[i].id+"\", callback)'>"+lstCtas[i].cuenta.slice(10)+"</a></td>";
            tablaCont+=" </tr>";
            
        }
    }
    tablaCont+="	</tbody>";
    tablaCont+="	</table>";
    tablaCont+="    </div>";
    tablaCont+="</div>";
    
    $('#example-popup').html( tablaCont );

}

    jQuery(document).ready(function ($) {
    
	$(document).keyup(function (e) {
        console.log("KeyUp");
	    if (e.keyCode == 27 && $('html').hasClass('overlay')) {
		clearPopup();
	    }
	});
    
	$('.popup-exit').click(function () {
	    clearPopup();
	});
    
	$('.popup-overlay').click(function () {
	    clearPopup();
	});
    });

	function clearPopup() {
        $('.popup.visible').addClass('transitioning').removeClass('visible');
	    $('html').removeClass('overlay');
        
        $('.popup').removeClass('transitioning');
	}
    
    
    function claveID(valor, callback) {
        $('body').click(function(event) {
            if($(event.target).is('#abajo')) {
            }
        });
        if(cambioContrato == 1) {
            $('.icoRefresh').click();
        } else if(cambioContrato == 2) {
            $('#investmentDetail_positionTable .top .topBox .title .icoRefresh').click();
        } else if(cambioContrato == 3){
            $('.icoRefresh').click();
        } else if(cambioContrato == 4){
            $('.icoRefresh').click();
        }
        sessionStorage.cuentaPatrimonial= valor;
        if (sessionStorage.ctaPatSel == sessionStorage.cuentaPatrimonial){
            sessionStorage.cambio = 0;
        } else {
            sessionStorage.cambio = 1;
        }
        clearPopup();
        
    }
