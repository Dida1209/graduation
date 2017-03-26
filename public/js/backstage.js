/**
 * Created by lenovo-pc on 2017/3/13.
 */
(function() {
//flag确定是添加还是更改删除的面板上小绿按钮被点击
    var f = true, greenKey;//默认添加的，false删除的 greenKey小绿按钮上的值
//添加
    //资源面板
    var testAdd;   //资源表单上的添加
    var testLand; //资源表单上的题目标号
    //资源面板上的表单
    var resForm = document.getElementById('resForm');
    //测试题目的面板
    var bgblack = document.getElementById('bgblack');
    var testSubmit = document.getElementById('testSubmit');
    //测试题目的表单（提交前检测）
    var testForm = document.getElementById('testForm');    //题目表单
    //测试面板上的按钮
    var testBtn = document.getElementById('testBtn');   //确定
    var testModify = document.getElementById('testModify');  //修改
    var testDel = document.getElementById('testDel');    //删除
    //测试题目的数组
    var testList = [], testAns, typeKey;
//更新和删除
    //更新删除面板上的小绿按钮
    var changeLand, changeList = [], supper;
//课程属性
    var flag=false,str='';

//数组事件公用方法
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
    function listTestDetail(val, obj) {
        $('textarea[name="test[question]"]').val(obj[val].question);
        // console.log($('textarea[name="test[question]"]')+"        "+obj[val].question);
        // console.log($('textarea[name="test[question]"]').val());
        $('input[name="choose[A]"]').val(obj[val].A);
        $('input[name="choose[B]"]').val(obj[val].B);
        $('input[name="choose[C]"]').val(obj[val].C);
        $('input[name="choose[D]"]').val(obj[val].D);
        $('textarea[name="test[why]"]').val(obj[val].why);
        testAns = obj[val].answer;
        switch (testAns) {
            case 'A':
                $('input[name="test[answer]"]').eq(0).attr('checked', 'checked');
                break;
            case 'B':
                $('input[name="test[answer]"]').eq(1).attr('checked', 'checked');
                break;
            case 'C':
                $('input[name="test[answer]"]').eq(2).attr('checked', 'checked');
                break;
            case 'D':
                $('input[name="test[answer]"]').eq(3).attr('checked', 'checked');
                break;
            default:
                break;
        }
        testAns = '';
    }

    //修改数组
    function listChange(index, o) {
        var newTest;
        console.log(o);
        o.splice(index, 1);
        newTest = listNewTest();
        if (newTest.question && newTest.why) {
            o.splice(index, 0, newTest);
            // }
            // else if(del){  //del确定是不是删除，如果0，修改，如果是1，删除
            //     errorShow('测试题目和详解是必填项，请检查是否已填写！')
        } else;
        console.log(o);
        // greenBtn();
    }

    //添加小绿钮
    function greenBtn(obj1, obj2) {
        var template = '';
        var greenLast = $(obj1).find('a').length;
        var difference = greenLast - obj2.length;
        console.log(greenLast, difference);
        if (difference < 0) {
            for (var i = greenLast; i < obj2.length; i++) {
                template += '<a class="testLandBtn btn-success">' + (i + 1) + '</a>';
            }
            $(obj1).append(template);
        } else if (difference > 0) {
            while (difference > 0) {
                $(obj1).find('a').eq(greenLast - 1).remove();
                difference--;
            }
        } else
            return;
    }

//添加的事件
    //资源面板上不同课程类型显示不同的输入表格
    function resGroup(i) {
        var tem='';
        if(i==1){
            tem='<label class="col-sm-2 control-label" for="inputFlash">片源地址</label>'+
                    '<div class="col-sm-10"><input id="inputFlash" class="form-control" type="text" name="flash"/></div>';
            $('.resGroup').html(tem);
            $('.resLand').html('');
        }else if(i==2){
            tem='<label class="col-sm-2 control-label" for="inputDoc">文件地址</label>'+
                '<div class="col-sm-10"><input id="inputDoc" class="form-control" type="file" name="doc"/></div>';
            $('.resGroup').html(tem);
            $('.resLand').html('');
        }else{
            tem='<label class="col-sm-2 control-label" >在线测试题目</label>'+
                '<div class="col-sm-10"><a id="testAdd" class="btn">+</a><span class="testAdd">添加</span><input type="hidden" name="test"/></div>';
            $('.resGroup').html(tem);
            tem='<div class="col-sm-2"></div><div class="col-sm-10" id="testLand"></div>';
            $('.resLand').html(tem);
            testAdd = document.getElementById('testAdd');
            testAdd.addEventListener('click', testFun);
            testLand= document.getElementById('testLand');
            testLand.addEventListener('click', testLandFun);
        }
    }

    //按钮事件
    //课程类型radio的点击，不同类型，显示不同的group
    $.each($('#resForm input[name="type"]'), function () {
        $(this).click(function (e) {
            console.log('each ' + $(this).val());
            typeKey = $(this).val();
            resGroup($(this).val());
            testList=[];
            e.stopPropagation();
        })

    })
    //题目的答案，点击radio把value值传给testAns
    $.each($('#resForm input[name="test[answer]"]'), function () {
        $(this).click(function (e) {
            console.log('radio' + $(this).val())
            testAns = $(this).val();
            e.stopPropagation();
        })
    })
    //点击添加按钮
    function testFun(e){
            testForm.reset();
            bgblack.style.display = 'block';
            addClass(testSubmit, 'active');
            testBtn.style.display = 'block';
            testModify.style.display = 'none';
            testDel.style.display = 'none';
            e.stopPropagation();
    }

    //遮罩层点击，等同于取消
    bgblack.addEventListener('click', function (e) {
        testForm.reset();
        bgblack.style.display = 'none';
        removeClass(testSubmit, 'active');
        e.stopPropagation();
    })
    //题目表单确定按钮被点击时
    testBtn.addEventListener('click', function (e) {
        testList[testList.length] = {};
        listChange(testList.length - 1, testList);
        greenBtn($(testLand), testList);
        bgblack.style.display = 'none';
        removeClass(testSubmit, 'active');
        e.stopPropagation();
    })
    //题目表单修改按钮被点击时
    testModify.addEventListener('click', function (e) {
        if (f) {
            listChange(greenKey, testList);
            greenBtn($(testLand), testList);
        } else {
            listChange(greenKey, changeList);
            greenBtn($(changeLand), changeList);
        }

        bgblack.style.display = 'none';
        removeClass(testSubmit, 'active');
        e.stopPropagation();
    })
    //题目表单删除按钮被点击时
    testDel.addEventListener('click', function (e) {
        testForm.reset();
        if (f) {
            listChange(greenKey, testList);
            greenBtn($(testLand), testList);
        } else {
            listChange(greenKey, changeList);
            greenBtn($(changeLand), changeList);
        }

        greenBtn($(testLand), testList);
        bgblack.style.display = 'none';
        removeClass(testSubmit, 'active');
        e.stopPropagation();
    })
    //每一个小题绿色的按钮被点击时
    function testLandFun(e){
        var target = e.target;
        greenKey = target.innerHTML - 1;
        bgblack.style.display = 'block';
        addClass(testSubmit, 'active');
        testBtn.style.display = 'none';
        testModify.style.display = 'block';
        testDel.style.display = 'block';
        listTestDetail(greenKey, testList);
        e.stopPropagation();
    }
    //最后资源表单的提交，提交前把隐藏域放进form
    resForm.addEventListener('submit', function (e) {
        if (typeKey == 3) {
            var _testList = JSON.stringify(testList);
            console.log(_testList);
            // console.log(t);
            // console.log(JSON.parse(t));
            $('#resForm input[name="test"]').val(_testList);
            console.log(this);
        }
        // e.preventDefault();
        this.submit();
    })


//更改，删除
    //在更新和修改模板中的每个小绿钮被点击
    function greenBtnClick(e) {
        var target = e.target;
        f = false;
        greenKey = target.innerHTML - 1;
        bgblack.style.display = 'block';
        addClass(testSubmit, 'active');
        testBtn.style.display = 'none';
        testModify.style.display = 'block';
        testDel.style.display = 'block';
        listTestDetail(greenKey, changeList);
        e.stopPropagation();
        // console.log(target, greenKey);
        console.log(changeList);
    }

    //创建template
    function createTemplate(t, n) {
        var template = '';
        var that = t;
        var id = $(that).siblings('input[name="res[_id]"]').val();
        var title = $(that).siblings('input[name="res[title]"]').val();
        typeKey = $(that).siblings('input[name="res[type]"]').val();
        var summary = $(that).siblings('input[name="res[summary]"]').val();
        var subjection = $(that).siblings('input[name="res[subjection]"]').val();
        template = '<div id="' + n + 'Form">' +
            '<input type="hidden" name="_id" value=' + id + '>' +
            '<input type="hidden" name="type" value=' + typeKey + '>' +
            // '<input type="hidden" name="course[test]" value>'+
            '<div class="form-group"><label class="col-sm-3 control-label">题目</label><div class="col-sm-9"><input class="form-control" type="text" name="title" value=' + title + '>' + '</div></div>' +
            '<div class="form-group"><label class="col-sm-3 control-label">简介</label><div class="col-sm-9"><textarea class="form-control" type="text" name="summary" rows="5">' + summary + '</textarea>' + '</div></div>' +
            '<div class="form-group"><label class="col-sm-3 control-label">属性</label><div class="col-sm-9"><input class="form-control" type="text" name="subjection" value=' + subjection + '>' + '</div></div>';
        if (typeKey == 1) {
            var flash = $(that).siblings('input[name="res[flash]"]').val();
            template += '<div class="form-group"><label class="col-sm-3 control-label">视频地址</label><div class="col-sm-9"><input class="form-control" type="text" name="flash" value=' + flash + '>' + '</div></div></form>'
            console.log(flash);
        } else if (typeKey == 2) {
            var doc = $(that).siblings('input[name="doc"]').val();
            console.log(doc);
        } else {
            var _changeList = $(that).siblings('input[name="testList"]').val();   //记得最后模态框提交的时候要把这个input的value改了
            changeList = JSON.parse(_changeList);
            template += '<div class="form-group"><label class="col-sm-3 control-label">在线测试题目</label></div>' +
                '<div class="form-group"><div class="col-sm-3"></div><div class="col-sm-9" id="changeLand">';
            for (var i = 0; i < changeList.length; i++) {
                template += '<a class="testLandBtn btn-success">' + (i + 1) + '</a>';
            }
            template += '</div></div></form>';
            console.log(changeList);
        }
        return template;
    }

    //删除和更改
    $('.update').click(function (e) {
        // console.log(this);
        supper = $(this).parents('.tableTr').attr('data-trId');
        // console.log($('tr[data-trId="' + supper + '"]'));
        var temp = createTemplate(this, 'update');
        $('#updateSubmit .modal-body').html(temp);
        changeLand = document.getElementById('changeLand');
        console.log(changeLand);
        // console.log(id,title,type,summary,subjection);
        if (changeLand) {
            changeLand.addEventListener('click', function (e) {
                greenBtnClick(e)
            });
        }
        e.stopPropagation();
    })
    $('.delete').click(function () {
        // console.log(this);
        supper = $('.tableId').attr('data-resId');
        var temp = createTemplate(this, 'del');
        $('#delSubmit .modal-body').html(temp);
        changeLand = document.getElementById('changeLand');
        if (changeLand) {
            changeLand.addEventListener('click', function (e) {
                greenBtnClick(e)
            });
        }
        e.stopPropagation();
    })

    //表单上的确定和取消按钮
    $('#updateSure').click(function () {
        var uForm = $('#updateSubmit .modal-body');
        var data = {};
        data._id = $(uForm).find('input[name="_id"]').val();
        data.title = $(uForm).find('input[name="title"]').val();
        data.type = $(uForm).find('input[name="type"]').val();
        data.subjection = $(uForm).find('input[name="subjection"]').val();
        data.summary = $(uForm).find('textarea[name="summary"]').text();
        if (data.type == 1) {
            data.flash = $(uForm).find('input[name="flash"]').val();
        } else if (data.type == 2) {

        } else {
            data.testList = JSON.stringify(changeList);
        }
        console.log(data);
        $.ajax({
            url: '/admin/course/update',
            type: 'post',
            data: {
                data: data
            },
            success: function (data) {
                if (data.success == 1) {
                    var that=$('tr[data-trId="' + supper + '"]');
                    $(that).find('td')[1].innerHTML=data.resource.title;
                    $(that).find('td')[2].innerHTML=data.resource.summary;
                    $(that).find('input[name="res[_id]"]').val(data.resource._id);
                    $(that).find('input[name="res[title]"]').val(data.resource.title);
                    $(that).find('input[name="res[summary]"]').val(data.resource.summary);
                    $(that).find('input[name="res[subjection]"]').val(data.resource.subjection);
                    if(data.resource.type==1){
                        $(that).find('input[name="res[flash]"]').val(data.resourse.flash)
                    }
                    if(data.resource.type==3){
                        $(that).find('input[name="res[testList]"]').val(JSON.stringify(data.testList));
                    }
                    errorMessage(data.message);
                }
            }
        })

    })

    $('#delSure').click(function() {
        var dForm=$('#delSubmit .modal-body');
        var data={};
        data._id=$(dForm).find('input[name="_id"]').val();
        data.type=$(uForm).find('input[name="type"]').val();
        $.ajax({
            url:'/admin/course/del',
            type:'post',
            data:{
                data:data
            },
            success:function(data){
                if(data.success==1){
                    $('tr[data-trId="' + supper + '"]').remove();
                    errorMessage(data.message);
                }
            }
        })
    })
    $('tr').click(function(e){
        var tar=this;
        var url=$(tar).attr('data-href');
        // console.log(url);
        window.open(url);
    })

//课程属性
    var d=[[{'name':'顺序表','child':''},{'name':'链表','child':['线性链表','循环链表','双向链表']}],[{'name':'栈','child':''},{'name':'队列','child':['循环队列','链队列']}],[{'name':'树','child':''},{'name':'二叉树','child':['遍历二叉树','线索二叉树']},{'name':'森林','child':''},{'name':'赫尔曼树','child':''}],[{'name':'遍历图','child':''},{'name':'图的连通性','child':''},{'name':'最短路径','child':''},],[{'name':'静态查找表','child':['顺序表查找','有序表查找','索引顺序表查找']},{'name':'动态查找表','child':['二叉排序树','平衡二叉树']},{'name':'哈希表','child':''}],[{'name':'插入排序','child':''},{'name':'快速排序','child':''},{'name':'选择排序','child':['简单排序','堆排序']}]];
    function subjectionTem(ind,name){
        var subData;
        var template='';
        if(flag){
            subData=d[flag][ind][name];
            if(subData.length) {
                for (var i = 0; i < subData.length; i++) {
                    template += '<li><a data-index="' + i + '" data-value="' + subData[i] + '">' + subData[i] + '</a></li>'
                }
            }
        }else{
            flag=ind;
            subData=d[ind];
            if(subData.length){
                for(var i=0;i<subData.length;i++){
                    template+='<li><a data-index="'+i+'" data-value="'+subData[i].name+'">'+subData[i].name+'</a></li>'
                }
            }
        }
        return template;
    }
    $('.data-btn[data-btn="1"]').click(function(e){
        $('.data-btn[data-btn="2"]').find('button').html('请选择<span class="caret"></span>');
        $('.data-btn[data-btn="3"]').find('button').html('请选择<span class="caret"></span>');
        var index=e.target.getAttribute('data-index');
        flag=false;
        var val=e.target.getAttribute('data-value');
        if(val){
            $(this).find('button').text(val);
            var templ=subjectionTem(index,'name');
            str=val;
            $('.data-btn[data-btn="2"]').find('ul.dropdown-menu').html(templ);
            $('input[name="subjection"]').val(str);
        }
    })

    $('.data-btn[data-btn="2"]').click(function(e){
        $('.data-btn[data-btn="3"]').find('button').html('请选择<span class="caret"></span>');
        var index=e.target.getAttribute('data-index');
        var val=e.target.getAttribute('data-value');
        if(val){
            $(this).find('button').text(val);
            var templ=subjectionTem(index,'child');
            if(str){
                var arr=str.split('-');
                str=arr[0]+'-'+val;
                if(templ){
                    $('.data-btn[data-btn="3"]').find('ul.dropdown-menu').html(templ);
                    $('.data-btn[data-btn="3"]').show();
                    $('input[name="subjection"]').val(str);
                }else{
                    $('.data-btn[data-btn="3"]').hide();
                    $('input[name="subjection"]').val(str);
                }
            }
        }
    })
    $('.data-btn[data-btn="3"]').click(function(e){
        var val=e.target.getAttribute('data-value');
        if(val){
            $(this).find('button').text(val);
            if(str){
                var arr=str.split('-');
                str=arr[0]+'-'+arr[1]+'-'+val;
                $('input[name="subjection"]').val(str);
            }
        }
    })



//表单提交
    $('#resForm').submit(function(e){
        var _type=typeKey;
        console.log(_type+'resForm');
        try{
            if (_type==2) {
                console.log($('#resForm')[0]);
                var data = new FormData($('#resForm')[0]);
                console.log(data);
                $.ajax({
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    url: '/admin/doc/new',
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                }).done(function (data) {

                })
                return false;
            }
        }catch(e){
                alert(e.message);
                return false;
        }


        // }else {
        //     console.log('submit');
        //     this.submit();
        // }
        return false;
    })
})()