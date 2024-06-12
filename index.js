import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import "dotenv/config";

import bbyRoutes from "./routes/bby.js";
import productRoutes from "./routes/product.js";
import authRoutes from "./routes/auth.js";
import listRoutes from "./routes/shopping-list.js";

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

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
