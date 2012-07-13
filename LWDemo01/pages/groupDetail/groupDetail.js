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
    var _cursor = "0";
    //var pageList;
    var postNum = 0;
    var scrollPosition = 0;
    var scene = "laiwang1";//场景：有两种，一种是个人主Feeds墙，一种是个人发的posts墙
    

    function getStream(handle, id) {
        var id = id || '';
        var postData = {};
        var url = "";
        if (scene === "laiwang2") {
            url = "/feed/post/user/list";
            postData = {
                'userId ': (id ? id : ''),
                'cursor': _cursor,
                'size': 24,
                'access_token': localStorage['access_token']
            };
        } else {
            url = "/feed/post/main/list";
            postData = {
                'cursor': _cursor,
                'size': 24,
                'access_token': localStorage['access_token']
            };
        }

        $.ajax({
            global: false,
            url: API_DOMAIN + url,
            type: 'GET',
            data: postData,
            _success: function (data) {

                list = new WinJS.Binding.List();

                //对data重新赋值
                data = data.values;

                //如果取得的值为空
                if (data.length === 0) {
                    return;
                }

                postNum = postNum + data.length;
                //_cursor = data[data.length - 1].createdAt;
                scrollPosition = postNum / 4 * 537 + 5;

                //WinJS.log && WinJS.log(postNum + "--" + _scrollPos, "sample", "status");

                for (var index in data) {
                    data[index].content = data[index].content.replace(/\n/gi, '<br/>');
                }
                data.forEach(function (item) {//to do rebuild

                    // Each of these sample items should have a reference to a particular group.
                    item.group = Groups[0];//通过上面的ajax请求获取到的都是laiwang主墙信息，所以取Groups数组中的第0项：laiwang
                                        
                    item.itemPublisherAvatar = item.publisher.avatar;
                    item.pname = item.publisher.name;
                    item.ptime = Data.transformDate(item.createdAt);
                    item.title = Data.transformDate(item.createdAt);
                    if (scene === "laiwang2") {
                        item.subtitle = "我";
                    } else {
                        item.subtitle = item.publisher.name;
                    }
                    
                    item.description = item.content.substr(0, 100);
                    item.content = item.content;
                    item.backgroundImage = (!!(item.attachments[0]) && item.attachments[0].picture) ? item.attachments[0].picture : lightGray;
                    //如果用户没有发图片，就要用内容代替图片
                    item.imageReplacer = (!item.attachments[0] || !item.attachments[0].picture) ? item.description : "";
                    //item.type = getOneSize();
                    list.push(item);
                });
                handle();
            }
        });
    }
      
    function loadingstatechangedHandle(listView,_items) {
        //scrollPosition+1366(这是win-viewport)-120(这是margin-left)=win-surface=postNum / 4 * 537 + 5
        var _scrollPos = listView.scrollPosition;

        //WinJS.log && WinJS.log(_scrollPos + "--" + scrollPosition, "sample", "status");

        //判断scrollPositon和listView的实际长度，如果滚动到了底部，才去试图加载新的内容
        if (_scrollPos + 1366 - 120 === scrollPosition) {
            //如果list的最后的一项的创建时间(即:变量_cursor)和_item的最后一项的创建时间相同，说明已经把list插入了_item中，则不需要再执行push，否则就执行push                    
            //var _itemsLastCreatedAt = _items.getAt(_items.length - 1) && _items.getAt(_items.length - 1).createdAt;
            if (_cursor !== (_items.getAt(_items.length - 1) && _items.getAt(_items.length - 1).createdAt)) {

                _cursor = _items.getAt(_items.length - 1).createdAt;

                //把数据添加到listview中让显示出来
                var handle = function () {                            
                    list.forEach(function (item) {
                        _items.push(item);
                    });
                    listView.loadMorePages();
                }
                getStream(handle);
            }                    
        }
    }

    function stuffListView(element, listView, group, _items) {
        //this.items = Data.getItemsFromGroup(group);

        element.querySelector("header[role=banner] .pagetitle").textContent = group.title;

        //初始化listview控件的属性，目的是让其滚动加载
        listView.loadingBehavior = 'incremental';
        listView.pagesToLoad = 2;
        listView.automaticallyLoadPages = true;
        listView.pagesToLoadThreshold = 1;
        //listView.itemDataSource = pageList.dataSource;
        listView.itemDataSource = _items.dataSource;
        listView.itemTemplate = element.querySelector(".itemtemplate");
        listView.oniteminvoked = this.itemInvoked.bind(this);
        //var _items = this.items;
        listView.addEventListener("loadingstatechanged", function () {
            loadingstatechangedHandle(listView, _items);
        }, false);

        this.initializeLayout(listView, Windows.UI.ViewManagement.ApplicationView.value);
        listView.element.focus();
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
            scene = group.key;//全局变量，确定场景：是个人主墙，还是个人post墙
            var _this = this;
            var _items = this.items;
            //把数据添加到listview中让显示出来
            var handle = function () {
                _items = list;
                stuffListView.apply(_this, [element, listView, group, _items]);
            }
            getStream(handle);           
        },

        unload: function () {
            //this.items && this.items.dispose();
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
