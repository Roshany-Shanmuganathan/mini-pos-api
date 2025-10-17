import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
  customer: { type: String, required: true, trim: true },
  items: { type: String, required: true, trim: true },
  total: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Sale", SaleSchema);
