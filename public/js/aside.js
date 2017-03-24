/**
 * Created by lenovo-pc on 2017/3/6.
 */
(function(){
    var data=[[{'name':'顺序表','child':''},{'name':'链表','child':['线性链表','循环链表','双向链表']}],[{'name':'栈','child':''},{'name':'队列','child':['循环队列','链队列']}],[{'name':'树','child':''},{'name':'二叉树','child':['遍历二叉树','线索二叉树']},{'name':'森林','child':''},{'name':'赫尔曼树','child':''}],[{'name':'遍历图','child':''},{'name':'图的连通性','child':''},{'name':'最短路径','child':''},],[{'name':'静态查找表','child':['顺序表查找','有序表查找','索引顺序表查找']},{'name':'动态查找表','child':['二叉排序树','平衡二叉树']},{'name':'哈希表','child':''}],[{'name':'插入排序','child':''},{'name':'快速排序','child':''},{'name':'选择排序','child':['简单排序','堆排序']}]];
    var submenu=document.getElementById('submenu');
    var menu=document.getElementById('menuUl');
    var courseAll=document.getElementById('course');

    function createSubmenu(i,val){
        var obj=data[i];
        var template='';
        for(var j=0;j<obj.length;j++){
            template+='<ul><li><a href="/search/'+val+'-'+obj[j].name+'" data-value="'+val+'-'+obj[j].name+'">'+obj[j].name+'</a></li>';
            for(var k=0;k<obj[j].child.length;k++){
                template+='<li><a href="/search/'+val+'-'+obj[j].name+'-'+obj[j].child[k]+'" data-value="'+val+'-'+obj[j].name+'-'+obj[j].child[k]+'">'+obj[j].child[k]+'</a></li>';
            }
            template+='</ul>';
        }
        submenu.innerHTML=template;
        submenu.style.top=i*70-425+'px';
        if(i==5){
            submenu.style.top=-130+'px';
        }
        submenu.style.display='block';
    }

    menu.addEventListener('mouseover',function(event){
        var index=event.target.getAttribute('data-index');
        var value=event.target.getAttribute('data-value');
            flag=index;
            console.log(index);
            if(index){
                createSubmenu(index,value);
            };
            event.stopPropagation();
    })
    submenu.addEventListener('mouseover',function(event){
        event.stopPropagation();
    })

    $('body').mouseover(function(){
        submenu.style.display='none';
    })
    courseAll.addEventListener('click',function(){
        var url=this.getAttribute('data-href');
        window.location.href=url;
    })
})()