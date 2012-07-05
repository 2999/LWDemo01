(function () {
    "use strict";

    var appModel = Windows.ApplicationModel;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var searchPageURI = "/pages/friend/friends.html";
    var API_DOMAIN = Data.API_DOMAIN;
    

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
                document.querySelector(".titlearea .pagetitle").innerHTML = "Search";
                //document.querySelector(".titlearea .pagesubtitle").innerHTML = "Results for " + modernQuotationMark + toStaticHTML(this.lastSearch) + modernQuotationMark;
            }
        },

        // 每当用户导航至此页面时都要调用此功能。它使用应用程序的数据填充页面元素。
        ready: function (element, options) {
           
            document.querySelector(".titlearea .pagetitle").innerHTML = "Search";

            var groupedFriend = Data.friendLists.createGrouped(
                    function (item) { return item.pinyin.toUpperCase().charAt(0) },
                    function (item) { return { nameKey: item.pinyin.toUpperCase().charAt(0) }; }
                    );

            var zoomedInListView = element.querySelector("#zoomedInListView").winControl;
            //zoomedInListView.itemTemplate = mediumListIconTextTemplate;
            //zoomedInListView.groupHeaderTemplate = headerTemplate;
            zoomedInListView.itemDataSource = groupedFriend.dataSource;
            zoomedInListView.groupDataSource = groupedFriend.groups.dataSource;
            zoomedInListView.oniteminvoked = this.itemInvoked;
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

    //获取某人的个人详细信息  useless
    //function getProfile(id) {
    //    $.ajax({
    //        global: false,
    //        url: API_DOMAIN + '/user/profile/get',
    //        type: 'GET',
    //        data: {
    //            'userId ': item.id,
    //            'access_token': localStorage['access_token']
    //        },
    //        _success: function (_data) {                    
    //            profileCard = {};
    //            profileCard.friendName = _data.name;
    //            profileCard.friendCreatedAt = _data.createdAt;
    //            profileCard.friendCity = _data.city;
    //            profileCard.friendCompany = _data.company;
    //            profileCard.friendBrief = _data.brief;
    //        }
    //    });
    //}
})();
