/**
 * Created by lenovo-pc on 2017/3/13.
 */
(function(){
    var bgblack=document.getElementById('bgblack');         //题目表单后面的遮罩
    var testSubmit=document.getElementById('testSubmit');   //整个题目表单层
    var testForm=document.getElementById('testForm');    //题目表单
    var testAdd=document.getElementById('testAdd');   //资源表单上的添加
    var testLand=document.getElementById('testLand');  //资源表单上的题目标号
    var testBtn=document.getElementById('testBtn');   //题目表单上的btn
    //var resBtn=document.getElementById('reBtn');
    var resForm=document.getElementById('resForm');
    var testList=[],testAns;
    //var resgroup=document.querySelectorAll('.resGroup');
    //检查radio的value

    testAdd.addEventListener('click',function(e){
        bgblack.style.display='block';
        addClass(testSubmit,'active');
        e.stopPropagation();
    })
    bgblack.addEventListener('click',function(e){
        bgblack.style.display='none';
        removeClass(testSubmit,'active');
        e.stopPropagation();
    })
    //把题目添加到testList数组
    testBtn.addEventListener('click',function(e){
        var test={
                question:$('textarea[name="test[question]"]').val(),
                A:$('input[name="choose[A]"]').val(),
                B:$('input[name="choose[B]"]').val(),
                C:$('input[name="choose[C]"]').val(),
                D:$('input[name="choose[D]"]').val(),
                answer:testAns,
                why:$('textarea[name="test[why]"]').val()
            };
        if(test.question&&test.why){
                testList.push(test);
                greenBtn();
                testForm.reset();
        };
        testAns='';
        console.log(testList);
        bgblack.style.display='none';
        removeClass(testSubmit,'active');
        e.stopPropagation();
    })

    //每一个小题绿色的按钮被点击时
    testLand.addEventListener('click',function(e){
        var target=e.target;
        // console.log(target.innerHTML);
        showTestDetail(target.innerHTML-1);
        e.stopPropagation();
    })

    function showTestDetail(val){
        $('textarea[name="test[question]"]').val(testList[val].question);
        console.log($('textarea[name="test[question]"]')+"        "+testList[val].question);
        console.log($('textarea[name="test[question]"]').val());
        $('input[name="choose[A]"]').val(testList[val].A);
        $('input[name="choose[B]"]').val(testList[val].B);
        $('input[name="choose[C]"]').val(testList[val].C);
        $('input[name="choose[D]"]').val(testList[val].D);
        $('textarea[name="test[why]"]').val(testList[val].why);
        testAns=testList[val].answer;
        switch(testAns){
            case 'A':$('input[name="test[answer]"]').eq(0).attr('checked','checked');break;
            case 'B':$('input[name="test[answer]"]').eq(1).attr('checked','checked');break;
            case 'C':$('input[name="test[answer]"]').eq(2).attr('checked','checked');break;
            case 'D':$('input[name="test[answer]"]').eq(3).attr('checked','checked');break;
            default:break;
        }
        bgblack.style.display='block';
        addClass(testSubmit,'active');
    }

    function greenBtn(){
        var template;
        template='<a class="testLandBtn btn-success">'+testList.length+'</a>'
        $(testLand).append(template);
    }
    //提交前把隐藏域放进form
    resForm.addEventListener('submit',function(){
        console.log(this);
        if(test.length>0){

        }else{
            this.submit();
        }
    })

    function resGroup(i){
        for(var j=1;j<4;j++){
            if(i==j){
                // console.log('i       ' +i)
                $('#group'+i).show();
            }else{
                // console.log('j    '+j)
                console.log($('#group'+j).find('input'));
                $('#group'+j).find('input').val('');
                $('#group'+j).hide();
            }
        }
    }
    $.each($('input[name="course[type]"]'),function(){
        $(this).click(function(e){
            console.log('each '+$(this).val())
            resGroup($(this).val());
            e.stopPropagation();
        })

    })
    $.each($('input[name="test[answer]"]'),function(){
        $(this).click(function(e){
            console.log('radio'+$(this).val())
            testAns=$(this).val();
            e.stopPropagation();
        })

    })
})()