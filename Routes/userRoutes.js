import express from 'express';
import User from '../../Database/UserSchema.js';
import Menu from '../Schemas/MenuSchema.js';
import response from '../../services/response.js';

const router = express.Router();

// Create a new User
router.post('/create_user', async (req, res) => {

    console.log("End Point Reached")

    const user_data = req.body;

    try {
        let user = new User({
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            email_address: user_data.email_address,
            password: user_data.password
        })

        const data = await user.save();

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

// Login User Route
router.get('/login', async (req, res) => {
    const data = req.body;

    try {
        const user = await User.findOne({ email_address: data.email_address })

        console.log(user);

        if (!user) {
            throw new Error("User not found")

        }

        if (user.password !== data.password) {
            throw new Error("Incorrect password")
        }

        res.send(user)
    } catch (error) {

        console.log(error.message)

        res.status(response.does_not_exist.code).send(error.message)
    }
})

//Fetch Menu for User End
router.get('/getmenu/:id', async (req, res) => {
    const menu_id = req.params.id;

    try {
        const menu = await Menu.findById(admin.menu_id);

        res.send(menu);

    } catch (error) {
        res.status(404).send(error.message)
    }
})


// Update userRoutes By ID
router.put('/update_user', async (req, res) => {
    const data = req.body;

    try {
        const user = await User.findOneAndUpdate({
            email_address: data.email_address
        }, {
            first_name: data.first_name,
            last_name: data.last_name,
        })

        if (!user) {
            throw new Error("User not found")
        }

        res.send(user)

    } catch (error) {
        res.status(404).send(error.message)
    }
})

// Delete userRoutes By ID
router.delete('/delete_user', async (req, res) => {
    const data = req.body;

    try {
        const user = await User.findOneAndDelete({ email_address: data.email_address })

        if (!user) {
            throw new Error("User not found")
        }

        res.send(user);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

export { router as UserRouter }