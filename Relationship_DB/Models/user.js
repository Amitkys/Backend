const mongoose = require('mongoose');
const {Schema} = mongoose;
async function main(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/relationDB');
        console.log(`Connected to DB`);
    }catch(err){
        console.log(`Error in Connectivity`, err);
    }
}

const userSchema = new Schema({
    username: String,
    address: [
         {
            location: String, 
            city: String,
         },
    ],
});
const User = mongoose.model("User", userSchema);
// to add initial data into model
const addUsers = async() => {
    let user1 = new User({
        username: "AmitKYs",
        address: [
            {
                location: "Kankarbag",
                city: "Patna",
            }
        ]
    })

    // another way to add address
    user1.address.push({location: "Sardalpatti", city: "Sitamarhi"});
    let result = await user1.save();
    console.log(result);
}

addUsers();
main();