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
        required: true,
    },
    password: {
        type: "String",
        required: true,
    },
    loaction: {
        type: "String",
    },
    menu_id: {
        type: Schema.Types.ObjectId,
        ref: "MenuSchema"
    },
    order_history: [OrderSchema]
});

const Admin = model("Admin", AdminSchema);

export default Admin;
