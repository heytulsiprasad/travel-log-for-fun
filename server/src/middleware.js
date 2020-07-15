// Not found middleware
// This one is specifically for "Not found"
// Doesn't care about other errors: like database lookup etc

const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error); // goes straight to error handler
};

// error handling middleware [4 params]
// General error handler
// Works when error is passed on inside next() in the above middleware

const errorHandler = (err, req, res, next) => {
	// if it comes from some other route
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? "Error Occured" : err.stack,
	});
};

module.exports = { notFound, errorHandler };
