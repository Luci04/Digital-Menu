import { model, Schema } from 'mongoose';
import { OrderSchema } from './OrderSchema.js';


const AdminSchema = new Schema({
    first_name: {
        type: "String",
        required: true,
    },
    last_name: {
        type: "String",
        required: true,
    },
    hotel_name: {
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
    location: {
        type: "String",
    },
    menu_id: {
        type: Schema.Types.ObjectId,
        ref: "Menu"
    },
    order_history: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
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

const Admin = model("Admin", AdminSchema);

export default Admin;
