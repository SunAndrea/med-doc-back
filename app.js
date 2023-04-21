require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorFilter } = require("./middlewares/index");

const authRouter = require("./routes/api/auth");
const { visitRouter } = require("./routes/api");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/visits", visitRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

app.use(errorFilter);

module.exports = app;
