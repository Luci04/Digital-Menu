import express from 'express';

import Admin from '../Database/AdminSchema.js';
import User from '../Database/UserSchema.js';

import Response from '../services/response.js';

const router = express.Router();

//Placing Order
router.post('/place_order', async (req, res) => {

    const data = req.body;

    try {
        const user = await User.findByIdAndUpdate({ _id: data.user_id }, {
            $push: {
                order_history: data.order
            }
        });

        const admin = await Admin.findByIdAndUpdate({ _id: data.order.hotel_id }, {
            $push: {
                order_history: data.order
            }
        });


        res.send({ user });
    } catch (error) {
        res.status(Response.does_not_exist.code).send(Response.does_not_exist)
    }
});

//Retrive All Order for User
router.get('/getorder/user', async (req, res) => {
    const data = req.body;

    try {

        const user = await User.findOne({ email_address: data.email_address })
            .select('order_history')
            .slice('order_history', -10)

        res.send(user);
    } catch (error) {
        res.status(Response.does_not_exist.code).send(Response.does_not_exist)
    }
});

router.get('/getorders/admin', async (req, res) => {

    try {
        // const data = await Menu.find({}, { _id: 1 });

        if (data === undefined || data === null || data.length === 0) {
            throw Error();
        }

        res.send(data);
    } catch (error) {
        res.status(Response.does_not_exist.code).send(Response.does_not_exist)
    }
});

export { router as OrderRouter };
