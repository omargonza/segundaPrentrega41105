import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  thumbnail: String,
  stock: Number,
  category: String,
 
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);

export default productModel;