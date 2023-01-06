import { model, Schema } from "mongoose";
import { MenuItemSchema } from "./MenuItemSchema.js";

export const CousineSchema = new Schema({
  title: {
    required: true,
    type: "String",
  },
  menu_item_list: [MenuItemSchema],
});

export const Cousine = model("Cousine", CousineSchema);
