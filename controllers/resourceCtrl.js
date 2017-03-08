/**
 * Created by lenovo-pc on 2017/3/3.
 */
var Resource=require('../models/resourceSchema');
var User=require('../models/userSchema');
var Comment=require('../models/commentSchema');

exports.save=function(req,res){
    console.log("...............");
    var _course=req.body.course;
    //console.log(resource);
    var _resource=new Resource({
        title:_course.title,
        type:_course.type,
        subjection:_course.subjection,
        summary:_course.summary,
        flash:_course.flash
    });
    console.log('000000000'+_resource);
    _resource.save(function(err,resource){
        if(err){
            console.log(err);
        }
        console.log('11111111111'+resource._id);
        res.redirect('/resource/'+resource._id);
    })
}
exports.findRes=function(req,res){
    var resId=req.params.id;
    var user=req.session.user;
    var userId=user._id;
    var ifdoLike=false;
    var ifdoCollect=false;
    var ifdoComment=false;

    console.log(resId);
    Resource.findOne({_id:resId},function(err,resour){
        Comment.find({resource:resId})
            .populate('from','name')
            .populate('reply.from reply.to','name')
            .exec(function(err,comments){
                if(err){
                    console.log(err);
                }
                console.log(resour+"  aaaa  "+comments);
                console.log('shsihis'+resour.type);
                User.findOne({_id:userId},function(err,user){
                    for(var i=0;i<user.myLike.reslist.length;i++){
                        if(user.myLike.reslist[i].toString()==resour._id.toString()){
                            ifdoLike=true;
                            console.log('dianzanguolede');
                        }
                    }
                    for(var i=0;i<user.myCollect.reslist.length;i++){
                        if(user.myCollect.reslist[i]==resour._id){
                            ifdoCollect=true;
                        }
                    }
                    for(var i=0;i<user.myComment.reslist.length;i++){
                        if(user.myComment.reslist[i]==resour._id){
                            ifdoComment=true;
                        }
                    }
                    console.log(ifdoLike,ifdoCollect,ifdoComment);
                    if(resour.type==1){
                        res.render('resource',{
                            ifdoLike:ifdoLike,
                            ifdoCollect:ifdoCollect,
                            ifdoComment:ifdoComment,
                            resource:resour,
                            video:resour,
                            comments:comments
                        })
                        console.log({
                            ifdoLike:ifdoLike,
                            ifdoCollect:ifdoCollect,
                            ifdoComment:ifdoComment,
                            resource:resour,
                            video:resour,
                            comments:comments
                        });
                    }
                    if(resour.type==2){
                        res.render('resource',{
                            ifdoLike:ifdoLike,
                            ifdoCollect:ifdoCollect,
                            ifdoComment:ifdoComment,
                            resource:resour,
                            document:resour,
                            comment:comments
                        })
                    }
                    if(resour.type==3){
                        res.render('resource',{
                            ifdoLike:ifdoLike,
                            ifdoCollect:ifdoCollect,
                            ifdoComment:ifdoComment,
                            resource:resour,
                            test:resour,
                            comment:comments
                        })
                    }
                })

            })
    })
}

