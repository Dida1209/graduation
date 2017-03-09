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
            type:String
       } ,
        B:{
           type:String
        },
        C:{
           type:String
        },
        D:{
           type:String
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

var OnlineTest=mongoose.model('OnlineTest',OnlineTestSchema);
module.exports=OnlineTest;