//import
const {Schema, model} = require('mongoose');

//User schema function to be created
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'What\'s is in a name?, please enter yours so we know what to call you',
            trim: true
        },
        email: {
            type: String,
            required: 'Please enter a valid email address',
            unique: true,
            validate: {
                validator(validEmail){
                    //Regex to validate the email
                    return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(validEmail);
                },
                message: 'Please enter a valid email address'
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//Virtual friend counter
UserSchema.virtual('friendCount').get(function (){
    return this.friends.length
})

//Variable that holds user model
const User = model('User', UserSchema);

//export
module.exports = User