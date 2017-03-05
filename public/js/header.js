/**
 * Created by lenovo-pc on 2017/2/28.
 */

(function(){
    //注册表单
    var signupform=document.getElementById('signupForm');
    var signupName=document.getElementById('signupName');  //用户名
    var signupPassword=document.getElementById('signupPassword');  //用户密码
    //登录表单
    var signinform=document.getElementById('signinForm');
    var signinName=document.getElementById('signinName');  //用户名
    var signinPassword=document.getElementById('signinPassword');  //用户密码
    //用户名、密码不为空
    function formCheck(name,pass){
        if(name==''||pass==''){
            return false;
        }
        else return true;
    }

    signupform.addEventListener('submit',function(event){
        console.log(this);
        //检查表单格式
        if(formCheck(signupName.value,signupPassword.value)){
            console.log('form check');
            this.submit();
        }
        else{
            console.log('event.preventDefault()');
            event.preventDefault();
            errorShow('注册用户名、密码不能为空！');
        }
    })

    signinform.addEventListener('submit',function(event){
        console.log(this);
        //检查表单格式
        if(formCheck(signinName.value,signinPassword.value)){
            console.log('form check');
            this.submit();
        }
        else{
            console.log('event.preventDefault()');
            event.preventDefault();
            errorShow('注册用户名、密码不能为空！');
        }
    })


})()
