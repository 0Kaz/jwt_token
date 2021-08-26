const express = require('express')
const app = express()
const {server} = require('./server/db')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()


app.use(cors({ credentials: true,
    origin: 'http://localhost:3000'}))
app.use(express.urlencoded({extended: true})) //for all routes
app.use(express.json()) //Translate all responses into JSON

app.post('/login', async (req,res)=> {
    try{
        const {email,password} = req.body 
        let user = await User.findOne({
            email
        })

        if(!user){
            return res.status(400).json({
                message: 'User do not exist'
            })
        }

        const encryption = await bcrypt.compare(password, user.password)

        if (!encryption){
            return res.status(400).json({message: "Password incorrect, please try again"})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        
        jwt.sign(payload , process.env.DB_TOKEN, {expiresIn: 3600}, (err, token) => {
           return res.status(200).json({success: true, token: token , message: 'login success' })
        } )

    } catch(error) {
        return res.status(500).json({message: 'Something happened', error: error})
    }
})


app.post('/signup', async (req,res) =>{
    try {
        //recuperer username email password
        const {username, email, password} = req.body
        let user = await User.findOne({email})
        //make sure that the email does not exist 
        if(user){
           return res.status(400).json({success:false, message: 'User Already exist'})
        }
        // if not, create new user
        user = new User({
            username,
            email,
            password
        })

        //before saving user , use bcrypt 

        //BCRYPT
        
        //WE ENCRYPTED PASSWORD BETWEEN MONGO AND MONGOOSE 
        //ON POST METHOD FOR REGISTRATION 
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt )
      

        //after bcrypt, save 
        await user.save()
        
        //IF I HAVE ENCRYPTED MY PASSWORD, HOW CAN I LOG IN IN THE CLIENT ? 
        //HOW CAN REACT READ THIS PASSWORD ? 

        //BACKEND 

        // MONGO / USER, PRODUCTS etc... 

        // mongoose + atlas (local) 

        //JWT 
        //now generate JWT key for CLIENT FRONT END 
        const payload = {
            user: {
                id: user.id
            }
        }

        //payload id
        jwt.sign(payload , process.env.DB_TOKEN, {expiresIn: 10000}, (err, token) => {
           return res.status(200).json({success: true, token: token , message: 'registration succesfull' })
        } )

    } catch(error) {
       return res.status(500).json({message: 'Something happened', error: error})
    }
})
app.listen(3001,()=>{
    console.log('http://localhost:3001')
    server
})