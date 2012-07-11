(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var API_DOMAIN = Data.API_DOMAIN;

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

        initializeMyPostLayout: function (myPostListView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            if (viewState === appViewState.snapped) {
                myPostListView.itemDataSource = Data.groups.dataSource;
                myPostListView.groupDataSource = null;
                myPostListView.layout = new ui.ListLayout();
            } else {
                myPostListView.itemDataSource = Data.myPostList.dataSource;
                myPostListView.groupDataSource = Data.myPostListGroups.dataSource;
                myPostListView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
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
                nav.navigate("/pages/itemDetail/itemDetail.html", { item: item });//Data.getItemReference(item)
                //}
            }
        },

        // 每当用户导航至此页面时都要调用此功能。它使用应用程序的数据填充页面元素。
        ready: function (element, options) {

            //这个是关于主墙的
            var listView = element.querySelector(".groupeditemslist").winControl;
            listView.groupHeaderTemplate = element.querySelector(".headerTemplate");
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = this.itemInvoked.bind(this);
            this.initializeLayout(listView, appView.value);
            //listView.element.focus();

            //这个是关于展示个人所发的信息的
            var myPostListView = element.querySelector("#mypostlist").winControl;
            myPostListView.groupHeaderTemplate = element.querySelector(".headerTemplate");
            myPostListView.itemTemplate = element.querySelector(".itemtemplate");
            myPostListView.oniteminvoked = this.itemInvoked.bind(this);
            this.initializeMyPostLayout(myPostListView, appView.value);
            //myPostListView.element.focus();

            this.otherTools(element, options);

            //绑定右上角的头像事件
            document.getElementById("buyButton").addEventListener("click", showConfirmFlyout, false);
            document.getElementById("confirmButton").addEventListener("click", confirmOrder, false);
            //document.getElementById("confirmFlyout").addEventListener("afterhide", onDismiss, false);

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

    

    function showConfirmFlyout() {
        //WinJS.log && WinJS.log("", "sample", "status");
        var buyButton = document.getElementById("buyButton");
        document.getElementById("confirmFlyout").winControl.show(buyButton);
    }

    function confirmOrder() {
        //WinJS.log && WinJS.log("You have completed your purchase.", "sample", "status");
        document.getElementById("confirmFlyout").winControl.hide();
        
        var button = document.getElementById("confirmButton");                
        document.getElementById("postPopup").winControl.show(button);

        document.getElementById("submitPost").addEventListener("click", submitPost, false);
        document.getElementById("canalePost").addEventListener("click", canalePost, false);

        // Create the message dialog and set its content
        //var msg = new Windows.UI.Popups.MessageDialog("<textarea style='width:100px; height:50px;' placeholder='分享这一刻……'></textarea>");        
        // Add commands and set their command handlers
        //msg.commands.append(new Windows.UI.Popups.UICommand("Try again", commandInvokedHandler));
        //msg.commands.append(new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));
        // Set the command that will be invoked by default
        //msg.defaultCommandIndex = 0;
        // Set the command to be invoked when escape is pressed
        //msg.cancelCommandIndex = 1;
        // Show the message dialog
        //msg.showAsync();
    }

    //function commandInvokedHandler(command) {
    //    // Display message                          
    //    WinJS.log && WinJS.log("The '" + command.label + "' command has been selected.", "sample", "status");
    //}
    //function onDismiss() {
    //        WinJS.log && WinJS.log("The purchase was not completed.", "sample", "status");
    //}

    function submitPost() {
        var content = document.getElementById("postContent").textContent;

        var postData = {
            'content ': content,
            'scope ': 'private'
        };
        $.ajax({
            global: false,
            url: API_DOMAIN + '/post/add',
            type: 'POST',
            data: postData,
            _success: function (data) {
                //WinJS.log && WinJS.log("Hello , new post ! ", "sample", "status");

                document.getElementById("postPopup").winControl.hide();
            }
        })
    }

    function canalePost() {

        //WinJS.UI.Animation.showPopup(myPopupUI, null);

        document.getElementById("postPopup").winControl.hide();

    }
  

})();
