/**
 * Created by lenovo-pc on 2017/2/28.
 */
var mongoose = require('mongoose');
var SALT_WORK_FACTOR=10;
var bcrypt=require('bcryptjs');
var objectId=mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        "default": false
    },
    meta:{
        createAt:{
            type:Date,
            "default":Date.now()
        },
        updateAt:{
            type:Date,
            "default":Date.now()
        }
    },
    myFoot:{
        reslist:[{type:objectId,ref:"Resource"}],
        "default":[]
    },
    myLike:{
        reslist:[{type:objectId,ref:"Resource"}],
        "default":[]
    },
    myCollect:{
        reslist:[{type:objectId,ref:"Resource"}],
        "default":[]
    },
    myComment:{
        reslist:[{type:objectId,ref:"Resource"}],
        "default":[]
    }
});

UserSchema.pre('save',function(next){
    let user=this;
    if(this.isNew){
        this.meta.creatAt=this.meta.updateAt=Date.now();
    }else{
        this.updateAt=Date.now();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password=hash;
            next();
        })
    })
})

UserSchema.methods={
    comparePassword:function(_password,cb){
        bcrypt.compare(_password,this.password,function(err,isMatch){
            if(err){
                return cb(err);
            }else{
                return cb(null,isMatch);
            }
        })
    }
}

var User=mongoose.model('User',UserSchema);
module.exports=User;