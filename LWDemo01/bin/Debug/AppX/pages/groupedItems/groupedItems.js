(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    ui.Pages.define("/pages/groupedItems/groupedItems.html", {

        // This function updates the ListView with new layouts
        initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            if (viewState === appViewState.snapped) {
                listView.itemDataSource = Data.groups.dataSource;
                listView.groupDataSource = null;
                listView.layout = new ui.ListLayout();
            } else {
                listView.itemDataSource = Data.items.dataSource;
                listView.groupDataSource = Data.groups.dataSource;
                listView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
            }
        },

        itemInvoked: function (args) {
            if (appView.value === appViewState.snapped) {
                // 如果页面已对齐，则表示用户已调用组。
                var group = Data.groups.getAt(args.detail.itemIndex);
                nav.navigate("/pages/groupDetail/groupDetail.html", { groupKey: group.key });
            } else {
                // 如果页面未对齐，则表示用户已调用项。
                var item = Data.items.getAt(args.detail.itemIndex);
                //if (item.group.key === "laiwang1") {
                    nav.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
                //}
            }
        },

        // 每当用户导航至此页面时都要调用此功能。它使用应用程序的数据填充页面元素。
        ready: function (element, options) {
            var listView = element.querySelector(".groupeditemslist").winControl;
            listView.groupHeaderTemplate = element.querySelector(".headerTemplate");
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = this.itemInvoked.bind(this);

            this.initializeLayout(listView, appView.value);
            //listView.forceLayout();
            listView.element.focus();

            this.otherTools(element, options);
        },
        otherTools: function (element, options) {
            var otherToolListView = element.querySelector(".othertoolslist").winControl;
            otherToolListView.itemTemplate = element.querySelector(".othertooltemplate");
            otherToolListView.itemDataSource = Data.otherToolsList.dataSource;
            otherToolListView.oniteminvoked = function (args) {
                var item = Data.otherToolsList.getAt(args.detail.itemIndex);
                if (item.key === "friends") {
                    nav.navigate("/pages/friend/friends.html", { item: Data.friendLists });
                } else if (item.key === "events") {
                    nav.navigate("/pages/events/events.html", { item: Data.eventLists });
                } else {

                }
                otherToolListView = new ui.GridLayout({ groupHeaderPosition: "top" });
                element.querySelector(".othertoolslist").winControl.forceLayout();
                //otherToolListView.forceLayout();
            }
        },

        // 此功能更新页面布局以响应 viewState 更改。
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            var listView = element.querySelector(".groupeditemslist").winControl;
            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    this.initializeLayout(listView, viewState);
                }
            }
        }
    });
})();
