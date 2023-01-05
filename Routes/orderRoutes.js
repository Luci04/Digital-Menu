import express from 'express';

import Admin from '../Schemas/AdminSchema.js';
import User from '../Schemas/UserSchema.js';

import Response from '../Utilities/response.js';

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
        const user = await User.findOne({ email_address: data.email_address }, { order_history: true })

        res.send(user);
    } catch (error) {
        res.status(Response.does_not_exist.code).send(Response.does_not_exist)
    }
});


//Retrive All Order for User
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
