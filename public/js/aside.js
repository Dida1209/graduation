/**
 * Created by lenovo-pc on 2017/3/6.
 */
(function(){
    var data0=[
                {
                    'name':'顺序表',
                    'child':''
                },
                {
                    'name':'链表',
                    'child':['线性链表','循环链表','双向链表']
                }
              ];
    var data1=[
                {
                    'name':'栈',
                    'child':''
                },
                {
                    'name':'队列',
                    'child':['循环队列','链队列']
                }
    ];
    var data2=[
                {
                    'name':'树',
                    'child':''
                },
                {
                    'name':'二叉树',
                    'child':['遍历二叉树','线索二叉树']
                },
                {
                    'name':'森林',
                    'child':''
                },
                {
                    'name':'赫尔曼树',
                    'child':''
                }
    ];
    var data3=[
        {
            'name':'遍历图',
            'child':''
        }  ,
        {
            'name':'图的连通性',
            'child':''
        }  ,
        {
            'name':'最短路径',
            'child':''
        }  ,
    ];
    var data4=[
        {
            'name':'静态查找表',
            'child':['顺序表查找','有序表查找','索引顺序表查找']
        }  ,
        {
            'name':'动态查找表',
            'child':['二叉排序树','平衡二叉树']
        }  ,
        {
            'name':'哈希表',
            'child':''
        }
    ];
    var data5=[
        {
            'name':'插入排序',
            'child':''
        },
        {
            'name':'快速排序',
            'child':''
        },
        {
            'name':'选择排序',
            'child':['简单排序','堆排序']
        }
    ];

    var submenu=document.getElementById('submenu');
    var menu=document.getElementById('menuUl');
    var flag=-1;

    function createSubmenu(i,d){
        var obj=d;
        var template='';
        for(var j=0;j<obj.length;j++){
            template+='<ul><li><a>'+obj[j].name+'</a></li>';
            for(var k=0;k<obj[j].child.length;k++){
                template+='<li><a>'+obj[j].child[k]+'</a></li>';
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

    menu.addEventListener('click',function(event){
        var index=event.target.getAttribute('data-index');
        if(flag==index){
            flag=-1;
            submenu.style.display='none';
        }
        else{
            flag=index;
            console.log(index);
            if(index==0){
                createSubmenu(index,data0);
            };
            if(index==1){
                createSubmenu(index,data1);
            };
            if(index==2){
                createSubmenu(index,data2);
            };
            if(index==3){
                createSubmenu(index,data3);
            };
            if(index==4){
                createSubmenu(index,data4);
            };
            if(index==5){
                createSubmenu(index,data5);
            };

        }
})

})()