import mongoose, { model, Schema } from "mongoose";
import { MenuItemSchema } from "./MenuItemSchema.js";

export const CousineSchema = new Schema({
  title: {
    type: "String",
  },
  menuItemList: [MenuItemSchema],
});

export const Cousine = mongoose.model("Cousine", CousineSchema);
