const UserModel = require("../models/user.js")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');


class User {

	static signUp(req,res) {
		var dataInputUser = {
			password: req.body.password,
			email: req.body.email,
			username: req.body.username	
		}
		var hash = bcrypt.hashSync(req.body.password, 10);
		dataInputUser.password = hash

		UserModel.create(dataInputUser)
		.then(dataUser=>{
			res.status(200).json({message:"signup succeed",dataUser})
		})
		.catch(err=>{
			res.status(400).json({message:err.message})
		})				
    }
    
	static signIn(req,res) {
        console.log("msk signin");
        
        UserModel.findOne({email:req.body.email})
        .then(dataUser=>{
            if(dataUser !== null) {
                const compare = bcrypt.compareSync(req.body.password,dataUser.password);
                if(compare) {
                    const token = jwt.sign({userId:dataUser._id},process.env.JWT_SALT)
                    res.status(200).json({message:"signin succeed",token,dataUser})    
                }else{
                    res.status(500).json({message:"invalid email/password"})    
                }
            }else{
                res.status(500).json({message:"invalid email/password"})
            } 
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static showOne(req,res) {
        const decoded = jwt.verify(req.headers.token,process.env.JWT_SALT)
        UserModel.findOne({_id: decoded.userId})
        .then(dataUser=>{
            res.status(200).json(dataUser)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }
    
}

module.exports = User