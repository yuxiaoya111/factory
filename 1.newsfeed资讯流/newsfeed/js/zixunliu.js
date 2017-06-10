/**
 * Created by yxy123 on 2017/5/4.
 */

$(function () {

    $(":checkbox").attr("checked",true);

    //中文数据页面
    let page1 = 1; //控制页码（中文）
    let checkSet = [0,1,3];//存放查询条件；
    chinese(page1, checkSet);//请求数据

    //英文数据页面
    let page2 = 1;
    //let checkGroup = [];
    english(page2);//请求数据


    //2.定时器（定期更新页面）
    let timer1 = setInterval(function () {
        page1 = 1;
        chinese(page1, checkSet);//展示第一页最新的内容
    }, 25* 1000);

    let timer2 = setInterval(function () {
        page2 = 1;
        english(page2);//展示第一页最新的内容
    }, 25 * 1000);

    //3.点击加载更多请求更多数据(同时要检测页面中有无选中分类按钮)
    $(".loadCh").click(function () {
        ++page1;
        chinese2(page1, checkSet);
    });
    $(".loadEn").click(function () {
        ++page2;
        english2(page2);
    });

    //点击：中文资讯展现
    $("#cn").click(function () {
        $("#chinese").show();//展现中文资讯
        $("#cn").css("color", "#005faf");

        $("#english").hide();//英文咨讯页面隐藏
        $("#en").css("color", "#bfbaba");//改变字体颜色

    });

    //点击：英文咨询展现
    $("#en").click(function () {
        $("#chinese").hide();//中文资讯隐藏
        $("#cn").css("color", "#bfbaba");//改变字体颜色

        $("#english").show();//展现英文咨询
        $("#en").css("color", "#005faf");

    });

    //查询条件检测
    $(":checkbox").click(function (e) {
        checkSet.length = 0;   //清空查询条件；
        page1 = 1;           //页码初始设置为1
        let checkList = $("input[type='checkbox']:checked");
        console.log("选中的复选框个数"+checkList.length);
        if (checkList.length !== 0) {
            $.each(checkList, function (index, ele) {
                let value = $(ele).val();
                checkSet.push(value);
            });
        } else {
            checkSet = [];
        }
        console.log(checkSet);
        //alert($(".list-group").html());
        chinese(page1, checkSet);
    });

    //功能1：异步加载中文数据（时间，页码,全部数据）
    function chinese(page, set) {
        let data = new Date();//获取最新你时间
        let [year, month, date] = [data.getFullYear(), data.getMonth() + 1, data.getDate()];
        //alert("中文页面");
        //alert("page" + page);


        let startdate = year + "-" + 1 + "-" + 1 + " 00:00:00";
        //最新日期
        let enddate = year + "-" + month + "-" + date + " 23:59:00";
        //查询条件
        if (set.length == 0) {

        } else {
            set = set.toString();
        }
        console.log(set);
        //异步查询
        $.ajax({
            url: "http://114.55.33.105:8080/writingmaster-api-distributor/draftcontent/fulldoc?token=guest&pagesize=10&templatetype=3&notnewstypenum=XQC0000&newstype="+ set + "&startdate=" + startdate + "&enddate=" + enddate + '&pageindex=' + page,
            type: "get",
            async: true,
            success: function (data, textStatus) {
                // 成功获取数据
                let dataList = data.data;
                console.log(dataList);//控制输出数据
                if(dataList.length!==0){
                    $(".chinese").html("");//每次让当前页清空
                    loadNews(dataList);//实现页面展示数据
                }
                //console.log(textStatus);

                //点击按钮，隐藏文本(文本加载成功绑定)
                $(".btn_click").click(function (e) {
                    //获取鼠标点击事件 - 找到对应事件的class元素
                    console.log(e.target);
                    let target = e.target;
                    let parent = target.parentNode.parentNode;
                    //console.log(parent)
                    console.log($(parent));
                    if ($(parent).children(".textone").css("display") == "none") {
                        $(parent).children(".textone").show();
                        $(target).removeClass("glyphicon-menu-up");
                        $(target).addClass("glyphicon-menu-down");
                    } else {
                        $(parent).children(".textone").hide();

                        $(target).removeClass("glyphicon-menu-down");
                        $(target).addClass("glyphicon-menu-up");
                        //点击下拉菜单 - 获取事件源 - 父对象 - 从父对象下获取 .textone  设置事件
                    }
                });
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 获取数据失败
                console.log(textStatus);
                console.log(errorThrown);
            }

        });

    }

    function chinese2(page, set) {
        let data = new Date();//获取最新你时间
        let [year, month, date] = [data.getFullYear(), data.getMonth() + 1, data.getDate()];
        //alert("中文页面");
        //alert("page" + page);


        let startdate = year + "-" + 1 + "-" + 1 + " 00:00:00";
        //最新日期
        let enddate = year + "-" + month + "-" + date + " 23:59:00";
        //查询条件
        if (set.length == 0) {

        } else {
            set = set.toString();
        }
        console.log(set);
        //异步查询
        $.ajax({
            url: "http://114.55.33.105:8080/writingmaster-api-distributor/draftcontent/fulldoc?token=guest&pagesize=10&templatetype=3&notnewstypenum=XQC0000&newstype="+ set + "&startdate=" + startdate + "&enddate=" + enddate + '&pageindex=' + page,
            type: "get",
            async: true,
            success: function (data, textStatus) {
                // 成功获取数据
                let dataList = data.data;
                console.log(dataList);//控制输出数据
                if(dataList.length!==0){

                    loadNews(dataList);//实现页面展示数据
                }


                //点击按钮，隐藏文本(文本加载成功绑定)
                $(".btn_click").click(function (e) {
                    //获取鼠标点击事件 - 找到对应事件的class元素
                    console.log(e.target);
                    let target = e.target;
                    let parent = target.parentNode.parentNode;
                    //console.log(parent)
                    console.log($(parent));
                    if ($(parent).children(".textone").css("display") == "none") {
                        $(parent).children(".textone").show();
                        $(target).removeClass("glyphicon-menu-up");
                        $(target).addClass("glyphicon-menu-down");
                    } else {
                        $(parent).children(".textone").hide();

                        $(target).removeClass("glyphicon-menu-down");
                        $(target).addClass("glyphicon-menu-up");
                        //点击下拉菜单 - 获取事件源 - 父对象 - 从父对象下获取 .textone  设置事件
                    }
                });
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 获取数据失败
                console.log(textStatus);
                console.log(errorThrown);
            }

        });

    }
    //加载中文消息函数（页面展示第一页）
    function loadNews(news) {
        //console.log(news);
        $.each(news, function (index, element) {
            $(".chinese").append('<div  id=' + index + ' class="list-group-item flex ">' +
                '<div class="bg"><span></span></div>' +
                '<div class="flex-column">' +
                '<div class="head"><span class="time">' + element.generate_time + '</span><span class="topic">' + element.title + '</span></div>' +
                '<div class="textone">' + element.content + '</div>' +
                '<div id=' + element.id + ' class="collapse">' + element.content + '</div>' + '<p class="jiaohu">' +
                '<span class="btn_click glyphicon glyphicon glyphicon-menu-down" data-toggle="collapse" data-target=#' + element.id + ' ></span>' +
                '</p></div></div>'
            );


        });
        //
    }

    //异步加载英文数据（时间，页码,全部数据）
    function english(page) {
        // console.log(set)
        let data = new Date();//获取最新你时间
        let type = "";
        let [year, month, date] = [data.getFullYear(), data.getMonth() + 1, data.getDate()];
       //alert("英文页面");
       //alert("page" + page);

        let startdate = year + "-" + 1+ "-" + 1 + " 00:00:00";
        //最新日期
        let enddate = year + "-" + month + "-" + date + " 23:59:00";
        //查询条件

        $.ajax({
            url:"http://114.55.33.105:8080/writingmaster-api-distributor/draftcontent/fulldoc?token=guest&newstype=3&templatetype=2&notnewstypenum=XQB06001,XQB06002,XQB06003,XQB06004,XQB06005,XQB06006,XQB06007&startdate="+startdate+"&enddate="+enddate+"&pagesize=10&pageindex="+page,
            type: "get",
            async: true,
            success: function (data, textStatus) {
                // 成功获取数据
                let dataList = data.data;
                console.log(dataList);//控制输出数据
                if(dataList.length!==0){
                    $(".english").html("");//每次让当前页清空
                    loadNews2(dataList);//实现页面展示数据
                }

                //console.log(textStatus);

                //点击按钮，隐藏文本(文本加载成功绑定)
                $(".btn_click2").click(function (e) {
                    //获取鼠标点击事件 - 找到对应事件的class元素
                    //console.log(e.target);
                    let target = e.target;
                    let parent = target.parentNode.parentNode;
                    //console.log(parent)
                    console.log($(parent));
                    if ($(parent).children(".textone").css("display") == "none") {
                        $(parent).children(".textone").show();
                        $(target).removeClass("glyphicon-menu-up");
                        $(target).addClass("glyphicon-menu-down");
                    } else {
                        $(parent).children(".textone").hide();

                        $(target).removeClass("glyphicon-menu-down");
                        $(target).addClass("glyphicon-menu-up");
                        //点击下拉菜单 - 获取事件源 - 父对象 - 从父对象下获取 .textone  设置事件
                    }
                });
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 获取数据失败
                console.log(textStatus);
                console.log(errorThrown);
            }

        });

    }

    function english2(page) {
        // console.log(set)
        let data = new Date();//获取最新你时间
        let type = "";
        let [year, month, date] = [data.getFullYear(), data.getMonth() + 1, data.getDate()];
        //alert("英文页面");
        //alert("page" + page);

        let startdate = year + "-" + 1+ "-" + 1 + " 00:00:00";
        //最新日期
        let enddate = year + "-" + month + "-" + date + " 23:59:00";
        //查询条件

        $.ajax({
            url:"http://114.55.33.105:8080/writingmaster-api-distributor/draftcontent/fulldoc?token=guest&newstype=3&templatetype=2&notnewstypenum=XQB06001,XQB06002,XQB06003,XQB06004,XQB06005,XQB06006,XQB06007&startdate="+startdate+"&enddate="+enddate+"&pagesize=10&pageindex="+page,
            type: "get",
            async: true,
            success: function (data, textStatus) {
                // 成功获取数据
                let dataList = data.data;
                console.log(dataList);//控制输出数据
                if(dataList.length!==0){
                    loadNews2(dataList);//实现页面展示数据
                }

                //console.log(textStatus);

                //点击按钮，隐藏文本(文本加载成功绑定)
                $(".btn_click2").click(function (e) {
                    //获取鼠标点击事件 - 找到对应事件的class元素
                    //console.log(e.target);
                    let target = e.target;
                    let parent = target.parentNode.parentNode;
                    //console.log(parent)
                    console.log($(parent));
                    if ($(parent).children(".textone").css("display") == "none") {
                        $(parent).children(".textone").show();
                        $(target).removeClass("glyphicon-menu-up");
                        $(target).addClass("glyphicon-menu-down");
                    } else {
                        $(parent).children(".textone").hide();

                        $(target).removeClass("glyphicon-menu-down");
                        $(target).addClass("glyphicon-menu-up");
                        //点击下拉菜单 - 获取事件源 - 父对象 - 从父对象下获取 .textone  设置事件
                    }
                });
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 获取数据失败
                console.log(textStatus);
                console.log(errorThrown);
            }

        });

    }
    //
    //加载中文消息函数（页面展示第一页）
    function loadNews2(news) {
        //console.log(news);

        $.each(news, function (index, element) {
            $(".english").append('<div  id=' + index + ' class="list-group-item flex ">' +
                '<div class="bg"><span></span></div>' +
                '<div class="flex-column">' +
                '<div><span class="time">' + element.generate_time + '</span><span class="topic">' + element.title + '</span></div>' +
                '<div class="textone chtext">' + element.content + '</div>' +
                '<div id=' + element.id + ' class="collapse">' + element.content + '</div>' + '<p class="jiaohu">' +
                '<span class="btn_click2 glyphicon glyphicon glyphicon-menu-down" data-toggle="collapse" data-target=#' + element.id + ' ></span>' +
                '</p></div></div>'
            );


        });
        //
    }
});