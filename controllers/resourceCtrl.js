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
    })
    console.log(_resource);
    _resource.save(function(err,resource){
        if(err){
            console.log(err+ '  '+ _resource);
        }
        console.log('11111111111');
        res.redirect('/resource/'+resource.id);
    })
}
exports.findRes=function(req,res){
    var resId=req.body.params;
    console.log(resId)
}