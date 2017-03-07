/**
 * Created by lenovo-pc on 2017/3/6.
 */
var Comment=require('../models/commentSchema');

exports.save=function(req,res){
    var _comment=req.body.comment;
    var user=req.session.user;
    var userId=user._id;
    console.log(_comment+'     bbb       '+userId);

    if(_comment.cid){ //回复

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