const { errors } = require('./errors');

// express.js middleware
const errorHandler = (err, req, res, next) => {
	// err = [status, message]
	// err[0] = HTTP status. Used in res.status().
	// err[1] = Arbitrary message provided by the function call. Assigned to ErrorOutput key.
	// Ex: next(["h404", "Oh no, your thing doesn't exist!"])
	const status = err[0];
	const message = err[1];

	// ruh roh. "status" isn't in errors...
	if (!errors.hasOwnProperty(status)) throw new Error(`Uncaught Exception! Please review:\n${err}`);

	// continue as normal
	if (status === 'h500') console.error('Error:\n', message);
	const error = { ...errors[status], errorOutput: message };
	res.status(error.httpStatus).json(error);
};

// just returns the JS object matching status with the specified message on errorOutput
const statusObj = (status, message) => {
	// status = http status
	// message = arbitrary message provided by the function call
	if (!errors.hasOwnProperty(status)) {
		return { error: `HTTP status '${status}' not defined!`, status, message };
	} else {
		return { ...errors[status], errorOutput: message };
	}
};

module.exports = {
	errorHandler,
	statusObj
};
