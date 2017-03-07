/**
 * Created by lenovo-pc on 2017/2/23.
 */
var user=require('../controllers/userCtrl');
var resource=require('../controllers/resourceCtrl');
var comment=require('../controllers/commentCtrl');

module.exports = function(app){
//pre heandle user
    app.use(function(req,res,next){
        var _user=req.session.user;
            app.locals.user=_user;
            next();
            //console.log(req.session.user);
    });
//所以要加载的页面
    //首页
        app.get('/',function(req,res){
            res.render('index',{

            })
        })

    //资源
        app.get('/resource/:id',resource.findRes)

    //总结
        app.get('/summarize',function(req,res){
            res.render('summarize',{

            })
        })

    //用户
        app.get('/user',function(req,res){
            res.render('user',{

            })
        })
    //背景
        app.get('/backstage',function(req,res){
            res.render('backstage',{})
        })

//用户功能
    app.post('/user/signup',user.signup);
    app.post('/user/signin',user.signin);
    app.get('/user/loginout',user.loginout);
    app.post('/user/comment',user.isLogin,comment.save);

//后台功能
    app.post('/admin/course/new',resource.save);

//做测试尝试
    //测试submenu
    // app.get('/submenu',function(req,res){
    //     res.render('resource',{
    //
    //     })
    // })
}