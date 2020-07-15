require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/travel", {
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

app.use(cors({ origin: "http://localhost:3000" }));

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
