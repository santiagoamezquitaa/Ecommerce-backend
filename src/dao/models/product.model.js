import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "Products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    unique: true,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: Array,
    items: {
      type: String,
    },
  },
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);
