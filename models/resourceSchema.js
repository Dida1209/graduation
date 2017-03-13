/**
 * Created by lenovo-pc on 2017/2/28.
 */
var mongoose = require('mongoose');
var OnlineTestSchema=require('./onlineTestSchema');

var ResourceSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true
    },
    type:Number,
    subjection:String,
    summary:String,
    flash:{
        type:String,
        unique:true
    },
    testList:[OnlineTestSchema],
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
    collectNum:{
        type:Number,
        "default":0
    },
    commentNum:{
        type:Number,
        "default":0
    },
    likeNum:{
        type:Number,
        "default":0
    }
})

ResourceSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.creatAt=this.meta.updateAt=Date.now();
    }else{
        this.updateAt=Date.now();
        console.log('resource presave');
    }
    next();
})

OnlineTestSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.creatAt=this.meta.updateAt=Date.now();
    }else{
        this.updateAt=Date.now();
        console.log('onlinetest presave');
    }
    next();
})

var Resource=mongoose.model('Resource',ResourceSchema);
var OnlineTest=mongoose.model('OnlineTest',OnlineTestSchema);
module.exports=Resource;
module.exports=OnlineTest;