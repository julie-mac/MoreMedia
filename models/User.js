const { Schema, model } = require('mongoose');
const Thought = require('./thought');

//Creating the User schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            //RegEx used to match an email address
            match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
        },
        thoughts: [ // An array containing all the user's thoughts
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'users'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)


//Virtual for friend count!
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

//Initiating the User schema as a model
const User = model('user', userSchema);

module.exports = User;