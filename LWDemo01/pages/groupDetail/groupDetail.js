(function () {
    "use strict";

    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var API_DOMAIN = Data.API_DOMAIN;
    var Groups = Data.Groups;

    var lightGray = "../../images/item_bac01.jpg";
    var list = new WinJS.Binding.List();
    var _cursor = 0;
    var pageList;

    function getStream(id) {
        var id = id || '';
        var postData = {
            'cursor': _cursor,
            'size': 24,
            'access_token': localStorage['access_token']
        };
        $.ajax({
            global: false,
            url: API_DOMAIN + '/feed/post/main/list',  //获取laiwang主墙
            type: 'GET',
            data: postData,
            _success: function (data) {

                data = data.values;

                //如果取得的值为空
                if (data.length === 0) {
                    return;
                }
                for (var index in data) {
                    data[index].content = data[index].content.replace(/\n/gi, '<br/>');
                }
                data.forEach(function (item) {//to do rebuild

                    // Each of these sample items should have a reference to a particular group.
                    item.group = Groups[0];//通过上面的ajax请求获取到的都是laiwang主墙信息，所以取Groups数组中的第0项：laiwang

                    //item.key = item.id;
                    item.itemPublisherAvatar = item.publisher.avatar;
                    item.pname = item.publisher.name;
                    item.ptime = Data.transformDate(item.createdAt);
                    item.title = Data.transformDate(item.createdAt);
                    item.subtitle = item.publisher.name;
                    item.description = item.content.substr(0, 100);
                    item.content = item.content;
                    item.backgroundImage = (!!(item.attachments[0]) && item.attachments[0].picture) ? item.attachments[0].picture : lightGray;
                    //如果用户没有发图片，就要用内容代替图片
                    item.imageReplacer = (!item.attachments[0] || !item.attachments[0].picture) ? item.description : "";
                    //item.type = getOneSize();
                    list.push(item);
                });
            }
        });
    }

   

    ui.Pages.define("/pages/groupDetail/groupDetail.html", {

        /// <field type="WinJS.Binding.List" />
        items: null,

        // This function updates the ListView with new layouts
        initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            if (viewState === appViewState.snapped) {
                listView.layout = new ui.ListLayout();
            } else {
                listView.layout = new ui.GridLayout({ groupHeaderPosition: "left" });
            }
        },

        itemInvoked: function (args) {
            var item = this.items.getAt(args.detail.itemIndex);
            nav.navigate("/pages/itemDetail/itemDetail.html", { item: item });//Data.getItemReference(item)
        },

        // 每当用户导航至此页面时都要调用此功能。它
        // 使用应用程序的数据填充页面元素。
        ready: function (element, options) {
            var listView = element.querySelector(".itemslist").winControl;
            var group = (options && options.groupKey) ? Data.resolveGroupReference(options.groupKey) : Data.groups.getAt(0);
            this.items = Data.getItemsFromGroup(group);
            pageList = this.items.createGrouped(
                function groupKeySelector(item) { return group.key; },
                function groupDataSelector(item) { return group; }
            );

            _cursor = this.items.getAt(this.items.length - 1).createdAt;

            element.querySelector("header[role=banner] .pagetitle").textContent = group.title;            

            
            function detect2load(listView) {
                var lastIndex = listView.indexOfLastVisible;
                if(lastIndex === 24){
                    getStream();
                }
            }

            //初始化listview控件的属性，目的是让其滚动加载
            listView.loadingBehavior= 'incremental';
            listView.pagesToLoad= 2;
            listView.automaticallyLoadPages= true;
            listView.pagesToLoadThreshold= 1;
            //listView.selectionMode= 'none';
            //listView.tapBehavior= 'none';
            //listView.swipeBehavior= 'none' ;

            listView.itemDataSource = pageList.dataSource;
            listView.itemTemplate = element.querySelector(".itemtemplate");
            //listView.groupDataSource = pageList.groups.dataSource;
            //listView.groupHeaderTemplate = element.querySelector(".headerTemplate");
            listView.oniteminvoked = this.itemInvoked.bind(this);

            listView.addEventListener("scroll", detect2load, false);
            listView.dispatchEvent("scroll", this);
                        

            //WinJS.log && WinJS.log("1", "sample", "status");

            this.initializeLayout(listView, Windows.UI.ViewManagement.ApplicationView.value);
            listView.element.focus();
        },


        unload: function () {
            this.items.dispose();
        },

        // 此功能更新页面布局以响应 viewState 更改。
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            var listView = element.querySelector(".itemslist").winControl;
            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    var firstVisible = listView.indexOfFirstVisible;
                    this.initializeLayout(listView, viewState);
                    listView.indexOfFirstVisible = firstVisible;
                }
            }
        }
    });
})();
