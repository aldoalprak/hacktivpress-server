const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var numericChecker = new RegExp("^(?=.*[0-9])");
 
const userSchema = new Schema({
 email: {
 	type:String,
 	unique:true,
 	required:true
 },
 username: {
 	type:String,
 	unique:true,
 	required:true
 }, 
 password: {
 	type:String,
 	required:true,
 	validate:{
 		validator: function(value) {
 			return numericChecker.test(value)
 		},
 		message: "password must contain numerical"
 	}
 }
},{timestamps:true});



const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel