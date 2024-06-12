const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const bbyRoutes = require("./routes/bby");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/shopping-list");

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/bby", bbyRoutes);
app.use("/product", productRoutes);
app.use("/auth", authRoutes);
app.use("/list", listRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: "Server is working." });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}.`)),
  )
  .catch((err) => {
    throw err;
  });

module.exports = app;
