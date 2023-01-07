import { model, Schema } from "mongoose";
import { CousineSchema } from "./CousineSchema.js";

const MenuSchema = new Schema({
  cousine_list: [CousineSchema],
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

const Menu = model("Menu", MenuSchema);

export default Menu;