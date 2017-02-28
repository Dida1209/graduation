/**
 * Created by lenovo-pc on 2017/2/28.
 */

(function(){
    //注册
    var body=document.body;
    var signupBlock=document.getElementById('signupModal'); //注册面板
    var signupBtn=document.getElementById('signupBtn');  //注册按钮
    var signupName=document.getElementById('signupName');  //用户名
    var signupPassword=document.getElementById('signupPassword');  //用户密码
    //登录
    var signinBlock=document.getElementById('signinModal');  //登录面板
    var signinBtn=document.getElementById('signinBtn');  //登录按钮
    var signinName=document.getElementById('signinName');  //用户名
    var signinPassword=document.getElementById('signinPassword');  //用户密码
    //用户名、密码不为空
    function formCheck(name,pass){
        if(name==''||pass==''){
            return false;
        }
        else return true;
    }
    //表格提交
    function formPost(name,password,url){
        $.ajax({
            url:url,
            type: 'post',
            dataType: 'json',
            data:{
                name:name,
                password:password
            },
            success:function(data){
                console.log('signup success')
                errorShow(data.message);
            }
        })
    }

    signupBtn.addEventListener('click',function(){
        if(formCheck(signupName.value,signupPassword.value)){
            // console.log('/signup formPost');
            formPost(signupName.value,signupPassword.value,'/user/signup');
        }else{
            errorShow('注册用户名、密码不能为空！');
        }
    });

    signinBtn.addEventListener('click',function(){
        if(formCheck(signinName.value,signinPassword.value)){
            formPost(signinName.value,signinPassword.value,'/user/signin');
        }else{
            errorShow('登录用户名、密码不能为空！');
        }
    })
})()
