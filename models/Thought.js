const { Schema, model } = require('mongoose');
const User = require('./user');

//Initializing the reactions as a subdocument of the Thought model
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //The formatDate function is defined later in this file and is used in both the Thought model and the Reaction subdocument
        get: timestamp => formatDate(timestamp)
    }
    
})

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => formatDate(timestamp)
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        reactions: [reactionSchema]
    },
    { 
        //Adding this section allows for virtuals in a model/schema
        toJSON: {
            virtuals: true
        }
    },
)

//Virtual for the reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//Initiating the Thought schema as a model
const Thought = model('thought', thoughtSchema);

//Defining a function to format the date for when thoughts and reactions are posted
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false
    };
    return date.toLocaleString('en-US', options);
}

module.exports = Thought;