/**
 * Created by lenovo-pc on 2017/3/6.
 */
var Comment=require('../models/commentSchema');
// var User=require('../models/userSchema');//测试用的

exports.save=function(req,res){
    var _comment=req.body.comment;
    var user=req.session.user;
    var userId=user._id;
    console.log(_comment+'     bbb       '+userId);

    if(_comment.cid){ //回复
        Comment.findOne({_id:_comment.cid},function(err,comment){
            if(err){
                console.log('00000023291   回复没找到对应的评论');
            }
            var reply={
                from:userId,
                to:_comment.tid,
                content:_comment.content
            }
            comment.reply.push(reply);
            console.log(comment,reply);
            comment.save(function(err,com){
                if(err){
                    console.log(err);
                }
                res.redirect('/resource/'+com.resource);
            })
        })
    }else{
        var comment=new Comment({
            resource:_comment.resource,
            from:userId,
            content:_comment.content
        })
        comment.save(function(err,com){
            if(err){
                console.log(err);
            }
            res.redirect('/resource/'+com.resource);
        })

    }
}