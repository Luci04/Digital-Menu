import express from 'express';

import Admin from '../Schemas/AdminSchema.js';
import User from '../Schemas/UserSchema.js';
import { Order } from '../Schemas/OrderSchema.js';

import Response from '../Utilities/response.js';

const router = express.Router();

//Placing Order
router.post('/place_order', async (req, res) => {

    const data = req.body.order;

    console.log(data);

    try {
        const order = new Order({
            ...data
        })

        order.save();

        const user = await User.findByIdAndUpdate({ _id: data.user_id }, {
            $push: {
                order_history: order._id
            }
        });

        console.log(user);

        const admin = await Admin.findByIdAndUpdate({ _id: data.hotel_id }, {
            $push: {
                order_history: order._id
            }
        });

        res.send({ order });

    } catch (error) {
        res.status(Response.does_not_exist.code).send(Response.does_not_exist)
    }
});

//Retrive All Order for User
router.get('/user/getorder', async (req, res) => {
    const data = req.body;

    try {
        const AllOrders = await User.findOne({ email_address: data.email_address }, { order_history: true }).populate('order_history')

        res.send(AllOrders);
    } catch (error) {
        res.status(Response.does_not_exist.code).send(Response.does_not_exist)
    }
});


//Retrive All Order for User
// router.get('/getorders/admin', async (req, res) => {

//     try {
//         // const data = await Menu.find({}, { _id: 1 });

//         if (data === undefined || data === null || data.length === 0) {
//             throw Error();
//         }

//         res.send(data);
//     } catch (error) {
//         res.status(Response.does_not_exist.code).send(Response.does_not_exist)
//     }
// });

export { router as OrderRouter };
