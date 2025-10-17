import express from "express";
import dotenv from "dotenv";
import connectDB from "./cofig/db.js";
import customerRoutes from "./routes/customerRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

connectDB();

app.use("/api/customers", customerRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", authRoutes);
app.use("/api/sales", saleRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
