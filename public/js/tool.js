/**
 * Created by lenovo-pc on 2017/2/28.
 */
function hasClass(obj,cls){
    return obj.className.match(new RegExp('(^|\\s)'+cls+'(\\s|$)'));
}
function addClass(obj,cls){
    if(!hasClass(obj,cls)) obj.className+=" "+cls;
}
function removeClass(obj,cls){
    if(hasClass(obj,cls)){
        let reg=new RegExp('(^|\\s)'+cls+'(\\s|$)');
        obj.className=obj.className.replace(reg,'');
    }
}
