const express = require("express");

const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * Parameters: none 
 */
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    })
});


/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a purticular user by id
 * Access: Public
 * Parameters: id
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});


/**
 * Route: /users
 * Method: POST
 * Description: Create new user
 * Access: Public
 * Parameters: id
 */
router.post('/', (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User already exist"
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });

    return res.status(201).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating user data
 * Access: Public
 * Parameters: id
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => each.id === id);

    if (!user)
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        });

    const UpdatedUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: UpdatedUser,
    });

});


/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting user by their ID
 * Access: Public
 * Parameters: id
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deleted was not found !",
        });

    }
    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(200).json({ success: true, data: users });
});

router.get("/subscription-details/:id", (req, res) => {
    const { id } = req.params;

    const user = users.find((each) => each.id === id);

    if (!user)
        return res.status(404).json({ success: false, message: "User not found!" });

    const getDateInDay = (data = "") => {
        let date;
        if (data === "") {
            // current date
            date = new Date();
        } else {
            // getting date on basis of variable
            date = new Date(data);

        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        console.log(days);
        return days;
    };

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    };
    // subscription calc here
    // default jan 1, 1970

    let returnDate = getDateInDay(user.returnDate);
    let currentDate = getDateInDay();
    let subscriptionDate = getDateInDay(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0,
    };

    return res.status(200).json({ success: true, data })

});

// Default export 
module.exports = router;