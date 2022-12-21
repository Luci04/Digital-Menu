import { model, Schema } from "mongoose";

export const MenuItemSchema = new Schema({
  item_name: {
    type: "String",
  },
  price: {
    type: "Number",
  },
  availability: {
    type: "Boolean",
  },
  special: {
    type: "Boolean",
  },
  popular: {
    type: "Boolean",
  },
  veg: {
    type: "Number",
  },
});

export const MenuItem = model("MenuItem", MenuItemSchema);


