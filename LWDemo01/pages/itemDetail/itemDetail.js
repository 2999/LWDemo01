(function () {
    "use strict";

    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var API_DOMAIN = Data.API_DOMAIN;
    var comments;

    //填充item的内容
    var stuff = function (element, options) {
        var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
        element.querySelector(".titlearea .pagetitle").textContent = item.subtitle;//item.group.title;
        element.querySelector("article .item-title").textContent = item.title;
        //element.querySelector("article .item-subtitle").textContent = item.subtitle;
        
        if (!!(item.attachments[0]) && item.attachments[0].picture) {
            element.querySelector("article .item-image").src = item.backgroundImage;
        } else {
            element.querySelector("article .item-image").style.display = "none";
        }

        element.querySelector("article .item-image").alt = item.subtitle;
        element.querySelector("article .item-content").innerHTML = item.content;
        element.querySelector(".content").focus();
    }

    //获取某一条item(即：post)的评论
    function getComment(item, size) {
        $.ajax({
            global: false,
            url: API_DOMAIN + '/post/comment/list',
            type: 'GET',
            data: {
                'postId': item.id,
                'publisher': item.publisher.id,
                'size': size,
                'access_token': localStorage['access_token']
            },
            _success: function (_data) {
                if (_data.values && _data.values.length !== 0) {
                    _data.values.forEach(function (v) {
                        v.item = item;
                        v.commentorLink = API_DOMAIN + "/u/" + v.commentor.id;
                        v.commentorAvatar = v.commentor.avatar;
                        v.commentorName = v.commentor.name;
                        v.commentCreatedAt = Data.transformDate(v.createdAt);
                        v.comment = v.content;
                        //v.type = "smallListIconTextItem";//这里或许可以根据判断字数来确定到底是大、中、小哪种模板
                        comments.push(v);
                    });
                }
                //lock = false;
            }
        });
    }


    ui.Pages.define("/pages/itemDetail/itemDetail.html", {
        // 每当用户导航至此页面时都要调用此功能。它使用应用程序的数据填充页面元素。
        ready: function (element, options) {
            var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
            stuff(element, options);
            comments = new WinJS.Binding.List();//每次请求时都要重新new WinJS.Binding.List()，否则所有的评论数据都会被push到其中
            getComment(item, 50);

            setTimeout(function () {                
                if (comments.length === 0) {
                    //如果没有评论，就让“评论”二字隐藏
                    //element.querySelector(".item-comment-title").style.display = "none";
                    comments = new WinJS.Binding.List([{ item: item, commentorLink: "", commentorAvatar: "", commentorName: "", commentCreatedAt: "", comment: "" }]);//, type: "smallListIconTextItem"                    
                } else { }
                //element.querySelector(".item-comment-title").textContent = "评论(" + comments.length + ")";

                //var groupedComments = comments.createGrouped(function (c) { return c.item.id; }, function (c) { return c.item; });
                //var itemDataSourse = groupedComments.groups.dataSource;

                var listView = element.querySelector("#comments").winControl;
                //listView.groupHeaderTemplate = element.querySelector(".headerTemplate");
                listView.itemTemplate = element.querySelector(".commentTemplate");                
                listView.itemDataSource = comments.dataSource;
                //listView.groupDataSource = Data.groups.dataSource;
                listView.layout = new ui.ListLayout({ groupHeaderPosition: "top" });
                element.querySelector("#comments").winControl.forceLayout();
            }, 500);

        }
    });
})();
