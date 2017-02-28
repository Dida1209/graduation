/**
 * Created by lenovo-pc on 2017/2/28.
 */
function errorShow(message){
    var errorBlock=document.getElementById('errorMessage');
    var errorMes=document.getElementById('errorMes');
    var errorClose=document.getElementById('errorBtn');
    var errorbg=document.getElementById('errorbg');

    errorMes.innerHTML=message;
    console.log('错误信息',message);
    errorbg.style.display='block';

    errorClose.addEventListener('click',function(e){
        errorbg.style.display='none';
        e.stopPropagation();
    })
}