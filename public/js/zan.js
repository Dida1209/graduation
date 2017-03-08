/**
 * Created by lenovo-pc on 2017/3/8.
 */
$(function(){
    console.log($("input[name='user[id]']").val());
    console.log($("input[name='resource[id]']").val());
    var userId=$("input[name='user[id]']").val();
    var resId=$("input[name='resource[id]']").val();
    //点赞
    $('#zan').click(function(){
        var aZan=$('#zan');
        var isLike;
        if(aZan.find('span').hasClass('active')){
            isLike=0;//取消赞
        }else{
            isLike=1;//点赞
        }
        $.ajax({
            url:'/user/doLike',
            type:'post',
            data:{
                isLike:isLike,
                userId:userId,
                resId:resId
            },
            success:function(data) {
                if (data.success == 1) {
                    if (isLike == 1) {
                        aZan.find('span').addClass('active');
                    } else {
                        aZan.find('span').removeClass('active');
                    }
                    aZan.find('span').text(data.likeNum);
                }else{
                    alert(data.message)
                }
            }
        })
    })
    //收藏
    $('#collect').click(function(){
        var aCollect=$("#collect");
        var isCollect;
        if($(this).find('span').hasClass('active')){
            isCollect=0;//取消收藏
        }else{
            isCollect=1;//收藏
        }
        console.log(aCollect);
        $.ajax({
            url:'/user/doCollect',
            type:'post',
            data:{
                isCollect:isCollect,
                userId:userId,
                resId:resId
            },
            success:function(data) {
                console.log(data);
                if (data.success == 1) {
                    if (isCollect == 1) {
                        aCollect.find('span').addClass('active');
                    } else {
                        aCollect.find('span').removeClass('active');
                    }
                    aCollect.find('span').text(data.collectNum);
                }else{
                    alert(data.message)
                }
            }
        })
    })

})
