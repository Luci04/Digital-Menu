import { model, Schema } from "mongoose";
import { OrderSchema } from "./OrderSchema.js";


const UserSchema = new Schema({
    first_name: {
        type: "String",
        required: true,
    },
    last_name: {
        type: "String",
        required: true,
    },
    email_address: {
        type: "String",
        unique: true,
        required: true,
    },
    password: {
        type: "String",
        required: true,
    },
    order_history: [OrderSchema],
    loaction: {
        type: "String",
    },
    menu_id: {
        type: Schema.Types.ObjectId,
        ref: 'MenuSchema'
    }
});

const User = model("User", UserSchema);

export default User;