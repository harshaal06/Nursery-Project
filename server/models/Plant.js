import { Schema, model } from "mongoose";

const plantSchema = new Schema({
    name: String,
    price: Number,
    imageURL: String,
    category: String,
    description: String
}, {
    timestamps: true
})

const Plant = model("Plant", plantSchema)

export default Plant