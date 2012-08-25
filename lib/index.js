
exports.error = function(msg) {
	var result = { };
	if (typeof msg === 'object' && msg.message) {
		result.status = msg.status;
		msg = {
			type: msg.type,
			message: msg.message,
			stack: msg.stack
		};
		if (msg.stack) {
			msg.stackArray = msg.stack.split('\n').slice(1).map(trim)
		}
		if (! result.status) {
			delete result.status;
		}
		result.error = msg;
	} else {
		result.error = {message: msg};
	}
	return result;
};

// ------------------------------------------------------------------
//  Minor extension for more convienent Express use

exports.respondTo = function(res) {
	return new exports.Responder(res);
};

exports.Responder = function(res) {
	this.res = res;
};

exports.Responder.prototype.error = function(msg, status) {
	msg = exports.error(msg);
	status = status || msg.status || 500;
	return this.res.json(msg, status);
};

// ------------------------------------------------------------------

function trim(str) {
	return str.trim();
}

