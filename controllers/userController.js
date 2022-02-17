//Import our models
const { User, Thought } = require('../models');

//User controller section with all functions inside it(GET,POST,PUT, ADD/REMOVE USER)
const userController = {
    GetAllUsers(req, res) {
        //Mongoose model functions
        User.find({})
            .populate({
                path: 'thoughts',
                select: ('-__v')
            })
            .select('-__v')
            .then(userDataDb => res.json(userDataDb))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //GET function by ID
    GetUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .select('-__v')
            .then((userDataDb) => {
                if (!userDataDb) {
                    res.status(404).json({ message: 'No user with that ID!' });
                    return;
                }
                res.json(userDataDb);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //POST function to create a new user
    CreateUser(req, res) {
        console.log('BODY OBJECT:', req.body);
        User.create(req.body)
            .then(userDataDb => res.json(userDataDb))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //PUT function to update a user
    UpdateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })  
            .then((userDataDb) => {
                if (!userDataDb) {
                    res.status(404).json({ message: "No user with that ID!" })
                    return;
                }
                res.json(userDataDb);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //DELETE function(delete user)
    DeleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((userDataDb) => {
                console.log(userDataDb);
                if (!userDataDb) {
                    res.status(404).json({ message: "No user with that ID!" })
                    return;
                }
                User.updateMany(
                    
                    {_id: {$in: userDataDb.friends}},
                    {$pull: {friends: req.params.id}}
                )
                .then(()=> {
                    Thought.deleteMany({username: userDataDb.username})
                    .then(()=>{
                        res.json({message: 'Successfully deleted this user!'})
                    })
                    .catch((err) => {res.status(400).json(err)})
                })
                .catch((err) => {res.status(400).json(err)})
            })
            .catch((err) => {res.status(400).json(err)})
    },
    //Add friend Function
    AddFriend(req,res){
        User.findByIdAndUpdate(
            {_id: req.params.id},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
            )
            .select('-__v')
            .then((userDataDb)=> {
                if(!userDataDb){
                    res.status(404).json({ message: "No user with that ID!" })
                    return;
                }
                res.json(userDataDb);
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    },
    //Remove friend function
    RemoveFriend(req,res){
        User.findByIdAndUpdate(
            {_id: req.params.id},
            {$pull: {friends: req.params.friendId}},
            {new: true, runValidators: true}
        )
        .then((userDataDb) => {
            if(!userDataDb){
                res.status(404).json({message: 'No friend with that ID!'});
                return;
            }
            res.json(userDataDb)
        })
            .catch((err)=>{
                res.status(400).json(err)
            })
        }
}
//export
module.exports = userController;