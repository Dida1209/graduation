/**
 * Created by lenovo-pc on 2017/2/28.
 */
var User=require('../models/userSchema');

exports.signup=function(req,res){
    var _user=req.body.user;
    console.log("backstage user"+_user);

    User.findOne({name:_user.name},function(err,user){
        if(err){
            console.log(err);
            res.json({message:err});
        }
        if(user){
            console.log(user);
            res.json({message:'用户已存在'});
        }else{
            var user=new User(_user);
            user.save(function(err,user){
                if(err){
                    res.json({message:err});
                }
                // res.json();
                res.redirect('/');
            })
        }
    })
}

exports.signin = function(req,res) {
    var _user = req.body.user;
    console.log(_user);

    User.findOne({name: _user.name}, function (err, user) {
        if (err) {
            res.json({message: '找不到用户，请先注册，后登陆！'});
        }
        user.comparePassword(_user.password, function (err, isMatch) {
            if (err) {
                res.json({message:'密码错误！'});
            }
            if (isMatch) {
                req.session.user = user;
                console.log('match ' + req.session.user);
                res.redirect('/');
                // res.render('index',{user:user});
            }
            else {
                console.log('no match');
            }
        })
    })
}
exports.loginout=function(req,res){
    req.session.user='';
    console.log('----------------------asasrasras')
    // res.json({mes:'sucess'})
   res.redirect('/');
}