const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const db = process.env.MONGO_LOCAL_URI;

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const middlewares = require("./middleware");
const logs = require("./api/logs");

const app = express();
app.use(morgan("common"));

app.use(express.json());

// Removes unnecessary default server response and
// Adds useful secure response parameters
app.use(helmet());

app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.get("/", (req, res) => {
	res.json({ message: "Hello World!" });
});

app.use("/api/logs", logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1992;

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});
