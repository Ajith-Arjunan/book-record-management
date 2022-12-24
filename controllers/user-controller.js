const { UserModel, BookModel } = require("../models");
const userModel = require("../models/user-model");

exports.getAllUsers = async (req, res) => {

    const users = await UserModel.find();

    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Boos Found"
        });
    }

    res.status(200).json({
        success: true,
        data: users
    })
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById({ _id: id });

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
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.deleteOne({ _id: id });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deleted was not found !",
        });

    }

    return res.status(200).json({ success: true, message: "Deleted user successfully" });
};

exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const updatedUserData = await UserModel.findOneAndUpdate({
        _id: id
    }, {
        $set: {
            ...data,
        }
    }, {
        new: true
    });

    // if (!user)
    //     return res.status(404).json({
    //         success: false,
    //         message: "User Not Found"
    //     });


    return res.status(200).json({
        success: true,
        data: updatedUserData,
    });

};

exports.createNewUser = async (req, res) => {
    const { name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const newUser = await UserModel.create({
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });

    return res.status(201).json({
        success: true,
        data: newUser,
    });
};

exports.getSubcriptionDetailsById = async (req, res) => {
    const { id } = req.params;

    const user = await userModel.findById(id);

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

}
