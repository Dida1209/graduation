/**
 * Created by lenovo-pc on 2017/3/9.
 */
var mongoose=require('mongoose');

var OnlineTestSchema=new mongoose.Schema({
    quetion:{
        type:String,
        unique:true
    },
    choose:{
       A:{
           type:String,
           "default":''
       } ,
        B:{
           type:String,
            "default":''
        },
        C:{
           type:String,
            "default":''
        },
        D:{
           type:String,
            "default":''
        }
    },
    answer:{
        type:String,
        unique:true
    },
    why:{
        type:String
    }
})

module.exports=OnlineTestSchema;