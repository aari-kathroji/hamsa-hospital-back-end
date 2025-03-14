import mongoose from "mongoose";
const url="mongodb+srv://vivekvardhannada:UFSMQM0yn26DfeCu@cluster0.4xn2v.mongodb.net/Hamsa-Hospital";
const db_con=mongoose.connection;
try{
    mongoose.connect(url);
    console.log("Connected to MongoDB.Server is running on Port 3000");
}catch(error){
    console.log(error);
}

export default db_con;