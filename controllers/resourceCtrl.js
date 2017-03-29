/**
 * Created by lenovo-pc on 2017/3/3.
 */
var Resource=require('../models/resourceSchema');
// var OnlineTest=require('../models/onlineTestSchema');
var User=require('../models/userSchema');
var Comment=require('../models/commentSchema');
var moment=require('moment');
//上传文件
var mongo=require('mongodb');
var Busboy=require('busboy');
var Grid=require('gridfs-stream');
//create or use an existing mongodb-native db instance
var db=new mongo.Db('graduation',new mongo.Server("127.0.0.1",27017));
var gfs;
db.open(function (err) {
    if (err) {
        throw err;
    }
    gfs = Grid(db, mongo);
});

exports.save=function(req,res){
    console.log("111111111111111...............");
    // console.log(req.body.doc);
    if(req.body.type){
        var _resource=new Resource({
            title:req.body.title,
            type:req.body.type,
            subjection:req.body.subjection,
            summary:req.body.summary,
            flash:req.body.flash,
            testList:req.body.test
        });
        _resource.save(function (err, resource) {
            if (err) {
                console.log(err);
            }else{
                Resource.findOne({_id:resource._id},function(err,resource){
                    console.log('find chenggong',resource);
                    res.json({"success":1,"resource":resource});
                    // res.render('resource',function(){
                    //
                    // })
                })
            }
        })
    }else{
        var busboy=new Busboy({headers:req.headers});
        console.log('busboy',busboy);
        var fileIds = [];
        var body={};
        console.log("66666666666");
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log('file');
            fileIds.push(new mongo.ObjectId());
            //streaming to gridfs
            var writeStream=gfs.createWriteStream({
                //Alternatively you could read the file using an _id.This is often a better option,since filenames don't have to be unique within the collection.e.g.
                _id: fileIds[fileIds.length-1],
                filename:filename,
                mode:'w',
                content_type:mimetype
            });
            console.log(writeStream);
            file.pipe(writeStream);
        }).on('field',function(key,value){
            body[key]=value;
            console.log('field',body);
        }).on('finish',function(){
            var _res=new Resource({
                    title:body.title,
                    type:body.type,
                    subjection:body.subjection,
                    summary:body.summary
                });
            _res.doc.push.apply(_res.doc, fileIds);
            console.log(_res);
            _res.save(function (err, resour) {
                if (err) {
                    console.log(err);
                }else{
                    Resource.findOne({_id:resour._id},function(err,resource){
                        console.log('find chenggong',resource);
                        res.json({"success":1,"resource":resource});
                    })
                }

            })
        });
        req.pipe(busboy);
    }

    // if(_resource.type==3) {
    //     // var _testList = JSON.parse(_course.test);
    //     // console.log("_course is",_testList[0]);
    //     _resource.save(function (err, resource) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         // console.log(resource);
    //         for (var i = 0; i < _testList.length; i++) {
    //             var _id=resource._id;
    //             (function(){
    //                 var _onlineTest = new OnlineTest(_testList[i]);
    //                 _onlineTest.resourId = _id;
    //                 _onlineTest.save(function (err, onlineTest) {
    //                     if (err) {
    //                         console.log('save test err' + err);
    //                     }
    //                     // resource.testList.push(onlineTest._id);
    //                 })
    //             })(i)(_id)
    //         }
    //         res.redirect('/resource/' + resource._id);
    //     })
    // }
}

exports.saveDoc=function(req,res){
        // console.log(req.body);


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
                    // if(resour.type==3){
                    //     var _testList=JSON.parse(data.testList);
                    //     for (var i = 0; i < _testList.length; i++) {
                    //         OnlineTest.findOne({_id:_testList[i]._id},function(err,onlineTest){
                    //             onlineTest.question=_testlist[i].question;
                    //             onlineTest.A=_testlist[i].A;
                    //             onlineTest.B=_testlist[i].B;
                    //             onlineTest.C=_testlist[i].C;
                    //             onlineTest.D=_testlist[i].D;
                    //             onlineTest.answer=_testlist[i].answer;
                    //             onlineTest.why=_testlist[i].why;
                    //             onlineTest.save(function(){
                    //                 if (err) {
                    //                     console.log('save test err' + err);
                    //                 }
                    //             })
                    //         })
                    //     }
                    // }
                })
            res.json({success:1,message:'操作成功',resource:resour});
        }

    })

}

exports.del=function(req,res){
    var data=req.body.data;
    Resource.remove({_id:data._id},function(err,resource){
        if(err){
            console.log(err);
        }
        // else if(data.type==3){
        //     OnlineTest.remove({resourId:data._id},function(err,onlineTest){
        //         if(err){
        //             console.log(err);
        //         }else{
        //             res.json({success:1,message:'操作成功'});
        //         }
        //     })
        // }
        else{
            res.json({success:1,message:'操作成功'});
        }
    })
}

exports.findAll=function(req,res) {
    var url = req.url;
    var id = req.params.id;
    var resources;
    // console.log(id);
    if (id) {
        Resource.find({_id: id}, function (err, resour) {
            if (err) {

            } else {
                console.log(url, url == '/summarize')
                if (url == '/summarize') {
                    res.render('summarize', {resources: resour});
                }
                else {
                    res.render('backstage', {resources: resour});
                }
            }
        })
    } else {
        if (url == '/summarize') {
            Resource.find({},function(err,resour){
                if(err){

                }else{
                    resources=resour;
                }
            })
            Resource.find().sort({likeNum: -1}).limit(1)
                .exec(function (err, resour) {
                    if (err) {

                    } else {
                        console.log(url, url == '/summarize')
                        res.render('summarize', {resources: resources,hotList:resour});
                    }
                })
        }
        else {
            Resource.find({},function(err,resour){
                if(err){

                }else{
                    res.render('backstage', {resources: resour});
                }
            })
        }
    }


    //         {type:1},function(err,resour){
    //         if(err){
    //             console.log(err);
    //         }else{
    //             resource.push(resour);
    //         }
    //     })
    //
    //     Resource.find({type:3},function(err,resour){
    //         if(err){
    //             console.log(err);
    //         }else{
    //             for(var i=0;i<resour.length;i++){
    //                 (function(){
    //                     OnlineTest.find({resourId:resour[i]._id},function(err,testarr){
    //                         resour[i].testList=testarr;
    //                     })
    //                 })(i);
    //             }
    //             resource.push(resour);
    //         }
    //     })
    // }
}

exports.findRes=function(req,res) {
    var resId = req.params.id;
    console.log(resId,'resid');
    var user = req.session.user;
    if (user) {
        var userId = user._id;
        console.log(userId,'useid');
    }
    var ifdoLike = false;
    var ifdoCollect = false;
    var ifdoComment = false;

    Resource.findOne({_id: resId}, function (err, resour) {
        if (resour.type == 3) {
            resour.testList = JSON.parse(resour.testList);
        }
        console.log(resour.testList);
        if (resour.type == 2){

        }

        Comment.find({resource: resId})
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec(function (err, comments) {
                if (err) {
                    console.log(err);
                }
                console.log("  aaaa  " + comments);
                console.log('shsihis' + resour.type);
                if (user) {
                    User.findOne({_id: userId}, function (err, user) {
                        console.log('find user',user);
                        for (var i = 0; i < user.myLike.reslist.length; i++) {
                            if (user.myLike.reslist[i].toString() == resour._id.toString()) {
                                ifdoLike = true;
                                console.log('dianzanguolede');
                            }
                        }
                        for (var i = 0; i < user.myCollect.reslist.length; i++) {
                            if (user.myCollect.reslist[i].toString() == resour._id.toString()) {
                                ifdoCollect = true;
                            }
                        }
                        for (var i = 0; i < user.myComment.reslist.length; i++) {
                            if (user.myComment.reslist[i].toString() == resour._id.toString()) {
                                ifdoComment = true;
                            }
                        }
                        console.log(ifdoLike, ifdoCollect, ifdoComment);
                        res.render('resource', {
                            ifdoLike: ifdoLike,
                            ifdoCollect: ifdoCollect,
                            ifdoComment: ifdoComment,
                            resource: resour,
                            // video:resour,
                            comments: comments,
                            moment: moment
                        })
                        console.log({
                            ifdoLike: ifdoLike,
                            ifdoCollect: ifdoCollect,
                            ifdoComment: ifdoComment,
                            resource: resour,
                            // video:resour,
                            comments: comments,
                            moment: moment
                        });
                    })
                }
                else {
                    res.render('resource', {
                        ifdoLike: ifdoLike,
                        ifdoCollect: ifdoCollect,
                        ifdoComment: ifdoComment,
                        resource: resour,
                        // video:resour,
                        comments: comments,
                        moment: moment
                    })
                }
                // }
                // if(resour.type==3){
                //     OnlineTest.find({resourId:resour._id},function(err,onlinetests){
                //         console.log(onlinetests);
                //         res.render('resource',{
                //             ifdoLike:ifdoLike,
                //             ifdoCollect:ifdoCollect,
                //             ifdoComment:ifdoComment,
                //             resource:resour,
                //             test:resour,
                //             comment:comments,
                //             onlineTest:onlinetests,
                //             moment:moment
                //         })
                //     })
                // }
            })
    })
}
exports.findType=function(req,res){
    var _type=req.params.type;
    var resource;
    var _key;
    if(_type==1){
        _key='视频';
    }if(_type==2){
        _key='文档';
    }if(_type==3){
        _key='测试';
    }
    Resource.find({type:_type},function(err,resour){
        if(err){

        }   else{
            resource=resour;
        }
    })
    Resource.find().sort({likeNum: -1}).limit(1)
        .exec(function (err, resour) {
            if (err) {

            } else {
                console.log('resource111',resource,"breaknav",_key);
                res.render('summarize', {resources: resource,hotList:resour,breadnav:_key});
            }
        })
}
exports.findKey=function(req,res){
    var _key=req.params.key;
    var pattern=new RegExp("^.*"+_key+".*$");
    console.log(_key);
    var resource=[];
    Resource.find({subjection:pattern},function(err,resourType){
        if(err){

        }else{
            resource=resource.concat(resourType);
        }
    })
    Resource.find({summary:pattern},function(err,resourSum){
        if(err){

        }else{
            resource=resource.concat(resourSum);
        }
    })
    Resource.find({title:pattern},function(err,resourTitle) {
        resource=resource.concat(resourTitle);
        console.log(resource);
    })
    Resource.find().sort({likeNum: -1}).limit(1)
        .exec(function (err, resour) {
            if (err) {

            } else {
                console.log('resource111',resource,"breaknav",_key);
                res.render('summarize', {resources: resource,hotList:resour,breadnav:_key});
            }
        })
}
