import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  sku: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0 },
  description: { type: String, required: true },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Item", ItemSchema);
