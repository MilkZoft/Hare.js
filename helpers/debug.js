var self = {
	set: function(options)
	{
		var debugLines = (options.l) ? + options.l : '';
		var debugFunction = (options.f) ? 'function:' + options.f : null;
		var debugParams = (options.p) ? options.p : null;
		var debugReturn = (options.r) ? '|Return: ' + options.r : '';
		var debugMessage = options.file + ':' + options.l + '|' + debugFunction + '(' + debugParams + ')' + debugReturn;

		if (global.config.server.debug) {
			console.log(debugMessage);
		}
	}
};

module.exports = self;