/**
* Created by lenovo-pc on 2017/3/6.
*/
var Comment=require('../models/commentSchema');
var User=require('../models/userSchema');
var Resource=require('../models/resourceSchema');

exports.save=function(req,res){
var _comment=req.body.comment;
var user=req.session.user;
var userId=user._id;
if(_comment.cid){ //回复
    Comment.findOne({_id:_comment.cid},function(err,comment){
        if(err){
            console.log('回复没找到对应的评论');
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
        }else{
            User.findOne({_id:userId})
                .exec(function(err,user){
                    for(var i=0;i<user.myComment.reslist.length;i++){
                        if(user.myComment.reslist[i].toString()==com.resource.toString()){
                            user.myComment.reslist.splice(i,1);
                            i--;
                        }
                    }
                    user.myComment.reslist.push(com.resource);
                    user.save(function(err,u){
                        if(err){
                            console.log(err);
                        }else{
                            Resource.findOne({_id:com.resource})
                                .exec(function(err,resource){
                                    resource.commentNum++;
                                    resource.save(function(err,resour){
                                        if(err){
                                            console.log(err);
                                        }
                                        res.redirect('/resource/'+com.resource);
                                    })})}})})}})}}