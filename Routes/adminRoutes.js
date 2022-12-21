import express from 'express';
import Admin from '../Schemas/AdminSchema.js';
import Menu from '../Schemas/MenuSchema.js';
import response from '../Utilities/response.js';

import { FetchCousings } from '../Utilities/utilityFunctions.js';

const router = express.Router();

// Create a new Admin
router.post('/create_admin', async (req, res) => {

    const admin_data = req.body;

    try {
        let admin = new Admin({
            first_name: admin_data.first_name,
            last_name: admin_data.last_name,
            hotel_name: admin_data.hotel_name,
            email_address: admin_data.email_address,
            password: admin_data.password,
            location: admin_data.location
        })

        const data = await admin.save();

        res.send(data)
    } catch (error) {
        if (error.code === 11000) {

            let errMsg = "";

            Object.keys(error.keyValue).forEach((ele, index) => {
                errMsg += ele.toString() + " ";
            });

            errMsg += " already exists.";

            res.status(response.already_exists.code).send(errMsg);

        } else {
            res.status(500).send(error.message)
        }
    }
})

// Login Admin Route
router.get('/login', async (req, res) => {
    const data = req.body;

    try {
        const admin = await Admin.findOne({ email_address: data.email_address });

        if (!admin) {
            throw new Error("Admin not found");
        }

        if (admin.password !== data.password) {
            throw new Error("Incorrect password");
        }

        res.send(admin)
    } catch (error) {

        res.status(response.does_not_exist.code).send(error.message)
    }
})

//Set Menu with Admin
router.post('/set_menu', async (req, res) => {

    const admin_email = req.body.admin_email;
    const data = req.body.hotel_menu;

    let admin = undefined

    try {
        admin = await Admin.findOne({
            email_address: admin_email
        })

        if (!admin) {
            throw new Error("Admin not found")
        }
    } catch (error) {
        res.status(404).send({ Avinash: "Avinash" })
    }

    const CousingList = [];

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        const AllCousine = FetchCousings(element.item_list);

        const currCousine = {
            title: element.title,
            menuItemList: AllCousine,
        };

        CousingList.push(currCousine);
    }

    const currMenu = new Menu({
        CousineList: CousingList,
    });

    currMenu.save((err, currMenu) => {
        console.log(currMenu)
        admin.menu_id = currMenu._id;
        admin.save((err, currAdmin) => {
            res.send(currAdmin)
            return;
        });
    });


})

//Fetch Admin Menu
router.get('/getmenu/:id', async (req, res) => {
    const admin_id = req.params.id;

    try {

        const admin = await Admin.findById(admin_id);

        if (!admin) {
            throw new Error('Admin not found');
        }

        if (!admin.menu_id) {
            throw new Error('Menu Not Create Yet');
        }

        const admin_Menu = await Menu.findById(admin.menu_id);

        res.send(admin_Menu);

    } catch (error) {
        res.status(404).send(error.message)
    }
})


// Delete userRoutes By ID
router.delete('/delete_admin', async (req, res) => {
    const data = req.body;

    try {
        const admin = await Admin.findOneAndDelete({ email_address: data.email_address })

        if (!admin) {
            throw new Error("Admin not found")
        }

        res.send(admin);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

export { router as AdminRouter }