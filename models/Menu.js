import mongoose from "mongoose";

// Define the schema
const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    taste: { type: String, enum: ["spicy", "sweet", "sour", "bitter", "salty"], required: true },
    is_veg: { type: Boolean, required: true },
    ingredients: { type: [String], default: [], required: true },
    num_sales: { type: Number, default: 0 },
    image: { type: String, required: true },
});

// Create a model
const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
