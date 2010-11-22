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
	Function for handling printable characters & other special characters
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

/**
	Function for checking if a valid command has been typed
	**/

function valid_command() {

	var typed = handler.consoleLine.previousSibling.innerHTML.substring(handler.consoleHead.length),
			flag = false;
	for (var i in commands) {
		if (commands[i].text == typed.toLowerCase()) {
			commands[i].action();
			flag = true;
			break;
		}
	}
	if (!flag) {
		var err = document.createElement("p");
		err.innerHTML = "Command not found";
		handler.consoleLine.parentNode.insertBefore(err, handler.consoleLine);
	}
}

/**
	Series of functions for handling keyboard events according to the keys pressed
	**/

var handler = {

	consoleHead : "root@cucuX:~#",

	consoleID : 'console',

	consoleLine : null,

	setConsoleLine :  function() {
		this.consoleLine = document.getElementById(this.consoleID);
	},

	carriageReturn : function() {

		var par = document.createElement('p');
		par.innerHTML = this.consoleLine.innerHTML;
		this.consoleLine.parentNode.insertBefore(par, this.consoleLine);
		this.consoleLine.innerHTML = this.consoleHead;
		valid_command();
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
	List of supported commands by the console
	**/

var commands = {

		"clear" : {

			text : "clear",

			action : function () {
				var txt = "<p id='" + handler.consoleLine.id + "'>" + handler.consoleHead + "</p>";
				handler.consoleLine.parentNode.innerHTML = txt;
				handler.setConsoleLine();
			}
		}	
};



