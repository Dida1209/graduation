/**
 * Created by lenovo-pc on 2017/3/3.
 */
var Resource=require('../models/resourceSchema');
var OnlineTest=require('../models/onlineTestSchema');
var User=require('../models/userSchema');
var Comment=require('../models/commentSchema');

exports.save=function(req,res){
    console.log("...............");
    var _course=req.body.course;
    var _resource=new Resource({
        title:_course.title,
        type:_course.type,
        subjection:_course.subjection,
        summary:_course.summary,
        flash:_course.flash
    });
    if(_resource.type==1) {
        _resource.save(function (err, resource) {
            if (err) {
                console.log(err);
            }
            res.redirect('/resource/' + resource._id);
        })
    }
    if(_resource.type==3) {
        var _testList = JSON.parse(_course.test);
        // console.log("_course is",_testList[0]);
        _resource.save(function (err, resource) {
            if (err) {
                console.log(err);
            }
            // console.log(resource);
            for (var i = 0; i < _testList.length; i++) {
                var _onlineTest = new OnlineTest(_testList[i]);
                _onlineTest.resourId = resource._id;
                _onlineTest.save(function (err, onlineTest) {
                    if (err) {
                        console.log('save test err' + err);
                    }
                    // resource.testList.push(onlineTest._id);
                })
            }
            res.redirect('/resource/' + resource._id);
        })
    }
}
exports.update=function(req,res){
    var data=req.body.data;

    console.log(data);
    Resource.findOne({_id:data._id},function(err,resource){
        if(err){
            console.log(err);
        }else{
                resource.title=data.title,
                resource.type=data.type,
                resource.subjection=data.subjection,
                resource.summary=data.summary,
                resource.flash=data.flash,
                resource.save(function(err,resour){
                    if(err){
                        console.log(err);
                    }
                    if(resour.type==3){
                        var _testList=JSON.parse(data.testList);
                        for (var i = 0; i < _testList.length; i++) {
                            OnlineTest.findOne({_id:_testList[i]._id},function(err,onlineTest){
                                onlineTest.question=_testlist[i].question;
                                onlineTest.A=_testlist[i].A;
                                onlineTest.B=_testlist[i].B;
                                onlineTest.C=_testlist[i].C;
                                onlineTest.D=_testlist[i].D;
                                onlineTest.answer=_testlist[i].answer;
                                onlineTest.why=_testlist[i].why;
                                onlineTest.save(function(){
                                    if (err) {
                                        console.log('save test err' + err);
                                    }
                                })
                            })
                        }
                    }
                })
            res.json({success:1,message:'操作成功',resource:resour,testList:_testList});
        }

    })

}

exports.del=function(req,res){
    var data=req.body.data;
    Resource.remove({_id:data._id},function(err,resource){
        if(err){
            console.log(err);
        }else if(data.type==3){
            OnlineTest.remove({resourId:data._id},function(err,onlineTest){
                if(err){
                    console.log(err);
                }else{
                    res.json({success:1,message:'操作成功'});
                }
            })
        }
        else{
            res.json({success:1,message:'操作成功'});
        }
    }
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
                        if(user.myCollect.reslist[i].toString()==resour._id.toString()){
                            ifdoCollect=true;
                        }
                    }
                    for(var i=0;i<user.myComment.reslist.length;i++){
                        if(user.myComment.reslist[i].toString()==resour._id.toString()){
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
                    // if(resour.type==2){
                    //     res.render('resource',{
                    //         ifdoLike:ifdoLike,
                    //         ifdoCollect:ifdoCollect,
                    //         ifdoComment:ifdoComment,
                    //         resource:resour,
                    //         document:resour,
                    //         comment:comments
                    //     })
                    // }
                    if(resour.type==3){
                        OnlineTest.find({resourId:resour._id},function(err,onlinetests){
                            console.log(onlinetests);
                            res.render('resource',{
                                ifdoLike:ifdoLike,
                                ifdoCollect:ifdoCollect,
                                ifdoComment:ifdoComment,
                                resource:resour,
                                test:resour,
                                comment:comments,
                                onlineTest:onlinetests
                            })
                        })
                    }
                })

            })
    })
}
