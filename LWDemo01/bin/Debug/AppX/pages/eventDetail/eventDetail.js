(function () {
    "use strict";

    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var API_DOMAIN = Data.API_DOMAIN;
    var currentEventInfo;
    var currentEventPosts;
    var lightGray = "../../images/item_bac01.jpg";
    

    var Groups = [
        { key: "eventDeail", title: "eventDeail", subtitle: "eventDeail subtitle title", backgroundImage: "../../images/avatar180x180.png", description: "this is the eventDeail wall." }
    ];    

    ui.Pages.define("/pages/eventDetail/eventDetail.html", {

        /// <field type="WinJS.Binding.List" />
        items: null,

        // This function updates the ListView with new layouts
        initializeLayout: initializeLayout,

        itemInvoked: function (args) {
            //var item = this.items.getAt(args.detail.itemIndex);
            args.detail.itemPromise.done(function itemInvoked(item) {
                nav.navigate("/pages/itemDetail/itemDetail.html", { item: item.data });
            })
        },

        // 每当用户导航至此页面时都要调用此功能。它使用应用程序的数据填充页面元素。
        ready: function (element, options) {

            var eid = options.item && options.item.id;
            getEventInfo(eid);
            getEventPosts(eid);

            var _this = this;

            setTimeout(function () {
                var listView = element.querySelector(".itemslist").winControl;
                
                var pageList = currentEventPosts.createGrouped(
                    function groupKeySelector(item) { return item.group.key; },
                    function groupDataSelector(item) { return item.group; }
                );

                element.querySelector("header[role=banner] .pagetitle").textContent = currentEventInfo[0] && currentEventInfo[0].eventName;

                listView.itemDataSource = pageList.dataSource;
                listView.itemTemplate = element.querySelector(".itemtemplate");
                listView.groupDataSource = pageList.groups.dataSource;
                listView.groupHeaderTemplate = element.querySelector(".headerTemplate");
                listView.oniteminvoked = _this.itemInvoked.bind(_this);
                
                element.querySelector("#seeAllMember").addEventListener("click",showAllMembers,false);
                

                initializeLayout(listView, Windows.UI.ViewManagement.ApplicationView.value);
                listView.element.focus();
            }, 500);

        },


        unload: function () {
            this.items && this.items.dispose();
        },

        // 此功能更新页面布局以响应 viewState 更改。
        updateLayout: updateLayout
    });

    function initializeLayout(listView, viewState) {            
        if (viewState === appViewState.snapped) {
            listView.layout = new ui.ListLayout();
        } else {
            listView.layout = new ui.GridLayout({ groupHeaderPosition: "left" });
        }
    }

    function updateLayout(element, viewState, lastViewState) {
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


    function getEventInfo(eventId) {
        currentEventInfo = [];
        $.ajax({
            global: false,
            url: API_DOMAIN + '/event/get',
            type: 'GET',
            data: { "eventId": eventId,'access_token': localStorage['access_token']},
            _success: function (_data) {
                var obj = {};
                obj.eventName = Groups[0].eventName = _data.title;
                obj.eventCreatorTime = Groups[0].eventCreatorTime = _data.creator.name + "创建于：" + Data.transformDate(_data.createdAt);
                obj.eventMemberNum = Groups[0].eventMemberNum = "当前参与人数：" + _data.totalMemberCount;
                currentEventInfo.push(obj);
            }
        });
    }


    function getEventPosts(id) {
        currentEventPosts = new WinJS.Binding.List();
        var postData = {
            'eventId': (id ? id : ''),
            'cursor': 0,
            'size': 50,
            'access_token': localStorage['access_token']
        };
        $.ajax({
            global: false,
            url: API_DOMAIN + '/feed/post/event/list',
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
                    item.group = Groups[0];
                    item.group.title = item.publisher.name;

                    item.title = Data.transformDate(item.createdAt);
                    item.subtitle = "";
                    item.description = item.content.substr(0, 100);
                    item.content = item.content;
                    item.backgroundImage = (!!(item.attachments[0]) && item.attachments[0].picture) ? item.attachments[0].picture : lightGray;
                    //如果用户没有发图片，就要用内容代替图片
                    //item.imageReplacer = (!item.attachments[0] || !item.attachments[0].picture) ? item.description : "";
                    //item.type = 'smallItem';
                    currentEventPosts.push(item);

                });
            }
        });
    }

    function showAllMembers() {
        WinJS.log && WinJS.log("eventDetailMembers", "samples", "status");
        WinJS.UI.SettingsFlyout.showSettings("defaults", "eventDetailMembers.html");
    }

})();

