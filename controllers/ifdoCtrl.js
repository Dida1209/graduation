/**
 * Created by lenovo-pc on 2017/3/8.
 */
var User=require('../models/userSchema');

exports.ifdoUser=function(user){
    // var _user=req.session.user;
    console.log(user);
    var ifdoLike=false;
    var ifdoCollect=false;
    var ifdoComment=false;
    User.findOne({_id:user._id})
        .exec(function(err,user){
            for(var i=0;i<user.myLike.reslist.length;i++){
                if(user.myLike.reslist[i].toString()==resour._id.toString()){
                    ifdoLike=true;
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
        })
    console.log(ifdoLike,ifdoCollect,ifdoComment);
    return { ifdoLike:ifdoLike,ifdoCollect:ifdoCollect,ifdoComment:ifdoComment}
}