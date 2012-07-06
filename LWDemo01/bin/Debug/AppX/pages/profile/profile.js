(function () {
    "use strict";

    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var API_DOMAIN = Data.API_DOMAIN;
    var profileInfo;
    var profilePosts;
    var lightGray = "../images/item_bac01.jpg";

    var Groups = [
        { key: "profile", title: "profile", subtitle: "profile subtitle title", backgroundImage: "../../images/avatar180x180.png", description: "this is the profile brief wall." }
    ];

    ui.Pages.define("/pages/profile/profile.html", {
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

            var pid = options.item && options.item.id;
            getProfile(pid);
            getSomeBodyStream(pid);

            var _this = this;

            setTimeout(function () {
                var listView = element.querySelector(".itemslist").winControl;
                //var group = (options && options.groupKey) ? Data.resolveGroupReference(options.groupKey) : Data.groups.getAt(0);
                //this.items = Data.getItemsFromGroup(group);
                var pageList = profilePosts.createGrouped(
                    function groupKeySelector(item) { return item.group.key; },
                    function groupDataSelector(item) { return item.group; }
                );

                element.querySelector("header[role=banner] .pagetitle").textContent = profileInfo[0] && profileInfo[0].profileName;

                listView.itemDataSource = pageList.dataSource;
                listView.itemTemplate = element.querySelector(".itemtemplate");
                listView.groupDataSource = pageList.groups.dataSource;
                listView.groupHeaderTemplate = element.querySelector(".headerTemplate");
                listView.oniteminvoked = _this.itemInvoked;

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
         /// <param name="listView" value="WinJS.UI.ListView.prototype" />

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
                initializeLayout(listView, viewState);
                listView.indexOfFirstVisible = firstVisible;
            }
        }
    }

    function getProfile(pId) {
        profileInfo = [];
        //获取某人的个人详细信息         
        $.ajax({
            global: false,
            url: API_DOMAIN + '/user/page/get',
            type: 'GET',
            data: {
                'userId ': pId,
                'access_token': localStorage['access_token']
            },
            _success: function (_data) {
                var obj = {};
                obj.profileName = Groups[0].profileName = _data.name;
                obj.profileAvatar = Groups[0].profileAvatar = _data.avatarBig;
                obj.profileDescription = Groups[0].profileDescription = _data.brief;
                profileInfo.push(obj);
            }
        });
    }

    //
    function getSomeBodyStream(id) {
        profilePosts = new WinJS.Binding.List();
        var postData = {
            'userId ': (id ? id : ''),
            'cursor': 0,
            'size': 25,
            'access_token': localStorage['access_token']
        };
        $.ajax({
            global: false,
            url: API_DOMAIN + '/feed/post/user/list', 
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
                    profilePosts.push(item);
                });
            }
        });
    }

})();
