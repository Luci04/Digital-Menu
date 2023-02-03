import { model, Schema } from 'mongoose';

const ItemSchema = new Schema({
    item_name: {
        type: 'String',
        required: true
    },
    item_price: {
        type: "Number",
        required: true
    },
    item_qty: {
        type: "Number",
        required: true
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
})

const OrderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    hotel_id: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    },
    ordered_items: [ItemSchema],
    table_number: {
        type: "String",
        required: true
    },
    total_amount: {
        type: "number",
        required: true
    },
    order_status: {
        type: "String",
        default: "Pending"
    }
}, {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})


const Order = model('Order', OrderSchema)

export { Order, OrderSchema }