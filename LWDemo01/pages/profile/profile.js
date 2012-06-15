// 有关“页面控制”模板的简介，请参阅以下文档:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/profile/profile.html", {
        // 每当用户导航至此页面时都要调用此功能。它使用应用程序的数据填充页面元素。
        ready: function (element, options) {
            // TODO: 在此处初始化页面。
            var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
            //element.querySelector(".titlearea .pagetitle").textContent = item.group.title;
            element.querySelector("article .item-title").textContent = item.title;
            element.querySelector("article .item-subtitle").textContent = item.subtitle;
            if (!!(item.attachments[0]) && item.attachments[0].picture) {
                element.querySelector("article .item-image").src = item.backgroundImage;
            } else {
                element.querySelector("article .item-image").style.display = "none";
            }
            element.querySelector("article .item-image").alt = item.subtitle;
            element.querySelector("article .item-content").innerHTML = item.content;
            element.querySelector(".content").focus();
            
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            // TODO: 响应 viewState 的更改。
        },

        unload: function () {
            // TODO: 响应导航到其他页。
        }
    });
})();
