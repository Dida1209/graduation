/**
 * Created by lenovo-pc on 2017/3/3.
 */
var Resource=require('../models/resourceSchema');

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
        console.log('11111111111'+resource);
        res.redirect('/resource/'+resource._id);
    })
}
exports.findRes=function(req,res){
    var resId=req.params.id;
    console.log(resId);
    Resource.findOne({_id:resId},function(err,resource){
        if(err){
            console.log(err);
        }
        console.log(resource);
        console.log('shsihis'+resource.type);
        if(resource.type==1){
            res.render('resource',{
                resource:resource,
                video:resource
            })
        }
        if(resource.type==2){
            res.render('resource',{
                resource:resource,
                document:resource
            })
        }
        if(resource.type==3){
            res.render('resource',{
                resource:resource,
                test:resource
            })
        }
    })
}