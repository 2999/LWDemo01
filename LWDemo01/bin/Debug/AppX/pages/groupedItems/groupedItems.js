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
            document.getElementById("myAvatar").addEventListener("click", showConfirmFlyout, false);
            document.getElementById("confirmButton").addEventListener("click", confirmOrder, false);
            document.getElementById("addEvent").addEventListener("click", addEventOrder, false);
            
            // Set the default state of scenario buttons            
            //document.getElementById('scenarioHideButtons').disabled = true;
            // Set the default state of all the AppBar
            document.getElementById('postPopup').winControl.sticky = true;
            // Listen for the AppBar events and enable and disable the buttons if the bar is shown or hidden
            document.getElementById('postPopup').winControl.addEventListener("aftershow", scenarioBarShown, false);
            document.getElementById('postPopup').winControl.addEventListener("beforehide", scenarioBarHidden, false);

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
        var myAvatar = document.getElementById("myAvatar");
        document.getElementById("confirmFlyout").winControl.show(myAvatar);
    }

    function confirmOrder() {
        //WinJS.log && WinJS.log("You have completed your purchase.", "sample", "status");
        //document.getElementById("confirmFlyout").winControl.hide();
        document.getElementById('postPopup').winControl.show();
        
        //var button = document.getElementById("confirmButton");                
        //document.getElementById("postPopup").winControl.show(button);

        document.getElementById("submitPost").addEventListener("click", submitPost, false);
        document.getElementById("canalePost").addEventListener("click", canalePost, false);
    }
    
    function addEventOrder() {           
        document.getElementById('addEventPopup').winControl.show();
        document.getElementById("submitEvent").addEventListener("click", submitEvent, false);
        document.getElementById("canaleEvent").addEventListener("click", canaleEvent, false);
    }


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

                //发完post后应该在主墙上出现

            }
        })
    }

    function canalePost() {
        //WinJS.UI.Animation.showPopup(myPopupUI, null);
        document.getElementById("postPopup").winControl.hide();
    }
  
    function submitEvent() {
        var _title = document.getElementById("event-title").value;
        var _type = document.getElementById("type-recorder").value;
        var postData = {
            'title': _title,
            'type': _type
        };
        $.ajax({
            global: false,
            url: API_DOMAIN + '/event/add',
            type: 'POST',
            data: postData,
            _success: function (data) {
                //WinJS.log && WinJS.log("Hello , new post ! ", "sample", "status");

                document.getElementById("addEventPopup").winControl.hide();
            }
        })

    }

    function canaleEvent() {
        //WinJS.UI.Animation.showPopup(myPopupUI, null);
        document.getElementById("addEventPopup").winControl.hide();
    }

    // These functions are used by the scenario to disable and enable the scenario buttons when the AppBar shows and hides
    function scenarioBarShown() {
        //document.getElementById('scenarioShowBar').disabled = true;
        //if (document.getElementById('cmdAdd').style.visibility === "hidden") {
            
        //} else {
            //document.getElementById('scenarioHideButtons').disabled = false;
        //}
    }

    function scenarioBarHidden() {
        //document.getElementById('scenarioShowBar').disabled = false;
       
        //document.getElementById('scenarioHideButtons').disabled = true;
    }

})();


function switchEventPublic() {
    document.getElementById("type-recorder").value = "public";
}

function switchEventPrivate() {
    document.getElementById("type-recorder").value = "private";
}