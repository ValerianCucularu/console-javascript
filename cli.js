/**
	Get the keycode of key pressed by user
	**/

function get_key(e) {

var code, evt = e || window.event;

if (evt.keyCode) 
	code = evt.keyCode;
else if (evt.which) 
	code = evt.which;

return code;
}

/**
	Series of functions for handling keyboard events according to the keys pressed
	**/

var handler = {

	consoleHead : "root@cucuX:~#",

	consoleLine : null,

	setConsoleLine : function(ref) {
	
		this.consoleLine = ref;
	},

	carriageReturn : function() {

		var par = document.createElement('p');
		par.innerHTML = this.consoleLine.innerHTML;
		this.consoleLine.parentNode.insertBefore(par, this.consoleLine);
		this.consoleLine.innerHTML = this.consoleHead;
	},

	backSpace : function() {

		if (this.consoleLine.innerHTML.length > this.consoleHead.length) {
			var temp = this.consoleLine.innerHTML.substr(0, this.consoleLine.innerHTML.length - 1);
			this.consoleLine.innerHTML = temp;
		}
	},

	writeCharacter : function(code) {
		
		this.consoleLine.innerHTML += String.fromCharCode(code);
	}
};

/**
	Function for handling printable characters
	**/
function init_keyboard(e) {

	var code = get_key(e);

	if ((32 <= code) && (code <= 126))
		handler.writeCharacter(code);

	else if (code == 13)
		handler.carriageReturn();

	else if (code == 8)
		handler.backSpace();
}

