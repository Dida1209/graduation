/**
 * Created by lenovo-pc on 2017/3/8.
 */
var User=require('../models/userSchema');
var Resource=require('../models/resourceSchema');

exports.findLike=function(req,res){
    var _user=req.session.user;
    var likeres=[];
    // console.log(_user,'                ',_user.myLike.reslist.length);
    User.findOne({_id:_user._id})
        .populate('myLike.reslist')
        .exec(function(err,user) {
            res.render('user', {
                resources: user.myLike.reslist
            });
        })

    //     if (err) {
    //         console.log('搜索我的点赞时，查找用户失败' + err);
    //     } else {
    //         if (user.myLike.reslist.length > 0) {
    //             for (var i = 0; i < user.myLike.reslist.length; i++) {
    //                 Resource.findOne({_id: user.myLike.reslist[i]})
    //                     .exec(function (err, resource) {
    //                         if (err) {
    //                             console.log('user的资源查找出错' + err);
    //                         } else {
    //                             likeres.push(resource);
    //                             console.log(likeres);
    //                         }
    //                     })
    //             }
    //             console.log('kaishi render');
    //             res.render('user', {
    //                 resources: likeres
    //             });
    //         } else {
    //             console.log('没有点赞资源呢');
    //             res.render('user', {
    //                 resources: likeres,
    //                 message: '没有点赞的资源呢'
    //             })
    //         }
    //
    //     }
    //
    // })

}