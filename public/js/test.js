/**
 * Created by lenovo-pc on 2017/3/16.
 */
$(function(){
    var chooseAns;
    $('#explanation').click(function(e){
        $(this).next().toggle();
        e.stopPropagation();
    })
    $.each($('input[name="choose"]'),function(){
        $(this).click(function(e){
            console.log('radio'+$(this).val())
            chooseAns=$(this).val();
            console.log(chooseAns);
            e.stopPropagation();
        })
    })
    $('.sure').click(function(){
        if(chooseAns){
            console.log(chooseAns,$('input[name="answer"]').val());
            if(chooseAns==$('input[name="answer"]').val()){
                $(this).text('正确').css('background','#5cb85c');
            }else{
                $(this).text('错误').css('background','#E74C3C');
            }
        }else{
            $(this).text('请选择答案');
        }
    })

})