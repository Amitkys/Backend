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

const orderSchema = new Schema({
    item: String,
    price: Number
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
});
// moongse schema must be written before creating models
customerSchema.pre("findOneAndDelete", async () => {
    console.log("Pre Middleware");
});
customerSchema.post("findOneAndDelete", async () => {
    console.log("Post Middleware");
});


const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);
/*
const addCustomer = async() => {

    let cust1 = new Customer(
        {name: "Amit Kumar"}
    );

    let order1 = await Order.findOne({item: "Chips"});
    let order2 = await Order.findOne({item: "Samosa"});

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    let result = await cust1.save();
    console.log(result);
}
*/
// function to be called
//addCustomer();
/*
const findCustomer = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
}
findCustomer();
*/
/*
const addOrders = async() => {
    let result = await Order.insertMany([
        {item: "Samosa", price: 12},
        {item: "Chips", price: 10},
        {item: "Chocolate:", price: 40}
    ]);
    console.log(result);
}

addOrders();

*/

const addCustomer = async () => {
    let newCust = new Customer({
        name: "Mohan",
    });

    let newOrder = new Order({
        item: "Pizza",
        price: 270,
    });

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("New Data Added successfully");
}

// addCustomer();

const delCust = async () => {
    let data = await Customer.findOneAndDelete({ _id: '668d42b7cb64d795fe422cd0' });
    console.log(data);
};

delCust();










main();