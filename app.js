import express from "express";
import dotenv from "dotenv";
import connectDB from "./cofig/db.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

connectDB();

app.use("/api/customer", customerRoutes);
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
