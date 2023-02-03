import { model, Schema } from "mongoose";
import { MenuItemSchema } from "./MenuItemSchema.js";

export const CousineSchema = new Schema({
  title: {
    required: true,
    type: "String",
  },
  menu_item_list: [MenuItemSchema],
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

export const Cousine = model("Cousine", CousineSchema);
