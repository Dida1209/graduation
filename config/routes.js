/**
 * Created by lenovo-pc on 2017/2/23.
 */
var user=require('../controllers/userCtrl');
var resource=require('../controllers/resourceCtrl');
var comment=require('../controllers/commentCtrl');
var share=require('../controllers/shareCtrl');
var userPocket=require('../controllers/userPocketCtrl');

module.exports = function(app){
//pre heandle user
    app.use(function(req,res,next){
        var _user=req.session.user;
            app.locals.user=_user;
            next();
            // console.log('session',req.session.user);
    });
//所以要加载的页面
    //首页
        app.get('/',function(req,res){
            res.render('index',{

            })
        })

    //资源
        app.get('/resource/:id',resource.findRes);
        app.get('/backstage/:id',resource.findAll);//如果是从资源页点击资源目录过来的后台的。
        app.get('/doc/id',resource.findDoc);
    //总结
        app.get('/summarize',resource.findAll);
        app.get('/summarize/:type',resource.findType);

        app.get('/search/:key',resource.findKey);
    //用户
        app.get('/user',user.detail);
    //背景
        app.get('/backstage',resource.findAll);


//用户功能
    app.post('/user/signup',user.signup);
    app.post('/user/signin',user.signin);
    app.get('/user/loginout',user.loginout);
    app.post('/user/doComment',user.isLogin,comment.save);
    app.post('/user/doLike',user.isLogin,share.doLike);
    app.post('/user/doCollect',user.isLogin,share.doCollect);
    app.get('/user/findLike',userPocket.findLike);
    app.get('/user/findCollect',userPocket.findCollect);
    app.get('/user/findComment',userPocket.findComment);
//后台功能
    app.get('/backstage',resource.findAll);
    app.post('/admin/course/new',resource.save);
    app.post('/admin/doc/new',resource.saveDoc);
    app.post('/admin/course/update',resource.update);
    app.post('/admin/course/del',resource.del)
//做测试尝试
    //测试submenu
    app.get('/test',function(req,res){
        res.render('backstage',{

        })
    })
}