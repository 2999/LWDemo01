// 有关“网格”模板的简介，请参阅以下文档:
// http://go.microsoft.com/fwlink/?LinkID=232446
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    WinJS.strictProcessing();

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: 此应用程序最近已启动。在此处初始化
                //您的应用程序。
            } else {
                // TODO: 此应用程序已从挂起状态重新激活。
                // 在此处恢复应用程序状态。
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }

        //add log function
        WinJS.log = function (message, tag, type) {
            var isError = (type === "error");
            var isStatus = (type === "status");

            if (isError || isStatus) {
                var statusDiv = /* @type(HTMLElement) */ document.getElementById("statusMessage");
                if (statusDiv) {
                    statusDiv.innerText = message;
                    if (isError) {
                        //lastError = message;
                        //statusDiv.style.color = "blue";
                        statusDiv.style.fontSize = "12pt";
                        statusDiv.style.fontWeight = "100";
                    } else if (isStatus) {
                        //lastStatus = message;
                        statusDiv.style.color = "yellow";
                        statusDiv.style.fontSize = "12pt";
                        statusDiv.style.fontWeight = "100";
                    }
                }
            }
        };

    });

    app.oncheckpoint = function (args) {
        // TODO: 即将挂起此应用程序。在此处保存
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
