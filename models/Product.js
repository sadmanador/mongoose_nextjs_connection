import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    seller: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    ratings: { type: Number, required: true },
    ratingsCount: { type: Number, required: true },
    img: { type: String, required: true },
    shipping: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);

export default Product;