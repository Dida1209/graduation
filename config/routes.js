/**
 * Created by lenovo-pc on 2017/2/23.
 */
//var


module.exports = function(app){
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
}