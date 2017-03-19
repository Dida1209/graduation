/**
 * Created by lenovo-pc on 2017/3/13.
 */
(function(){
    //资源面板
    var testAdd=document.getElementById('testAdd');   //资源表单上的添加
    var testLand=document.getElementById('testLand');  //资源表单上的题目标号
    //资源面板上的表单
    var resForm=document.getElementById('resForm');
    //测试题目的面板
    var bgblack=document.getElementById('bgblack');
    var testSubmit=document.getElementById('testSubmit');
    //测试题目的表单（提交前检测）
    var testForm=document.getElementById('testForm');    //题目表单
   //测试面板上的按钮
    var testBtn=document.getElementById('testBtn');   //确定
    var testModify=document.getElementById('testModify');  //修改
    var testDel=document.getElementById('testDel');    //删除
    //测试题目的数组
    var testList=[],testAns,greenKey,typeKey;

    //数组事件
    //把题目添加到testList数组
    function listNewTest() {
        var test = {
            question: $('textarea[name="test[question]"]').val(),
            A: $('input[name="choose[A]"]').val(),
            B: $('input[name="choose[B]"]').val(),
            C: $('input[name="choose[C]"]').val(),
            D: $('input[name="choose[D]"]').val(),
            answer: testAns,
            why: $('textarea[name="test[why]"]').val()
        };
        testAns = '';
        return test;
    }
    //修给或删除时，表单的内容
    function listTestDetail(val){
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
        testAns='';
    }
    //修改数组
    function listChange(index,del){
        var newTest;
        testList.splice(index,1);
        newTest=listNewTest();
        if(newTest.question&&newTest.why){
            testList.splice(index,0,newTest);
        }else if(del){
            errorShow('测试题目和详解是必填项，请检查是否已填写！')
        }else;
        console.log(testList);
        // greenBtn();
    }
    //添加小绿钮
    function greenBtn(obj1,obj2){
        var template='';
        // var greenLast=$(testLand).find('a').length;
        var greenLast=$(obj1).find('a').length;
        // var difference=$(testLand).find('a').length-testList.length;
        var difference=greenLast-obj2.length;
        // console.log($(testLand).find('a').length,testList.length);
        console.log(greenLast,difference);
        if(difference<0){
            for(var i=greenLast;i<obj2.length;i++){
                template+='<a class="testLandBtn btn-success">'+(i+1)+'</a>';
            }
            $(obj1).append(template);
        }else if(difference>0){
            while(difference>0){
                $(obj1).find('a').eq(greenLast-1).remove();
                difference--;
            }
        }else
            return;
    }
    //资源面板上不同课程类型显示不同的输入表格
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

    //按钮事件
    //课程类型radio的点击，不同类型，显示不同的group
    $.each($('input[name="course[type]"]'),function(){
        $(this).click(function(e){
            console.log('each '+$(this).val());
            typeKey=$(this).val();
            resGroup($(this).val());
            e.stopPropagation();
        })

    })
    //题目的答案，点击radio把value值传给testAns
    $.each($('input[name="test[answer]"]'),function(){
        $(this).click(function(e){
            console.log('radio'+$(this).val())
            testAns=$(this).val();
            e.stopPropagation();
        })
    })
    //点击添加按钮
    testAdd.addEventListener('click',function(e){
        testForm.reset();
        bgblack.style.display='block';
        addClass(testSubmit,'active');
        testBtn.style.display='block';
        testModify.style.display='none';
        testDel.style.display='none';
        e.stopPropagation();
    })
    //遮罩层点击，等同于取消
    bgblack.addEventListener('click',function(e){
        testForm.reset();
        bgblack.style.display='none';
        removeClass(testSubmit,'active');
        e.stopPropagation();
    })
    //题目表单确定按钮被点击时
    testBtn.addEventListener('click',function(e) {
        testList[testList.length]={};
        listChange(testList.length-1,1);
        greenBtn($(testLand),testList);
        bgblack.style.display='none';
        removeClass(testSubmit,'active');
    })
    //题目表单修改按钮被点击时
    testModify.addEventListener('click',function(e){
        listChange(greenKey,1);
        greenBtn($(testLand),testList);
        bgblack.style.display='none';
        removeClass(testSubmit,'active');
    })
    //题目表单删除按钮被点击时
    testDel.addEventListener('click',function(e){
        testForm.reset();
        listChange(greenKey,0);
        greenBtn($(testLand),testList);
        bgblack.style.display='none';
        removeClass(testSubmit,'active');
    })
    //每一个小题绿色的按钮被点击时
    testLand.addEventListener('click',function(e){
        var target=e.target;
        greenKey=target.innerHTML-1;
        bgblack.style.display='block';
        addClass(testSubmit,'active');
        testBtn.style.display='none';
        testModify.style.display='block';
        testDel.style.display='block';
        listTestDetail(greenKey);
        e.stopPropagation();
    })
    //最后资源表单的提交，提交前把隐藏域放进form
    resForm.addEventListener('submit',function(e){
        if(typeKey==3){
            var _testList=JSON.stringify(testList);
            console.log(_testList);
            // console.log(t);
            // console.log(JSON.parse(t));
            $('input[name="course[test]"]').val(_testList);
            console.log(this);
        }
       // e.preventDefault();
        this.submit();
    })



    //获取表单
    function resTable(){

    }
    // $('#updateSubmit').modal('loaded.bs.modal',function(){
    //     setTimeout(function(){$('#updateSubmit').modal('show')},5000);
    // });
    //删除和更改
    $('.update').click(function(){
        //console.log($(this).siblings('.tableId').attr('data-resId')); //存id
        var template='';
        var id=$(this).siblings('input[name="res[_id]"]').val();
        var title=$(this).siblings('input[name="res[title]"]').val();
        var type=$(this).siblings('input[name="res[type]"]').val();
        var summary=$(this).siblings('input[name="res[summary]"]').val();
        var subjection=$(this).siblings('input[name="res[subjection]"]').val();
        template='<div id="updateForm">'+
            '<input type="hidden" name="course[_id]" value='+id+'>'+
            '<input type="hidden" name="course[type]" value='+type+'>'+
            '<div class="form-group"><label class="col-sm-3 control-label">题目</label><div class="col-sm-9"><input class="form-control" type="text" name="course[title]" value='+title+'>'+'</div></div>'+
            '<div class="form-group"><label class="col-sm-3 control-label">简介</label><div class="col-sm-9"><textarea class="form-control" type="text" name="course[summary]" rows="5">'+summary+'</textarea>'+'</div></div>'+
            '<div class="form-group"><label class="col-sm-3 control-label">属性</label><div class="col-sm-9"><input class="form-control" type="text" name="course[subjection]" value='+subjection+'>'+'</div></div>';
        if(type==1){
            var flash=$(this).siblings('input[name="res[flash]"]').val();
            template+='<div class="form-group"><label class="col-sm-3 control-label">视频地址</label><div class="col-sm-9"><input class="form-control" type="text" name="course[flash]" value='+flash+'>'+'</div></div></form>'
            console.log(flash);
        }else if(type==2){
            var doc=$(this).siblings('input[name="res[doc]"]').val();
            console.log(doc);
        }else{
            var _changeList=$(this).siblings('input[name="res[testList]"]').val();   //记得最后模态框提交的时候要把这个input的value改了
            var changeList=JSON.parse(_changeList);
            template+='<div class="form-group"><label class="col-sm-3 control-label">在线测试题目</label><div class="col-sm-9"><a id="changeAdd" class="btn">+</a><span class="testAdd">添加</span></div></div>' +
                '<div class="form-group"><div class="col-sm-3"></div><div class="col-sm-9" id="changeLand">';
            for(var i=0;i<changeList.length;i++){
                template+='<a class="testLandBtn btn-success">'+(i+1)+'</a>';
            }
            template+='</div></div></form>';
            console.log(testList);
        }
        $('#updateSubmit .modal-body').html(template);
        console.log(id,title,type,summary,subjection);
    })
})()