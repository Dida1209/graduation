/**
 * Created by lenovo-pc on 2017/2/23.
 */
//var

var user=require('../controllers/userCtrl');
var resource=require('../controllers/resourceCtrl');

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
        app.get('/resource',function(req,res){
            res.render('resource',{

            })
        })

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

//后台功能
    app.post('/admin/course/new',resource.save);

//做测试尝试
    //测试submenu
    app.get('/submenu',function(req,res){
        res.render('submenu',{

        })
    })
}