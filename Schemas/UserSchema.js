import { model, Schema } from "mongoose";

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
    order_history: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    menu_id: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }
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

const User = model("User", UserSchema);

export default User;