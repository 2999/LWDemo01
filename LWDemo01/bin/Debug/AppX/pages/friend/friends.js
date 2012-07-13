(function () {
    "use strict";

    var appModel = Windows.ApplicationModel;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var searchPageURI = "/pages/friend/friends.html";
    var API_DOMAIN = Data.API_DOMAIN;
    var groupedFriend;//这是绑定到zoomedInListView上的数据源
    var _groupedFriend = new WinJS.Binding.List();//这是新取得的好友列表，"组化"后要添加到groupedFriend中
    var _friendNum = 100;
    var _lockFriends = [];//作为一个“锁数组”，用来判断是否应该添加新的数据源。
    //不知道为什么，loadingstatechangedHandle()中的getFriends(handle)会莫名其妙地执行三次


    ui.Pages.define(searchPageURI, {
   
        itemInvoked: function (args) {
            args.detail.itemPromise.done(function itemInvoked(item) {
                // TODO: 导航到已调用的项。
                nav.navigate("/pages/profile/profile.html", { item: item.data });
            });
        },

        // This function updates the ListView with new layouts
        initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            var modernQuotationMark = "&#148;";
            if (viewState === appViewState.snapped) {
                listView.layout = new ui.ListLayout();
                //document.querySelector(".titlearea .pagetitle").innerHTML = modernQuotationMark + toStaticHTML(this.lastSearch) + modernQuotationMark;
                document.querySelector(".titlearea .pagesubtitle").innerHTML = "";
            } else {
                listView.layout = new ui.GridLayout();
                document.querySelector(".titlearea .pagetitle").innerHTML = "好友";
                //document.querySelector(".titlearea .pagesubtitle").innerHTML = "Results for " + modernQuotationMark + toStaticHTML(this.lastSearch) + modernQuotationMark;
            }
        },

        // 每当用户导航至此页面时都要调用此功能。它使用应用程序的数据填充页面元素。
        ready: function (element, options) {
           
            document.querySelector(".titlearea .pagetitle").innerHTML = "Search";

            groupedFriend = Data.friendLists.createGrouped(
                    function (item) { return item.pinyin.toUpperCase().charAt(0) },
                    function (item) { return { nameKey: item.pinyin.toUpperCase().charAt(0) }; }
                    );

            var zoomedInListView = element.querySelector("#zoomedInListView").winControl;
            //zoomedInListView.itemTemplate = mediumListIconTextTemplate;
            //zoomedInListView.groupHeaderTemplate = headerTemplate;
            zoomedInListView.itemDataSource = groupedFriend.dataSource;
            zoomedInListView.groupDataSource = groupedFriend.groups.dataSource;
            zoomedInListView.oniteminvoked = this.itemInvoked;
            zoomedInListView.addEventListener("loadingstatechanged", function () {
                loadingstatechangedHandle(zoomedInListView);
            }, false);
            //this.initializeLayout(element.querySelector("#zoomedInListView").winControl, Windows.UI.ViewManagement.ApplicationView.value);
            //element.querySelector("#zoomedInListView").winControl.forceLayout();

            var zoomedOutListView = element.querySelector("#zoomedOutListView").winControl;
            zoomedOutListView.itemDataSource = groupedFriend.groups.dataSource;
            //element.querySelector("#zoomedOutListView").winControl.forceLayout();

            WinJS.UI.processAll(element);

        },

        // 此功能更新页面布局以响应 viewState 更改。
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            var listView = element.querySelector("#zoomedInListView").winControl;
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

    function loadingstatechangedHandle(listView) {
        //scrollPosition+1366(这是win-viewport)-120(这是margin-left)=win-surface=postNum / 4 * 537 + 5
        //var _scrollPos = listView.scrollPosition;
        var _indexOfLastVisible = listView.indexOfLastVisible;

        //WinJS.log && WinJS.log(_indexOfLastVisible, "sample", "status");

        //如果滚动到了底部，才去试图加载新的内容
        if (_indexOfLastVisible === _friendNum - 1) {
            //如果list的最后的一项和_item的最后一项相同，说明已经把list插入了_item中，则不需要再执行push，否则就执行push            
            //if (_lockFriends[_lockFriends.length - 1] && (_lockFriends[_lockFriends.length - 1].id !== groupedFriend.getAt(groupedFriend.length - 1).id)) {

                //把数据添加到listview中让显示出来
                var handle = function () {
                    //进行“组化                
                    _groupedFriend = _groupedFriend.createGrouped(
                        function (item) { return item.pinyin.toUpperCase().charAt(0) },
                        function (item) { return { nameKey: item.pinyin.toUpperCase().charAt(0) }; }
                        );

                    _groupedFriend.forEach(function (friend) {
                        groupedFriend.push(friend);
                    })
                    listView.loadMorePages();
                    //_lockFriends = [];
                }
                getFriends(handle);
            //}
        }
    }

    //获取好友列表，取100个
    function getFriends(handle) {
        
        var postData = {
            'type': 'FOLLOWING',
            'offset ':_friendNum,
            'size': 10,
            'access_token': localStorage['access_token']
        };
        $.ajax({
            global: false,
            url: API_DOMAIN + '/relationship/friend/list',
            type: 'GET',
            data: postData,
            _success: function (data) {
                data = data.values;
                //如果取得的值为空
                if (data.length === 0) {
                    return;
                }

                //如果存在“锁数组”中的最后一个元素和取得的最后一个元素的id相同，则说明是重复取值，要返回
                if (_lockFriends[_lockFriends.length - 1] && (_lockFriends[_lockFriends.length - 1].id === data[data.length - 1].id)) {
                    return;
                }

                _groupedFriend = new WinJS.Binding.List();
                _friendNum = _friendNum + data.length;

                data.forEach(function (item) {

                    //把没有经过重新改造过的值存入_lockFriends中
                    _lockFriends.push(item);

                    item.group = Data.Groups[2];
                    item.title = item.id;
                    item.subtitle = item.connectionType;
                    item.backgroundImage = item.avatar;
                    item.description = "";
                    _groupedFriend.push(item);
                });
                handle();                
            }
        })
    }

})();
