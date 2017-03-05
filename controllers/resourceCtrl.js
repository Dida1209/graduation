/**
 * Created by lenovo-pc on 2017/3/3.
 */
var Resource=require('../models/resourceSchema');

exports.save=function(req,res){
    console.log("...............");
    var course=req.body.course;
    //console.log(course);
    var _resource=new Resource({
        title:course.title,
        type:course.type,
        subjection:course.subjection,
        summary:course.summary,
        flash:course.flash
    })
    console.log(_resource);
    _resource.save(function(err,resource){
        if(err){
            console.log(err+ '  '+ _resource);
        }
        console.log('11111111111');
        res.redirect('/resource');
    })
}