/**
 * Created by lenovo-pc on 2017/3/8.
 */

var Resource=require('../models/resourceSchema');
var User=require('../models/userSchema');

exports.doLike=function(req,res){
    console.log('2342432   doLike');
    var isLike=req.body.isLike;
    var userId=req.body.userId;
    var resId=req.body.resId;
    if(isLike==1){
        Resource.findOne({_id:resId},function(err,resource){
            if(err){
                console.log('点赞时资源查找失败'+err);
                res.json({
                    success:0,
                    message:'点赞失败'
                })
            }else{
                resource.likeNum++;
                resource.save(function(err,resour){
                    if(err){
                        console.log('点赞时资源保存失败'+err);
                    }else{
                        User.findOne({_id:userId},function(err,user){
                            if(err){
                                console.log('点赞时查找用户失败'+err);
                            }else{
                                user.myLike.reslist.push(resour._id);
                                user.save(function(err,u){
                                    if(err){
                                        console.log('点赞时用户保存失败'+err)
                                    }else{
                                        res.json({
                                            success:1,
                                            likeNum:resour.likeNum,
                                            message:'点赞成功'
                                        })
                                    }
                                })

                            }

                        })

                    }
                })
            }

        })
    }else{
        Resource.findOne({_id:resId},function(err,resource){
            if(err){
                console.log('取消点赞时找不到资源'+err);
                res.json({
                    success:0,
                    message:'取消点赞失败'
                })
            }else{
                resource.likeNum--;
                resource.save(function(err,resour){
                    if(err){
                        console.log('取消点赞时资源保存失败'+err);
                        res.json({
                            success:0,
                            message:'取消点赞失败'
                        })
                    }else{
                        User.findOne({_id:userId},function(err,user){
                            if(err){
                                console.log('用户取消点赞查找时失败'+err);
                                res.json({
                                    success:0,
                                    message:'取消点赞失败'
                                })
                            }else{
                                for(var i=0;i<user.myLike.reslist.length;i++){
                                    if(user.myLike.reslist[i].toString()==resour._id.toString()){
                                        user.myLike.reslist.splice(i,1);
                                    }
                                }
                                user.save(function(err,u){
                                    if(err){
                                        console.log('用户取消点赞后保存失败'+err);
                                        res.json({
                                            success:0,
                                            message:'取消点赞失败'
                                        })
                                    }else{
                                        res.json({
                                            success:1,
                                            likeNum:resour.likeNum,
                                            message:'取消点赞成功'
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }


}

exports.doCollect=function(req,res) {
    console.log('2342432   doCollect');
    var isCollect = req.body.isCollect;
    var userId = req.body.userId;
    var resId = req.body.resId;
    if (isCollect == 1) {
        Resource.findOne({_id: resId}, function (err, resource) {
            if (err) {
                console.log('收藏时资源查找失败' + err);
                res.json({
                    success: 0,
                    message: '收藏失败'
                })
            } else {
                resource.collectNum++;
                resource.save(function (err, resour) {
                    if (err) {
                        console.log('收藏时资源保存失败' + err);
                    } else {
                        User.findOne({_id: userId}, function (err, user) {
                            if (err) {
                                console.log('收藏时查找用户失败' + err);
                            } else {
                                user.myCollect.reslist.push(resour._id);
                                user.save(function (err, u) {
                                    if (err) {
                                        console.log('收藏时用户保存失败' + err)
                                    } else {
                                        res.json({
                                            success: 1,
                                            collectNum: resour.collectNum,
                                            message: '收藏成功'
                                        })
                                    }
                                })

                            }

                        })

                    }
                })
            }

        })
    } else {
        Resource.findOne({_id: resId}, function (err, resource) {
            if (err) {
                console.log('取消收藏时找不到资源' + err);
                res.json({
                    success: 0,
                    message: '取消收藏失败'
                })
            } else {
                resource.collectNum--;
                resource.save(function (err, resour) {
                    if (err) {
                        console.log('取消收藏时资源保存失败' + err);
                        res.json({
                            success: 0,
                            message: '取消收藏失败'
                        })
                    } else {
                        User.findOne({_id: userId}, function (err, user) {
                            if (err) {
                                console.log('用户取消收藏查找时失败' + err);
                                res.json({
                                    success: 0,
                                    message: '取消收藏失败'
                                })
                            } else {
                                for (var i = 0; i < user.myCollect.reslist.length; i++) {
                                    if (user.myCollect.reslist[i].toString() == resour._id.toString()) {
                                        user.myCollect.reslist.splice(i, 1);
                                    }
                                }
                                user.save(function (err, u) {
                                    if (err) {
                                        console.log('用户取消收藏后保存失败' + err);
                                        res.json({
                                            success: 0,
                                            message: '取消收藏失败'
                                        })
                                    } else {
                                        res.json({
                                            success: 1,
                                            collectNum: resour.collectNum,
                                            message: '取消收藏成功'
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }


}