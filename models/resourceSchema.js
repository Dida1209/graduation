/**
 * Created by lenovo-pc on 2017/2/28.
 */
var mongoose = require('mongoose');

var ResourceSchema = mongoose.Schema({
    title:{
        type:String,
        unique:true
    },
    type:{
        type:Number,
        unique:true
    },
    subjection:{
        type:String,
        unique:true
    },
    summary:{
        type:String,
        unique:true
    },
    flash:{
        type:String,
        unique:true
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
    collectionNum:{
        type:Number,
        "default":0
    },
    likeNum:{
        type:Number,
        "default":0
    }
})

ResourceSchema.pre('save',function(next){
    if(this.isnew){
        this.meta.creatAt=this.meta.updateAt=Date.now();
    }else{
        this.updateAt=Date.now();
    }
    next();
})

var Resource=mongoose.model('Resource',ResourceSchema);
module.exports=Resource;