/**
 * Created by lenovo-pc on 2017/5/11.
 */
(function(){
    var array=[{x:1393,y:19,w:110,h:30},{x:1527,y:62,w:70,h:30}];

    var canvasImg=document.getElementById("canvasImg");
    var cxtImg=canvasImg.getContext("2d");

    var canvas=document.getElementById("canvas");
    var cxt=canvas.getContext("2d");

    var conceptA=document.getElementById("conceptSearch");
    var img=new Image();
    //先指定一个回调函数，图片加载好之后自然会回来执行
    img.onload = function () {
        //画图canvas
        canvasImg.width=img.width;
        canvasImg.height=img.height;
        canvas.width=img.width;
        canvas.height=img.height;
        //先画图
        cxtImg.drawImage(img,0,0,canvasImg.width,canvasImg.height);
        //再缩放
        canvasImg.style.width = '100%';//////////重点
        canvasImg.style.height='635px';
        canvas.style.width = '100%';//////////重点
        canvas.style.height='635px';
    };
    //加载图片，完成后执行刚才的函数
    img.src="../img/concept.png"

    //鼠标移动
    canvas.addEventListener("mousemove",function(event){
        //函数节流
        throttle(reDraw,100,getPosition(event));
        //成功后调用
    },false);
    // canvas.addEventListener("mousedown",function(event){
    //     var obj=getPosition(event);
    //     for(var i=0;i<array.length;i++) {
    //         if ((obj.x - array[i].x) < array[i].w && (obj.x - array[i].x) >= 0) {
    //             if ((obj.y - array[i].y) < array[i].h && (obj.y - array[i].y) >= 0) {
    //                 if(i==0){
    //                     console.log('ajax');
    //                     $.ajax({
    //                         url: '/search/在线测试',
    //                         type: 'get'
    //                     })
    //                 }
    //             }
    //         } else {
    //
    //         }
    //     }
    // },false);
    //函数节流代码
    function throttle(fn,delay,text){
        clearTimeout(fn.timeoutId);
        fn.timeoutId=setTimeout(function(){
            fn(text);
        },delay);
    }
    //鼠标坐标
    function getPosition(event){
        let x,y;
        if(event.layerX||event.layerX==0){
            x=event.layerX;
            y=event.layerY;
        }else if(event.offsetX||event.offsetX==0){
            x=event.offsetX;
            y=event.offsetY;
        }
        conceptA.style.top=y+'px';
        conceptA.style.left=x+'px';
        return {x:x*1.84,y:y*2.5};
    }
    function reDraw(obj){
        console.log(obj);
        for(var i=0;i<array.length;i++) {
            if ((obj.x - array[i].x) < array[i].w && (obj.x - array[i].x) >= 0) {
                if ((obj.y - array[i].y) < array[i].h && (obj.y - array[i].y) >= 0) {
                    canvas.style.cursor="pointer";
                    console.log('#000',array[i].x, array[i].y, array[i].w, array[i].h);
                    cxt.fillStyle = "rgba(98,98,98,0.2)";
                    cxt.fillRect(array[i].x, array[i].y, array[i].w, array[i].h);
                    cxt.fill();
                    conceptA.style.zIndex='20';
                    conceptA.style.visibility='visible';
                    if(i==0){
                        conceptA.setAttribute('href','/search/线性表自我测试');
                    }else{
                        conceptA.setAttribute('href','/search/顺序表');
                    }

                }
                break;
            } else {
                //重绘，先清空矩形
                canvas.style.cursor="default";
                conceptA.style.zIndex='5';
                conceptA.setAttribute('href','');
                cxt.clearRect(array[i].x, array[i].y, array[i].w, array[i].h);
            }
        }
    }
    // function drawRect(array,color,fontS,flag){
    //     let arr=array;
    //     let col=color;
    //     let size=fontS;
    //     if(flag==1){
    //         //重绘，先清空矩形
    //         context.clearRect(arr[0].x,arr[0].y,90,25);
    //     }
    //     for(let item in arr){
    //         let x = stringToNum(arr[item].x);
    //         let y = stringToNum(arr[item].y);
    //         //console.log('draw',x,y);
    //
    //         context.fillStyle=col;
    //         context.fillRect(x,y,90,25);
    //         context.fill();
    //         context.fillStyle="#333";
    //         context.fillText(arr[item].text,x+4,y+14);
    //         context.fill();
    //         if(flag==2){
    //             arr.pop();
    //         }
    //     }
    // }
})()
