import express from 'express';

import Response from '../Utilities/response.js';

const Menurouter = express.Router();

//Database Schemas
import Menu from '../Schemas/MenuSchema.js';
import { MenuItem } from '../Schemas/MenuItemSchema.js';
import { Cousine } from '../Schemas/CousineSchema.js';


const FetchCousings = (cousine) => {
    const result = [];

    for (let index = 0; index < cousine.length; index++) {
        const element = cousine[index];
        const menuItem = new MenuItem({
            item_name: element.item_name,
            availability: element.availability,
            popular: element.popular,
            price: element.price,
            special: element.special,
            veg: element.veg,
        });

        result.push(menuItem);
    }

    return result;
};

//Get All Menus
Menurouter.get('/', async (req, res) => {
    try {
        const data = await Menu.find({}, { _id: 1 });

        if (data === undefined || data === null || data.length === 0) {
            throw Error();
        }

        res.send(data);
    } catch (error) {
        res.status(Response.does_not_exist.code).send(Response.does_not_exist)
    }
});

//Save Menu
Menurouter.post("/saveData", async (req, res) => {
    try {
        const data = req.body.hotel_menu;

        console.log(data);

        const Cousinglist = [];

        for (let index = 0; index < data.length; index++) {
            const element = data[index];

            const AllCousine = FetchCousings(element.item_list);

            const currCousine = new Cousine({
                title: element.title,
                menuItemList: AllCousine,
            });

            Cousinglist.push(currCousine);
        }

        const currMenu = new Menu({
            CousineList: Cousinglist,
        });

        currMenu.save((err, currMenu) => {
            if (err) {
                throw err;
            }
            res.send(currMenu);
        });
    } catch (error) {
        console.log(error)
        res.status(Response.internal_server_error.code).send(Response.internal_server_error)
    }
});


Menurouter.get("/get_menu/:id", async (req, res) => {

    const menu_id = req.params.id;

    try {
        let menu = await Menu.findById(menu_id)

        menu.id = menu._id;

        delete menu._id;

        console.log(menu);

        if (!menu) {
            throw Error("Menu not found");
        }

        res.send(menu);

    }
    catch (error) {
        res.status(Response.does_not_exist.code).send(error.message)
    }
});

//Get Menu with hotelId
Menurouter.get("/:hotel_id/getMenu", async (req, res) => {

    const hotel_id = req.params.hotel_id;

    try {
        const data = await Menu.findById(hotel_id)

        if (!data) {
            throw Error("Please Enter a Valid Id Id");
        }

        res.send(data);

    }
    catch (error) {

        res.status(Response.does_not_exist.code).send(Response.does_not_exist)
    }
});


export { Menurouter };