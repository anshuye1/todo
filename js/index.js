$(function() {
    var todos = [];
    if (localStorage.todo_data) {
        todos = JSON.parse(localStorage.todo_data);
        render();
    } else {
        localStorage.todo_data = JSON.stringify(todos);
    }
    function render() {
        $('.nav').empty();
        $(todos).each(function (i, v) {
            if (v.state) {
                $('<li class="list">' + '<span>' + v.title + '<code class="done"></code>' + '</span>' + '<div class="remove icon-font1 icon-shanchu"></div>' + '</li>').appendTo('.nav');
            } else {
                $('<li class="list">' + '<span>' + v.title + '<code></code>' + '</span>' + '<div class="remove icon-font1 icon-shanchu"></div>' + '</li>').appendTo('.nav');
            }
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

    $('.foo-left').on('click', function () {
        $('.thing').css('display', 'block');
        $(this).toggleClass('active');
    });
    $('.delete li').on('click', function () {
        $('.thing').css('display', 'none');
        $(this).toggleClass('active');
    });
    $('.header .right').on('click', function () {
        $('.shade').css('display', 'block');
        $(this).toggleClass('active');
    });
    var a = '';
    $('.confirm').on('click', function () {
        $('.shade').css('display', 'none');
        $(this).toggleClass('active');
        a = $('#text').get(0).value;
        if (a == '') {
            return;
        }
        add(todos);
        render();
    });
    var left = null;
    $('.nav').on('touchstart', '.list', function (e) {
        left = e.originalEvent.changedTouches[0].pageX;
    });
    $('.nav').on('touchmove', '.list', function (e) {
        var n = e.originalEvent.changedTouches[0].pageX;
        var x = n - left;
        $(this).css('transform', 'translate3d(' + x + 'px,0,0)');
        if (x > 50) {
            $(this).children('.remove').addClass('active');
            $(this).children('span').children('code').addClass('done');
            todos[$(this).index()].state = 1;
            localStorage.todo_data = JSON.stringify(todos);
        }
        if (x < -2) {
            $(this).children('.remove').removeClass('active');
            $('.edit-box').addClass('active');
            //提交
            var that = this;
            $('.submit').on('touchend', function () {
                $('.edit-box').removeClass('active');
                if ($('#edit').get(0).value == '') {
                    return
                }
                $(that).find('span').text($('#edit').get(0).value);
                todos[$(that).index()].title = $('#edit').get(0).value;
                todos[$(that).index()].state = 0;
                localStorage.todo_data = JSON.stringify(todos);
                $('#edit').get(0).value = '';
            })
        }
    });
    $('.nav').on('touchend', '.list', function (e) {
        left = e.originalEvent.changedTouches[0].pageX;
        $(this).css('transform', 'translate3d(0,0,0)');
    });
    $('.nav').on('touchstart', '.remove', function () {
        $(this).closest('.list').remove();
        todos.splice($(this).closest('.list').index(), 1);
        localStorage.todo_data = JSON.stringify(todos);
    });
    ////////////////////////////////////删除已完成
    // var arr=[];
    // $('.del0').on('click',function(){
    //     $(todos).each(function(k,v0){
    //         console.log(v0.state);
    //         if(v0.state===1){
    //             arr.push(todos[k]);
    //         }
    //         todos=[];
    //         $(arr).each(function(j,v1){
    //             todos.push(v1);
    //         });
    //     });
    //     console.log(todos);
    //     localStorage.todo_data=JSON.stringify(todos);
    // });

});