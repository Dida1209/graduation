/**
 * Created by lenovo-pc on 2017/2/23.
 */
//var

var user=require('../controllers/userCtrl');

module.exports = function(app){
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

//用户功能
    app.post('/user/signup',user.signup);

//做测试尝试
    //测试submenu
    app.get('/submenu',function(req,res){
        res.render('submenu',{

        })
    })
}