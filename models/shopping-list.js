import mongoose from "mongoose";

const shoppingListSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  products: {
    type: Array,
    default: [],
    required: false,
  },
});

const ShoppingList = mongoose.model("shopping-lists", shoppingListSchema);

export default ShoppingList;
