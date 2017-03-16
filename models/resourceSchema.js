/**
 * Created by lenovo-pc on 2017/2/28.
 */
var mongoose = require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;

var ResourceSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true
    },
    type:Number,
    subjection:String,
    summary:String,
    flash:String,
    // testList:[{type:ObjectId,ref:'OnlineTest'}],
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


var Resource=mongoose.model('Resource',ResourceSchema);
module.exports=Resource;