// 有关“搜索联系人”模板的简介，请参阅以下文档:
// http://go.microsoft.com/fwlink/?LinkId=232512

// TODO: 将以下脚本标记添加到起始页的标头中以订阅搜索联系人事件。
//  
// <script src="/pages/friend/friends.js"></script>

(function () {
    "use strict";

    var appModel = Windows.ApplicationModel;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var searchPageURI = "/pages/friend/friends.html";

    ui.Pages.define(searchPageURI, {
        /// <field elementType="Object" />
        filters: [],
        lastSearch: "",

        generateFilters: function () {
            this.filters = [];
            this.filters.push({ results: null, text: "All", predicate: function (item) { return true; } });

            // TODO: 替换或删除示例筛选器。
            this.filters.push({ results: null, text: "Group 1", predicate: function (item) { return item.group.key === "group1"; } });
            this.filters.push({ results: null, text: "Group 2+", predicate: function (item) { return item.group.key !== "group1"; } });
        },

        itemInvoked: function (args) {
            args.detail.itemPromise.done(function itemInvoked(item) {
                // TODO: 导航到已调用的项。
                nav.navigate("/pages/itemDetail/itemDetail.html", {item: item.data});
            });
        },

        // 此功能使用提供的查询的搜索结果填充 WinJS.Binding.List。
        searchData: function (queryText) {
            var originalResults;
            var regex;
            // TODO: 对数据执行相应的搜索。
            if (window.Data) {
                originalResults = Data.friendLists.createFiltered(function (item) {
                    regex = new RegExp(queryText, "gi");
                    return (item.title.match(regex) || item.subtitle.match(regex) || item.description.match(regex));
                });
            } else {
                originalResults = new WinJS.Binding.List();
            }
            return originalResults;
        },

        // 此功能使用指定的筛选器筛选搜索数据。
        applyFilter: function (filter, originalResults) {
            if (filter.results === null) {
                filter.results = originalResults.createFiltered(filter.predicate);
            }
            return filter.results;
        },

        // 此功能响应选择新筛选器的用户。它更新选择列表和显示结果。
        filterChanged: function (element, filterIndex) {
            var filterBar = element.querySelector(".filterbar");
            var listView = element.querySelector(".resultslist").winControl;

            utils.removeClass(filterBar.querySelector(".highlight"), "highlight");
            utils.addClass(filterBar.childNodes[filterIndex], "highlight");

            element.querySelector(".filterselect").selectedIndex = filterIndex;

            listView.itemDataSource = this.filters[filterIndex].results.dataSource;
        },

        // 此功能执行在执行搜索时所需的每个步骤。
        handleQuery: function (element, args) {
            var originalResults;
            this.lastSearch = args.queryText;
            WinJS.Namespace.define("friends", { markText: this.markText.bind(this) });
            utils.markSupportedForProcessing(friends.markText);
            this.initializeLayout(element.querySelector(".resultslist").winControl, Windows.UI.ViewManagement.ApplicationView.value);
            this.generateFilters();
            originalResults = this.searchData(args.queryText);
            this.populateFilterBar(element, originalResults);
            this.applyFilter(this.filters[0], originalResults);
        },

        // This function updates the ListView with new layouts
        initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            var modernQuotationMark = "&#148;";
            if (viewState === appViewState.snapped) {
                listView.layout = new ui.ListLayout();
                document.querySelector(".titlearea .pagetitle").innerHTML = modernQuotationMark + toStaticHTML(this.lastSearch) + modernQuotationMark;
                document.querySelector(".titlearea .pagesubtitle").innerHTML = "";
            } else {
                listView.layout = new ui.GridLayout();
                document.querySelector(".titlearea .pagetitle").innerHTML = "Search";
                document.querySelector(".titlearea .pagesubtitle").innerHTML = "Results for " + modernQuotationMark + toStaticHTML(this.lastSearch) + modernQuotationMark;
            }
        },

        // 此功能为搜索词着色。在 /pages/friend/friends.html 中作为 ListView 项模板的一部分引用。
        markText: function (source, sourceProperties, dest, destProperties) {
            var text = source[sourceProperties[0]];
            var regex = new RegExp(this.lastSearch, "gi");
            dest[destProperties[0]] = text.replace(regex, "<mark>$&</mark>");
        },

        // 此功能将生成筛选器选择列表。
        populateFilterBar: function (element, originalResults) {
            var filterBar = element.querySelector(".filterbar");
            var listView = element.querySelector(".resultslist").winControl;
            var li, option, filterIndex;

            filterBar.innerHTML = "";
            for (filterIndex = 0; filterIndex < this.filters.length; filterIndex++) {
                this.applyFilter(this.filters[filterIndex], originalResults);

                li = document.createElement("li");
                li.filterIndex = filterIndex;
                li.tabIndex = 0;
                li.textContent = this.filters[filterIndex].text + " (" + this.filters[filterIndex].results.length + ")";
                li.onclick = function (args) { this.filterChanged(element, args.target.filterIndex); }.bind(this);
                li.onkeyup = function (args) {
                    if (args.key === "Enter" || args.key === "Spacebar")
                        this.filterChanged(element, args.target.filterIndex);
                }.bind(this);
                filterBar.appendChild(li);

                if (filterIndex === 0) {
                    utils.addClass(li, "highlight");
                    listView.itemDataSource = this.filters[filterIndex].results.dataSource;
                }

                option = document.createElement("option");
                option.value = filterIndex;
                option.textContent = this.filters[filterIndex].text + " (" + this.filters[filterIndex].results.length + ")";
                element.querySelector(".filterselect").appendChild(option);
            }

            element.querySelector(".filterselect").onchange = function (args) { this.filterChanged(element, args.currentTarget.value); }.bind(this);
        },

        // 每当用户导航至此页面时都要调用此功能。它
        // 使用应用程序的数据填充页面元素。
        ready: function (element, options) {
            var listView = element.querySelector(".resultslist").winControl;
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = this.itemInvoked;
            this.handleQuery(element, options);
            listView.element.focus();
        },

        // 此功能更新页面布局以响应 viewState 更改。
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            var listView = element.querySelector(".resultslist").winControl;
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

    WinJS.Application.addEventListener("activated", function (args) {
        if (args.detail.kind === appModel.Activation.ActivationKind.search) {
            args.setPromise(ui.processAll().then(function () {
                if (!nav.location) {
                    nav.history.current = { location: Application.navigator.home, initialState: {} };
                }

                return nav.navigate(searchPageURI, { queryText: args.detail.queryText });
            }));
        }
    });

    appModel.Search.SearchPane.getForCurrentView().onquerysubmitted = function (args) { nav.navigate(searchPageURI, args); };
})();
