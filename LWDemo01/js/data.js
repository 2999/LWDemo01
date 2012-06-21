(function () {
    "use strict";

    var __DOMAIN__ = 'http://laiwang.com';
    var __API_DOMAIN__ = 'http://api.laiwang.com/v1';
    var __LENGTH__ = 25;


    var groupDescription = "Group Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor scelerisque lorem in vehicula. Aliquam tincidunt, lacus ut sagittis tristique, turpis massa volutpat augue, eu rutrum ligula ante a ante";
    var itemDescription = "Item Description: Pellentesque porta mauris quis interdum vehicula urna sapien ultrices velit nec venenatis dui odio in augue cras posuere enim a cursus convallis neque turpis malesuada erat ut adipiscing neque tortor ac erat";
    var itemContent = "<p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat";

    // 这三个字符串将对占位符图像进行编码。您需要将
    // 实际数据中的 backgroundImage 属性设置为图像的 URL。
    var lightGray = "../images/item_bac01.jpg";//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY7h4+cp/AAhpA3h+ANDKAAAAAElFTkSuQmCC";
    var mediumGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY5g8dcZ/AAY/AsAlWFQ+AAAAAElFTkSuQmCC";
    var darkGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";

    // 这些示例组中的每个组都必须具有一个将单独显示的唯一键。
    //var sampleGroups = [
    //    { key: "group1", title: "Group Title: 1", subtitle: "Group Subtitle: 1", backgroundImage: darkGray, description: groupDescription },
    //    { key: "group2", title: "Group Title: 2", subtitle: "Group Subtitle: 2", backgroundImage: lightGray, description: groupDescription },
    //    { key: "group3", title: "Group Title: 3", subtitle: "Group Subtitle: 3", backgroundImage: mediumGray, description: groupDescription },
    //    { key: "group4", title: "Group Title: 4", subtitle: "Group Subtitle: 4", backgroundImage: lightGray, description: groupDescription },
    //    { key: "group5", title: "Group Title: 5", subtitle: "Group Subtitle: 5", backgroundImage: mediumGray, description: groupDescription },
    //    { key: "group6", title: "Group Title: 6", subtitle: "Group Subtitle: 6", backgroundImage: darkGray, description: groupDescription }
    //];
    var Groups = [
        { key: "laiwang1", title: "来往", subtitle: "laiwang subtitle title", backgroundImage: darkGray, description: "this is the laiwang brief wall." },
        { key: "laiwang2", title: "个人", subtitle: "myprofile subtitle title", backgroundImage: darkGray, description: "this is the myprofile." },
        { key: "laiwang3", title: "好友", subtitle: "friend subtitle title", backgroundImage: darkGray, description: "this is the all friend." },
        { key: "laiwang4", title: "在一起", subtitle: "event subtitle title", backgroundImage: darkGray, description: "this is the all events." }
    ];
    //四种item的规格，其实它们都是在css中定义的样式：小方，中长 ，中竖 ，大方 
    var sizes = ["smallItem", "midWidthItem", "midHeightItem", "largeItem"];

    

    // 这些示例项的每个项都应具有对特定组的引用。
   /* //var sampleItems = [
        { group: sampleGroups[0], title: "Item Title: 1", subtitle: "Item Subtitle: 1", description: itemDescription, content: itemContent, backgroundImage: lightGray },
        { group: sampleGroups[0], title: "Item Title: 2", subtitle: "Item Subtitle: 2", description: itemDescription, content: itemContent, backgroundImage: darkGray },
        { group: sampleGroups[0], title: "Item Title: 3", subtitle: "Item Subtitle: 3", description: itemDescription, content: itemContent, backgroundImage: mediumGray },
        { group: sampleGroups[0], title: "Item Title: 4", subtitle: "Item Subtitle: 4", description: itemDescription, content: itemContent, backgroundImage: darkGray },
        { group: sampleGroups[0], title: "Item Title: 5", subtitle: "Item Subtitle: 5", description: itemDescription, content: itemContent, backgroundImage: mediumGray },

        { group: sampleGroups[1], title: "Item Title: 1", subtitle: "Item Subtitle: 1", description: itemDescription, content: itemContent, backgroundImage: darkGray },
        { group: sampleGroups[1], title: "Item Title: 2", subtitle: "Item Subtitle: 2", description: itemDescription, content: itemContent, backgroundImage: mediumGray },
        { group: sampleGroups[1], title: "Item Title: 3", subtitle: "Item Subtitle: 3", description: itemDescription, content: itemContent, backgroundImage: lightGray },

        { group: sampleGroups[2], title: "Item Title: 1", subtitle: "Item Subtitle: 1", description: itemDescription, content: itemContent, backgroundImage: mediumGray },
        { group: sampleGroups[2], title: "Item Title: 2", subtitle: "Item Subtitle: 2", description: itemDescription, content: itemContent, backgroundImage: lightGray },
        { group: sampleGroups[2], title: "Item Title: 3", subtitle: "Item Subtitle: 3", description: itemDescription, content: itemContent, backgroundImage: darkGray },
        { group: sampleGroups[2], title: "Item Title: 4", subtitle: "Item Subtitle: 4", description: itemDescription, content: itemContent, backgroundImage: lightGray },
        { group: sampleGroups[2], title: "Item Title: 5", subtitle: "Item Subtitle: 5", description: itemDescription, content: itemContent, backgroundImage: mediumGray },
        { group: sampleGroups[2], title: "Item Title: 6", subtitle: "Item Subtitle: 6", description: itemDescription, content: itemContent, backgroundImage: darkGray },
        { group: sampleGroups[2], title: "Item Title: 7", subtitle: "Item Subtitle: 7", description: itemDescription, content: itemContent, backgroundImage: mediumGray },

        { group: sampleGroups[3], title: "Item Title: 1", subtitle: "Item Subtitle: 1", description: itemDescription, content: itemContent, backgroundImage: darkGray },
        { group: sampleGroups[3], title: "Item Title: 2", subtitle: "Item Subtitle: 2", description: itemDescription, content: itemContent, backgroundImage: lightGray },
        { group: sampleGroups[3], title: "Item Title: 3", subtitle: "Item Subtitle: 3", description: itemDescription, content: itemContent, backgroundImage: darkGray },
        { group: sampleGroups[3], title: "Item Title: 4", subtitle: "Item Subtitle: 4", description: itemDescription, content: itemContent, backgroundImage: lightGray },
        { group: sampleGroups[3], title: "Item Title: 5", subtitle: "Item Subtitle: 5", description: itemDescription, content: itemContent, backgroundImage: mediumGray },
        { group: sampleGroups[3], title: "Item Title: 6", subtitle: "Item Subtitle: 6", description: itemDescription, content: itemContent, backgroundImage: lightGray },

        { group: sampleGroups[4], title: "Item Title: 1", subtitle: "Item Subtitle: 1", description: itemDescription, content: itemContent, backgroundImage: lightGray },
        { group: sampleGroups[4], title: "Item Title: 2", subtitle: "Item Subtitle: 2", description: itemDescription, content: itemContent, backgroundImage: darkGray },
        { group: sampleGroups[4], title: "Item Title: 3", subtitle: "Item Subtitle: 3", description: itemDescription, content: itemContent, backgroundImage: lightGray },
        { group: sampleGroups[4], title: "Item Title: 4", subtitle: "Item Subtitle: 4", description: itemDescription, content: itemContent, backgroundImage: mediumGray },

        { group: sampleGroups[5], title: "Item Title: 1", subtitle: "Item Subtitle: 1", description: itemDescription, content: itemContent, backgroundImage: lightGray },
        { group: sampleGroups[5], title: "Item Title: 2", subtitle: "Item Subtitle: 2", description: itemDescription, content: itemContent, backgroundImage: darkGray },
        { group: sampleGroups[5], title: "Item Title: 3", subtitle: "Item Subtitle: 3", description: itemDescription, content: itemContent, backgroundImage: mediumGray },
        { group: sampleGroups[5], title: "Item Title: 4", subtitle: "Item Subtitle: 4", description: itemDescription, content: itemContent, backgroundImage: darkGray },
        { group: sampleGroups[5], title: "Item Title: 5", subtitle: "Item Subtitle: 5", description: itemDescription, content: itemContent, backgroundImage: lightGray },
        { group: sampleGroups[5], title: "Item Title: 6", subtitle: "Item Subtitle: 6", description: itemDescription, content: itemContent, backgroundImage: mediumGray },
        { group: sampleGroups[5], title: "Item Title: 7", subtitle: "Item Subtitle: 7", description: itemDescription, content: itemContent, backgroundImage: darkGray },
        { group: sampleGroups[5], title: "Item Title: 8", subtitle: "Item Subtitle: 8", description: itemDescription, content: itemContent, backgroundImage: lightGray }
    ];*/

    // Get a reference for an item, using the group key and item title as a unique reference to the item that can be easily serialized.
    function getItemReference(item) {
        return [item.group.key, item.title];
    }

    function resolveGroupReference(key) {
        for (var i = 0; i < groupedItems.groups.length; i++) {
            if (groupedItems.groups.getAt(i).key === key) {
                return groupedItems.groups.getAt(i);
            }
        }
    }

    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }

    //重新设置jQuery的ajax
    function ajaxSet() {
        $.ajaxSetup({
            cache: false,
            dataType: 'json',
            data: {},
            beforeSend: function (jqXHR, settings) {
                if (typeof this.data === 'string') {
                    this.data = this.data.replace(/%[0-1][0-9a-f]/g, '%20');
                    this.data += '&access_token=' + localStorage['access_token'];
                } else if (typeof this.data === 'object') {
                    this.data['access_token'] = localStorage['access_token'];
                }
                this._beforeSend && this._beforeSend(jqXHR, settings);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                this._error && this._error(jqXHR, textStatus, errorThrown);
                this._failure && this._failure(jqXHR, textStatus, errorThrown);

                var errorObject = $.parseJSON(jqXHR.responseText);

                if (errorObject.error === "invalid_token" || errorObject.error === "expired_token" || errorObject.error === "invalid_grant") {
                    authentication.refreshAccessToken(function () {
                        //babylon.init();//?????????????????????????
                        //$('#index').trigger('click');
                    }, function () {
                        authentication.toAuthorizePage();
                    });
                }
            },
            success: function (data, textStatus, jqXHR) {
                if (!data) return;
                this._success && this._success(data, textStatus, jqXHR);
            }
        });
    }

    ajaxSet();


    //根据id获得某人的主墙
    //没有id也行
    function getStream(id) {
        var id = id || '';
        //var subUri = {
        //    stream: '/feed/post/main/list',
        //    incoming: '/feed/post/incoming/list',
        //    group: '/feed/post/circle/list'
        //};
        var postData = {
            'cursor': 0,
            'size': __LENGTH__,
            'access_token': localStorage['access_token']
        };
        $.ajax({
            global: false,
            url: __API_DOMAIN__ + '/feed/post/main/list',  //获取laiwang主墙
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
                    item.ptime = transformDate(item.createdAt);
                    item.title = transformDate(item.createdAt);
                    item.subtitle = item.publisher.name;
                    item.description = item.content.substr(0, 100);
                    item.content = item.content;
                    item.backgroundImage = (!!(item.attachments[0]) && item.attachments[0].picture) ? item.attachments[0].picture : lightGray;
                    //如果用户没有发图片，就要用内容代替图片
                    item.imageReplacer = (!item.attachments[0] || !item.attachments[0].picture) ? item.description : "";
                    item.type = getOneSize();
                    list.push(item);
                });
            }
        });
    }

    //根据id获得某人的profile  posts
    //没有id也行
    function getSomeBodyStream(id) {
        //var id = id || '';
        var postData = {
            'userId ':(id?id:''),
            'cursor': 0,
            'size': __LENGTH__,
            'access_token': localStorage['access_token']
        };
        $.ajax({
            global: false,
            url: __API_DOMAIN__ + '/feed/post/user/list',  //获取laiwang主墙
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
                    item.group = Groups[1];

                    //item.key = item.id;
                    item.itemPublisherAvatar = item.publisher.avatar;
                    item.pname = item.publisher.name;
                    item.ptime = transformDate(item.createdAt);
                    item.title = transformDate(item.createdAt);
                    item.subtitle = "我";
                    item.description = item.content.substr(0, 100);
                    item.content = item.content;
                    item.backgroundImage = (!!(item.attachments[0]) && item.attachments[0].picture) ? item.attachments[0].picture : lightGray;
                    //如果用户没有发图片，就要用内容代替图片
                    item.imageReplacer = (!item.attachments[0] || !item.attachments[0].picture) ? item.description : "";
                    item.type = getOneSize();
                    list.push(item);
                });
            }
        });
    }

    //获取好友列表，暂时只取100个
    function getFriends() {
        var postData = {
            'type': 'FOLLOWING',
            'size': 100,
            'access_token': localStorage['access_token']
        };
        $.ajax({
            global: false,
            url: __API_DOMAIN__ + '/relationship/friend/list',
            type: 'GET',
            data: postData,
            _success: function (data) {
                data = data.values;
                //如果取得的值为空
                if (data.length === 0) {
                    return;
                }
                data.forEach(function (item) {
                    item.group = Groups[2];
                    item.title = item.id;
                    item.subtitle = item.connectionType;
                    item.backgroundImage = item.avatar;
                    item.description = "";
                    friendLists.push(item);
                });
            }
        })
    }

    //获取event列表，暂时只取50个
    function getEvents(_id,_type) {
        var postData = {
            'type  ': (_type ? _type : 'JOIN'),
            'userId ':(_id?_id:''),
            'size': __LENGTH__,
            'access_token': localStorage['access_token']
        };
        $.ajax({
            global: false,
            url: __API_DOMAIN__ + '/event/list',  //获取laiwang主墙
            type: 'GET',
            data: postData,
            _success: function (data) {

                data = data.values;

                //如果取得的值为空
                if (data.length === 0) {
                    return;
                }
                
                data.forEach(function (item) {//to do rebuild
                    // Each of these sample items should have a reference to a particular group.
                    item.group = Groups[3];
                    item.eventTitle = item.title;
                    item.subtitle = item.title;
                    item.title = item.id;
                    
                    item.description = "";
                    //item.key = item.id;
                    
                    item.eventCreator = item.creator.name;
                    item.eventTime = "发起于" + transformDate(item.createdAt);
                    item.eventMemberCount = "目前有" + item.totalMemberCount + "个参与者";
                    eventLists.push(item);
                });
            }
        });
    }

    var itemNum = 1;
    //从四种规格中任取一种
    function getOneSize() {
        //var n = Math.floor(Math.random() * sizes.length + 1) - 1;
        var n = itemNum % 10;//10个item一组
        var iSize = sizes[0];
        switch (n) {
            case 1:
                iSize = sizes[3];
                break;
            case 2:
                iSize = sizes[0];
                break;
            case 3:
                iSize = sizes[0];
                break;
            case 4:
                iSize = sizes[0];
                break;
            case 5:
                iSize = sizes[2];
                break;
            case 6:
                iSize = sizes[0];
                break;
            case 7:
                iSize = sizes[0];
                break;
            case 8:
                iSize = sizes[1];
                break;
            case 9:
                iSize = sizes[0];
                break;
            case 0:
                iSize = sizes[0];
                break;
        }
        itemNum++;
        //return iSize;
        return sizes[0];
    }
    
    //转换时间格式：毫秒-->yyyy-MM-dd HH:mm:ss
    function transformDate(ms) {
        var sDate = new Date(ms);
        sDate = sDate.getFullYear() + "-" + (sDate.getMonth() + 1) + "-" + sDate.getDate() + " " + sDate.getHours() + ":" + sDate.getMinutes() + ":" + sDate.getSeconds();
        return sDate;
    }

    getStream();
    getSomeBodyStream();
    getFriends();
    getEvents();

    var friendLists = new WinJS.Binding.List();
    var eventLists = new WinJS.Binding.List();

    // 此功能返回仅包含属于提供的组的项的 WinJS.Binding.List。
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; }
    );

    var otherToolsList = new WinJS.Binding.List([{ key: "friends", otherToolTitle: "Friends" },
        { key: "events", otherToolTitle: "Events"},
        { key: "findfriend", otherToolTitle: "FindFriend" }]);

    // TODO: 将数据替换为实际数据。
    // 当异步源中的数据可用时，可以添加此数据。
    //sampleItems.forEach(function (item) {
    //    list.push(item);
    //});

    WinJS.Namespace.define("Data", {
        API_DOMAIN: __API_DOMAIN__,
        DOMAIN: __DOMAIN__,
        items: groupedItems,
        groups: groupedItems.groups,
        getItemsFromGroup: getItemsFromGroup,
        getItemReference: getItemReference,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference,
        transformDate: transformDate,
        otherToolsList: otherToolsList,
        friendLists: friendLists,
        eventLists: eventLists
    });
})();

