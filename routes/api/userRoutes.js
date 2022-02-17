//Imports
const router = require('express').Router();

const {
    GetAllUsers,
    GetUserById,
    CreateUser,
    UpdateUser,
    DeleteUser,
    AddFriend,
    RemoveFriend
} = require('../../controllers/userController')

//ROUTES(GET,POST,PUT,DELETE)
router
    //Route => localhost:3001/api/users
    .route('/')
    .get(GetAllUsers)
    .post(CreateUser)

router
    //Route => localhost:3001/api/users/:id with id param
    .route('/:id')
    .get(GetUserById)
    .put(UpdateUser)
    .delete(DeleteUser)

router
    //Route => localhost:3001/api/users/:id/friends/:friendId
    .route('/:id/friends/:friendId')
    .post(AddFriend)
    .delete(RemoveFriend)

//export
module.exports = router