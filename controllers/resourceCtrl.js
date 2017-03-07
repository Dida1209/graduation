/**
 * Created by lenovo-pc on 2017/3/3.
 */
var Resource=require('../models/resourceSchema');
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
                if(resour.type==1){
                    res.render('resource',{
                        resource:resour,
                        video:resour,
                        comments:comments
                    })
                }
                if(resour.type==2){
                    res.render('resource',{
                        resource:resour,
                        document:resour,
                        comment:comments
                    })
                }
                if(resour.type==3){
                    res.render('resource',{
                        resource:resour,
                        test:resour,
                        comment:comments
                    })
                }
            })
    })

}