/**
 * Created by lenovo-pc on 2017/3/3.
 */
var Resource=require('../models/resourceSchema');

exports.save=function(req,res){
    console.log("...............");
    var course=req.body.course;
    console.log(course);
    var _resource=new Resource({
        title:resource.title,
        type:resource.type,
        subjection:resource.subjection,
        summary:resource.summary,
        flash:resource.flash
    })
    _resource.save(function(err,resource){
        if(err){
            console.log(err+ '  '+ _resource);
        }
        res.redirect('/resource');
    })
}