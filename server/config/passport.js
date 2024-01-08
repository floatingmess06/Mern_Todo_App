const passport=require('passport');
const LocalStrategy =require('passport-local');
const { connection }=require( './db');
const {validPasssword}=require('../lib/passwordUtils');
const userModel = require('../config/models/user');

const customFields = {
    usernameField:'uname',
    passwordField:'pass'
};

const verifyCallback = (username,password,donecallback)=>{
    userModel.findOne({username:username})
    .then((user)=>{
        if(!user){return donecallback(null,false);}
        const isValid =validPasssword(password,user.hash,user.salt);
        if(isValid){
            return donecallback(null,user);
        }else{
            return donecallback(null,false);
        }
    }).catch((err)=>{
        return donecallback(err);
    })
}

const strategy = new LocalStrategy(customFields,verifyCallback);
passport.use(strategy);

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((userId,done)=>{
    userModel.findById(userId)
    .then((user)=>{
        done(null,user);
    })
    .catch(err=>done(err))
});