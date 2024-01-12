import mongoose from "mongoose";

const ProductModel = new mongoose.Schema(
    {
        name: {type: String},
        description: { type: String },
        price: {type: Number}, 
        image: {type: String}
    }, {timestamps: true}
)

export default mongoose.model("Product", ProductModel)