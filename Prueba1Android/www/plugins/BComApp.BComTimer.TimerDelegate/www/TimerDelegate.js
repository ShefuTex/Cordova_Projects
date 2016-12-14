cordova.define("BComApp.BComTimer.TimerDelegate.TimerDelegate", function(require, exports, module) {
               
// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

function TimerDelegate() {}

// TimerDelegate.prototype.initTimer = function() {}
// TimerDelegate.prototype.logout = function() {}
// TimerDelegate.prototype.reinicioTimer = function() {}

TimerDelegate.prototype.resetTimerInactividad = function() {
	exec(
		function (result) { showLoadingLayer(); console.log('resetTimerInactividad success: ' + result); },
    	function (error)  { console.log('resetTimerInactividad error: ' + error);  },
	    "TimerDelegate", 
    	"resetTimerInactividad",
    	[]
  	);
}
               
TimerDelegate.prototype.resetTimerOperacion = function(isWebTrader) {
    exec(
        function (result) { showLoadingLayer(); console.log('resetTimerInactividad success: ' + result); },
        function (error)  { console.log('resetTimerInactividad error: ' + error);  },
        "TimerDelegate",
        "resetTimerOperacion",
        [isWebTrader]
    );
}

var timerDelegate = new TimerDelegate();
module.exports = timerDelegate;

// __________ Termina Phongegap __________

});
