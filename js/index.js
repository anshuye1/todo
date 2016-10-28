$(function() {
    ///////////////////////////////////////////////////////创建list,todos.push/////////
    var todos = [];
    var str='开始';
    if (localStorage.todo_data) {
        todos = JSON.parse(localStorage.todo_data);
        render(todos);
    } else {
        localStorage.todo_data = JSON.stringify(todos);
    }
    function render(todos) {
        $('.nav').empty();
        $(todos).each(function (i, v) {
                $('<li class="list">' + '<span>' + v.title + '</span>'+ '<div class="remove icon-font1 icon-shanchu"></div>' + '<div class="remove1 icon-font icon-edit"></div>' + '</li>').addClass(function(){
                    if (v.state) {
                    return "active";}
                }).appendTo('.nav').append($('<code>'));
        });
    }
    function add(todos) {
        todos.push({
            title: a,
            state: 0,
            del: 0
        });
        localStorage.todo_data = JSON.stringify(todos);
    }
    //////////////////////////////////////////////////////////待办点击事件
    $('.foo-left').on('click', function () {
        $('.thing').css('display', 'block');
        $(this).toggleClass('active');
    });
    //////////////////////////////////////////////////////////点击返回点击事件
    $('.delete li').on('click', function () {
        $('.thing').css('display', 'none');
        $(this).toggleClass('active');
    });
    //////////////////////////////////////////////////////////添加的点击事件
    $('.header .right').on('click', function () {
        $('.shade').css('display', 'block');
        $(this).toggleClass('active');
    });
    //添加完成后确定点击事件
    var a = '';
    $('.confirm').on('click', function () {
        $('.shade').css('display', 'none');
        $(this).toggleClass('active');
        a = $('#text').get(0).value;
        if (a == '') {
            return;
        }
        add(todos);
        render(todos);
        $('#text').get(0).value="";
    });
    //////////////////////////////////////////////////////////右滑动事件
    var left = null;
    $('.nav').on('touchstart', '.list', function (e) {
        left = e.originalEvent.changedTouches[0].pageX;
    });
    $('.nav').on('touchmove', '.list', function (e) {
        var n = e.originalEvent.changedTouches[0].pageX;
        var x = n - left;
        if(x>-50&&x<200){
            $(this).css('transform', 'translate3d(' + x + 'px,0,0)');
        }
        if (x > 5) {
            $(this).children('.remove').addClass('active');
            $(this).children('.remove1').addClass('active');
            $(this).addClass('active');
            todos[$(this).index()].state = 1;
            localStorage.todo_data = JSON.stringify(todos);
        }
        if (x < 1) {
            $(this).children('.remove').removeClass('active');
            $(this).children('.remove1').removeClass('active');
            return;
        }
        //提交
        var that = this;
        $(this).children('.remove1').on('touchend',function(){
            $(that).children('.remove').removeClass('active');
            $(that).children('.remove1').removeClass('active');
            $('.edit-box').addClass('active');
            $('.submit').on('touchend', function () {
                $('.edit-box').removeClass('active');
                if ($('#edit').get(0).value == '') {
                    return
                }
                $(that).removeClass('active');
                $(that).find('span').text($('#edit').get(0).value);
                todos[$(that).index()].title = $('#edit').get(0).value;
                todos[$(that).index()].state = 0;
                localStorage.todo_data = JSON.stringify(todos);
                $('#edit').get(0).value = '';
            });
        });
    });
    $('.nav').on('touchend', '.list', function (e) {
        left = e.originalEvent.changedTouches[0].pageX;
        $(this).css('transform', 'translate3d(0,0,0)');
    });
    //////////////////////////////////////////////////////////删除的点击事件
    $('.nav').on('touchstart', '.remove', function () {
        $(this).closest('.list').remove();
        todos.splice($(this).closest('.list').index(), 1);
        localStorage.todo_data = JSON.stringify(todos);
    });
    ////////////////////////////////////删除已完成
    var arr=[];
    var brr=[];
    $('.del0').on('touchend',function(){
        $(todos).each(function(k,v0){
            console.log(v0.state);
            if(!(v0.state===0)){
               arr.push($(v0));
                $('.nav .list.active').remove();
                // todos.splice($(v0).index(), 1)
                todos=[];
                $(arr).each(function(i,v){
                    todos.push(arr[i]);
                });
                localStorage.todo_data = JSON.stringify(todos);
            }else{
                brr.push($(v0));
            }
        });
        console.log(arr);
        console.log(brr);
        console.log(todos);
        localStorage.todo_data=JSON.stringify(todos);
    });
    //////////////////////////////////////////开始点击事件
    $('.nav').on('touchend','code',function(){
        $('.start').addClass('active');
    });
    $('.now').text(
        function(){
            var date=new Date();
            return date.getMinutes()+':'+date.getSeconds();
        }
    );
    $('.now').on('touchend',function(){
        $('.start').removeClass('active');
    })
});