const mongoose = require('mongoose');
const {Schema} = mongoose;

async function main(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/relationDB');
        console.log('Connected to DB');
    }catch(err){
        console.log(`Error in Connectivity`, err);
    }
}

const userSchema = new Schema({
    username: String,
    email: String,
});
const postSchema = new Schema({
    content: String,
    likes: Number,
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

 

main();