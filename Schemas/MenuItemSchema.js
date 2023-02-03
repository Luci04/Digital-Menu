import { model, Schema } from "mongoose";

export const MenuItemSchema = new Schema({
  item_name: {
    required: true,
    type: "String",
  },
  price: {
    required: true,

    type: "Number",
  },
  availability: {
    required: true,
    type: "Boolean",
  },
  special: {
    required: true,
    type: "Boolean",
  },
  popular: {
    required: true,
    type: "Boolean",
  },
  veg: {
    required: true,
    type: "Number",
  },
}, {
  versionKey: false,
  id: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
});

export const MenuItem = model("MenuItem", MenuItemSchema);


