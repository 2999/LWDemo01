(function () {
    "use strict";

    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var API_DOMAIN = Data.API_DOMAIN;
    var comments;
    var item;

    //填充item的内容
    var stuff = function (element, options) {
        //var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
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
    function getComment(size) {
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


    //发评论
    function toComment() {
        var content = document.getElementById("commentContent").textContent;
        if (content === "" || content === null) {
            return;
        }
        $.ajax({
            global: false,
            url: API_DOMAIN + '/post/comment/add',
            type: 'POST',
            data: {
                'postId': item.id,
                'publisherId': item.publisher.id,
                'content ': content
            },
            _success: function (_data) {
                if (_data.length !== 0) {
                    document.getElementById("commentContent").textContent = "";

                    //把新添加的评论放入map中
                    var newcomment = {};
                    newcomment.item = item;
                    newcomment.commentorLink = API_DOMAIN + "/u/" + _data.commentor.id;
                    newcomment.commentorAvatar = _data.commentor.avatar;
                    newcomment.commentorName = _data.commentor.name;
                    newcomment.commentCreatedAt = Data.transformDate(_data.createdAt);
                    newcomment.comment = _data.content;
                    comments.push(newcomment);

                    //在页面上插入新的评论
                    //怎么做呢？
                    
                }
            }
        });
    }

    //取消发评论
    function cancleComment() {
        document.getElementById("commentContent").textContent = "";        
    }


    ui.Pages.define("/pages/itemDetail/itemDetail.html", {
        // 每当用户导航至此页面时都要调用此功能。它使用应用程序的数据填充页面元素。
        ready: function (element, options) {
            item = options && options.item ? options.item : Data.items.getAt(0); //Data.resolveItemReference(options.item)
            
            stuff(element, options);
            comments = new WinJS.Binding.List();//每次请求时都要重新new WinJS.Binding.List()，否则所有的评论数据都会被push到其中
            getComment(50);

            setTimeout(function () {                
                if (comments.length === 0) {                    
                    comments = new WinJS.Binding.List([{ item: item, commentorLink: "", commentorAvatar: "", commentorName: "", commentCreatedAt: "", comment: "" }]);//, type: "smallListIconTextItem"                    
                } else { }
                
                var listView = element.querySelector("#comments").winControl;
                listView.itemTemplate = element.querySelector(".commentTemplate");                
                listView.itemDataSource = comments.dataSource;
                listView.layout = new ui.ListLayout({ groupHeaderPosition: "top" });
                element.querySelector("#comments").winControl.forceLayout();
            }, 500);

            
            document.getElementById("submitComment").addEventListener("click", toComment, false);
            document.getElementById("canaleComment").addEventListener("click", cancleComment, false);
        }
    });
})();
