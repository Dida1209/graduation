/**
 * Created by lenovo-pc on 2017/3/6.
 */
var mongoose=require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;

var CommentSchema=new mongoose.Schema({
    resource:{type:ObjectId,ref:'Resource'},
    from:{type:ObjectId,ref:'User'},
    content:String,
    reply:[{
        from:{type:ObjectId,ref:'User'},
        to:{type:ObjectId,ref:'User'},
        content:String
    }],
    meta:{
        createAt:{
            type:Date,
            'default':Date.now()
        },
        updateAt:{
            type:Date,
            'default':Date.now()
        }
    }
})
CommentSchema.pre('save',function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
})
var Comment=mongoose.model('Comment',CommentSchema);
module.exports=Comment;