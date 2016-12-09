cordova.define("BComApp.BComTimer.TimerDelegate.TimerDelegate", function(require, exports, module) {
               
// __________ Inicia Phonegap __________

var exec = require('cordova/exec');

function TimerDelegate() {}

// TimerDelegate.prototype.initTimer = function() {}
// TimerDelegate.prototype.logout = function() {}
// TimerDelegate.prototype.reinicioTimer = function() {}

TimerDelegate.prototype.resetTimerInactividad = function() {
	exec(
		function (result) { parent.showLoadingLayer(); console.log('resetTimerInactividad success: ' + result); },
    	function (error)  { console.log('resetTimerInactividad error: ' + error);  },
	    "TimerDelegate", 
    	"resetTimerInactividad",
    	[]
  	);
}
               
TimerDelegate.prototype.resetTimerOperacion = function(isWebTrader) {
    exec(
        function (result) { parent.showLoadingLayer(); console.log('resetTimerInactividad success: ' + result); },
        function (error)  { console.log('resetTimerInactividad error: ' + error);  },
        "TimerDelegate",
        "resetTimerOperacion",
        [isWebTrader]
    );
}

TimerDelegate.prototype.resetDoKeepAlive = function(isWebTrader) {
    exec(
        function (result) { parent.showLoadingLayer(); console.log('resetDoKeepAlive success: ' + result); },
        function (error)  { console.log('resetDoKeepAlive error: ' + error);  },
        "TimerDelegate",
        "resetDoKeepAlive",
        [isWebTrader]
    );
}

var timerDelegate = new TimerDelegate();
module.exports = timerDelegate;

// __________ Termina Phongegap __________

});
