const express = require("express");

const { users } = require("../data/users.json");

const router = express.Router();
const {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUserById,
    createNewUser,
    getSubcriptionDetailsById
} = require("../controllers/user-controller");

/**
 * Route: /users
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * Parameters: none 
 */
router.get('/', getAllUsers);


/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a purticular user by id
 * Access: Public
 * Parameters: id
 */
router.get('/:id', getUserById);


/**
 * Route: /users
 * Method: POST
 * Description: Create new user
 * Access: Public
 * Parameters: id
 */
router.post('/', createNewUser);

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating user data
 * Access: Public
 * Parameters: id
 */
router.put('/:id', updateUserById);


/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting user by their ID
 * Access: Public
 * Parameters: id
 */
router.delete('/:id', deleteUser);



router.get("/subscription-details/:id", getSubcriptionDetailsById);

// Default export 
module.exports = router;