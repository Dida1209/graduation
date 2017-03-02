/**
 * Created by lenovo-pc on 2017/2/28.
 */

(function(){
    //注册
    var signupBtn=document.querySelectorAll('.data-aim')[0];
    var signupBlock=document.getElementById('signupModal'); //注册面板
    var signupClose=document.querySelectorAll('.closeBtn')[0];
    var signupSubmit=document.getElementById('signupSubmit');  //注册按钮
    var signupName=document.getElementById('signupName');  //用户名
    var signupPassword=document.getElementById('signupPassword');  //用户密码
    //登录
    var signinBtn=document.querySelectorAll('.data-aim')[1];
    var signinBlock=document.getElementById('signinModal');  //登录面板
    var signinClose=document.querySelectorAll('.closeBtn')[1];
    var signinSubmit=document.getElementById('signinSubmit');  //登录按钮
    var signinName=document.getElementById('signinName');  //用户名
    var signinPassword=document.getElementById('signinPassword');  //用户密码
    //退出
    var loginoutBtn=document.getElementById('loginout');
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
                if(data.success==1){
                    removeIn();
                }
                else{
                    console.log('signup success')
                    errorShow(data.message);
                }
            }
        })
    }

    window.onload=removeIn();


    function removeIn(){
        removeClass(signupBlock,'in');
        removeClass(signinBlock,'in');
    }
    if(signupBtn){
        signupBtn.addEventListener('click',function(){
            addClass(signupBlock,'in');
        })
    }

    if(signinBtn){
        signinBtn.addEventListener('click',function(){
            addClass(signinBlock,'in');
        })
    }

    if(loginoutBtn){
        loginoutBtn.addEventListener('click',function(){
            $.ajax({
                url:'/user/loginout',
                type: 'get',
                success:function(data){
                    console.log('signup success')
                    errorShow(data.message);
                }
            })
        })
    }

    signupSubmit.addEventListener('click',function(){
        if(formCheck(signupName.value,signupPassword.value)){
            // console.log('/signup formPost');
            removeIn();
            formPost(signupName.value,signupPassword.value,'/user/signup');
        }else{
            errorShow('注册用户名、密码不能为空！');
        }
    });

    signinSubmit.addEventListener('click',function(){
        if(formCheck(signinName.value,signinPassword.value)){
            removeIn();
            formPost(signinName.value,signinPassword.value,'/user/signin');
        }else{
            errorShow('登录用户名、密码不能为空！');
        }
    })

    signupClose.addEventListener('click',function(){
        removeIn();
    })

    signinClose.addEventListener('click',function(){
        removeIn();
    })
})()
