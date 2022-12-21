import { model, Schema } from "mongoose";
import { CousineSchema } from "./CousineSchema.js";

const MenuSchema = new Schema({
  CousineList: [CousineSchema],
});

const Menu = model("Menu", MenuSchema);

export default Menu;