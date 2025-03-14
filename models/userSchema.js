import mongoose from "mongoose";
const user=mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role:String,
  gender:String,
  address:String,
  city:String,
  state:String,
  country:String,
  pincode:String
})

export default mongoose.model("User",user);

/*
Example
{
  "name": "Vivek Vardhan Nada",
  "email": "vivekvardhannada@gmail.com",
  "password": "123456",
  "phone": "1234567890",
  "role":"admin",
  "gender":"male",
  "address":"123 Main Street",
  "city":"New York",
  "state":"New York",
  "country":"USA",
  "pincode":"123456"
}

For patient

{
    "name":"John Doe",
    "email":"johndoe@gmail.com",
    "password":"123456",
    "phone":"1234567890",
    "role":"patient",
    "gender":"male",
    "address":"123 Main Street",
    "city":"New York",
    "state":"New York",
    "country":"USA",
    "pincode":"123456"
}
*/