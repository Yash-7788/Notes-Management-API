require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
require("./config/db");

const limiter = rateLimit({
 windowMs: 15 * 60 * 1000,
 max: 100
});

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

app.get("/health", (req, res) => {
  res.json({ status: "API running" });
});

app.use(limiter);

app.use("/api/auth",authRoutes);
app.use("/api/notes",noteRoutes);

app.use(errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

app.listen(5000 , () => {
   console.log(`SERVER RUNNING ON PORT ${PORT}`);
});